// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { CommentsService, CommunitiesService, PostsService, UsersService } from "../requests/services.gen";
import { CreateCommentRequest, CreateCommunityRequest, CreatePostRequest, CreateUserRequest, UpdateCommentRequest, UpdateCommunityRequest, UpdatePostRequest } from "../requests/types.gen";
import * as Common from "./common";
/**
* Get the current user
* This endpoint is used by the client to get the current user. Returns 204 if the authenticated user doesn't have a profile.
* @returns User OK
* @returns void No content
* @throws ApiError
*/
export const useUsersServiceGetMe = <TData = Common.UsersServiceGetMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetMeKeyFn(queryKey), queryFn: () => UsersService.getMe() as TData, ...options });
/**
* Get aggregated user data for the current user
* This endpoint is used by the client to get user data such as posts, comments, and votes for the current user.
* @param data The data for the request.
* @param data.include The data to include in the response
* @returns unknown OK
* @throws ApiError
*/
export const useUsersServiceGetUserData = <TData = Common.UsersServiceGetUserDataDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ include }: {
  include?: ("posts" | "votes")[];
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetUserDataKeyFn({ include }, queryKey), queryFn: () => UsersService.getUserData({ include }) as TData, ...options });
/**
* Get all comments for a post
* @param data The data for the request.
* @param data.postId
* @param data.depth The depth of the comment tree to return
* @returns Comment OK
* @throws ApiError
*/
export const useCommentsServiceFindAllComments = <TData = Common.CommentsServiceFindAllCommentsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ depth, postId }: {
  depth?: number;
  postId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCommentsServiceFindAllCommentsKeyFn({ depth, postId }, queryKey), queryFn: () => CommentsService.findAllComments({ depth, postId }) as TData, ...options });
/**
* Get a comment by ID
* @param data The data for the request.
* @param data.commentId
* @param data.depth The depth of the comment tree to return
* @returns Comment OK
* @throws ApiError
*/
export const useCommentsServiceFindCommentById = <TData = Common.CommentsServiceFindCommentByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ commentId, depth }: {
  commentId: number;
  depth?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCommentsServiceFindCommentByIdKeyFn({ commentId, depth }, queryKey), queryFn: () => CommentsService.findCommentById({ commentId, depth }) as TData, ...options });
/**
* Find all communities
* @returns Community OK
* @throws ApiError
*/
export const useCommunitiesServiceFindAllCommunities = <TData = Common.CommunitiesServiceFindAllCommunitiesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCommunitiesServiceFindAllCommunitiesKeyFn(queryKey), queryFn: () => CommunitiesService.findAllCommunities() as TData, ...options });
/**
* Find all communities that the current user is a member of
* @returns Community OK
* @throws ApiError
*/
export const useCommunitiesServiceFindUserCommunities = <TData = Common.CommunitiesServiceFindUserCommunitiesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCommunitiesServiceFindUserCommunitiesKeyFn(queryKey), queryFn: () => CommunitiesService.findUserCommunities() as TData, ...options });
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
* @returns PostResponse OK
* @throws ApiError
*/
export const usePostsServiceGetFeed = <TData = Common.PostsServiceGetFeedDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePostsServiceGetFeedKeyFn(queryKey), queryFn: () => PostsService.getFeed() as TData, ...options });
/**
* Find all posts by a user
* @param data The data for the request.
* @param data.userId
* @returns PostResponse OK
* @throws ApiError
*/
export const usePostsServiceFindAllPostsByUser = <TData = Common.PostsServiceFindAllPostsByUserDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ userId }: {
  userId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePostsServiceFindAllPostsByUserKeyFn({ userId }, queryKey), queryFn: () => PostsService.findAllPostsByUser({ userId }) as TData, ...options });
/**
* Find all posts in a community
* @param data The data for the request.
* @param data.communityId
* @returns PostResponse OK
* @throws ApiError
*/
export const usePostsServiceFindAllPosts = <TData = Common.PostsServiceFindAllPostsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ communityId }: {
  communityId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePostsServiceFindAllPostsKeyFn({ communityId }, queryKey), queryFn: () => PostsService.findAllPosts({ communityId }) as TData, ...options });
/**
* Find a post by ID
* @param data The data for the request.
* @param data.id
* @returns PostResponse OK
* @throws ApiError
*/
export const usePostsServiceFindOnePost = <TData = Common.PostsServiceFindOnePostDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePostsServiceFindOnePostKeyFn({ id }, queryKey), queryFn: () => PostsService.findOnePost({ id }) as TData, ...options });
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
* Add a comment to a post
* @param data The data for the request.
* @param data.postId
* @param data.requestBody
* @returns Comment Created
* @throws ApiError
*/
export const useCommentsServiceCreateComment = <TData = Common.CommentsServiceCreateCommentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  postId: number;
  requestBody: CreateCommentRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  postId: number;
  requestBody: CreateCommentRequest;
}, TContext>({ mutationFn: ({ postId, requestBody }) => CommentsService.createComment({ postId, requestBody }) as unknown as Promise<TData>, ...options });
/**
* Upvote a comment
* @param data The data for the request.
* @param data.id
* @returns void No content
* @throws ApiError
*/
export const useCommentsServiceUpvoteComment = <TData = Common.CommentsServiceUpvoteCommentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
}, TContext>({ mutationFn: ({ id }) => CommentsService.upvoteComment({ id }) as unknown as Promise<TData>, ...options });
/**
* Downvote a comment
* @param data The data for the request.
* @param data.id
* @returns void No content
* @throws ApiError
*/
export const useCommentsServiceDownvoteComment = <TData = Common.CommentsServiceDownvoteCommentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
}, TContext>({ mutationFn: ({ id }) => CommentsService.downvoteComment({ id }) as unknown as Promise<TData>, ...options });
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
* @returns PostResponse Created
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
* Vote a post up or down
* @param data The data for the request.
* @param data.id
* @param data.isUpvote
* @returns void No content
* @throws ApiError
*/
export const usePostsServiceVotePost = <TData = Common.PostsServiceVotePostMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
  isUpvote: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
  isUpvote: boolean;
}, TContext>({ mutationFn: ({ id, isUpvote }) => PostsService.votePost({ id, isUpvote }) as unknown as Promise<TData>, ...options });
/**
* Update a comment
* @param data The data for the request.
* @param data.commentId
* @param data.requestBody
* @returns Comment OK
* @throws ApiError
*/
export const useCommentsServiceUpdateComment = <TData = Common.CommentsServiceUpdateCommentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  commentId: number;
  requestBody: UpdateCommentRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  commentId: number;
  requestBody: UpdateCommentRequest;
}, TContext>({ mutationFn: ({ commentId, requestBody }) => CommentsService.updateComment({ commentId, requestBody }) as unknown as Promise<TData>, ...options });
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
* Update a post
* @param data The data for the request.
* @param data.id
* @param data.requestBody
* @returns PostResponse OK
* @throws ApiError
*/
export const usePostsServiceUpdatePost = <TData = Common.PostsServiceUpdatePostMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
  requestBody: UpdatePostRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
  requestBody: UpdatePostRequest;
}, TContext>({ mutationFn: ({ id, requestBody }) => PostsService.updatePost({ id, requestBody }) as unknown as Promise<TData>, ...options });
/**
* Delete a comment
* @param data The data for the request.
* @param data.commentId
* @returns void No content
* @throws ApiError
*/
export const useCommentsServiceDeleteComment = <TData = Common.CommentsServiceDeleteCommentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  commentId: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  commentId: number;
}, TContext>({ mutationFn: ({ commentId }) => CommentsService.deleteComment({ commentId }) as unknown as Promise<TData>, ...options });
/**
* Remove a vote from a comment
* @param data The data for the request.
* @param data.id
* @returns void No content
* @throws ApiError
*/
export const useCommentsServiceUnvoteComment = <TData = Common.CommentsServiceUnvoteCommentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
}, TContext>({ mutationFn: ({ id }) => CommentsService.unvoteComment({ id }) as unknown as Promise<TData>, ...options });
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
* Delete a post
* @param data The data for the request.
* @param data.id
* @returns void No content
* @throws ApiError
*/
export const usePostsServiceRemovePost = <TData = Common.PostsServiceRemovePostMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
}, TContext>({ mutationFn: ({ id }) => PostsService.removePost({ id }) as unknown as Promise<TData>, ...options });
/**
* Remove a vote from a post
* @param data The data for the request.
* @param data.id
* @returns void No content
* @throws ApiError
*/
export const usePostsServiceUnvotePost = <TData = Common.PostsServiceUnvotePostMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
}, TContext>({ mutationFn: ({ id }) => PostsService.unvotePost({ id }) as unknown as Promise<TData>, ...options });
