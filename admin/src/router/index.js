import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from '../pages/login';
import Layout from '../common/layout';

function Main() {
  return (
    <Router>
      <Route path="/login/" exact component={Login} />
      <Route path="/index/" exact component={Layout} />
    </Router>
  )
}
export default Main