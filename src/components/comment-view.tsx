import { CommentResponse, CommentsService } from "@/client/requests";
import { getRelativeTime, cn } from "@/lib/utils";
import { Dot, Ellipsis, Reply } from "lucide-react";
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
      <p
        className={cn("ml-1 text-sm", {
          "mb-2": comment.author.id === profile.id,
        })}>
        {comment.content}
      </p>
      {comment.author.id !== profile.id && (
        <VotingButtons
          comment={comment}
          isListItem={false}
        />
      )}
      {comment.replyCount === 0 ? null : repliesEnabled ? (
        <RepliesList commentId={comment.id} />
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
