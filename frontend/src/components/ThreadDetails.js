import { useState, useEffect, useRef } from 'react';
import { getData } from '../api/services.js';
import { useParams, useLocation } from 'react-router-dom';
import { PostForm } from './Form.js';
import { Thread } from './Thread.js';
import { BoardTitle } from './BoardTitle.js';

export function ThreadDetail(props){

  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { slug, id } = useParams();
  const formRef = useRef();

  const handlePostNumClick = (post_num) => {
    document.querySelector("#message_field").focus();
    formRef.current.setFieldValue('message', formRef.current.values.message+'>>'+post_num+" ");
  }

  useEffect(() => {
    getData(slug+'/'+id).then((result) => {
      setData(result.data);
      setIsLoaded(true);
    }).catch((error) => {
      setError(error);
      console.log(error);
      setIsLoaded(true);
    });
  }, [slug, id]);


  if (!isLoaded){
    return (
      <h2>Loading..</h2>
    )
  } else if (error) {
    return (
  <div className="error">
    <h2>{error.message}</h2>
  </div>
    )
  } else {
    return (
      <div className="thread_details">
	<BoardTitle slug={slug}>
	  {data.name}
	</BoardTitle>
        <PostForm ref={formRef} 
	  slug={slug} 
	  parent={data.thread.opost.id} 
	  hash={/#i\d+/.test(location.hash) && location.hash} 
	  defaultUsername={data.default_username}
	  maxFileSize={data.max_file_size}/>
      <div className="back_button"><h2><a href={'/'+slug}>[Back]</a></h2></div>
        <Thread thread={data.thread} hash={/#\d+/.test(location.hash) && location.hash} slug={slug} onPostNumClick={(post_num) => handlePostNumClick(post_num)}/>
      </div>
    )
  }

}
