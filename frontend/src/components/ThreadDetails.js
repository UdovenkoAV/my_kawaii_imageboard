import React, {
  useState, useCallback, useRef,
} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getThreadData } from '../api/services.js';
import { PostForm } from './PostForm.js';
import { Thread } from './Thread.js';
import { BoardTitle } from './BoardTitle.js';

export function ThreadDetail() {
  const [extraReplies, setExtraReplies] = useState([]);
  const location = useLocation();
  const { slug, id } = useParams();
  const formikRef = useRef();
  const messageFieldRef = useRef();
  const { isLoading, error, data } = useQuery('threadData', () => getThreadData(slug, id).then());
  const formRef = useRef({ formikRef, messageFieldRef });

  const handlePostNumClick = useCallback((postNum) => {
    messageFieldRef.current.focus();
    formikRef.current.setFieldValue('message', `${formikRef.current.values.message}>>${postNum} `);
  }, [messageFieldRef, formikRef]);

  const handleAfterFormSubmit = useCallback((post) => {
    setExtraReplies(extraReplies ? extraReplies.concat(post) : post);
  }, [extraReplies]);

  if (isLoading) {
    return <h2>Loading..</h2>;
  }
  if (error) {
    return (
      <div className="error">
        <h2>{error.message}</h2>
      </div>
    );
  }
  return (
    <div className="thread_details">
      <BoardTitle slug={slug}>
        {data.data.name}
      </BoardTitle>
      <a href="/">[main]</a>
      <PostForm
        ref={formRef}
        handleAfterFormSubmit={handleAfterFormSubmit}
        slug={slug}
        parent={data.data.thread.opost.id}
        hash={/#i\d+/.test(location.hash) && location.hash}
        defaultUsername={data.data.default_username}
        maxFileSize={data.data.max_upload_file_size}
      />
      <div className="back_button"><h2><a href={`/${slug}`}>[Back]</a></h2></div>
      <Thread
        thread={data.data.thread}
        hash={/#\d+/.test(location.hash) && location.hash}
        slug={slug}
        onPostNumClick={handlePostNumClick}
        extraReplies={extraReplies}
      />
    </div>
  );
}
