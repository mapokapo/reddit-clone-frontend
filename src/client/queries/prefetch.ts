// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { type QueryClient } from "@tanstack/react-query";
import { CommentsService, CommunitiesService, PostsService, RepliesService, UsersService } from "../requests/services.gen";
import { SortBy, Timespan } from "../requests/types.gen";
import * as Common from "./common";
/**
* Get aggregated user data for a user
* This endpoint is used by the client to get user data such as posts, comments, and votes for a user.
* @param data The data for the request.
* @param data.userId
* @param data.include The data to include in the response
* @returns unknown OK
* @throws ApiError
*/
export const prefetchUseUsersServiceGetUserData = (queryClient: QueryClient, { include, userId }: {
  include?: ("posts" | "votes" | "comments" | "replies")[];
  userId: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetUserDataKeyFn({ include, userId }), queryFn: () => UsersService.getUserData({ include, userId }) });
/**
* Get the current user
* This endpoint is used by the client to get the current user. Returns 204 if the authenticated user doesn't have a profile.
* @returns User OK
* @returns void No content
* @throws ApiError
*/
export const prefetchUseUsersServiceGetMe = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetMeKeyFn(), queryFn: () => UsersService.getMe() });
/**
* Get a user's profile by ID
* @param data The data for the request.
* @param data.id
* @returns User OK
* @throws ApiError
*/
export const prefetchUseUsersServiceGetUserById = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetUserByIdKeyFn({ id }), queryFn: () => UsersService.getUserById({ id }) });
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
export const prefetchUseCommentsServiceFindAllComments = (queryClient: QueryClient, { postId, skip, sortBy, take, timespan }: {
  postId: number;
  skip?: number;
  sortBy?: SortBy;
  take?: number;
  timespan?: Timespan;
}) => queryClient.prefetchQuery({ queryKey: Common.UseCommentsServiceFindAllCommentsKeyFn({ postId, skip, sortBy, take, timespan }), queryFn: () => CommentsService.findAllComments({ postId, skip, sortBy, take, timespan }) });
/**
* Get a comment by ID
* @param data The data for the request.
* @param data.commentId
* @returns CommentResponse OK
* @throws ApiError
*/
export const prefetchUseCommentsServiceFindCommentById = (queryClient: QueryClient, { commentId }: {
  commentId: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseCommentsServiceFindCommentByIdKeyFn({ commentId }), queryFn: () => CommentsService.findCommentById({ commentId }) });
/**
* Find all communities the user can see
* @returns Community OK
* @throws ApiError
*/
export const prefetchUseCommunitiesServiceFindAllCommunities = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseCommunitiesServiceFindAllCommunitiesKeyFn(), queryFn: () => CommunitiesService.findAllCommunities() });
/**
* Check if a user is a member of a community
* @param data The data for the request.
* @param data.id
* @returns string OK
* @throws ApiError
*/
export const prefetchUseCommunitiesServiceCheckUserMembership = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseCommunitiesServiceCheckUserMembershipKeyFn({ id }), queryFn: () => CommunitiesService.checkUserMembership({ id }) });
/**
* Find all communities that the current user is a member of
* @returns Community OK
* @throws ApiError
*/
export const prefetchUseCommunitiesServiceFindUserCommunities = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseCommunitiesServiceFindUserCommunitiesKeyFn(), queryFn: () => CommunitiesService.findUserCommunities() });
/**
* Find a community by ID
* @param data The data for the request.
* @param data.id
* @returns Community OK
* @throws ApiError
*/
export const prefetchUseCommunitiesServiceFindOneCommunity = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseCommunitiesServiceFindOneCommunityKeyFn({ id }), queryFn: () => CommunitiesService.findOneCommunity({ id }) });
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
export const prefetchUsePostsServiceGetFeed = (queryClient: QueryClient, { skip, sortBy, take, timespan }: {
  skip?: number;
  sortBy?: SortBy;
  take?: number;
  timespan?: Timespan;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UsePostsServiceGetFeedKeyFn({ skip, sortBy, take, timespan }), queryFn: () => PostsService.getFeed({ skip, sortBy, take, timespan }) });
/**
* Find all posts from communities the user can access
* @returns PostResponse OK
* @throws ApiError
*/
export const prefetchUsePostsServiceFindAllPosts = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UsePostsServiceFindAllPostsKeyFn(), queryFn: () => PostsService.findAllPosts() });
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
export const prefetchUsePostsServiceFindAllPostsByUser = (queryClient: QueryClient, { skip, sortBy, take, timespan, userId }: {
  skip?: number;
  sortBy?: SortBy;
  take?: number;
  timespan?: Timespan;
  userId: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePostsServiceFindAllPostsByUserKeyFn({ skip, sortBy, take, timespan, userId }), queryFn: () => PostsService.findAllPostsByUser({ skip, sortBy, take, timespan, userId }) });
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
export const prefetchUsePostsServiceFindAllPostsInCommunity = (queryClient: QueryClient, { communityId, skip, sortBy, take, timespan }: {
  communityId: number;
  skip?: number;
  sortBy?: SortBy;
  take?: number;
  timespan?: Timespan;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePostsServiceFindAllPostsInCommunityKeyFn({ communityId, skip, sortBy, take, timespan }), queryFn: () => PostsService.findAllPostsInCommunity({ communityId, skip, sortBy, take, timespan }) });
/**
* Find a post by ID
* @param data The data for the request.
* @param data.id
* @returns PostResponse OK
* @throws ApiError
*/
export const prefetchUsePostsServiceFindOnePost = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePostsServiceFindOnePostKeyFn({ id }), queryFn: () => PostsService.findOnePost({ id }) });
/**
* Get all replies for a comment
* @param data The data for the request.
* @param data.commentId
* @returns ReplyResponse OK
* @throws ApiError
*/
export const prefetchUseRepliesServiceFindAllReplies = (queryClient: QueryClient, { commentId }: {
  commentId: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseRepliesServiceFindAllRepliesKeyFn({ commentId }), queryFn: () => RepliesService.findAllReplies({ commentId }) });
/**
* Get a reply by id
* @param data The data for the request.
* @param data.replyId
* @returns ReplyResponse OK
* @throws ApiError
*/
export const prefetchUseRepliesServiceFindOneReply = (queryClient: QueryClient, { replyId }: {
  replyId: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseRepliesServiceFindOneReplyKeyFn({ replyId }), queryFn: () => RepliesService.findOneReply({ replyId }) });
