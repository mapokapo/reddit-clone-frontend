// This file is auto-generated by @hey-api/openapi-ts

export const $CreateUserRequest = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
  },
  required: ["name"],
} as const;

export const $CreateCommunityRequest = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  required: ["name", "description"],
} as const;

export const $Community = {
  type: "object",
  properties: {
    id: {
      type: "number",
    },
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    createdAt: {
      format: "date-time",
      type: "string",
    },
  },
  required: ["id", "name", "description", "createdAt"],
} as const;

export const $UpdateCommunityRequest = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
} as const;

export const $CreatePostRequest = {
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    content: {
      type: "string",
    },
  },
  required: ["title", "content"],
} as const;

export const $Post = {
  type: "object",
  properties: {
    id: {
      type: "number",
    },
    title: {
      type: "string",
    },
    content: {
      type: "string",
    },
    votes: {
      type: "number",
    },
    createdAt: {
      format: "date-time",
      type: "string",
    },
    updatedAt: {
      format: "date-time",
      type: "string",
    },
  },
  required: ["id", "title", "content", "votes", "createdAt", "updatedAt"],
} as const;

export const $UpdatePostRequest = {
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    content: {
      type: "string",
    },
  },
} as const;
