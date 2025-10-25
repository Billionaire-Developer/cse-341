const express = require('express');
const app = express();


app.get('/', require("./routes"));


const port = process.env.PORT || 3000;

app.listen(port, () =>(console.log(`App is runing on port ${port}`)));