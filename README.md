# securing-cloud-run-services

![Create GCP Infrastructure](https://github.com/hom-bahrani/securing-cloud-run-services/workflows/Create%20GCP%20Infrastructure/badge.svg)
![Deploy the application to Google Cloud Run](https://github.com/hom-bahrani/securing-cloud-run-services/workflows/Deploy%20the%20application%20to%20Google%20Cloud%20Run/badge.svg)

This example shows how secure microservices running on Google Cloud Run. 
We will create dedicated service accounts with minimal permissions for service-to-service 
authentication.

![](secure.png)

The source code within the services themselves is very basic, just to illustrate the concept. The front end captures user
input and sends these to the backend service. Because the backend service is secure and cannot be accessed directly from 
the internet, we have an authentication middlesware service in between these services that generates a Google Authentication token. 
This allows data from the front end to be passed to the backend.

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
in Google Cloud and the second will deploy the souce code in the sample app. You will need to enter in these environment 
variables as repository secrets for the pipelines to work.


| Github Secret                       | Description                         | Example                                        |
| ----------------------------------- | ----------------------------------- | ---------------------------------------------- |
| AUTHORISER_APP_NAME                 | Authoriser docker image in GCR      | auth                                           |
| AUTHORISER_SERVICE_NAME             | Cloud Run authoriser service name   | auth                                           |
| BACKEND_APP_NAME                    | Backend docker image in GCR         | back-end                                       |
| BACKEND_SERVICE_NAME                | Cloud Run backend service name      | back-end                                       |
| BACKEND_UPSTREAM_RENDER_URL         | URL of the backend service          | https://back-end-kqzlqs7ebq-uc.a.run.app       |
| FRONTEND_APP_NAME                   | React docker image in GCR           | front-end                                      |
| FRONTEND_SERVICE_NAME               | Cloud Run frontend service name     | front-end                                      |
| GOOGLE_APPLICATION_CREDENTIALS      | Github actions service account key  | <>                                             |
| GOOGLE_SA_EMAIL                     | Github actions service account email| gh-actions@demo-project.iam.gserviceaccount.com|
| PROJECT_ID                          | Google project ID                   | demo-project                                   |
| REACT_APP_AUTHORISER_URL            | URL of the authoriser service       | https://authoriser-kqzlqs7ebq-uc.a.run.app     |
| REGION                              | Google Cloud Region                 | us-central1                                    |
| REPO_ACCESS_TOKEN                   | Github Access Token *               | <>                                             |
| ZONE                                | Google cloud zone                   | us-central1-c                                  |

*required to create a Repository Dispatch at the end of terraform.yml github action. Repository Dispatch is used to ensure that the terraform action runs before the deploy action. You must first create a Github personal access token then save it in your secrets, [more info on repository dispath here.](https://github.com/marketplace/actions/repository-dispatch) and [creating a personal access token here](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)