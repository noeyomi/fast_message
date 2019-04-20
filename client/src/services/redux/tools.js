const mapStateToProps = state => ({
  messages: state.msgReducer.messages,
  writings: state.msgReducer.writings,
  users: state.msgReducer.users,
  user: state.userReducer,
});

const mapDispatchToProps = dispatch => ({
  updateMessages: messages => {
    dispatch({ type: 'UPDATE_MESSAGES', messages });
  },
  addMessage: message => {
    dispatch({ type: 'ADD_MESSAGE', message });
  },
  updateUsers: users => {
    dispatch({ type: 'UPDATE_USERS', users });
  },
  addUser: user => {
    dispatch({ type: 'ADD_USER', user });
  },
  rmUser: user => {
    dispatch({ type: 'RM_USER', user });
  },
  addUserWriting: name => {
    dispatch({ type: 'ADD_WRITING', name });
  },
  rmUserWriting: name => {
    dispatch({ type: 'RM_WRITING', name });
  },
  updateName: name => {
    dispatch({ type: 'UPDATE_NAME', name });
  },
});

export { mapDispatchToProps, mapStateToProps };