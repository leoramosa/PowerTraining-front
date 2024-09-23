import { ButtonActionsProps } from "@/interface/button";
import { TfiTrash } from "react-icons/tfi";
import { BiEditAlt } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";

const ButtonActions: React.FC<ButtonActionsProps> = ({
  type,
  onClick,
  status = "delete",
  tooltip,
}) => {
  const variantStyles = {
    delete: "text-delete hover:bg-deleteBg",
    edit: "text-warning hover:bg-warningBg",
    view: "text-success hover:bg-successBg",
  };
  const tooltipStyles = {
    delete: "text-white bg-delete",
    edit: "text-white bg-warning",
    view: "text-success bg-success",
  };

  const renderIcon = () => {
    switch (status) {
      case "delete":
        return <TfiTrash className="h-6 w-6" />;
      case "edit":
        return <BiEditAlt className="h-6 w-6" />;
      case "view":
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
        className={`text-lg rounded-md m-1 p-1 ${variantStyles[status]}`}
      >
        {renderIcon()}
      </button>
      {tooltip && (
        <span
          className={`absolute  bg-gray-800 bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex justify-center items-center px-2 py-1 text-white text-xs rounded shadow-lg whitespace-nowrap ${tooltipStyles[status]}`}
        >
          {tooltip}
        </span>
      )}
    </div>
  );
};

export default ButtonActions;
