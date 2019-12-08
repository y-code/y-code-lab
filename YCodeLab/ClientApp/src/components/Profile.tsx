import * as React from 'react';

import './Profile.scss';

export default class Profile extends React.PureComponent<{
}, {
}> {
  public render() {
    return (
      <div className="profile-page">
        <h1 className="site-category-name">Profile</h1>
      </div>
    );
  }
}
