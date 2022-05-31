
import 'dotenv/config'
import usuarioController from './controller/usuarioController.js';
import filmeController from './controller/filmecontroller.js';

import express from 'express'
import cors from 'cors'

const server = express();
server.use(cors());
server.use(express.json());

server.use(usuarioController);
server.use(filmeController);    


 

server.listen(process.env.PORT, () => console.log(`API CONECTADA NA PORTA ${process.env.PORT}`));