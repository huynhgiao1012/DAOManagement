import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../services/Auth";
import { userApi } from "../services/User";
import authSlice from "../slices/authSlice";
import { garageApi } from "../services/Garage";
import { serviceApi } from "../services/Service";
import { formApi } from "../services/OrderForm";
import { managerApi } from "../services/Manager";
import { vietQRApi } from "../services/VietQR";
import { accountantApi } from "../services/Accountant";
import { notiApi } from "../services/Notification";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [garageApi.reducerPath]: garageApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [formApi.reducerPath]: formApi.reducer,
    [managerApi.reducerPath]: managerApi.reducer,
    [vietQRApi.reducerPath]: vietQRApi.reducer,
    [accountantApi.reducerPath]: accountantApi.reducer,
    [notiApi.reducerPath]: notiApi.reducer,
    authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      garageApi.middleware,
      serviceApi.middleware,
      formApi.middleware,
      managerApi.middleware,
      vietQRApi.middleware,
      accountantApi.middleware,
      notiApi.middleware
    ),
});
setupListeners(store.dispatch);
