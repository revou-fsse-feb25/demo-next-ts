import {
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
  useMemo,
  useRef,
} from "react";

type ValidationRule<T> = {
  validate: (value: any, formValues: T) => boolean;
  message: string;
};

type FieldValidation<T> = {
  [key: string]: ValidationRule<T>[];
};

interface UseFormOptions<T> {
  initialValues: T;
  validation?: FieldValidation<T>;
  onSubmit: (values: T, helpers: { resetForm: () => void }) => void;
}

interface FormErrors {
  [key: string]: string[];
}

interface UseFormReturn<T> {
  values: T;
  errors: FormErrors;
  touched: Record<string, boolean>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleBlur: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setFieldValue: (name: string, value: any) => void;
  resetForm: () => void;
  isSubmitting: boolean;
  isValid: boolean;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validation = {} as FieldValidation<T>,
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Use refs to avoid unnecessary re-renders
  const validationRef = useRef(validation);
  const onSubmitRef = useRef(onSubmit);

  // Update refs when dependencies change
  useMemo(() => {
    validationRef.current = validation;
    onSubmitRef.current = onSubmit;
  }, [validation, onSubmit]);

  // Validate a specific field
  const validateField = useCallback(
    (name: string, value: any, currentValues: T) => {
      const fieldValidations = validationRef.current[name];
      if (!fieldValidations) return [];

      return fieldValidations
        .filter((rule) => !rule.validate(value, currentValues))
        .map((rule) => rule.message);
    },
    [] // No dependencies since we use refs
  );

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(validationRef.current).forEach((fieldName) => {
      const value = values[fieldName];
      const fieldErrors = validateField(fieldName, value, values);

      if (fieldErrors.length > 0) {
        newErrors[fieldName] = fieldErrors;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField]);

  // Handle input change
  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value, type } = e.target;
      let parsedValue: any = value;

      // Handle different input types
      if (type === "checkbox") {
        parsedValue = (e.target as HTMLInputElement).checked;
      } else if (type === "number") {
        parsedValue = value === "" ? "" : Number(value);
      }

      setValues((prev) => {
        const newValues = { ...prev, [name]: parsedValue };

        // Validate the field on change if it's been touched
        if (touched[name]) {
          const fieldErrors = validateField(name, parsedValue, newValues);
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: fieldErrors,
          }));
        }

        return newValues;
      });
    },
    [touched, validateField]
  );

  // Handle input blur
  const handleBlur = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;

      // Mark field as touched
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));

      // Validate field on blur
      const fieldErrors = validateField(name, value, values);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors,
      }));
    },
    [values, validateField]
  );

  // Manually set a field value
  const setFieldValue = useCallback(
    (name: string, value: any) => {
      setValues((prev) => {
        const newValues = { ...prev, [name]: value };

        if (touched[name]) {
          const fieldErrors = validateField(name, value, newValues);
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: fieldErrors,
          }));
        }

        return newValues;
      });
    },
    [touched, validateField]
  );

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Handle form submission
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Mark all fields as touched
      const touchedFields = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setTouched(touchedFields);

      // Validate all fields
      const isValid = validateForm();

      if (isValid) {
        setIsSubmitting(true);

        // Call the provided onSubmit function
        Promise.resolve(onSubmitRef.current(values, { resetForm })).finally(
          () => {
            setIsSubmitting(false);
          }
        );
      }
    },
    [values, validateForm, resetForm]
  );

  // Check if the form is valid - memoize this calculation
  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
    isSubmitting,
    isValid,
  };
}
