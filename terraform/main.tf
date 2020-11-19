terraform {
  backend "gcs" {}
}

provider "google" {
  credentials = var.credentials
  project     = var.project
  region      = var.gcp_region
}

resource "google_project_service" "compute" {
  service    = "compute.googleapis.com"
}

resource "google_project_service" "cloudresourcemanager" {
  service    = "cloudresourcemanager.googleapis.com"
}

resource "google_project_service" "serviceusage" {
  service    = "serviceusage.googleapis.com"
}

resource "google_project_service" "iam" {
  service    = "iam.googleapis.com"
}

resource "google_project_service" "container_registry" {
  service    = "containerregistry.googleapis.com"
  disable_dependent_services = true
}

resource "google_project_service" "cloud_run" {
  service    = "run.googleapis.com"
}

resource "google_project_service" "cloud_build" {
  service    = "cloudbuild.googleapis.com"
}

resource "google_project_service" "firebase" {
  service    = "firebase.googleapis.com"
  disable_dependent_services = true
}

resource "google_project_service" "firestore" {
  service    = "firestore.googleapis.com"
}

resource "google_project_service" "source_repo" {
  service    = "sourcerepo.googleapis.com"
}


module "front_end" {
  source = "./modules/frontend"

  react_app_authoriser_url = module.authoriser.authoriser_url
  project    = var.project
  gcp_region = var.gcp_region
}

module "back_end" {
  source = "./modules/backend"

  project    = var.project
  gcp_region = var.gcp_region
}

module "authoriser" {
  source = "./modules/authoriser"

  backend_upstream_render_url = module.back_end.backend_url
  project    = var.project
  gcp_region = var.gcp_region
}
