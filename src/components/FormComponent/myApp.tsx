import React from "react";
import { FormField } from "./components/FormField";
import { FieldValidation, useFormField } from "./components/useFormField";

// Validation functions
const validateName = (value: string): FieldValidation => {
  if (value.length < 2)
    return { valid: false, errorMessage: "Name is too short" };
  return { valid: true };
};

const validateAge = (value: number): FieldValidation => {
  if (value <= 0) return { valid: false, errorMessage: "Age must be positive" };
  return { valid: true };
};

// Main form component using context and form field hooks
const PersonalDetailsForm: React.FC = () => {
  // Hooks to manage each field with validation
  const firstNameField = useFormField("", validateName);
  const lastNameField = useFormField("", validateName);
  const ageField = useFormField(0, validateAge);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstNameField.error && !lastNameField.error && !ageField.error) {
      console.log("Form submitted successfully:", {
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        age: ageField.value,
      });
    } else {
      console.log("Form contains errors");
    }
  };

  return (
    <div>
      <h1>Personal Details Form</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          label="First Name"
          {...firstNameField}
          onChange={firstNameField.handleChange}
        />
        <FormField
          label="Last Name"
          {...lastNameField}
          onChange={lastNameField.handleChange}
        />
        <FormField label="Age" {...ageField} onChange={ageField.handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;
