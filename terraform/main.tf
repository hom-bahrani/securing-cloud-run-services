terraform {
  backend "gcs" {}
}

provider "google" {
  credentials = var.credentials
  project     = var.project
  region      = var.gcp_region
}

resource "google_project_service" "run" {
  service = "run.googleapis.com"
}

resource "google_cloud_run_service" "demo-service" {
  name     = var.service-name
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

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.demo-service.location
  project  = google_cloud_run_service.demo-service.project
  service  = google_cloud_run_service.demo-service.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
