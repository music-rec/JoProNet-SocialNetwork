import React, { Fragment } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export const WelcomeLoader = () => (
  <Fragment>
    <Dimmer active>
      <Loader size='massive'>Loading ...</Loader>
    </Dimmer>
  </Fragment>
);

export const MainLoader = () => (
  <Dimmer active inverted>
    <Loader size='massive'>Loading ...</Loader>
  </Dimmer>
);

export const LoaderProfile = () => (
  <Fragment>
    <Dimmer active>
      <Loader active inline='centered' size='huge'>
        The profile is loading ...
      </Loader>
    </Dimmer>
  </Fragment>
);

export const LoaderPost = () => (
  <Fragment>
    <Dimmer active>
      <Loader active inline='centered' size='huge'>
        The post is loading...
      </Loader>
    </Dimmer>
  </Fragment>
);

export const LoaderEditProfile = () => (
  <Fragment>
    <Dimmer active>
      <Loader active inline='centered' size='huge'>
        Your profile data is loading...
      </Loader>
    </Dimmer>
  </Fragment>
);

export const LoaderExperienceDetails = () => (
  <Fragment>
    <Dimmer active>
      <Loader active inline='centered' size='huge'>
        Your Experience credential is loading...
      </Loader>
    </Dimmer>
  </Fragment>
);

export const LoaderEducationDetails = () => (
  <Fragment>
    <Dimmer active>
      <Loader active inline='centered' size='huge'>
        Your Education credential is loading...
      </Loader>
    </Dimmer>
  </Fragment>
);
