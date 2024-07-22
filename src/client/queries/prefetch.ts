// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { type QueryClient } from "@tanstack/react-query";
import { CommunitiesService, PostsService, UsersService } from "../requests/services.gen";
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
* Find all communities
* @returns Community OK
* @throws ApiError
*/
export const prefetchUseCommunitiesServiceFindAllCommunities = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseCommunitiesServiceFindAllCommunitiesKeyFn(), queryFn: () => CommunitiesService.findAllCommunities() });
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
* @returns Post OK
* @throws ApiError
*/
export const prefetchUsePostsServiceGetFeed = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UsePostsServiceGetFeedKeyFn(), queryFn: () => PostsService.getFeed() });
/**
* Find all posts in a community
* @param data The data for the request.
* @param data.communityId
* @returns Post OK
* @throws ApiError
*/
export const prefetchUsePostsServiceFindAllPosts = (queryClient: QueryClient, { communityId }: {
  communityId: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePostsServiceFindAllPostsKeyFn({ communityId }), queryFn: () => PostsService.findAllPosts({ communityId }) });
/**
* Find all posts by a user in a community
* @param data The data for the request.
* @param data.userId
* @returns Post OK
* @throws ApiError
*/
export const prefetchUsePostsServiceFindAllPostsByUser = (queryClient: QueryClient, { userId }: {
  userId: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePostsServiceFindAllPostsByUserKeyFn({ userId }), queryFn: () => PostsService.findAllPostsByUser({ userId }) });
/**
* Find a post by ID in a community
* @param data The data for the request.
* @param data.communityId
* @param data.id
* @returns Post OK
* @throws ApiError
*/
export const prefetchUsePostsServiceFindOnePost = (queryClient: QueryClient, { communityId, id }: {
  communityId: number;
  id: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePostsServiceFindOnePostKeyFn({ communityId, id }), queryFn: () => PostsService.findOnePost({ communityId, id }) });
