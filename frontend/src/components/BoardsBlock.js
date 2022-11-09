import { getData } from '../api/services.js';
import { useEffect, useState } from 'react';
import { Category } from './Category.js';

export const BoardsBlock = () => {

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getData('categories').then((result) => {
      setData(result.data);
      setIsLoaded(true);
    }).catch((error) => {setError(error);
      setIsLoaded(true);});
  }, []);

  if (!isLoaded) {
    return <p>Loading</p>
  } else if (error) {
    return (
      <div className="error">
	<p>{error.message}</p>
      </div>
    );
  } else {
    return (
      <div className="block boards">
	{data.map((category) => <Category key={'cat_'+category.id} category={category}/>)}
      </div>
    );
  };
}
