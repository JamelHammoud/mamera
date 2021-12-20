# <img align="left" src="https://user-images.githubusercontent.com/55815579/146818534-8e7c0170-f144-4f83-bdef-980071e9387b.png" width=40 height=40/> Mamera
This stupidly silly app was developed in a day to test [CapacitorJS](https://capacitorjs.com/). The app is published and can be found on the [iOS App Store](https://apps.apple.com/ca/app/mamera/id1600575010).

> Ever wanted to use a truly useless (yet functional) iPhone application? Well, your prayers have finally been answered!
> 
> Mamera is a stupidly ridiculous app that lets you combine unlimited images together to form a Merge.
> 
> Yep, you heard me correctly, take as many photos as you want and leverage the power of artificial unintelligence to combine them into one skewed and distorted image.
> 
> Once you've created your merge, you have four options: Share to Instagram, Share to Other Places, Download and Make A New Merge. Well, if we're being real, you have more than those four options, you could throw your phone on the ground, go paragliding or buy some antique porcelain dolls, but why would you?
> 
> PS: You get a notification every week to create a merge. Yep, that happens. I told dev that beta testers complained it was annoying and asked if they could fix it and they said that it's a system bug and that we should start marketing it as a feature.

## Quick Start
#### Prerequisites
* Device running MacOS
* Xcode installed

#### Setting Up
1. Clone the repo
2. Open terminal
3. Install all dependencies using `yarn install`
4. Open the project in Xcode with `yarn open`
5. Sync your files with Xcode with `yarn sync`
6. Build your code (which can then be launched in the simulator or on your physical device) with `yarn ios` 

#### How Do I Test on a Physical Device?
To test on a physical device, plug your iOS device into your MacOS device. After running `yarn ios`, select your physical device from the list of available devices. After it's finished loading, you should see your phone open the application. I've personally found that if you have an Apple Watch connected to your phone while Xcode is building, the build will fail. I've delt with this by simply switching my watch to airplane mode every time I want to build to my phone (which isn't really ideal, but it works).

## Code Conventions
* Uses [Typescript](https://www.typescriptlang.org/) & [Yarn](https://yarnpkg.com/)
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

## License

[MIT License](http://opensource.org/licenses/MIT)
