"use client";

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type OptionHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

import { cn } from "../utils/cn";

interface FieldMeta {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
}

function FieldHeader({
  label,
  optional,
  htmlFor,
}: Pick<FieldMeta, "label" | "optional"> & { htmlFor: string }) {
  return (
    <label className="ui-field__label" htmlFor={htmlFor}>
      <span>{label}</span>
      {optional ? <span className="ui-field__optional">Không bắt buộc</span> : null}
    </label>
  );
}

function FieldHelp({
  hint,
  error,
  helpId,
}: Pick<FieldMeta, "hint" | "error"> & { helpId: string }) {
  if (!hint && !error) {
    return null;
  }

  return (
    <p
      id={helpId}
      className={cn("ui-field__help", error && "ui-field__help--error")}
      role={error ? "alert" : undefined}
    >
      {error ?? hint}
    </p>
  );
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    FieldMeta {
  inputSize?: "sm" | "md" | "lg";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hint,
    error,
    optional = false,
    inputSize = "md",
    className,
    id,
    "aria-describedby": ariaDescribedBy,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const helpId = `${fieldId}-help`;

  return (
    <div className="ui-field">
      <FieldHeader label={label} optional={optional} htmlFor={fieldId} />
      <input
        ref={ref}
        id={fieldId}
        className={cn(
          "ui-input",
          `ui-input--${inputSize}`,
          error && "ui-input--invalid",
          className,
        )}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error || hint ? helpId : ariaDescribedBy}
        {...props}
      />
      <FieldHelp hint={hint} error={error} helpId={helpId} />
    </div>
  );
});

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    FieldMeta {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      hint,
      error,
      optional = false,
      className,
      id,
      "aria-describedby": ariaDescribedBy,
      rows = 5,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const helpId = `${fieldId}-help`;

    return (
      <div className="ui-field">
        <FieldHeader label={label} optional={optional} htmlFor={fieldId} />
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          className={cn("ui-textarea", error && "ui-input--invalid", className)}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error || hint ? helpId : ariaDescribedBy}
          {...props}
        />
        <FieldHelp hint={hint} error={error} helpId={helpId} />
      </div>
    );
  },
);

export interface SelectOption
  extends Omit<OptionHTMLAttributes<HTMLOptionElement>, "label"> {
  label: string;
  value: string;
}

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    FieldMeta {
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      label,
      hint,
      error,
      optional = false,
      options,
      placeholder,
      className,
      id,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const helpId = `${fieldId}-help`;

    return (
      <div className="ui-field">
        <FieldHeader label={label} optional={optional} htmlFor={fieldId} />
        <select
          ref={ref}
          id={fieldId}
          className={cn("ui-select", error && "ui-input--invalid", className)}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error || hint ? helpId : ariaDescribedBy}
          {...props}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map(({ label: optionLabel, value, ...optionProps }) => (
            <option key={value} value={value} {...optionProps}>
              {optionLabel}
            </option>
          ))}
        </select>
        <FieldHelp hint={hint} error={error} helpId={helpId} />
      </div>
    );
  },
);

interface ChoiceFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

function ChoiceField({
  type,
  label,
  description,
  className,
  id,
  ...props
}: ChoiceFieldProps & { type: "checkbox" | "radio" }) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const descriptionId = description ? `${fieldId}-description` : undefined;

  return (
    <label className={cn("ui-choice", className)} htmlFor={fieldId}>
      <input
        id={fieldId}
        type={type}
        aria-describedby={descriptionId}
        {...props}
      />
      <span className="ui-choice__control" aria-hidden="true" />
      <span className="ui-choice__copy">
        <strong>{label}</strong>
        {description ? <span id={descriptionId}>{description}</span> : null}
      </span>
    </label>
  );
}

export function Checkbox(props: ChoiceFieldProps) {
  return <ChoiceField type="checkbox" {...props} />;
}

export function Radio(props: ChoiceFieldProps) {
  return <ChoiceField type="radio" {...props} />;
}

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "role"> {
  label: string;
  description?: string;
}

export function Switch({
  label,
  description,
  className,
  id,
  ...props
}: SwitchProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const descriptionId = description ? `${fieldId}-description` : undefined;

  return (
    <label className={cn("ui-switch", className)} htmlFor={fieldId}>
      <span className="ui-switch__copy">
        <strong>{label}</strong>
        {description ? <span id={descriptionId}>{description}</span> : null}
      </span>
      <input
        id={fieldId}
        type="checkbox"
        role="switch"
        aria-describedby={descriptionId}
        {...props}
      />
      <span className="ui-switch__track" aria-hidden="true">
        <span className="ui-switch__thumb" />
      </span>
    </label>
  );
}
