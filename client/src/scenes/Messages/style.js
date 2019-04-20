export default theme => ({
  root: {
    width: '100%',
    margin: 'auto',
    padding: '5px 25px',
  },
  messages: {
    height: '90vh',
    position: 'relative',
    overflowY: 'scroll',
  },
  message: {
    margin: '10px 0',
  },
  sender: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'row',
  },
  senderInput: {
    display: 'flex',
    flex: 10,
  },
  senderButton: {
    display: 'flex',
    flex: 2,
    color: 'grey',
  },
  input: {
    background: 'white',
    borderRadius: '6px',
    padding: '0px 10px',
  }
});