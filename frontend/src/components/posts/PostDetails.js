import React from 'react';
import { Created } from './Created.js';

export function PostDetails(props) {
  const {
    title, email, username, created, opostNum, postNum, slug, openLink, onPostNumClick,
  } = props;
  const handlePostNumClick = () => {
    onPostNumClick(postNum);
  };
  return (
    <div className="post_details">
      <span className="title">{title}</span>
      <span className="username">
        {' '}
        {email ? <a href={`mailto:${email}`}>{username}</a> : username}
        {' '}
      </span>
      <Created datetime={created} />
      {postNum && (
      <span className="post_num">
        <a href={`/${slug}/${opostNum}#i${postNum}`} onClick={handlePostNumClick}>
          №
          {postNum}
        </a>
        {' '}
      </span>
      )}
      {openLink}
    </div>
  );
}
