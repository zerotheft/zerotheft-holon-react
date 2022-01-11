import styled from "styled-components"
import { colors } from "theme"

export const HeadlineH1 = styled.h1`
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: -1.25%;
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
  GrayHeadlineH3 = styled.h3`
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.15px;
    line-height: 28px;
    color: ${colors.greyHeader};
  `,
  GrayHeadlineH4 = styled.h4`
    font-size: 1.25rem;
    font-weight: 500;
    letter-spacing: 0.009rem;
    color: ${colors.greyHeader};
  `,
  GrayHeadlineH5 = styled.h5`
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
    letter-spacing: 0.1px;
    color: ${colors.greyHeader};
  `,
  GrayTextP = styled.p`
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.25px;
    color: ${colors.greyHeader};
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
  GraySubTextUL = styled.ul`
    font-size: 14px;
    font-weight: normal;
    line-height: 24px;
    letter-spacing: 0.25px;
    color: ${colors.greyHeader};
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
  CardSection = styled.div`
    background-color: white;
    padding: 20px;
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
