// Components/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Howtouse from '../roters/Howtouse';
import Header from "./Header";
// App.js에 있던 Aladin, LionKing, SpiderMan을
// Components/Routes.js 로 이동
export default () => (
    <Router>
      <Header />
      <Route path="/Howtouse" component={Howtouse} /> 
    </Router>
)