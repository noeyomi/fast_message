import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';
import { Paper } from '@material-ui/core';
import cl from 'classnames';

class Message extends React.Component {
  render() {
    const { classes, lastMessage, user, message, className } = this.props;

    const sameName = lastMessage && lastMessage.user === message.user;
    const mine = user.name === message.user;

    return (
      <div className={cl(classes.root, className, mine ? classes.right : classes.left)}>
        {
          !sameName &&
          <p className={classes.username}>{message.user}</p>
        }
        <div className={cl('oncreate', classes.messageContainer, mine ? classes.mine : classes.notMine, mine ? 'oncreateright' : '')}>
          {message.message}
        </div>
      </div>
    );
  }
}

export default withStyles(style)(Message);
