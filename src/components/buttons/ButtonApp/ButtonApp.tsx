import { ButtonAppProps } from "@/interface/button";
import { TfiTrash } from "react-icons/tfi";
import { TbListDetails } from "react-icons/tb";

const ButtonApp: React.FC<ButtonAppProps> = ({
  type,
  onClick,
  children,
  className,
  variant = "cancel",
}) => {
  const variantStyles = {
    submit: "text-delete hover:bg-deleteBg",
    success: "text-white bg-success hover:bg-[#00853a]",
    cancel: "text-black bg-gray-200 hover:bg-gray-300 px-3",
    checkout: "text-success hover:bg-successBg",
    payment: "text-success hover:bg-successBg",
    login: "text-black bg-primary hover:bg-[#F9911E]",
  };

  const renderIcon = () => {
    switch (variant) {
      case "login":
        return;
      case "success":
        return;
      case "submit":
        return <TfiTrash className="h-6 w-6" />;
      case "cancel":
        return;
      case "checkout":
        return <TbListDetails className="h-6 w-6" />;
      case "payment":
        return <TbListDetails className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-lg rounded-md m-1 p-1 ${variantStyles[variant]} ${className}`}
    >
      {renderIcon()}
      {children}
    </button>
  );
};

export default ButtonApp;
