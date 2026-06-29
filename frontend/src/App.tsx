import GETButton,{ type API } from './components/GETButton';

export default function App() {
  const api: API = {
    url: 'http://pi.local:3000',
    result: null
  }

  return (
    <>
      <GETButton APIData={api} label={'GET /'}></GETButton>
    </>
  );
}