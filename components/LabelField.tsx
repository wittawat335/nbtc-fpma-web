import { ReactElement } from 'react';

type FieldElement = ReactElement<{ required?: boolean }>;

type FormFieldProps = {
  label: string;
  children: FieldElement;
};

export default function LabelField({ label, children }: FormFieldProps) {
  const isRequired = !!children.props.required;

  return (
    <div>
      <label className="label">
        {label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>

      {children}
    </div>
  );
}
