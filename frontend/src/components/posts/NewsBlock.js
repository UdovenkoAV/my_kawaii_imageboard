import React, { useEffect, useState } from 'react';
import { getNewsData } from '../../api/services.js';
import { News } from './News.js';

export function NewsBlock() {
  const [newsData, setNewsData] = useState();
  const [newsError, setNewsError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getNewsData('news').then((result) => {
      setNewsData(result.data);
      setIsLoaded(true);
    }).catch((error) => {
      setNewsError(error);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  if (newsError) {
    return <p>{newsError}</p>;
  }
  return (
    <div className="news_block">
      {newsData.map((news) => <News key={`news_${news.id}`} news={news} />)}
    </div>
  );
}
