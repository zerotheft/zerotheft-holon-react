import React from 'react'
import { Field, useFormikContext } from 'formik'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from 'theme'
// eslint-disable-next-line no-unused-vars
import { CustomFieldWrapper, RadioBtn } from './styles'

const LabelledRadioField = ({ field, readonly = false, values = [], style, innerStyle }) => {
  const { setFieldValue } = useFormikContext()

  return (
    <Field
      name={field.name}
      render={(RadioField) => (
        <CustomFieldWrapper style={style}>
          <div className="innerform-wrapper" style={innerStyle}>
            <RadioItemsWrapper>
              {values.map(({ label, value }) => (
                <RadioItem disabled={readonly}>
                  <input
                    id={`${RadioField.field.name}-${value}`}
                    name={RadioField.field.name}
                    type="radio"
                    checked={value === RadioField.field.value}
                    onChange={() => setFieldValue(RadioField.field.name, value)}
                    disabled={readonly}
                  />
                  <label htmlFor={`${RadioField.field.name}-${value}`}>{label && `${label}`}</label>
                </RadioItem>
              ))}
            </RadioItemsWrapper>
          </div>
        </CustomFieldWrapper>
      )}
    />
  )
}

LabelledRadioField.propTypes = {
  field: PropTypes.object,
  innerStyle: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  radioStyle: PropTypes.object,
  readonly: PropTypes.bool,
  style: PropTypes.object,
  values: PropTypes.array,
}

export default LabelledRadioField

const RadioItemsWrapper = styled.div`
    display: flex;
    flex-direction: row;
  `,
  RadioItem = styled.div`
    input[type='radio'] {
      display: none;
    }
    input[type='radio'] ~ label {
      border: 2px solid #ccc;
      color: #4d4a50;
      font-size: 17px;
      font-weight: 500;
      padding: 5px 16px;
      margin-right: 12px;
      min-width: 85px;
      display: inline-block;
      user-select: none;
    }
    input[type='radio']:checked ~ label {
      background: ${colors.primary};
      color: #fff;
      border-color: ${colors.primary};
    }
  `
