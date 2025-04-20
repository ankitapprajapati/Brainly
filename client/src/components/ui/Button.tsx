import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  fullWidth? : boolean;
  loading? : boolean;
  onClick?  : ()=>any;
}

const variantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-400 text-purple-600",
};

const defaultStyles = "px-4 py-1 rounded-md inline-flex items-center gap-2";

const Button = ({ variant, text, startIcon,fullWidth,loading,onClick }: ButtonProps) => {
  return (
    <button 
      className={
        `${variantClasses[variant]} ${defaultStyles}`
        +`${fullWidth?" w-full flex items-center justify-center":""}`
        +`${loading? " opacity-45":""}`
      }
      disabled={loading}
      onClick={onClick}
    >
      {startIcon && <span>{startIcon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;
