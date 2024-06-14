import React from 'react';
import Navigators from './sources/navigators/indexNavigators';
import {Provider} from 'react-redux';
import { Store } from './sources/Store';

export default () => (
  <Provider store={Store}>
    <Navigators />
  </Provider>
);