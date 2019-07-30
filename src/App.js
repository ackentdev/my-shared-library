import React from 'react';
import './App.css';
import {Route, Switch, NavLink} from 'react-router-dom';
import Login from "./components/Login/Login";
import Library from "./components/Library/Library";
import Profile from "./components/Profile/Profile";
import Search from "./components/Search/Search";

function App() {
  return (
    <div className="App">
      <header>
        <img alt='header-logo' className='header-logo' src={process.env.PUBLIC_URL + '/music-library.png'}></img>
        <div className='navigation'>
          <NavLink exact to='/' className='navigation-link' activeClassName='active'>Home</NavLink>
          <NavLink exact to='/profile' className='navigation-link' activeClassName='active'>Profile</NavLink>
          <NavLink exact to='/library' className='navigation-link' activeClassName='active'>Library</NavLink>
          <NavLink exact to='/library/search' className='navigation-link' activeClassName='active'>Search</NavLink>
        </div>
      </header>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/library" component={Library}/>
        <Route exact path="/library/search" component={Search}/>
      </Switch>
      
    </div>
  );
}


export default App;
