import React from 'react'
import { get } from 'lodash'
import { Field } from 'formik'
import PropTypes from 'prop-types'

import { CustomFieldWrapper, ErrorSpan } from './styles'

const TextAreaField = ({
  label,
  labelWidth,
  field,
  form,
  placeholder = '',
  labelType='side',
  required = false,
  readonly = false,
  style,
}) => (
  <CustomFieldWrapper
    style={style}
    labelType={labelType}
    labelWidth={labelWidth}
    className={`${get(form, `errors[${field.name}]`) && get(form, `touched[${field.name}]`) ? 'invalid' : null}`}
  >
    <div className="innerform-wrapper">
      {(label || labelWidth) && (
        <label htmlFor={field.name}>
          {label && `${label}:`} {required && <span>*</span>}
        </label>
      )}
      <Field id={field.name} as="textarea" name={field.name} placeholder={placeholder} disabled={readonly} />
    </div>
    {get(form, `errors[${field.name}]`) && get(form, `touched[${field.name}]`) && (
      <ErrorSpan>{get(form, `errors[${field.name}]`)}</ErrorSpan>
    )}
  </CustomFieldWrapper>
)

TextAreaField.propTypes = {
  field      : PropTypes.object,
  form       : PropTypes.object,
  label      : PropTypes.string,
  labelWidth : PropTypes.string,
  placeholder: PropTypes.string,
  readonly   : PropTypes.bool,
  required   : PropTypes.bool,
  style      : PropTypes.object,
}

export default TextAreaField
