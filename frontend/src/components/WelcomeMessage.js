import React, { useEffect, useState } from 'react';
import { getData } from '../api/services.js';

export function WelcomeMessage() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getData('config').then((result) => {
      setData(result.data);
      setIsLoaded(true);
    }).catch((_error) => {
      setError(_error);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return <p>Loading</p>;
  } if (error) {
    return (
      <div className="error">
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <div className="block welcome_message">
      <div dangerouslySetInnerHTML={{ __html: data.welcome_message }} />
    </div>
  );
}
