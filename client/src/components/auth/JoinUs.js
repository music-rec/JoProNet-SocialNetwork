import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alertAct";
import { loginAct, registerAct } from "../../actions/authAct";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Transition as TransitionSpring, animated } from 'react-spring/renderprops';

import {
  Grid,
  Segment,
  Header,
  Icon,
  Divider,
  Container
} from "semantic-ui-react";
import Login from "./Login";
import Register from "./Register";

const JoinUs = ({
  apiUrl,
  loginAct,
  registerAct,
  isAuthenticated,
  setAlert
}) => {
  const [formVisible, toggleFormVisible] = useState({
    login: true,
    register: false
  });
  const { login, register } = formVisible;

  // Redirect if LOGGED IN
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Container>
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Row verticalAlign="top">
            <Grid.Column>
              <Fragment>
                <TransitionSpring
                  native
                  items={true}
                  from={{ opacity: 0 }}
                  enter={{ opacity: 1 }}
                  leave={{ opacity: 0 }}
                  config={{ delay: 1000 }}
                >
                  {
                    show => show && (props => (
                      <animated.div style={props}>
                        <Fragment>
                          <Segment style={{ borderRadius: "50px" }}>
                            <Divider
                              horizontal
                              onClick={() =>
                                toggleFormVisible({ login: !login, register: !register })
                              }
                            >
                              <Header as='h3'>
                                {login ? (
                                  <Icon name='arrow alternate circle up' />
                                ) : (
                                    <Icon name='arrow alternate circle down' />
                                  )}
                                <Header.Content>Login</Header.Content>
                              </Header>
                            </Divider>
                          </Segment>
                        </Fragment>
                      </animated.div>
                    ))
                  }
                </TransitionSpring>
              </Fragment>
            </Grid.Column>
            <Grid.Column>
              <Fragment><TransitionSpring
                native
                items={true}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}
                config={{ delay: 1000 }}
              >
                {
                  show => show && (props => (
                    <animated.div style={props}>
                      <Fragment>
                        <Segment style={{ borderRadius: "50px" }}>
                          <Divider
                            horizontal
                            onClick={() =>
                              toggleFormVisible({ login: !login, register: !register })
                            }
                          >
                            <Header as='h3'>
                              {register ? (
                                <Icon name='arrow alternate circle up' />
                              ) : (
                                  <Icon name='arrow alternate circle down' />
                                )}
                              <Header.Content>Register</Header.Content>
                            </Header>
                          </Divider>
                        </Segment>
                      </Fragment>
                    </animated.div>
                  ))
                }
              </TransitionSpring>
              </Fragment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Segment style={{ backgroundColor: "transparent", border: "none" }}>
                <TransitionSpring
                  native
                  items={login}
                  from={{ opacity: 0 }}
                  enter={{ opacity: 1 }}
                  leave={{ opacity: 0 }}
                  config={{ delay: 1000 }}
                >
                  {
                    show => show && (props => (
                      <animated.div style={props}>
                        <Fragment>
                          <Login
                            apiUrl={apiUrl}
                            loginAct={loginAct}
                          />
                        </Fragment>
                      </animated.div>
                    ))
                  }
                </TransitionSpring>
              </Segment>
            </Grid.Column>
            <Grid.Column verticalAlign='top'>
              <Segment style={{ backgroundColor: "transparent", border: "none" }}>
                <TransitionSpring
                  native
                  items={register}
                  from={{ opacity: 0 }}
                  enter={{ opacity: 1 }}
                  leave={{ opacity: 0 }}
                  config={{ delay: 1000 }}
                >
                  {
                    show => show && (props => (
                      <animated.div style={props}>
                        <Fragment>
                          <Register
                            apiUrl={apiUrl}
                            registerAct={registerAct}
                            setAlert={setAlert}
                          />
                        </Fragment>
                      </animated.div>
                    ))
                  }
                </TransitionSpring>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
      </Container>
    </Fragment>
  );
};

JoinUs.protoType = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  registerAct: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  apiUrl: state.apiUrl.apiUrl,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => {
  return {
    setAlert: (msgHeader, msgContent, alertType) => {
      dispatch(setAlert(msgHeader, msgContent, alertType));
    },
    loginAct: (apiUrl, email, password) => {
      dispatch(loginAct(apiUrl, email, password));
    },
    registerAct: (apiUrl, name, email, password) => {
      dispatch(registerAct(apiUrl, name, email, password));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinUs);
