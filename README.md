# ALPR-Camera Component

Note: This was tested on a react-native: "0.73.5", to troubleshoot you can create an empty project with:
``` bash
npx react-native init alprexample --version 0.73.5
``` 

## Installing the package
Set your config for npm in your terminal, within the root folder of your project. This requires an auth token from your profile on gitlab. 

``` bash
npm config set -- //gitlab.vonfrank.dk/:_authToken= #YOUR_AUTH_TOKEN
```
Replace #YOUR_AUTH_TOKEN with your authentication token.

#### If you do not know how to get an auth token read below, otherwise move to next point
This can be found in: 

* On the left sidebar, select your **avatar**.
* Select **Edit** profile.
* On the left sidebar, select **Access Tokens**.
* Select **Add** new token.
* Enter a **name** and **expiry date** for the token.

*Note:*: The token expires on that date at midnight UTC. If you do not enter an expiry date, the expiry date is automatically set to 365 days later than the current date.
* Select the desired **scopes**.
* Select **Create** personal access token.
**.npmrc**

## Add vision-camera and worklets-core to your project.
For react-native-vision-camera to work with worklets, it needs to link it when utilizing frame processor plugins.

Run this command in the root directory of your project:

``` bash
npm i react-native-vision-camera  react-native-vision-camera react-native-worklets-core 
```

### Install and add react-native-vision-camera as a dependecy for your project.

### Creating an .npmrc file
To install packages from our lovely gitlab.vonfrank packet registry, we have to define the node packet manager should look at run time.

In your project's root directory, create a file with the name:

**.npmrc** 

And add these two lines:

``` bash
@alprapp:registry=https://gitlab.vonfrank.dk/api/v4/projects/79/packages/npm/
registry=https://registry.npmjs.org/
``` 
It define to first to check the scope of @alprapp in the registry at gitlab.von.frank at the specific project. This will then check the registry on gitlab for the package, which is privated and uses your authentication token to verify your permissions.

If it's not there, check the regular npm registry.
Then run:
´´´ bash
npm i @alprapp/alpr-camera 
´´´
# Extra Setup
Setup your babel.config.js to include worklets for the frame Processor included in the ALPRCamera Component

```js
module.exports = {
  plugins: [
      ['react-native-worklets-core/plugin'],
    ],

    // ...

```
> Note: You have to restart metro-bundler for changes in the `babel.config.js` file to take effect.

### Update Permissions (Maybe Location also?)

#### IOS
Open your project's `Info.plist` and add the following lines inside the outermost <dict> tag:

<key>NSCameraUsageDescription</key>
<string>$(PRODUCT_NAME) needs access to your Camera.</string>

#### Android
Open your project's `AndroidManifest.xml` and add the following lines inside the manifest tag
```js
<uses-permission android:name="android.permission.CAMERA" />
```


## Usage