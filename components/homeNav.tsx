import React, { FC } from 'react';
import { Pane, majorScale, Text, Button } from 'evergreen-ui';
import NextLink from 'next/link';
import { useSession } from 'next-auth/client';
import Container from './container';
import Logo from './logo';
import User from './user';

const HomeNav = () => {
  const [session, loading] = useSession();

  return (
    <nav>
      <Pane
        width="100%"
        paddingY={majorScale(1)}
        borderBottom
        height={majorScale(9)}
      >
        <Container height="100%">
          <Pane
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height="100%"
          >
            <Logo />

            <Pane
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Pane paddingX={majorScale(3)}>
                <NextLink href="/books">
                  <a>
                    <Text fontSize="16px">Browse</Text>
                  </a>
                </NextLink>
              </Pane>

              <Pane paddingX={majorScale(3)}>
                {session ? (
                  <User user={session.user} />
                ) : (
                  <NextLink href="/signin">
                    <a>
                      <Button appearance="primary" fontSize="16px">
                        Sign Up
                      </Button>
                    </a>
                  </NextLink>
                )}
              </Pane>
            </Pane>
          </Pane>
        </Container>
      </Pane>
    </nav>
  );
};

export default HomeNav;
