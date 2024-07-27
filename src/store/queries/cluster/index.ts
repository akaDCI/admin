import { endpointStatics } from "@/helpers/enpoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clusterApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://48.217.91.176:9090",
  }),
  reducerPath: "clusterApi",
  endpoints: (build) => ({
    staticsCluster: build.query<any, any>({
      query: () => ({
        url: endpointStatics.CLUSTER,
        method: "GET",
        flashError: true,
      }),
    }),
    reportCluster: build.query<any, any>({
      query: () => ({
        url: endpointStatics.CLUSTER_REPORT,
        method: "GET",
        flashError: true,
      }),
    }),
  }),
});

export const { useStaticsClusterQuery, useReportClusterQuery } = clusterApi;
