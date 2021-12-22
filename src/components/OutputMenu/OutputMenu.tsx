import { FC } from 'react'
import { CheckIcon } from '@heroicons/react/outline'
import { Spinner } from '../Spinner'
import { StyledOutputMenu } from '.'

type Props = {
  clickedShareBtn: boolean;
  isDownloaded: boolean;
  reset(): void;
  downloadPhoto(): void;
  sharePhoto(): void;
  sharePhotoToInstagram(): void;
}

const OutputMenu: FC<Props> = ({
  clickedShareBtn,
  isDownloaded,
  reset,
  downloadPhoto,
  sharePhoto,
  sharePhotoToInstagram
}) => {
  return (
    <StyledOutputMenu>
      <div className="output-menu">
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
          disabled={isDownloaded}
        >
          {isDownloaded ? <span className="downloaded-text">Downloaded <CheckIcon/></span> : 'Download'}
        </button>
        <button 
          className="reset-btn"
          onClick={() => reset()}
        >
          Make a New Merge
        </button>
      </div>
    </StyledOutputMenu>
  )
}

export default OutputMenu
