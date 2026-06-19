import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-[#F28C28] text-white hover:bg-[#d97706]",
    secondary: "bg-[#4A2511] text-white hover:bg-[#35190b]",
    outline:
      "border border-[#4A2511] text-[#4A2511] hover:bg-[#FFF8F1]",
  };

  return (
    <button
      className={`rounded-full px-6 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}