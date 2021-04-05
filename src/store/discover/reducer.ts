import { DiscoverAction, DiscoverState, DiscoverActionTypes } from './types';
import { Rating } from '../../interface/types';
import { Alert } from 'react-native';

const initialState: DiscoverState = {
  fetchingProfiles: false,
  profiles: [],
  ratings: [],
};

const discover = (state = initialState, action: DiscoverAction) => {
  switch (action.type) {
    case DiscoverActionTypes.FETCH_PROFILES_REQUEST:
      //alert("foo");
      return { ...state, fetchingProfiles: true };
    case DiscoverActionTypes.FETCH_PROFILES_SUCCESS:
      //console.log("bar");
      console.log("total", action.response.data.length);
      //let profilesset = new Set();
      //profilesset.add(action.response.data);
      // let uniqueProfiles = [];
      // let profileMap = {};
      // action.response.data.forEach(element => {
      //   if ())
      //   uniqueProfiles.add(element);
      // });
      // console.log("unique", uniqueProfiles.size);
      return {
        ...state,
        fetchingProfiles: false,
        profiles: action.response.data,
      };
    case DiscoverActionTypes.FETCH_PROFILES_FAILURE:
      return { ...state, fetchingProfiles: false };

    case DiscoverActionTypes.RATE_PROFILE:
      console.log('rate profile :)');
      let newRatings = state.ratings;
      newRatings.push({like: action.like, id: action.id });

      let newProfiles = state.profiles.filter ( profile => profile.id !== action.id )
      return { ...state, ratings: newRatings, profiles: newProfiles };

    default:
      return state;
  }


};

export default discover;
