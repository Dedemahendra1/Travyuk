import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
    className?: string
    children: ReactNode
}

const MaxWidthWrapper = ({className, children}: Props) => {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-screen-xl ',
        className
      )}>
      {children}
    </div>

  )
}

export default MaxWidthWrapper