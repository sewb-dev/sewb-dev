import React from 'react'
type ButtonProps = {
    children: React.ReactNode,
    className?:string

}
const Button:React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <div
    className={`pt-4 w-32 ${props.className}`}
    >{props.children}</div>
  )
}

export default Button