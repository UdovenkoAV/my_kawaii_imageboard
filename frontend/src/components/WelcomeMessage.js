import React, { useEffect, useState } from 'react';
import { getConfigData } from '../api/services.js';

export function WelcomeMessage() {
  const [configData, setConfigData] = useState();
  const [configError, setConfigError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getConfigData('config').then((result) => {
      setConfigData(result.data);
      setIsLoaded(true);
    }).catch((error) => {
      setConfigError(error);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return <p>Loading</p>;
  }
  if (configError) {
    return (
      <div className="configError">
        <p>{configError.message}</p>
      </div>
    );
  }
  return (
    <div className="block welcome_message">
      <div dangerouslySetInnerHTML={{ __html: configData.welcome_message }} />
    </div>
  );
}
