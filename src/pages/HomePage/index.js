import React from 'react';
// Redux
import { fetchNews } from '../../redux/slices/hackerNewsSlice';
//React-redux
import { useDispatch, useSelector } from 'react-redux';
// Components
import { NewsItem } from '../../components/NewsItem';
// Antd
import { Button, List } from 'antd';
// Css
import './index.css';

export const HomePage = () => {
  const dispatch = useDispatch();
  const {news, status} = useSelector((state) => state.news);

  const updateClick = () => {
    dispatch(fetchNews());
  };

  React.useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div>
      <List
        size="large"
        header={
          <>
            <h1 className="home-page__header">Hacker News</h1>
            <Button onClick={updateClick} type="primary">
              Обновить
            </Button>
          </>
        }
        footer={status === 'loading' && <h2>Loading...</h2>}
        bordered
        dataSource={news}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <ul className="home-page__list">{<NewsItem item={item} />}</ul>
          </List.Item>
        )}
      />
    </div>
  );
};
