import { useEffect, useState } from 'react';
import { getNews } from '../../api/services.js';
import { PostDetails } from './PostDetails.js';
import { FormatMessage } from './FormatMessage.js';

const News = ( {news} ) => {
  
  useEffect(() => {
    console.log(news.created);
  },[news])
  return (
    <div className="news">
      <PostDetails title={news.title} created={news.created} username={news.author}/>
      <div className="news_text" dangerouslySetInnerHTML={{ __html: news.message }}/>
    </div>
  );
}

export const NewsBlock = () => {

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getNews().then((result) => {
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
	{data.map(news => <News news={news}/>)}
      </div>
    );
  }
}
