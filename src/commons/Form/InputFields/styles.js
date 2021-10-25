import styled from 'styled-components'

import { colors } from 'theme'

export const CustomFieldWrapper = styled.div`
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    & > div.innerform-wrapper {
      display: flex;
      flex: 1 1 auto;
      align-items: center;
      width: 100%;
      & > label {
        width: ${(props) => (props.labelWidth ? `${props.labelWidth}px` : 'auto')};
        text-align: right;
        text-align: end;
        margin-right: 10px;
        font-weight: 500;
        color: #797979;
        font-size: 16px;
        line-height: 23px;
        white-space: nowrap;
      }
      & > input {
        display: flex;
        min-width: 0;
        border: 1px solid #e2dcdc;
        padding: 8px 12px;
        font-size: 15px;
        border-radius: 8px;
        color: #4f4f4f;
        width: 100%;
        &:disabled {
          background: #f2f2f2;
        }
        &:focus {
          box-shadow: none;
          outline: none;
        }
        &[type='text'],
        &[type='number'],
        &[type='password'] {
          min-height: 47px;
        }
        ::placeholder {
          color: #9e9b9b;
        }
      }
      & > input[type='checkbox'],
      & > input[type='checkbox']:hover {
        min-width: 13px;
        width: 13px;
        flex: 0;
        display: inline-block;
        opacity: 0.6;
        &:checked {
          opacity: 1;
        }
      }
      & > textarea {
        width: 100%;
        font-family: 'Poppins', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell',
          'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        resize: vertical;
        flex: 1 1 0%;
        min-width: 0;
        min-height: 200px;
        border: 1px solid #e2dcdc;
        padding: 8px 12px;
        font-size: 16px;
        border-radius: 8px;
        ::placeholder {
          color: #9e9b9b;
        }
        &:disabled {
          background: #f2f2f2;
        }
        &:focus {
          box-shadow: none;
          outline: none;
        }
      }
    }
    &.invalid {
      div > label {
        color: red;
      }
      div > input {
        border-color: red;
      }
    }
    ${(props) =>
      props.labelType === 'top' &&
      `
      & > div.innerform-wrapper {
        flex-direction: column;
        & > label {
          text-align: left;
          width: 100%;
          margin: 0 0 8px;
        }
      }
    `}
  `,
  Label = styled.div`
    width: ${(props) => (props.labelWidth ? `${props.labelWidth}px` : 'auto')};
    font-weight: 500;
    color: #797979;
    font-size: 16px;
    line-height: 23px;
    text-align: right;
    text-align: end;
    margin-right: 10px;
  `,
  SaveButton = styled.button`
    width: 200px;
    height: 40px;
    font-size: 16px;
    border: none;
    background: ${colors.primary};
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    &:disabled {
      opacity: 0.8;
      cursor: not-allowed;
    }
  `,
  CancelButton = styled(SaveButton)`
    background: transparent;
    color: #2b2523;
    margin-left: 10px;
  `,
  ActionWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    flex: 1 1 0%;
  `,
  ErrorSpan = styled.span`
    color: red;
    font-style: italic;
    font-size: 12px;
    margin-top: 5px;
    text-align: right;
    display: block;
  `,
  RadioBtn = styled.div`
    & > input[type='radio'] {
      display: none;
      &:checked + label::before {
        background: ${colors.primary};
      }
    }
    & > label {
      position: relative;
      padding-left: 25px;
      &::before {
        content: '';
        width: 15px;
        height: 15px;
        display: block;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        box-shadow: 0px 0px 0px 2px ${colors.primary}, inset 0px 0px 0px 2px #fff;
      }
    }
    ${(props) =>
      props.disabled &&
      `
      & > label {
        color: #bcbcbc;
        &::before {
          box-shadow: 0px 0px 0px 2px #E7E9F1, inset 0px 0px 0px 2px #fff;
        }
      }
      & > input[type = radio]:checked + label::before {
        background: #f4f4f4;
      }
    `}
  `
