import React, { useEffect, useRef, useState } from 'react';
import { getSearchResultData } from '../api/services';
import { Post } from './posts/Post.js';
import { OpenLink } from './OpenLink.js';

export function SearchResult({ slug, query }) {
  const [searchResultData, setSearchResultData] = useState([]);
  const [searchResultError, setSearchResultError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const messageRef = useRef();

  useEffect(() => {
    getSearchResultData(slug, query).then((result) => {
      setSearchResultData(result.data);
      setIsLoaded(true);
    }).catch((error) => {
      setSearchResultError(error);
      setIsLoaded(true);
    });
  }, [query, slug]);
  if (!isLoaded) {
    return <h2>Loading...</h2>;
  }
  if (searchResultError) {
    return <h2>{searchResultError.message}</h2>;
  }
  if (searchResultData.length === 0) {
    return <h2>Nothing found.</h2>;
  }
  return (
    <div className="search_result">
      {searchResultData.map((post) => (
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
