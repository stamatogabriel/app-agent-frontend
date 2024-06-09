import {
  Action,
  combineReducers,
  configureStore,
  PreloadedState,
  ThunkAction,
} from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import { userApiSlice } from "../features/users/userSlice";
import { airlineApiSlice } from "../features/airlines/airlinesSlice";
import { tourismAgencyApiSlice } from "../features/tourism_agency/tourismAgencySlice";
import { travelPackageSlice } from "../features/travel_package/travelPackageSlice";
import { travelSlice } from "../features/travels/travelSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  /* @ts-ignore */
  [userApiSlice.reducerPath]: apiSlice.reducer,
  /* @ts-ignore */
  [airlineApiSlice.reducerPath]: apiSlice.reducer,
  /* @ts-ignore */
  [tourismAgencyApiSlice.reducerPath]: apiSlice.reducer,
  /* @ts-ignore */
  [travelPackageSlice.reducerPath]: apiSlice.reducer,
  /* @ts-ignore */
  [travelSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;