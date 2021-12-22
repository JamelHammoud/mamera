import styled from 'styled-components'

const StyledPhotoList = styled.ul`
  list-style-type: none;
  margin: 0;
  min-height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 70px - 40px);
  box-sizing: border-box;
  padding: 20px;
  display: grid;
  align-content: flex-start;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 10px;
  
  li {
    width: 100%;
    padding-top: 100%;
    border-radius: 3px;
    position: relative;
    overflow: hidden;

    img {
      position: absolute;
      border-radius: 3px;
      object-fit: cover;
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

    &.placeholder {
      background-color: rgba(255, 255, 255, 0.05);

      .placeholder-text {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        padding: 1rem;
        display: flex;
        justify-content: center;
        line-height: 26px;
        align-items: center;
        box-sizing: border-box;
        text-align: center;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.4);

        b {
          svg {
            vertical-align: sub;
            height: 20px;
          }
        }
      }
    }
  }
`

export default StyledPhotoList
