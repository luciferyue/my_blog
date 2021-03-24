const routesConfig = [
	{
		path: "/cms/add",
		page: "add-article",
		layout: true
	},
	{
		path: "/cms/add/:id",
		page: "add-article",
		layout: true
	},
	{
		path: "/cms",
		page: "add-article",
		layout: true
	},
	{
		path: "/cms/list",
		page: "article-list",
		layout: true
	},
	{
		path: "/",
		page: "login",
		layout: false
	},
];

export default routesConfig;
