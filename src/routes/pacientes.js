// Endpoints for external data
const { Router } = require('express');
const router = new Router();

const federadorServices = require('./federador_services');
const documentServices = require('./document_services');

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

    console.log('====================================');
    console.log({ MyPatientData, dominio }, response);
    console.log('====================================');
    if (response != undefined) {

        if (response['entry'] != undefined) {
            if (response['entry'].length == 1) {
                let doc = response.entry[0];
                let url = doc.resource.content[0].attachment.url;
                let IPSCompleto = await documentServices.ContenidoDocumento(url)
                composition = IPSCompleto.entry[0].resource;
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
            


        } else if(response['total']== 0){
            res.json([{total:'No hay documentos'}])
        }
    }

});

module.exports = router;