import styled from 'styled-components'

type StyledProps = {
  isContinued?: boolean;
  isFinished?: boolean;
}

const StyledAppLayout = styled.div<StyledProps>`
  padding-top: env(safe-area-inset-top);
  background-color: black;

  ${({ isFinished, isContinued }) => isFinished && `
    display: ${isContinued ? 'grid' : 'none'};
    align-content: space-between;
    min-height: calc(100vh - env(safe-area-inset-top));
  `}
`

export default StyledAppLayout
