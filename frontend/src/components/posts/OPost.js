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
        opost_num={post.post_number}
        post_num={post.post_number}
        slug={slug}
        openLink={openLink}
        onPostNumClick={(postNum) => onPostNumClick(postNum)}
      />
      <div className="post_body">
        {post.thumbnail && <Media thumb={post.thumbnail} src={post.file} />}
        <FormatMessage message={post.message} skip={skip} slug={slug} />
      </div>
    </div>
  );
}
