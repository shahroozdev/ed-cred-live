!#/bin/bash
set +xe

# curl -X POST http://localhost:6969/auth/login/ -d '{"identifier":"haseebK@gmail.com","password":"pro"}' -H 'Content-Type: application/json'
# curl -X GET http://localhost:6969/auth/profile/ \
    #--header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJoYXNlZWJLIiwiZW1haWwiOiJoYXNlZWJLQGdtYWlsLmNvbSIsImlhdCI6MTc0Mzc0MTkwMCwiZXhwIjoxNzQzNzQ1NTAwfQ.5-l7U2me-wwIVKAtEC19BTMiKwBvjz-4RmYyMYa1syQ"

curl -X GET http://localhost:6969/posts/
