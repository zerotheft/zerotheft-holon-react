import React from 'react'
import { get } from 'lodash'
import { Field } from 'formik'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from 'theme'
import { CustomFieldWrapper, ErrorSpan } from './styles'

const Checkbox = ({ label, field, form, readonly = false, style, labelStyle }) => (
  <CustomFieldWrapper
    style={style}
    className={`${get(form, `errors[${field.name}]`) && get(form, `touched[${field.name}]`) ? 'invalid' : null}`}
  >
    <div className="innerform-wrapper" style={!label ? { marginTop: 4 } : {}}>
      <CheckboxWrapper>
        <Field id={field.name} type="checkbox" name={field.name} disabled={readonly} />
        {label && (
          <label htmlFor={field.name} style={labelStyle}>
            {label && `${label}`}
          </label>
        )}
      </CheckboxWrapper>
    </div>
    {get(form, `errors[${field.name}]`) && get(form, `touched[${field.name}]`) && (
      <ErrorSpan>{get(form, `errors[${field.name}]`)}</ErrorSpan>
    )}
  </CustomFieldWrapper>
)

Checkbox.propTypes = {
  field     : PropTypes.object,
  form      : PropTypes.object,
  label     : PropTypes.string,
  labelStyle: PropTypes.object,
  readonly  : PropTypes.bool,
  style     : PropTypes.object,
}

export default Checkbox

const CheckboxWrapper = styled.div`
  input[type = checkbox] { display: none; }
  input[type = checkbox] ~ label {
    font-size: 16px;
    color: #797979;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
    position: relative;
    &::before {
      content: '';
      display: block;
      width: 18px;
      height: 18px;
      border: 2px solid #e2dcdc;
      margin-right: 15px;
    }
    &::after {
      content: '';
      width: 12px;
      height: 5px;
      border: 3px solid #fff;
      border-width: 0 0 3px 3px;
      position: absolute;
      transform: rotate(-36deg);
      top: 7px;
      left: 3px;
    }
  }
  input[type=checkbox]:checked ~ label {
    &::before {
      border-color: ${colors.primary};
      background: ${colors.primary};
    }
  }
`
