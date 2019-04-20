import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../services/redux/tools';
import { Input, Button, IconButton } from '@material-ui/core';
import api from '../../services/api';
import Message from './Message';

import Send from '@material-ui/icons/SendOutlined';

class Messages extends React.Component {
  state = {
    message: '',
  };
  messagesRef = React.createRef();

  onType = e => {
    this.setState({ message: e.target.value });
    api.emit('imwriting', this.props.user.name);
  }

  onSend = e => {
    e.preventDefault();
    const { message } = this.state;
    const { user } = this.props;

    if (message.length > 0) {
      api.emit('post_msg', { message, user: user.name });
    }
    this.setState({ message: '' });
  }

  componentDidUpdate() {
    const { current } = this.messagesRef;

    if (!current) return;
    current.scrollTop = current.scrollHeight;
  }

  render() {
    const { classes } = this.props;
    const { messages, user, writings } = this.props;

    console.log(this.props.messages);
    console.log(writings);

    if (!messages) return null;
    return (
      <div className={classes.root}>
        <div className={classes.messages} ref={this.messagesRef}>
          {
            messages.map((e, k, a) =>
              <Message className={classes.message} key={e._id} lastMessage={a[k - 1]} user={user} message={e} />
            )
          }
          {
            Boolean(writings.length) && (
              <>
                { writings.map((e, k, a) => <span key={k}>{e} {k !== a.length - 1 && ', '}</span>) }
                <span>{writings.length === 1 ? 'is' : 'are'} typing</span>
              </>
            )
          }
        </div>
        <form onSubmit={this.onSend}>
          <div className={classes.sender}>
            <Input disableUnderline className={classes.input} fullWidth placeholder={'Your message...'} value={this.state.message} onChange={this.onType} />
            <IconButton className={classes.senderButton} variant={'contained'} color={'primary'} type={'submit'}><Send /></IconButton>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Messages));
