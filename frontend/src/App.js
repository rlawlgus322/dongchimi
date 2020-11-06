import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Pages from './pages/Pages';

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
