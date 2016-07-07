//using  Immediately Invoked Function Expression (IIFE)

(function(){
    var mongoose = require('mongoose')
    mongoose.set('debug', true);

    mongoose.connect('mongodb://localhost/bittiles', function () {
        console.log('mongodb connected')
    })
    module.exports = mongoose
})()
