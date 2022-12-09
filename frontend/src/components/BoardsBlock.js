import React from 'react';
import { useQuery } from 'react-query';
import { getCategoriesData } from '../api/services.js';
import { Category } from './Category.js';

export function BoardsBlock() {
  const { isLoading, error, data } = useQuery('categoriesData', () => getCategoriesData().then());

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error) {
    return (
      <div className="error">
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <div className="block boards">
      {data.data.map((category) => <Category key={`cat_${category.id}`} category={category} />)}
    </div>
  );
}
