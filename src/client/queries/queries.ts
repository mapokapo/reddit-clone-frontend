// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { CommentsService, CommunitiesService, PostsService, RepliesService, UsersService } from "../requests/services.gen";
import { CreateCommentRequest, CreateCommunityRequest, CreatePostRequest, CreateReplyRequest, CreateUserRequest, SortBy, Timespan, UpdateCommentRequest, UpdateCommunityRequest, UpdatePostRequest, UpdateReplyRequest } from "../requests/types.gen";
import * as Common from "./common";
/**
* Get aggregated user data for a user
* This endpoint is used by the client to get user data such as posts, comments, and votes for a user.
* @param data The data for the request.
* @param data.userId
* @param data.include
* @returns unknown OK
* @throws ApiError
*/
export const useUsersServiceGetUserData = <TData = Common.UsersServiceGetUserDataDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ include, userId }: {
  include: string[];
  userId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetUserDataKeyFn({ include, userId }, queryKey), queryFn: () => UsersService.getUserData({ include, userId }) as TData, ...options });
/**
* Get the current user
* This endpoint is used by the client to get the current user. Returns 204 if the authenticated user doesn't have a profile.
* @returns User OK
* @returns void No content
* @throws ApiError
*/
export const useUsersServiceGetMe = <TData = Common.UsersServiceGetMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetMeKeyFn(queryKey), queryFn: () => UsersService.getMe() as TData, ...options });
/**
* Get a user's profile by ID
* @param data The data for the request.
* @param data.id
* @returns User OK
* @throws ApiError
*/
export const useUsersServiceGetUserById = <TData = Common.UsersServiceGetUserByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetUserByIdKeyFn({ id }, queryKey), queryFn: () => UsersService.getUserById({ id }) as TData, ...options });
/**
* Get all comments for a post
* @param data The data for the request.
* @param data.postId
* @param data.sortBy
* @param data.timespan
* @param data.skip
* @param data.take
* @returns CommentResponse OK
* @throws ApiError
*/
export const useCommentsServiceFindAllComments = <TData = Common.CommentsServiceFindAllCommentsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ postId, skip, sortBy, take, timespan }: {
  postId: number;
  skip?: number;
  sortBy?: SortBy;
  take?: number;
  timespan?: Timespan;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCommentsServiceFindAllCommentsKeyFn({ postId, skip, sortBy, take, timespan }, queryKey), queryFn: () => CommentsService.findAllComments({ postId, skip, sortBy, take, timespan }) as TData, ...options });
/**
* Get a comment by ID
* @param data The data for the request.
* @param data.commentId
* @returns CommentResponse OK
* @throws ApiError
*/
export const useCommentsServiceFindCommentById = <TData = Common.CommentsServiceFindCommentByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ commentId }: {
  commentId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCommentsServiceFindCommentByIdKeyFn({ commentId }, queryKey), queryFn: () => CommentsService.findCommentById({ commentId }) as TData, ...options });
/**
* Find all communities the user can see
* @returns Community OK
* @throws ApiError
*/
export const useCommunitiesServiceFindAllCommunities = <TData = Common.CommunitiesServiceFindAllCommunitiesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCommunitiesServiceFindAllCommunitiesKeyFn(queryKey), queryFn: () => CommunitiesService.findAllCommunities() as TData, ...options });
/**
* Check if a user is a member of a community
* @param data The data for the request.
* @param data.id
* @returns string OK
* @throws ApiError
*/
export const useCommunitiesServiceCheckUserMembership = <TData = Common.CommunitiesServiceCheckUserMembershipDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCommunitiesServiceCheckUserMembershipKeyFn({ id }, queryKey), queryFn: () => CommunitiesService.checkUserMembership({ id }) as TData, ...options });
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
* @param data The data for the request.
* @param data.sortBy
* @param data.timespan
* @param data.skip
* @param data.take
* @returns PostResponse OK
* @throws ApiError
*/
export const usePostsServiceGetFeed = <TData = Common.PostsServiceGetFeedDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ skip, sortBy, take, timespan }: {
  skip?: number;
  sortBy?: SortBy;
  take?: number;
  timespan?: Timespan;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePostsServiceGetFeedKeyFn({ skip, sortBy, take, timespan }, queryKey), queryFn: () => PostsService.getFeed({ skip, sortBy, take, timespan }) as TData, ...options });
/**
* Find all posts from communities the user can access
* @returns PostResponse OK
* @throws ApiError
*/
export const usePostsServiceFindAllPosts = <TData = Common.PostsServiceFindAllPostsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePostsServiceFindAllPostsKeyFn(queryKey), queryFn: () => PostsService.findAllPosts() as TData, ...options });
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
export const usePostsServiceFindAllPostsByUser = <TData = Common.PostsServiceFindAllPostsByUserDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ skip, sortBy, take, timespan, userId }: {
  skip?: number;
  sortBy?: SortBy;
  take?: number;
  timespan?: Timespan;
  userId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePostsServiceFindAllPostsByUserKeyFn({ skip, sortBy, take, timespan, userId }, queryKey), queryFn: () => PostsService.findAllPostsByUser({ skip, sortBy, take, timespan, userId }) as TData, ...options });
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
export const usePostsServiceFindAllPostsInCommunity = <TData = Common.PostsServiceFindAllPostsInCommunityDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ communityId, skip, sortBy, take, timespan }: {
  communityId: number;
  skip?: number;
  sortBy?: SortBy;
  take?: number;
  timespan?: Timespan;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePostsServiceFindAllPostsInCommunityKeyFn({ communityId, skip, sortBy, take, timespan }, queryKey), queryFn: () => PostsService.findAllPostsInCommunity({ communityId, skip, sortBy, take, timespan }) as TData, ...options });
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
* Get all replies for a comment
* @param data The data for the request.
* @param data.commentId
* @returns ReplyResponse OK
* @throws ApiError
*/
export const useRepliesServiceFindAllReplies = <TData = Common.RepliesServiceFindAllRepliesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ commentId }: {
  commentId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseRepliesServiceFindAllRepliesKeyFn({ commentId }, queryKey), queryFn: () => RepliesService.findAllReplies({ commentId }) as TData, ...options });
/**
* Get a reply by id
* @param data The data for the request.
* @param data.replyId
* @returns ReplyResponse OK
* @throws ApiError
*/
export const useRepliesServiceFindOneReply = <TData = Common.RepliesServiceFindOneReplyDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ replyId }: {
  replyId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseRepliesServiceFindOneReplyKeyFn({ replyId }, queryKey), queryFn: () => RepliesService.findOneReply({ replyId }) as TData, ...options });
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
* @returns CommentResponse Created
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
* Vote a comment up or down
* @param data The data for the request.
* @param data.id
* @param data.isUpvote
* @returns void No content
* @throws ApiError
*/
export const useCommentsServiceVoteComment = <TData = Common.CommentsServiceVoteCommentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
  isUpvote: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
  isUpvote: boolean;
}, TContext>({ mutationFn: ({ id, isUpvote }) => CommentsService.voteComment({ id, isUpvote }) as unknown as Promise<TData>, ...options });
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
* Add a reply to a comment
* @param data The data for the request.
* @param data.commentId
* @param data.requestBody
* @returns ReplyResponse Created
* @throws ApiError
*/
export const useRepliesServiceCreateReply = <TData = Common.RepliesServiceCreateReplyMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  commentId: number;
  requestBody: CreateReplyRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  commentId: number;
  requestBody: CreateReplyRequest;
}, TContext>({ mutationFn: ({ commentId, requestBody }) => RepliesService.createReply({ commentId, requestBody }) as unknown as Promise<TData>, ...options });
/**
* Vote a reply up or down
* @param data The data for the request.
* @param data.id
* @param data.isUpvote
* @returns void No content
* @throws ApiError
*/
export const useRepliesServiceVoteReply = <TData = Common.RepliesServiceVoteReplyMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
  isUpvote: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
  isUpvote: boolean;
}, TContext>({ mutationFn: ({ id, isUpvote }) => RepliesService.voteReply({ id, isUpvote }) as unknown as Promise<TData>, ...options });
/**
* Update a comment
* @param data The data for the request.
* @param data.commentId
* @param data.requestBody
* @returns CommentResponse OK
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
* Update a reply
* @param data The data for the request.
* @param data.replyId
* @param data.requestBody
* @returns ReplyResponse OK
* @throws ApiError
*/
export const useRepliesServiceUpdateReply = <TData = Common.RepliesServiceUpdateReplyMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  replyId: number;
  requestBody: UpdateReplyRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  replyId: number;
  requestBody: UpdateReplyRequest;
}, TContext>({ mutationFn: ({ replyId, requestBody }) => RepliesService.updateReply({ replyId, requestBody }) as unknown as Promise<TData>, ...options });
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
/**
* Delete a reply
* @param data The data for the request.
* @param data.replyId
* @returns void No content
* @throws ApiError
*/
export const useRepliesServiceDeleteReply = <TData = Common.RepliesServiceDeleteReplyMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  replyId: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  replyId: number;
}, TContext>({ mutationFn: ({ replyId }) => RepliesService.deleteReply({ replyId }) as unknown as Promise<TData>, ...options });
/**
* Remove a vote from a reply
* @param data The data for the request.
* @param data.id
* @returns void No content
* @throws ApiError
*/
export const useRepliesServiceUnvoteReply = <TData = Common.RepliesServiceUnvoteReplyMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
}, TContext>({ mutationFn: ({ id }) => RepliesService.unvoteReply({ id }) as unknown as Promise<TData>, ...options });
