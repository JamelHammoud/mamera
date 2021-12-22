# <img align="left" src="https://user-images.githubusercontent.com/55815579/146818534-8e7c0170-f144-4f83-bdef-980071e9387b.png" width=40 height=40/> Mamera
> This repo is focused on mobile app development for iOS. Although you may be able to build to Android from this repo, this ReadMe was written for iOS development.

This ReactJS app was developed in a day to test [CapacitorJS](https://capacitorjs.com/). The intention was to evaluate Capactitor's ability to build to iOS, the ease of leveraging native functionality in a web-based app, and Apple's approval process for webview applications. The app was published and can be found on the [iOS App Store](https://apps.apple.com/ca/app/mamera/id1600575010).

<br/>

## Quick Start
#### Prerequisites
* You have access to a device capable of running MacOS
* [Xcode](https://apps.apple.com/us/app/xcode/id497799835) is installed

#### Setting Up
1. Clone the repo
2. Open Terminal
3. Install all dependencies using `yarn install`
4. Open the project in Xcode with `yarn open`
5. Sync your files with Xcode with `yarn sync`
6. Build your code (which can then be launched in the simulator or on your physical device) with `yarn ios` 

#### How Do I Test on a Physical Device?
To test on a physical device, plug your iOS device into your MacOS device. After running `yarn ios`, select your physical device from the list of available devices. After it's finished loading, you should see your phone open the application. 

_I've personally found that if you have an Apple Watch connected to your phone while Xcode is building, the build will fail. I've dealt with this by simply switching my watch to airplane mode every time I want to build to my phone (which isn't ideal, but it works)._

<br/>

## Code Conventions
* Uses [Yarn](https://yarnpkg.com/), [ReactJS](https://reactjs.org/), [Typescript](https://www.typescriptlang.org/) & [Styled Components](https://styled-components.com/)
* All components live within the `components` folder
  * A component is a reusable 'piece' of the app (ex: button, video player)
* All views live within the `views` folder
  * A view typically denotes a page (ex: sign up, register, feed)
* All types live within the `types` folder
* Each component is within a folder with the same name (camel-case) as the component
* Each component folder contains at least three files:
  * index.tsx (used to export the component/styled component)
  * ComponentName.tsx (used for the actual component)
  * ComponentName.Styled.tsx (used for the styled component)

<br/>

## Attribution
#### CapacitorJS Plugins
* @capacitor-community/media
  * Used [Manuel Rodríguez's](https://github.com/dragermrb/media) fork of the official repo to mitigate issues
* [@capacitor/app-launcher](https://capacitorjs.com/docs/apis/app-launcher)
* [@capacitor/camera](https://capacitorjs.com/docs/apis/camera)
* [@capacitor/filesystem](https://capacitorjs.com/docs/apis/filesystem)
* [@capacitor/local-notifications](https://capacitorjs.com/docs/apis/local-notifications)
* [@capacitor/share](https://capacitorjs.com/docs/apis/share)

#### Icons
Used [Heroicons](https://heroicons.com/) for the app's icons.

<br/>

## License

This GitHub repository is provided by [Jamel Hammoud](https://jamelhammoud.com) under the [MIT License](http://opensource.org/licenses/MIT).
