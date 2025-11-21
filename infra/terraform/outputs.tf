output "alb_dns_name" {
  description = "Public URL of the Application Load Balancer"
  value       = aws_lb.api.dns_name
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.this.name
}

output "ecs_service_name" {
  value = aws_ecs_service.app.name
}
