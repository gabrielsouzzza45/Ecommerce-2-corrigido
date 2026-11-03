# TAREFA-ECOMMERCE-2
## Como rodar no bash
```bash
npm install
npm run prisma:migrate
npm run prisma:seed
npm run dev
```
A API sobe em `http://localhost:3000`. Teste com:
```bash
curl -X POST http://localhost:3000/orders \
-H "Content-Type: application/json" \
-d '{
"customer": "cliente@ethereal.email",
"items": [{ "productId": 1, "quantity": 1 }],
"paymentMethod": "credit_card",
"paymentDetails": { "cardNumber": "1234567812345678", "cvv": "123" }
}'
```

Produto `1` é o livro físico (R$ 100 + R$ 10 de frete), produto `2` é o e-book (R$ 50, sem frete). Formas de pagamento: `credit_card`, `debit_card` e `pix`. 

## Como rodar no bash usando dotenv

No teu ficheiro `.env`, garante que a variável `APP_ENV` está configurada para o ambiente desejado:

```env
# APP_ENV=dev   -> Usa o Prisma e a base de dados real
# APP_ENV=test  -> Usa o repositório em memória
```

Com o `.env` configurado, corre os seguintes comandos no terminal:

```bash
npm install
npm run dev
```

A API sobe em `http://localhost:3000`. Teste com:

Exemplo 1: Produto 1 (Livro Físico: R$ 100 + R$ 10 de frete) com Cartão de Crédito
```bash
curl -X POST http://localhost:3000/orders \
-H "Content-Type: application/json" \
-d '{
  "customer": "cliente@ethereal.email",
  "items": [{ "productId": 1, "quantity": 1 }],
  "paymentMethod": "credit_card",
  "paymentDetails": { "cardNumber": "1234567812345678", "cvv": "123" }
}'
```

Exemplo 2: Produto 2 (E-book Digital: R$ 50, sem frete) com Pix

```bash
curl -X POST http://localhost:3000/orders \
-H "Content-Type: application/json" \
-d '{
  "customer": "cliente@ethereal.email",
  "items": [{ "productId": 2, "quantity": 1 }],
  "paymentMethod": "pix"
}'
```

Formas de pagamento suportadas: `credit_card`, `debit_card` e `pix`.
