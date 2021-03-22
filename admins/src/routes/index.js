import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import routesConfig from "./config";
import PageLayout from "@base/page-layout";
import { generateRoute } from "./route-generator";

const routesData = generateRoute(routesConfig);

function generateRouteComponents() {
	return (
		<Suspense fallback={<></>}>
			<Switch>
				{routesData.map((route, index) => {
					const { exact, path, component, layout } = route;
					return (
						<Route
							key={`route-${index}`}
							exact={exact}
							path={path}
							render={(props) => {
								return <PageLayout layout={layout} {...props} component={component} />;
							}}
						/>
					);
				})}
				<Route
					render={() => {
						return <div>页面不存在</div>;
					}}
				/>
			</Switch>
		</Suspense>
	);
}
export default generateRouteComponents;
