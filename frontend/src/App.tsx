import { useState } from 'react'
import ClearButton from './components/ClearButton';
import GETButton,{ type API } from './components/GETButton';
import DogEatenLabel from './components/DogEatenLabel';

export default function App() {

  const [buttonText, setButtonText] = useState('Call Raspberry Pi Server')
  const handleClear = () => {
    setButtonText('Call Raspberry Pi Server')
  }
  const handleTextChange = (text: string) => {
    setButtonText(text)
  }

  const api: API = {
    url: 'http://pi.local:3000',
    result: null
  }

  return (
    <>
      <GETButton APIData={api} label={buttonText} setButtonText={handleTextChange}></GETButton>
      <ClearButton onClear={handleClear}/>
      <br></br>
      <DogEatenLabel />
    </>
  );
}