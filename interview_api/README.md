# interview_api

## Curl requests

- POST - "/login"

```sh
curl -X POST \
  http://localhost:8000/login \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "admin",
    "password": "admin"
}'
```