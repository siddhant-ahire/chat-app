import React from 'react';
import { Route } from 'react-router';

const PublicRoute = ({children, ...routeProps}) => {

    

    return (
    <Route {...routeProps}>{children}</Route>
    )
}

export default PublicRoute
