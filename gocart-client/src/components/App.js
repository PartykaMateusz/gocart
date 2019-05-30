import React, { Component } from "react";
import StartPage from "./startPage/StartPage.js";
import "./App.css";
import AuthUserFrontPage from "./authUserFrontPage/AuthUserFrontPage.js";
import CreateProfile from "./createProfile/CreateProfile.js";
import Profile from "./profile/Profile.js";
import ShowProfile from "./showProfile/ShowProfile.js";
import SearchUser from "./SearchUser/SearchUser.js";
import Invitations from "./Invitations/Invitations.js";
import updateAvatar from "./profile/updateAvatar/updateAvatar.js";
import PostPage from "./PostPage/PostPage.js";
import CreateGroup from "./groups/CreateGroup.js";
import Groups from "./groups/Groups.js";
import Group from "./groups/ShowGroup/Group.js";
import CreateEvent from "./events/CreateEvents.js";
import Events from "./events/Events.js";
import Event from "./events/showEvent/Event.js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route exact path="/index" component={AuthUserFrontPage} />
          <Route exact path="/createProfile" component={CreateProfile} />

          {/* myProfile: */}
          <Route exact path="/MyProfile" component={Profile} />

          {/* other profile: */}
          <Route exact path="/Profile/:id" component={ShowProfile} />

          <Route exact path="/SearchUser/:name" component={SearchUser} />

          <Route exact path="/invitations" component={Invitations} />

          <Route exact path="/Profile/avatar" component={updateAvatar} />

          <Route exact path="/Post/:id" component={PostPage} />

          <Route exact path="/createGroup" component={CreateGroup} />

          <Route exact path="/groups" component={Groups} />

          <Route exact path="/group/:id" component={Group} />

          <Route exact path="/createEvent" component={CreateEvent} />

          <Route exact path="/events" component={Events} />

          <Route exact path="/event/:id" component={Event} />
        </Switch>
      </Router>
    );
  }
}

export default App;
