import { Profile } from '../../interface/types';

export enum DiscoverActionTypes {
  FETCH_PROFILES_REQUEST = 'FETCH_PROFILES_REQUEST',
  FETCH_PROFILES_SUCCESS = 'FETCH_PROFILES_SUCCESS',
  FETCH_PROFILES_FAILURE = 'FETCH_PROFILES_FAILURE',
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

export type DiscoverAction =
  | FetchProfilesRequestAction
  | FetchProfilesSuccessAction
  | FetchProfilesFailureAction;

export interface DiscoverState {
  fetchingProfiles: boolean;
  profiles: Profile[];
}
