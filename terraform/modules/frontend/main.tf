resource "google_project_service" "run" {
  service = "run.googleapis.com"
}

resource "google_cloud_run_service" "front_end" {
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

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.front_end.location
  project  = google_cloud_run_service.front_end.project
  service  = google_cloud_run_service.front_end.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_service_account" "frontend-sa" {
  account_id = "frontend-sa"
  display_name = "frontend-sa"
}

resource "google_project_iam_member" "frontend_binding" {
  project = var.project
  role    = "roles/run.invoker"
  member  = "serviceAccount:${google_service_account.frontend-sa.email}"
}
