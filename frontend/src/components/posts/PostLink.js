import React, { forwardRef, useImperativeHandle } from 'react';
import { reReplyNum, rePerentLink } from './postRegex.js';

export const PostLink = forwardRef(({ slug, postLink, onClick = () => {} }, ref) => {
  const replyNum = postLink.match(reReplyNum);
  const parentNum = postLink.match(rePerentLink);
  useImperativeHandle(ref, () => ({ getReplyNum: () => replyNum[0] }));
  const handlePostLinkClick = () => {
    onClick(replyNum);
  };
  return (
    <a onClick={handlePostLinkClick} href={`/${slug}/${parentNum}#${replyNum}`}>
      &gt;&gt;
      {replyNum}
    </a>
  );
});
