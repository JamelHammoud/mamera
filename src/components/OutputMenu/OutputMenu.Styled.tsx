import styled from 'styled-components'

const StyledOutputMenu = styled.div`
  z-index: 90;
  padding-bottom: env(safe-area-inset-bottom);
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  position: sticky;
  bottom: 0;

  .output-menu {
    padding: 20px;
    display: grid;
    grid-gap: 1rem;

    button {
      border-radius: 10px;
      width: 100%;
      display: flex;
      padding: 0;
      font-weight: bold;
      font-size: 1rem;
      height: 45px;
      align-items: center;
      justify-content: center;
      color: white;
      background: rgba(255, 255, 255, 0.2);

      .downloaded-text {
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          margin-left: 10px;
          height: 20px;
        }
      }

      &:last-child {
        margin-top: 1rem;
      }
    }
    
    .share-btn {
      background: white;
      color: black;
    }
  }
`

export default StyledOutputMenu
