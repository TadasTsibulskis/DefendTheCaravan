import React from 'react';
import ReactDOM from 'react-dom';
import DefendTheCaravan from './engine';
import './styles.scss';

const render = (Component) => {
  ReactDOM.render(
    <Component selector={'stage'} />,
    document.getElementById('stage')
  );
};

render(DefendTheCaravan);

if (module.hot) module.hot.accept();

