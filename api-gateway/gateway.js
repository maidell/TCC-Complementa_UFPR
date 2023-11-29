require("dotenv-safe").config();
const cors = require("cors");
const jwt = require('jsonwebtoken');
var https = require('https');
const express = require('express')
const httpProxy = require('express-http-proxy')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
const helmet = require('helmet');

//Configuração da porta
const PORT = process.env.PORT;
//const API_HOST = 'https://complementa-ufpr-f6abf4461f5d.herokuapp.com';
const API_HOST = 'http://localhost:5000'
const app = express();

app.use(cors());

git

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cookieParser());

const servicesProxy = httpProxy(API_HOST);

function verifyJWT(req, res, next) {

  const token = req.headers['x-access-token'];
  if (!token)
    return res
      .status(401)
      .json({ auth: false, message: 'Token não fornecido.' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err)
      return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token.' });
    req.userId = decoded.id;
    next();
  });
}

const authServiceProxy = httpProxy(API_HOST, {

  proxyReqBodyDecorator: function (bodyContent, srcReq) {
    try {
      retBody = {};
      retBody.email = bodyContent.email;
      retBody.senha = bodyContent.senha;
      bodyContent = retBody;
    }
    catch (e) {
      console.log('- ERRO: ' + e);
    }
    return bodyContent;
  },
  proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
    proxyReqOpts.headers['Content-Type'] = 'application/json';
    proxyReqOpts.method = 'POST';
    return proxyReqOpts;
  },
  userResDecorator: function (
    proxyRes,
    proxyResData,
    userReq,
    userRes
  ) {
    try {
      if (proxyRes.statusCode == 200) {
        var str = Buffer.from(proxyResData).toString("utf-8");
        var objBody = JSON.parse(str);
        const id = objBody.id;
        const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "2 days",
        });

        const filteredData = filterCircularProperties(objBody);

        return userRes
          .status(200)
          .json({ auth: true, token: token, data: filteredData });
      } else {
        return userRes.status(401).json({ message: "Login inválido!" });
      }
    } catch (error) {
      console.log(`Erro Autenticação: ${error}`);
      return userRes.status(500).json({ message: "Erro ao processar a autenticação." });
    }
  }
});

function filterCircularProperties(obj) {
  const seen = new WeakSet();

  function filter(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && typeof obj[key] === 'object' && obj[key] !== null) {
        if (seen.has(obj[key])) {
          delete obj[key];
        } else {
          seen.add(obj[key]);
          filter(obj[key]);
        }
      }
    }
  }

  filter(obj);
  return obj;
}

//===============================================================================================================================
console.log(`Iniciando configurações de rotas`)
//===============================================================================================================================
console.log(`Configurando rotas de Aluno`)

app.post('/alunos', verifyJWT, (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/alunos para ${API_HOST}/alunos`);
  servicesProxy(req, res, next);
})

app.get('/alunos/:id', verifyJWT, (req, res, next) => {
  const alunoId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/alunos/${alunoId} para ${API_HOST}/alunos/${alunoId}`);
  servicesProxy(req, res, next);
})

app.get('/alunos', verifyJWT, (req, res, next) => {
  console.log(`Roteando GET de http://localhost:${PORT}/alunos para ${API_HOST}/alunos`);
  servicesProxy(req, res, next);
})

app.put('/alunos/:id', verifyJWT, (req, res, next) => {
  const alunoId = req.params.id;
  console.log(`Roteando PUT de http://localhost:${PORT}/alunos/${alunoId} para ${API_HOST}/alunos/${alunoId}`);
  servicesProxy(req, res, next);
})

app.delete('/alunos/:id', verifyJWT, (req, res, next) => {
  const alunoId = req.params.id;
  console.log(`Roteando DELETE de http://localhost:${PORT}/alunos/${alunoId} para ${API_HOST}/alunos/${alunoId}`);
  servicesProxy(req, res, next);
})
//===============================================================================================================================
console.log(`Configurando rotas de Anexo`)

app.post('/anexos/atividades/upload/:atividadeId', verifyJWT, (req, res, next) => {
  const atividadeId = req.params.id;
  console.log(`Roteando POST de http://localhost:${PORT}/anexos/atividades/upload/${atividadeId} para ${API_HOST}/anexos/atividades/upload/${atividadeId}`);
  servicesProxy(req, res, next);
})

app.post('/anexos/relatorios/upload/:relatorioId', verifyJWT, (req, res, next) => {
  const relatorioId = req.params.id;
  console.log(`Roteando POST de http://localhost:${PORT}/anexos/relatorios/upload/${relatorioId} para ${API_HOST}/anexos/relatorios/upload/${relatorioId}`);
  servicesProxy(req, res, next);
})

app.get('/anexos/download/:id', verifyJWT, (req, res, next) => {
  const anexoId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/anexos/download/${anexoId} para ${API_HOST}/anexos/download/${anexoId}`);
  servicesProxy(req, res, next);
})

app.get('/anexos/:id', verifyJWT, (req, res, next) => {
  const anexoId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/anexos/${anexoId} para ${API_HOST}/anexos/${anexoId}`);
  servicesProxy(req, res, next);
})

app.delete('/anexos/:id', verifyJWT, (req, res, next) => {
  const anexoId = req.params.id;
  console.log(`Roteando DELETE de http://localhost:${PORT}/anexos/${anexoId} para ${API_HOST}/anexos/${anexoId}`);
  servicesProxy(req, res, next);
})
//===============================================================================================================================
console.log(`Configurando rotas de Atividade`)

app.post('/atividades', verifyJWT, (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/atividades para ${API_HOST}/atividades`);
  servicesProxy(req, res, next);
})

app.get('/atividades/:id', verifyJWT, (req, res, next) => {
  const atividadeId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/atividades/${atividadeId} para ${API_HOST}/atividades/${atividadeId}`);
  servicesProxy(req, res, next);
})

app.get('/atividades/projetos/:id', verifyJWT, (req, res, next) => {
  const projetoId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/atividades/projetos/${projetoId} para ${API_HOST}/atividades/projetos/${projetoId}`);
  servicesProxy(req, res, next);
})

app.get('/atividades/alunos/:id', verifyJWT, (req, res, next) => {
  const projetoId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/atividades/alunos/${projetoId} para ${API_HOST}/atividades/alunos/${projetoId}`);
  servicesProxy(req, res, next);
})

app.get('/atividades/usuarios/:id', verifyJWT, (req, res, next) => {
  const usuarioId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/atividades/usuarios/${usuarioId} para ${API_HOST}/atividades/usuarios/${usuarioId}`);
  servicesProxy(req, res, next);
})

app.get('/atividades/graduacoes/:id', verifyJWT, (req, res, next) => {
  const graduacaoId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/atividades/graduacoes/${graduacaoId} para ${API_HOST}/atividades/graduacoes/${graduacaoId}`);
  servicesProxy(req, res, next);
})

app.get('/atividades/orientadores/:id', verifyJWT, (req, res, next) => {
  const orientadorId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/atividades/orientadores/${orientadorId} para ${API_HOST}/atividades/orientadores/${orientadorId}`);
  servicesProxy(req, res, next);
})

app.get('/atividades/contestacoes/:id', verifyJWT, (req, res, next) => {
  const id = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/atividades/contestacoes/${id} para ${API_HOST}/atividades/contestacoes/${id}`);
  servicesProxy(req, res, next);
})

app.get('/atividades/contestacoes-carga-horaria/:id', verifyJWT, (req, res, next) => {
  const id = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/atividades/contestacoes-carga-horaria/${id} para ${API_HOST}/atividades/contestacoes-carga-horaria/${id}`);
  servicesProxy(req, res, next);
})

app.get('/atividades/candidaturas/alunos/:id', verifyJWT, (req, res, next) => {
  const id = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/atividades/candidaturas/alunos/${id} para ${API_HOST}/atividades/candidaturas/alunos/${id}`);
  servicesProxy(req, res, next);
})


app.get('/atividades', verifyJWT, (req, res, next) => {
  console.log(`Roteando GET de http://localhost:${PORT}/atividades para ${API_HOST}/atividades`);
  servicesProxy(req, res, next);
})

app.put('/atividades/:id', verifyJWT, (req, res, next) => {
  const atividadeId = req.params.id;
  console.log(`Roteando PUT de http://localhost:${PORT}/atividades/${atividadeId} para ${API_HOST}/atividades/${atividadeId}`);
  servicesProxy(req, res, next);
})

app.delete('/atividades/:id', verifyJWT, (req, res, next) => {
  const atividadeId = req.params.id;
  console.log(`Roteando DELETE de http://localhost:${PORT}/atividades/${atividadeId} para ${API_HOST}/atividades/${atividadeId}`);
  servicesProxy(req, res, next);
})
//===============================================================================================================================
console.log(`Configurando rotas de Autenticação`)

app.post('/authPassword', (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/authPassword para ${API_HOST}/authPassword`);
  servicesProxy(req, res, next);
})
//===============================================================================================================================
console.log(`Configurando rotas de Autocadastro`)

app.post('/autocadastro', (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/autocadastro para ${API_HOST}/autocadastro`);
  servicesProxy(req, res, next);
})
//===============================================================================================================================
console.log(`Configurando rotas de Certificado`)

app.post('/certificados', verifyJWT, (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/certificados para ${API_HOST}/certificados`);
  servicesProxy(req, res, next);
})

app.get('/certificados/:id', verifyJWT, (req, res, next) => {
  const certificadoId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/certificados/${certificadoId} para ${API_HOST}/certificados/${certificadoId}`);
  servicesProxy(req, res, next);
})

app.get('/certificados/consultas/:hash', verifyJWT, (req, res, next) => {
  const certificadoHash = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/certificados/consultas/${certificadoHash} para ${API_HOST}/certificados/consultas/${certificadoHash}`);
  servicesProxy(req, res, next);
})

app.get('/certificados', verifyJWT, (req, res, next) => {
  console.log(`Roteando GET de http://localhost:${PORT}/certificados para ${API_HOST}/certificados`);
  servicesProxy(req, res, next);
})

app.put('/certificados/:id', verifyJWT, (req, res, next) => {
  const certificadoId = req.params.id;
  console.log(`Roteando PUT de http://localhost:${PORT}/certificados/${certificadoId} para ${API_HOST}/certificados/${certificadoId}`);
  servicesProxy(req, res, next);
})

app.delete('/certificados/:id', verifyJWT, (req, res, next) => {
  const certificadoId = req.params.id;
  console.log(`Roteando DELETE de http://localhost:${PORT}/certificados/${certificadoId} para ${API_HOST}/certificados/${certificadoId}`);
  servicesProxy(req, res, next);
})
//===============================================================================================================================
console.log(`Configurando rotas de Comentario`)

app.post('/comentarios/:id', verifyJWT, (req, res, next) => {
  const atividadeId = req.params.id;
  console.log(`Roteando POST de http://localhost:${PORT}/comentarios/${atividadeId} para ${API_HOST}/comentarios/${atividadeId}`);
  servicesProxy(req, res, next);
})

app.get('/comentarios/:id', verifyJWT, (req, res, next) => {
  const comentarioId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/comentarios/${comentarioId} para ${API_HOST}/comentarios/${comentarioId}`);
  servicesProxy(req, res, next);
})

app.get('/comentarios', verifyJWT, (req, res, next) => {
  console.log(`Roteando GET de http://localhost:${PORT}/comentarios para ${API_HOST}/comentarios`);
  servicesProxy(req, res, next);
})

app.put('/comentarios/:id', verifyJWT, (req, res, next) => {
  const comentarioId = req.params.id;
  console.log(`Roteando PUT de http://localhost:${PORT}/comentarios/${comentarioId} para ${API_HOST}/comentarios/${comentarioId}`);
  servicesProxy(req, res, next);
})

app.delete('/comentarios/:id', verifyJWT, (req, res, next) => {
  const comentarioId = req.params.id;
  console.log(`Roteando DELETE de http://localhost:${PORT}/comentarios/${comentarioId} para ${API_HOST}/comentarios/${comentarioId}`);
  servicesProxy(req, res, next);
})
//===============================================================================================================================
console.log(`Configurando rotas de Competencia`)

app.post('/competencias', verifyJWT, (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/competencias para ${API_HOST}/competencias`);
  servicesProxy(req, res, next);
})

app.get('/competencias/:id', verifyJWT, (req, res, next) => {
  const competenciaId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/competencias/${competenciaId} para ${API_HOST}/competencias/${competenciaId}`);
  servicesProxy(req, res, next);
})

app.get('/competencias', verifyJWT, (req, res, next) => {
  console.log(`Roteando GET de http://localhost:${PORT}/competencias para ${API_HOST}/competencias`);
  servicesProxy(req, res, next);
})

app.put('/competencias/:id', verifyJWT, (req, res, next) => {
  const competenciaId = req.params.id;
  console.log(`Roteando PUT de http://localhost:${PORT}/competencias/${competenciaId} para ${API_HOST}/competencias/${competenciaId}`);
  servicesProxy(req, res, next);
})

app.delete('/competencias/:id', verifyJWT, (req, res, next) => {
  const competenciaId = req.params.id;
  console.log(`Roteando DELETE de http://localhost:${PORT}/competencias/${competenciaId} para ${API_HOST}/competencias/${competenciaId}`);
  servicesProxy(req, res, next);
})
//===============================================================================================================================
console.log(`Configurando rotas de Complexidade`)

app.post('/complexidades', verifyJWT, (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/complexidades para ${API_HOST}/complexidades`);
  servicesProxy(req, res, next);
})

app.get('/complexidades/:id', verifyJWT, (req, res, next) => {
  const complexidadeId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/complexidades/${complexidadeId} para ${API_HOST}/complexidades/${complexidadeId}`);
  servicesProxy(req, res, next);
})

app.get('/complexidades', verifyJWT, (req, res, next) => {
  console.log(`Roteando GET de http://localhost:${PORT}/complexidades para ${API_HOST}/complexidades`);
  servicesProxy(req, res, next);
})

app.put('/complexidades/:id', verifyJWT, (req, res, next) => {
  const complexidadeId = req.params.id;
  console.log(`Roteando PUT de http://localhost:${PORT}/complexidades/${complexidadeId} para ${API_HOST}/complexidades/${complexidadeId}`);
  servicesProxy(req, res, next);
})

app.delete('/complexidades/:id', verifyJWT, (req, res, next) => {
  const complexidadeId = req.params.id;
  console.log(`Roteando DELETE de http://localhost:${PORT}/complexidades/${complexidadeId} para ${API_HOST}/complexidades/${complexidadeId}`);
  servicesProxy(req, res, next);
})
//===============================================================================================================================
console.log(`Configurando rotas de Confirmacao`)

app.get('/confirmacao/:email', (req, res, next) => {
  const email = req.params.email;
  console.log(`Roteando PUT de http://localhost:${PORT}/confirmacao/${email} para ${API_HOST}/confirmacao/${email}`);
  servicesProxy(req, res, next);
})
//===============================================================================================================================
console.log(`Configurando rotas de ContestacaoCargaHoraria`)

app.post('/contestacoes-carga-horaria', verifyJWT, (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/contestacoes-carga-horaria para ${API_HOST}/contestacoes-carga-horaria`);
  servicesProxy(req, res, next);
})

app.get('/contestacoes-carga-horaria/:id', verifyJWT, (req, res, next) => {
  const contestacaoCargaHorariaId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/contestacoes-carga-horaria/${contestacaoCargaHorariaId} para ${API_HOST}/contestacoes-carga-horaria/${contestacaoCargaHorariaId}`);
  servicesProxy(req, res, next);
})

app.get('/contestacoes-carga-horaria', verifyJWT, (req, res, next) => {
  console.log(`Roteando GET de http://localhost:${PORT}/contestacoes-carga-horaria para ${API_HOST}/contestacoes-carga-horaria`);
  servicesProxy(req, res, next);
})

app.put('/contestacoes-carga-horaria/:id', verifyJWT, (req, res, next) => {
  const contestacaoCargaHorariaId = req.params.id;
  console.log(`Roteando PUT de http://localhost:${PORT}/contestacoes-carga-horaria/${contestacaoCargaHorariaId} para ${API_HOST}/contestacoes-carga-horaria/${contestacaoCargaHorariaId}`);
  servicesProxy(req, res, next);
})

app.delete('/contestacoes-carga-horaria/:id', verifyJWT, (req, res, next) => {
  const contestacaoCargaHorariaId = req.params.id;
  console.log(`Roteando DELETE de http://localhost:${PORT}/contestacoes-carga-horaria/${contestacaoCargaHorariaId} para ${API_HOST}/contestacoes-carga-horaria/${contestacaoCargaHorariaId}`);
  servicesProxy(req, res, next);
})
//===============================================================================================================================
console.log(`Configurando rotas de Contestacao`)

app.post('/contestacoes', verifyJWT, (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/contestacoes para ${API_HOST}/contestacoes`);
  servicesProxy(req, res, next);
})

app.get('/contestacoes/:id', verifyJWT, (req, res, next) => {
  const contestacaoId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/contestacoes/${contestacaoId} para ${API_HOST}/contestacoes/${contestacaoId}`);
  servicesProxy(req, res, next);
})

app.get('/contestacoes', verifyJWT, (req, res, next) => {
  console.log(`Roteando GET de http://localhost:${PORT}/contestacoes para ${API_HOST}/contestacoes`);
  servicesProxy(req, res, next);
})

app.put('/contestacoes/:id', verifyJWT, (req, res, next) => {
  const contestacaoId = req.params.id;
  console.log(`Roteando PUT de http://localhost:${PORT}/contestacoes/${contestacaoId} para ${API_HOST}/contestacoes/${contestacaoId}`);
  servicesProxy(req, res, next);
})

app.delete('/contestacoes/:id', verifyJWT, (req, res, next) => {
  const contestacaoId = req.params.id;
  console.log(`Roteando DELETE de http://localhost:${PORT}/contestacoes/${contestacaoId} para ${API_HOST}/contestacoes/${contestacaoId}`);
  servicesProxy(req, res, next);
})
//===============================================================================================================================
console.log(`Configurando rotas de Graduacao`)

app.post('/graduacoes', verifyJWT, (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/graduacoes para ${API_HOST}/graduacoes`);
  servicesProxy(req, res, next);
})

app.get('/graduacoes/autocadastro', (req, res, next) => {
  console.log(`Roteando GET de http://localhost:${PORT}/graduacoes/autocadastro para ${API_HOST}/graduacoes/autocadastro`);
  servicesProxy(req, res, next);
})

app.get('/graduacoes', verifyJWT, (req, res, next) => {
  console.log(`Roteando GET de http://localhost:${PORT}/graduacoes para ${API_HOST}/graduacoes`);
  servicesProxy(req, res, next);
})

app.get('/graduacoes/:id', verifyJWT, (req, res, next) => {
    const graduacaoId = req.params.id;
    console.log(graduacaoId);
    console.log(`Roteando GET de http://localhost:${PORT}/graduacoes/${graduacaoId} para ${API_HOST}/graduacoes/${graduacaoId}`);
    servicesProxy(req, res, next);
  })

app.put('/graduacoes/:id', verifyJWT, (req, res, next) => {
  const graduacaoId = req.params.id;
  console.log(`Roteando PUT de http://localhost:${PORT}/graduacoes/${graduacaoId} para ${API_HOST}/graduacoes/${graduacaoId}`);
  servicesProxy(req, res, next);
})

app.delete('/graduacoes', verifyJWT, (req, res, next) => {
  console.log(`Roteando DELETE de http://localhost:${PORT}/graduacoes para ${API_HOST}/graduacoes`);
  servicesProxy(req, res, next);
})
//===============================================================================================================================
console.log(`Configurando rotas de Login`)

app.post('/login', (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/login para ${API_HOST}/login`);
  authServiceProxy(req, res, next);
})
//===============================================================================================================================
console.log(`Configurando rotas de Logout`)

app.post('/logout', function (req, res) {
  console.log(`Roteando POST de http://localhost:${PORT}/logout para ${API_HOST}/logout`);
  res.json({ auth: false, token: null });
})
//===============================================================================================================================
console.log(`Configurando rotas de Orientador`)

app.post('/orientadores', verifyJWT, (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/orientadores para ${API_HOST}/orientadores`);
  servicesProxy(req, res, next);
})

app.get('/orientadores/:id', verifyJWT, (req, res, next) => {
  const orientadorId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/orientadores/${orientadorId} para ${API_HOST}/orientadores/${orientadorId}`);
  servicesProxy(req, res, next);
})

app.get('/orientadores/graduacoes/:id', verifyJWT, (req, res, next) => {
  const graduacaoId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/orientadores/graduacoes/${graduacaoId} para ${API_HOST}/orientadores/graduacoes/${graduacaoId}`);
  servicesProxy(req, res, next);
})

app.get('/orientadores', verifyJWT, (req, res, next) => {
  console.log(`Roteando GET de http://localhost:${PORT}/orientadores para ${API_HOST}/orientadores`);
  servicesProxy(req, res, next);
})

app.put('/orientadores/:id', verifyJWT, (req, res, next) => {
  const orientadorId = req.params.id;
  console.log(`Roteando PUT de http://localhost:${PORT}/orientadores/${orientadorId} para ${API_HOST}/orientadores/${orientadorId}`);
  servicesProxy(req, res, next);
})

app.delete('/orientadores', verifyJWT, (req, res, next) => {
  console.log(`Roteando DELETE de http://localhost:${PORT}/orientadores para ${API_HOST}/orientadores`);
  servicesProxy(req, res, next);
})
//===============================================================================================================================
console.log(`Configurando rotas de Projeto`)

app.post('/projetos', verifyJWT, (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/projetos para ${API_HOST}/projetos`);
  servicesProxy(req, res, next);
})

app.get('/projetos/usuarios/:id', verifyJWT, (req, res, next) => {
  const usuarioId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/projetos/usuarios/${usuarioId} para ${API_HOST}/projetos/usuarios/${usuarioId}`);
  servicesProxy(req, res, next);
})

app.get('/projetos/:id', verifyJWT, (req, res, next) => {
  const projetoId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/projetos/${projetoId} para ${API_HOST}/projetos/${projetoId}`);
  servicesProxy(req, res, next);
})

app.get('/projetos', verifyJWT, (req, res, next) => {
  console.log(`Roteando GET de http://localhost:${PORT}/projetos para ${API_HOST}/projetos`);
  servicesProxy(req, res, next);
})

app.put('/projetos/:id', verifyJWT, (req, res, next) => {
  const projetoId = req.params.id;
  console.log(`Roteando PUT de http://localhost:${PORT}/projetos/${projetoId} para ${API_HOST}/projetos/${projetoId}`);
  servicesProxy(req, res, next);
})

app.delete('/projetos/:id', verifyJWT, (req, res, next) => {
  const projetoId = req.params.id;
  console.log(`Roteando DELETE de http://localhost:${PORT}/projetos/${projetoId} para ${API_HOST}/projetos/${projetoId}`);
  servicesProxy(req, res, next);
})
//===============================================================================================================================
console.log(`Configurando rotas de RelatorioDeConclusao`)

app.post('/relatorios-de-conclusao', verifyJWT, (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/relatorios-de-conclusao para ${API_HOST}/relatorios-de-conclusao`);
  servicesProxy(req, res, next);
})

app.get('/relatorios-de-conclusao/:id', verifyJWT, (req, res, next) => {
  const relatorioId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/relatorios-de-conclusao/${relatorioId} para ${API_HOST}/relatorios-de-conclusao/${relatorioId}`);
  servicesProxy(req, res, next);
})

app.get('/relatorios-de-conclusao', verifyJWT, (req, res, next) => {
  console.log(`Roteando GET de http://localhost:${PORT}/relatorios-de-conclusao para ${API_HOST}/relatorios-de-conclusao`);
  servicesProxy(req, res, next);
})

app.put('/relatorios-de-conclusao/:id', verifyJWT, (req, res, next) => {
  const relatorioId = req.params.id;
  console.log(`Roteando PUT de http://localhost:${PORT}/relatorios-de-conclusao/${relatorioId} para ${API_HOST}/relatorios-de-conclusao/${relatorioId}`);
  servicesProxy(req, res, next);
})

app.delete('/relatorios-de-conclusao/:id', verifyJWT, (req, res, next) => {
  const relatorioId = req.params.id;
  console.log(`Roteando DELETE de http://localhost:${PORT}/relatorios-de-conclusao/${relatorioId} para ${API_HOST}/relatorios-de-conclusao/${relatorioId}`);
  servicesProxy(req, res, next);
})
//===============================================================================================================================
console.log(`Configurando rotas de Servidor`)

app.post('/servidores', verifyJWT, (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/servidores para ${API_HOST}/servidores`);
  servicesProxy(req, res, next);
})

app.get('/servidores/:id', verifyJWT, (req, res, next) => {
  const servidorId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/servidores/${servidorId} para ${API_HOST}/servidores/${servidorId}`);
  servicesProxy(req, res, next);
})

app.get('/servidores', verifyJWT, (req, res, next) => {
  console.log(`Roteando GET de http://localhost:${PORT}/servidores para ${API_HOST}/servidores`);
  servicesProxy(req, res, next);
})

app.put('/servidores/:id', verifyJWT, (req, res, next) => {
  const servidorId = req.params.id;
  console.log(`Roteando PUT de http://localhost:${PORT}/servidores/${servidorId} para ${API_HOST}/servidores/${servidorId}`);
  servicesProxy(req, res, next);
})

app.delete('/servidores', verifyJWT, (req, res, next) => {
  console.log(`Roteando DELETE de http://localhost:${PORT}/servidores para ${API_HOST}/servidores`);
  servicesProxy(req, res, next);
})
//===============================================================================================================================
console.log(`Configurando rotas de Usuario`)

app.post('/usuarios', verifyJWT, (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/usuarios para ${API_HOST}/usuarios`);
  servicesProxy(req, res, next);
})

app.get('/usuarios/:id', verifyJWT, (req, res, next) => {
  const usuarioId = req.params.id;
  console.log(`Roteando GET de http://localhost:${PORT}/usuarios/${usuarioId} para ${API_HOST}/usuarios/${usuarioId}`);
  servicesProxy(req, res, next);
})

app.get('/usuarios', verifyJWT, (req, res, next) => {
  console.log(`Roteando GET de http://localhost:${PORT}/usuarios para ${API_HOST}/usuarios`);
  servicesProxy(req, res, next);
})

app.put('/usuarios/:id', verifyJWT, (req, res, next) => {
  const usuarioId = req.params.id;
  console.log(`Roteando PUT de http://localhost:${PORT}/usuarios/${usuarioId} para ${API_HOST}/usuarios/${usuarioId}`);
  servicesProxy(req, res, next);
})

app.delete('/usuarios', verifyJWT, (req, res, next) => {
  console.log(`Roteando DELETE de http://localhost:${PORT}/usuarios para ${API_HOST}/usuarios`);
  servicesProxy(req, res, next);
})
//===============================================================================================================================
app.listen(PORT, () => console.log(`Gateway online on http://localhost:${PORT}`));
