import React from 'react';
import RatingBtn from './ratingsBtn';
import Color from '../colors/colors';
import discoverRate from '../../store/discover/actions';


const DislikeRatingBtn = props => {
  
  function dislikeRatingBtnFunc(){
    // alert('you have just hit the dislike button');
    discoverRate(false);
  };
  
  return (
    <RatingBtn 
    ratingBtnTitle='dislike' 
    iconName = 'minus'
    pressColor={Color.mediumOrange} 
    ratingBtnfunc={dislikeRatingBtnFunc}/>
  )
}

export default DislikeRatingBtn;