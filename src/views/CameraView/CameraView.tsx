import loadingAnimation from './loading-peace.gif'
import { createRef, FC, useEffect, useRef, useState } from 'react'
import Reward, { RewardElement } from 'react-rewards'
import { AppLauncher } from '@capacitor/app-launcher'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { LocalNotifications } from '@capacitor/local-notifications'
import { Share } from '@capacitor/share'
import { Media } from '@capacitor-community/media'
import { CheckIcon, CubeTransparentIcon, RefreshIcon, ViewGridAddIcon } from '@heroicons/react/outline'
import { StyledCameraView } from '.'
import { Spinner } from '../../components/Spinner'

const CameraView: FC = () => {
  const { getPhoto, requestPermissions } = Camera
  const { openUrl } = AppLauncher
  const { share } = Share
  const { savePhoto } = Media
  const { schedule, getPending } = LocalNotifications

  const [loading, setLoading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [continued, setContinued] = useState(false)
  const [clickedShareBtn, setClickedShareBtn] = useState(false)
  const [clickedDownloadBtn, setClickedDownloadBtn] = useState(false)
  const [takenPhotos, setTakenPhotos] = useState<string[]>([])

  const outputRef = createRef<HTMLCanvasElement>()
  const rewardRef = useRef(createRef<RewardElement>())

  const showReward = () => {
    rewardRef.current?.current?.rewardMe()
  }

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

  const getPermission = async () => {
    const permissions = await requestPermissions({
      permissions: ['camera', 'photos']
    })

    if (permissions.camera !== 'denied' && permissions.photos !== 'denied') {
      await takePicture()
    }
  }

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

  const reset = async () => {
    setContinued(false)
    setLoading(false)
    setDownloaded(false)
    setClickedShareBtn(false)
    setClickedDownloadBtn(false)
    setTakenPhotos(() => [])
    await takePicture()
  }

  const continueToMerge = async () => {
    try {
      setLoading(true)
      setContinued(true)
      await merge(takenPhotos)
    }
    finally {
      setTimeout(() => {
        setLoading(false)
        showReward()
      }, 1000)
    }
  }

  const sharePhotoToInstagram = async () => {
    const photoUrl = outputRef.current?.toDataURL('image/jpeg', 0.5)

    if (!photoUrl) {
      return
    }

    const savedPhoto = await savePhoto({
      path: photoUrl,
      album: {
        name: 'Mamera'
      }
    })
    setDownloaded(true)

    await openUrl({ 
      url: `instagram://library?LocalIdentifier=${savedPhoto.filePath}`
    })
  }

  const sharePhoto = async () => {
    try {
      const photoUrl = outputRef.current?.toDataURL('image/jpeg', 0.5)
      setClickedShareBtn(true)
  
      if (!photoUrl) {
        return
      }
  
      const savedPhoto = await savePhoto({
        path: photoUrl,
        album: {
          name: 'Mamera'
        }
      })
  
      setDownloaded(true)
  
      await share({
        text: 'This photo was merged in Mamera. Meow.',
        url: savedPhoto.filePath
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

    setClickedDownloadBtn(true)
    setDownloaded(true)
  }

  const merge = async (photos: string[]) => {
    const output = outputRef.current?.getContext('2d')
    const imageData: ImageData[] = []

    for await (const imageSrc of photos) {
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

  useEffect(() => {
    setContinued(false)
    setDownloaded(false)
    setClickedShareBtn(false)
    setClickedDownloadBtn(false)
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
          <div className="app-layout">
            <ul className="photo-list">
              {takenPhotos.map((photo, index) => {
                return (
                  <li key={index}>
                    <img src={photo}/>
                  </li>
                )
              })}
              {takenPhotos.length < 2 && (
                <li className="placeholder">
                  <div className="placeholder-text">
                    <span>Add {2 - takenPhotos.length} (or more) image{takenPhotos.length === 0 && 's'} to <b><CubeTransparentIcon/> Merge</b>.</span>
                  </div>
                </li>
              )}
            </ul>

            <div className="mobile-menu-container">
              <div className="mobile-menu">
                <button 
                  onClick={() => reset()}
                  className="sub-btn"
                >
                  <RefreshIcon/>
                </button>
                <button 
                  onClick={() => takePicture()}
                  className="photo-btn"
                >
                  <ViewGridAddIcon/>
                </button>
                <button 
                  onClick={() => continueToMerge()}
                  className="sub-btn"
                  disabled={takenPhotos.length < 2}
                >
                  <CubeTransparentIcon/>
                </button>
              </div>
            </div>
          </div>
        )}

        {continued && loading && (
          <div className="loading-screen">
            <img 
              src={loadingAnimation} 
              height={100} 
              width={100} 
              alt="Loading..."
            />
          </div>
        )}

        <div className="app-layout finished">
          <div className="output-sizer">
            <div className="output">
              <canvas 
                ref={outputRef} 
                width={1920} 
                height={1920}
              />
            </div>
          </div>
          <div className="share-menu-container">
            <div className="share-menu">
              <button 
                className="share-btn"
                onClick={() => sharePhotoToInstagram()}
              >
                Share to Instagram
              </button>
              <button 
                className="share-btn"
                onClick={() => sharePhoto()}
              >
                {clickedShareBtn ? <Spinner/> : 'Share to Other Places'}
              </button>
              <button 
                className="reset-btn"
                onClick={() => downloadPhoto()}
              >
                {clickedDownloadBtn ? <span className="downloaded-text">Downloaded <CheckIcon/></span> : 'Download'}
              </button>
              <button 
                className="reset-btn"
                onClick={() => reset()}
              >
                Make a new merge
              </button>
            </div>
          </div>
        </div>  
      </Reward>
    </StyledCameraView>
  )
}

export default CameraView
