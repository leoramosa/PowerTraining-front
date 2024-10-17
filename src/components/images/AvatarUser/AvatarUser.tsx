import { IAvatarUserProps } from "@/interface/avatar";

const AvatarUser: React.FC<IAvatarUserProps> = ({
  name,
  size = "md",
  className,
  backgroundColor = "",
  textColor = "",
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
        ${className}
        ${textColor} 
        flex items-center justify-center rounded-full font-bold
      `}
    >
      {getInitial(name)}
    </div>
  );
};

export default AvatarUser;
