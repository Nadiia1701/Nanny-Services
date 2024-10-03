export const selectNannies = (state) => state.nannies.items;
export const selectIsLoading = (state) => state.nannies.isLoading;
export const selectError = (state) => state.nannies.error;
export const selectHasNextPage = state => state.nannies.hasNextPage;
export const selectLastKey = state => state.nannies.lastKey