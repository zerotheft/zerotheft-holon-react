import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { colors } from "theme"

export const customStyles = {
  rows: {
    style: {
      height: "35px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "30px", // override the cell padding for head cells
      paddingRight: "30px",
      background: colors.textTitle,
      color: colors.border.table,
      fontFamily: "Poppins",
      fontWeight: "500",
      fontSize: "15px",
      lineHeight: "22px",
      letterSspacing: "0.03em",
    },
  },
  cells: {
    style: {
      paddingLeft: "30px", // override the cell padding for data cells
      paddingRight: "30px",
    },
  },
}

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 90%;
`

export const TableWrapper = styled.div`
  border: 1px solid ${colors.textTitle};
  box-sizing: border-box;
  border-radius: 8px;
  background-color: ${colors.textTitle};
  overflow: hidden;
  .datatableWrapper {
    border-radius: 0;
  }
  & div[role="rowgroup"] {
    & > div {
      color: ${colors.datatable.row.textColor};
      &:nth-of-type(2n) {
        background: ${colors.datatable.row.evenRowBackground};
      }
    }
  }
  & div[role="heading"] {
    color: ${colors.textTitle};
  }
`

export const ListMenu = styled.div`
  position: relative;
  ul {
    background: white;
    min-width: 215px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-left: 5px;
    li {
      display: block;
      width: 100%;
      span {
        display: block;
        overflow: hidden;
        transition: 0.5s ease-in-out;
        padding: 5px 10px;
        font-family: Poppins;
        font-style: normal;
        font-weight: normal;
        color: ${colors.greyText};
        font-size: 18px;
        line-height: 228%;
        text-decoration: none;
        &:hover {
          color: ${colors.background.body};
          background: ${colors.textTitle};
        }
      }
    }
  }
  & > ul {
    position: absolute;
    top: 100%;
    left: 10px;
    z-index: 1;
    display: none;
    ul {
      position: absolute;
      left: 100%;
      top: 0;
      display: none;
    }
    li:hover {
      & > ul {
        display: block;
      }
    }
  }
  &:hover {
    & > ul {
      display: block;
    }
  }
`

export const TabWrapper = styled(NavLink)`
    background: none;
    text-decoration: none;
    color: ${colors.text}
    font-size: 17px;
    line-height: 48px;
    margin: 15px;
    &.selected {
        border-bottom: 2px solid;
        font-weight: 500;
    }
`
