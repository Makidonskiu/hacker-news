import React from 'react';
// React-router-dom
import { useParams, Link } from 'react-router-dom';
// React-redux
import { useDispatch, useSelector } from 'react-redux';
// Redux
import { fetchComments, fetchNewsItem } from '../../redux/slices/hackerNewsSlice';
// Components
import { CommentsList } from '../../components/CommentsList';
// Antd
import { Button } from 'antd';
// Css
import './index.css';

export const NewsPage = () => {
  const { newsId } = useParams();
  const dispatch = useDispatch();
  const newsItem = useSelector((state) => state.news.newsItem);
  const comments = useSelector((state) => state.news.comments);
  const url = useSelector((state) => state.news.url);

  React.useEffect(() => {
    dispatch(fetchNewsItem(newsId)); 
  }, [dispatch, newsId]);

  React.useEffect(() => {
    if (newsItem && newsItem.kids) {
      dispatch(fetchComments(newsItem.kids)); 
    }
  }, [dispatch, newsItem]);

  const loadNestedComments = (comment) => {
    if (comment && comment.kids && comment.kids.length > 0) {
      dispatch(fetchComments(comment.kids)); 
    }
  };

  if (!newsItem) {
    return null;
  }

  return (
    <div>
      <div className='news-page__button'><Link to="/hacker-news/">
        <Button type="primary">Назад к списку новостей</Button>
      </Link></div>
      <h2 className='news-page__header'><a href={url} target='_blank' rel="noreferrer">{newsItem.title}</a></h2>
      <p className='news-page__text'>Дата: {new Date(newsItem.time * 1000).toLocaleString()}</p>
      <p className='news-page__text'>Автор: {newsItem.by}</p>
      <p className='news-page__text'>Количество комментариев: {newsItem.kids ? newsItem.kids.length : 0}</p>
      <Button onClick={() => loadNestedComments(newsItem)}>Обновить комментарии</Button>
      {newsItem?.kids?.length > 0 && <CommentsList comments={comments} loadNestedComments={loadNestedComments} />}
    </div>
  );
};
