const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use('/api', require('./api'));
app.get('/*', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));


app.listen(process.env.PORT || 3000);
