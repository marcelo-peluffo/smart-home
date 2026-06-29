import APIButton, { type API } from './components/APIButton';

export default function App() {
  const api: API = {
    url: 'http://pi.local:3000',
    result: null
  }

  return (
    <>
      <APIButton APIData={api} label={'GET /'}></APIButton>
    </>
  );
}