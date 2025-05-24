/* eslint-disable @typescript-eslint/ban-types */
import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import store, { RootState } from '../store';
import { logout, setCredentials } from '@/features/user/userSlice';
import { toast } from 'react-toastify';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL ?? 'https://dev.tobe.expert',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.userData.accessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

// Refresh token promise to prevent multiple refreshes
let refreshPromise: Promise<string> | null = null;

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result: any = await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === 401) {
      if (!refreshPromise) {
        refreshPromise = Promise.resolve(
          baseQuery(
            {
              url: '/api/auth/token/refresh/',
              method: 'POST',
              body: { refresh: (api.getState() as RootState).userData.refreshToken },
            },
            api,
            extraOptions,
          ),
        )
          .then((refreshResult) => {
            if (refreshResult.data) {
              const { access, refresh } = refreshResult.data as {
                access: string;
                refresh: string;
              };
              api.dispatch(setCredentials({ accessToken: access, refreshToken: refresh }));
              return access;
            } else {
              store.dispatch(logout());
              toast.error('Session expired. Please log in again.');
              throw new Error('Refresh token failed');
            }
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      try {
        const newAccessToken = await refreshPromise;

        // Retry the original query with the new token
        result = await baseQuery(
          {
            ...(args as FetchArgs),
            headers: {
              ...((args as FetchArgs).headers || {}),
              Authorization: `Bearer ${newAccessToken}`,
            },
          },
          api,
          extraOptions,
        );
      } catch (error) {
        // Handle refresh failure (already handled in the promise)
      }
    } else {
      // Handle other errors
      if (result.error?.data?.error) {
        toast.error(result.error.data.error);
      } else if (result.error?.data?.details) {
        const errorMessage = result.error.data.details.join(' ');
        toast.error(errorMessage);
      }
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
