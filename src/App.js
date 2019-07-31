import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Login from "./components/Login/Login";
import Library from "./components/Library/Library";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Search from "./components/Search/Search";
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/library" component={Library}/>
        <Route exact path="/library/search" component={Search}/>
      </Switch>
      
    </div>
  );
}


export default App;
