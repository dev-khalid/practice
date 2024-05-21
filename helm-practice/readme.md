## Basic commands
1. First we need to check if everything is working or not with raw yaml files.
2. Then run : `helm create <directory-name>`
3. To install on your helm instance: `helm install <instance-name> <directory-name>/`
4. To check list of helm instances: `helm ls`
5. To uninstall helm instance: `helm uninstall <instance-name>`
6. If any configuration has been changed, to reflect that: `helm upgrade <instance-name> <directory-name>/`
7. To take values from a specific values.yaml file: `helm install/upgrade <instance-name> <directory-name>/ --values <path-of-that-values.yaml>`
Example: ``helm upgrade webapp-dev webapp/ --values values-dev.yaml``
8. To get all the list of helm instances from all the namespaces: `helm ls --all-namespaces`

## Accessing it
`minikube tunnel`
`minikube service <service-name> --url`

## Create dev/prod
``
k create namespace dev
k create namespace prod
helm install mywebapp-release-dev webapp/ --values webapp/values.yaml -f webapp/values-dev.yaml -n dev
helm install mywebapp-release-prod webapp/ --values webapp/values.yaml -f webapp/values-prod.yaml -n prod
helm ls --all-namespaces
``
