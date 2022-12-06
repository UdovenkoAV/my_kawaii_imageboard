import React, {
  forwardRef, useImperativeHandle, useRef,
} from 'react';
import { Post } from './Post';
import './posts.css';

export const Reply = forwardRef((props, ref) => {
  const {
    post, slug, skip, isHighlighted, onPostNumClick, onPostLinkClick, backlinks,
  } = props;
  const messageRef = useRef();
  const postRef = useRef();

  useImperativeHandle(ref, () => ({
    getPostLinks: () => messageRef.current.getPostLinks(),
    scrollIntoView: () => postRef.current.scrollIntoView(),
  }), []);

  return (
    <div ref={postRef} className="reply">
      <div className="doubledash">&gt;&gt;</div>
      <div className={`block post ${isHighlighted && 'highlighted'}`}>
        <Post
          post={post}
          slug={slug}
          backlinks={backlinks}
          skip={skip}
          onPostNumClick={onPostNumClick}
          onPostLinkClick={onPostLinkClick}
          ref={messageRef}
        />
      </div>
    </div>
  );
});
