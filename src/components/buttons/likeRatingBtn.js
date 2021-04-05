import React from 'react';
import Color from '../colors/colors';
import RatingBtn from './ratingsBtn';
import discoverRate from '../../store/discover/actions';

const LikeRatingBtn = props => {
  
  function likeRatingBtnFunc(){
    props.discoverRate(true, props.profileId);
  };

  return (
    <RatingBtn 
    ratingBtnTitle='like' 
    iconName='hearto'
    pressColor={Color.mediumOrange} 
    ratingBtnfunc={likeRatingBtnFunc}/>
  )
}

export default LikeRatingBtn;