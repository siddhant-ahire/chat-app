import React from 'react';
import { Redirect, Route } from 'react-router';

const PublicRoute = ({children, ...routeProps}) => {

    const profile = true
    if(profile){
        <Redirect to="/" />
    }

    return (
    <Route {...routeProps}>{children}</Route>
    )
}

export default PublicRoute
