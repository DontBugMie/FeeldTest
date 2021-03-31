import { DiscoverAction, DiscoverActionTypes } from './types';

// For safety, only expose actions that are intended to be used
// outside of the store.
export const discoverFetchProfiles = (): DiscoverAction => ({
  type: DiscoverActionTypes.FETCH_PROFILES_REQUEST,
});
