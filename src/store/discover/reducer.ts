import { DiscoverAction, DiscoverState, DiscoverActionTypes } from './types';
import { Rating } from '../../interface/types';

const initialState: DiscoverState = {
  fetchingProfiles: false,
  profiles: [],
};

const discover = (state = initialState, action: DiscoverAction) => {
  switch (action.type) {
    case DiscoverActionTypes.FETCH_PROFILES_REQUEST:
      return { ...state, fetchingProfiles: true };
    case DiscoverActionTypes.FETCH_PROFILES_SUCCESS:
      return {
        ...state,
        fetchingProfiles: false,
        profiles: action.response.data,
      };
    case DiscoverActionTypes.FETCH_PROFILES_FAILURE:
      return { ...state, fetchingProfiles: false };

    case DiscoverActionTypes.RATE_PROFILE:
      if (state.visibleProfile === "") return state;
      let newRatings = state.ratings;
      newRatings.push({like: action.like, id: state.visibleProfile});

      let newProfiles = state.profiles.filter ( profile => profile.id !== state.visibleProfile )
      return { ...state, ratings: newRatings, profiles: newProfiles };

    case DiscoverActionTypes.PROFILE_CHANGED:
      return { ...state, visibleProfile: action.id };
    default:
      return state;
  }


};

export default discover;
