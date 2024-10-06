## Helm official Documentation

#### Quickstart: 
  Chart repository are stored in "Artifacts hub".
  Then we can add the chart repository in our `local repository`. 
  `Chart` is like a blueprint.
  To create an actual instance from the chart we have to add it first then install it.
  Then we call the instance which is installed from chart a `release`.

#### Using Helm: 
  We can find charts in hub or in repo, there are two different command for this.
  1. helm search hub 2. helm search repo
  We can customize the chart values before installing.
  Helm can install from several resources: 1. Chart repository 2. Local chart archive (mysql.tgz) 3. from url (https:/ex...mysql.tgz) 4. from a chart directory.
  To change config or make some new changes applicable we use `helm upgrade` 
  We can see history of a helm release by `helm history <release-name>`
  To keep repo up to date: `helm repo update`

#### Topics > Charts
  To view charts without installing it `helm pull chartrepo/chartname`.
  To download dependency files `helm dependency update`
#### Chart development > Getting started
  To see what's loaded by the template engine `helm get manifest <release-name>`
  So we could read {{ .Release.Name }} as "start at the top namespace, find the Release object, then look inside of it for an object called Name".
  Without installing template we can check the final values/rendered templates etc by `helm install --debug --dry-run <release-name> ./mychart`