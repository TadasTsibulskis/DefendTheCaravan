var $GAME = require('./js/main.js');

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './styles.scss';

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('stage'),
  );
};

render(Root);

if (module.hot) module.hot.accept();

