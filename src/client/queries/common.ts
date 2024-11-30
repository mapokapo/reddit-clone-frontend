// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { UseQueryResult } from "@tanstack/react-query";
import { CommentsService, CommunitiesService, PostsService, RepliesService, UsersService } from "../requests/services.gen";
import { SortBy, Timespan } from "../requests/types.gen";
export type UsersServiceGetMeDefaultResponse = Awaited<ReturnType<typeof UsersService.getMe>>;
export type UsersServiceGetMeQueryResult<TData = UsersServiceGetMeDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUsersServiceGetMeKey = "UsersServiceGetMe";
export const UseUsersServiceGetMeKeyFn = (queryKey?: Array<unknown>) => [useUsersServiceGetMeKey, ...(queryKey ?? [])];
export type UsersServiceGetUserDataDefaultResponse = Awaited<ReturnType<typeof UsersService.getUserData>>;
export type UsersServiceGetUserDataQueryResult<TData = UsersServiceGetUserDataDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUsersServiceGetUserDataKey = "UsersServiceGetUserData";
export const UseUsersServiceGetUserDataKeyFn = ({ include }: {
  include?: ("posts" | "votes" | "comments" | "replies")[];
} = {}, queryKey?: Array<unknown>) => [useUsersServiceGetUserDataKey, ...(queryKey ?? [{ include }])];
export type UsersServiceGetUserByIdDefaultResponse = Awaited<ReturnType<typeof UsersService.getUserById>>;
export type UsersServiceGetUserByIdQueryResult<TData = UsersServiceGetUserByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUsersServiceGetUserByIdKey = "UsersServiceGetUserById";
export const UseUsersServiceGetUserByIdKeyFn = ({ id }: {
  id: number;
}, queryKey?: Array<unknown>) => [useUsersServiceGetUserByIdKey, ...(queryKey ?? [{ id }])];
export type CommentsServiceFindAllCommentsDefaultResponse = Awaited<ReturnType<typeof CommentsService.findAllComments>>;
export type CommentsServiceFindAllCommentsQueryResult<TData = CommentsServiceFindAllCommentsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCommentsServiceFindAllCommentsKey = "CommentsServiceFindAllComments";
export const UseCommentsServiceFindAllCommentsKeyFn = ({ postId, skip, sortBy, take, timespan }: {
  postId: number;
  skip?: number;
  sortBy?: SortBy;
  take?: number;
  timespan?: Timespan;
}, queryKey?: Array<unknown>) => [useCommentsServiceFindAllCommentsKey, ...(queryKey ?? [{ postId, skip, sortBy, take, timespan }])];
export type CommentsServiceFindCommentByIdDefaultResponse = Awaited<ReturnType<typeof CommentsService.findCommentById>>;
export type CommentsServiceFindCommentByIdQueryResult<TData = CommentsServiceFindCommentByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCommentsServiceFindCommentByIdKey = "CommentsServiceFindCommentById";
export const UseCommentsServiceFindCommentByIdKeyFn = ({ commentId }: {
  commentId: number;
}, queryKey?: Array<unknown>) => [useCommentsServiceFindCommentByIdKey, ...(queryKey ?? [{ commentId }])];
export type CommunitiesServiceFindAllCommunitiesDefaultResponse = Awaited<ReturnType<typeof CommunitiesService.findAllCommunities>>;
export type CommunitiesServiceFindAllCommunitiesQueryResult<TData = CommunitiesServiceFindAllCommunitiesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCommunitiesServiceFindAllCommunitiesKey = "CommunitiesServiceFindAllCommunities";
export const UseCommunitiesServiceFindAllCommunitiesKeyFn = (queryKey?: Array<unknown>) => [useCommunitiesServiceFindAllCommunitiesKey, ...(queryKey ?? [])];
export type CommunitiesServiceCheckUserMembershipDefaultResponse = Awaited<ReturnType<typeof CommunitiesService.checkUserMembership>>;
export type CommunitiesServiceCheckUserMembershipQueryResult<TData = CommunitiesServiceCheckUserMembershipDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCommunitiesServiceCheckUserMembershipKey = "CommunitiesServiceCheckUserMembership";
export const UseCommunitiesServiceCheckUserMembershipKeyFn = ({ id }: {
  id: number;
}, queryKey?: Array<unknown>) => [useCommunitiesServiceCheckUserMembershipKey, ...(queryKey ?? [{ id }])];
export type CommunitiesServiceFindUserCommunitiesDefaultResponse = Awaited<ReturnType<typeof CommunitiesService.findUserCommunities>>;
export type CommunitiesServiceFindUserCommunitiesQueryResult<TData = CommunitiesServiceFindUserCommunitiesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCommunitiesServiceFindUserCommunitiesKey = "CommunitiesServiceFindUserCommunities";
export const UseCommunitiesServiceFindUserCommunitiesKeyFn = (queryKey?: Array<unknown>) => [useCommunitiesServiceFindUserCommunitiesKey, ...(queryKey ?? [])];
export type CommunitiesServiceFindOneCommunityDefaultResponse = Awaited<ReturnType<typeof CommunitiesService.findOneCommunity>>;
export type CommunitiesServiceFindOneCommunityQueryResult<TData = CommunitiesServiceFindOneCommunityDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCommunitiesServiceFindOneCommunityKey = "CommunitiesServiceFindOneCommunity";
export const UseCommunitiesServiceFindOneCommunityKeyFn = ({ id }: {
  id: number;
}, queryKey?: Array<unknown>) => [useCommunitiesServiceFindOneCommunityKey, ...(queryKey ?? [{ id }])];
export type PostsServiceGetFeedDefaultResponse = Awaited<ReturnType<typeof PostsService.getFeed>>;
export type PostsServiceGetFeedQueryResult<TData = PostsServiceGetFeedDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePostsServiceGetFeedKey = "PostsServiceGetFeed";
export const UsePostsServiceGetFeedKeyFn = ({ skip, sortBy, take, timespan }: {
  skip?: number;
  sortBy?: SortBy;
  take?: number;
  timespan?: Timespan;
} = {}, queryKey?: Array<unknown>) => [usePostsServiceGetFeedKey, ...(queryKey ?? [{ skip, sortBy, take, timespan }])];
export type PostsServiceFindAllPostsDefaultResponse = Awaited<ReturnType<typeof PostsService.findAllPosts>>;
export type PostsServiceFindAllPostsQueryResult<TData = PostsServiceFindAllPostsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePostsServiceFindAllPostsKey = "PostsServiceFindAllPosts";
export const UsePostsServiceFindAllPostsKeyFn = (queryKey?: Array<unknown>) => [usePostsServiceFindAllPostsKey, ...(queryKey ?? [])];
export type PostsServiceFindAllPostsByUserDefaultResponse = Awaited<ReturnType<typeof PostsService.findAllPostsByUser>>;
export type PostsServiceFindAllPostsByUserQueryResult<TData = PostsServiceFindAllPostsByUserDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePostsServiceFindAllPostsByUserKey = "PostsServiceFindAllPostsByUser";
export const UsePostsServiceFindAllPostsByUserKeyFn = ({ skip, sortBy, take, timespan, userId }: {
  skip?: number;
  sortBy?: SortBy;
  take?: number;
  timespan?: Timespan;
  userId: number;
}, queryKey?: Array<unknown>) => [usePostsServiceFindAllPostsByUserKey, ...(queryKey ?? [{ skip, sortBy, take, timespan, userId }])];
export type PostsServiceFindAllPostsInCommunityDefaultResponse = Awaited<ReturnType<typeof PostsService.findAllPostsInCommunity>>;
export type PostsServiceFindAllPostsInCommunityQueryResult<TData = PostsServiceFindAllPostsInCommunityDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePostsServiceFindAllPostsInCommunityKey = "PostsServiceFindAllPostsInCommunity";
export const UsePostsServiceFindAllPostsInCommunityKeyFn = ({ communityId, skip, sortBy, take, timespan }: {
  communityId: number;
  skip?: number;
  sortBy?: SortBy;
  take?: number;
  timespan?: Timespan;
}, queryKey?: Array<unknown>) => [usePostsServiceFindAllPostsInCommunityKey, ...(queryKey ?? [{ communityId, skip, sortBy, take, timespan }])];
export type PostsServiceFindOnePostDefaultResponse = Awaited<ReturnType<typeof PostsService.findOnePost>>;
export type PostsServiceFindOnePostQueryResult<TData = PostsServiceFindOnePostDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePostsServiceFindOnePostKey = "PostsServiceFindOnePost";
export const UsePostsServiceFindOnePostKeyFn = ({ id }: {
  id: number;
}, queryKey?: Array<unknown>) => [usePostsServiceFindOnePostKey, ...(queryKey ?? [{ id }])];
export type RepliesServiceFindAllRepliesDefaultResponse = Awaited<ReturnType<typeof RepliesService.findAllReplies>>;
export type RepliesServiceFindAllRepliesQueryResult<TData = RepliesServiceFindAllRepliesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useRepliesServiceFindAllRepliesKey = "RepliesServiceFindAllReplies";
export const UseRepliesServiceFindAllRepliesKeyFn = ({ commentId }: {
  commentId: number;
}, queryKey?: Array<unknown>) => [useRepliesServiceFindAllRepliesKey, ...(queryKey ?? [{ commentId }])];
export type RepliesServiceFindOneReplyDefaultResponse = Awaited<ReturnType<typeof RepliesService.findOneReply>>;
export type RepliesServiceFindOneReplyQueryResult<TData = RepliesServiceFindOneReplyDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useRepliesServiceFindOneReplyKey = "RepliesServiceFindOneReply";
export const UseRepliesServiceFindOneReplyKeyFn = ({ replyId }: {
  replyId: number;
}, queryKey?: Array<unknown>) => [useRepliesServiceFindOneReplyKey, ...(queryKey ?? [{ replyId }])];
export type UsersServiceCreateUserMutationResult = Awaited<ReturnType<typeof UsersService.createUser>>;
export type CommentsServiceCreateCommentMutationResult = Awaited<ReturnType<typeof CommentsService.createComment>>;
export type CommentsServiceVoteCommentMutationResult = Awaited<ReturnType<typeof CommentsService.voteComment>>;
export type CommunitiesServiceCreateCommunityMutationResult = Awaited<ReturnType<typeof CommunitiesService.createCommunity>>;
export type CommunitiesServiceJoinCommunityMutationResult = Awaited<ReturnType<typeof CommunitiesService.joinCommunity>>;
export type CommunitiesServiceLeaveCommunityMutationResult = Awaited<ReturnType<typeof CommunitiesService.leaveCommunity>>;
export type PostsServiceCreatePostMutationResult = Awaited<ReturnType<typeof PostsService.createPost>>;
export type PostsServiceVotePostMutationResult = Awaited<ReturnType<typeof PostsService.votePost>>;
export type RepliesServiceCreateReplyMutationResult = Awaited<ReturnType<typeof RepliesService.createReply>>;
export type RepliesServiceVoteReplyMutationResult = Awaited<ReturnType<typeof RepliesService.voteReply>>;
export type CommentsServiceUpdateCommentMutationResult = Awaited<ReturnType<typeof CommentsService.updateComment>>;
export type CommunitiesServiceUpdateCommunityMutationResult = Awaited<ReturnType<typeof CommunitiesService.updateCommunity>>;
export type PostsServiceUpdatePostMutationResult = Awaited<ReturnType<typeof PostsService.updatePost>>;
export type RepliesServiceUpdateReplyMutationResult = Awaited<ReturnType<typeof RepliesService.updateReply>>;
export type CommentsServiceDeleteCommentMutationResult = Awaited<ReturnType<typeof CommentsService.deleteComment>>;
export type CommentsServiceUnvoteCommentMutationResult = Awaited<ReturnType<typeof CommentsService.unvoteComment>>;
export type CommunitiesServiceRemoveCommunityMutationResult = Awaited<ReturnType<typeof CommunitiesService.removeCommunity>>;
export type PostsServiceRemovePostMutationResult = Awaited<ReturnType<typeof PostsService.removePost>>;
export type PostsServiceUnvotePostMutationResult = Awaited<ReturnType<typeof PostsService.unvotePost>>;
export type RepliesServiceDeleteReplyMutationResult = Awaited<ReturnType<typeof RepliesService.deleteReply>>;
export type RepliesServiceUnvoteReplyMutationResult = Awaited<ReturnType<typeof RepliesService.unvoteReply>>;
