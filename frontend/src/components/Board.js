import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { getBoard } from '../api/services.js';
import { PostForm } from './Form.js';
import { Thread } from './Thread.js';
import { OpenLink } from './OpenLink.js';
import { BoardTitle } from './BoardTitle.js';



export function Board(props) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { slug } = useParams();

  useEffect(() => {
    getBoard(slug, currentPage).then((result) => {
      setData(result.data);
      setIsLoaded(true);
    }).catch((error) => {setError(error);
    setIsLoaded(true)});
  }, [slug, currentPage]);
  if (!isLoaded){
    return (
      <h2>Loading...</h2>
    );
  } else if (error){
    return (
      <div className="error">
	<h2>{error.message}</h2>
      </div>
    );
  } else {
    return(
      <div className="board">
	<BoardTitle slug={slug}>
	  {data.name}
	</BoardTitle>
	<PostForm slug={slug} 
		  parent={null} 
		  defaultUsername={data.default_username}
		  maxFileSize={data.max_file_size}/>
	{data.page.threads.map(thread => <Thread key={"thread_"+thread.opost.post_number}
						 openLink={<OpenLink slug={slug} 
								     opost_num={thread.opost.post_number}
							   />}
	  					 thread={thread} slug={slug}
						 skip
	  					 onPostNumClick={() => {}}
					  />)}
	<Pagination size="large" count={data.page.total_pages} onChange={(e, page) => setCurrentPage(page)}/>
      </div>
    );
  }
      
}
