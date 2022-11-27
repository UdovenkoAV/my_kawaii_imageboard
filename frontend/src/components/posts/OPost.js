import React, {
  forwardRef, useImperativeHandle, useRef,
} from 'react';
import { Post } from './Post.js';
import './posts.css';

export const OPost = forwardRef((props, ref) => {
  const {
    post, slug, skip, openLink, onPostNumClick, backlinks, onPostLinkClick,
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
        title={post.title}
        email={post.email}
        created={post.created}
        postNum={post.post_number}
        username={post.username}
        message={post.message}
        opostNum={post.post_number}
        file={post.file}
        slug={slug}
        backlinks={backlinks}
        skip={skip}
        onPostNumClick={onPostNumClick}
        onPostLinkClick={onPostLinkClick}
        ref={messageRef}
        openLink={openLink}
      />
    </div>
  );
});
