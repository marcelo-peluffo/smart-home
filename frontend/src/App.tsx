import { useState } from 'react';

export default function App() {
  const talkToServer = async () => {
    setResponse('Loading...');
    
    try {
      const response = await fetch('http://pi.local:3000');
      setResponse(await response.text());

    } catch (error) {
      console.log(error);
      setResponse('Error connecting to Pi');
    }

  };

  const resetResponse = () => {
    setResponse('No Response');
  };

  const [response, setResponse] = useState('No Response');

  return (
    <>
      <button onClick={talkToServer}>Response: {response}</button>
      <button onClick={resetResponse}>Reset Response</button>
    </>
  );
}