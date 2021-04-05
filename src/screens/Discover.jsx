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
  ScrollView,
} from 'react-native';
import { NavigationParams } from 'react-navigation';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store/types';
import { discoverFetchProfiles, discoverRate } from '../store/discover/actions';
import { Routes } from '../navigation/routes';
import { Profile } from '../interface/types';
import LikeRatingBtn from '../components/buttons/likeRatingBtn';
import DislikeRatingBtn from '../components/buttons/dislikeRatingBtn';
import Color from '../components/colors/colors';

const mapStateToProps = (state: RootState) => ({
  fetchingProfiles: state.discover.fetchingProfiles,
  profiles: state.discover.profiles,
});
const mapDispatchToProps = {
  fetchProfiles: discoverFetchProfiles,
  discoverRate: discoverRate
};
const connector = connect(mapStateToProps, mapDispatchToProps);
const { width, height } = Dimensions.get('screen');
const PROFILE_PIC_HEIGHT = height*.86;
const PROFILE_PIC_WIDTH = width;
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
  navigation: NavigationParams;
};



function Discover({
  navigation,
  fetchingProfiles,
  fetchProfiles,
  discoverRate,
  profiles,
}: Props) {
  useEffect(() => {
    if (profiles.length < 1) {
      fetchProfiles();
    }
  }, []);

  const scrollY = React.useRef(new Animated.Value(0)).current;

  const Item = ({ id, photosArr, partnersTitle, noPartnerPhotoReplacement, age, type, gender, sexuality, about, desires, interests, associated }: { id: string; photosArr: object; partnersTitle: string; noPartnerPhotoReplacement: string; age: string; type: string; gender: string; sexuality: string; name: string; about: string; desires: object; interests: object; associated: () => any }) => (
      <View style={[styles.pageBackground,{flex:1}]}>
        <Animated.FlatList
        horizontal={false}
        data={photosArr}
        bounces={false}
        snapToInterval={PROFILE_PIC_HEIGHT}
        decelerationRate='fast'
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([
          {nativeEvent:{contentOffset: {y: scrollY}}}
        ],
        { useNativeDriver:true }
        )}
        keyExtractor={(item, index)=> [id, index]}
        renderItem={({item})=>{
          return <View>
            <Image source={{uri: item.url}} style={styles.profilePic}/>
          </View>
        }}
        />

        <View style={styles.buttonsContainer}>
          <DislikeRatingBtn profileId={id} discoverRate={discoverRate} />
          <Pressable onPress={associated}>
            <View style={styles.partnersProfileBtn}>
            <Text style={[styles.title]}>{partnersTitle}</Text>
            <Image style={styles.noPartnerPhotoReplacement} source={{uri: noPartnerPhotoReplacement}}/>
            </View>
          </Pressable>
          <LikeRatingBtn profileId={id}  discoverRate={discoverRate}/>
        </View>
      <Pressable style={styles.profileDescriptionContainer}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
          <Text  style={[styles.profileDescriptionText, styles.descriptionTitles]}>{age} {gender} {type}</Text>
          <Text style={[styles.profileDescriptionText]}>{sexuality}</Text>
          <Text style={styles.profileDescriptionText}></Text>
          <Text style={styles.profileDescriptionText}>{about}</Text>
          <Text style={styles.profileDescriptionText}></Text>
          <Text style={[styles.profileDescriptionText, styles.descriptionTitles]}>Desires:</Text>
          <Text style={styles.profileDescriptionText}>{desires}</Text>
          <Text style={styles.profileDescriptionText}></Text>
          <Text style={[styles.profileDescriptionText, styles.descriptionTitles]}>Interests:</Text>
          <Text style={styles.profileDescriptionText}>{interests}</Text> 
        </ScrollView>
      </Pressable>
      </View>
  );

  const renderItem = ({ item }: { item: Profile }) => (
    <Item
      id={
        item.id
      }
      partnersTitle={
        item.associated
          ? `${item.info.name[0].toUpperCase()}${item.info.name.slice(1)} & ${item.associated.name[0].toUpperCase()}${item.associated.name.slice(1)}`
          : `${item.info.name[0].toUpperCase()}${item.info.name.slice(1)}`
      }
      noPartnerPhotoReplacement={
        `https://dontbugmie.github.io/fldImges/feeldLogo.png`
         
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
        item.info.desires?.join(' | ')
      }
      interests={
        item.info.interests?.join(' | ')
      }
      associated={() =>
        item.associated
          ? navigation.navigate('Root', {
              screen: Routes.PartnerProfile,
              params: { profile: item.associated },
            })
          : null
      }
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
  pageBackground:{
    backgroundColor:Color.main,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: Dimensions.get('window').width/20,
    width:'100%',
    zIndex:70,
    position:'absolute',
    textAlign: 'center',
    color:'white',
    textShadowColor:'black',
    textShadowRadius:5,
    textShadowOffset: {width: -1, height: 1},
  },
  profilePic:{
    height: PROFILE_PIC_HEIGHT,
    width: PROFILE_PIC_WIDTH,
    borderRadius:100,
    resizeMode:'cover',
    borderColor:Color.main,
    borderWidth: 2,
    shadowColor: Color.darkGrey,
    shadowOpacity: 0.8,
  },
  buttonsContainer:{
    flexDirection:'row',
    alignSelf:'center',
    zIndex:2,
    position:'absolute',
    top:height * .35,
  },
  partnersProfileBtn:{
    borderWidth: 2,
    borderColor:Color.darkOrange,
    backgroundColor: Color.main,
    shadowColor: Color.darkest,
    top:-30,
    shadowOpacity: 0.5,
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height)/2,
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width *0.3,
    justifyContent: 'center',
  },
  partnersTitle:{
    fontSize:30,
    position:'absolute',
    textAlign:'center',
    backgroundColor:'transparent',
    zIndex:2,
  },
  noPartnerPhotoReplacement:{
    zIndex:1,
    padding:40,
    opacity:0.5,
  },
  profileDescriptionContainer:{
    width: PROFILE_PIC_WIDTH,
    maxWidth:PROFILE_PIC_WIDTH,
    height:height * .40,
    bottom:0,
    position:'absolute',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    backgroundColor:Color.white,
    padding:30,
    borderTopWidth:50,  
    borderWidth:4,  
    borderColor: Color.main,
    fontSize:Dimensions.get('window').width*0.5,
    shadowColor: Color.darkGrey,
    shadowOpacity: 0.8,
  },
  descriptionTitles:{
    fontWeight:'600',
  },
  profileDescriptionText:{
    marginLeft:15,
    fontSize:16
  }
});

export default connector(Discover);


