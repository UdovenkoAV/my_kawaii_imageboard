import React, {
  forwardRef, useImperativeHandle, useRef,
} from 'react';
import { PostDetails } from './PostDetails.js';
import { FormatMessage } from './FormatMessage.js';
import { Media } from './Media.js';
import './posts.css';
import { BacklinksBlock } from './BacklinksBlock.js';

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
    <div ref={postRef} id={`post_${post.post_number}`} className="opost">
      <PostDetails
        title={post.title}
        email={post.email}
        username={post.username}
        created={post.created}
        opostNum={post.post_number}
        postNum={post.post_number}
        slug={slug}
        openLink={openLink}
        onPostNumClick={onPostNumClick}
      />
      <div className="post_body">
        {post.file && <Media thumb={post.file.thumbnail} src={post.file.src} />}
        <FormatMessage ref={messageRef} message={post.message} skip={skip} slug={slug} />
      </div>
      <BacklinksBlock
        slug={slug}
        opostNum={post.post_number}
        backlinks={backlinks}
        onPostLinkClick={onPostLinkClick}
      />
    </div>
  );
});
