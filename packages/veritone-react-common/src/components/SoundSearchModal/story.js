import React from 'react';
import { storiesOf } from '@storybook/react';
import { SoundSearchModal } from './';
import { SoundSearchForm } from './';

import { boolean, object } from '@storybook/addon-knobs';

storiesOf('SoundSearchModal', module).add('withOpenDialogAndDefaultValue', () => {
  const logFilter = value => console.log('filter value', value);
  const cancel = () => console.log("cancel pressed");
  return (
    <SoundSearchModal
      open={ boolean("Open", true) }
      modalState={ object( "Search condition state", { queryResults: [] } ) }
      cancel={ cancel }
      applyFilter={ logFilter }
    />
  );
}).add( 'withoutDialog', () => {
  return (
    <SoundSearchForm
      modalState={ object( "Search condition state", { queryResults: [] } ) }
    />
  );
});