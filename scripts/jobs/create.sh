#!/bin/bash

API="http://localhost:4741"
URL_PATH="/jobs"
TITLE="testing title"
URL="www.google.com"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  # --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "job": {
      "title": "'"${TITLE}"'",
      "url": "'"${URL}"'",
    }
  }'

echo
