import { createRef, FC, useEffect } from 'react'
import test from './test-1.jpeg'
import test2 from './test-2.jpeg'
import test3 from './test-3.jpeg'
import test4 from './test-4.jpeg'
import test5 from './test-5.jpeg'
import test6 from './test-6.jpeg'
import jamel from './jamel.png'
import ben from './ben.jpeg'
import obama from './obama.jpg'
import hillary from './hillary.jpg'
import trump from './trump.jpg'
import { StyledExampleComponent } from '.'

const ExampleComponent: FC = () => {
  // const images = [test, test2, test3, test4, test5, test6]
  const images = [obama, hillary, trump]
  // const images = [jamel, ben]
  const outputRef = createRef<HTMLCanvasElement>()

  const init = async () => {
    const output = outputRef.current?.getContext('2d')
    const imageData: ImageData[] = []

    for await (const imageSrc of images) {
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

      const totalImages = images.length

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
    init()
  }, [])

  return (
    <StyledExampleComponent>
    <canvas 
      ref={outputRef} 
      width={1920} 
      height={1920}
    />
    </StyledExampleComponent>
  )
}

export default ExampleComponent
