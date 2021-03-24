import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import generateRouteComponents from "./routes";
import { store, history } from "./store";
import "antd/dist/antd.css";


const routes = generateRouteComponents();
const App = () => {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>{routes}</ConnectedRouter>
		</Provider>
	);
};

export default App;
