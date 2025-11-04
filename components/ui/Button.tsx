import React from 'react';

// FIX: Add `size` to ButtonProps to allow for different button sizes.
// FIX: Make children optional to support icon-only buttons.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactElement;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', icon, ...props }) => {
  // FIX: Remove size-specific classes (padding and text size) to be handled dynamically.
  const baseClasses = 'inline-flex items-center justify-center border border-transparent font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200';

  const variantClasses = {
    primary: 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
    danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
  };

  // FIX: Define classes for different button sizes.
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  // FIX: Add size classes for icon-only buttons to ensure proper spacing.
  const iconOnlySizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  };

  return (
    <button
      // FIX: Apply the size class along with other classes. Conditionally apply padding for icon-only buttons.
      className={`${baseClasses} ${children ? sizeClasses[size] : iconOnlySizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {/* FIX: Conditionally apply margin to the icon if there are children. */}
      {icon && <span className={children ? "mr-2 -ml-1 h-5 w-5" : "h-5 w-5"}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
