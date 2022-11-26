import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { getBoardData } from '../api/services.js';
import { PostForm } from './PostForm.js';
import { Thread } from './Thread.js';
import { OpenLink } from './OpenLink.js';
import { BoardTitle } from './BoardTitle.js';

export function Board() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [boardError, setBoardError] = useState(null);
  const [boardData, setBoardData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { slug } = useParams();
  const navigate = useNavigate();

  const handlePageChange = useCallback((e, page) => {
    setCurrentPage(page);
  }, []);
  const handleAfterFormSubmit = useCallback((post) => {
    navigate(`/${slug}/${post.post_number}`);
  }, [navigate, slug]);
  useEffect(() => {
    getBoardData(slug, currentPage).then((result) => {
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
  }
  if (boardError) {
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
        handleAfterFormSubmit={handleAfterFormSubmit}
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
        />
      ))}
      <Pagination size="large" count={boardData.page.total_pages} onChange={handlePageChange} />
    </div>
  );
}
