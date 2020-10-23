// Endpoints for external data
const { Router } = require('express');
const router = new Router();

const federadorServices = require('./federador_services');
const documentServices = require('./document_services');
const conf = require('./client_config');
const uuidv4 = require('uuid').v4;
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    res.json(data);
});
router.post('/match', async (req, res) => {


    // const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const response = await federadorServices.MatchPaciente(req.body)

    console.log('====================================');
    console.log(req.body, response);
    console.log('====================================');
    if (response != undefined) {

        // const data = await response.json();
        res.json(response);
    }
});
router.post('/federar', async (req, res) => {


    // const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const response = await federadorServices.FederarPaciente(req.body)

    console.log('====================================');
    console.log(req.body, response);
    console.log('====================================');
    if (response != undefined) {

        // const data = await response.json();
        res.json(response);
    }
});


router.post('/localizar', async (req, res) => {


    // const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const response = await federadorServices.PatientLocation(req.body)

    console.log('====================================');
    console.log(req.body, response);
    console.log('====================================');
    if (response != undefined) {

        // const data = await response.json();
        res.json(response);
    }
});

router.post('/ListaDocumentos', async (req, res) => {

    let { MyPatientData, dominio } = req.body
    // const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const response = await documentServices.ListaDocumentosDisponibles(MyPatientData, dominio)

    console.log('=============DOCUMENTO=======================');
    console.log({ MyPatientData, dominio }, response);

    console.log('------------------IPS--------------------------');
    console.log(JSON.stringify(response, null, 4));
    console.log('=============DOCUMENTO=====================');
    if (response != undefined) {

        if (response['entry'] != undefined) {
            if (response['entry'].length == 1) {
                let doc = response.entry[0];
                let url = doc.resource.content[0].attachment.url; ///Bundle/f5038d6a-32fb-4463-a5f1-a575e54b725f
                let IPSCompleto = await documentServices.ContenidoDocumento(url)
                composition = IPSCompleto != undefined ? IPSCompleto['entry'][0].resource : res.json([{ total: 'No hay documentos' }]);
                console.log('================IPSCompleto====================');
                console.log(JSON.stringify(IPSCompleto, null, 4));
                console.log('==============IPSCompleto======================');
                AllSec = [];
                sections = composition.section;
                sections.forEach(section => {
                    AllSec.push(section);
                });
                console.log(JSON.stringify(AllSec));
                res.json(AllSec);
                // res.render(
                //     'resumen-ver.ejs',
                //     {
                //         title: 'Ver Documento IPS',
                //         secciones: AllSec,
                //         message: 'Visualizar IPS'
                //     }
            }



        } else if (response['total'] == 0) {
            res.json([{ total: 'No hay documentos' }])
        }
    }

});


const ipsServices = require('../ips');
router.post('/generarIps', async (req, res) => {

    let { id, nombre, apellido, apellidoPaterno, fechaNacimiento, genero, idFederador, dni } = req.body
    let ips = ipsServices.getIPS(
        uuidv4(),
        conf.authConfig().iss +"|"+( 100000000 + id),
        {
            family: apellidoPaterno,
            given: federadorServices.GivenSep(nombre),
            gender: federadorServices.generoIngles(genero),
            birthDate: fechaNacimiento
        })

    console.log('====================================');
    console.log("*******************************ips", ips, "*******************************");
    console.log("req.body", req.body, "*******************************");
    console.log('====================================');
    res.json(ips)


})

module.exports = router;