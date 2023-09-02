import React, { FunctionComponent }  from 'react'

type ContainerProps = {
    children: React.ReactNode
    className?: string
}

 const Container:FunctionComponent<ContainerProps>  = ({children, className}) => {
  return (
    <div
    className={`container mx-auto ${className}`}
    >{children}</div>
  )
}

export default Container 