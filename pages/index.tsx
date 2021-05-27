import Head from 'next/head';

import Container from '../components/container';
import Hero from '../components/hero';

const Home = () => {
  return (
    <div>
      <Head>
        <title>{'Read & Code'}</title>
        <meta
          name="description"
          content="A Web App to find Books on Programming."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Hero
          content={{
            title: 'A one stop solution for all programming needs.',
            body: 'Search books, read reviews, learn and improve!',
          }}
        />
      </Container>
    </div>
  );
};

export default Home;
