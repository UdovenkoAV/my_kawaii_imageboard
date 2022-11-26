import React from 'react';
import { Backlink } from './Backlink';

export function BacklinksBlock({
  backlinks, slug, opostNum, onPostLinkClick,
}) {
  return (
    <div className="backlinks">
      {backlinks.map((backlink) => (
        <Backlink
          key={`backlink_${backlink}`}
          slug={slug}
          opostNum={opostNum}
          onClick={onPostLinkClick}
          replyNum={backlink}
        />
      ))}
    </div>
  );
}
