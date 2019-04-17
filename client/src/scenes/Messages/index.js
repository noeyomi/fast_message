import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../services/redux/tools';
import { Input, Button } from '@material-ui/core';
import api from '../../services/api';

class Messages extends React.Component {
  state = {
    message: '',
  };

  onType = e => {
    this.setState({ message: e.target.value });
  }

  onSend = e => {
    e.preventDefault();
    const { message } = this.state;

    if (message.length > 0) {
      api.emit('post_msg', { message, user: 'user' });
    }
  }

  render() {
    const { classes } = this.props;
    const { messages } = this.props;

    console.log(this.props.messages);

    if (!messages) return null;
    return (
      <div className={classes.root}>
      {
        messages.map(e => <p key={e._id}>{e.message}</p>)
      }
        <form onSubmit={this.onSend}>
          <Input placeholder={'Your message...'} value={this.state.message} onChange={this.onType} />
          <Button type={'submit'}>Send</Button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Messages));
