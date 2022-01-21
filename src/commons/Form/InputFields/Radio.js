import React from "react"
import { Field, useFormikContext } from "formik"
import PropTypes from "prop-types"

import { CustomFieldWrapper, RadioBtn } from "./styles"

const Radio = ({ field, readonly = false, values = [], style, innerStyle, radioStyle }) => {
  const { setFieldValue } = useFormikContext()

  return (
    <Field
      name={field.name}
      render={(RadioField) => (
        <CustomFieldWrapper style={style}>
          <div className="innerform-wrapper" style={innerStyle}>
            {values.map(({ label, value, component }) => (
              <RadioBtn style={{ marginRight: 20, display: "flex", width: "100%", ...radioStyle }} disabled={readonly}>
                <input
                  id={`${RadioField.field.name}-${value}`}
                  name={RadioField.field.name}
                  type="radio"
                  checked={value === RadioField.field.value}
                  onChange={() => setFieldValue(RadioField.field.name, value)}
                  disabled={readonly}
                />
                <label htmlFor={`${RadioField.field.name}-${value}`}>{label && `${label}`}</label>
                {component}
              </RadioBtn>
            ))}
          </div>
        </CustomFieldWrapper>
      )}
    />
  )
}

Radio.propTypes = {
  field: PropTypes.object,
  innerStyle: PropTypes.object,
  radioStyle: PropTypes.object,
  readonly: PropTypes.bool,
  style: PropTypes.object,
  values: PropTypes.array,
}

export default Radio
