import "../styles/globals.css";
import { AuthProvider } from "../hooks/useAuth";
import { Provider } from "react-redux";
import { store } from "../configureStore";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Toaster position='bottom-center' />
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
