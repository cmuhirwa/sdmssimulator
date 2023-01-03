const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const apis = require('./routes/apis');
const app = express()
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended : false }));

// view engine
app.set('view engine', 'ejs');

const port = 3000
app.get('/', (req, res)=>{
    res.render('index');
})

app.listen(port, ()=>{
    console.log(`yes on port ${port}`)
})

app.use(apis);