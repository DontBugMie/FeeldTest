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
import { discoverFetchProfiles, profileChange } from '../store/discover/actions';


import { Routes } from '../navigation/routes';
import { Profile } from '../interface/types';
import { ImageStore } from 'react-native';

import LikeRatingBtn from '../components/buttons/likeRatingBtn';
import DislikeRatingBtn from '../components/buttons/dislikeRatingBtn';

import Color from '../components/colors/colors';


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

const PROFILE_PIC_HEIGHT = height*.86;
const PROFILE_PIC_WIDTH = width;



const DOT_SIZE = 12;
const DOT_SPACING = 12;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;


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
  
  const Item = ({ title, photosArr, partnersTitle, noPartnerPhotoReplacement, profilePhotoCount, age, type, gender, sexuality, about, desires, interests, onPress, associated }: { title: string; photosArr: object; partnersTitle: string; noPartnerPhotoReplacement: string; profilePhotoCount: string; age: string; type: string; gender: string; sexuality: string; name: string; about: string; desires: object; interests: object; onPress: () => any ; associated: () => any }) => (

    // <Pressable style={styles.item} onPress={onPress}>
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
        keyExtractor={(_,index)=> index.toString()}
        renderItem={({item})=>{
          return <View>
            <Image source={{uri: item.url}} style={styles.profilePic}/>
          </View>
        }}
        />
        <View style={styles.pagination}>
          {/* //function for creating number of dots */}
          {photosArr.forEach(element => {
           let numOfDots = element;
            return <View
              key={numOfDots}
              style={[styles.dot]}
            />
          })}
          <Animated.View
            style={[styles.dotIndicator, {
              transform:[{
                translateY: Animated.divide(scrollY, height).interpolate({
                  inputRange: [0,4],
                  outputRange:[0, DOT_INDICATOR_SIZE]
                })
              }]
            }]}
            />
        </View>
 
        <View style={styles.buttonsContainer}>
          <DislikeRatingBtn/>
          <Pressable onPress={associated}>
            <View style={styles.partnersProfileBtn}>
            <Text style={[styles.title]}>{partnersTitle}</Text>
            <Image style={styles.noPartnerPhotoReplacement} source={{uri: noPartnerPhotoReplacement}}/>
            </View>
          </Pressable>
          <LikeRatingBtn/>
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
      // title={
      //   item.associated
      //     ? `${item.info.name} & ${item.associated?.name}`
      //     : item.info.name
      // }
      // titleLength={
      //   item.associated?
      //   item.info.name.length + item.associated.name.length + 3
      //   : item.info.name.length
      // }
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
        item.info.desires
      }
      interests={
        item.info.interests
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
      onViewableItemsChanged= {(viewableItems, changed)=>{
        if( viewableItems.viewableItems.length !== 1 ) {
          profileChange("");
        } else {
          profileChange(viewableItems.viewableItems[0].id);
        }
       // console.log(viewableItems.viewableItems.length);
      }}
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
    // top:'45%',
    // left:5,
    zIndex:70,
    position:'absolute',
    textAlign: 'center',
    color:'white',
    textShadowColor:'black',
    textShadowRadius:5,
    textShadowOffset: {width: -1, height: 1},
  },
  // item: {
  //   backgroundColor: 'blue',
  //   // padding: 2,
  //   width:'100%',
  //   height:'50%',
  //   marginHorizontal: 0,
  // },
  profilePic:{
    height: PROFILE_PIC_HEIGHT,
    width: PROFILE_PIC_WIDTH,
    borderRadius:100,
    resizeMode:'cover',
    borderColor:Color.main,
    borderWidth: 2,
  },
  pagination:{
    // position:'absolute',
    // top: PROFILE_PIC_HEIGHT / 2,
    // right:30,
    // zIndex:400,
  },
  dot:{
    // position:'absolute',
    // width: DOT_SIZE,
    // height: DOT_SIZE,
    // borderRadius: DOT_SIZE,
    // backgroundColor: 'white',
    // zIndex:400,
  },
  dotIndicator:{
    // width: DOT_INDICATOR_SIZE,
    // height: DOT_INDICATOR_SIZE,
    // borderRadius: DOT_INDICATOR_SIZE,
    // borderWidth:1,
    // borderColor:'white',
    // position:'absolute',
    // top: -DOT_SIZE / 2,
    // left: -DOT_SIZE / 2,
  },
  buttonsContainer:{
    flexDirection:'row',
    alignSelf:'center',
    // justifyContent:'space-evenly',
    // flex:3,
    zIndex:2,
    position:'absolute',
    top:height * .42,
  },
  partnersProfileBtn:{
    borderWidth: 2,
    // position:'absolute',
    // left: Dimensions.get('window').width*0.12,
    // marginHorizontal:30,
    borderColor:Color.darkOrange,
    backgroundColor: Color.main,
    shadowColor: Color.darkest,
    top:-30,
    // top:Dimensions.get('window').height * 0.5,
    shadowOpacity: 0.5,
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height)/2,
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width *0.3,
    justifyContent: 'center',
    // alignContent:'center',
    // textAlign:'center',
    // alignSelf:'center',
    // zIndex:2,
  },
  partnersTitle:{
    fontSize:30,
    position:'absolute',
    textAlign:'center',
    // left:'20%',
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


