import { inserirFilme } from '../repository/filmeRepository.js' 

import { Router } from 'express'
const server = Router(); 

server.post('/filme', async  (req, resp) =>  {
    try {
        const novoFilme = req.body;

        const filmeInserido = await inserirFilme(novoFilme);
        resp.send(filmeInserido);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})


export default server;