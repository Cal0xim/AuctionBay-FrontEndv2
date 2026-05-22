interface AvatarProps {
  src: string;

  size?: "small" | "medium" | "large";
}

function Avatar({ src, size = "medium" }: AvatarProps) {
  const sizeClasses = {
    small: "w-4 h-4",     // 16px
    medium: "w-10 h-10",  // 40px
    large: "w-14 h-14",   // 56px
  };

  return (
    <img
      src={src}
      alt="avatar"
      className={`
        rounded-full object-cover
        ${sizeClasses[size]}
      `}
    />
  );
}

export default Avatar;