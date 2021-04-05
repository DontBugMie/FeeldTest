import React from 'react';
import RatingBtn from './ratingsBtn';
import Color from '../colors/colors';

const DislikeRatingBtn = props => {
  
  function dislikeRatingBtnFunc(){
    props.discoverRate(false, props.profileId);
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