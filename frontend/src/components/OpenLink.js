import React from 'react';

export function OpenLink(props) {
  const { slug, postNum } = props;
  return (
    <span className="open_link">
      <a href={`/${slug}/${postNum}`}>[OPEN]</a>
    </span>
  );
}
