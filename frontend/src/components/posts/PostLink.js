import React from 'react';
import { reReplyNum, rePerentLink } from './postRegex.js';

export function PostLink({ slug, postLink, onClick }) {
  const replyNum = postLink.match(reReplyNum);
  const parentNum = postLink.match(rePerentLink);
  const handlePostLinkClick = () => {
    onClick(replyNum);
  };
  return (
    <a onClick={handlePostLinkClick} href={`/${slug}/${parentNum}#${replyNum}`}>
      &gt;&gt;
      {replyNum}
    </a>
  );
}
