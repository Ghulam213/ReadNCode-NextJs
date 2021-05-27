import { useEffect } from 'react';
import { Pane, majorScale, Text, Spinner } from 'evergreen-ui';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Head from 'next/head';

import SignInButton from '../components/signInButton';
import Logo from '../components/logo';

const Signin = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      if (router.query.return) {
        const returnPath = router.query.return;
        router.push(returnPath as string);
      } else {
        router.push('/books');
      }
    }
  }, [session, router]);

  return (
    <>
      <Head>
        <title>{'Read & Code | Sign In'}</title>
        <meta
          name="description"
          content="A Web App to find Books on Programming."
        />
      </Head>
      <Pane
        height="90vh"
        borderRight
        paddingX={majorScale(8)}
        paddingY={majorScale(5)}
        background="#47B881"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Pane marginY={majorScale(3)}>
          <Logo color="white" fontSize="60px" />
          <Pane marginTop={majorScale(2)}>
            <Text color="white" fontSize="22px">
              Sign in.
            </Text>
          </Pane>
        </Pane>
        <Pane marginY={majorScale(3)} width="100%" textAlign="center">
          {loading ? (
            <Spinner size={48}></Spinner>
          ) : (
            <SignInButton type="github" onClick={() => signIn('github')} />
          )}
        </Pane>
      </Pane>
    </>
  );
};

export default Signin;
