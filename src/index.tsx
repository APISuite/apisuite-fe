import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { ConfigProvider } from "@apisuite/fe-base";
import store, { history } from "store";
import { API_URL } from "constants/endpoints";
import ErrorMonitor from "components/ErrorMonitor";
import { App } from "./App";

// Translations
import translations from "language/translations";
// Main Application Styles
import "./App/app.scss";
// load extensions
import "util/extensions";

function render (Component: React.ElementType) {
  ReactDOM.render(
    <ErrorMonitor>
      <Provider store={store}>
        <Router history={history}>
          <ConfigProvider api={{ base: API_URL }} translations={translations}>
            <Component />
          </ConfigProvider>
        </Router>
      </Provider>
    </ErrorMonitor>,
    document.getElementById("root"),
  );
}

render(App);

// Enable HMR for js files
if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    render(NextApp);
  });
}
