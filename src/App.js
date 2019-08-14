import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Login from "./components/Login/Login";
import Library from "./components/Library/Library";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Search from "./components/Library/Search/Search";
import Header from './components/Header/Header';
import AddSong from './components/AddSong/AddSong';
import AddConcert from './components/AddConcert/AddConcert';
import PrivateRoute from './components/PrivateRoute';
// import axios from 'axios';

class App extends React.Component {
 
  render(){
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/register" component={Register}/>
        <PrivateRoute path='/profile' component={Profile}/>
        {/* <Route exact path="/profile" component={Profile}/> */}
        <PrivateRoute path="/library/add_song" component={AddSong}/>
        <PrivateRoute path="/library/search" component={Search}/>
        <PrivateRoute path="/library" component={Library}/>
        <PrivateRoute path="/add-concert" component={AddConcert}/>
        <Route exact path="/" component={Login}/>
      </Switch>
      
    </div>
  )};
}


export default App;
