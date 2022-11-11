import React from 'react';
import { PostDetails } from './PostDetails.js';

export function News({ news }) {
  return (
    <div className="block">
      <PostDetails title={news.title} created={news.created} username={news.author} />
      <div className="news_text" dangerouslySetInnerHTML={{ __html: news.message }} />
    </div>
  );
}
