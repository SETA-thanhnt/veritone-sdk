import React from 'react';
import { func, objectOf, any } from 'prop-types';
import { capitalize } from 'lodash';
import Radio from 'material-ui/Radio';

import styles from '../styles.scss';

class DeploymentModelFilter extends React.Component {
  static props = {
    filters: objectOf(any).isRequired,
    filterBy: func.isRequired
  };

  handleChange = event => {
    this.props.filterBy({ type: 'deploymentModel', value: event.target.value });
  };

  render() {
    const deploymentModels = {
      FullyNetworkIsolated: 'Network Isolated',
      MostlyNetworkIsolated: 'External Access',
      NonNetworkIsolated: 'External Processing',
      HumanReview: 'Human Review'
    };

    return (
      <div className={styles.filterContainer}>
        {Object.keys(deploymentModels).map(deploymentModel => (
          <div className={styles.inlineFilter} key={deploymentModel}>
            <Radio
              classes={{ default: styles.radio }}
              checked={this.props.filters.deploymentModel === deploymentModel}
              onChange={this.handleChange}
              value={deploymentModel}
              aria-label={deploymentModel}
            />
            {deploymentModels[deploymentModel]}
          </div>
        ))}
      </div>
    );
  }
}

export default {
  label: 'Deployment Model',
  id: 'deploymentModel',
  component: DeploymentModelFilter
};
