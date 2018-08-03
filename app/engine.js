import React, { Component } from 'react';
import * as Pixi from 'pixi.js';

import { PIXI_SETTINGS } from 'constants';
import beginLoad from 'utils/asset-loader';
import viewController from 'controllers/viewController';

export default class DefendTheCaravan extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    app: null,
    stage: null
  }

  componentDidMount() {
    let { app } = this.state;
    app = new Pixi.Application(PIXI_SETTINGS.GAME_WIDTH, PIXI_SETTINGS.GAME_HEIGHT, ...PIXI_SETTINGS.RENDER_OPTIONS);
    document.getElementById(this.props.selector).appendChild(app.view);
    // Pixi.loader
    // .add("app/assets/cart.png")
    // .load(setup);
    beginLoad(Pixi.loader, setup);
    function setup() {
      // let sprite = new Pixi.Sprite(Pixi.loader.resources["app/assets/cart.png"].texture);
      // app.stage.addChild(sprite);

      const stage = viewController(Pixi.loader);
      app.stage.addChild(stage);
      // this.setState({ app });
      console.log(app);
    }
    // 
    
  }

  componentWillUnmount() {
    // this.state.app.stop();
  }

  render() { return (null); }
}

/* TODO : 
- Does this need to be a component?
- Setup game-states in this file (loading, menu, etc)
- Better state management between loading and whatnot
- Pass app into game controller
*/