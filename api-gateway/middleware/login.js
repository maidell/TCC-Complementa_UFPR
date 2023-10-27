const jwt = require("jsonwebtoken");
const httpProxy = require("express-http-proxy");

const authBodyDecorator = function (bodyContent, srcReq) {
  try {
    console.log(bodyContent);
    // let retBody = {};
    // retBody.email = bodyContent.email;
    // retBody.senha = bodyContent.senha;
    // bodyContent = retBody;
  } catch (e) {
    console.log(`ERRO! ${e}`);
  }
  return bodyContent;
};

const authHeadersDecorator = function (proxyReqOpts, srcReq) {
  proxyReqOpts.headers["Content-Type"] = "application/json";
  proxyReqOpts.method = "POST";
  return proxyReqOpts;
};

const authResponseDecorator = function (
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
        expiresIn: "2 days" ,
      });
      let objRet = {
        id: objBody.id,
        nome: objBody.nome,
        email: objBody.email,
        senha: null,
        perfil: objBody.perfil,
      };
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
    return userRes.status(401).json({ message: "Login inválido!" });
  }
};

const loginServiceProxy = httpProxy(`${process.env.AUTH_SERVICE_HOST}`, {
  // proxyReqBodyDecorator: authBodyDecorator,
  proxyReqOptDecorator: authHeadersDecorator,
  userResDecorator: authResponseDecorator,
});

const logout = (req, res) => {
  return res.json({ auth: false, token: null });
};

//exporting module
module.exports = {
  loginServiceProxy,
  logout,
};
