type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  enabled: boolean;
  className?: string;
};

export function Button3D({ children, onClick, enabled, className }: Props) {
  return (
    <div
      onClick={onClick}
      className={`
      button flex flex-col items-center justify-center h-full w-full cursor-pointer select-none transition-all duration-150
      rounded-full
      ${enabled ? "border-b-[3px] border-primary-light " : ""}
      ${enabled ? "bg-primary" : "bg-base-300"}
      ${enabled ? "active:translate-y-2" : ""}  
      ${enabled ? "active:[box-shadow:0_0px_0_0_#803a24,0_0px_0_0_#3b1105]" : ""}
      ${enabled ? "active:border-b-[0px]" : ""}
      ${enabled ? "[box-shadow:0_10px_0_0_#803a24,0_15px_0_0_#3b1105]" : ""}
      ${className || ""}
      `}
    >
      {children}
    </div>
  );
}
