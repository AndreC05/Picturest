"use client";

import {
  handleDecreasePostLikes,
  handleIncreasePostLikes,
  handleInsertPostLike,
  handleUpdatePostLike,
} from "@/utils/actions";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
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
  const [likeExists, setLikeExists] = useState(likeObj.length);
  //check if like already exists in database and sync like status
  useEffect(() => {
    setLikeExists(likeObj.length);

    if (likeExists) {
      setLikeState(likeObj[0].like_state);
    }
  }, [likeObj]);

  async function handleLikeClick() {
    if (likeExists >= 1) {
      if (likeState === true) {
        handleDecreasePostLikes(post);
        setLikeState(false);
        handleUpdatePostLike(false, userId, post);
      } else {
        handleIncreasePostLikes(post);
        setLikeState(true);
        handleUpdatePostLike(true, userId, post);
      }
      const newLike = await handlefetchPostLikes(post, userId);
      setLikeObj(newLike);
      handleRevalidateAfterLike(post);
    } else {
      handleInsertPostLike(userId, post);
      handleIncreasePostLikes(post);
      setLikeState(true);
      const newLike = await handlefetchPostLikes(post, userId);
      setLikeObj(newLike);
      handleRevalidateAfterLike(post);
    }
  }

  return (
    <button title="Like" onClick={handleLikeClick}>
      {likeState ? <HeartFilledIcon /> : <HeartIcon />}
    </button>
  );
}
