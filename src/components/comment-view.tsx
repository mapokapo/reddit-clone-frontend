import {
  CommentResponse,
  CommentsService,
  RepliesService,
  ReplyResponse,
  User,
} from "@/client/requests";
import { getRelativeTime } from "@/lib/utils";
import {
  Dot,
  Ellipsis,
  Reply,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import RepliesList from "@/components/replies-list";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import VotingButtons from "@/components/voting-buttons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserProfile } from "@/components/user-provider";
import { mapFetchErrors } from "@/lib/fetcher";
import mapErrorToMessage from "@/lib/mapError";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

enum Dialogs {
  deleteCommentDialog = "deleteCommentDialog",
  editCommentDialog = "editCommentDialog",
}

type Props = {
  comment: CommentResponse;
};

const CommentView: React.FC<Props> = ({ comment }) => {
  const { profile } = useUserProfile();
  const queryClient = useQueryClient();

  const [repliesEnabled, setRepliesEnabled] = useState(false);
  const [editCommentText, setEditCommentText] = useState("");
  const [dialog, setDialog] = useState<Dialogs | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [replyingTo, setReplyingTo] = useState<User | null>(null);

  const {
    mutateAsync: mutateDeleteCommentAsync,
    isPending: deleteCommentIsPending,
  } = useMutation({
    mutationFn: ({ commentId }: { commentId: number }) =>
      mapFetchErrors({
        fetchFunction: () =>
          CommentsService.deleteComment({
            commentId,
          }),
        key: `/comments/${commentId}`,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["comments", comment.postId],
      });
    },
  });

  const {
    mutateAsync: mutateEditCommentAsync,
    isPending: editCommentIsPending,
  } = useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) =>
      mapFetchErrors({
        fetchFunction: () =>
          CommentsService.updateComment({
            commentId,
            requestBody: {
              content,
            },
          }),
        key: `/comments/${commentId}`,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["comments", comment.postId],
      });
    },
  });

  const {
    mutateAsync: mutateCreateReplyAsync,
    isPending: createReplyIsPending,
  } = useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) =>
      mapFetchErrors({
        fetchFunction: () =>
          RepliesService.createReply({
            commentId,
            requestBody: {
              content,
            },
          }),
        key: `/replies/${commentId}`,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["replies", comment.id],
      });
      await queryClient.invalidateQueries({
        queryKey: ["comments", comment.postId],
      });
    },
  });

  const onDelete = async (commentId: number) => {
    try {
      await mutateDeleteCommentAsync({ commentId });
      setDialog(null);
    } catch (e) {
      const [text, details] = mapErrorToMessage(e);
      toast.error(text, {
        description: details,
      });
    }
  };

  const onEdit = async (commentId: number, content: string) => {
    try {
      await mutateEditCommentAsync({ commentId, content });
      setDialog(null);
    } catch (e) {
      const [text, details] = mapErrorToMessage(e);
      toast.error(text, {
        description: details,
      });
    }
  };

  const onReply = async (commentId: number, content: string) => {
    try {
      await mutateCreateReplyAsync({
        commentId,
        content:
          replyingTo !== null
            ? `@{${replyingTo.name}-${replyingTo.id}} ${content}`
            : content,
      });
      setReplyText("");
      setIsReplying(false);
      setReplyingTo(null);
    } catch (e) {
      const [text, details] = mapErrorToMessage(e);
      toast.error(text, {
        description: details,
      });
    }
  };

  const onReplyTo = (reply: ReplyResponse) => {
    setIsReplying(true);
    setReplyText("");
    setReplyingTo(reply.author);
  };

  const commentEdited = comment.createdAt !== comment.updatedAt;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative ml-1 flex w-full items-center text-sm text-muted-foreground">
        <Link
          to={`/app/profiles/${comment.author.id}`}
          className="font-bold text-foreground hover:underline">
          {comment.author.name}
        </Link>
        <Dot size={16} />
        <span>
          {getRelativeTime(
            new Date(commentEdited ? comment.updatedAt : comment.createdAt)
          )}
          {commentEdited && (
            <span className="ml-1 text-xs font-normal">(edited)</span>
          )}
        </span>
        {comment.author.id === profile.id && (
          <Dialog>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 !h-min !w-min p-2 !ring-offset-0">
                  <Ellipsis size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DialogTrigger
                  asChild
                  onClick={() => {
                    setEditCommentText(comment.content);
                    setDialog(Dialogs.editCommentDialog);
                  }}>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger
                  asChild
                  onClick={() => setDialog(Dialogs.deleteCommentDialog)}>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              {dialog === Dialogs.editCommentDialog ? (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-foreground">
                      Edit comment
                    </DialogTitle>
                    <DialogDescription>
                      Make changes to your comment.
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    <Textarea
                      value={editCommentText}
                      onChange={e => setEditCommentText(e.target.value)}
                      className="text-foreground"
                      disabled={deleteCommentIsPending}
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="default"
                        type="button"
                        onClick={() => {
                          onEdit(comment.id, editCommentText);
                        }}
                        disabled={editCommentIsPending}>
                        Save
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="secondary"
                        type="button"
                        disabled={editCommentIsPending}>
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-foreground">
                      Are you sure you want to delete this comment?
                    </DialogTitle>
                    <DialogDescription>
                      This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        type="button"
                        onClick={() => {
                          onDelete(comment.id);
                        }}
                        disabled={deleteCommentIsPending}>
                        Delete
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="secondary"
                        type="button"
                        disabled={deleteCommentIsPending}>
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
      <p className="ml-1 text-sm">{comment.content}</p>
      <div className="flex gap-2">
        {comment.author.id !== profile.id && (
          <VotingButtons
            comment={comment}
            isListItem={false}
          />
        )}
        <Button
          variant="ghost"
          size="icon"
          className="!m-0 ml-2 flex h-min w-min items-center gap-2 p-1"
          onClick={() => {
            setIsReplying(!isReplying);
          }}>
          <MessageCircle size={18} />
        </Button>
      </div>
      {isReplying && (
        <div className="ml-4 flex w-full flex-col justify-center text-muted-foreground">
          {replyingTo !== null && (
            <div className="ml-1 flex items-center">
              <ChevronRight size={16} />
              <p className="text-sm font-semibold">{replyingTo.name}</p>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Textarea
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              disabled={createReplyIsPending}
              rows={1}
              placeholder="Add a reply"
              className="min-h-0 resize-none text-foreground"
            />
            <Button
              variant="default"
              className="h-min w-min px-2 py-1"
              onClick={() => {
                onReply(comment.id, replyText);
              }}
              disabled={createReplyIsPending}>
              Reply
            </Button>
            <Button
              variant="destructive"
              className="h-min w-min px-2 py-1"
              onClick={() => {
                setIsReplying(false);
                setReplyText("");
              }}
              disabled={createReplyIsPending}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      {comment.replyCount === 0 ? null : repliesEnabled ? (
        <RepliesList
          commentId={comment.id}
          onReplyTo={onReplyTo}
        />
      ) : (
        <Button
          variant="ghost"
          className="!m-0 ml-2 flex h-min w-min items-center gap-2 p-1"
          onClick={() => {
            setRepliesEnabled(true);
          }}>
          <Reply
            size={18}
            className="-scale-100"
          />
          {comment.replyCount} replies
        </Button>
      )}
    </div>
  );
};

export default CommentView;
