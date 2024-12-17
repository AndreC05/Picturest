"use client";

import {
  handleDecreaseCommentLikes,
  handleIncreaseCommentLikes,
  handleInsertCommentLike,
  handleUpdateCommentLike,
} from "@/utils/actions";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export default function CommentLikeBtn({
  comment,
  like,
  userId,
  handlefetchCommentLikes,
  handleRevalidateCommentsAfterLike,
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
        handleDecreaseCommentLikes(comment);
        setLikeState(false);
        handleUpdateCommentLike(false, userId, comment);
      } else {
        handleIncreaseCommentLikes(comment);
        setLikeState(true);
        handleUpdateCommentLike(true, userId, comment);
      }
      const newLike = await handlefetchCommentLikes(userId, comment);
      setLikeObj(newLike);
      handleRevalidateCommentsAfterLike(comment);
    } else {
      handleInsertCommentLike(userId, comment);
      handleIncreaseCommentLikes(comment);
      setLikeState(true);
      const newLike = await handlefetchCommentLikes(userId, comment);
      setLikeObj(newLike);
      handleRevalidateCommentsAfterLike(comment);
    }
  }

  return (
    <button title="Like" onClick={handleLikeClick}>
      {likeState ? <HeartFilledIcon /> : <HeartIcon />}
    </button>
  );
}
