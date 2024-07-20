// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from "./core/CancelablePromise";
import { OpenAPI } from "./core/OpenAPI";
import { request as __request } from "./core/request";
import type {
  CreateUserData,
  CreateUserResponse,
  CreateCommunityData,
  CreateCommunityResponse,
  FindAllCommunitiesResponse,
  FindOneCommunityData,
  FindOneCommunityResponse,
  UpdateCommunityData,
  UpdateCommunityResponse,
  RemoveCommunityData,
  RemoveCommunityResponse,
  JoinCommunityData,
  JoinCommunityResponse,
  LeaveCommunityData,
  LeaveCommunityResponse,
  CreatePostData,
  CreatePostResponse,
  FindAllPostsData,
  FindAllPostsResponse,
  FindOnePostData,
  FindOnePostResponse,
  UpdatePostData,
  UpdatePostResponse,
  RemovePostData,
  RemovePostResponse,
  UpvotePostData,
  UpvotePostResponse,
  DownvotePostData,
  DownvotePostResponse,
  UnvotePostData,
  UnvotePostResponse,
} from "./types.gen";

export class UsersService {
  /**
   * Create a new user using a Firebase ID token
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown User created
   * @throws ApiError
   */
  public static createUser(
    data: CreateUserData
  ): CancelablePromise<CreateUserResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/users",
      body: data.requestBody,
      mediaType: "application/json",
      errors: {
        401: "Unauthorized",
      },
    });
  }
}

export class CommunitiesService {
  /**
   * Create a new community
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown Created
   * @throws ApiError
   */
  public static createCommunity(
    data: CreateCommunityData
  ): CancelablePromise<CreateCommunityResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/communities",
      body: data.requestBody,
      mediaType: "application/json",
      errors: {
        401: "Unauthorized",
      },
    });
  }

  /**
   * Find all communities
   * @returns Community OK
   * @throws ApiError
   */
  public static findAllCommunities(): CancelablePromise<FindAllCommunitiesResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/communities",
    });
  }

  /**
   * Find a community by ID
   * @param data The data for the request.
   * @param data.id
   * @returns Community OK
   * @throws ApiError
   */
  public static findOneCommunity(
    data: FindOneCommunityData
  ): CancelablePromise<FindOneCommunityResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/communities/{id}",
      path: {
        id: data.id,
      },
    });
  }

  /**
   * Update a community
   * @param data The data for the request.
   * @param data.id
   * @param data.requestBody
   * @returns void No content
   * @throws ApiError
   */
  public static updateCommunity(
    data: UpdateCommunityData
  ): CancelablePromise<UpdateCommunityResponse> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/communities/{id}",
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: "application/json",
      errors: {
        401: "Unauthorized",
      },
    });
  }

  /**
   * Delete a community
   * @param data The data for the request.
   * @param data.id
   * @returns void No content
   * @throws ApiError
   */
  public static removeCommunity(
    data: RemoveCommunityData
  ): CancelablePromise<RemoveCommunityResponse> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/communities/{id}",
      path: {
        id: data.id,
      },
      errors: {
        401: "Unauthorized",
      },
    });
  }

  /**
   * Join a community
   * @param data The data for the request.
   * @param data.id
   * @returns void No content
   * @throws ApiError
   */
  public static joinCommunity(
    data: JoinCommunityData
  ): CancelablePromise<JoinCommunityResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/communities/{id}/join",
      path: {
        id: data.id,
      },
      errors: {
        401: "Unauthorized",
      },
    });
  }

  /**
   * Leave a community
   * @param data The data for the request.
   * @param data.id
   * @returns void No content
   * @throws ApiError
   */
  public static leaveCommunity(
    data: LeaveCommunityData
  ): CancelablePromise<LeaveCommunityResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/communities/{id}/leave",
      path: {
        id: data.id,
      },
      errors: {
        401: "Unauthorized",
      },
    });
  }
}

export class PostsService {
  /**
   * Create a new post in a community
   * @param data The data for the request.
   * @param data.communityId
   * @param data.requestBody
   * @returns unknown Created
   * @throws ApiError
   */
  public static createPost(
    data: CreatePostData
  ): CancelablePromise<CreatePostResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/posts/{communityId}",
      path: {
        communityId: data.communityId,
      },
      body: data.requestBody,
      mediaType: "application/json",
      errors: {
        401: "Unauthorized",
      },
    });
  }

  /**
   * Find all posts in a community
   * @param data The data for the request.
   * @param data.communityId
   * @returns Post OK
   * @throws ApiError
   */
  public static findAllPosts(
    data: FindAllPostsData
  ): CancelablePromise<FindAllPostsResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/posts/{communityId}",
      path: {
        communityId: data.communityId,
      },
    });
  }

  /**
   * Find a post by ID in a community
   * @param data The data for the request.
   * @param data.communityId
   * @param data.id
   * @returns Post OK
   * @throws ApiError
   */
  public static findOnePost(
    data: FindOnePostData
  ): CancelablePromise<FindOnePostResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/posts/{communityId}/{id}",
      path: {
        communityId: data.communityId,
        id: data.id,
      },
    });
  }

  /**
   * Update a post in a community
   * @param data The data for the request.
   * @param data.communityId
   * @param data.id
   * @param data.requestBody
   * @returns void No content
   * @throws ApiError
   */
  public static updatePost(
    data: UpdatePostData
  ): CancelablePromise<UpdatePostResponse> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/posts/{communityId}/{id}",
      path: {
        communityId: data.communityId,
        id: data.id,
      },
      body: data.requestBody,
      mediaType: "application/json",
      errors: {
        401: "Unauthorized",
      },
    });
  }

  /**
   * Delete a post in a community
   * @param data The data for the request.
   * @param data.communityId
   * @param data.id
   * @returns void No content
   * @throws ApiError
   */
  public static removePost(
    data: RemovePostData
  ): CancelablePromise<RemovePostResponse> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/posts/{communityId}/{id}",
      path: {
        communityId: data.communityId,
        id: data.id,
      },
      errors: {
        401: "Unauthorized",
      },
    });
  }

  /**
   * Upvote a post
   * @param data The data for the request.
   * @param data.communityId
   * @param data.id
   * @returns void No content
   * @throws ApiError
   */
  public static upvotePost(
    data: UpvotePostData
  ): CancelablePromise<UpvotePostResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/posts/{communityId}/{id}/upvote",
      path: {
        communityId: data.communityId,
        id: data.id,
      },
      errors: {
        401: "Unauthorized",
      },
    });
  }

  /**
   * Downvote a post
   * @param data The data for the request.
   * @param data.communityId
   * @param data.id
   * @returns void No content
   * @throws ApiError
   */
  public static downvotePost(
    data: DownvotePostData
  ): CancelablePromise<DownvotePostResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/posts/{communityId}/{id}/downvote",
      path: {
        communityId: data.communityId,
        id: data.id,
      },
      errors: {
        401: "Unauthorized",
      },
    });
  }

  /**
   * Remove a vote from a post
   * @param data The data for the request.
   * @param data.communityId
   * @param data.id
   * @returns void No content
   * @throws ApiError
   */
  public static unvotePost(
    data: UnvotePostData
  ): CancelablePromise<UnvotePostResponse> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/posts/{communityId}/{id}/unvote",
      path: {
        communityId: data.communityId,
        id: data.id,
      },
      errors: {
        401: "Unauthorized",
      },
    });
  }
}
