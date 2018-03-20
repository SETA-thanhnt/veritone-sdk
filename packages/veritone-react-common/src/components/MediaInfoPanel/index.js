import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Paper from 'material-ui/Paper';
import { object, func, bool, arrayOf, any } from 'prop-types';
import styles from './styles.scss';

class MediaInfoPanel extends Component {

  static propTypes = {
    tdo: object,
    engineCategories: arrayOf(any),
    onClose: func,
    onSaveMetadata: func,
    onSaveTags: func,
    isInfoPanelOpen: bool
  };

  state = {
    isOpen: true,
    menuAnchorEl: null,
  };

  toggleIsOpen = () => {
    this.setState({
      isOpen : !this.state.isOpen
    });
    this.props.onClose();
  };

  toFormattedDate = (dateString) => {
    if (!dateString || !dateString.length) {
      return '';
    }
    const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const dateParts = (new Date(dateString)).toLocaleDateString([], dateOptions).split(',');
    return `${dateParts[0]}${dateParts[1]},${dateParts[2]}${dateParts[3]}`;
  };

  differenceToHhMmSs = (startDateTime, stopDateTime) => {
    if (!startDateTime || !startDateTime.length || !stopDateTime || !stopDateTime.length) {
      return '00:00:00';
    }
    const millis = Date.parse(stopDateTime) - Date.parse(startDateTime);
    const hh = Math.floor((millis / (1000 * 60 * 60)) % 24);
    const mm = Math.floor((millis / (1000 * 60)) % 60);
    const ss = Math.floor((millis / 1000) % 60);
    return `${hh < 10 ? '0' + hh : hh}:${mm < 10 ? '0' + mm : mm}:${ss < 10 ? '0' + ss : ss}`;
  };

  onMenuClick = event => {
    this.setState({ menuAnchorEl: event.currentTarget });
  };

  onMenuClose = () => {
    console.log('on menu close click');
    this.setState({ menuAnchorEl: null });
  };

  render () {
    const { menuAnchorEl } = this.state;

    const contentElement = (
      <div className={styles.mediaInfoPanel}>
        <div>
          <div className={styles.infoPanelHeader}>
            <span>Metadata</span>
            <div className={styles.headerMenu}>
              <IconButton
                aria-label='More'
                aria-owns={menuAnchorEl ? 'metadata-menu' : null}
                onClick={this.onMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id='metadata-menu'
                anchorEl={this.state.menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={this.onMenuClose}>
                <MenuItem onClick={this.onMenuClose}>Edit Metadata</MenuItem>
                <MenuItem onClick={this.onMenuClose}>Edit Tags</MenuItem>
                {/* TODO: uncomment when can download large/chunked files
                  <MenuItem onClick={this.onMenuClose}>Download</MenuItem>
                */}
              </Menu>
              <IconButton className={styles.closeButton} onClick={this.toggleIsOpen} aria-label='Close'>
                <Icon className='icon-close-exit'/>
              </IconButton>
            </div>
          </div>
          <Paper className={styles.infoPanelContent}>
            <div className={styles.infoField}>
              <div className={styles.infoFieldLabel}>Filename</div>
              <div className={styles.infoFieldData}>{this.props.tdo.details.veritoneFile.filename}</div>
            </div>
            <div className={styles.infoField}>
              <div className={styles.infoFieldLabel}>Date Created</div>
              <div className={styles.infoFieldData}>{this.toFormattedDate(this.props.tdo.details.date)}</div>
            </div>
            <div className={styles.infoField}>
              <div className={styles.infoFieldLabel}>Duration</div>
              <div className={styles.infoFieldData}>{this.differenceToHhMmSs(this.props.tdo.startDateTime, this.props.tdo.stopDateTime)}</div>
            </div>
            <div className={styles.infoField}>
              <div className={styles.infoFieldLabel}>Engines</div>
              <div className={styles.infoFieldData}>
                {this.props.engineCategories &&
                  <div>{
                    this.props.engineCategories
                        .filter(category => category.engines && category.engines.length)
                        .map(category => (
                          <div key={category.id}>
                            <b>{category.name}:</b> {category.engines.map(engine => engine.name).join(', ')}
                          </div>
                        ))}
                  </div>}
              </div>
            </div>
            <div className={styles.infoField}>
              <div className={styles.infoFieldLabel}>Tags</div>
              <div className={styles.infoFieldData}>
                {this.props.tdo.details.tags &&
                  <div>this.props.tdo.details.tags.join(', ')</div>}</div>
            </div>
            <div className={styles.programImagesSection}>
              <div>Program Live Image
                {this.props.tdo.details.veritoneProgram.programLiveImage && this.props.tdo.details.veritoneProgram.programLiveImage.length &&
                  <img className={styles.programLiveImage} src={this.props.tdo.details.veritoneProgram.programLiveImage}/>}
                {(!this.props.tdo.details.veritoneProgram.programLiveImage || !this.props.tdo.details.veritoneProgram.programLiveImage.length) &&
                  <img className={styles.programLiveImage} src='//static.veritone.com/veritone-ui/default-nullstate.svg'/>}
              </div>
              <div>Program Image
                {this.props.tdo.details.veritoneProgram.programImage && this.props.tdo.details.veritoneProgram.programImage.length &&
                  <img className={styles.programImage} src={this.props.tdo.details.veritoneProgram.programImage}/>}
                {(!this.props.tdo.details.veritoneProgram.programImage || !this.props.tdo.details.veritoneProgram.programImage.length) &&
                  <img className={styles.programImage} src='//static.veritone.com/veritone-ui/program_image_null.svg'/>}
              </div>
            </div>
          </Paper>
        </div>
      </div>
    );

    return (
      <Drawer anchor='right' open={this.state.isOpen} onClose={this.toggleIsOpen}>
        {contentElement}
      </Drawer>
    );
  }

}

export default withStyles(styles)(MediaInfoPanel);