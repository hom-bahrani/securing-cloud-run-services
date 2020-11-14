resource "google_project_service" "run" {
  service = "run.googleapis.com"
}

resource "google_cloud_run_service" "back_end" {
  name     = var.service_name
  location = var.gcp_region

  template {
    spec {
      containers {
        image = "gcr.io/cloudrun/hello"
      }
    }
  }

  autogenerate_revision_name = true

  traffic {
    percent         = 100
    latest_revision = true
  }
}
