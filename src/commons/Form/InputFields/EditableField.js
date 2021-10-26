import React from 'react'
import { get } from 'lodash'
import { Field } from 'formik'
import PropTypes from 'prop-types'

import { CustomFieldWrapper, ErrorSpan } from './styles'

const EditableField = ({
  label,
  labelWidth,
  min,
  max,
  field,
  form,
  placeholder = '',
  required = false,
  readonly = false,
  type = 'text',
  labelType = 'side',
  style,
  inputStyles = {},
}) => (
  <CustomFieldWrapper
    style={style}
    labelWidth={labelWidth}
    labelType={labelType}
    className={`${get(form, `errors[${field.name}]`) && get(form, `touched[${field.name}]`) ? 'invalid' : null}`}
  >
    <div className="innerform-wrapper">
      {(label || labelWidth) && (
        <label htmlFor={field.name}>
          {label && `${label}:`} {required && <span>*</span>}
        </label>
      )}
      <Field
        id={field.name}
        type={type}
        name={field.name}
        placeholder={placeholder}
        disabled={readonly}
        min={min}
        max={max}
        style={inputStyles}
      />
    </div>
    {get(form, `errors[${field.name}]`) && get(form, `touched[${field.name}]`) && (
      <ErrorSpan>{get(form, `errors[${field.name}]`)}</ErrorSpan>
    )}
  </CustomFieldWrapper>
)

EditableField.propTypes = {
  field      : PropTypes.object,
  form       : PropTypes.object,
  label      : PropTypes.string,
  labelWidth : PropTypes.string,
  inputStyles: PropTypes.object,
  max        : PropTypes.number,
  min        : PropTypes.number,
  placeholder: PropTypes.string,
  readonly   : PropTypes.bool,
  required   : PropTypes.bool,
  style      : PropTypes.object,
  type       : PropTypes.string,
}

export default EditableField
