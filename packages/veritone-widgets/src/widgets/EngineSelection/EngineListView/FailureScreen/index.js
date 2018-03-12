import React from 'react';
import { string, func } from 'prop-types';
import ErrorOutlineIcon from 'material-ui-icons/ErrorOutline';
import Button from 'material-ui/Button';
import RefreshIcon from 'material-ui-icons/Refresh';
import { blue } from 'material-ui/colors';

import styles from './styles.scss';

const FailureScreen = ({
  message = 'Oops! Something went wrong.',
  onRetry
}) => {
  return (
    <div className={styles.container}>
      <ErrorOutlineIcon
        style={{ height: 105, width: 105, color: 'rgba(0,0,0,.26)' }}
      />
      <h2 className={styles.headline}>{message}</h2>
      <Button raised style={{ backgroundColor: 'white' }} onClick={onRetry}>
        <RefreshIcon color={blue[500]} style={{ marginRight: '10px' }} />
        Retry
      </Button>
    </div>
  );
};

FailureScreen.propTypes = {
  message: string,
  onRetry: func.isRequired
};

export default FailureScreen;
