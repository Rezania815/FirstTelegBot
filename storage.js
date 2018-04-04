'use strict';

const
config = require('./config'),
userList = require('./user-list.json'),
{writeFile} = require('fs'),

updateUser = (user) => {
    userList[user.id] = {
        ...userList[user.id],
        ...user,
    }

    save();
    // add/update user in userList
    // save
},

getUser = (userId) => {
    return userList[userId]
},

save = () => {
    const fileContent = JSON.stringify(userList, null, 4);
    writeFile('./user-list.json', fileContent, (err) => {
        if (err) console.log('Storage save: %o', err);
    });
    // save user list to './user-list.json' file
    // solve performance issue with config.saveDebounce
}

;

module.exports = {
    updateUser,
    getUser,
    save,
};