import { FC, RefObject } from 'react'
import { StyledOutputPreview } from '.'

type Props = {
  ref: RefObject<HTMLCanvasElement>;
}

const OutputPreview: FC<Props> = ({ ref }) => {
  return (
    <StyledOutputPreview>
      <div className="output">
        <canvas 
          ref={ref} 
          width={1920} 
          height={1920}
        />
      </div>
    </StyledOutputPreview>
  )
}

export default OutputPreview
