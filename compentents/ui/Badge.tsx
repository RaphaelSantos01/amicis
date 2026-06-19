import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "orange" | "brown" | "green";
};

export function Badge({ children, variant = "orange" }: BadgeProps) {
  const variants = {
    orange: "bg-[#FFF0DD] text-[#B85C00]",
    brown: "bg-[#F5E8DD] text-[#4A2511]",
    green: "bg-green-100 text-green-700",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
}