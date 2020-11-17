# securing-cloud-run-services

![Create GCP Infrastructure](https://github.com/hom-bahrani/securing-cloud-run-services/workflows/Create%20GCP%20Infrastructure/badge.svg)
![Deploy the application to Google Cloud Run](https://github.com/hom-bahrani/securing-cloud-run-services/workflows/Deploy%20the%20application%20to%20Google%20Cloud%20Run/badge.svg)

This example shows how to create a secure two-service application running on Cloud Run. 
We will create dedicated service accounts with minimal permissions for service-to-service 
authentication and service access to the rest of Google Cloud.

The source code within the services themselves is very basic. The front end is a 
basic shopping list app, it captures items that you want to purchase abd these 
are sent to the backend service which will process them and save them in a database. 
The backend service has 2 routes, one to post the items and another to get them.

## Setup

### Enable Google Cloud API's

There are 4 project wide Google Cloud APIs that must be enabled before you start working with this project, these are listed 
in the `setup.sh` helper script. You can either copy and paste this in to your Google Cloud Shell, or if you're working in 
your local terminal ensure you first run `gcloud auth login`

```bash
cd bin 

chmod +x setup.sh && ./setup.sh
```

### Deploy infrastrcuture & code via Github actions.

Within the `.github/workflows/` there are 2 workflows, the first uses the terraform code to create the infrastructure 
in Google Cloud and the second will deploy the souce code in the sample app.

- REACT_APP_BACKEND_URL (The URL of the backend service so the front end can make API calls to it, e.g. https://back-end-kqzlqs7ebq-uc.a.run.app)
- FRONTEND_APP_NAME (name of UI react docker image in container registry, e.g. front-end)
- BACKEND_APP_NAME (name of backend golang docker image in container registry, e.g. back-end)
- PROJECT_ID (your Google Cloud project ID)
- REGION (e.g. us-central1)
- GOOGLE_SA_EMAIL (service account email e.g. gh-actions@<project-id>.iam.gserviceaccount.com)
- GOOGLE_APPLICATION_CREDENTIALS (your service account key)
- FRONTEND_SERVICE_NAME  (name for frontend cloud run service, e.g. front-end)
- BACKEND_SERVICE_NAME (name for backend cloud run service, e.g. back-end)
- ZONE (e.g. us-central1-c)
- REPO_ACCESS_TOKEN (Github Access Token - required to create a Repository Dispatch at the end of terraform.yml github action)
- AUTHORISER_APP_NAME
- AUTHORISER_SERVICE_NAME
- BACKEND_UPSTREAM_RENDER_URL