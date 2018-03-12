import React from 'react';

import { DiscoverySideBar as Sidebar } from 'veritone-react-common';
import LibCheckbox from 'material-ui/Checkbox';
import { isArray, isString } from 'lodash';

import styles from './styles.scss';

import * as Filters from './Filters';

export default function EnginesSideBar({
  filters,
  filterBy,
  onClearAllFilters,
  onClearFilter
}) {
  const engineFilters = {
    children: Object.values(Filters).map(({ label, id }) => {
      return {
        label,
        children: [{ formComponentId: id }]
      };
    })
  };

  const formComponents = Object.values(Filters).reduce(
    (acc, { id, component: Component }) => ({
      ...acc,
      [id]: <Component filters={filters} filterBy={filterBy} />
    }),
    {}
  );

  return (
    <div className={styles.sideBar}>
      <Sidebar
        tabs={['Filters']}
        clearAllFilters={false}
        onClearFilter={onClearFilter}
        onClearAllFilters={onClearAllFilters}
        filtersSections={engineFilters}
        formComponents={formComponents}
        selectedFilters={getSelectedFilters(filters)}
      />
    </div>
  );
}

function getSelectedFilters(filters) {
  const selectedFilters = [];

  Object.keys(filters).map((filter, i) => {
    if (!filters[filter].length) {
      return;
    }

    if (isArray(filters[filter])) {
      if (filter === 'rating') {
        selectedFilters.push({
          id: JSON.stringify({ filter, value: filters[filter] }),
          label: `Rating: ${filters[filter][0]} & Up`
        });
      } else {
        filters[filter].map(value =>
          selectedFilters.push({
            id: JSON.stringify({ filter, value }),
            label: value
          })
        );
      }
    }

    if (isString(filters[filter])) {
      selectedFilters.push({
        id: JSON.stringify({ filter, value: filters[filter] }),
        label: filters[filter]
      });
    }
  });

  return selectedFilters;
}
