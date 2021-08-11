import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from "../../context/authContext";

const CustomRoute = ({ component: Component, ...rest}) => {
  const { currentUser } = useAuth();

  return (
    <Route
    {...rest}
    render={props => {
      return currentUser ? <Component {...props} /> : <Redirect to="/login" />
    }}
    >
      
    </Route>
  )
}

export default CustomRoute
