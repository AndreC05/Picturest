"use client";

import {
  handleDecreasePostLikes,
  handleIncreasePostLikes,
  handleInsertPostLike,
  handleUpdatePostLike,
} from "@/utils/actions";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export default function CommentLikeBtn({
  post,
  like,
  userId,
  handlefetchPostLikes,
  handleRevalidateAfterLike,
}) {}
