import { Profile, Rating } from '../../interface/types';

export enum DiscoverActionTypes {
  FETCH_PROFILES_REQUEST = 'FETCH_PROFILES_REQUEST',
  FETCH_PROFILES_SUCCESS = 'FETCH_PROFILES_SUCCESS',
  FETCH_PROFILES_FAILURE = 'FETCH_PROFILES_FAILURE',
  RATE_PROFILE = 'RATE_PROFILE',
  PROFILE_CHANGED = 'PROFILE_CHANGED',
}

interface FetchProfilesRequestAction {
  type: typeof DiscoverActionTypes.FETCH_PROFILES_REQUEST;
}

interface FetchProfilesSuccessAction {
  type: typeof DiscoverActionTypes.FETCH_PROFILES_SUCCESS;
  response: any;
}

interface FetchProfilesFailureAction {
  type: typeof DiscoverActionTypes.FETCH_PROFILES_FAILURE;
  error: Error;
}

interface RateProfileAction {
  type: typeof DiscoverActionTypes.RATE_PROFILE;
  like: boolean;
  id: string;
}

export type DiscoverAction =
  | FetchProfilesRequestAction
  | FetchProfilesSuccessAction
  | FetchProfilesFailureAction
  | RateProfileAction;
    
export interface DiscoverState {
  fetchingProfiles: boolean;
  profiles: Profile[];
  ratings: Rating[];
}
