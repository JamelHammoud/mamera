import Reward, { RewardElement } from 'react-rewards'
import { createRef, FC, useEffect, useRef, useState } from 'react'
import { AppLauncher } from '@capacitor/app-launcher'
import { Directory, Filesystem } from '@capacitor/filesystem'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { LocalNotifications } from '@capacitor/local-notifications'
import { Share } from '@capacitor/share'
import { Media } from '@capacitor-community/media'
import { AppLayout } from '../../components/AppLayout'
import { PhotoList } from '../../components/PhotoList'
import { MobileMenu } from '../../components/MobileMenu'
import { Loading } from '../../components/Loading'
import { OutputPreview } from '../../components/OutputPreview'
import { OutputMenu } from '../../components/OutputMenu'
import { StyledCameraView } from '.'

const CameraView: FC = () => {
  const { getPhoto, requestPermissions } = Camera
  const { writeFile } = Filesystem
  const { share } = Share
  const { openUrl } = AppLauncher
  const { savePhoto } = Media
  const { schedule, getPending } = LocalNotifications

  const [loading, setLoading] = useState(false)
  const [showedPrompt, setShowedPrompt] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [continued, setContinued] = useState(false)
  const [clickedShareBtn, setClickedShareBtn] = useState(false)
  const [takenPhotos, setTakenPhotos] = useState<string[]>([])

  const outputRef = createRef<HTMLCanvasElement>()
  const rewardRef = useRef(createRef<RewardElement>())

  // Gets required permissions
  const getPermission = async () => {
    const permissions = await requestPermissions({
      permissions: ['camera', 'photos']
    })

    if (permissions.camera !== 'denied' && permissions.photos !== 'denied') {
      await takePicture()
    }
  }

  // Opens the user's camera
  const takePicture = async () => {
    const photo = await getPhoto({
      quality: 100,
      width: 1920,
      height: 1920,
      saveToGallery: false,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    })

    setTakenPhotos((photos) => photos.concat(photo.webPath!))
  }

  // Resets the group and opens the camera
  const reset = async () => {
    setContinued(false)
    setLoading(false)
    setDownloaded(false)
    setClickedShareBtn(false)
    setTakenPhotos(() => [])
    await takePicture()
  }

  // Shows the loading screen and
  // merges the group
  const continueToMerge = async () => {
    try {
      setLoading(true)
      setContinued(true)
      setShowedPrompt(true)
      await merge(takenPhotos)
    }
    finally {
      setTimeout(() => {
        setLoading(false)
        showReward()
      }, 1000)
    }
  }

  // Shares the photo to Instagram
  const sharePhotoToInstagram = async () => {
    const photoUrl = outputRef.current?.toDataURL('image/jpeg', 0.5)

    if (!photoUrl) {
      return
    }

    if (downloaded) {
      return await openUrl({ 
        url: `instagram://library?LocalIdentifier=mamera`
      })
    }

    const savedPhoto = await savePhoto({
      path: photoUrl,
      album: {
        name: 'Mamera'
      }
    })

    await openUrl({ 
      url: `instagram://library?LocalIdentifier=${savedPhoto.filePath}`
    })

    setDownloaded(true)
  }

  // Opens the share drawer with the image
  const sharePhoto = async () => {
    try {
      const photoUrl = outputRef.current?.toDataURL()
      setClickedShareBtn(true)
  
      if (!photoUrl) {
        return
      }
  
      const result = await writeFile({
        path: 'Share Your Merge | Mamera.png',
        data: photoUrl,
        directory: Directory.Documents
      })
    
      await share({
        url: result.uri,
        title: 'This photo was merged in Mamera. Meow.',
        dialogTitle: 'Share Your Merge'
      })
    }
    finally {
      setClickedShareBtn(false)
    }
  }

  const downloadPhoto = async () => {
    const photoUrl = outputRef.current?.toDataURL('image/jpeg', 0.5)

    if (!photoUrl) {
      return
    }

    await savePhoto({
      path: photoUrl,
      album: {
        name: 'Mamera'
      }
    })

    setDownloaded(true)
  }

  // Loops over each photo in the group, adding
  // the RGB pixels together and then dividing by 
  // the number of photos in the group.
  const merge = async (photos: string[]) => {
    const output = outputRef.current?.getContext('2d')
    const imageData: ImageData[] = []

    for (const imageSrc of photos) {
      const canvas = document.createElement('canvas')
      canvas.height = 1920
      canvas.width = 1920
      const context = canvas.getContext('2d')

      if (!context) {
        console.log('whoops, something went wrong')
        return
      }

      const image = new Image()
      image.src = imageSrc
      await image.decode()
      context.drawImage(image, 0, 0, 1920, 1920)
      const data = context.getImageData(0, 0, 1920, 1920)

      imageData.push(data)
    }

    for (let i = 0; i < imageData[0].data.length; i += 4) {
      const r = imageData.reduce((a, b) => {
        return a + b.data[i]
      }, 0)

      const g = imageData.reduce((a, b) => {
        return a + b.data[i + 1]
      }, 0)

      const b = imageData.reduce((a, b) => {
        return a + b.data[i + 2]
      }, 0)

      const totalImages = photos.length

      imageData[0].data[i] = r / totalImages
      imageData[0].data[i + 1] = g / totalImages
      imageData[0].data[i + 2] = b / totalImages
      imageData[0].data[i + 3] = 255

      if (i > imageData[0].data.length - 5) {
        output?.putImageData(imageData[0], 0, 0)
        return
      }
    }
  }

  // Resets the state
  const resetState = () => {
    setContinued(false)
    setDownloaded(false)
    setClickedShareBtn(false)
  }

  // Shows the confetti
  const showReward = () => {
    rewardRef.current?.current?.rewardMe()
  }

  // Schedules a notification every week
  const notifyMe = async () => {
    const permissions = await LocalNotifications.requestPermissions()
    const pendingNotifications = await getPending()
    const alreadyScheduled = pendingNotifications.notifications.find((notification) => notification.id === 52635)

    if (permissions.display !== 'denied' && !alreadyScheduled) {
      await schedule({
        notifications: [{
          id: 52635,
          title: 'Wanna waste some time?',
          body: 'How about you take some random photos and MERGE THEM.. Cool right?',
          schedule: {
            every: 'week'
          }
        }]
      })
    }
  }

  useEffect(() => {
    resetState()
    getPermission()
    notifyMe()
  }, [])

  return (
    <StyledCameraView continued={continued && !loading}>
      <Reward
        ref={rewardRef.current}
        type='confetti'
        config={{
          springAnimation: false,
          zIndex: 999,
          spread: 1000,
          elementCount: 120,
          elementSize: 12
        }}
      >
        {!continued && (
          <AppLayout>
            <PhotoList photos={takenPhotos}/>

            <MobileMenu
              photos={takenPhotos}
              showedPrompt={showedPrompt}
              reset={() => reset()}
              takePicture={() => takePicture()}
              continueToMerge={() => continueToMerge()}
            />
          </AppLayout>
        )}

        {continued && loading && <Loading/>}

        <AppLayout isContinued={continued} isFinished>
          <OutputPreview ref={outputRef}/>
          <OutputMenu
            clickedShareBtn={clickedShareBtn}
            isDownloaded={downloaded}
            reset={reset}
            downloadPhoto={downloadPhoto}
            sharePhoto={sharePhoto}
            sharePhotoToInstagram={sharePhotoToInstagram}
          />
        </AppLayout>
      </Reward>
    </StyledCameraView>
  )
}

export default CameraView
