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
      <PublicRoute exact path="/signIn">
        <SignIn/>
      </PublicRoute>
      <PrivateRoute exact path="/">
        <Home/>
      </PrivateRoute>
    </Switch>
  );
}

export default App;
