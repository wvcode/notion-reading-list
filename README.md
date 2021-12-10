# Notion Reading List

O notion-reading-list é uma REST API para salvar itens na Reading List do seu notion.

Esta API foi criada para ser utilizada em uma integração do IFTTT (If This Then That).

## Para utilizar

Se você quiser utilizar esta API, faça uma cópia do repositório:

```bash
$ git clone https://github.com/wvcode/notion-reading-list.git
```

Agora, você pode fazer o deploy em qualquer ambiente. O arquivo `Procfile` no repositório que é para auxiliar o deploy no [Heroku](https://heroku.com).

Em qualquer destes ambientes, o importante é realizar a definição de variáveis de ambiente:

```text
NOTION_TOKEN = <Token gerado pelo Notion para a sua integração>
HOST = <base url do servidor>
PORT = <porta aberta no servidor>
APIKEY = <API KEY codificada em base64>
STATUS = <Status da API - Valores aceitos são UP ou DOWN>
DATABASE_ID = <ID do database no Notion>
```
