import {
  CommentResponse,
  PostResponse,
  ReplyResponse,
  VoteResponse,
} from "@/client/requests";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function range(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i);
}

export function getRelativeTime(d1: Date, d2 = new Date()) {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const units: Record<string, number> = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };
  const elapsed = d1.getTime() - d2.getTime();

  for (const u in units)
    if (Math.abs(elapsed) > units[u] || u === "second") {
      return rtf.format(
        Math.round(elapsed / units[u]),
        u as Intl.RelativeTimeFormatUnit
      );
    }

  return null;
}

export function initials(name: string) {
  return name
    .split(" ")
    .map(n => n[0])
    .join("");
}

export function normalizeReplyContent(
  content: string,
  remove: boolean = false
) {
  return content.replace(/@{(.+?)-\d+}/, remove ? "" : "@$1").trim();
}

export function extractMentionFromReply(content: string): {
  name: string;
  id: number;
} | null {
  const match = /@{(.+?)-(\d+)}/.exec(content);
  if (!match) return null;

  return {
    name: match[1],
    id: parseInt(match[2]),
  };
}

export function containsMention(content: string) {
  return /@{(.+)-(\d+)}/.test(content);
}

export function isPost(
  item: PostResponse | CommentResponse | ReplyResponse | VoteResponse
): item is PostResponse {
  return "title" in item && "communityId" in item && "content" in item;
}

export function isComment(
  item: PostResponse | CommentResponse | ReplyResponse | VoteResponse
): item is CommentResponse {
  return "postId" in item && "replyCount" in item && "author" in item;
}

export function isReply(
  item: PostResponse | CommentResponse | ReplyResponse | VoteResponse
): item is ReplyResponse {
  return "commentId" in item && !("replyCount" in item) && "author" in item;
}

export function isVote(
  item: PostResponse | CommentResponse | ReplyResponse | VoteResponse
): item is VoteResponse {
  return "voterId" in item && "isUpvote" in item;
}
