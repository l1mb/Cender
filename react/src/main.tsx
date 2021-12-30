import "./styles/main.css";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import Routes from "./components/routesComponent/routes";
import styles from "./mainStyles.module.scss";
import store from "./redux/store/store";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

interface AppProps {
  nothing: boolean;
}

interface AppState {
  title: string;
}
class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);
    const goExlcude = true;
    if (!goExlcude) {
      console.warn("class-dead-code doesn't work");
    }
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    return (
      <StrictMode>
        <Provider store={store}>
          <Routes />
        </Provider>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName={styles.toast}
          limit={1}
        />
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
