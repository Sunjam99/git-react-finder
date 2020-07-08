import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Users from './components/Users/Users';
import User from './components/Users/User';
import Search from './components/Users/Search';
import Alert from './components/Users/Alert';
import about from './components/Pages/about';
import axios from 'axios';
import './App.css';


class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

 
  searchUsers = async text => {
    this.setState({ loading:true })
    const res = await axios.get(`https://api.github.com/users/users/${text}&client_id=$
    {process.env.REACT_APP_GITHUB_TEST_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_TEST_SECRET}`);
   
    this.setState({users: res.data.items, loading: false });
  };

  getUser = async username => { 
    this.setState({ loading:true });


    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_TEST_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_TEST_SECRET}`
    );
    
    this.setState({users: res.data, loading: false });
  };

  getUserRepos = async username => { 
    this.setState({ loading:true });


    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_TEST_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_TEST_SECRET}`
    );
    
    this.setState({users: res.data, loading: false });
  };



  clearUsers = () => this.setState({ user: [] , loading:false });

  setAlert = (msg, type) => {
    this.setAlert({ alert: {msg, type} }); 

    setTimeout(() => this.setState({ alert:null}),  3000)
  }

  render() { 
    const { users, user,repos, loading } = this.state;

    return (
      <Router>
       <div className='App'>
        <Navbar title='Github Finder' icon='fab fa-github'/>
        <div className="container">
          <Alert alert={this.state.alert} />
          <Switch>
            <Route 
            exact 
            path='/' 
            render={props =>(
              <Fragment>
                <Search SearchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers}
                  showClear={users.length > 0 ? true : false}
                  setAlert={this.setAlert}
                  />
                <Users loading={loading} users={users} />
              </Fragment>
            )} />
            <Route exact path='/about' component={about} />
            <Route exact path='/user/:login' render={props => (
              <User 
              {...props} 
              getUser={this.getUser} 
              getUserRepos={this.getUserRepos}
              user={user} 
              repos={repos}
              loading={loading} /> 
            )} />
          </Switch> 
        </div>
       </div>
      </Router>
    );
  }
}

export default App;
