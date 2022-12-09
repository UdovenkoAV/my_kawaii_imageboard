import React from 'react';
import { useQuery } from 'react-query';
import { getConfigData } from '../api/services.js';

export function WelcomeMessage() {
  const { isLoading, error, data } = useQuery('configData', () => getConfigData().then());

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
    <div className="block welcome_message">
      <div dangerouslySetInnerHTML={{ __html: data.data.welcome_message }} />
    </div>
  );
}
