//TODO fix this mess :)

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
    console.log("likeObj", likeObj);
    console.log("LikeExists:", likeExists);

    if (likeExists) {
      setLikeState(likeObj[0].like_state);
      console.log("likeState set to:", likeObj[0].like_state);
    }
  }, [likeObj]);

  async function handleLikeClick() {
    console.log("likeExists at click:", likeExists);
    console.log("likeState:", likeState);
    if (likeExists >= 1) {
      if (likeState === true) {
        console.log("tried to set to false");
        handleDecreasePostLikes(post);
        setLikeState(false);
        handleUpdatePostLike(false, userId, post);
      } else {
        console.log("tried to set to true");
        handleIncreasePostLikes(post);
        setLikeState(true);
        handleUpdatePostLike(true, userId, post);
      }
      const newLike = await handlefetchPostLikes(post, userId);
      setLikeObj(newLike);
      handleRevalidateAfterLike();
    } else {
      console.log("tried to create new");
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
