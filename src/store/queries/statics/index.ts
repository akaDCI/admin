"use client";

import {
  endpointAuth,
  endpointPositionManagement,
  endpointStatics,
} from "@/helpers/enpoints";
import { baseApi } from "../base";

export const authAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    staticsObjectDistribution: build.query<any, any>({
      query: () => ({
        url: endpointStatics.STATIS_OBJECT_DISTRIBUTION,
        method: "GET",
        flashError: true,
      }),
    }),
    staticsHourlyDistribution: build.query<any, any>({
      query: () => ({
        url: endpointStatics.STATIS_HOURLY_DISTRIBUTION,
        method: "GET",
        flashError: true,
      }),
    }),
    staticsAgeDistribution: build.query<any, any>({
      query: () => ({
        url: endpointStatics.STATIS_AGE_DISTRIBUTION,
        method: "GET",
        flashError: true,
      }),
    }),
  }),
});

export const {
  useStaticsObjectDistributionQuery,
  useStaticsAgeDistributionQuery,
  useStaticsHourlyDistributionQuery,
} = authAPI;
