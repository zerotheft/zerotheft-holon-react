import styled from 'styled-components'

import Button from 'commons/Buttons'
import { colors } from 'theme'

export const
  Header = styled.div`
  h4 {
    font-size: 29px;
    margin: 10px 0;
    font-weight: 500;
  }
  h5 {
    font-size: 15px;
    font-weight: 500;
    &.plain {
      font-weight: 400;
    }
  }
  .btns {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`,
  OR = styled.div`
  margin: 0 15px;
  font-size: 22px;
  color: #99;
`,
  CustomButton = styled.a`
  background: #4169E1;
  display: inline-block;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 14px;
  text-decoration: none;
  border: none;
  font-weight: 600;
  color: #fff;
  width: auto;
  padding: 10px 20px;
  font-size: 20px;
`,
  PlainButton = styled(CustomButton)`
  border: 1px solid #4169E1;
  background: #fff;
  color: #4169E1;
`,
  Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`,
  Left = styled.div`
  margin-right: 40px;
  padding-top: 70px;
  & > .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    & > h3 {
      flex: 1;
      font-size: 32px;
      line-height: 1;
      font-weight: 600;
      color: ${colors.primary};
      padding: 15px 50px 15px 0;
    }
    .refresh {
      position: absolute;
      right: 10px;
      bottom: 20px;
    }
  }
  h3 {
    font-size: 26px;
    span {
      color: ${colors.primary};
    }
  }
`,
  Right = styled.div`
  padding-top: 70px;
  background: #F6FAFB;
  &.apply-bg {
    padding: 70px 60px 60px;
    position: relative;
    & > div {
      position: relative;
      z-index: 1;
    }
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #F6FAFB;
    }
  }
`,
  Body = styled.div`
  position: relative;
  & > h4 {
    font-size: 20px;
  }
  .bodyTitle {
    padding: 20px;
    border: 1px solid #C9C9C9;
    border-radius: 6px;
    background: #fff;
    margin: 20px 0;
    h4 {
      font-size: 26px;
      font-weight: 400;
    }
    h6 {
      margin: 5px 0;
      font-size: 16px;
      font-weight: 400;
      color: ${colors.primary};
    }
  }
  .bodyDescription {
    font-family: monospace;
    h5 {
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: 500;
    }
    p {
      font-size: 14px;
      color: rgba(0,0,0,0.69);
    }
    .detail-wrapper {
      font-size: 16px;
      line-height: 1.5;
      letter-spacing: 0.5px;
      ul {
        ul {
          padding-left: 10px;
        }
        li {

        }
      }
    }
  }
`
