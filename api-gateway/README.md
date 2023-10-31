# BANTADS API Gateway

## Gerais
### Login
  - POST - `localhost:3000/login`
  - Body - `{"email": "teste@email.com", "senha": "123456"}`

### Logout
  - POST - `localhost:3000/logout`

## **OBS: Daqui pra baixo todas as requisições precisam do Header**
  - **`x-access-token: token`**

## **OBS2: A medida que definir os body dos retornos eu repasso aqui/subo os diretórios**
## Requisições de Cliente

### Auto-Cadastro
  - POST - `localhost:3000/clientes`
  - Body - objeto cliente
### Busca Cliente por ID
  - GET - `localhost:3000/clientes/:idCliente`
### Alteração do cliente
  - PUT - `localhost:3000/clientes/:idCliente`
  - Body - objeto cliente
### Saldo da conta do Cliente
  - GET - `localhost:3000/contas/:idConta/saldo`
### Saque da conta do Cliente 
  - POST - `localhost:3000/contas/:idConta/saque`
  - Body - `{"valor": 9999.00}`
### Depósito na conta do Cliente
  - POST - `localhost:3000/contas/:idConta/deposito`
  - Body - `{"valor": 9999.00}`
### Transferência da conta do Cliente para outra 
  - POST - `localhost:3000/contas/:idConta/transferencia?destino=<numero da Conta Destino>`
  - Body - `{"valor": 9999.00}`

## Requisições de Gerente
### Contas pendentes de aprovacao
  - GET - `localhost:3000/gerentes/:idGerente/contaspendentes`
### Aprovar cliente
  - PUT - `localhost:3000/gerentes/:idGerente/aprovarcliente?id_cliente=<Id do cliente>`
### Rejeitar cliente
  - PUT - `localhost:3000/gerentes/:idGerente/rejeitarcliente?id_cliente=<Id do cliente>`
### Consultar todos os clientes
  - GET - `localhost:3000/gerentes/:idGerente/meusclientes`
### Consultar TOP 5 clientes
  - GET - `localhost:3000/gerentes/:idGerente/top5clientes`

## Requisições de Admin

### Inserção de gerente
  - POST - `localhost:3000/gerentes`
  - Body - objeto gerente
### Remoção de gerente
  - DELETE - `localhost:3000/gerentes/:idGerente`
### Listagem de Gerentes
  - GET - `localhost:3000/gerentes`
### Alteração de Gerentes
  - PUT - `localhost:3000/gerentes/:idGerentes`
  - Body - objeto gerente
### Listagem de todos os clientes
  - GET - `localhost:3000/clientes`
