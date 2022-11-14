import React from 'react';
import { PostDetails } from './PostDetails.js';
import { FormatMessage } from './FormatMessage.js';
import { Media } from './Media.js';
import './posts.css';

export function OPost(props) {
  const {
    post, slug, skip, openLink, onPostNumClick,
  } = props;
  return (
    <div id={`post_${post.post_number}`} className="opost">
      <PostDetails
        title={post.title}
        email={post.email}
        username={post.username}
        created={post.created}
        opostNum={post.post_number}
        postNum={post.post_number}
        slug={slug}
        openLink={openLink}
        onPostNumClick={(postNum) => onPostNumClick(postNum)}
      />
      <div className="post_body">
        {post.file && <Media thumb={post.file.thumbnail} src={post.file.src} />}
        <FormatMessage message={post.message} skip={skip} slug={slug} />
      </div>
    </div>
  );
}
