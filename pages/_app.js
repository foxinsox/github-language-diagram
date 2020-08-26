/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import 'semantic-ui-css/semantic.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
