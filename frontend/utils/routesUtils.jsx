import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  loggedIn: !!state.session.currentUser.id,
});

const NotAuthed = ({ component: Component, path, loggedIn }) => {
  if (loggedIn) return null; // without this, will redirect to root unnecessarily
  return (
    <Route
      path={path}
      render={props => (
        loggedIn ? <Redirect to="/" /> : <Component {...props} />
      )}
    />
  )
};

const Authed = ({ component: Component, path, loggedIn }) => {
  if (!loggedIn) return null; // without this, will redirect to root unnecessarily
  return (<Route
    path={path}
    render={props => (
      loggedIn ? <Component {...props} /> : <Redirect to="/" />
    )}
  />)
};

export const NotAuthedRoute = withRouter(connect(mapStateToProps)(NotAuthed));
export const AuthedRoute = withRouter(connect(mapStateToProps, undefined)(Authed));
