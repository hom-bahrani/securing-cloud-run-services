# terraform-gcp-cloudrun-actions

![Create GCP Infrastructure](https://github.com/hom-bahrani/securing-cloud-run-services/workflows/Create%20GCP%20Infrastructure/badge.svg)
![Deploy the application to Google Cloud Run](https://github.com/hom-bahrani/securing-cloud-run-services/workflows/Deploy%20the%20application%20to%20Google%20Cloud%20Run/badge.svg)

### Enable Google Cloud API's

There are 3 project wide Google Cloud APIs that must be enabled before you start working with this project, these are listed 
in the `setup.sh` helper script. You can either copy and paste this in to your Google Cloud Shell, or if you're working in 
your local terminal ensure you first run `gcloud auth login`

```bash
cd bin 

chmod +x setup.sh && ./setup.sh
```

### Deploy infrastrcuture & code via Github actions.

Within the `.github/workflows/` there are 2 workflows, the first uses the terraform code to create the infrastructure 
in Google Cloud and the second will deploy the souce code in the sample app.

- APP_NAME (name of docker image in container registry)
- PROJECT_ID (your Google Cloud project ID)
- REGION (e.g. us-central1)
- GOOGLE_SA_EMAIL (service account email e.g. gh-actions@<project-id>.iam.gserviceaccount.com)
- GOOGLE_APPLICATION_CREDENTIALS (your service account key)
- SERVICE_NAME (name for cloud run service)
- ZONE (e.g. us-central1-c)