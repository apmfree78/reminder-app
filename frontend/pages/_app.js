/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Head from 'next/head';
// import { ThemeProvider } from '@material-ui/core/styles';
// import CssBaseline from '@mui/material/CssBaseline';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import Page from '../components/Page';
// import { UserProvider } from '../components/user/userState';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Reminder App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ApolloProvider client={client}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
