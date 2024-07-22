// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { UseQueryResult } from "@tanstack/react-query";
import { CommunitiesService, PostsService, UsersService } from "../requests/services.gen";
export type UsersServiceGetMeDefaultResponse = Awaited<ReturnType<typeof UsersService.getMe>>;
export type UsersServiceGetMeQueryResult<TData = UsersServiceGetMeDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUsersServiceGetMeKey = "UsersServiceGetMe";
export const UseUsersServiceGetMeKeyFn = (queryKey?: Array<unknown>) => [useUsersServiceGetMeKey, ...(queryKey ?? [])];
export type UsersServiceGetUserDataDefaultResponse = Awaited<ReturnType<typeof UsersService.getUserData>>;
export type UsersServiceGetUserDataQueryResult<TData = UsersServiceGetUserDataDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUsersServiceGetUserDataKey = "UsersServiceGetUserData";
export const UseUsersServiceGetUserDataKeyFn = ({ include }: {
  include?: ("posts" | "votes")[];
} = {}, queryKey?: Array<unknown>) => [useUsersServiceGetUserDataKey, ...(queryKey ?? [{ include }])];
export type CommunitiesServiceFindAllCommunitiesDefaultResponse = Awaited<ReturnType<typeof CommunitiesService.findAllCommunities>>;
export type CommunitiesServiceFindAllCommunitiesQueryResult<TData = CommunitiesServiceFindAllCommunitiesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCommunitiesServiceFindAllCommunitiesKey = "CommunitiesServiceFindAllCommunities";
export const UseCommunitiesServiceFindAllCommunitiesKeyFn = (queryKey?: Array<unknown>) => [useCommunitiesServiceFindAllCommunitiesKey, ...(queryKey ?? [])];
export type CommunitiesServiceFindOneCommunityDefaultResponse = Awaited<ReturnType<typeof CommunitiesService.findOneCommunity>>;
export type CommunitiesServiceFindOneCommunityQueryResult<TData = CommunitiesServiceFindOneCommunityDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCommunitiesServiceFindOneCommunityKey = "CommunitiesServiceFindOneCommunity";
export const UseCommunitiesServiceFindOneCommunityKeyFn = ({ id }: {
  id: number;
}, queryKey?: Array<unknown>) => [useCommunitiesServiceFindOneCommunityKey, ...(queryKey ?? [{ id }])];
export type PostsServiceGetFeedDefaultResponse = Awaited<ReturnType<typeof PostsService.getFeed>>;
export type PostsServiceGetFeedQueryResult<TData = PostsServiceGetFeedDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePostsServiceGetFeedKey = "PostsServiceGetFeed";
export const UsePostsServiceGetFeedKeyFn = (queryKey?: Array<unknown>) => [usePostsServiceGetFeedKey, ...(queryKey ?? [])];
export type PostsServiceFindAllPostsDefaultResponse = Awaited<ReturnType<typeof PostsService.findAllPosts>>;
export type PostsServiceFindAllPostsQueryResult<TData = PostsServiceFindAllPostsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePostsServiceFindAllPostsKey = "PostsServiceFindAllPosts";
export const UsePostsServiceFindAllPostsKeyFn = ({ communityId }: {
  communityId: number;
}, queryKey?: Array<unknown>) => [usePostsServiceFindAllPostsKey, ...(queryKey ?? [{ communityId }])];
export type PostsServiceFindAllPostsByUserDefaultResponse = Awaited<ReturnType<typeof PostsService.findAllPostsByUser>>;
export type PostsServiceFindAllPostsByUserQueryResult<TData = PostsServiceFindAllPostsByUserDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePostsServiceFindAllPostsByUserKey = "PostsServiceFindAllPostsByUser";
export const UsePostsServiceFindAllPostsByUserKeyFn = ({ userId }: {
  userId: number;
}, queryKey?: Array<unknown>) => [usePostsServiceFindAllPostsByUserKey, ...(queryKey ?? [{ userId }])];
export type PostsServiceFindOnePostDefaultResponse = Awaited<ReturnType<typeof PostsService.findOnePost>>;
export type PostsServiceFindOnePostQueryResult<TData = PostsServiceFindOnePostDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePostsServiceFindOnePostKey = "PostsServiceFindOnePost";
export const UsePostsServiceFindOnePostKeyFn = ({ communityId, id }: {
  communityId: number;
  id: number;
}, queryKey?: Array<unknown>) => [usePostsServiceFindOnePostKey, ...(queryKey ?? [{ communityId, id }])];
export type UsersServiceCreateUserMutationResult = Awaited<ReturnType<typeof UsersService.createUser>>;
export type CommunitiesServiceCreateCommunityMutationResult = Awaited<ReturnType<typeof CommunitiesService.createCommunity>>;
export type CommunitiesServiceJoinCommunityMutationResult = Awaited<ReturnType<typeof CommunitiesService.joinCommunity>>;
export type CommunitiesServiceLeaveCommunityMutationResult = Awaited<ReturnType<typeof CommunitiesService.leaveCommunity>>;
export type PostsServiceCreatePostMutationResult = Awaited<ReturnType<typeof PostsService.createPost>>;
export type PostsServiceUpvotePostMutationResult = Awaited<ReturnType<typeof PostsService.upvotePost>>;
export type PostsServiceDownvotePostMutationResult = Awaited<ReturnType<typeof PostsService.downvotePost>>;
export type CommunitiesServiceUpdateCommunityMutationResult = Awaited<ReturnType<typeof CommunitiesService.updateCommunity>>;
export type PostsServiceUpdatePostMutationResult = Awaited<ReturnType<typeof PostsService.updatePost>>;
export type CommunitiesServiceRemoveCommunityMutationResult = Awaited<ReturnType<typeof CommunitiesService.removeCommunity>>;
export type PostsServiceRemovePostMutationResult = Awaited<ReturnType<typeof PostsService.removePost>>;
export type PostsServiceUnvotePostMutationResult = Awaited<ReturnType<typeof PostsService.unvotePost>>;
