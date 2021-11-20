const bcryptjs = require('bcryptjs');

const users = [
    {
        name: 'Admin',
        email: '18bce230@nirmauni.ac.in',
        password: bcryptjs.hashSync('admin',32),
        isAdmin: true
    }, 
    {
        name: 'Moderator',
        email: '18bce236@nirmauni.ac.in',
        password: bcryptjs.hashSync('mod',32),
        isAdmin: false
    }
];

module.exports = users;