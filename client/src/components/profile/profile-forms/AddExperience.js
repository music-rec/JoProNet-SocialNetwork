import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

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
  Checkbox,
  Dropdown
} from "semantic-ui-react";

import { DateInput } from "semantic-ui-calendar-react";
import { countryOptions } from "../../../utils/dropdownData";
import { connect } from "react-redux";
import { addExperienceAct } from "../../../actions/profileAct";

const AddExperience = ({ apiUrl, auth, addExperienceAct, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    country: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });
  const [error, setError] = useState(false)

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (company === "" || title === "" || from === "") {
      addExperienceAct(apiUrl, formData, history);
      setError(true);
    } else {
      addExperienceAct(apiUrl, formData, history);
      setError(false)
      handleReset();
    }
  };

  const handleReset = e => {
    setFormData({
      company: "",
      title: "",
      country: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: ""
    });
  };

  const goBack = (history) => {
    history.go(-1);
    // history.goBack();
  }

  const onDateChange = (e, name) => {
    if (name.name === "from") {
      setFormData({ ...formData, from: name.value });
    }

    if (name.name === "to") {
      setFormData({ ...formData, to: name.value });
    }
  };

  return (
    <Fragment>
      <Container>
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Segment color='blue'>
          <Grid columns='equal'>
            <Grid.Column>
              <Header as='h1' color='blue'>
                <Header.Content>Add An Experience</Header.Content>
                <Header.Subheader>
                  Let's get some information to make your profile stand out
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
                    <Icon name='code branch' />
                    Yoo {auth.user && auth.user.name.toUpperCase()} you can add
                    an experience to your profile
                  </Header>
                </Divider>
                <Segment raised>
                  <Form.Group widths='equal'>
                    <Form.Field>
                      <Form.Input
                        label='Job Title'
                        placeholder='Enter your job'
                        name='title'
                        value={title}
                        onChange={e => handleChange(e)}
                        error={error}
                      />
                      <p style={{ color: "#888" }}>
                        Could be Developer, Manager etc.
                      </p>
                    </Form.Field>
                    <Form.Field>
                      <Form.Input
                        label='Company'
                        placeholder='Enter the name of your company'
                        name='company'
                        value={company}
                        onChange={e => handleChange(e)}
                        error={error}
                      />
                      <p style={{ color: "#888" }}>
                        In which company did you worked
                      </p>
                    </Form.Field>
                  </Form.Group>
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
                        label='Location'
                        placeholder='Enter your location'
                        name='location'
                        value={location}
                        onChange={e => handleChange(e)}
                      />
                      <p style={{ color: "#888" }}>
                        City & state suggested of the company (eg. Boston, MA)
                      </p>
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Field>
                      <label>From Date</label>
                      <DateInput
                        name='from'
                        placeholder='month/day/year'
                        value={from}
                        clearable
                        clearIcon={<Icon name='remove' color='red' />}
                        iconPosition='left'
                        onChange={(e, name) => onDateChange(e, name)}
                        dateFormat='MM-DD-YYYY'
                        error={error}
                      />
                    </Form.Field>
                    <Form.Field disabled={toDateDisabled ? true : false}>
                      <label>To Date</label>
                      <DateInput
                        name='to'
                        placeholder='month/day/year'
                        value={to}
                        clearable
                        clearIcon={<Icon name='remove' color='red' />}
                        iconPosition='left'
                        onChange={(e, name) => onDateChange(e, name)}
                        dateFormat='MM-DD-YYYY'
                      />
                    </Form.Field>
                    <Form.Field>
                      <Checkbox
                        style={{ marginTop: "15%", marginLeft: "15%" }}
                        label='Current Job'
                        name='current'
                        onChange={e => {
                          setFormData({ ...formData, current: !current, to: "" });
                          toggleDisabled(!toDateDisabled);
                        }}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Field>
                    <label>Tell us more about your job</label>
                    <TextArea
                      placeholder='What did you do ?'
                      style={{ minHeight: 100 }}
                      name='description'
                      value={description}
                      onChange={e => handleChange(e)}
                    />
                    <p style={{ color: "#888" }}>
                      Write short description of your job
                    </p>
                  </Form.Field>
                </Segment>
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
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
              style={{ borderRadius: "50px" }}
            >
              Submit
              <Icon name='chevron down' />
            </Button>
            <Button icon labelPosition='left' onClick={e => handleReset(e)} style={{ borderRadius: "50px" }}>
              Cancel
              <Icon name='cancel' />
            </Button>
            <Button icon labelPosition='left' floated='right' onClick={e => goBack(history)} style={{ borderRadius: "50px" }}>
              Go Back
                <Icon name='left arrow' />
            </Button>
          </Form>
        </Segment>
        <Divider hidden />
      </Container>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperienceAct: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  apiUrl: state.apiUrl.apiUrl,
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    addExperienceAct: (apiUrl, formData, history) => {
      dispatch(addExperienceAct(apiUrl, formData, history));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddExperience));
