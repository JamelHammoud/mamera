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

  .app-layout {
    padding-top: env(safe-area-inset-top);
    background-color: black;

    .photo-list {
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
    }

    .mobile-menu-container {
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
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }

  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    z-index: 999;
  }

  .continue-prompt {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;
    width: 100%;
  }

  .finished {
    display: grid;
    ${({ continued }) => !continued && 'display: none'};
    align-content: space-between;
    min-height: calc(100vh - env(safe-area-inset-top));

    .output-sizer {
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
    }

    .share-menu-container {
      z-index: 90;
      padding-bottom: env(safe-area-inset-bottom);
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: saturate(180%) blur(20px);
      position: sticky;
      bottom: 0;

      .share-menu {
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
    }
  }
`

export default StyledCameraView
