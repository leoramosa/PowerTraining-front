import { BadgeUserProps } from "@/interface/badge";

const Badge: React.FC<BadgeUserProps> = ({ status }) => {
  const baseStyles =
    "px-3 py-2 px-2 rounded-lg text-xs font-semibold flex items-center";

  const statusStyles = {
    "without-routine": "bg-successBg text-success",
    "Active-ok": "bg-successBg text-success",
    "with-routine": "bg-gray-200 text-gray-500",
  };

  const classNameByStatus = {
    "without-routine": "border border-gray-300",
    "with-routine": "border border-gray-300",
    "Active-ok": "border border-gray-300",
  };

  const statusLabels = {
    "without-routine": "Without routine",
    "with-routine": "With routine",
    "Active-ok": "Active",
  };

  return (
    <div
      className={`${baseStyles} ${statusStyles[status]} ${classNameByStatus[status]}`}
    >
      {statusLabels[status]}
    </div>
  );
};

export default Badge;
