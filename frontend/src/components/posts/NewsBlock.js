import React from 'react';
import { useQuery } from 'react-query';
import { getNewsData } from '../../api/services.js';
import { News } from './News.js';

export function NewsBlock() {
  const { isLoading, error, data } = useQuery('newsData', () => getNewsData().then());

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="news_block">
      {data.data.map((news) => <News key={`news_${news.id}`} news={news} />)}
    </div>
  );
}
