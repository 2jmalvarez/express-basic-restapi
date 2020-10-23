const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();



const { initialize, loggers, constants } = require('@asymmetrik/node-fhir-server-core');
const { VERSIONS } = constants;
let config = {
    profiles: {
        documentreference: {
            service: './src/documentreference.service.js',
            versions: [
                VERSIONS['4_0_0']
            ]
        },
        bundle: {
            service: './src/bundle.service.js',
            versions: [
                VERSIONS['4_0_0']
            ]
        },

    }
};

// const app = express(config);



// settings
app.set('port', process.env.PORT || 4600);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
// app.use(express.());
app.use(express.json());
app.use(cors())

// routes
app.use(require('./routes'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/users', require('./routes/users'));
app.use('/api/pacientes', require('./routes/pacientes'));






let server = initialize(config,app);
let logger = loggers.get('default');


// starting the server
server.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
    logger.info('Starting the FHIR Server at localhost:'+app.get('port'));
});


// D:\Proyectos js\1-Conectaton\proyecto\back\express-basic-restapi\src\routes\documentreference.service.js
