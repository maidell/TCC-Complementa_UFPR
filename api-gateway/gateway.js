require("dotenv-safe").config();
const cors = require("cors");
const jwt = require('jsonwebtoken');
var http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
const helmet = require('helmet');

//Configuração da porta
const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cookieParser());

const servicesProxy = httpProxy('http://localhost:5000');

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

const authServiceProxy = httpProxy('http://localhost:5000', {

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
        let objRet = {
          id: objBody.id,
          nome: objBody.nome,
          email: objBody.email,
          telefone: objBody.telefone,
          papel: objBody.papel
        };
        console.log(objRet.email);
        return (
          userRes
            .status(200)
            // .json({ auth: true, token: token, data: objBody });
            .json({ auth: true, token: token, data: objRet })
        );
      } else {
        return userRes.status(401).json({ message: "Login inválido!" });
      }
    } catch (error) {
      console.log(`Erro Autenticação: ${error}`);
      return userRes.status(500).json({ message: "Erro ao processar a autenticação." });
    }
  }
});

console.log(`Configurando rota de autocadastro`)
app.post('/autocadastro', (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/autocadastro para http://localhost:5000/autocadastro`);
  servicesProxy(req, res, next);
})

console.log(`Configurando rota de login`)
app.post('/login', (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/login para http://localhost:5000/login`);
  authServiceProxy(req, res, next);
})

console.log(`Configurando rota de logout`)
app.post('/logout', function (req, res) {
  console.log(`Roteando POST de http://localhost:${PORT}/logout para http://localhost:5000/logout`);
  res.json({ auth: false, token: null });
})

//app.post('/authPassword', verifyJWT, (req, res, next) => {
app.post('/authPassword', (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/authPassword para http://localhost:5000/authPassword`);
  servicesProxy(req, res, next);
})

console.log(`Configurando rotas de usuario`)
app.post('/usuarios', verifyJWT, (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/usuarios para http://localhost:5000/usuarios`);
  servicesProxy(req, res, next);
})

app.get('/usuarios', verifyJWT, (req, res, next) => {
  console.log(`Roteando GET de http://localhost:${PORT}/usuarios para http://localhost:5000/usuarios`);
  servicesProxy(req, res, next);
})

app.put('/usuarios', verifyJWT, (req, res, next) => {
  console.log(`Roteando PUT de http://localhost:${PORT}/usuarios para http://localhost:5000/usuarios`);
  servicesProxy(req, res, next);
})

app.delete('/usuarios', verifyJWT, (req, res, next) => {
  console.log(`Roteando DELETE de http://localhost:${PORT}/usuarios para http://localhost:5000/usuarios`);
  servicesProxy(req, res, next);
})

console.log(`Configurando rota de aluno`)
app.post('/alunos', verifyJWT, (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/alunos para http://localhost:5000/alunos`);
  servicesProxy(req, res, next);
})

// app.get('/alunos/:id', verifyJWT, (req, res, next) => {
app.get('/alunos/:id', (req, res, next) => {
  const alunoId = req.query.id;
  const destinationUrl = `http://localhost:5000/alunos/${alunoId}`;
  console.log(`Roteando GET de http://localhost:${PORT}/alunos/${alunoId} para ${destinationUrl}`);
  servicesProxy(req, res, next, destinationUrl);
})

app.get('/alunos', verifyJWT, (req, res, next) => {
  console.log(`Roteando GET de http://localhost:${PORT}/alunos para http://localhost:5000/alunos`);
  servicesProxy(req, res, next);
})

// app.put('/alunos/:id', verifyJWT, (req, res, next) => {
app.put('/alunos/:id', (req, res, next) => {
  const alunoId = req.query.id;
  console.log(`Roteando PUT de http://localhost:${PORT}/alunos/${alunoId} para http://localhost:5000/alunos/${alunoId}`);
  servicesProxy(req, res, next);
})

app.delete('/alunos', verifyJWT, (req, res, next) => {
  console.log(`Roteando DELETE de http://localhost:${PORT}/alunos para http://localhost:5000/alunos`);
  servicesProxy(req, res, next);
})

console.log(`Configurando rotas de graduacao`)
app.post('/graduacoes', verifyJWT, (req, res, next) => {
  console.log(`Roteando POST de http://localhost:${PORT}/graduacoes para http://localhost:5000/graduacoes`);
  servicesProxy(req, res, next);
})

app.get('/graduacoes', (req, res, next) => {
  console.log(`Roteando GET de http://localhost:${PORT}/graduacoes para http://localhost:5000/graduacoes`);
  servicesProxy(req, res, next);
})

app.put('/graduacoes', verifyJWT, (req, res, next) => {
  console.log(`Roteando PUT de http://localhost:${PORT}/graduacoes para http://localhost:5000/graduacoes`);
  servicesProxy(req, res, next);
})

app.delete('/graduacoes', verifyJWT, (req, res, next) => {
  console.log(`Roteando DELETE de http://localhost:${PORT}/graduacoes para http://localhost:5000/graduacoes`);
  servicesProxy(req, res, next);
})

app.listen(PORT, () => console.log(`Gateway online on http://localhost:${PORT}`));
