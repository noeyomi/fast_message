const routes = require('express').Router();
const db = require('../db/models');

const users = [];
const writings = {

};

module.exports = function (io) {

  io.on('connection', client => {
    client.on('imwriting', name => {
      if (!(name in writings)) {
        io.emit('writing', name);
        writings[name] = setTimeout(() => {
          io.emit('rm_writing', name);
          delete writings[name];
        }, 2000);
      } else {
        clearTimeout(writings[name]);
        writings[name] = setTimeout(() => {
          io.emit('rm_writing', name);
          delete writings[name];
        }, 2000);
      }
    });

    client.on('disconnect', () => {
      const name = users.splice(users.findIndex(e => e.id === client.id), 1);
      io.emit('rm_user', name.name);
    });

    client.on('name', name => {
      users.push({ id: client.id, name })
      io.emit('user', name);
    });

    client.on('get_messages', async socket => {
      const msgs = await db.getMessages();
      client.emit('msgs', msgs.reverse());
    });

    client.on('get_users', async socket => {
      client.emit('users', users.map(e => e.name));
    });

    client.on('post_msg', async data => { // TODO Joi
      const newmsg = await db.addMessage(data.user, data.message);
      io.emit('msg', newmsg);
    });
  });


  return routes;
};
