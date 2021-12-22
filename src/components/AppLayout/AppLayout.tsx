import { FC, ReactNode } from 'react'
import { StyledAppLayout } from '.'

type Props = {
  children: ReactNode;
  className?: string;
  isContinued?: boolean;
  isFinished?: boolean;
}

const AppLayout: FC<Props> = ({ 
  children, 
  className, 
  isContinued, 
  isFinished 
}) => {
  return (
    <StyledAppLayout 
      className={className} 
      isContinued={isContinued} 
      isFinished={isFinished}
    >
      {children}
    </StyledAppLayout>
  )
}

export default AppLayout
