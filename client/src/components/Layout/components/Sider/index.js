import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';
import { List, ListItem, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../../services/redux/tools';

const modules = [
];

class Sider extends React.Component {
  render() {
    const { classes, users } = this.props;

    console.log(users);
    if (!users) return null;
    return (
      <Paper square className={classes.root} elevation={8}>
        <p className={classes.title}>Users</p>
        <hr className={classes.divider} />
        <List>
          {
            users.map((e, k) => {
              return (
                <ListItem key={k} className={classes.container}>
                  {e}
                </ListItem>
              );
            })
          }
        </List>
      </Paper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Sider));