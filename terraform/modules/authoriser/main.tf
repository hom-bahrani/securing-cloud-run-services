resource "google_project_service" "run" {
  service = "run.googleapis.com"
}

resource "google_cloud_run_service" "authoriser" {
  name     = var.service_name
  location = var.gcp_region

  template {
    spec {
      containers {
        image = "gcr.io/cloudrun/hello"
        env {
          name  = "BACKEND_UPSTREAM_RENDER_URL"
          value = var.backend_upstream_render_url
        }
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
  location = google_cloud_run_service.authoriser.location
  project  = google_cloud_run_service.authoriser.project
  service  = google_cloud_run_service.authoriser.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_service_account" "authoriser-sa" {
  account_id   = "authoriser-sa"
  display_name = "authoriser-sa"
}

resource "google_project_iam_member" "authoriser" {
  project = var.project
  role    = "roles/run.invoker"
  member  = "serviceAccount:${google_service_account.authoriser-sa.email}"
}
