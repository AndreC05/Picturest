import {
  handlefetchCommentLikes,
  handleRevalidateCommentsAfterLike,
} from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import CommentLikeBtn from "./CommentLikeBtn";

export default async function LikeComment({ comment }) {
  const { userId } = await auth();

  const like = await handlefetchCommentLikes(userId, comment);

  return (
    <CommentLikeBtn
      comment={comment}
      like={like}
      userId={userId}
      handlefetchCommentLikes={handlefetchCommentLikes}
      handleRevalidateCommentsAfterLike={handleRevalidateCommentsAfterLike}
    />
  );
}
