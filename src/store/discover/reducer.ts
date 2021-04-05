import { useStore } from 'react-redux';
import { DiscoverAction, DiscoverState, DiscoverActionTypes } from './types';

const initialState: DiscoverState = {
  fetchingProfiles: false,
  profiles: [],
  ratings: [],
};

const discover = (state = initialState, action: DiscoverAction) => {
  //console.log('state.profiles.length', state.profiles.length);
  //state.profiles.forEach(item => {console.log(item.info.name, item.id)});
 // console.log("==========================");
  switch (action.type) {
    case DiscoverActionTypes.FETCH_PROFILES_REQUEST:
      console.log('reducer - fetch profiles request')
      return { ...state, fetchingProfiles: true };
    case DiscoverActionTypes.FETCH_PROFILES_SUCCESS:

      let profilesMap = {};
      let profilesArr = [];
      action.response.data.forEach(profile => {
        if (!profilesMap.hasOwnProperty(profile.id)) {
          profilesMap[profile.id] = true;
          profilesArr.push(profile);
        //} else {
        //  console.log('skipping', profile.info.name, profile.id);
        }
      });
      console.log('before: ', action.response.data.length, ' after: ', profilesArr.length);

      return {
        ...state,
        fetchingProfiles: false,
        profiles: profilesArr,
      };
    case DiscoverActionTypes.FETCH_PROFILES_FAILURE:
      return { ...state, fetchingProfiles: false };

    case DiscoverActionTypes.RATE_PROFILE:
      let newRatings = state.ratings;
      newRatings.push({like: action.like, id: action.id });

      let newProfiles = state.profiles.filter ( profile => profile.id !== action.id )
      return { ...state, ratings: newRatings, profiles: newProfiles };

    default:
      return state;
  }
};

export default discover;
