const app = require('./src/app');
const db = require('./src/db');

const Port = process.env.PORT || 3000;

db.then(() => {
  app.listen(Port, () => {
    console.log(`Server running. Use our API on port: ${Port}`);
  });
}).catch(err => {
  console.log(`Server not running. Error message: ${err.message}`);
});
