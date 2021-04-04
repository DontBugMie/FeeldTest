import { DiscoverAction, DiscoverActionTypes } from './types';

// For safety, only expose actions that are intended to be used
// outside of the store.
export const discoverFetchProfiles = (): DiscoverAction => ({
  type: DiscoverActionTypes.FETCH_PROFILES_REQUEST,
});

export const discoverRate = (like: boolean): DiscoverAction => ({
  type: DiscoverActionTypes.RATE_PROFILE,
  like: like,
});

export const profileChange = (id: string): DiscoverAction => ({
  type: DiscoverActionTypes.PROFILE_CHANGED,
  id: id,
});

