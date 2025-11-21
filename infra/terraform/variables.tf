variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-east-2"
}

variable "app_name" {
  description = "Base name used for ECS, ALB, etc."
  type        = string
  default     = "theacquisitions-api"
}

variable "ecr_repo_url" {
  description = "Full ECR repo URL WITHOUT tag. Example: 123456789012.dkr.ecr.us-east-2.amazonaws.com/theacquisitions-api"
  type        = string
}

variable "container_port" {
  description = "Port that the container listens on"
  type        = number
  default     = 3000
}

variable "database_url" {
  description = "Postgres connection string"
  type        = string
}

variable "arcjet_key" {
  description = "Arcjet API key"
  type        = string
}

