// import BottomSheet, { BottomSheetScrollView } from 'react-native-bottomsheet';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  Dimensions,
  Animated,
} from 'react-native';
import { NavigationParams } from 'react-navigation';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../store/types';
import { discoverFetchProfiles } from '../store/discover/actions';
import { Routes } from '../navigation/routes';
import { Profile } from '../interface/types';
import { ImageStore } from 'react-native';


const mapStateToProps = (state: RootState) => ({
  fetchingProfiles: state.discover.fetchingProfiles,
  profiles: state.discover.profiles,
});

const mapDispatchToProps = {
  fetchProfiles: discoverFetchProfiles,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  navigation: NavigationParams;
};

const { width, height } = Dimensions.get('screen');

const PROFILE_PIC_HEIGHT = height * .75;
const PROFILE_PIC_WIDTH = width;

const DOT_SIZE = 12;
const DOT_SPACING = 12;



function Discover({
  navigation,
  fetchingProfiles,
  fetchProfiles,
  profiles,
}: Props) {
  useEffect(() => {
    if (profiles.length < 1) {
      fetchProfiles();
    }
  }, []);

  const scrollY = React.useRef(new Animated.Value(0)).current;
  



  const Item = ({ title, photosArr, age, type, gender, sexuality, about, desires, interests, onPress }: { title: string; photosArr: object; age: string; type: string; gender: string; sexuality: string; name: string; about: string; desires: object; interests: object; onPress: () => any }) => (



    <Pressable style={styles.item} onPress={onPress}>
      <View>
        <Animated.FlatList
        horizontal={false}
        data={photosArr}
        snapToInterval={PROFILE_PIC_HEIGHT}
        decelerationRate='fast'
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([
          {nativeEvent:{contentOffset: {y: scrollY}}}
        ],
        { useNativeDriver: true }
        )}
        keyExtractor={(_,index)=> index.toString()}
        renderItem={({item})=>{
          return <View>
            <Image source={{uri: item.url}} style={styles.profilePic}/>
          </View>
        }}
        />
        <View style={styles.pagination}>
          {photosArr.map((_,index)=>{
            return <View
              key={index.length}
              style={[styles.dot]}
            />
          })}
        </View>
      </View>



      {/* <BottomSheet
        initialSnapIndex={0}
        snapPoints={[height - PROFILE_PIC_HEIGHT, height]}
      >
        <BottomSheetScrollView>
            <Text style={styles.text}>{age} {gender} {type}</Text>
            <Text style={styles.text}>{sexuality}</Text>
            <Text style={styles.text}></Text>
            <Text style={styles.text}>{about}</Text>
            <Text style={styles.text}></Text>
            <Text style={styles.text}>Desires:</Text>
            <Text style={styles.text}>{desires}</Text>
            <Text style={styles.text}></Text>
            <Text style={styles.text}>Interests:</Text>
            <Text style={styles.text}>{interests}</Text> 
        </BottomSheetScrollView>
      </BottomSheet> */}




      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );

  const renderItem = ({ item }: { item: Profile }) => (
    <Item
      title={
        item.associated
          ? `${item.info.name} & ${item.associated?.name}`
          : item.info.name
      }
      photosArr={
        item.photos.length === 0 ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/FEELD_LOGO_-_Official.jpg/1920px-FEELD_LOGO_-_Official.jpg' : item.photos
      }
      profilePhotoCount={
        item.photos.length
      }
      age={
        item.info.age
      }
      type={
        `${item.info.type[0].toLocaleUpperCase()}${item.info.type.slice(1)}`
      }
      gender={
        `${item.info.gender[0].toLocaleUpperCase()}${item.info.gender.slice(1)}`
      }
      sexuality={
        `${item.info.sexuality[0].toLocaleUpperCase()}${item.info.sexuality.slice(1)}`
      }
      about={
        item.info.about
      }
      desires={
        item.info.desires
      }
      interests={
        item.info.interests
      }
      // onPress={() =>
      //   item.associated
      //     ? navigation.navigate('Root', {
      //         screen: Routes.PartnerProfile,
      //         params: { profile: item.associated },
      //       })
      //     : null
      // }
    />
  );

  return fetchingProfiles ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      horizontal={true}
      snapToInterval={PROFILE_PIC_WIDTH}
      showsHorizontalScrollIndicator={false}
      decelerationRate='fast'
      data={profiles}
      renderItem={renderItem}
      keyExtractor={profile => profile.id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    // padding: 2,
    marginHorizontal: 0,
  },
  profilePic:{
    height: PROFILE_PIC_HEIGHT,
    width: PROFILE_PIC_WIDTH,
    resizeMode:'cover'
  },
  pagination:{
    position:'absolute',
    top: PROFILE_PIC_HEIGHT / 2,
    right:30,
    zIndex:400,
  },
  dot:{
    position:'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: 'white',
    zIndex:400,
  }
});

export default connector(Discover);
