import { FC } from 'react'
import { CubeTransparentIcon } from '@heroicons/react/outline'
import { StyledPhotoList } from '.'

type Props = {
  photos: string[];
}

const PhotoList: FC<Props> = ({ photos }) => {
  return (
    <StyledPhotoList>
      {photos.map((photo, index) => {
        return (
          <li key={index}>
            <img src={photo}/>
          </li>
        )
      })}
      {photos.length < 2 && (
        <li className="placeholder">
          <div className="placeholder-text">
            <span>Add {2 - photos.length} (or more) image{photos.length === 0 && 's'} to <b><CubeTransparentIcon/> Merge</b>.</span>
          </div>
        </li>
      )}
    </StyledPhotoList>
  )
}

export default PhotoList
