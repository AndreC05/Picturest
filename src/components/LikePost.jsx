import {
  handlefetchPostLikes,
  handleRevalidateAfterLike,
} from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import PostLikeBtn from "./postLikeBtn";

export default async function LikePost({ post }) {
  const { userId } = await auth();

  const like = await handlefetchPostLikes(post, userId);

  return (
    <PostLikeBtn
      post={post}
      like={like}
      userId={userId}
      handlefetchPostLikes={handlefetchPostLikes}
      handleRevalidateAfterLike={handleRevalidateAfterLike}
    />
  );
}
