import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/es/Tabs';
import IconButton from 'material-ui/es/IconButton';
import { string, func } from 'prop-types';
import styles from './styles.scss';

class FilePickerHeader extends Component {
  handleTabChange = (event, value) => {
    this.props.onSelectTab(value);
  };

  render() {
    return (
      <div className={styles.filePickerHeader}>
        <span className={styles.filePickerTitle}>File Picker</span>
        <IconButton
          classes={{
            root: styles.filePickerCloseButton
          }}
          onClick={this.props.onClose}
        >
          <i className="icon-close-exit" />
        </IconButton>
        <Tabs
          value={this.props.selectedTab}
          indicatorColor="primary"
          onChange={this.handleTabChange}
          className={styles.filePickerTabs}
        >
          <Tab label="Upload" value="upload" />
          <Tab label="By URL" value="by-url" />
        </Tabs>
      </div>
    );
  }
}

FilePickerHeader.propTypes = {
  selectedTab: string,
  onSelectTab: func,
  onClose: func
};

export default FilePickerHeader;
