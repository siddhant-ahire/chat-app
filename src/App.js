import React from 'react';
import { Switch } from 'react-router';
import PrivateRoute from './components/PrivateRoute'
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import { ProfileProvider } from './context/profile.context';

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute exact path="/signIn">
          <SignIn/>
        </PublicRoute>
        <PrivateRoute exact path="/">
          <Home/>
        </PrivateRoute>
      </Switch>
    </ProfileProvider>
  );
}

export default App;
