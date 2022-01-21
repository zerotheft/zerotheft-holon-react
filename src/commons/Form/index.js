import React from "react"
import PropTypes from "prop-types"
import { Form } from "formik"

function onKeyDown(keyEvent) {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault()
  }
}

const FormWrapper = ({ children, ...props }) => (
  <Form onKeyDown={onKeyDown} {...props}>
    {children}
  </Form>
)

FormWrapper.propTypes = {
  children: PropTypes.node,
}

export default FormWrapper
