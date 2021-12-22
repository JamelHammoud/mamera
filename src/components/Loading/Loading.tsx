import loadingAnimation from './loading-peace.gif'
import { FC } from 'react'
import { StyledLoading } from '.'

const Loading: FC = () => {
  return (
    <StyledLoading>
      <img 
        src={loadingAnimation} 
        height={100} 
        width={100} 
        alt="Loading..."
      />
    </StyledLoading>
  )
}

export default Loading
