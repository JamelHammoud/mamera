import styled from 'styled-components'

const StyledOutputPreview = styled.div`
  padding: 20px;
        
  .output {
    width: 100%;
    padding-top: 100%;
    position: relative;
    border-radius: 3px;
    position: relative;
    overflow: hidden;

    canvas {
      position: absolute;
      object-fit: cover;
      border-radius: 3px;
      width: 100%;
      height: 100%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }

    &:after {
      content: '';
      border-radius: 3px;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
      z-index: 1;
    }
  }
`

export default StyledOutputPreview
