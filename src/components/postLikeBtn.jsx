//TODO fix this mess :)

"use client";

import {
  handleDecreasePostLikes,
  handleIncreasePostLikes,
  handleInsertPostLike,
  handleUpdatePostLike,
} from "@/utils/actions";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";

export default function PostLikeBtn({
  post,
  like,
  userId,
  handlefetchPostLikes,
  handleRevalidateAfterLike,
}) {
  const [likeState, setLikeState] = useState(false);
  const [likeObj, setLikeObj] = useState(like);
  //check if like already exists in database and sync like status
  let likeExists = 0;
  useEffect(() => {
    likeExists = likeObj.length;
    console.log("likeObj", likeObj);

    if (likeExists === 1) {
      setLikeState(likeObj[0].like_state);
      console.log("initialli setting state to:", likeObj[0].like_state);
    }
  }, [likeObj]);

  async function handleLikeClick() {
    console.log("likeState:", likeState);
    if (likeExists === 1) {
      if (likeState === true) {
        handleDecreasePostLikes(post);
        setLikeState(!likeState);
      } else {
        handleIncreasePostLikes(post);
        setLikeState(!likeState);
      }
      handleUpdatePostLike(!likeState, userId, post);
      const newLike = await handlefetchPostLikes(post, userId);
      setLikeObj(newLike);
      handleRevalidateAfterLike();
    } else {
      handleInsertPostLike(userId, post);
      handleIncreasePostLikes(post);
      setLikeState(true);
      const newLike = await handlefetchPostLikes(post, userId);
      setLikeObj(newLike);
      handleRevalidateAfterLike();
    }
  }

  return (
    <button onClick={handleLikeClick}>
      {likeState ? <HeartFilledIcon /> : <HeartIcon />}
    </button>
  );
}
