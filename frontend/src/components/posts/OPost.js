import React, {
  forwardRef, useImperativeHandle, useRef,
} from 'react';
import { Post } from './Post.js';
import './posts.css';

export const OPost = forwardRef((props, ref) => {
  const {
    post, slug, skip, openLink, onPostNumClick, backlinks,
  } = props;
  const messageRef = useRef();
  const postRef = useRef();

  useImperativeHandle(ref, () => ({
    getPostLinks: () => messageRef.current.getPostLinks(),
    scrollIntoView: () => postRef.current.scrollIntoView(),
  }), []);

  return (
    <div ref={postRef} className="opost">
      <Post
        post={post}
        slug={slug}
        backlinks={backlinks}
        skip={skip}
        onPostNumClick={onPostNumClick}
        ref={messageRef}
        openLink={openLink}
      />
    </div>
  );
});
