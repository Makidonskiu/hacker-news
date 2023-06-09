import React from 'react';
// React-router-dom
import { useParams, Link } from 'react-router-dom';
// React-redux
import { useDispatch, useSelector } from 'react-redux';
// Redux
import { fetchComments, fetchNewsItem } from '../../redux/slices/hackerNewsSlice';
// Components
import { Comment } from '../../components/Comment';
// Antd
import { Button, List } from 'antd';
// Css
import './index.css';

export const NewsPage = () => {
  const { newsId } = useParams();
  const dispatch = useDispatch();
  const {newsItem, comments, url, status} = useSelector((state) => state.news);

  React.useEffect(() => {
    dispatch(fetchNewsItem(newsId));
  }, [dispatch, newsId]);

  React.useEffect(() => {
    if (newsItem && newsItem.kids) {
      dispatch(fetchComments(newsItem.kids || []));
    }
  }, [dispatch, newsItem]);

  const loadNestedComments = (comment) => {
    if (comment?.kids?.length > 0) {
      dispatch(fetchComments(comment.kids || []));
    }
  };

  if (!newsItem) {
    return null;
  }

  return (
    <div>
      <List
        size="large"
        header={
          <>
            <div className="news-page__button">
              <Link to="/hacker-news/">
                <Button type="primary">Назад к списку новостей</Button>
              </Link>
            </div>
            <h2 className="news-page__header">
              <a href={url} target="_blank" rel="noreferrer">
                {newsItem.title}
              </a>
            </h2>
            <p className="news-page__text">
              Дата: {new Date(newsItem.time * 1000).toLocaleString()}
            </p>
            <p className="news-page__text">Автор: {newsItem.by}</p>
            <p className="news-page__text">
              Количество комментариев: {newsItem.kids ? newsItem.kids.length : 0}
            </p>
            <Button onClick={() => loadNestedComments(newsItem)}>Обновить комментарии</Button>
          </>
        }
        footer={status === 'loading' && <h2>Loading...</h2>}
        bordered
        dataSource={comments}
        renderItem={(item) => (
          <List.Item key={item.id}>
            {newsItem?.kids?.length > 0 && <ul>{<Comment key={item.id} comment={item} loadNestedComments={loadNestedComments} />}</ul>}
          </List.Item>
        )}
      />
    </div>
  );
};