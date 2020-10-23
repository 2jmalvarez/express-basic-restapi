//Acceso a Servicios de obtencion de Documentos del Bus
//
//ListaDocumentosDisponibles: obtiene lista de documentos
//                            dado un paciente y dominio
//
//ContenidoDocumento: obtiene el contenido de un IPS desde el bus
//                            a partir de la referencia 
//                          
const auth = require('./client_auth');
const conf = require('./client_config');
const axios = require('axios');

async function ListaDocumentosDisponibles(MyPatientData, dominio) {
    try {
        token = await auth.GetTokenFromAuth();
        var cnf = conf.fhirConfIPS();
        var urlFHIREndpoint = cnf.urlServer;
        var ResourceClass = 'DocumentReference';
        var cnd = conf.authConfig();
        var system = cnd.iss;
        var value = 100000000 + MyPatientData.Id;
        var MyIdentifier = system + "|" + value;
        var fullURL = urlFHIREndpoint + "/" + ResourceClass + "?subject:identifier=" + MyIdentifier + "&" + "custodian=" + dominio + "&type=http://loinc.org|60591-5";
        console.log(fullURL);
        console.log("hago el request");
        let response = await axios.get(fullURL, { headers: { 'Authorization': 'Bearer jwt' } })
        console.log("hice el request");
        var data = response.data;
        console.log('datos');
        console.log(JSON.stringify(data,null,4));
        return data;
    }

    catch
    {
        err=> console.log(err);
    }

}


async function ContenidoDocumento(url) {

    try {
        token = await auth.GetTokenFromAuth();
        var cnf = conf.fhirConfIPS();
        var urlFHIREndpoint = cnf.urlServer;
        var cnd = conf.authConfig();
        var system = cnd.iss;
        var fullURL = urlFHIREndpoint + url;
        console.log(fullURL);
        console.log("hago el request");
        let response = await axios.get(fullURL, { headers: { 'Authorization': 'Bearer jwt' } })
        console.log("hice el request");
        var data = response.data;
        console.log('datos');
        console.log(JSON.stringify(data));
        return data;
    }

    catch
    {
        err=> console.log(err);
    }

}


const documento = {
    "resourceType": "Bundle",
    "id": "Resumen-HC-IPS-SaludDigital.ar",
    "meta": {
        "lastUpdated": "2018-01-26T14:30:00-03:00"
    },
    "language": "es-AR",
    "entry":  [
        {
            "fullUrl": "http://hapi.fhir.org/baseR4/Composition/IPS-examples-Composition-01",
            "resource": {
                "id": "IPS-Composition-01",
                "subject": {
                    "reference": "http://hapi.fhir.org/baseR4/Patient/IPS-examples-Patient-01"
                },
                "section":  [
                    {
                        "code": {
                            "coding":  [
                                {
                                    "system": "http://loinc.org",
                                    "display": "Problem list",
                                    "code": "11450-4"
                                }
                            ]
                        },
                        "entry":  [
                            {
                                "reference": "http://hapi.fhir.org/baseR4/Condition/IPS-examples-Condition-01"
                            }
                        ],
                        "title": "Problemas",
                        "text": {
                            "status": "generated",
                            "div": '<div xmlns="http://www.w3.org/1999/xhtml">asma (trastorno)</div>'
                        }
                    },
                    {
                        "code": {
                            "coding":  [
                                {
                                    "system": "http://loinc.org",
                                    "display": "Medication use",
                                    "code": "10160-0"
                                }
                            ]
                        },
                        "entry":  [
                            {
                                "reference": "http://hapi.fhir.org/baseR4/MedicationStatement/IPS-examples-MedicationStatement-01"
                            }
                        ],
                        "title": "Medicamentos",
                        "text": {
                            "status": "additional",
                            "div": '<div xmlns="http://www.w3.org/1999/xhtml">\n    <table>\n                                <thead>\n                                    <tr>\n                                        <th>Medicamento</th>\n                                        <th>Strength</th>\n                                        <th>Forma</th>\n                                        <th>Dosis</th>\n                                        <th>Comentario</th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    <tr>\n                                        <td>salbutamol (sustancia)</td>\n                                        <td>200 mcg</td>\n                                        <td>disparo</td>\n                                        <td>uno por día</td>\n                                        <td>tratamiento de asma</td>\n                                    </tr>\n                                                          </tbody>\n                            </table>\n                        </div>'
                        }
                    },
                    {
                        "code": {
                            "coding":  [
                                {
                                    "system": "http://loinc.org",
                                    "display": "Allergies and/or adverse reactions",
                                    "code": "48765-2"
                                }
                            ]
                        },
                        "entry":  [
                            {
                                "reference": "http://hapi.fhir.org/baseR4/AllergyIntolerance/IPS-examples-AllergyIntolerance-01"
                            }
                        ],
                        "title": "Alergias",
                        "text": {
                            "status": "generated",
                            "div": '<div xmlns="http://www.w3.org/1999/xhtml">Alergia a penicilina (trastorno), criticidad alta, activo</div>'
                        }
                    },
                    {
                        "title": "Vacunas",
                        "text": {
                            "status": "generated",
                            "div": '<div xmlns="http://www.w3.org/1999/xhtml">producto que contiene solamente antígeno de virus de la influenza (producto medicinal)</div>'
                        },
                        "code": {
                            "coding":  [
                                {
                                    "system": "http://loinc.org",
                                    "display": "Immunization record",
                                    "code": "60484-3"
                                }
                            ]
                        },
                        "entry":  [
                            {
                                "reference": "http://hapi.fhir.org/baseR4/Immunization/IPS-examples-Immunization-01"
                            }
                        ]
                    }
                ],
                "resourceType": "Composition",
                "author":  [
                    {
                        "reference": "http://hapi.fhir.org/baseR4/Device/IPS-examples-Device-01"
                    }
                ],
                "confidentiality": "N",
                "type": {
                    "coding":  [
                        {
                            "system": "http://loinc.org",
                            "display": "Patient Summary",
                            "code": "60591-5"
                        }
                    ]
                },
                "title": "Resumen del paciente al 26 de Enero de 2018, 14:30hs",
                "identifier": {
                    "system": "http://hospitalPintos.org.ar/Composition",
                    "value": "10501"
                },
                "date": "2018-01-26T14:30:00-03:00",
                "meta": {
                    "profile":  [
                        "http://hl7.org/fhir/uv/ips/StructureDefinition/composition-uv-ips"
                    ]
                },
                "text": {
                    "status": "generated",
                    "div": `<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: IPS-examples-Composition-01</p><p><b>meta</b>: </p><p><b>text</b>: </p><p><b>identifier</b>: 10501</p><p><b>status</b>: FINAL</p><p><b>type</b>: Patient Summary <span style="background: LightGoldenRodYellow">(Details : {LOINC code '60591-5' = 'Patient summary Document', given as 'Patient Summary'})</span></p><p><b>date</b>: 26/01/2018 14:30:00 PM</p><p><b>author</b>: <a href="#device_IPS-examples-Device-01">Generated Summary: id: IPS-examples-Device-01; Sistema HCE del Hospital Municipal Dr Angel Pintos </a></p><p><b>title</b>: Patient Summary as of January 26, 2018 14:30</p><p><b>confidentiality</b>: N</p><blockquote><p><b>attester</b></p><p><b>mode</b>: LEGAL</p><p><b>time</b>: 26/01/2018 2:30:00 PM</p><p><b>party</b>: <a href="#organization_IPS-examples-Organization-01">Generated Summary: id: IPS-examples-Organization-01; 14999912399913; active; Hospital Municipal Hospital Doctor Ángel Pintos </a></p></blockquote><p><b>custodian</b>: <a href="#organization_IPS-examples-Organization-01">Generated Summary: id: IPS-examples-Organization-01; http://hospitalPintos.org.ar; active; name: Hospital Municipal Hospital Doctor Ángel Pintos / Dominio; ph: +54 02281 43-5200(WORK)</a></p></div>`
                },
                "custodian": {
                    "reference": "http://hapi.fhir.org/baseR4/Organization/IPS-examples-Organization-01"
                },
                "attester":  [
                    {
                        "mode": "legal",
                        "time": "2018-01-26T14:30:00-03:00",
                        "party": {
                            "reference": "http://hapi.fhir.org/baseR4/Organization/IPS-examples-Organization-01"
                        }
                    }
                ],
                "status": "final"
            }
        },
        {
            "fullUrl": "http://hapi.fhir.org/baseR4/Patient/IPS-examples-Patient-01",
            "resource": {
                "id": "IPS-examples-Patient-01",
                "gender": "female",
                "telecom":  [
                    {
                        "system": "phone",
                        "value": "44318113"
                    }
                ],
                "birthDate": "1969-11-01",
                "identifier":  [
                    {
                        "system": "http://hospitalPintos.org.ar/Patient",
                        "value": "9000022"
                    },
                    {
                        "system": "http://www.renaper.gob.ar/dni",
                        "value": "99999999"
                    }
                ],
                "resourceType": "Patient",
                "active": "true",
                "name":  [
                    {
                        "family": "Villareal",
                        "given":  [
                            "Maria",
                            "Victoria"
                        ],
                        "_family": {
                            "extension":  [
                                {
                                    "url": "https://federador.msal.gob.ar/primer_apellido",
                                    "valueString": "Villareal"
                                }
                            ]
                        },
                        "text": "Villareal Maria Victoria"
                    }
                ]
            }
        },
        {
            "fullUrl": "http://hapi.fhir.org/baseR4/Device/IPS-examples-Device-01",
            "resource": {
                "resourceType": "Device",
                "id": "IPS-examples-Device-01",
                "identifier":  [
                    {
                        "system": "http://hospitalPintos.org.ar/Device",
                        "value": "HCE_HtalPintos_v1.0"
                    }
                ],
                "type": {
                    "coding":  [
                        {
                            "system": "http://snomed.info/sct",
                            "code": "462894001",
                            "display": "software de aplicación de sistema de información de historias clínicas de pacientes (objeto físico)"
                        }
                    ]
                },
                "owner": {
                    "reference": "http://argentina.gob.ar/salud/refes/Organization/14999912399913"
                },
                "deviceName":  [
                    {
                        "name": "Sistema HCE del Hospital Municipal Dr Angel Pintos",
                        "type": "manufacturer-name"
                    }
                ]
            }
        },
        {
            "fullUrl": "http://hapi.fhir.org/baseR4/Organization/IPS-examples-Organization-01",
            "resource": {
                "active": true,
                "address":  [
                    {
                        "use": "work",
                        "line":  [
                            "Amado Diab 270,"
                        ],
                        "country": "Argentina",
                        "city": "Azul",
                        "postalCode": "B7300"
                    }
                ],
                "id": "IPS-examples-Organization-01",
                "telecom":  [
                    {
                        "system": "phone",
                        "value": "+54 02281 43-5200",
                        "use": "work"
                    }
                ],
                "text": {
                    "status": "generated",
                    "div": `<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: IPS-examples-Organization-01</p><p><b>text</b>: </p><p><b>identifier</b>: 14999912399913</p><p><b>active</b>: true</p><p><b>name</b>: Hospital Municipal Hospital Doctor Ángel Pintos</p><p><b>telecom</b>: ph: +54 02281 43-5200</p><p><b>address</b>: Amado Diab 270, B7300 Azul, Buenos Aires, Argentina</p></div>`
                },
                "identifier":  [
                    {
                        "system": "http://argentina.gob.ar/salud/refes",
                        "value": "14999912399913"
                    },
                    {
                        "system": "http://argentina.gob.ar/salud/bus-interoperabilidad/dominio",
                        "value": "http://hospitalPintos.org.ar"
                    }
                ],
                "resourceType": "Organization",
                "name": "Hospital Municipal Hospital Doctor Ángel Pintos"
            }
        },
        {
            "fullUrl": "http://hapi.fhir.org/baseR4/Condition/IPS-examples-Condition-01",
            "resource": {
                "id": "IPS-examples-Condition-01",
                "category":  [
                    {
                        "coding":  [
                            {
                                "system": "http://loinc.org",
                                "display": "Problem",
                                "code": "75326-9"
                            }
                        ]
                    }
                ],
                "subject": {
                    "reference": "http://hapi.fhir.org/baseR4/Patient/IPS-examples-Patient-01"
                },
                "onsetDateTime": "2016",
                "resourceType": "Condition",
                "verificationStatus": {
                    "coding":  [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                            "code": "confirmed"
                        }
                    ]
                },
                "code": {
                    "coding":  [
                        {
                            "code": "195967001",
                            "system": "http://snomed.info/sct",
                            "display": "asma (trastorno)"
                        }
                    ]
                },
                "recordedDate": "2016-10",
                "meta": {
                    "profile":  [
                        "http://hl7.org/fhir/uv/ips/StructureDefinition/condition-uv-ips"
                    ]
                },
                "text": {
                    "status": "generated",
                    "div": `<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: IPS-examples-Condition-01</p><p><b>meta</b>: </p><p><b>text</b>: </p><p><b>identifier</b>: c87bf51c-e53c-4bfe-b8b7-aa62bdd93002</p><p><b>clinicalStatus</b>: Active <span style="background: LightGoldenRodYellow">(Details : {http://terminology.hl7.org/CodeSystem/condition-clinical code 'active' = 'Active)</span></p><p><b>verificationStatus</b>: Confirmed <span style="background: LightGoldenRodYellow">(Details : {http://terminology.hl7.org/CodeSystem/condition-ver-status code 'confirmed' = 'Confirmed)</span></p><p><b>category</b>: Problem <span style="background: LightGoldenRodYellow">(Details : {LOINC code '75326-9' = 'Problem', given as 'Problem'})</span></p><p><b>severity</b>: Moderate <span style="background: LightGoldenRodYellow">(Details : {LOINC code 'LA6751-7' = 'LA6751-7', given as 'Moderate'})</span></p><p><b>code</b>: Menopausal flushing (finding) <span style="background: LightGoldenRodYellow">(Details : {SNOMED CT code '198436008' = 'Hot flush', given as 'Menopausal flushing (finding)'})</span></p><p><b>subject</b>: <a href="#patient_IPS-examples-Patient-01">Generated Summary: id: IPS-examples-Patient-01; 574687583; active; Martha DeLarosa ; ph: +31788700800(HOME); FEMALE; birthDate: 01/05/1972</a></p><p><b>recordedDate</b>: 01/10/2016</p></div>`
                },
                "severity": {
                    "coding":  [
                        {
                            "system": "http://loinc.org",
                            "display": "Moderate",
                            "code": "LA6751-7"
                        }
                    ]
                },
                "clinicalStatus": {
                    "coding":  [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                            "code": "active"
                        }
                    ]
                }
            }
        },
        {
            "fullUrl": "http://hapi.fhir.org/baseR4/MedicationStatement/IPS-examples-MedicationStatement-01",
            "resource": {
                "status": "active",
                "medicationReference": {
                    "reference": "http://hapi.fhir.org/baseR4/Medication/IPS-examples-Medication-01"
                },
                "dosage":  [
                    {
                        "route": {
                            "coding":  [
                                {
                                    "system": "http://snomed.info/sct",
                                    "display": "vía de administración en el tracto respiratorio (calificador)",
                                    "code": "447694001"
                                }
                            ]
                        },
                        "timing": {
                            "repeat": {
                                "count": 1,
                                "periodUnit": "d"
                            }
                        },
                        "doseAndRate":  [
                            {
                                "type": {
                                    "coding":  [
                                        {
                                            "system": "http://terminology.hl7.org/CodeSystem/dose-rate-type",
                                            "display": "Ordered",
                                            "code": "ordered"
                                        }
                                    ]
                                },
                                "doseQuantity": {
                                    "code": "732981002",
                                    "value": 1,
                                    "system": "http://snomed.info/sct",
                                    "unit": "disparo (unidad de presentación)"
                                }
                            }
                        ]
                    }
                ],
                "id": "IPS-examples-MedicationStatement-01",
                "effectivePeriod": {
                    "start": "2015-03"
                },
                "subject": {
                    "reference": "http://hapi.fhir.org/baseR4/Patient/IPS-examples-Patient-01"
                },
                "meta": {
                    "profile":  [
                        "http://hl7.org/fhir/uv/ips/StructureDefinition/medicationstatement-uv-ips"
                    ]
                },
                "text": {
                    "status": "generated",
                    "div": `<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: IPS-examples-MedicationStatement-01</p><p><b>meta</b>: </p><p><b>text</b>: </p><p><b>identifier</b>: b75f92cb-61d4-469a-9387-df5ef70d25f0</p><p><b>status</b>: ACTIVE</p><p><b>medication</b>: <a href="#medication_IPS-examples-Medication-01">Generated Summary: id: IPS-examples-Medication-01; <span title="Codes: {http://snomed.info/sct 108774000}, {urn:oid:2.16.840.1.113883.2.4.4.1 99872}, {urn:oid:2.16.840.1.113883.2.4.4.7 2076667}">Anastrozole (product)</span></a></p><p><b>subject</b>: <a href="#patient_IPS-examples-Patient-01">Generated Summary: id: IPS-examples-Patient-01; 574687583; active; Martha DeLarosa ; ph: +31788700800(HOME); FEMALE; birthDate: 01/05/1972</a></p><p><b>effective</b>: 01/03/2015 --&gt; (ongoing)</p><p><b>dosage</b>: </p></div>`
                },
                "resourceType": "MedicationStatement"
            }
        },
        {
            "fullUrl": "http://hapi.fhir.org/baseR4/Medication/IPS-examples-Medication-01",
            "resource": {
                "code": {
                    "coding":  [
                        {
                            "system": "http://snomed.info/sct",
                            "display": "producto que contiene exactamente salbutamol 200 microgramos/disparo en polvo de liberación convencional para administración por inhalación (fármaco de uso clínico)",
                            "code": "770301006"
                        }
                    ]
                },
                "form": {
                    "coding":  [
                        {
                            "system": "http://snomed.info/sct",
                            "display": "disparo (unidad de presentación)",
                            "code": "732981002"
                        }
                    ]
                },
                "ingredient":  [
                    {
                        "code": {
                            "coding":  [
                                {
                                    "system": "http://snomed.info/sct",
                                    "display": "salbutamol (sustancia)",
                                    "code": "372897005"
                                }
                            ]
                        },
                        "isActive": true,
                        "strength": {
                            "numerator": {
                                "value": 200,
                                "unit": "mcg"
                            },
                            "denominator": {
                                "value": 1,
                                "unit": "disparo"
                            }
                        }
                    }
                ],
                "id": "IPS-examples-Medication-01",
                "resourceType": "Medication",
                "meta": {
                    "profile":  [
                        "http://hl7.org/fhir/uv/ips/StructureDefinition/medication-uv-ips"
                    ]
                },
                "text": {
                    "status": "generated",
                    "div": `<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: IPS-examples-Medication-01</p><p><b>meta</b>: </p><p><b>text</b>: </p><p><b>code</b>: producto que contiene exactamente salbutamol 200 microgramos/disparo en polvo de liberación convencional para administración por inhalación (fármaco de uso clínico) <span style="background: LightGoldenRodYellow">(Details : {SNOMED CT code '770301006' = 'producto que contiene exactamente salbutamol 200 microgramos/disparo en polvo de liberación convencional para administración por inhalación (fármaco de uso clínico)', given as 'Anastrozole (product)'};</span></p></div>`
                }
            }
        },
        {
            "fullUrl": "http://hapi.fhir.org/baseR4/AllergyIntolerance/IPS-examples-AllergyIntolerance-01",
            "resource": {
                "category":  [
                    "medication"
                ],
                "criticality": "high",
                "patient": {
                    "reference": "http://hapi.fhir.org/baseR4/Patient/IPS-examples-Patient-01"
                },
                "id": "IPS-examples-AllergyIntolerance-01",
                "code": {
                    "coding":  [
                        {
                            "system": "http://snomed.info/sct",
                            "display": "alergia a la penicilina (trastorno)",
                            "code": "91936005"
                        }
                    ]
                },
                "meta": {
                    "profile":  [
                        "http://hl7.org/fhir/uv/ips/StructureDefinition/allergyintolerance-uv-ips"
                    ]
                },
                "text": {
                    "status": "generated",
                    "div": `<div xmlns="//http://www.w3.org/1999/xhtml"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: IPS-examples-AllergyIntolerance-01</p><p><b>meta</b>: </p><p><b>text</b>: </p><p><b>identifier</b>: 3a462598-009c-484a-965c-d6b24a821424</p><p><b>type</b>: ALLERGY</p><p><b>category</b>: MEDICATION</p><p><b>criticality</b>: HIGH</p><p><b>code</b>: Penicillin -class of antibiotic- (substance) <span style="background: LightGoldenRodYellow">(Details : {SNOMED CT code '373270004' = 'Penicillin -class of antibiotic- (substance)', given as 'Penicillin -class of antibiotic- (substance)'})</span></p><p><b>patient</b>: <a href="#patient_IPS-examples-Patient-01">Generated Summary: id: IPS-examples-Patient-01; 574687583; active; Martha DeLarosa ; ph: +31788700800(HOME); FEMALE; birthDate: 01/05/1972</a></p></div>`
                },
                "resourceType": "AllergyIntolerance",
                "type": "allergy",
                "onsetDateTime": "2010"
            }
        },
        {
            "fullUrl": "http://hapi.fhir.org/baseR4/Immunization/IPS-examples-Immunization-01",
            "resource": {
                "resourceType": "Immunization",
                "id": "IPS-examples-Immunization-01",
                "status": "completed",
                "notGiven": false,
                "vaccineCode": {
                    "coding":  [
                        {
                            "system": "https://snomed.info/sct/11000221109/id/228100022110",
                            "code": "1181000221105",
                            "display": "producto que contiene solamente antígeno de virus de la influenza (producto medicinal)"
                        }
                    ]
                },
                "patient": {
                    "reference": "http://hapi.fhir.org/baseR4/Patient/IPS-examples-Patient-01"
                },
                "occurrenceDateTime": "2017-05-22",
                "primarySource": true,
                "location": {
                    "reference": "http://argentina.gob.ar/salud/refes/Location/14999912399913"
                },
                "lotNumber": "649718",
                "expirationDate": "2017-12-22",
                "reasonCode":  [
                    {
                        "coding":  [
                            {
                                "system": "http://snomed.info/sct",
                                "code": "429060002",
                                "display": "procedimiento para cumplir con el requerimiento ocupacional (procedimiento)"
                            },
                            {
                                "system": "http://saluddigital.ar/valueSet/NOMIVAC-condicion-code",
                                "code": "17",
                                "display": "Personal de Salud"
                            }
                        ]
                    }
                ],
                "isSubpotent": false,
                "protocolApplied":  [
                    {
                        "series": "Antigripal Esquema Personal de Salud",
                        "extension":  [
                            {
                                "url": "http://saluddigital.ar/fhir/esquema",
                                "valueCoding": {
                                    "system": "http://saluddigital.ar/valueSet/NOMIVAC-esquema-code",
                                    "code": "81",
                                    "display": "Antigripal Esquema Personal de Salud"
                                }
                            }
                        ],
                        "targetDisease":  [
                            {
                                "coding":  [
                                    {
                                        "system": "http://snomed.info/sct",
                                        "code": "6142004",
                                        "display": "gripe (trastorno)"
                                    }
                                ]
                            }
                        ],
                        "doseNumberPositiveInt": 1
                    }
                ]
            }
        }
    ],
    "type": "document",
    "identifier": {
        "system": "http://hospitalPintos.org.ar/Bundle",
        "value": "12000345"
    }
}
module.exports = { ListaDocumentosDisponibles, ContenidoDocumento }