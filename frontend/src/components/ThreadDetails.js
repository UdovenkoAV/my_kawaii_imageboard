import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getThreadData } from '../api/services.js';
import { PostForm } from './PostForm.js';
import { Thread } from './Thread.js';
import { BoardTitle } from './BoardTitle.js';

export function ThreadDetail() {
  const [threadData, setThreadData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [threadError, setThreadError] = useState(null);
  const [extraReplies, setExtraReplies] = useState([]);
  const location = useLocation();
  const { slug, id } = useParams();
  const formikRef = useRef();
  const messageFieldRef = useRef();
  const formRef = useRef({ formikRef, messageFieldRef });

  const handlePostNumClick = useCallback((postNum) => {
    messageFieldRef.current.focus();
    formikRef.current.setFieldValue('message', `${formikRef.current.values.message}>>${postNum} `);
  }, [messageFieldRef, formikRef]);

  const handleAfterFormSubmit = useCallback((post) => {
    setExtraReplies(extraReplies ? extraReplies.concat(post) : post);
  }, [extraReplies]);

  useEffect(() => {
    getThreadData(slug, id).then((result) => {
      setThreadData(result.data);
      setIsLoaded(true);
    }).catch((error) => {
      setThreadError(error);
      setIsLoaded(true);
    });
  }, [slug, id]);

  if (!isLoaded) {
    return (
      <h2>Loading..</h2>
    );
  }
  if (threadError) {
    return (
      <div className="error">
        <h2>{threadError.message}</h2>
      </div>
    );
  }
  return (
    <div className="thread_details">
      <BoardTitle slug={slug}>
        {threadData.name}
      </BoardTitle>
      <a href="/">[main]</a>
      <PostForm
        ref={formRef}
        handleAfterFormSubmit={handleAfterFormSubmit}
        slug={slug}
        parent={threadData.thread.opost.id}
        hash={/#i\d+/.test(location.hash) && location.hash}
        defaultUsername={threadData.default_username}
        maxFileSize={threadData.max_upload_file_size}
      />
      <div className="back_button"><h2><a href={`/${slug}`}>[Back]</a></h2></div>
      <Thread
        thread={threadData.thread}
        hash={/#\d+/.test(location.hash) && location.hash}
        slug={slug}
        onPostNumClick={handlePostNumClick}
        extraReplies={extraReplies}
      />
    </div>
  );
}
