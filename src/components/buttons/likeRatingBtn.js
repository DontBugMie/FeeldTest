import React from 'react';
import Color from '../colors/colors';
import RatingBtn from './ratingsBtn';
import discoverRate from '../../store/discover/actions';

const LikeRatingBtn = props => {
  
  function likeRatingBtnFunc(){
    // alert('you have just hit the like button');
    discoverRate(true);
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