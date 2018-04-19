import React from 'react';

import { arrayOf, any, objectOf, bool, func } from 'prop-types';

import { Table, PaginatedTable, Column } from 'components/DataTable';
// import MenuColumn from 'components/DataTable/MenuColumn';
import StatusPill from 'components/StatusPill';
import { format } from 'date-fns';
import { map, find, get, uniq, omit, noop } from 'lodash';

import styles from './styles.scss';

export default class SourceTileView extends React.Component {
  static propTypes = {
    jobs: arrayOf(objectOf(any)).isRequired, // an array of source objects
    onSelectJob: func,
    paginate: bool
  };

  static defaultProps = {
    onSelectJob: noop
  };

  getIngestionJobData = i => {
    return this.props.jobs[i];
  };

  renderEnginesIcons = taskTemplates => {
    const icons = uniq(map(taskTemplates.records, 'engine.category.iconClass'));

    return (
      <span className={styles['engine-icons']}>
        {icons.length ? (
          icons.map(
            icon => (icon ? <span key={icon} className={icon} /> : undefined)
          )
        ) : (
          <span>{'-'}</span>
        )}
      </span>
    );
  };

  renderAdapter = taskTemplates => {
    const ingestionTaskTemplate = getIngestionTaskTemplate(taskTemplates);

    return ingestionTaskTemplate ? ingestionTaskTemplate.engine.name : '-';
  };

  renderIngestionType = taskTemplates => {
    const ingestionTaskTemplate = getIngestionTaskTemplate(taskTemplates);

    return ingestionTaskTemplate
      ? ingestionTaskTemplate.engine.category.name
      : '-';
  };

  renderLastIngestion = mostRecentJob => {
    return mostRecentJob
      ? format(mostRecentJob.createdDateTime, 'M/D/YYYY h:mm A')
      : '-';
  };

  renderStatus = isActive => {
    return <StatusPill status={isActive ? 'active' : 'inactive'} />;
  };

  render() {
    const TableComp = this.props.paginate ? PaginatedTable : Table;
    const dataKey = 'jobTemplates.records[0].taskTemplates';
    const tableProps = omit(this.props, ['jobs', 'paginate']);

    return (
      <TableComp
        rowGetter={this.getIngestionJobData}
        rowCount={this.props.jobs.length}
        onCellClick={this.props.onSelectJob}
        rowHeight={48}
        {...tableProps}
      >
        <Column dataKey="name" header="Job Name" />
        <Column
          dataKey="isActive"
          header="Status"
          cellRenderer={this.renderStatus}
        />
        <Column
          dataKey={dataKey}
          header="Engines"
          cellRenderer={this.renderEnginesIcons}
          align="center"
        />
        <Column
          dataKey={dataKey}
          header="Adapter"
          cellRenderer={this.renderAdapter}
        />
        <Column
          dataKey={dataKey}
          header="Ingestion Type"
          cellRenderer={this.renderIngestionType}
          align="center"
        />
        <Column
          dataKey="jobs.records[0]"
          header="Last Ingestion"
          cellRenderer={this.renderLastIngestion}
        />
        {/* <MenuColumn
          id="menu"
          dataKey='jobTemplates.records[0].taskTemplates'
          onSelectItem={this.props.onSelectMenuItem}
        /> */}
      </TableComp>
    );
  }
}

function getIngestionTaskTemplate(taskTemplates) {
  return find(
    taskTemplates.records,
    templateRecord =>
      get(templateRecord, 'engine.category.type.name') === 'Ingestion'
  );
}
