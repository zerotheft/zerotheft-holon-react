import styled from 'styled-components'

import Button from 'commons/Buttons'
import { colors } from 'theme'
import { color } from 'highcharts'

export const
  Header = styled.div`
  margin-bottom: 15px;
  h4 {
    font-size: 18px;
    margin: 10px 0;
    font-weight: 600;
    line-height: 120%;
    color: ${colors.primary}
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
NoChartText = styled.div`
  background: ${colors.warningBGColor};
  border-radius: 5px;
  padding: 6px;
  color: ${colors.text.white};
`,
  CustomButton = styled.a`
  font-family: Poppins;
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
  width: calc(100% - 500px);
  padding-top: 40px;
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
      right: 0px;
      bottom: 20px;
      padding: 10px 12px;
    }
  }
  h3 {
    font-size: 26px;
    span {
      color: ${colors.primary};
    }
  }
`,
  WarningWrapper = styled.div`
    position: absolute;
    top: 0px;
    right: 10px;
    z-index: 5;
    & > p {
      padding: 3px 10px;
      font-size: 15px;
      margin: 0 auto;
      background: ${colors.warningWrapper.backgroundColor};
      border-radius: 5px;
      width: fit-content;
    }
  `,
  EmptyProposalWrapper = styled.div`
    position: absolute;
    top: 65%;
    width: 100%;
    z-index: 5;
    & > p {
      text-align: center;
    }
  `,
  Right = styled.div`
  padding: 20px 0 0;
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
    }
  }
`,
  Body = styled.div`
  min-height: 400px;
  position: relative;
  display: flex;
  & > h4 {
    font-size: 20px;
  }
  .bodyHeader {
    margin-top: 25px;
    .detailWrapper {
      display: flex;
      flex-direction: row;
      margin-bottom: 15px;
    }
    .warning {
      width: 50%;
      font-size: 16px;
      color: ${colors.text.white};
      border: 1px solid ${colors.warningBGColor};
      background-color: ${colors.warningBGColor};
      border-radius: 6px;
      padding: 10px;
      flex: 1;
      span {
        font-size: 16px;
        font-weight: 700;
      }
    }
    .theftInfo{
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center; 
      flex-grow: 0;
      border: 1px solid ${colors.solidBorder};
      border-radius: 6px;
      padding: 10px;
      margin-right: 10px;
      & > div{
        h4 {
          font-size: 17px;
          font-weight: 600;
          color: ${colors.primary};
        }
        h6 {
          font-size: 13x;
          font-weight: 300;
          color: #606060;
        }
        h3 {
          font-size: 35px;
          font-weight: 600;
          color: ${colors.primary};
        }
      }
      h3 {
        font-size: 40px;
        font-weight: 600;
        color: ${colors.primary};
      }
    }
  }
  .bodyTitle {
    margin-top: 15px;
    h4 {
      font-size: 16px;
      font-weight: 400;
    }
    h6 {
      font-size: 16px;
      font-weight: 400;
      color: ${colors.primary};
    }
  }
  .bodyDescription {
    font-family: Poppins;
    margin-top: 20px;
    flex: 1;
    margin-right: 30px;
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
  .detailsWithCharts {
    width: 400px;
    padding-right: 5px;
    .imageWrapper {
      box-shadow: 0 0 3px 0px rgb(0, 0, 0, 0.2);
      border-radius: 3px;
      margin-bottom: 15px;
    }
    .idWrapper {
      margin-top: 10px;
      h6 {
        font-size: 17px;
        font-weight: 400;
        color: ${colors.idWrapper.text};
      }
    }
  }
  .overlayTextWrapper {
    width: 100%;
    position: absolute;
    top: 65%;
    .overlayText {
      text-align: center;
    }
  }
`
