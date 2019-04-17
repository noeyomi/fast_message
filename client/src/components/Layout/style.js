export default theme => ({
  root: {
    color: 'black',
    background: '#F2F2F2',
  },
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
  },
  sider: {
    display: 'flex',
    flex: 2,
    background: theme.palette.primary.main,
  },
  content: {
    display: 'flex',
    flex: 8,
    width: '100%',
    position: 'relative',
  },
});