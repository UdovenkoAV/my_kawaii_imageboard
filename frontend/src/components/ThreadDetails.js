import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getData } from '../api/services.js';
import { PostForm } from './Form.js';
import { Thread } from './Thread.js';
import { BoardTitle } from './BoardTitle.js';

export function ThreadDetail() {
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { slug, id } = useParams();
  const formRef = useRef();

  const handlePostNumClick = (postNum) => {
    document.querySelector('#message_field').focus();
    formRef.current.setFieldValue('message', `${formRef.current.values.message}>>${postNum} `);
  };

  useEffect(() => {
    getData(`${slug}/${id}`).then((result) => {
      setData(result.data);
      setIsLoaded(true);
    }).catch((_error) => {
      setError(_error);
      setIsLoaded(true);
    });
  }, [slug, id]);

  if (!isLoaded) {
    return (
      <h2>Loading..</h2>
    );
  } if (error) {
    return (
      <div className="error">
        <h2>{error.message}</h2>
      </div>
    );
  }
  return (
    <div className="thread_details">
      <BoardTitle slug={slug}>
        {data.name}
      </BoardTitle>
      <PostForm
        ref={formRef}
        slug={slug}
        parent={data.thread.opost.id}
        hash={/#i\d+/.test(location.hash) && location.hash}
        defaultUsername={data.default_username}
        maxFileSize={data.max_upload_file_size}
      />
      <div className="back_button"><h2><a href={`/${slug}`}>[Back]</a></h2></div>
      <Thread thread={data.thread} hash={/#\d+/.test(location.hash) && location.hash} slug={slug} onPostNumClick={(postNum) => handlePostNumClick(postNum)} />
    </div>
  );
}
