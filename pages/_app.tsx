import HomeNav from '../components/homeNav';
import { Provider } from 'next-auth/client';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider session={pageProps.session}>
        <header>
          <HomeNav />
        </header>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
