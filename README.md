# Mamerea
This stupidly silly app was developed to test [CapacitorJS](https://capacitorjs.com/). The app can be found on the [iOS App Store](https://apps.apple.com/ca/app/mamera/id1600575010).

## App Description
Ever wanted to use a truly useless (yet functional) iPhone application? Well, your prayers have finally been answered!

Mamera is a stupidly ridiculous app that lets you combine unlimited images together to form a Merge.

Yep, you heard me correctly, take as many photos as you want and leverage the power of artificial unintelligence to combine them into one skewed and distorted image.

Once you've created your merge, you have four options: Share to Instagram, Share to Other Places, Download and Make A New Merge. Well, if we're being real, you have more than those four options, you could throw your phone on the ground, go paragliding or buy some antique porcelain dolls, but why would you?

PS: You get a notification every week to create a merge. Yep, that happens. I told dev that beta testers complained it was annoying and asked if they could fix it and they said that it's a system bug and that we should start marketing it as a feature.

## How Do I Use This?
### Prerequisites
* Device running MacOS
* Xcode installed

### Setting Up
Use `yarn install` to set up the application. You can use `yarn start` to run the development server (for web use), but the app will display some errors. `yarn open` opens the current project in Xcode. `yarn sync` syncs your files with Xcode. `yarn ios` builds your code and initiates an Xcode build (which can then be launched in the simulator or on your physical device).

### How Do I Test on a Physical Device?
To test on a physical device, plug your iOS device into your MacOS device. After running `yarn ios`, select your physical device from the list of a

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
