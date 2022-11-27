import React, { forwardRef } from 'react';
import { PostDetails } from './PostDetails';
import { FormatMessage } from './FormatMessage';
import { BacklinksBlock } from './BacklinksBlock';
import { Media } from './Media';

export const Post = forwardRef(({
  title, email, created, opostNum, postNum, slug, username,
  file, message, skip, backlinks, onPostNumClick, onPostLinkClick, openLink,
}, ref) => (
  <>
    <PostDetails
      openLink={openLink}
      title={title}
      email={email}
      username={username}
      created={created}
      opostNum={opostNum}
      postNum={postNum}
      slug={slug}
      onPostNumClick={onPostNumClick}
    />
    <div className="post_body">
      {file && <Media thumb={file.thumbnail} src={file.src} />}
      <FormatMessage
        ref={ref}
        message={message}
        slug={slug}
        skip={skip}
        onPostLinkClick={onPostLinkClick}
      />
    </div>
    <BacklinksBlock
      slug={slug}
      opostNum={opostNum}
      backlinks={backlinks}
      onPostLinkClick={onPostLinkClick}
    />
  </>
));
