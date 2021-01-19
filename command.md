curl -i -X POST -H "Content-Type: application/json" -d '{"min":5, "max":20}' http://localhost:6880/party

curl -i -X PUT -H "Content-Type: application/json" --data "10" http://localhost:6880/party/current

curl -i -X GET -H "Content-Type: application/json" http://localhost:6880/scores

curl -i -X GET -H "Content-Type: application/json" http://localhost:6880/party/current
