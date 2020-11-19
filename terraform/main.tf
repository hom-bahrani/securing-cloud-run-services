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
