const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const userRoutes = require('./routes/users');
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Header',
        'Origin, x-Requested-With, Content-Type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


app.get('/', require("./routes"));
app.use('/', require('./routes/index'));

//app.get('/', require("./routes/users"));
app.use('/users', userRoutes);  // ✅ this line is the key
const port = process.env.PORT || 3000;

mongodb.initDb((err) => {
    if(err){
        console.log(err)
    }
    else{
        app.listen(port, () =>(console.log(`Database is listening and App is running on port ${port}`)));
    }
})

