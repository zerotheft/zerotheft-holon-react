import styled from "styled-components"
import { colors } from "theme"

export const HeadlineH1 = styled.h1`
    font-size: 48px;
    font-weight: bold;
    letter-spacing: -0.0125em;
    line-height: 56px;
    color: ${colors.primary};
  `,
  HeadlineH2 = styled.h2`
    font-size: 2.125rem;
    font-weight: 700;
    letter-spacing: -1%;
  `,
  HeadlineH3 = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.009rem;
  `,
  HeadlineH4 = styled.h4`
    font-size: 1.25rem;
    font-weight: 500;
    letter-spacing: 0.009rem;
  `,
  HeadlineH5 = styled.h5`
    font-size: 1.125rem;
    font-weight: 400;
    letter-spacing: 0.009rem;
  `,
  SubTitle1 = styled.p`
    font-weight: bold;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.1px;
    color: ${colors.primary};
  `,
  GrayHeadlineH3 = styled.h3`
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.15px;
    line-height: 28px;
    color: ${colors.grey700};
  `,
  GrayHeadlineH4 = styled.p`
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.15px;
    line-height: 28px;
    color: ${colors.grey800};
  `,
  GrayBody1 = styled.p`
    font-size: 16px;
    font-weight: normal;
    letter-spacing: 0.44px;
    line-height: 24px;
    color: ${colors.grey500};
  `,
  GrayBody2 = styled.p`
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0.25px;
    line-height: 20px;
    color: ${colors.grey500};
  `,
  GraySubtitle1 = styled.p`
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.1px;
    line-height: 24px;
    color: ${colors.grey700};
  `,
  GrayHeadlineH5 = styled.h5`
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.15px;
    color: ${colors.grey500};
  `,
  GrayTextP = styled.p`
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.25px;
    color: ${colors.greyHeader};
  `,
  GrayTextP500 = styled.p`
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.25px;
    color: ${colors.grey500};
  `,
  GrayTextP500Bold = styled.p`
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.1px;
    color: ${colors.grey700};
    font-weight: bold;
  `,
  GraySubTextP = styled.p`
    font-size: 12px;
    font-weight: normal;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: ${colors.greyHeader};
    text-transform: capitalize;
  `,
  GraySubTextdimP = styled.p`
    font-size: 12px;
    font-weight: normal;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: ${colors.grey500};
    text-transform: capitalize;
  `,
  GrayCaption1 = styled.p`
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: ${colors.grey700};
  `,
  DarkCaption1 = styled.p`
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: ${colors.text.dark};
  `,
  GraySubTextUL = styled.ul`
    font-size: 14px;
    font-weight: normal;
    line-height: 24px;
    letter-spacing: 0.25px;
    color: ${colors.greyHeader};
  `,
  ButtonText1 = styled.p`
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.75px;
    text-transform: uppercase;
    color: ${colors.text.white};
    padding: 6px;
  `,
  MaterialLinkText = styled.span`
    color: ${colors.primary};
    cursor: pointer;
    font-size: 14px;
    font-weight: normal;
    text-decoration: underline;
  `,
  SubTitle = styled.p`
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.006rem;
  `,
  Container = styled.div`
    width: 100%;
    margin: 0 auto;
  `,
  PageHeader = styled.h2`
    color: ${colors.text.normal};
  `,
  BoldListText = styled.h6`
    font-weight: bold;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.1px;
    color: ${colors.grey800};
  `,
  LightListText = styled.h6`
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: ${colors.grey700};
    display: inline-block;
  `,
  CardSection = styled.div`
    background-color: white;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 5px;
  `,
  GrayCardSection = styled.div`
    background-color: ${colors.grey50};
    padding: 20px;
    border-radius: 6px;
    margin-top: 10px;
  `,
  ErrorCardSection = styled.div`
    background-color: ${colors.errorLight};
    padding: 20px;
    border-radius: 6px;
    margin-top: 10px;
  `,
  ErrorOverline1 = styled.p`
    font-weight: bold;
    font-size: 10px;
    line-height: 16px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${colors.text.white};
  `,
  ErrorBody1 = styled.p`
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: ${colors.text.white};
  `,
  CardSectionNoPadding = styled.div`
    background-color: white;
    border: 1px solid #eee;
    border-radius: 5px;
  `,
  LinkText = styled.span`
    color: ${colors.link};
    text-decoration: underline;
    cursor: pointer;
  `,
  LoadingText = styled.div`
    font-size: 20px;
    padding: 20px;
    letter-spacing: 0.5px;
    text-align: center;
    font-style: italic;
    &::before,
    &::after {
      content: " .";
      animation: dots 1s steps(5, end) infinite;
    }
    &::before {
      margin-right: 15px;
    }
  `,
  TableWrapper = styled.div`
    overflow: auto;
    width: 100%;
    table {
      margin-top: 20px;
      table-layout: fixed;
      border-collapse: collapse;
      width: 100%;
      min-width: 700px;
      tr {
        border-bottom: 1px solid ${colors.borders.table};
        &.active {
          border: none;
          background: rgba(127, 81, 193, 0.6);
          td {
            color: ${colors.black};
          }
        }
      }
      td {
        font-size: 14px;
        font-weight: 400;
        padding: 12px 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }
      th {
        padding: 10px;
        font-size: 16px;
        font-weight: 600;
        background-color: ${colors.primary};
        color: ${colors.white};
        :first-of-type {
          border-radius: 6px 0 0;
        }
        :last-of-type {
          border-radius: 0 6px 0 0;
        }
      }
    }
    ${(props) =>
      props.align === "left" &&
      `
    table {
      td, th {
        text-align: left;
      }
    }
  `}
  `
