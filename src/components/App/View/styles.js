import styled from "styled-components"

export const HeaderContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    h2 {
      font-family: "Poppins", sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 40px;
      line-height: 60px;
      /* identical to box height */
      letter-spacing: 0.03em;
      color: #7f51c1;
    }
  `,
  ButtonSection = styled.div`
    display: flex;
    flex-flow: row wrap;
    .btn {
      font-family: "Poppins", sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      /* identical to box height */
      letter-spacing: 0.03em;
      text-decoration: none;
      padding: 8px 30px;
      border: 1px solid #7f51c1;
      margin-left: 10px;
      border-radius: 5px;
      color: #7f51c1;
    }
    .btn.btn-bg {
      background: #7f51c1;
      color: #fff;
    }
  `,
  DataSection = styled.div`
    display: flex;
    flex-flow: column;
    margin-top: 20px;
    background: #f5f5f5;
    border-radius: 9px;
    padding: 30px 20px 20px 20px;
    margin-bottom: 20px;
    padding: 0;
    background: none;
    align-items: flex-start;
    h4 {
      background: #7f51c1;
      color: #fff;
      font-family: Poppins;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      /* identical to box height, or 46px */
      padding: 14px 24px;
      border-radius: 7px;
      margin-bottom: 20px;
    }
    li {
      margin-bottom: 14px;
    }
    ul {
      display: flex;
      flex-flow: row wrap;
      li {
        width: calc(100% / 2);
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        strong {
          font-family: "Poppins", sans-serif;
          font-weight: 400;
          font-size: 16px;
          /* or 43px */
          letter-spacing: -0.005em;
          color: #7f51c1;
          width: 230px;
        }
        span {
          display: flex;
          width: calc(100% - 230px);
          font-family: "Poppins", sans-serif;
          font-size: 15px;
          /* or 42px */
          letter-spacing: 0.03em;
          color: #545050;
          .yesText {
            color: #31b510;
            margin-right: 20px;
          }
          .noText {
            color: red;
          }
        }
      }
    }
    .viewVoteDtlsSec {
      h4 {
        background: #7f51c1;
        color: #fff;
        font-family: Poppins;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        /* identical to box height, or 46px */
        padding: 14px 24px;
        border-radius: 7px;
        margin-bottom: 20px;
      }
      li {
        margin-bottom: 14px;
      }
    }
  `,
  VoteDetailSection = styled.div`
    display: flex;
    flex-flow: column;
    margin-top: 40px;
    h2 {
      font-family: "Poppins", sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 19px;
      line-height: 28px;
      /* identical to box height */
      letter-spacing: 0.03em;
      /* Main Color */
      color: #7f51c1;
    }
    table thead tr th {
      background: #7f51c1;
      padding: 13px 20px;
      color: #fff;
      font-family: "Poppins", sans-serif;
      font-style: normal;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.03em;
    }
    table tbody tr td {
      padding: 13px 20px;
      font-family: "Poppins", sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      color: #705d8b;
      line-height: 22px;
      letter-spacing: 0.03em;
    }
  `
