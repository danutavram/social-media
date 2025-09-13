import { useState } from "react";
import type { Comment } from "./CommentSection";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  comment: Comment & {
    children?: Comment[];
  };
  postId: number;
}

const createReply = async (
  replyContent: string,
  postId: number,
  parentCommentId: number,
  userId?: string,
  author?: string
) => {
  if (!userId || !author) {
    throw new Error("You must be logged in to reply.");
  }

  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    content: replyContent,
    parent_comment_id: parentCommentId,
    user_id: userId,
    author: author,
  });

  if (error) throw new Error(error.message);
};

export const CommentItem = ({ comment, postId }: Props) => {
  const [showReply, setShowReply] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>("");

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (replyContent: string) =>
      createReply(
        replyContent,
        postId,
        comment.id,
        user?.id,
        user?.user_metadata?.user_name
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setReplyText("");
      setShowReply(false)
    },
  });

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText) return;

    mutate(replyText);
  };

  return (
    <div>
      <div>
        <div>
          {/* Display the commenters username */}
          <span>{comment.author}</span>
          <span>{new Date(comment.created_at).toLocaleString()}</span>
        </div>
        <p>{comment.content}</p>
        <button onClick={() => setShowReply((prev) => !prev)}>
          {" "}
          {showReply ? "Cancel" : "Reply"}{" "}
        </button>
      </div>

      {showReply && user && (
        <form onSubmit={handleReplySubmit} className="mb-4">
          <textarea
            className="w-full border border-white/10 bg-transparent p-2 rounded"
            value={replyText}
            rows={2}
            placeholder="Write a comment..."
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 bg-purple-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            {isPending ? "Posting" : "Post Reply"}
          </button>
          {isError && (
            <p className="text-red-500 mt-2"> Error posting reply.</p>
          )}
        </form>
      )}
    </div>
  );
};
