import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as fasHeart, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import Main from './pages/Main';
import Pages from './pages/Pages';

library.add(faEye, faHeart, fasHeart, faCommentDots);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
    }
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/" component={Pages} />
        </Switch>
      </div>
    );
  }
}

export default App;
