variable "service_name" {
  type    = string
  default = "auth"
}

variable "project" {
  type = string
}

variable "gcp_region" {
  type = string
}

variable "backend_upstream_render_url" {
  type = string
}
