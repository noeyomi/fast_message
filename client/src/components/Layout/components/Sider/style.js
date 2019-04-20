export default theme => ({
  root: {
    padding: '40px 0',
    position: 'relative',
    background: theme.palette.primary.main,
    width: '100%',
  },
  container: {
    color: 'white',
    position: 'relative',
    width: '90%',
    margin: 'auto',
    transition: 'all 250ms',
    '&:hover': {
      transition: 'all 250ms',
      background: 'rgba(0.1, 0.1, 0.1, 0.1)',
    }
  },
  title: {
    color: 'white',
    fontSize: '1.4em',
  },
  divider: {
    width: '40%',
    margin: 'auto',
    marginBottom: '15px',
  },
  link: {
    width: '100%',
    color: 'white',
  },
  search: {
    width: 'calc(100% - 30px)',
    margin: 'auto',
  },
});