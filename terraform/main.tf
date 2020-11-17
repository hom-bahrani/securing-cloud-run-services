terraform {
  backend "gcs" {}
}

provider "google" {
  credentials = var.credentials
  project     = var.project
  region      = var.gcp_region
}

module "front_end" {
  source = "./modules/frontend"

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

  project    = var.project
  gcp_region = var.gcp_region
}
