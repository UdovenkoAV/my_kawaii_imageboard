import React from 'react';

export function OpenLink(props) {
  const { slug, postNum, opostNum } = props;
  return (
    <span className="open_link">
      <a href={`/${slug}/${opostNum}#${postNum}`}>[OPEN]</a>
    </span>
  );
}
