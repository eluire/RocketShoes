import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "../styles/global";
import Routes from "../Routes";
import Header from "../components/Header/Header";
import "../config/ReactotronConfig";
import store from "../store";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
        <GlobalStyle />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
