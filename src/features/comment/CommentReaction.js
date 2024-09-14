import React from "react";

import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import { IconButton, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { sendCommentReaction } from "./commentSlice";

function CommentReaction({ comment }) {
  const dispatch = useDispatch();

  const handleClick = (emoji) => {
    dispatch(sendCommentReaction({ commentId: comment._id, emoji }));
  };
  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={() => handleClick("like")}>
        <ThumbUpRoundedIcon sx={{ fontSize: 15, color: "success.main" }} />
      </IconButton>
      <Typography variant="h7" mr={1}>
        {comment?.reactions?.like}
      </Typography>
      <IconButton onClick={() => handleClick("dislike")}>
        <ThumbDownAltRoundedIcon sx={{ fontSize: 15, color: "primary.main" }} />
      </IconButton>
      <Typography variant="h7" mr={1}>
        {comment?.reactions?.dislike}
      </Typography>
    </Stack>
  );
}

export default CommentReaction;
