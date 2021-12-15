import { createRef, FC, useEffect, useState } from 'react'
import { AppLauncher } from '@capacitor/app-launcher'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { Share } from '@capacitor/share'
import { Media } from '@capacitor-community/media'
import { CubeTransparentIcon, RefreshIcon, ViewGridAddIcon } from '@heroicons/react/outline'
import { StyledCameraView } from '.'

const CameraView: FC = () => {
  const { getPhoto, requestPermissions } = Camera
  const { openUrl } = AppLauncher
  const { share } = Share
  const { savePhoto } = Media

  const [continued, setContinued] = useState(false)
  const [takenPhotos, setTakenPhotos] = useState<string[]>([])
  const [test, setTest] = useState('')

  const outputRef = createRef<HTMLCanvasElement>()

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
    setTakenPhotos(() => [])
    await takePicture()
  }

  const continueToMerge = async () => {
    setContinued(true)
    await merge(takenPhotos)
  }

  const sharePhoto = async () => {
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

    await openUrl({ 
      url: `instagram://library?LocalIdentifier=${savedPhoto.filePath}`
    })
    
    /*
    await share({
      title: 'This is a title',
      text: 'Really awesome thing you need to see right meow',
      url: test.filePath,
      dialogTitle: 'Share with buddies'
    })
    */
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
    getPermission()
  }, [])

  return (
    <StyledCameraView continued={continued}>
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
              onClick={() => sharePhoto()}
            >
              Share to Instagram
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
    </StyledCameraView>
  )
}

export default CameraView
