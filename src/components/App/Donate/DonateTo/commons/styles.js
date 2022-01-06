import styled from "styled-components"

import { colors } from "theme"

export const ContentWrapper = styled.div`
    p {
      font-size: 20px;
      font-weight: 300;
      color: #252525;
      margin-bottom: 10px;
    }
    ul.checklist {
      margin: 30px 0 20px;
      padding: 0;
      font-size: 23px;
      font-weight: 500;
      line-height: 50px;
      color: #322d2d;
      li {
        list-style: none;
        position: relative;
        padding-left: 40px;
        &::before {
          position: absolute;
          top: 14px;
          left: 0;
          content: "";
          width: 20px;
          height: 10px;
          border: 2px solid #322d2d;
          border-width: 0 0 2px 2px;
          transform: rotate(-36deg);
        }
      }
    }
  `,
  EthAddress = styled.div`
    background: #f2f4f4;
    border-radius: 11px;
    padding: 15px 140px 15px 40px;
    position: relative;
    display: inline-block;
    min-width: 820px;
    cursor: pointer;
    p {
      font-size: 24px;
      font-weight: 500;
      color: #000;
      margin: 15px 0;
    }
    img.copy {
      position: absolute;
      top: 50px;
      right: 45px;
    }
  `,
  History = styled.div`
    margin-top: 40px;
    h5 {
      font-size: 21px;
      font-weight: 600;
      color: #252525;
      margin-bottom: 20px;
    }
    .table-wrapper {
      background: #ffffff;
      border: 1px solid #cdcdcd;
      box-sizing: border-box;
      border-radius: 11px;
      padding: 20px 20px;
      display: inline-block;
      min-width: 820px;
      table {
        width: 100%;
        text-align: left;
        th {
          color: ${colors.primary};
          font-size: 17px;
          font-weight: 600;
          padding: 5px 10px;
        }
        td {
          font-size: 17px;
          font-weight: 400;
          color: #6e6c70;
          padding: 5px 10px;
        }
      }
    }
  `
