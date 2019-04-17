const mapStateToProps = state => ({
  messages: state.msgReducer.messages,
});

const mapDispatchToProps = dispatch => ({
  updateMessages: messages => {
    dispatch({ type: 'UPDATE_MESSAGES', messages });
  },
  addMessage: message => {
    dispatch({ type: 'ADD_MESSAGE', message });
  },
});

export { mapDispatchToProps, mapStateToProps };