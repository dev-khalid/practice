1. `helm repo add <chart-name> <https://chat-location>` | Download and stores the chart in local machine.
2. `helm repo search <chart-name>`
3. `helm repo update`
4. `helm repo install <chart-name> --generate-name`
5. `helm show chart <chart-name>`
6. `helm show all <chart-name>`
7. `helm list` | What is being released using Helm.
8. `helm uninstall <name-of-the-release>`
9. `helm uninstall <name-of-the-release> --keep-history`
10. `helm status <name-of-the-release>`
11. `helm install <preferred-release-name> <name-of-the-chart>`
12. `helm search repo` | It will show all the available repositories that's stored in the local-machine.
13. `helm show values <chart-name>`

To continue: https://helm.sh/docs/intro/using_helm/

Using helm: 
1. `helm upgrade <release> bitnami/mysql -f </path/to/values.yml>` | It will upgrade existing helm release with new values.

Chart development: 
1. `helm get manifest <release-name>` | Shows what's loaded by the template engine.
2. `helm install --debug --dry-run <release-name> ./mychart` | Shows final values that is computed and final rendered template by template-engine.
