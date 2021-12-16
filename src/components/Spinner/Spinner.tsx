import { FC } from 'react'
import { ReactComponent as SpinnerSmall } from './spinnerSmall.svg'
import { StyledSpinner } from '.'

const Spinner: FC = () => {
  return (
    <StyledSpinner className="spinner">
      <SpinnerSmall />
    </StyledSpinner>
  )
}

export default Spinner