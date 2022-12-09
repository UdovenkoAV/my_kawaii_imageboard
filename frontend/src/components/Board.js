import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { getBoardData } from '../api/services.js';
import { PostForm } from './PostForm.js';
import { Thread } from './Thread.js';
import { OpenLink } from './OpenLink.js';
import { BoardTitle } from './BoardTitle.js';
import { Search } from './Search.js';

export function Board() {
  const [currentPage, setCurrentPage] = useState(1);
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery('boardData', () => getBoardData(slug, currentPage).then());

  const handlePageChange = useCallback((e, page) => {
    setCurrentPage(page);
  }, []);
  const handleAfterFormSubmit = useCallback((post) => {
    navigate(`/${slug}/${post.post_number}`);
  }, [navigate, slug]);

  if (isLoading) {
    return (
      <h2>Loading...</h2>
    );
  }
  if (error) {
    return (
      <div className="error">
        <h2>{error.message}</h2>
      </div>
    );
  }
  return (
    <div className="board">
      <BoardTitle slug={slug}>
        {data.data.name}
      </BoardTitle>
      <Search slug={slug} />
      <a href="/">[main]</a>
      <PostForm
        slug={slug}
        parent={null}
        defaultUsername={data.data.default_username}
        maxFileSize={data.data.max_upload_file_size}
        handleAfterFormSubmit={handleAfterFormSubmit}
      />
      {data.data.page.threads.map((thread) => (
        <Thread
          key={`thread_${thread.opost.post_number}`}
          openLink={(
            <OpenLink
              slug={slug}
              opostNum={thread.opost.post_number}
              postNum={thread.opost.post_number}
            />
          )}
          thread={thread}
          slug={slug}
          skip
        />
      ))}
      <Pagination size="large" count={data.data.page.total_pages} onChange={handlePageChange} />
    </div>
  );
}
