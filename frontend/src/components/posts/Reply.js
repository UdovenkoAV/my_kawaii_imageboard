import React, { forwardRef } from 'react';
import { PostDetails } from './PostDetails.js';
import { FormatMessage } from './FormatMessage.js';
import { Media } from './Media.js';
import './posts.css';

export const Reply = forwardRef((props, ref) => {
  const {
    post, slug, skip, opostNum, isHighlighted, onPostNumClick, onPostLinkClick,
  } = props;

  return (
    <div ref={ref} id={`post_${post.post_number}`} className="reply">
      <div className="doubledash">&gt;&gt;</div>
      <div className={`block post ${isHighlighted && 'highlighted'}`}>
        <PostDetails
          title={post.title}
          email={post.email}
          username={post.username}
          created={post.created}
          opostNum={opostNum}
          postNum={post.post_number}
          slug={slug}
          onPostNumClick={onPostNumClick}
        />
        <div className="post_body">
          {post.file && <Media thumb={post.file.thumbnail} src={post.file.src} />}
          <FormatMessage
            message={post.message}
            slug={slug}
            skip={skip}
            onPostLinkClick={onPostLinkClick}
          />
        </div>
      </div>
    </div>
  );
});
