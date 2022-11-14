import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { getData } from '../api/services.js';
import { PostForm } from './Form.js';
import { Thread } from './Thread.js';
import { OpenLink } from './OpenLink.js';
import { BoardTitle } from './BoardTitle.js';

export function Board() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [boardError, setBoardError] = useState(null);
  const [boardData, setBoardData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { slug } = useParams();

  useEffect(() => {
    getData(`${slug}/?page=${currentPage}`).then((result) => {
      setBoardData(result.data);
      setIsLoaded(true);
    }).catch((error) => {
      setBoardError(error);
      setIsLoaded(true);
    });
  }, [slug, currentPage]);
  if (!isLoaded) {
    return (
      <h2>Loading...</h2>
    );
  } if (boardError) {
    return (
      <div className="boardError">
        <h2>{boardError.message}</h2>
      </div>
    );
  }
  return (
    <div className="board">
      <BoardTitle slug={slug}>
        {boardData.name}
      </BoardTitle>
      <PostForm
        slug={slug}
        parent={null}
        defaultUsername={boardData.default_username}
        maxFileSize={boardData.max_upload_file_size}
      />
      {boardData.page.threads.map((thread) => (
        <Thread
          key={`thread_${thread.opost.post_number}`}
          openLink={(
            <OpenLink
              slug={slug}
              postNum={thread.opost.post_number}
            />
          )}
          thread={thread}
          slug={slug}
          skip
          onPostNumClick={() => {}}
        />
      ))}
      <Pagination size="large" count={boardData.page.total_pages} onChange={(e, page) => setCurrentPage(page)} />
    </div>
  );
}
