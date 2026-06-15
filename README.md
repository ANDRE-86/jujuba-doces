# 🍰 Jujuba Doces - Catálogo e Orçamento Mobile

Site mobile first para cardápio, montagem de orçamento e agendamento de entrega/retirada.

## Funcionalidades

- Catálogo de produtos via `produtos.csv`
- Busca por produto
- Filtro por categoria
- Carrinho de orçamento
- Cadastro básico do cliente
- Calendário para data da festa
- Calendário e horário para entrega ou retirada
- Envio do orçamento pelo WhatsApp
- Publicação gratuita via GitHub Pages

## Arquivos

```txt
index.html
produtos.csv
README.md
```

## Como alterar preços

Edite o arquivo `produtos.csv`.

Campos principais:

```csv
id,categoria,produto,preco,unidade,quantidade_minima,descricao,imagem,ativo
```

Use `ativo` como `1` para mostrar o produto no site e `0` para ocultar.

## Publicar no GitHub Pages

1. Crie um repositório público no GitHub.
2. Envie `index.html`, `produtos.csv` e `README.md` na raiz.
3. Vá em **Settings > Pages**.
4. Selecione **Deploy from a branch**.
5. Escolha `main` e `/root`.
6. Salve e aguarde o link do site.

## Próximas melhorias

- Bloqueio de datas indisponíveis
- Agenda administrativa
- Geração de PDF
- Banco de dados
- Login administrativo
- Pagamento via Pix
