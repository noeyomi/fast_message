import socket from 'socket.io-client';

const api = socket('http://localhost:8081', {query: {name: 'yaya'}});

export default api;