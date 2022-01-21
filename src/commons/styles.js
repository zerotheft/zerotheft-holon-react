import styled from "styled-components"

import { fontSize, colors } from "theme"

export const Wrapper = styled.div`
    padding: 40px 0;
  `,
  Breadcrumb = styled.div`
    ul {
      list-style: none;
      margin-bottom: 12px;
      li {
        display: inline;
        font-size: 24px;
        color: ${colors.link};
        text-decoration: none;
        &:not(:last-child):after {
          content: ">";
          padding: 0 5px;
          color: ${colors.link};
        }
        &:not(:last-child):hover {
          cursor: pointer;
        }
        :last-child {
          color: ${colors.text.gray};
          text-decoration: none;
        }
        :first-child {
          &::before {
            content: "";
            width: 14px;
            height: 14px;
            border: 1px solid #aaa;
            border-width: 4px 4px 0 0;
            transform: rotate(-133deg) translateY(48%);
            display: inline-block;
            margin: 0px 14px -7px -9px;
          }
        }
      }
    }
  `,
  AddVote = styled.div`
    padding: 4px 0 20px 20px;
    font-size: 16px;
    div {
      font-size: 24px;
      padding: 10px 0;
      color: ${colors.link};
      &::before {
        content: "";
        width: 12px;
        height: 12px;
        border: 1px solid #aaa;
        border-width: 4px 4px 0 0;
        transform: rotate(45deg) translateY(-50%);
        display: inline-block;
        margin: 0px 20px -5px -9px;
      }
    }
  `,
  Container = styled.div`
    max-width: 100%;
    min-width: 1100px;
    width: 100%;
    margin: 0 auto;
    padding: 0 30px;
  `,
  TabContentWrapper = styled.div``,
  Section = styled.div`
    padding: 20px 0 30px;
  `,
  SectionHeader = styled.div`
    font-size: ${fontSize.h2};
    font-weight: 600;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  `,
  LinkText = styled.span`
    color: ${colors.link};
    cursor: pointer;
    font-size: 16px;
    font-weight: normal;
    text-decoration: underline;
  `,
  SectionHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: flex-end;
    ${SectionHeader} {
      margin-bottom: 0;
    }
  `,
  FlexRow = styled.div`
    display: flex;
    align-items: center;
  `,
  Error = styled.div`
    border: 1px solid #ffdddd;
    padding: 6px;
    margin: 12px 0;
    border-radius: 4px;
    flex: 1 1 0%;
    color: #ff7373;
    background: #fff8f8;
  `,
  HeaderWrapper = styled.div`
    display: flex;
    padding: 20px 0;
    @media (max-width: 1024px) {
      flex-direction: column;
    }
  `,
  Header = styled.div`
    flex: 1 1 0%;
    font-weight: 600;
    cursor: pointer;
    font-size: ${fontSize.h1};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  EmptyText = styled.div`
    font-style: italic;
    font-size: 18px;
    opacity: 0.4;
    margin: 10px 0;
  `,
  LoadingText = styled.div`
    font-size: 18px;
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
  `
