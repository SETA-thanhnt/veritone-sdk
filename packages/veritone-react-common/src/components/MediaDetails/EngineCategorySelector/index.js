import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import Icon from 'material-ui/Icon';
import { func, string, arrayOf, any} from 'prop-types';
import styles from './styles.scss';

class EngineCategorySelector extends Component {
  static propTypes = {
    engineCategories: arrayOf(any),
    selectedEngineCategoryId: string.isRequired,
    onSelectEngineCategory: func,
  };

  handleTabChange = (event, value) => {
    this.props.onSelectEngineCategory(value);
  };

  render() {
    console.log(this.props.selectedEngineCategoryId);
    return (
        this.props.engineCategories && this.props.engineCategories.length && this.props.selectedEngineCategoryId && (
          <div className={styles.engineCategoryTabsContainer}>
            <Tabs
              value={this.props.selectedEngineCategoryId}
              indicatorColor='primary'
              onChange={this.handleTabChange}
              classes={{
                flexContainer: styles.engineCategoryTabs
              }}>
              {
                this.props.engineCategories.map(function(engineCategory) {
                  return (
                    <Tab value={engineCategory.id}
                         key={engineCategory.id}
                         icon={<Icon hidden={false} className={styles.categoryIcon}>{engineCategory.iconClass}</Icon>}
                         classes={{
                           root: styles.engineCategoryTab
                         }}>
                    </Tab>
                  );
                })
              }
            </Tabs>
          </div>
        ) || null
    );
  }
}

export default EngineCategorySelector;
