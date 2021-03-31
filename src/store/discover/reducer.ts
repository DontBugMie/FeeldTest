import { DiscoverAction, DiscoverState, DiscoverActionTypes } from './types';

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
    default:
      return state;
  }
};

export default discover;
