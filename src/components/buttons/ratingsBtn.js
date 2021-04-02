// Focal button for rating the profile
import React from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import Color from '../colors/colors';
import { AntDesign } from '@expo/vector-icons'; 

const ratingsBtn = props => {
  return (
      <TouchableHighlight
        style = {[{
          borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height)/2,
          width: Dimensions.get('window').width * 0.2,
          height: Dimensions.get('window').width *0.2,
          justifyContent: 'center',
          alignItems: 'center',
        }, styles.ratingBtn]}
        underlayColor= {props.pressColor}
        onPress={props.ratingBtnfunc}>
        <AntDesign name={props.iconName} size={24} color={Color.darkest}/>
      </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  ratingBtn: {
    borderWidth: 2,
    marginHorizontal:30,
    borderColor:Color.main,
    backgroundColor: Color.lightOrange,
    shadowColor: Color.darkGrey,
    shadowOpacity: 1,
  }
});

export default ratingsBtn;