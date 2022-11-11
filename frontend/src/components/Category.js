import React from 'react';

export function Category({ category }) {
  return (
    <>
      <div className="category_name">
        {category.name}
        :
      </div>
      <ul>
        {category.boards.map((board) => (
          <li key={`board${board.id}`}>
            <a className="board_link" href={`/${board.slug}/`}>
              {board.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
