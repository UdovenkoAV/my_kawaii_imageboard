import React, { useEffect, useState } from 'react';
import { getCategoriesData } from '../api/services.js';
import { Category } from './Category.js';

export function BoardsBlock() {
  const [boardsData, setBoardsData] = useState();
  const [boardsError, setBoardsError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getCategoriesData().then((result) => {
      setBoardsData(result.data);
      setIsLoaded(true);
    }).catch((error) => {
      setBoardsError(error);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return <p>Loading</p>;
  }
  if (boardsError) {
    return (
      <div className="boardsEror">
        <p>{boardsError.message}</p>
      </div>
    );
  }
  return (
    <div className="block boards">
      {boardsData.map((category) => <Category key={`cat_${category.id}`} category={category} />)}
    </div>
  );
}
