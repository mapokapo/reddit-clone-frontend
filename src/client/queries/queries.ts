// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { CommunitiesService, PostsService, UsersService } from "../requests/services.gen";
import { CreateCommunityRequest, CreatePostRequest, CreateUserRequest, UpdateCommunityRequest, UpdatePostRequest } from "../requests/types.gen";
import * as Common from "./common";
/**
* Get the current user
* @returns User OK
* @returns void No content
* @throws ApiError
*/
export const useUsersServiceGetMe = <TData = Common.UsersServiceGetMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetMeKeyFn(queryKey), queryFn: () => UsersService.getMe() as TData, ...options });
/**
* Find all communities
* @returns Community OK
* @throws ApiError
*/
export const useCommunitiesServiceFindAllCommunities = <TData = Common.CommunitiesServiceFindAllCommunitiesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCommunitiesServiceFindAllCommunitiesKeyFn(queryKey), queryFn: () => CommunitiesService.findAllCommunities() as TData, ...options });
/**
* Find a community by ID
* @param data The data for the request.
* @param data.id
* @returns Community OK
* @throws ApiError
*/
export const useCommunitiesServiceFindOneCommunity = <TData = Common.CommunitiesServiceFindOneCommunityDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCommunitiesServiceFindOneCommunityKeyFn({ id }, queryKey), queryFn: () => CommunitiesService.findOneCommunity({ id }) as TData, ...options });
/**
* Get a personalized feed of posts for the current user
* @returns Post OK
* @throws ApiError
*/
export const usePostsServiceGetFeed = <TData = Common.PostsServiceGetFeedDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePostsServiceGetFeedKeyFn(queryKey), queryFn: () => PostsService.getFeed() as TData, ...options });
/**
* Find all posts in a community
* @param data The data for the request.
* @param data.communityId
* @returns Post OK
* @throws ApiError
*/
export const usePostsServiceFindAllPosts = <TData = Common.PostsServiceFindAllPostsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ communityId }: {
  communityId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePostsServiceFindAllPostsKeyFn({ communityId }, queryKey), queryFn: () => PostsService.findAllPosts({ communityId }) as TData, ...options });
/**
* Find a post by ID in a community
* @param data The data for the request.
* @param data.communityId
* @param data.id
* @returns Post OK
* @throws ApiError
*/
export const usePostsServiceFindOnePost = <TData = Common.PostsServiceFindOnePostDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ communityId, id }: {
  communityId: number;
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePostsServiceFindOnePostKeyFn({ communityId, id }, queryKey), queryFn: () => PostsService.findOnePost({ communityId, id }) as TData, ...options });
/**
* Create a new user using a Firebase ID token
* @param data The data for the request.
* @param data.requestBody
* @returns User Created
* @throws ApiError
*/
export const useUsersServiceCreateUser = <TData = Common.UsersServiceCreateUserMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: CreateUserRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: CreateUserRequest;
}, TContext>({ mutationFn: ({ requestBody }) => UsersService.createUser({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* Create a new community
* @param data The data for the request.
* @param data.requestBody
* @returns Community Created
* @throws ApiError
*/
export const useCommunitiesServiceCreateCommunity = <TData = Common.CommunitiesServiceCreateCommunityMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: CreateCommunityRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: CreateCommunityRequest;
}, TContext>({ mutationFn: ({ requestBody }) => CommunitiesService.createCommunity({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* Join a community
* @param data The data for the request.
* @param data.id
* @returns void No content
* @throws ApiError
*/
export const useCommunitiesServiceJoinCommunity = <TData = Common.CommunitiesServiceJoinCommunityMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
}, TContext>({ mutationFn: ({ id }) => CommunitiesService.joinCommunity({ id }) as unknown as Promise<TData>, ...options });
/**
* Leave a community
* @param data The data for the request.
* @param data.id
* @returns void No content
* @throws ApiError
*/
export const useCommunitiesServiceLeaveCommunity = <TData = Common.CommunitiesServiceLeaveCommunityMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
}, TContext>({ mutationFn: ({ id }) => CommunitiesService.leaveCommunity({ id }) as unknown as Promise<TData>, ...options });
/**
* Create a new post in a community
* @param data The data for the request.
* @param data.communityId
* @param data.requestBody
* @returns Post Created
* @throws ApiError
*/
export const usePostsServiceCreatePost = <TData = Common.PostsServiceCreatePostMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  communityId: number;
  requestBody: CreatePostRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  communityId: number;
  requestBody: CreatePostRequest;
}, TContext>({ mutationFn: ({ communityId, requestBody }) => PostsService.createPost({ communityId, requestBody }) as unknown as Promise<TData>, ...options });
/**
* Upvote a post
* @param data The data for the request.
* @param data.communityId
* @param data.id
* @returns void No content
* @throws ApiError
*/
export const usePostsServiceUpvotePost = <TData = Common.PostsServiceUpvotePostMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  communityId: number;
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  communityId: number;
  id: number;
}, TContext>({ mutationFn: ({ communityId, id }) => PostsService.upvotePost({ communityId, id }) as unknown as Promise<TData>, ...options });
/**
* Downvote a post
* @param data The data for the request.
* @param data.communityId
* @param data.id
* @returns void No content
* @throws ApiError
*/
export const usePostsServiceDownvotePost = <TData = Common.PostsServiceDownvotePostMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  communityId: number;
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  communityId: number;
  id: number;
}, TContext>({ mutationFn: ({ communityId, id }) => PostsService.downvotePost({ communityId, id }) as unknown as Promise<TData>, ...options });
/**
* Update a community
* @param data The data for the request.
* @param data.id
* @param data.requestBody
* @returns Community OK
* @throws ApiError
*/
export const useCommunitiesServiceUpdateCommunity = <TData = Common.CommunitiesServiceUpdateCommunityMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
  requestBody: UpdateCommunityRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
  requestBody: UpdateCommunityRequest;
}, TContext>({ mutationFn: ({ id, requestBody }) => CommunitiesService.updateCommunity({ id, requestBody }) as unknown as Promise<TData>, ...options });
/**
* Update a post in a community
* @param data The data for the request.
* @param data.communityId
* @param data.id
* @param data.requestBody
* @returns Post OK
* @throws ApiError
*/
export const usePostsServiceUpdatePost = <TData = Common.PostsServiceUpdatePostMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  communityId: number;
  id: number;
  requestBody: UpdatePostRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  communityId: number;
  id: number;
  requestBody: UpdatePostRequest;
}, TContext>({ mutationFn: ({ communityId, id, requestBody }) => PostsService.updatePost({ communityId, id, requestBody }) as unknown as Promise<TData>, ...options });
/**
* Delete a community
* @param data The data for the request.
* @param data.id
* @returns void No content
* @throws ApiError
*/
export const useCommunitiesServiceRemoveCommunity = <TData = Common.CommunitiesServiceRemoveCommunityMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
}, TContext>({ mutationFn: ({ id }) => CommunitiesService.removeCommunity({ id }) as unknown as Promise<TData>, ...options });
/**
* Delete a post in a community
* @param data The data for the request.
* @param data.communityId
* @param data.id
* @returns void No content
* @throws ApiError
*/
export const usePostsServiceRemovePost = <TData = Common.PostsServiceRemovePostMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  communityId: number;
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  communityId: number;
  id: number;
}, TContext>({ mutationFn: ({ communityId, id }) => PostsService.removePost({ communityId, id }) as unknown as Promise<TData>, ...options });
/**
* Remove a vote from a post
* @param data The data for the request.
* @param data.communityId
* @param data.id
* @returns void No content
* @throws ApiError
*/
export const usePostsServiceUnvotePost = <TData = Common.PostsServiceUnvotePostMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  communityId: number;
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  communityId: number;
  id: number;
}, TContext>({ mutationFn: ({ communityId, id }) => PostsService.unvotePost({ communityId, id }) as unknown as Promise<TData>, ...options });
