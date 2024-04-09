register: nome, cpf, senha, profissao

login: nome e senha

curl -X POST \
  http://localhost:8000/login \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "admin",
    "password": "admin"
}'