import { CubeTransparentIcon, RefreshIcon, ViewGridAddIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { StyledMobileMenu } from '.'

type Props = {
  photos: string[];
  showedPrompt: boolean;
  reset(): void;
  takePicture(): void;
  continueToMerge(): void;
}

const MobileMenu: FC<Props> = ({ 
  photos, 
  showedPrompt, 
  reset, 
  takePicture, 
  continueToMerge 
}) => {
  return (
    <StyledMobileMenu>
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
          disabled={photos.length < 2}
        >
          {photos.length >= 2 && !showedPrompt && (
            <div className="merge-prompt">
              <span>Merge Group</span>
            </div>
          )}
          <CubeTransparentIcon/>
        </button>
      </div>
    </StyledMobileMenu>
  )
}

export default MobileMenu
