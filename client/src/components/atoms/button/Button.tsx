import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react"; // Assuming you're using lucide for icons
import { ReactNode } from "react";

const Button = ({
  children,
  variant = "primary",
  loading = false,
  disabled,
  className,
  icon,
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "border" | "outline" | "secondary" |"ghost";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  icon?:ReactNode;
  [key: string]: any;
}) => {
  const variants = {
    primary:
      "bg-primary text-white border-primary hover:bg-white hover:text-primary",
    border:
      "bg-white text-primary border-primary hover:bg-primary hover:text-white",
    outline: "bg-transparent border",
    secondary:
      "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
    ghost: "bg-[#e5e5e5] text-gray-700",
  };

  return (
    <button
      {...props}
      className={cn(
        `${variants[variant]} cursor-pointer rounded-md border px-2 md:px-4 py-0.5 md:py-1.5 text-xs/6 md:text-sm/6 font-medium transition-colors flex items-center justify-center gap-2`,
        className
      )}
      disabled={loading || disabled}
    >
      {loading && (
        <Loader2 className="animate-spin h-4 w-4" />
      )}
            {icon && icon}
      {children}
    </button>
  );
};

export default Button;
