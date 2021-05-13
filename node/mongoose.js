const mongoose = require('mongoose');
const mongoPath = 'mongodb://localhost:27017/fbsStats';

mongoose.Promise = global.Promise;
mongoose.connect(mongoPath, {useNewUrlParser: true}).then(() => {
    console.log("Connected to MongoDB successfully")
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB")
    console.log(e)
})

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = { mongoose };