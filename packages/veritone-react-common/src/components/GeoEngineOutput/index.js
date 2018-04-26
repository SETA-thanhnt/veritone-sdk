import React, { Component } from 'react';
import { number, string, func, shape, arrayOf } from 'prop-types';

import classNames from 'classnames';

import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import withMuiThemeProvider from 'helpers/withMuiThemeProvider';
import { format } from '../../helpers/date';

import EngineOutputHeader from '../EngineOutputHeader';
import GeoTimeView from './GeoTimeView';
import GeoMapview from './GeoMapView';
import GoogleMapHelpers from './GeoMapView/GoogleMapComponent/GoogleMapHelpers';

import styles from './styles.scss';

@withMuiThemeProvider
export default class GeoEngineOutput extends Component {
  static propTypes = {
    title: string,
    data: arrayOf(
      shape({
        startTimeMs: number,
        stopTimeMs: number,
        series: arrayOf(
          shape({
            startTimeMs: number,
            stopTimeMs: number,
            gps: arrayOf(
              shape({
                latitude: number, // in meters
                longitude: number, // in meters
                precision: number, // in meters
                direction: number, // 0-360
                velocity: number, // in meters
                altitude: number // in meters
              })
            )
          })
        )
      })
    ),
    startTimeStamp: string,

    apiKey: string,
    travelMode: string,

    engines: arrayOf(
      shape({
        id: string,
        name: string
      })
    ),
    selectedEngineId: string,

    className: string,
    headerClassName: string,
    bodyClassName: string,
    mapViewClassName: string,
    timeViewClassName: string,

    onClick: func,
    onEngineChange: func,
    onExpandClicked: func,

    mediaPlayerTimeMs: number,
    mediaPlayerTimeIntervalMs: number
  };

  static defaultProps = {
    title: 'Geolocation',
    mediaPlayerTimeMs: -1,
    mediaPlayerTimeIntervalMs: 0,
    travelMode: GoogleMapHelpers.FLYING
  };

  state = {
    currentView: 'mapView'
  };

  handleViewChanged = (event, value) => {
    this.setState({
      currentView: event.target.value
    });
  };

  renderHeader() {
    const {
      title,
      engines,
      selectedEngineId,
      onEngineChange,
      onExpandClicked,
      headerClassName
    } = this.props;

    return (
      <EngineOutputHeader
        title={title}
        engines={engines}
        selectedEngineId={selectedEngineId}
        onEngineChange={onEngineChange}
        onExpandClicked={onExpandClicked}
        className={classNames(headerClassName)}
      >
        <Select
          autoWidth
          value={this.state.currentView}
          onChange={this.handleViewChanged}
          className={classNames(styles.view)}
          MenuProps={{
            anchorOrigin: {
              horizontal: 'center',
              vertical: 'bottom'
            },
            transformOrigin: {
              horizontal: 'center'
            },
            getContentAnchorEl: null
          }}
        >
          <MenuItem value="mapView" className={classNames(styles.view)}>
            Map View
          </MenuItem>
          <MenuItem value="timeView" className={classNames(styles.view)}>
            Time Correllation
          </MenuItem>
        </Select>
      </EngineOutputHeader>
    );
  }

  parsePropsData() {
    const {
      data,
      startTimeStamp,
      mediaPlayerTimeMs,
      mediaPlayerTimeIntervalMs
    } = this.props;

    const startMediaPlayHeadMs = mediaPlayerTimeMs;
    const stopMediaPlayHeadMs = mediaPlayerTimeMs + mediaPlayerTimeIntervalMs;

    const timeStampMS = new Date(startTimeStamp).getTime();
    const extractedData = [];
    data.forEach(dataChunk => {
      const series = dataChunk.series;
      series &&
        series.forEach(entry => {
          const entryStartTime = entry.startTimeMs;
          const entryStopTime = entry.stopTimeMs;
          const parsedEntry = Object.assign(entry, entry.gps[0]);
          parsedEntry.lat = entry.gps[0].latitude;
          parsedEntry.lng = entry.gps[0].longitude;
          parsedEntry.startTimeStamp = format(
            timeStampMS + entryStartTime,
            'hh:mm:ss A'
          );
          parsedEntry.stopTimeStamp = format(
            timeStampMS + entryStopTime,
            'hh:mm:ss A'
          );
          parsedEntry.active = !(
            stopMediaPlayHeadMs < entryStartTime ||
            startMediaPlayHeadMs > entryStopTime
          );
          extractedData.push(parsedEntry);
        });
    });
    return extractedData;
  }

  renderBody() {
    const {
      onClick,
      apiKey,
      travelMode,
      mapViewClassName,
      timeViewClassName,
      mediaPlayerTimeMs
    } = this.props;

    const parsedData = this.parsePropsData();

    if (this.state.currentView === 'mapView') {
      return (
        <GeoMapview
          data={parsedData}
          onClick={onClick}
          apiKey={apiKey}
          travelMode={travelMode}
          mediaPlayerTimeMs={mediaPlayerTimeMs}
          className={classNames(mapViewClassName)}
        />
      );
    } else {
      return (
        <GeoTimeView
          data={parsedData}
          onClick={onClick}
          className={classNames(timeViewClassName)}
        />
      );
    }
  }

  render() {
    const { className, bodyClassName } = this.props;

    return (
      <div className={classNames(styles.geoEngineOutput, className)}>
        {this.renderHeader()}
        <div className={classNames(styles.body, bodyClassName)}>
          {this.renderBody()}
        </div>
      </div>
    );
  }
}
