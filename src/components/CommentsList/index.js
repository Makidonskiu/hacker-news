import React from 'react';
// Components
import { Comment } from '../Comment';

export const CommentsList = ({ comments, loadNestedComments }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} loadNestedComments={loadNestedComments} />
      ))}
    </ul>
  );
};
