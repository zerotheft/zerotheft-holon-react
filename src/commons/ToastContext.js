import React, { createContext, useState } from "react"
import PropTypes from "prop-types"
import Stack from "@mui/material/Stack"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"

const ToastContext = createContext()

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const ToastProvider = ({ children, vertical = "top", horizontal = "right" }) => {
  const [toastProperties, setToastProperties] = useState({
    message: "",
    type: "",
  })

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setToastProperties({ message: "", type: "" })
  }

  return (
    <ToastContext.Provider
      value={{
        toastProperties,
        setToastProperties,
      }}
    >
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={toastProperties.type !== ""}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={toastProperties.type} sx={{ width: "100%", fontSize: "15px" }}>
            {toastProperties.message}
          </Alert>
        </Snackbar>
      </Stack>
      {children}
    </ToastContext.Provider>
  )
}

ToastProvider.propTypes = {
  children: PropTypes.node,
  horizontal: PropTypes.string,
  vertical: PropTypes.string,
}

export { ToastProvider, ToastContext }
