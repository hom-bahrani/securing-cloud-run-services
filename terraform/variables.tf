variable "project" {
  type = string
}

variable "credentials" {
  description = "Credentials to be used for creating infrastructure"
  type        = string
}
variable "gcp_region" {
  type    = string
  default = "us-central1"
}

variable "service-name" {
  type    = string
  default = "demo-service"
}

variable "bucket" {
  description = "Name of bucket used for storing terraform state"
  type        = string
}
