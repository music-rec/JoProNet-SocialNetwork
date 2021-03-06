import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfileAct, deleteAccountAct } from "../../actions/profileAct";
import { MainLoader } from "../../utils/Loader";
import { Link } from "react-router-dom";
import { Transition as TransitionSpring, animated } from 'react-spring/renderprops';

import {
  Container,
  Grid,
  Segment,
  Header,
  Icon,
  Divider
} from "semantic-ui-react";

import DashboardActions from "./DashboardActions";
import ExperienceCard from "./experience/ExperienceCard";
import EducationList from "./education/EducationList";

const Dashboard = ({ apiUrl, auth, profile, getCurrentProfileAct, deleteAccountAct }) => {

  useEffect(function getCurrentProfil() {
    // 👍 We're not breaking the first rule anymore
    if (apiUrl) {
      getCurrentProfileAct(apiUrl);
    }
  }, []);

  const handeDeleteAccount = e => {
    deleteAccountAct(apiUrl);
  };

  return (
    <Fragment>
      <Fragment>
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Container>
          <Segment raised color="blue">
            <Fragment>
              {
                profile === null || profile.profileLoading || profile.profile === null ? (
                  <MainLoader />
                ) : (
                    <Fragment>
                      <Fragment>
                        <Grid columns='equal'>
                          <Grid.Column>
                            <Header as='h1' color='blue'>
                              Dashboard
                            </Header>
                          </Grid.Column>
                          <Grid.Column width={12} />
                        </Grid>
                        <Grid columns='equal'>
                          <Grid.Column>
                            <Header as='h3'>
                              <Icon name='user' />
                              <Header.Content>
                                Welcome {auth.user && auth.user.name.toUpperCase()}
                              </Header.Content>
                            </Header>
                          </Grid.Column>
                          <Grid.Column width={10} />
                        </Grid>
                      </Fragment>
                      <Fragment>
                        {
                          profile.profile.length === 0 && (
                            <Fragment>
                              <Fragment>
                                <Grid columns='equal'>
                                  <Grid.Column>
                                    {" "}
                                    <p>
                                      You have not yet setup a profile, please add some info
                                    </p>
                                  </Grid.Column>
                                </Grid>{" "}
                                <Grid columns='equal'>
                                  <Grid.Column>
                                    <Link to='/create-profile'>
                                      <Segment raised>
                                        <Header as='h5' color='grey'>
                                          <Icon name='user plus' color='blue' />
                                          <Header.Content>Create Profile</Header.Content>
                                        </Header>
                                      </Segment>
                                    </Link>
                                  </Grid.Column>
                                  <Grid.Column />
                                  <Grid.Column />
                                </Grid>
                              </Fragment>
                              <Divider hidden />
                              <Divider hidden />
                              <Divider hidden />
                              <Divider hidden />
                              <Divider hidden />
                              <Divider hidden />
                            </Fragment>
                          )
                        }
                      </Fragment>
                      <Fragment>
                        {
                          typeof (profile.profile) === "object" && (
                            <Fragment>
                              <Fragment>
                                {profile.hasProfile === true && <DashboardActions />}
                              </Fragment>
                              <Divider hidden />
                              <Divider hidden />
                              <Divider />
                              <Divider hidden />
                              <Divider hidden />
                              <Fragment>
                                <Segment raised>
                                  <TransitionSpring
                                    native
                                    items={true}
                                    from={{ opacity: 0 }}
                                    enter={{ opacity: 1 }}
                                    leave={{ opacity: 0 }}
                                  >
                                    {
                                      show => show && (props => (
                                        <animated.div style={props}>
                                          <Fragment>
                                            <ExperienceCard profile={profile.profile} />
                                          </Fragment>
                                        </animated.div>
                                      ))
                                    }
                                  </TransitionSpring>
                                </Segment>
                              </Fragment>
                              <Divider hidden />
                              <Divider hidden />
                              <Divider />
                              <Divider hidden />
                              <Divider hidden />
                              <Fragment>
                                <Segment raised>
                                  <TransitionSpring
                                    native
                                    items={true}
                                    from={{ opacity: 0 }}
                                    enter={{ opacity: 1 }}
                                    leave={{ opacity: 0 }}
                                    config={{ delay: 1500 }}
                                  >
                                    {
                                      show => show && (props => (
                                        <animated.div style={props}>
                                          <Fragment>
                                            <EducationList profile={profile.profile} />
                                          </Fragment>
                                        </animated.div>
                                      ))
                                    }
                                  </TransitionSpring>
                                </Segment>
                              </Fragment>
                            </Fragment>
                          )
                        }
                      </Fragment>
                    </Fragment>
                  )
              }
            </Fragment>
            <Divider hidden />
            <Divider hidden />
            <Divider />
            <Divider hidden />
            <Fragment>
              <Grid columns='equal'>
                <Grid.Column textAlign='right'>
                  <Fragment>
                    <Segment
                      raised
                      as={Link}
                      to='/'
                      onClick={handeDeleteAccount}
                      color='red'
                      style={{
                        textDecoration: "none",
                        color: "white",
                        background: "#db2828",
                        borderRadius: "50px"
                      }}
                    >
                      Delete my account
                   </Segment>
                  </Fragment>
                </Grid.Column>
              </Grid>
            </Fragment>
            <Divider hidden />
          </Segment>
        </Container>
        <Divider hidden />
      </Fragment>
    </Fragment>
  )
};

Dashboard.propTypes = {
  getCurrentProfileAct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  apiUrl: state.apiUrl.apiUrl,
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToProps = dispatch => {
  return {
    getCurrentProfileAct: apiUrl => {
      dispatch(getCurrentProfileAct(apiUrl));
    },
    deleteAccountAct: apiUrl => {
      dispatch(deleteAccountAct(apiUrl));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
