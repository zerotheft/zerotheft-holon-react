// import React from 'react'
// import { get } from 'lodash'
// import { Field } from 'formik'
// import PropTypes from 'prop-types'

// import { CustomFieldWrapper, ErrorSpan } from './styles'

// const EditableField = ({
//   label,
//   labelWidth,
//   min,
//   max,
//   field,
//   form,
//   placeholder = '',
//   required = false,
//   readonly = false,
//   type = 'text',
//   labelType = 'side',
//   style,
//   inputStyles = {}
// }) => (
//   <CustomFieldWrapper
//     style={style}
//     labelWidth={labelWidth}
//     labelType={labelType}
//     className={`${get(form, `errors[${field.name}]`) && get(form, `touched[${field.name}]`) ? 'invalid' : null}`}
//   >
//     <div className="innerform-wrapper">
//       {(label || labelWidth) && (
//         <label htmlFor={field.name}>
//           {label && `${label}:`} {required && <span>*</span>}
//         </label>
//       )}
//       <Field
//         id={field.name}
//         type={type}
//         name={field.name}
//         placeholder={placeholder}
//         disabled={readonly}
//         min={min}
//         max={max}
//         style={inputStyles}
//       >
//         {({ field: { value }, form: { setFieldValue } }) => (
//           <div>

//             <div>
//               {/* <Stars
//                 count={value}
//                 handleClick={number => setFieldValue(fieldName, number)}
//               /> */}rafinkarki
//             </div>
//           </div>
//         )}
//       </Field>
//     </div>
//     {get(form, `errors[${field.name}]`) && get(form, `touched[${field.name}]`) && (
//       <ErrorSpan>{get(form, `errors[${field.name}]`)}</ErrorSpan>
//     )}
//   </CustomFieldWrapper>
// )

// EditableField.propTypes = {
//   field: PropTypes.object,
//   form: PropTypes.object,
//   label: PropTypes.string,
//   labelWidth: PropTypes.string,
//   inputStyles: PropTypes.object,
//   max: PropTypes.number,
//   min: PropTypes.number,
//   placeholder: PropTypes.string,
//   readonly: PropTypes.bool,
//   required: PropTypes.bool,
//   style: PropTypes.object,
//   type: PropTypes.string,
// }

// export default EditableField
import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { colors } from 'theme'

// import "./Editable.css";

const Editable = ({
  text,
  type,
  placeholder,
  value,
  children,
  childRef,
  ...props
}) => {
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  const handleKeyDown = (event, type) => {
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey];
    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false);
    }
  };

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <EditContent>
          <Content>
            <Label> {text || placeholder}</Label>: <Value>{value}</Value>
          </Content>
          <div>
            <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: 5, cursor: 'pointer' }} onClick={() => setEditing(true)} />
          </div>
        </EditContent>
      )}
    </section>
  );
};

export default Editable;
const Wrapper = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  & > div {
    flex: 1;
  }
`,
  EditContent = styled.div`
display:flex;

`,
  Content = styled.div`

`,
  Label = styled.span`
color: ${colors.text.gray}
`,
  Value = styled.span`
`;