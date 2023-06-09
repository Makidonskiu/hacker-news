import React from 'react';
// React-router-dom
import { Link } from 'react-router-dom';
// React-redux
import { useDispatch } from 'react-redux';
// Redux
import { saveUrl } from '../../redux/slices/hackerNewsSlice';

export const NewsItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(saveUrl(item.url))
  }
  return (
    <li>
      <Link onClick={handleClick} to={`/news/${item.id}`}>
        <h2>{item.title}</h2>
      </Link>
      <p>Рейтинг: {item.score}</p>
      <p>Автор: {item.by}</p>
      <p>Дата: {new Date(item.time * 1000).toLocaleString()}</p>
    </li>
  )
}
