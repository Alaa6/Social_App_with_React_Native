//  to loads the data folder contents
// collection variables, students and colleges.


const { DataStore } = require('notarealdb'); // install notarealdb
const store = new DataStore('../Data');

module.exports = {
students : store.collection('users'),
colleges : store.collection('colleges')
};