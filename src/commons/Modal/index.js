import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import cross from 'assets/icons/cross.svg'

const Wrapper = styled.div`
    max-width: ${(props) => (props.width ? props.width : 350)}px;
    width: calc(100vw - 20px);
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    min-height: 200px;
    outline: none;
    padding: 40px 50px;
    max-height: 100vh;
    overflow: auto;
  `,
  CloseBtn = styled.div`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    & > img {
      display: block;
      width: 14px;
      height: 14px;
    }
  `

const PopupModal = ({ onClose, wrapperStyle, children, width = 500 }) => {
  return (
    <Modal isOpen onRequestClose={onClose} className="cp-modal" overlayClassName="cp-modal-overlay">
      <Wrapper width={width} style={wrapperStyle}>
        {onClose && (
          <CloseBtn onClick={onClose}>
            <img src={cross} alt="close" />
          </CloseBtn>
        )}
        {children}
      </Wrapper>
    </Modal>
  )
}

PopupModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  onClose: PropTypes.func,
  width: PropTypes.number,
  wrapperStyle: PropTypes.string,
}

export default PopupModal
