type Props = {
  children: React.ReactNode;
  className?: string;
};
export function Card({ children, className }: Props) {
  return (
    <div
      className={`
       relative
       p-2
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
