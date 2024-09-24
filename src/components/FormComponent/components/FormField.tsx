import React from "react";

// Generic type for FormField Component
interface FormFieldProps<T> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  error: string | null;
}

export function FormField<T extends string | number>({
  label,
  value,
  onChange,
  error,
}: FormFieldProps<T>) {
  return (
    <div>
      <label>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        style={{ borderColor: error ? "red" : "black" }}
      />
      {error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
}
