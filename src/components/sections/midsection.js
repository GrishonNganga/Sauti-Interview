import { Route } from "react-router-dom";

import { TopNav } from "../navigation/topnav.js";
import { DiscoverComponent } from "../dashboard/discover.js";
import { TrendingComponent } from "../dashboard/trending.js";
import { ProfileComponent } from "../dashboard/profile.js";
import { WatchComponent } from '../dashboard/watch';

export const MidSection = ({authenticate}) => {

  return (
    <div className="w-full">
      <TopNav/>
        <Route exact path="/">
          <DiscoverComponent />
        </Route>
        <Route exact path="/trending">
          <TrendingComponent />
        </Route>
        <Route exact path="/profile">
          <ProfileComponent />
        </Route>
        <Route path="/watch/:id">
          <WatchComponent />
        </Route>
    </div>
  );
};
