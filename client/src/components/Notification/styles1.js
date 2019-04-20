import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

export default theme => ({
  container: {
    marginTop: '25px',
    borderRadius: '100px',
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: 'grey',
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});