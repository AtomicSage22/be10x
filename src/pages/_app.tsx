import RootLayout from '@/app/layout';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }) {
  return (
    <RootLayout>
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
    </RootLayout>
  );
}

export default MyApp;
