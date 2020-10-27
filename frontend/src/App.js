import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Pages from './pages/Pages';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/" component={Pages} />
      </Switch>
    </div>
  );
}

export default App;
