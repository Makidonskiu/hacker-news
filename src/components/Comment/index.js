import React from 'react';
// Components
import { CommentsList } from '../CommentsList';
// Antd
import { Button } from 'antd';
// Css
import './index.css';

export const Comment = ({ comment, loadNestedComments }) => {
  const formattedData = { __html: comment.text };

  const showComents = () => {
    loadNestedComments(comment)
  }
  
  return (
    <li>
      <p className='comment__text' dangerouslySetInnerHTML={formattedData} />
      <p className='comment__text'>Автор: {comment.by}</p>
      <p className='comment__text'>Дата: {new Date(comment.time * 1000).toLocaleString()}</p>
      {comment.kids && comment.kids.length > 0 && (
        <Button onClick={showComents}>Показать вложенные комментарии</Button>
      )}
      {comment.comments && comment.comments.length > 0 && (
        <CommentsList comments={comment.kids} loadNestedComments={loadNestedComments} />
      )}
    </li>
  );
};