import { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function Button({ onClick, children, disabled = false, loading = false, className = "" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:bg-gray-400 ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
