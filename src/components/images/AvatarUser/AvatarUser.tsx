import { AvatarUserProps } from "@/interface/avatar";

const AvatarUser: React.FC<AvatarUserProps> = ({
  name,
  size = "md",
  backgroundColor = "bg-primary",
  textColor = "text-white",
}) => {
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-md",
    lg: "w-16 h-16 text-lg",
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        ${backgroundColor} 
        ${textColor} 
        flex items-center justify-center rounded-full font-bold
      `}
    >
      {getInitial(name)}
    </div>
  );
};

export default AvatarUser;
