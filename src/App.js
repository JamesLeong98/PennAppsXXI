import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import Login from './components/Login'
import ErrorPage from "./components/Error";

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/error" component={ErrorPage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
  );
}

export default App;
