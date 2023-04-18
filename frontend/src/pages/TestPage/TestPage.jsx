import './TestPage.css';

import React, { useState, useEffect, useCallback } from 'react';

function makeid(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZa_xXx_I_Put_A_Little_Secret_Here_xXx_bcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const TestPage = () => {
  const [threads, setThreads] = useState([]);
  const [testArray, setTestArray] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchThreadHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch('/api/test/threads');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      console.log(data);
      setThreads((prevThreads) => {
        return [...prevThreads, ...data.data.threads];
      });
      //console.log(threads);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchThreadHandler();
  }, [fetchThreadHandler]);

  const addArrayHandler = () => {
    // let newArr = testArray;
    // newArr[testArray.length] = makeid(5);
    setTestArray((prevState) => {
      return [...prevState, makeid(5)];
    });
    console.log('addArrayHandler: ' + testArray.length + ' -' + testArray);
  };

  useEffect(() => {
    console.log('useEffect: ' + testArray.length + ' -' + testArray);
  }, [testArray]);

  return (
    <section>
      <button onClick={fetchThreadHandler}>Fetch</button>
      <button onClick={addArrayHandler}>Add array</button>
    </section>
  );
};
export default TestPage;
