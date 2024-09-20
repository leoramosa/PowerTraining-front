import { ButtonAppProps } from "@/interface/button";
import { TfiTrash } from "react-icons/tfi";
import { BiEditAlt } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";

const ButtonApp: React.FC<ButtonAppProps> = ({
  type,

  onClick,
  children,
  variant = "submit",
}) => {
  const variantStyles = {
    submit: "text-delete hover:bg-deleteBg",
    cancel: "text-warning hover:bg-warningBg",
    checkout: "text-success hover:bg-successBg",
    payment: "text-success hover:bg-successBg",
  };

  const renderIcon = () => {
    switch (variant) {
      case "submit":
        return <TfiTrash className="h-6 w-6" />;
      case "cancel":
        return <BiEditAlt className="h-6 w-6" />;
      case "checkout":
        return <TbListDetails className="h-6 w-6" />;
      case "payment":
        return <TbListDetails className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative group ">
      <button
        type={type}
        onClick={onClick}
        className={`text-lg rounded-md m-1 p-1 ${variantStyles[variant]}`}
      >
        {renderIcon()}
        {children}
      </button>
    </div>
  );
};

export default ButtonApp;
