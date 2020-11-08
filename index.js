const contacts = require('./contacts');
const argv = require('yargs').argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contacts.listContacts();
      break;

    case 'get':
      contacts.getContactById(id);
      break;

    case 'add':
      contacts.addContact(name, email, phone);
      break;

    case 'remove':
      contacts.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
// https://prnt.sc/vfqyxt - node index.js --action="list"
// https://prnt.sc/vfqzz9 - node index.js --action="get" --id=5
// https://prnt.sc/vfr0uh - node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22"
// https://prnt.sc/vfr1on - node index.js --action="remove" --id=3
