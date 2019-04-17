import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core';
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
  async componentDidMount() {
    try {
      api.on('msgs', msgs => console.log(msgs) || this.props.updateMessages(msgs));
      api.on('msg', msg => console.log(msg) || this.props.addMessage(msg));
      api.emit('get_messages');
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
