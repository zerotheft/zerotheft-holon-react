import React from 'react'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { CustomFieldWrapper, ErrorSpan } from './styles'

export const SelectField = ({
  label,
  field,
  form,
  isMulti = false,
  options,
  disabled,
  creatable,
  style,
  onChange,
  labelType,
  labelWidth,
  placeholder,
  searchable = true,
}) => {
  const Component = creatable ? CreatableSelect : Select

  return (
    <CustomFieldWrapper
      className={`${get(form, `errors[${field.name}]`) ? 'invalid' : null}`}
      style={style}
      labelType={labelType}
      labelWidth={labelWidth}
    >
      <div className="innerform-wrapper">
        {label && <label htmlFor={field.name}>{label}:</label>}
        <Component
          id={field.name}
          isDisabled={disabled}
          name={field.name}
          isSearchable={searchable}
          styles={{
            placeholder: styles => ({
              ...styles,
              fontSize: 16,
              color   : '#9E9B9B',
            }),
            container: styles => ({
              ...styles,
              width: '100%',
              flex : 1,
            }),
            control: styles => ({
              ...styles,
              cursor      : searchable ? styles.cursor : 'pointer',
              minHeight   : 47,
              borderRadius: 8,
              borderColor : '#E2DCDC !important',
              boxShadow   : 'none !important',
            }),
            indicatorSeparator: () => ({
              display: 'none'
            })
          }}
          isMulti={isMulti}
          value={field.value}
          options={options}
          placeholder={placeholder}
          noOptionsMessage={() => 'No Options Available'}
          onChange={opt => {
            onChange && onChange(opt, form, field)
            form.setFieldValue(field.name, opt)
          }}
        />
      </div>
      {get(form, `errors[${field.name}]`) && <ErrorSpan>{get(form, `errors[${field.name}]`)}</ErrorSpan>}
    </CustomFieldWrapper>
  )
}

SelectField.propTypes = {
  creatable  : PropTypes.bool,
  disabled   : PropTypes.bool,
  field      : PropTypes.object,
  form       : PropTypes.object,
  isMulti    : PropTypes.bool,
  label      : PropTypes.string,
  labelType  : PropTypes.string,
  labelWidth : PropTypes.string,
  onChange   : PropTypes.func,
  options    : PropTypes.array,
  placeholder: PropTypes.string,
  searchable : PropTypes.bool,
  style      : PropTypes.object,
}

export default SelectField
