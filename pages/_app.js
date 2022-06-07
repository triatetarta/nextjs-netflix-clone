import "../styles/globals.css";
import { AuthProvider } from "../hooks/useAuth";
import { Provider } from "react-redux";
import { store } from "../configureStore";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
