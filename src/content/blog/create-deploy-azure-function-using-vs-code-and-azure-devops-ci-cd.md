---
title: "Create & Deploy Azure Function ⚡ using VS code and Azure DevOps (CI/CD)"
description: "Create & Deploy Azure Function ⚡ using VS code and Azure DevOps (CI/CD)"
pubDate: "2019-03-30"
updatedDate: "2019-08-19"
---

> Azure Function 🚀 is Microsoft faas (function as a service) offering. Where you can build apps without worrying about server and infrastructure that scale to meet demands. You can use your choice of programming language.

Let's get started... 

##### Pre-requisites 
1. Azure Devops Account ([Get for Free](https://azure.microsoft.com/en-us/services/devops)) 
2. Azure Account ([Sign up for Free](https://azure.com/free))
3. Visual Studio Code ([Download](https://code.visualstudio.com/download))

*This article is quite long. please feel free to jump to the desired section*
> 1. <a href="#CreateDevopsProject">Create an Azure DevOps Project</a>
1. <a href="#CreateFunction">Create Azure function locally</a>
1. <a href="#AddARM">Add Azure Resource Manager (ARM) Template </a>
1. <a href="#git">Push code to git Repository</a>
1. <a href="#CI">Create Build / CI (Continuous Integration) Pipeline</a>
1. <a href="#CD">Create Release / CD (Continuous Delivery) Pipeline</a>

1. <h6 id="CreateDevopsProject">Create an Azure DevOps Project</h6>
Follow the below steps to Create a new Azure DevOps Project:
 1. Login to Your Azure DevOps tenant http://dev.azure.com/[username]
 replace [Username with your tenant name] e.g http://dev.azure.com/usmslm102
 1. Click on **Create Project** and Provide the required details
  ![Create Account](https://i.imgur.com/zj4mHid.png) 
 1. Once the project is created you will be redirected to welcome page.
  ![](https://i.imgur.com/RxpBzOL.png) 
<hr/>

1. <h6 id="CreateFunction">Create Azure function locally</h6>
 Follow the below steps to create and run azure function locally
  1. Open Visual Studio Code and install `Azure Functions` and `C#` extensions if you already have it installed then skip.
  1. click on extensions from the sidebar and search for `Azure Functions` and click on the install button
       ![](https://i.imgur.com/qjUC4mT.png)
  2. Search for `C#` extension and click install
 * Create a new folder named AzureFunctions and open in vs code
 * Press `ctrl/cmd (on MAC) + shift + p` and type `Create Function`
       ![](https://i.imgur.com/xgmsHbn.png)
 * Select *Create Function* and select current folder
 * You will get a prompt saying "The selected folder is not a function app project. Initialize Project?" click Yes
 * Select C# as a language
       ![](https://i.imgur.com/I7zfTxu.png)
 * VS code will initialize function app and will ask to select the function template
 * Select HttpTrigger and press enter with default "HttpTriggerCSharp" function name and "Company.Function" for namespace
 * Select Access Rights as Function and press enter
 * Press F5 to test our function locally and copy the function URL
       ![](https://i.imgur.com/Ewwv33c.png)
 * Navigate to copied URL and provide the parameter called name e.g. `?name=World`
       ![](https://i.imgur.com/Pqx2pyU.png)
 * Voila, our function is up and running 😱
<hr>
1. <h6 id="AddARM">Add Azure Resource Manager (ARM) Template</h6>

 We need to create Azure Resources before deploying our function. we will use ARM template to create below Azure resources.
  1. Azure Function App
  1. Azure Storage Account
  1. Consumption app service plan
<br/>

 Below ARM template will create all 3 resources:

 1. Create a functionapp.json file inside folder Templates and paste below content

     **functionapp.json**
  [Embedded gist](https://gist.github.com/usmslm102/6d97eb86747e7c1c38f2903809cd32f8.js)

 2. Create a functionapp.parameters.json file inside folder Templates and paste below content

     <p id="functionappparameter"><b>functionapp.parameters.json</b></p>
  [Embedded gist](https://gist.github.com/usmslm102/d8cba1c64c7a58ce421be3089ad5bdf1.js)
  Note: Change the appName value to unique name in **functionapp.parameters.json**

     Final folder structure looks like below:

     ![](https://i.imgur.com/lVCju00.png)

<hr>
4. <h6 id="git">Push code to git Repository</h6>

 We are all set to push the code to our git repository. When we created Azure DevOps project we get the default git repository same as the project name. 
Navigate to Azure DevOps project and click on Repos on the left navigation. You will see we have an empty repository named "AzureFunction" same as our project name.
![](https://i.imgur.com/J4deDHD.png)

 There are several ways to push our code changes to a remote repository:

 1. Clone remote repository to your computer and start adding files
 2. Push existing local repository to remote repository

 As we have already created our project lets use 2nd option and push our project to a remote repository. 
Open your favorite command prompt and navigate to our project folder or as we are using VS code we can use it's integrated terminal press ``ctrl + ` `` to open it.

 > Copy the git remote push command from Azure DevOps Repos page. 

  `` > git init ``
  `` > git add . ``
  `` > git commit -am "Add function app" ``
  `` > git remote add origin <git Repo Url>``
  `` > git push -u origin --all``

  ![](https://i.imgur.com/B2lkV1a.png)

 Refresh your Azure DevOps Repos page and you should see the function app files. 😎

 ![](https://i.imgur.com/0B1V702.png)
<hr>
5. <h6 id="CI">Create Build / CI (Continuous Integration) Pipeline</h6>

 Our Repository contains the source code for function app which needs to be compiled before publishing to Azure. As our function app is .net core project let's create the CI pipeline to build function app project and publish the required artifices.  

 1. Navigate to Azure DevOps project and click on build under pipelines. currently, we don't have any CI Pipeline. Let's create one. click on **New Pipeline** button. 

 1. Azure DevOps will ask us where our source code resides. Azure DevOps supports multiple SCM providers such as Azure Repos, GitHub, BitBucket, Subversion etc. As our source code is hosted on Azure Repos select "Azure Repos Git" and provide the required details and click on continue button.

     ![](https://i.imgur.com/r5z47sF.png)
 1. click on "Empty Job" as we will define our tasks
 1. As our function based on .net core let's add restore, build and publish task to generate our build artifacts
 1. Click on "+" button and search for `.net core` task and click on add button. Select .NET core task and change values as follows dotnet restore:
   ![](https://i.imgur.com/b571FVS.png)
 1. **dotnet restore:** 
     * Display name: `dotnet restore`
     * Command: `restore`
     * Path to project(s): `**/*.csproj`<br/>
  *This step will restore the nuget packages for our project*
 1. Repeat above step for Build and publish task
 1. **dotnet build:** 
     * Display name: `dotnet build`
     * Command: `build`
     * Path to project(s): `**/*.csproj`<br/>
 *This step will build our project*
 1. **dotnet publish:** 
     * Display name: `dotnet publish`
     * Command: `publish`
     * Un-Checked: Publish Web Projects
     * Path to project(s): `**/*.csproj`
     * Arguments: `--no-restore --configuration Release --output $(Build.ArtifactStagingDirectory)`
     * Checked: Zip Published Projects
     * Checked: Add project name to publish path<br/>
*This step will take our build files and zip it and put in ArtifactStagingDirectory*
 1. Now we need to published the compiled code and ARM templates as build artifacts so we can use these packages in our Release pipeline. Click on '+' and search for task `publish build Artifacts`. select the task and click add
     * Display name: `Publish Artifact: drop`
     * Path to publish: `$(Build.ArtifactStagingDirectory)`
     * Artifact name: `drop`
     * Artifact publish location: `Azure Pipelines/TFS`<br/>
*This step will take our zip files from ArtifactStagingDirectory and publish it to Azure Pipelines build artifacts in the drop folder*
 1. Let's publish our ARM templates to drop folder as well. Click on '+' and search for task `publish build Artifacts`. select the task and click add
     * Display name: `Publish ARM: drop`
     * Path to publish: `Templates`
     * Artifact name: `drop`
     * Artifact publish location: `Azure Pipelines/TFS`<br/>
*This step will take our ARM files from SourceDirectory and publish it to Azure Pipelines build artifacts in the drop folder*
 1. Our final pipeline looks like:
  ![](https://i.imgur.com/m0HDSkF.png)
 1. Let's Save and queue our pipeline. click on "Save & Queue" drop down from the top and select Agent pool: "Hosted VS2017" and Branch: "master" then click on the button "Save & Queue". Azure DevOps will find the available agent and run our tasks.
 1. Navigate to builds pipeline page from left navigation and select our build pipeline. we can see all our build on this page. click on latest build. It will show us the logs of the specified tasks in our build pipeline. on top right click on **Artifacts** drop down and select `drop`. It will open artifacts explorer. expand drop folder and we can see our ARM template and compiled function app in the zip package. We will use these artifacts in our Release pipeline.

     ![](https://i.imgur.com/WUrHgBD.png)

 1. We don't want every-time to open Azure DevOps and click on queue button to build our code changes. we want if our code changes then the build should automatically trigger. Let's enable Continuous integration to achieve this.<br/>
      Edit our build pipeline and navigate to **Triggers** tab and check *"Enable continuous integration"* and select master as branch filter and click on the *Save & queue* drop down and select **Save**.
     ![](https://i.imgur.com/1veR6y9.png)
 1. We are done with our CI pipeline and we are getting build artifacts as well. let's use these artifacts and deploy to Azure using Release/CD pipeline 

<hr>
6. <h6 id="CD">Create Release / CD (Continuous Delivery) Pipeline</h6>

 Our Repository contains the source code for function app which needs to be compiled before publishing to Azure. As our function app is .net core project let's create the CI pipeline to build function app project and publish the required artifices.

 1. Navigate to Azure DevOps project and click on **Releases** under pipelines. currently, we don't have any CD Pipeline. Let's create one. click on New Pipeline button.
 2. Azure DevOps will ask us to select a pre-defined template. As we will define our own tasks let start with an Empty Job.
 3. Click on Empty Job.
 4. We have to define the deployment stage. type stage name as `Production` and close the pop-up by clicking on x.
  ![](https://i.imgur.com/c3oEkL8.png)
 5. We need to tell our release pipeline from where to get the deployment artifacts. click on big "Add an artifact" button.
 6. Select source type as Build and select our build pipeline in **"Source (build pipeline)"** section.
 ![](https://i.imgur.com/xG70B2E.png)
 7. select **Default version** as Latest. so that every release will take the latest artifacts by default.
 8. click on the **Add** button.
 9. Before we define our deployment tasks lets enable the Continuous deployment trigger to automatically deploy our changes as soon as new build artifacts are available. click on the ⚡ icon and enable **Continuous deployment trigger** and close the pop-up by clicking on x.
  ![](https://i.imgur.com/nmpRLy0.png)
 10. Let's define our tasks by clicking on "1 job, 0 task" link under our production stage. This will open the task window same as build pipeline.
  ![](https://i.imgur.com/rG6ZxiI.png)
 11. We need to create two tasks first we have to create Azure function app and its dependencies using our ARM template then we will deploy Azure function package on it.
 12. click on "+" and search for `Azure Resource Group Deployment` and click add. This step needs our Azure account details and ARM template files
     * **Azure subscription:** select Azure subscription from drop down.  if required click on the Authorize button to configure an Azure service connection.
     * **Action:** `Create or update resource group`
     * **Resource group:** type `AzureFunction` as 
     * **Location:** `East US`
     * **Template location:** Linked artifact
     * **Template:** click on `...` and select functionapp.json from drop folder. final URL will like this *$(System.DefaultWorkingDirectory)/_AzureFunction-CI/drop/functionapp.json*
     * **Deployment mode:** `Incremental`<br/>
*This step will deploy our ARM template to create function app and its dependencies in the defined Resource group under defined subscription*
        ![](https://i.imgur.com/eiPKoAM.png)
 13. click on "+" and search for `Azure App Service Deploy` and click add. This step needs our Azure account details and zip package file.
     * **Azure subscription:** select Azure subscription from drop down. if required click on the Authorize button to configure an Azure service connection.
     * **App Service type:** `Function App on Windows`
     * **App Service name:** type app Name which you specified in the <a href="#functionappparameter">functionapp.parameters.json</a> file under *Add Azure Resource Manager (ARM) Template* section.
     * **Package or folder:** `$(System.DefaultWorkingDirectory)/**/*.zip`
   ![](https://i.imgur.com/B8mvmQ0.png)
 14. Before we save our pipeline lets rename it to `AzureFunction-CD` and click on **Save** button.
 15. Let's create a release and deploy our resources to Azure.😎
 16. Click on Release > Create a Release. Finally, click on the **Create** button
  ![](https://i.imgur.com/UwEcARZ.png)
 17. Navigate to Releases pipeline page from left navigation and select our Release pipeline. we can see all our Release on this page. click on latest Release and see the progress.
  ![](https://i.imgur.com/sCNDPSN.png)
 19. Once the release is finished. navigate to the Azure portal and open the `AzureFunction` Resource Group. Voila, function app and its dependencies are created now.
  ![](https://i.imgur.com/eIp59DD.png)
 20. open function app and get the function URL to test it.
  ![](https://i.imgur.com/WZHiT8S.png)

Cheers 🥂
