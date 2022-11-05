import { getIndex } from '../api/services.js';
import { useEffect, useState } from 'react';


export const BoardsBlock = () => {

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getIndex().then((result) => {
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
      <>
	{data.map((category) => <div>
	  <div className="category_name">{category.name}:</div>
	  <ul>
	    {category.boards.map((board) => <li>
	      <a className="board_link" href={'/'+board.slug+'/'}>
		{board.name}
	      </a>
	    </li>)}
	  </ul>
	</div>)}
      </>
    );
  };
}
