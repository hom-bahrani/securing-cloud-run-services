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


resource "google_service_account" "backend-sa" {
  account_id   = "backend-sa"
  display_name = "backend-sa"
}

resource "google_project_iam_member" "backend_binding" {
  project = var.project
  role    = "roles/datastore.user"
  member  = "serviceAccount:${google_service_account.backend-sa.email}"
}
