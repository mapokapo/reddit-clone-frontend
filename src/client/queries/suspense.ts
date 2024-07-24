// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { CommentsService, CommunitiesService, PostsService, UsersService } from "../requests/services.gen";
import { SortBy, Timespan } from "../requests/types.gen";
import * as Common from "./common";
/**
* Get the current user
* This endpoint is used by the client to get the current user. Returns 204 if the authenticated user doesn't have a profile.
* @returns User OK
* @returns void No content
* @throws ApiError
*/
export const useUsersServiceGetMeSuspense = <TData = Common.UsersServiceGetMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetMeKeyFn(queryKey), queryFn: () => UsersService.getMe() as TData, ...options });
/**
* Get aggregated user data for the current user
* This endpoint is used by the client to get user data such as posts, comments, and votes for the current user.
* @param data The data for the request.
* @param data.include The data to include in the response
* @returns unknown OK
* @throws ApiError
*/
export const useUsersServiceGetUserDataSuspense = <TData = Common.UsersServiceGetUserDataDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ include }: {
  include?: ("posts" | "votes")[];
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetUserDataKeyFn({ include }, queryKey), queryFn: () => UsersService.getUserData({ include }) as TData, ...options });
/**
* Get all comments for a post
* @param data The data for the request.
* @param data.postId
* @param data.depth The depth of the comment tree to return
* @returns Comment OK
* @throws ApiError
*/
export const useCommentsServiceFindAllCommentsSuspense = <TData = Common.CommentsServiceFindAllCommentsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ depth, postId }: {
  depth?: number;
  postId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseCommentsServiceFindAllCommentsKeyFn({ depth, postId }, queryKey), queryFn: () => CommentsService.findAllComments({ depth, postId }) as TData, ...options });
/**
* Get a comment by ID
* @param data The data for the request.
* @param data.commentId
* @param data.depth The depth of the comment tree to return
* @returns Comment OK
* @throws ApiError
*/
export const useCommentsServiceFindCommentByIdSuspense = <TData = Common.CommentsServiceFindCommentByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ commentId, depth }: {
  commentId: number;
  depth?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseCommentsServiceFindCommentByIdKeyFn({ commentId, depth }, queryKey), queryFn: () => CommentsService.findCommentById({ commentId, depth }) as TData, ...options });
/**
* Find all communities
* @returns Community OK
* @throws ApiError
*/
export const useCommunitiesServiceFindAllCommunitiesSuspense = <TData = Common.CommunitiesServiceFindAllCommunitiesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseCommunitiesServiceFindAllCommunitiesKeyFn(queryKey), queryFn: () => CommunitiesService.findAllCommunities() as TData, ...options });
/**
* Find all communities that the current user is a member of
* @returns Community OK
* @throws ApiError
*/
export const useCommunitiesServiceFindUserCommunitiesSuspense = <TData = Common.CommunitiesServiceFindUserCommunitiesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseCommunitiesServiceFindUserCommunitiesKeyFn(queryKey), queryFn: () => CommunitiesService.findUserCommunities() as TData, ...options });
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
* Get a personalized feed of posts for the current user
* @param data The data for the request.
* @param data.sortBy
* @param data.timespan
* @param data.skip
* @param data.take
* @returns PostResponse OK
* @throws ApiError
*/
export const usePostsServiceGetFeedSuspense = <TData = Common.PostsServiceGetFeedDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ skip, sortBy, take, timespan }: {
  skip?: number;
  sortBy?: SortBy;
  take?: number;
  timespan?: Timespan;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePostsServiceGetFeedKeyFn({ skip, sortBy, take, timespan }, queryKey), queryFn: () => PostsService.getFeed({ skip, sortBy, take, timespan }) as TData, ...options });
/**
* Find all posts by a user
* @param data The data for the request.
* @param data.userId
* @param data.sortBy
* @param data.timespan
* @param data.skip
* @param data.take
* @returns PostResponse OK
* @throws ApiError
*/
export const usePostsServiceFindAllPostsByUserSuspense = <TData = Common.PostsServiceFindAllPostsByUserDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ skip, sortBy, take, timespan, userId }: {
  skip?: number;
  sortBy?: SortBy;
  take?: number;
  timespan?: Timespan;
  userId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePostsServiceFindAllPostsByUserKeyFn({ skip, sortBy, take, timespan, userId }, queryKey), queryFn: () => PostsService.findAllPostsByUser({ skip, sortBy, take, timespan, userId }) as TData, ...options });
/**
* Find all posts in a community
* @param data The data for the request.
* @param data.communityId
* @param data.sortBy
* @param data.timespan
* @param data.skip
* @param data.take
* @returns PostResponse OK
* @throws ApiError
*/
export const usePostsServiceFindAllPostsSuspense = <TData = Common.PostsServiceFindAllPostsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ communityId, skip, sortBy, take, timespan }: {
  communityId: number;
  skip?: number;
  sortBy?: SortBy;
  take?: number;
  timespan?: Timespan;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePostsServiceFindAllPostsKeyFn({ communityId, skip, sortBy, take, timespan }, queryKey), queryFn: () => PostsService.findAllPosts({ communityId, skip, sortBy, take, timespan }) as TData, ...options });
/**
* Find a post by ID
* @param data The data for the request.
* @param data.id
* @returns PostResponse OK
* @throws ApiError
*/
export const usePostsServiceFindOnePostSuspense = <TData = Common.PostsServiceFindOnePostDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePostsServiceFindOnePostKeyFn({ id }, queryKey), queryFn: () => PostsService.findOnePost({ id }) as TData, ...options });
