import React from 'react';

export function Backlink({
  slug, opostNum, onClick = () => {}, replyNum,
}) {
  const handleBacklinkClick = () => {
    onClick(replyNum);
  };
  return (
    <a href={`/${slug}/${opostNum}#${replyNum}`} onClick={handleBacklinkClick}>
      {'>>'}
      {replyNum}
      {' '}
    </a>
  );
}
