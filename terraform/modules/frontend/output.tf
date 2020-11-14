output "frontend_url" {
  value = google_cloud_run_service.front-end.status[0].url
}
