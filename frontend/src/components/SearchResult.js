import React, { useRef } from 'react';
import { useQuery } from 'react-query';
import { getSearchResultData } from '../api/services';
import { Post } from './posts/Post.js';
import { OpenLink } from './OpenLink.js';

export function SearchResult({ slug, query }) {
  const { isLoading, error, data } = useQuery('searchResultData', () => getSearchResultData(slug, query).then());
  const messageRef = useRef();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error.message}</h2>;
  }
  if (data.data.length === 0) {
    return <h2>Nothing found.</h2>;
  }
  return (
    <div className="search_result">
      {data.data.map((post) => (
        <div className="block post" key={`search_result_div_${post.post_number}`}>
          <Post
            key={`search_result_${post.post_number}`}
            post={post}
            slug={slug}
            openLink={(
              <OpenLink
                slug={slug}
                opostNum={post.opost_number}
                postNum={post.post_number}
              />
            )}
            ref={messageRef}
          />
        </div>
      ))}
    </div>
  );
}
