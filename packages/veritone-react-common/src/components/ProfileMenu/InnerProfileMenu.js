import React from 'react';
import { get } from 'lodash';
import PowerIcon from 'material-ui-icons/PowerSettingsNew';
import { MenuItem } from 'material-ui/es/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/es/List';
import Button from 'material-ui/es/Button';
import Avatar from 'material-ui/es/Avatar';
import ListSubheader from 'material-ui/es/List/ListSubheader';
import { string, func, shape } from 'prop-types';

import styles from './styles.scss';

export default class InnerProfileMenu extends React.Component {
  static propTypes = {
    onLogout: func.isRequired,
    onEditProfile: func.isRequired,
    user: shape({
      userName: string,
      kvp: shape({
        firstName: string,
        lastName: string,
        image: string
      })
    })
  };

  render() {
    return [
      <ListSubheader className={styles['header']} key="header">
        <div className={styles['user-avatar']}>
          <Avatar
            src={get(
              this.props.user,
              'kvp.image',
              '//static.veritone.com/veritone-ui/default-avatar-2.png'
            )}
          />
        </div>
        <div className={styles['user-profile']}>
          <div className={styles['full-name']}>
            {get(this.props.user, 'kvp.firstName')}&nbsp;
            {get(this.props.user, 'kvp.lastName')}
          </div>
          <div className={styles['username']}>
            {get(this.props.user, 'userName')}
          </div>
          <div className={styles['editButton']}>
            <Button
              raised
              color="primary"
              onClick={this.props.onEditProfile}
              className="editProfileButton"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </ListSubheader>,

      <MenuItem
        onClick={this.props.onLogout}
        key="logout"
        className="logoutButton"
      >
        <ListItemIcon>
          <PowerIcon />
        </ListItemIcon>
        <ListItemText primary="Log out" />
      </MenuItem>
    ];
  }
}
