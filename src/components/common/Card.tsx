type Props = {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
};
export function Card({ children, dark, className }: Props) {
  return (
    <div
      className={`
       relative
       p-2
       ${dark ? "bg-base-100" : "bg-base-200"}
       rounded-lg
       border
       border-base-300
       ${className || ""}
       `}
    >
      {children}
    </div>
  );
}
