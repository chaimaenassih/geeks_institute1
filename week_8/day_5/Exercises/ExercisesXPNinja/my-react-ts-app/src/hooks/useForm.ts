import { useState } from "react";

export type FormValues = {
  email: string;
  password: string;
};

export type FormErrors = Partial<FormValues>;

interface UseFormOptions {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => Promise<void> | void;
}

export function useForm({ initialValues, onSubmit }: UseFormOptions) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(
    null
  );

  const validate = (vals: FormValues): FormErrors => {
    const newErrors: FormErrors = {};

    if (!vals.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(vals.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!vals.password) {
      newErrors.password = "Password is required";
    } else if (vals.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    const validationErrors = validate(values);
    setErrors(validationErrors);

    const hasErrors = Object.keys(validationErrors).length > 0;
    if (hasErrors) return;

    try {
      setIsSubmitting(true);
      await onSubmit(values);
      setSubmitSuccess("Registration successful!");
      setValues(initialValues);
    } catch {
      setSubmitError("An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    submitError,
    submitSuccess,
    handleChange,
    handleSubmit,
  };
}
