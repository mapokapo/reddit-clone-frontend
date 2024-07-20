// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { type QueryClient } from "@tanstack/react-query";
import { CommunitiesService, PostsService } from "../requests/services.gen";
import * as Common from "./common";
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
