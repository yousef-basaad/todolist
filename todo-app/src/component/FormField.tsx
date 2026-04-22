import React from 'react'
import { Field } from 'react-final-form'
import TextInput from './TextInput'

interface FormFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: string
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  ...rest
}) => {
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <TextInput
          {...input}
          {...rest}
          error={meta.touched && meta.error ? meta.error : undefined}
        />
      )}
    </Field>
  )
}

export default FormField