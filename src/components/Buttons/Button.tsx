import React from 'react';
type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};
const Button: React.FunctionComponent<ButtonProps> = (props) => {
  return <div className={`w-32 pt-4 ${props.className}`}>{props.children}</div>;
};

export default Button;
