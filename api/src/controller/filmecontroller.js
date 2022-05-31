import {alterarImagem,  inserirFilme } from '../repository/filmeRepository.js' 

import multer from 'multer'
import { Router } from 'express'

const server = Router(); 
const upload = multer({ dest: 'storage/capasFilmes' });

server.post('/filme', async  (req, resp) =>  {
    try {
        const novoFilme = req.body;

        if(!novoFilme.nome){
            throw new Error('O nome do filme cara');
        }

        if(!novoFilme.sinopse){
            throw new Error('A sinopse do filme cara');
        }

        if(novoFilme.avaliacao == undefined || novoFilme.avaliacao < 0){
            throw new Error('A avaliação do filme cara');
        } 

        if(!novoFilme.lancamento){
            throw new Error('O lançamento do filme cara');
        }

        if(!novoFilme.disponivel){
            throw new Error('A disponibilidade do filme cara');
        }

        if(!novoFilme.usuario){
            throw new Error('O usuario não ta logado >:(');
        }

        const filmeInserido = await inserirFilme(novoFilme);
        resp.send(filmeInserido);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.put('/filme/:id/imagem', upload.single('capa') , async (req, resp) =>{
    try {
        const { id } = req.params;
        const imagem = req.file.path;
        
        const resposta = await alterarImagem(imagem, id);
        if (resposta != 1)
            throw new Error('Sem imagem bro')
        
        
        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


export default server;