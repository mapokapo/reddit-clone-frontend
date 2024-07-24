// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { type QueryClient } from "@tanstack/react-query";
import { CommentsService, CommunitiesService, PostsService, UsersService } from "../requests/services.gen";
import * as Common from "./common";
/**
* Get the current user
* This endpoint is used by the client to get the current user. Returns 204 if the authenticated user doesn't have a profile.
* @returns User OK
* @returns void No content
* @throws ApiError
*/
export const prefetchUseUsersServiceGetMe = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetMeKeyFn(), queryFn: () => UsersService.getMe() });
/**
* Get aggregated user data for the current user
* This endpoint is used by the client to get user data such as posts, comments, and votes for the current user.
* @param data The data for the request.
* @param data.include The data to include in the response
* @returns unknown OK
* @throws ApiError
*/
export const prefetchUseUsersServiceGetUserData = (queryClient: QueryClient, { include }: {
  include?: ("posts" | "votes")[];
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetUserDataKeyFn({ include }), queryFn: () => UsersService.getUserData({ include }) });
/**
* Get all comments for a post
* @param data The data for the request.
* @param data.postId
* @param data.depth The depth of the comment tree to return
* @returns Comment OK
* @throws ApiError
*/
export const prefetchUseCommentsServiceFindAllComments = (queryClient: QueryClient, { depth, postId }: {
  depth?: number;
  postId: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseCommentsServiceFindAllCommentsKeyFn({ depth, postId }), queryFn: () => CommentsService.findAllComments({ depth, postId }) });
/**
* Get a comment by ID
* @param data The data for the request.
* @param data.commentId
* @param data.depth The depth of the comment tree to return
* @returns Comment OK
* @throws ApiError
*/
export const prefetchUseCommentsServiceFindCommentById = (queryClient: QueryClient, { commentId, depth }: {
  commentId: number;
  depth?: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseCommentsServiceFindCommentByIdKeyFn({ commentId, depth }), queryFn: () => CommentsService.findCommentById({ commentId, depth }) });
/**
* Find all communities
* @returns Community OK
* @throws ApiError
*/
export const prefetchUseCommunitiesServiceFindAllCommunities = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseCommunitiesServiceFindAllCommunitiesKeyFn(), queryFn: () => CommunitiesService.findAllCommunities() });
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
* @returns PostResponse OK
* @throws ApiError
*/
export const prefetchUsePostsServiceGetFeed = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UsePostsServiceGetFeedKeyFn(), queryFn: () => PostsService.getFeed() });
/**
* Find all posts by a user
* @param data The data for the request.
* @param data.userId
* @returns PostResponse OK
* @throws ApiError
*/
export const prefetchUsePostsServiceFindAllPostsByUser = (queryClient: QueryClient, { userId }: {
  userId: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePostsServiceFindAllPostsByUserKeyFn({ userId }), queryFn: () => PostsService.findAllPostsByUser({ userId }) });
/**
* Find all posts in a community
* @param data The data for the request.
* @param data.communityId
* @returns PostResponse OK
* @throws ApiError
*/
export const prefetchUsePostsServiceFindAllPosts = (queryClient: QueryClient, { communityId }: {
  communityId: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePostsServiceFindAllPostsKeyFn({ communityId }), queryFn: () => PostsService.findAllPosts({ communityId }) });
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
