import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { getComments } from "./commentSlice";
import { COMMENT_PER_POST } from "../../app/config";
import CommentCard from "./CommentCard";
import LoadingScreen from "../../components/LoadingScreen";

import { Pagination, Stack, Typography } from "@mui/material";

function CommentList({ postId }) {
  console.log("🚀 Puritin ~ CommentList ~ postId:", postId);
  const {
    commentsByPost,
    commentsById,
    totalComments,
    isLoading,
    currentPage,
  } = useSelector(
    (state) => ({
      commentsByPost: state.comment.commentsByPost[postId],
      totalComments: state.comment.totalCommentsByPost[postId],
      currentPage: state.comment.currentPageByPost[postId] || 1,
      commentsById: state.comment.commentsById,
      isLoading: state.comment.isLoading,
    }),
    shallowEqual
  );

  console.log("🚀 Puritin ~ CommentList ~ commentsByPost:", commentsByPost);
  const totalPages = Math.ceil(totalComments / COMMENT_PER_POST);

  const dispatch = useDispatch();

  let renderComments;

  useEffect(() => {
    if (postId) dispatch(getComments({ postId }));

    console.log("🚀 Puritin ~ useEffect ~ commentsByPost:", commentsByPost);

    if (commentsByPost) {
      const comments = commentsByPost.map(
        (commentId) => commentsById[commentId]
      );
      console.log("🚀 Puritin ~ useEffect ~ comments:", comments);
      renderComments = (
        <Stack spacing={1.5}>
          {comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))}
        </Stack>
      );
    } else if (isLoading) {
      renderComments = <LoadingScreen />;
    }
  }, [postId, dispatch]);

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
          {totalComments > 1
            ? `${totalComments} comments`
            : totalComments === 1
            ? `${totalComments} comment`
            : "No comment"}
        </Typography>
        {totalComments > COMMENT_PER_POST && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => dispatch(getComments({ postId, page }))}
          />
        )}
      </Stack>
      {renderComments}
    </Stack>
  );
}

export default CommentList;
