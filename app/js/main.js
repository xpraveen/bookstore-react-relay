import React from "react";
import Relay from "react-relay";
import ReactDOM from "react-dom";
import LibraryRoute from "./routes/LibraryRoute";
import App from "./components/App";
import "!style!css!sass!../sass/library-app.scss";

ReactDOM.render(
    <Relay.RootContainer Component={App} route={new LibraryRoute()}/>, document.getElementById("app"));
