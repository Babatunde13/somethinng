const mongoose= require('mongoose')
const {userSchema} = require('./schema');

mongoose.connect(
    'mongodb://localhost:27017/something', 
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }
);

exports.db = mongoose.connection;
exports.User = mongoose.model('User', userSchema);
