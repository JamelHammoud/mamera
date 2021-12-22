import styled from 'styled-components'

const StyledMobileMenu = styled.div`
  z-index: 90;
  padding-bottom: env(safe-area-inset-bottom);
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  position: sticky;
  bottom: 0;

  .mobile-menu {
    padding: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .merge-prompt {
      background: white;
      position: absolute;
      bottom: calc(100% + 1rem);
      display: flex;
      left: 50%;
      width: calc(100% + 30px);
      padding: 6px 10px;
      border-radius: 50rem;
      font-weight: 500;
      color: black;
      font-size: 14px;
      text-align: center;
      justify-content: center;
      transform: translateX(-50%);

      &::after {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        width: 10px;
        height: 10px;
        bottom: -5px;
        background: white;
        border-bottom-right-radius: 2px;
      }
    }

    button {
      border-radius: 50%;
      display: flex;
      padding: 0;
      align-items: center;
      justify-content: center;

      svg {
        height: 32px;
        color: white;

        path {
          stroke-width: 1.5px;
        }
      }

      &:disabled {
        opacity: 0.5;
      }
    }

    .photo-btn {
      height: 70px;
      width: 70px;
      background-color: #FDE047;

      svg {
        fill: white;
        color: black;
        height: 40px;

        path {
          stroke-width: 1.75px;
        }
      }
    }

    .sub-btn {
      height: 55px;
      width: 55px;
      position: relative;
      background: rgba(255, 255, 255, 0.2);
    }
  }
`

export default StyledMobileMenu
