import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';
import { Link } from 'react-router-dom';
import { List, ListItem, Paper, Input } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../../services/redux/tools';
import urls from '../../../../services/urls';
import SearchBar from './components/SearchBar';

const modules = [
];

class Sider extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper square className={classes.root}>
        <SearchBar className={classes.search} />
        <List>
          {
            modules.map((e, k) => {
                return (
                  <Link key={k} to={e.link} className={classes.link}>
                    <ListItem className={classes.container}>
                      {e.name}
                    </ListItem>
                  </Link>
                );
            })
          }
        </List>
      </Paper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Sider));
