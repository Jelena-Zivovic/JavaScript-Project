import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../Header';
import Play from '../Play';
import Login from '../Login';
import Register from '../Register';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/play" component= {Play} />
          <Route exact path="/login" component= {Login} />
          <Route exact path="/register" component= {Register} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
