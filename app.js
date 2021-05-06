const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

let config = require('./config');


const port = config.port;

let jsonParser = bodyParser.json();

app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(jsonParser);

//MONGODB
let {Grafica} = require('./models/grafica');
let {User} = require('./models/user');
let {Session} = require('./models/session');


let GraficaHelper = require('./helpers/GraficaHelper');
let UserHelper = require('./helpers/UserHelper');


app.route('/')
    .get(async (req, res) => {
        res.status(200).send('Server 2 working');
    });

app.route('/api/grafica')
    .get(async (req, res) =>{
        Grafica.queryGrafica().then((g)=>{
            let resultJson = GraficaHelper.getAverageByHour(g);
            res.send(resultJson);
        }).catch((e) => {
            console.log('error al obtener los datos');
            console.log(e);
        });
    });

app.route('/api/auth/login')
    .post(async (req, res) =>{
        let pswd = UserHelper.stringToHash(req.body.password);
        User.loginUser(req.body.email, pswd).then((u)=>{
            if(u.length > 0){
                Session.createSession(u[0]._id).then((token)=>{
                    let json = JSON.parse('{"token": "'+ token +'"}');
                    res.send(json);
                }).catch(() => {
                    console.log('Error al crear la sesion');
                });
            } else {
                res.send("Usuario o contraseña incorrectos");
            }
        }).catch(() => {
            console.log('usuario o contraseña incorrectos');
        });
    });

app.route('/api/auth/logout')
    .post(async (req, res) =>{
        Session.closeSession(req.body.token).then(()=>{
            res.send('La sesion se cerro con exito');
        }).catch((e) => {
            console.log('error al cerrar sesion');
            console.log(e);
        });
    });

app.route('/api/auth/register')
    .post(async (req, res) =>{
        let pswd = UserHelper.stringToHash(req.body.password);
        User.registerUser(req['body']['email'], pswd).then((u)=>{
            res.send(u);
        }).catch(() => {
            console.log('error al crear el usuario');
        });
    });

app.route('/api/auth/token')
    .post(async (req, res) =>{
        Session.checkSession(req.body.token).then((token)=>{
            console.log(token);
            if (token.length<1){
                let json = JSON.parse('{"isActive": '+ false +'}');
                res.send(json);
            }else{
                let json = JSON.parse('{"isActive": '+ token[0].isActive +'}');
                res.send(json);
            }

        }).catch((e) => {
            console.log('error al cerrar sesion');
            console.log(e);
        });
    });
////////////////////////


app.listen(port, () => console.log(`Example app listening on port http://127.0.0.1:${port}!`));
