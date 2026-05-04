import React from 'react'
import './TextInput.css'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}


const TextInput: React.FC<TextInputProps> = ({
  error,
  ...props
}) => {
  return (
    <div className="field-row">
      <input {...props} />
      {error && (
        <span className="error">{error}</span>
      )}
    </div>
  )
}

export default TextInput