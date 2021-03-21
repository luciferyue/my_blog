// import React from 'react';
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import Login from '../pages/login';
// import Layout from '../common/layout';

// function Main() {
//   return (
//     <Router>
//       <Route path="/" exact component={Login} />
//       <Route path="/index/" exact component={Layout} />
//     </Router>
//   )
// }
// export default Main

import React, { Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PageLayout from "../common/layout";
import Login from '../pages/login';
import AddArticle from '../pages/add_article';
import ArticleList from '../pages/article_list';

function Main() {
  return (
    <Suspense fallback={<></>}>
      <Router>
        <Route path="/" exact render={(props) => {
          return <PageLayout {...props} component={Login} />;
        }} />
        <Route path="/cms/" exact render={(props) => {
          return <PageLayout {...props} component={AddArticle} />;
        }} />
        <Route path="/cms/add" exact render={(props) => {
          return <PageLayout {...props} component={AddArticle} />;
        }} />
        <Route path="/cms/add/:id" exact render={(props) => {
          return <PageLayout {...props} component={AddArticle} />;
        }} />
        <Route path="/cms/list" exact render={(props) => {
          return <PageLayout {...props} component={ArticleList} />;
        }} />
        {/* <Route
          render={(props) => {
            return <PageLayout {...props} component={() => (<div>页面不存在</div>)} />;;
          }}
        /> */}
      </Router>
    </Suspense>
  );
}
export default Main;
