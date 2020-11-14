output "courses-svc-url" {
  value = google_cloud_run_service.demo-service.status[0].url
}