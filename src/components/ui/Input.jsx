import { forwardRef, useId } from "react";

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-4 py-3 text-base",
};

const Input = forwardRef(
  (
    {
      label,
      name,
      register,
      error,
      helperText,
      id,
      type = "text",
      placeholder,
      size = "md",
      disabled = false,
      required = false,
      readOnly = false,
      startIcon,
      endIcon,
      className = "",
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const isInvalid = !!error;

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-(--grey-700)"
          >
            {label}
            {required && <span className="text-(--danger-600)"> *</span>}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--grey-400)">
              {startIcon}
            </span>
          )}

          <input
            id={inputId}
            ref={ref}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={isInvalid}
            aria-required={required}
            aria-disabled={disabled}
            aria-describedby={
              isInvalid ? errorId : helperText ? helperId : undefined
            }
            {...(register ? register(name) : {})}
            className={`
              w-full rounded-lg border outline-none transition-all duration-200
              bg-(--grey-0) text-(--grey-900) placeholder:text-(--grey-400)

              ${sizes[size]}
              ${startIcon ? "pl-10" : ""}
              ${endIcon ? "pr-10" : ""}

              ${
                isInvalid
                  ? "border-(--danger-600) focus:ring-4 focus:ring-(--danger-600)/10 focus:border-(--danger-600)"
                  : "border-(--grey-300) focus:border-(--brand-500) focus:ring-4 focus:ring-(--brand-500)/10"
              }

              ${
                disabled
                  ? "bg-(--grey-50) text-(--grey-400) cursor-not-allowed"
                  : ""
              }

              ${readOnly ? "bg-(--grey-50)" : ""}
              ${className}
            `}
            {...props}
          />

          {endIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-(--grey-400)">
              {endIcon}
            </span>
          )}
        </div>

        {error && (
          <span
            id={errorId}
            role="alert"
            className="text-xs text-(--danger-600)"
          >
            {error}
          </span>
        )}

        {!error && helperText && (
          <span id={helperId} className="text-xs text-(--grey-500)">
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
