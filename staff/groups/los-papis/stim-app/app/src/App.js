import React,{Component} from 'react';
import { Route,Redirect,Switch } from 'react-router'
import UserProfile from './components/UserProfile'
import Home from './components/Home'
import Landing from './components/Landing'
import NavBar from './components/NavBar'
import Error404 from './components/Error404'

class App extends Component {
  state = {
    isLoggedIn : false
  }

  render() {
    return(
      <div>
        <NavBar isLoggedIn={this.state.isLoggedIn}  />


        <Switch>
        <Route exact path="/" render={() => this.state.isLoggedIn ? <Home/> : <Landing/>} />
        <Route  path="/home" render={() => this.state.isLoggedIn ? <Home/> : <Redirect to="/" />} />
        <Route  path="/profile" render={() => this.state.isLoggedIn ? <UserProfile/> : <Redirect to="/" /> } />
        <Route  path="/register" render={() => this.state.isLoggedIn ? <Redirect to="/home" /> :  <Redirect to="/"/> }/>
        <Route  path="/login" render={() => this.state.isLoggedIn ? <Redirect to="/home" /> : <Redirect to ="/"/>} />
        <Route  component = {Error404} />
        </Switch>



      </div>
      
    )
  }

}

export default App;
