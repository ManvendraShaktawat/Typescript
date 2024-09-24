import React from "react";

// Defining the possible error types for fields using discriminated unions
export type FieldValidation =
  | { valid: true }
  | { valid: false; errorMessage: string };

// Custom hook to manage form state with validation
export function useFormField<T extends string | number>(
  initialValue: T,
  validate: (value: T) => FieldValidation
) {
  const [value, setValue] = React.useState<T>(initialValue);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (newValue: T) => {
    const validation = validate(newValue);
    setValue(newValue);

    if (validation.valid) {
      setError(null);
    } else {
      setError(validation.errorMessage);
    }
  };

  return { value, handleChange, error };
}
