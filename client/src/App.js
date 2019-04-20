import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider, Input } from '@material-ui/core';
import theme from './theme/theme';
import Layout from './components/Layout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import urls from './services/urls';
import Notification from './components/Notification';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './services/redux/tools';
import Popup from './components/Popup';
import api from './services/api';
import Messages from './scenes/Messages';

class App extends Component {

  state = {
    name: '',
  };

  async componentDidMount() {
    try {
      window.popup(<p>Name</p>,
        <Input onChange={e => this.setState({ name: e.target.value })} placeholder={'name'} />,
        () => {
          this.props.updateName(this.state.name);
          api.emit('name', this.state.name);
        });
      api.on('msgs', msgs => console.log(msgs) || this.props.updateMessages(msgs));
      api.on('users', msgs => console.log(msgs) || this.props.updateUsers(msgs));
      api.on('msg', msg => console.log(msg) || this.props.addMessage(msg));
      api.on('user', msg => window.message('info', `${msg} joined !`) || this.props.addUser(msg));
      api.on('rm_user', msg => console.log(msg) || this.props.rmUser(msg));
      api.on('writing', msg => console.log(msg) || this.props.addUserWriting(msg));
      api.on('rm_writing', msg => console.log(msg) || this.props.rmUserWriting(msg));
      api.emit('get_messages');
      api.emit('get_users');
    } catch (e) {
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <Notification />
            <Layout>
              <Popup />
              <Switch>
                <Route exact path={urls.home} component={Messages} />
              </Switch>
            </Layout>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
