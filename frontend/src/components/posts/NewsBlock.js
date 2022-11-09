import { useEffect, useState } from 'react';
import { getData } from '../../api/services.js';
import { News } from './News.js';

export const NewsBlock = () => {

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getData('news').then((result) => {
      setData(result.data);
      setIsLoaded(true);
    }).catch((error) => {setError(error);
      setIsLoaded(true);});
  }, []);

  if (!isLoaded) {
    return <p>Loading...</p>
  } else if (error) {
    return <p>{error}</p>
  } else {
    return (
      <div className='news_block'>
	{data.map(news => <News key={'news_'+news.id} news={news}/>)}
      </div>
    );
  }
}
