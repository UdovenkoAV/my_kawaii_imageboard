import React, { useEffect, useState } from 'react';
import { getData } from '../api/services.js';
import { Category } from './Category.js';

export function BoardsBlock() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getData('categories').then((result) => {
      setData(result.data);
      setIsLoaded(true);
    }).catch((_error) => {
      setError(_error);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return <p>Loading</p>;
  } if (error) {
    return (
      <div className="error">
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <div className="block boards">
      {data.map((category) => <Category key={`cat_${category.id}`} category={category} />)}
    </div>
  );
}
