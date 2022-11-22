/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  useRef, useState, useEffect, useCallback,
} from 'react';
import { OPost } from './posts/OPost.js';
import { Reply } from './posts/Reply.js';
import './Thread.css';

export function Thread(props) {
  const {
    openLink, thread, hash, slug, skip, onPostNumClick, extraReplies,
  } = props;
  const [isSkiped, setIsSkiped] = useState(skip);
  const [highlightReplyNum, setHighlightReplyNum] = useState(hash && hash.slice(1));
  const postsRef = useRef([]);

  const handlePostLinkClick = useCallback((replyNum) => {
    postsRef.current[replyNum]?.scrollIntoView();
    setHighlightReplyNum(replyNum);
  }, [postsRef]);
  useEffect(() => {
    if (hash) {
      postsRef.current[hash.slice(1)]?.scrollIntoView();
    }
  }, [hash]);
  useEffect(() => {
    if (extraReplies) {
      postsRef.current[extraReplies[extraReplies.length - 1]?.post_number]?.scrollIntoView();
    }
  }, [extraReplies]);
  return (
    <div className="thread">
      <OPost
        ref={(el) => postsRef.current[thread.opost.post_number] = el}
        post={thread.opost}
        skip={skip}
        slug={slug}
        openLink={openLink}
        onPostNumClick={onPostNumClick}
      />
      {thread.replies.length > 5 && isSkiped && (
      <p>
        {thread.replies.length - 5}
        {' '}
        replies omitted. Click
        {' '}
        <span
          className="fake_a"
          onClick={() => setIsSkiped(false)}
          onKeyDown={() => setIsSkiped(false)}
        >
          here
        </span>
        {' '}
        to view.
      </p>
      )}
      {isSkiped ? thread.replies.slice(-5).map((reply) => (
        <Reply
          ref={(el) => postsRef.current[reply.post_number] = el}
          key={`reply_${reply.post_number}`}
          post={reply}
          skip={skip}
          slug={slug}
          opostNum={thread.opost.post_number}
          onPostNumClick={onPostNumClick}
          onPostLinkClick={() => {}}
        />
      )) : thread.replies.concat(extraReplies || []).map((reply) => (
        <Reply
          ref={(el) => postsRef.current[reply.post_number] = el}
          key={`reply_${reply.post_number}`}
          post={reply}
          skip={skip}
          slug={slug}
          opostNum={thread.opost.post_number}
          isHighlighted={(Number(highlightReplyNum) === reply.post_number)}
          onPostNumClick={onPostNumClick}
          onPostLinkClick={handlePostLinkClick}
        />
      ))}
      <hr />
    </div>
  );
}
