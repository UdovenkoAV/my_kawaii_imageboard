import React, { forwardRef } from 'react';
import { PostDetails } from './PostDetails';
import { FormatMessage } from './FormatMessage';
import { BacklinksBlock } from './BacklinksBlock';
import { Media } from './Media';

export const Post = forwardRef(({
  post, slug, skip, backlinks = [], onPostNumClick, onPostLinkClick, openLink,
}, ref) => (
  <>
    <PostDetails
      openLink={openLink}
      title={post.title}
      email={post.email}
      username={post.username}
      created={post.created}
      opostNum={post.opost_number}
      postNum={post.post_number}
      slug={slug}
      onPostNumClick={onPostNumClick}
    />
    <div className="post_body">
      {post.file && <Media file={post.file} />}
      <FormatMessage
        ref={ref}
        message={post.message}
        slug={slug}
        skip={skip}
        onPostLinkClick={onPostLinkClick}
      />
    </div>
    <BacklinksBlock
      slug={slug}
      opostNum={post.opost_number}
      backlinks={backlinks}
      onPostLinkClick={onPostLinkClick}
    />
  </>
));
