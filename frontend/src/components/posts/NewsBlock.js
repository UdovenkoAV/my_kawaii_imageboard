import React, { useEffect, useState } from 'react';
import { getData } from '../../api/services.js';
import { News } from './News.js';

export function NewsBlock() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getData('news').then((result) => {
      setData(result.data);
      setIsLoaded(true);
    }).catch((_error) => {
      setError(_error);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return <p>Loading...</p>;
  } if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="news_block">
      {data.map((news) => <News key={`news_${news.id}`} news={news} />)}
    </div>
  );
}
