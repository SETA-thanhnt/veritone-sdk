import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import faker from 'faker';

import VeritoneApp from '../../shared/VeritoneApp';
import { TableWidget } from './';
import { startCase, upperCase, map, flow, truncate, range } from 'lodash';

const row = () => ({
  date: faker.date.future(),
  name: faker.internet.userName(),
  text: faker.lorem.paragraph(),
  ip: faker.internet.ip(),
  actions: ['View', 'Edit', 'Delete']
});
const data = range(50).map(row);

const menuHandler = action('menu item selected');
const columns = map(data[0], (val, key) => {
  const isMenu = key === 'actions';
  return {
    dataKey: key,
    header: startCase(key),
    transform: flow([upperCase, truncate]),
    align: 'center',
    width: Math.min((Math.min(key.length, 4) + 1) * 10, 100),
    menu: isMenu,
    onSelectItem: isMenu ? menuHandler : undefined
  };
});

class Story extends React.Component {
  componentDidMount() {
    this._table = new TableWidget({
      elId: 'table-widget',
      title: 'TableWidget Widget',
      paginate: true,
      initialItemsPerPage: 10,
      data,
      columns
    });
  }

  componentWillUnmount() {
    this._table.destroy();
  }

  render() {
    return (
      <div>
        <span id="table-widget" />
      </div>
    );
  }
}

const app = VeritoneApp();

storiesOf('Table', module).add('Base', () => {
  const sessionToken = text('Api Session Token', '');

  return <Story sessionToken={sessionToken} store={app._store} />;
});
