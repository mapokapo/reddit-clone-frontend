// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { CommunitiesService, PostsService } from "../requests/services.gen";
import * as Common from "./common";
/**
* Find all communities
* @returns Community OK
* @throws ApiError
*/
export const useCommunitiesServiceFindAllCommunitiesSuspense = <TData = Common.CommunitiesServiceFindAllCommunitiesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseCommunitiesServiceFindAllCommunitiesKeyFn(queryKey), queryFn: () => CommunitiesService.findAllCommunities() as TData, ...options });
/**
* Find a community by ID
* @param data The data for the request.
* @param data.id
* @returns Community OK
* @throws ApiError
*/
export const useCommunitiesServiceFindOneCommunitySuspense = <TData = Common.CommunitiesServiceFindOneCommunityDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseCommunitiesServiceFindOneCommunityKeyFn({ id }, queryKey), queryFn: () => CommunitiesService.findOneCommunity({ id }) as TData, ...options });
/**
* Find all posts in a community
* @param data The data for the request.
* @param data.communityId
* @returns Post OK
* @throws ApiError
*/
export const usePostsServiceFindAllPostsSuspense = <TData = Common.PostsServiceFindAllPostsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ communityId }: {
  communityId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePostsServiceFindAllPostsKeyFn({ communityId }, queryKey), queryFn: () => PostsService.findAllPosts({ communityId }) as TData, ...options });
/**
* Find a post by ID in a community
* @param data The data for the request.
* @param data.communityId
* @param data.id
* @returns Post OK
* @throws ApiError
*/
export const usePostsServiceFindOnePostSuspense = <TData = Common.PostsServiceFindOnePostDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ communityId, id }: {
  communityId: number;
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePostsServiceFindOnePostKeyFn({ communityId, id }, queryKey), queryFn: () => PostsService.findOnePost({ communityId, id }) as TData, ...options });
