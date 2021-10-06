output "base_url" {
  description = "Url para testes"

  value = aws_apigatewayv2_stage.lambda.invoke_url
}

