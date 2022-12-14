import React from 'react';

export function BoardTitle({ slug, children }) {
  return (
    <div className="board_title">
      <h1>
        <a href={`/${slug}/`}>
          {children}
        </a>
      </h1>
    </div>
  );
}
