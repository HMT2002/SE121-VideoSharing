import './Welcome.css';
import ControllPanel from '../../components/ControlPanel';
import ListThreadCard from '../../components/ListThreadCard';
import React, { useState, useEffect, useCallback } from 'react';
import { GETAllThreadAction } from '../../actions/threadActions';
import { CheckTokenAction } from '../../actions/userActions';

const Welcome = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);
  const [threads, setThreads] = useState([]);

  const fetchThreadsHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await GETAllThreadAction();
      setThreads((prevThreads) => {
        return [...data.data.threads];
      });
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchThreadsHandler();
  }, [fetchThreadsHandler]);

  return (
    <React.Fragment>
      {' '}
      <section>
        <section>{!isLoading && !error && <ControllPanel />}</section>
        <section>
          {!isLoading && !error && <ListThreadCard threads={threads} />}
          {isLoading && <p>Loading...</p>}
          {!isLoading && error && <p>{error}</p>}
        </section>
      </section>
    </React.Fragment>
  );
};
export default Welcome;
