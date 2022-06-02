import {alterarFilme, alterarImagem,  buscaPorId,  buscaPorNome,  inserirFilme, listarTodosFilme, removerFilme} from '../repository/filmeRepository.js' 

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

server.put('/filme/:id/capa', upload.single('capa') , async (req, resp) =>{
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

server.get('/filme', async (req, resp) => {
    try {
        const resposta = await listarTodosFilme( );
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
        
    }
})

server.get('/filme/busca', async (req, resp) => {
    try {
        const { nome } = req.query;
        const resposta = await buscaPorNome(nome);
        
        if(!resposta)
            resp.status(404).send([])
        
        else
            resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
        
    }
})

server.get('/filme/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const resposta = await buscaPorId(id);
        
        if(!resposta)
            resp.status(404).send([])
        
        else
            resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
        
    }
})

server.delete('/filme/:id', async (req, resp) => {
    try {
        const { id } = req.params;

        const resposta = await removerFilme(id);
        if(resposta != 1)
            throw new Error('Não foi possivel remover o filme');

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.put('filme/:id', async (req, resp) => {
    try{
        const { id } = req.params;
        const filme = req.body;

        if(!filme.nome){
            throw new Error('O nome do filme cara');
        }

        if(!filme.sinopse){
            throw new Error('A sinopse do filme cara');
        }

        if(filme.avaliacao == undefined || filme.avaliacao < 0){
            throw new Error('A avaliação do filme cara');
        } 

        if(!filme.lancamento){
            throw new Error('O lançamento do filme cara');
        }

        if(filme.disponivel == undefined){
            throw new Error('A disponibilidade do filme cara');
        }

        if(!filme.usuario){
            throw new Error('O usuario não ta logado >:(');
        }

        const resposta = await alterarFilme(id, filme);
        if(resposta != 1)
            throw new Error('Filme não pode ser alterado');
        else
            resp.status(204).send();
    }
    catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})


export default server;