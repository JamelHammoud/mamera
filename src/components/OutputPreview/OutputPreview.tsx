import { FC, RefObject } from 'react'
import { StyledOutputPreview } from '.'

type Props = {
  outputRef: RefObject<HTMLCanvasElement>;
}

const OutputPreview: FC<Props> = ({ outputRef }) => {
  return (
    <StyledOutputPreview>
      <div className="output">
        <canvas 
          ref={outputRef} 
          width={1920} 
          height={1920}
        />
      </div>
    </StyledOutputPreview>
  )
}

export default OutputPreview
