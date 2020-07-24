const mongoose = require('mongoose');
const schema = require('./locations');

console.log(`NODE_ENV=${process.env.NODE_ENV}`);
let dbURI = 'mongodb://localhost/loc8r';
if (process.env.NODE_ENV === 'production') { 
  dbURI = process.env.MONGODB_URI;
}

//Note to self
//I wanted to restrict my Mongodb Atlas cluster to a whitelist IP list but
//with heroku free-tier that requires using a socks proxy but 
//mongoose/mongo does not currently support that type of connection but
//there IS a ticket filed (see https://jira.mongodb.org/browse/CSHARP-734)
//but sadly no real progress is has been made...
const conn = mongoose.createConnection(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

conn.on('connected', () => {
  console.log(`[${dbURI}] Mongoose connected`);
  
  const Location = conn.model('Location', schema.location, 'locations');

  Location.find(function (err, res) {
    if (err) return console.error(err);
    console.log('found these locations:');
    console.log(res);
  });
});

conn.on('error', err => {
  console.log(`[${dbURI}] Mongoose connection error:`, err);
});

conn.on('disconnected', () => {
  console.log(`[${dbURI}] Mongoose disconnected`);
});

const shutdown = (msg, callback) => { 
  conn.close( () => {
    console.log(`[${dbURI}] Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once('SIGUSR2', () => {
  shutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', () => {
  shutdown('app termination', () => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  shutdown('app shutdown', () => { 
    process.exit(0);
  });
});