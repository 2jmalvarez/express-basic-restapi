const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// settings
app.set('port', process.env.PORT || 4500);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

// routes
app.use(require('./routes'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/users', require('./routes/users'));
app.use('/api/pacientes', require('./routes/pacientes'));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
