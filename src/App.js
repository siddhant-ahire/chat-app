import React from 'react';
import { Switch } from 'react-router';
import PrivateRoute from './components/PrivateRoute'
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';

function App() {
  return (
    <Switch>
      <PrivateRoute exact path="/hii">
        <SignIn/>
      </PrivateRoute>
      <PublicRoute exact path="/hello">
        <Home/>
      </PublicRoute>
    </Switch>
  );
}

export default App;
