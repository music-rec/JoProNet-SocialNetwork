import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createOrUpdateProfileAct,
  getCurrentProfileAct
} from "../../../actions/profileAct";

import {
  Button,
  Form,
  Container,
  Grid,
  Header,
  Icon,
  TextArea,
  Segment,
  Divider,
  Label,
  Dropdown,
  Message
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import { statusOptions } from "../../../utils/dropdownData";
import { countryOptions } from "../../../utils/dropdownData";

const EditProfile = props => {
  const [formData, setFormData] = useState({
    company: "",
    number: "",
    languages: "",
    country: "",
    status: "",
    website: "",
    location: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const {
    apiUrl,
    auth,
    profile: { profile, loading },
    alerts
  } = props;

  useEffect(
    () => {
      console.log("useEffect editprofile");
      props.getCurrentProfileAct(apiUrl);
      setFormData({
        company: loading || !profile.company ? "" : profile.company,
        number: loading || !profile.number ? "" : profile.number,
        country: loading || !profile.country ? "" : profile.country,
        status: loading || !profile.status ? "" : profile.status,
        website: loading || !profile.website ? "" : profile.website,
        location: loading || !profile.location ? "" : profile.location,
        skills: loading || !profile.skills ? "" : profile.skills.toString(),
        languages:
          loading || !profile.languages ? "" : profile.languages.toString(),
        githubusername:
          loading || !profile.githubusername ? "" : githubusername,
        bio: loading || !profile.bio ? "" : profile.bio,
        twitter: loading || !profile.social ? "" : profile.social.twitter,
        facebook: loading || !profile.social ? "" : profile.social.facebook,
        linkedin: loading || !profile.social ? "" : profile.social.linkedin,
        youtube: loading || !profile.social ? "" : profile.social.youtube,
        instagram: loading || !profile.social ? "" : profile.social.instagram
      });
    },
    // The conditon is when it's loading it will run
    [loading]
    // []
  );

  console.log("apiUrl editProfile", apiUrl);
  console.log("profile.loading", loading);
  console.log("formData", formData);
  // console.log("profile.loading", props.profile.loading);
  const icon = "black tie";
  const edit = true;
  const {
    company,
    number,
    languages,
    website,
    location,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    console.log(formData);
    e.preventDefault();
    props.createOrUpdateProfileAct(apiUrl, formData, props.history, edit);
    handleReset();
  };

  const handleReset = e => {
    setFormData({
      company: "",
      status: "",
      number: "",
      country: "",
      languages: "",
      website: "",
      location: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: ""
    });
  };

  return (
    <Fragment>
      <Divider hidden />
      <Divider hidden />
      <Divider hidden />
      <Container>
        <Segment color='blue'>
          <Grid columns='equal'>
            <Grid.Column>
              <Header as='h1' color='blue'>
                <Header.Content>Edit Your Profile</Header.Content>
                <Header.Subheader>
                  Let's get some new information to make your profile stand out
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column width={12} />
          </Grid>
          <Form>
            <Grid columns='equal'>
              <Grid.Column>
                <Divider horizontal>
                  <Header as='h3'>
                    <Icon name='user plus' />
                    Hey {auth.user && auth.user.name.toUpperCase()} edit your
                    profile
                  </Header>
                </Divider>
                <Segment raised color='blue'>
                  <Form.Field>
                    <label>Status</label>
                    <Dropdown
                      button
                      className='icon'
                      fluid
                      labeled
                      icon={icon}
                      search
                      placeholder='Select your Professional Status'
                      options={statusOptions}
                      onChange={(e, { value }) =>
                        setFormData({ ...formData, status: value })
                      }
                    />
                    <p style={{ color: "#888" }}>
                      Give us an idea of where you are at in your career
                    </p>
                  </Form.Field>
                  <Form.Group widths='equal'>
                    <Form.Field>
                      <Form.Input
                        label='Company'
                        placeholder='Enter your company'
                        name='company'
                        value={company}
                        onChange={e => handleChange(e)}
                      />
                      <p style={{ color: "#888" }}>
                        Could be your own company or one you work for
                      </p>
                    </Form.Field>
                    <Form.Field>
                      <Form.Input
                        label='Website'
                        placeholder='Website'
                        name='website'
                        value={website}
                        onChange={e => handleChange(e)}
                      />
                      <p style={{ color: "#888" }}>
                        Could be your own company or one you work for
                      </p>
                    </Form.Field>
                  </Form.Group>
                  <Form.Field>
                    <Form.Input
                      label='Location'
                      placeholder='Enter your location'
                      name='location'
                      value={location}
                      onChange={e => handleChange(e)}
                    />
                    <p style={{ color: "#888", marginTop: "-15px" }}>
                      City & state suggested (eg. Boston, MA)
                    </p>
                  </Form.Field>
                  <Form.Group widths='equal'>
                    <Form.Field>
                      <Form.Input
                        label='Skills'
                        placeholder='Write your skills'
                        name='skills'
                        value={skills}
                        onChange={e => handleChange(e)}
                      />
                      <p style={{ color: "#888" }}>
                        Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)
                      </p>
                    </Form.Field>
                    <Form.Field>
                      <Form.Input
                        label='Github Username'
                        placeholder='Github Username'
                        name='githubusername'
                        value={githubusername}
                        onChange={e => handleChange(e)}
                      />
                      <p style={{ color: "#888" }}>
                        If you want your latest repos and a Github link, include
                        your username in Github
                      </p>
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Field>
                      <Form.Input
                        label='Number'
                        placeholder='Enter your number'
                        name='number'
                        value={number}
                        onChange={e => handleChange(e)}
                      />
                      <p style={{ color: "#888" }}>
                        Please enter the number in this format: +33 12345 67890
                      </p>
                    </Form.Field>
                    <Form.Field>
                      <Form.Input
                        label='Spoken Languages'
                        placeholder='Which language do you speak'
                        name='languages'
                        value={languages}
                        onChange={e => handleChange(e)}
                      />
                      <p style={{ color: "#888" }}>
                        Please use comma separated values (eg.
                        French,English,Lingala,German)
                      </p>
                    </Form.Field>
                  </Form.Group>
                  <Form.Field>
                    <p>
                      <strong>Tell us more</strong>
                    </p>
                    <TextArea
                      placeholder='A short bio of yourseft'
                      style={{ minHeight: 100 }}
                      name='bio'
                      value={bio}
                      onChange={e => handleChange(e)}
                    />
                    <p style={{ color: "#888" }}>
                      Tell us a little about yourself
                    </p>
                  </Form.Field>
                </Segment>
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
                <Divider horizontal>
                  <Header as='h3'>Let's get in Touch</Header>
                </Divider>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label htmlFor='country'>Country</label>
                    <Dropdown
                      button
                      className='icon'
                      fluid
                      labeled
                      icon='world'
                      search
                      placeholder='From which country are you from'
                      options={countryOptions}
                      onChange={(e, { value }) =>
                        setFormData({ ...formData, country: value })
                      }
                    />
                    <p style={{ color: "#888" }}>
                      You can search for a country
                    </p>
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label='Number'
                      placeholder='Enter your number'
                      name='number'
                      value={number}
                      onChange={e => handleChange(e)}
                    />
                    <p style={{ color: "#888" }}>Please enter your number</p>
                  </Form.Field>
                </Form.Group>
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
                <Divider
                  horizontal
                  onClick={() => toggleSocialInputs(!displaySocialInputs)}
                >
                  <Header as='h3'>
                    <Button as='div' labelPosition='right'>
                      <Button icon primary>
                        <Icon name='share alternate square' />
                      </Button>
                      <Label as='a' basic pointing='left'>
                        Add Social Network Links
                      </Label>
                    </Button>
                    {/* Add Social Network Links */}
                  </Header>
                </Divider>
                {displaySocialInputs && (
                  <Fragment>
                    <Segment raised color='blue'>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column width={3} />
                          <Grid.Column width={10}>
                            <Grid>
                              <Grid.Column width={1}>
                                <Icon name='twitter' size='big' color='blue' />
                              </Grid.Column>
                              <Grid.Column width={15}>
                                <Form.Field>
                                  <Form.Input
                                    placeholder='Twitter URL'
                                    name='twitter'
                                    value={twitter}
                                    onChange={e => handleChange(e)}
                                  />
                                </Form.Field>
                              </Grid.Column>
                            </Grid>

                            <Grid>
                              <Grid.Column width={1}>
                                <Icon name='facebook' size='big' color='blue' />{" "}
                              </Grid.Column>
                              <Grid.Column width={15}>
                                <Form.Field>
                                  <Form.Input
                                    placeholder='Facebook URL'
                                    name='facebook'
                                    value={facebook}
                                    onChange={e => handleChange(e)}
                                  />
                                </Form.Field>
                              </Grid.Column>
                            </Grid>

                            <Grid>
                              <Grid.Column width={1}>
                                <Icon name='youtube' size='big' color='red' />{" "}
                              </Grid.Column>
                              <Grid.Column width={15}>
                                <Form.Field>
                                  <Form.Input
                                    placeholder='YouTube URL'
                                    name='youtube'
                                    value={youtube}
                                    onChange={e => handleChange(e)}
                                  />
                                </Form.Field>
                              </Grid.Column>
                            </Grid>

                            <Grid>
                              <Grid.Column width={1}>
                                <Icon name='linkedin' size='big' color='blue' />{" "}
                              </Grid.Column>
                              <Grid.Column width={15}>
                                <Form.Field>
                                  <Form.Input
                                    placeholder='LinkedIn URL'
                                    name='linkedin'
                                    value={linkedin}
                                    onChange={e => handleChange(e)}
                                  />
                                </Form.Field>
                              </Grid.Column>
                            </Grid>

                            <Grid>
                              <Grid.Column width={1}>
                                <Icon
                                  name='instagram'
                                  size='big'
                                  color='blue'
                                />{" "}
                              </Grid.Column>
                              <Grid.Column width={15}>
                                <Form.Field>
                                  <Form.Input
                                    placeholder='Instagram URL'
                                    name='instagram'
                                    value={instagram}
                                    onChange={e => handleChange(e)}
                                  />
                                </Form.Field>
                              </Grid.Column>
                            </Grid>
                          </Grid.Column>
                          <Grid.Column width={3} />
                        </Grid.Row>
                      </Grid>
                    </Segment>
                  </Fragment>
                )}
              </Grid.Column>
            </Grid>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Button
              primary
              icon
              labelPosition='left'
              onClick={e => handleSubmit(e)}
            >
              Submit
              <Icon name='chevron down' />
            </Button>
            <Button icon labelPosition='left' onClick={e => handleReset(e)}>
              Cancel
              <Icon name='cancel' />
            </Button>
            <Link to='/dashboard'>
              <Button icon labelPosition='left' floated='right'>
                Go Back
                <Icon name='left arrow' />
              </Button>
            </Link>
          </Form>
          <Fragment>
            {alerts !== null &&
              alerts.length > 0 &&
              alerts.map(alert => (
                <React.Fragment key={alert.id}>
                  {alert.alertType === "error" ? (
                    <Message error>
                      <Message.Header>{alert.msgHeader}</Message.Header>
                      <p>{alert.msgContent}</p>
                    </Message>
                  ) : (
                    <div style={{ display: "none" }} />
                  )}
                </React.Fragment>
              ))}
          </Fragment>
          <Fragment>
            {alerts !== null &&
              alerts.length > 0 &&
              alerts.map(alert => (
                <React.Fragment key={alert.id}>
                  {alert.alertType === "success" ? (
                    <Message positive>
                      <Message.Header>{alert.msgHeader}</Message.Header>
                      <p>{alert.msgContent}</p>
                    </Message>
                  ) : (
                    <div style={{ display: "none" }} />
                  )}
                </React.Fragment>
              ))}
          </Fragment>
        </Segment>
      </Container>
      <Divider hidden />
      <Divider hidden />
      <Divider hidden />
    </Fragment>
  );
};

EditProfile.propTypes = {
  createOrUpdateProfileAct: PropTypes.func.isRequired,
  getCurrentProfileAct: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert,
  apiUrl: state.apiUrl.apiUrl,
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToProps = dispatch => {
  return {
    createOrUpdateProfileAct: (apiUrl, formData, history, edit) => {
      dispatch(createOrUpdateProfileAct(apiUrl, formData, history, edit));
    },
    getCurrentProfileAct: apiUrl => {
      dispatch(getCurrentProfileAct(apiUrl));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
