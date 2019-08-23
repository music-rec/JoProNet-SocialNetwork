import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AllProfilePlaceholder from "./AllProfilePlaceholder"
import { getAllProfilesAct } from "../../actions/profileAct";
import {
  Container,
  Segment,
  Divider,
  Header,
  Grid,
  Icon
} from "semantic-ui-react";
import ProfileList from "./ProfileList";

const AllProfiles = props => {
  const { apiUrl, profile } = props;

  useEffect(() => {
    props.getAllProfilesAct(apiUrl);
  }, []);

  return (
    <Fragment>
      <Fragment>
        <Container>
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Segment>
            {profile.loading || profile.allProfiles.length === 0 ? (
              // <MainLoader />
              <AllProfilePlaceholder />

            ) : (
                <Fragment>
                  <Fragment>
                    <Grid columns='equal'>
                      <Grid.Column>
                        <Header as='h1' color='blue'>
                          Keep Connecting
                    </Header>
                      </Grid.Column>
                    </Grid>
                    <Grid columns='equal'>
                      <Grid.Column>
                        <Header as='h3'>
                          <Icon name='connectdevelop' />
                          <Header.Content>
                            Browse and connect with our members
                      </Header.Content>
                        </Header>
                      </Grid.Column>
                    </Grid>
                  </Fragment>
                  <Divider hidden />
                  <Fragment>
                    {profile.allProfiles.length > 0 ? (
                      profile.allProfiles.map(profile => (
                        <ProfileList key={profile._id} profile={profile} />
                      ))
                    ) : (
                        <Header size='huge'>No profiles found...</Header>
                      )}
                  </Fragment>
                </Fragment>
              )}
          </Segment>
        </Container>
      </Fragment>
      <Divider hidden />
    </Fragment>
  );
};

AllProfiles.propTypes = {
  getAllProfilesAct: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  apiUrl: state.apiUrl.apiUrl,
  profile: state.profile
});

const mapDispatchToProps = dispatch => {
  return {
    getAllProfilesAct: apiUrl => {
      dispatch(getAllProfilesAct(apiUrl));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllProfiles);
