## Executando o Projeto

### First step: <br>
Run ```npm install```

### Front-End | Angular

Para iniciar o servidor Angular, execute o seguinte comando no terminal:
```ng serve```


### Back-End | SpringBoot

Pra iniciar o docker
```docker ps -a```<br>
Copia o id do container que tu vai usar<br>
Rode:
```docker start <numero copiado>```<br>
Rode: ```docker ps```
 pra garantir que deu certo

0. Rode o seguinte comando no terminal:<br>
```sudo docker run -p 5432:5432 --name postgreSQL -e POSTGRES_PASSWORD="postgres" -d postgres postgres```

1. Configure o arquivo `.env` usando o modelo fornecido em `.env.example`. Siga os passos:

   - Navegue até o caminho: `tcc-complementa/api-gateway/
   - Ctrl+c | Ctrl+v do arquivo `.env.example`.
   - Abra o arquivo `.env` e altere as seguintes variáveis:

     ```
     ACCESS_TOKEN_SECRET="<coloque qualquer coisa aqui entre aspas duplas>"
     REFRESH_TOKEN_SECRET="<coloque qualquer coisa aqui entre aspas duplas>"
     ```
2. No caminho `tcc-complementa/server/complementa-ufpr/src/main/java/br/ufpr/`, siga estas etapas:

- Clique com o botão direito do mouse em `ComplementaUfprApplication.java`.
- Selecione a opção "Run Java" para iniciar o servidor back-end.
  ###### Se for rodar direto no terminal, seguindo o mesmo caminho é so rodar o comando:
  ###### * pode não funcionar, a opção do 'run java' é mais confiavel
  ```
  /usr/bin/env /usr/lib/jvm/java-11-openjdk-amd64/bin/java @/tmp/cp_296p3sivn2c6de6izrvlaf1v2.argfile br.ufpr.ComplementaUfprApplication
  ```

3. No terminal, dentro da pasta `/api-gateway`, execute o seguinte comando para iniciar o servidor back-end:
<br>```node gateway.js```<br>
* Se algo falhar, rode: ```npm install dotenv-safe```


Se nada der certo chama o Guibor no whatsapp!
