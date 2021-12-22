import styled from 'styled-components'

type StyledProps = {
  continued: boolean;
}

const StyledCameraView = styled.div<StyledProps>`
  & > div:first-child {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 auto;
    z-index: 9999999;
    pointer-events: none;
  }
`

export default StyledCameraView
