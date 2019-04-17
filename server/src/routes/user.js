const routes = require('express').Router();
const db = require('../db/models');

module.exports = function (io) {

  io.on('connection', client => {
    client.on('get_messages', async socket => {
      const msgs = await db.getMessages();
      client.emit('msgs', msgs);
    });

    client.on('post_msg', async data => {
      const newmsg = await db.addMessage(data.user, data.message);
      io.emit('msg', newmsg);
    });
  });


  return routes;
};
