import styled from 'styled-components'
import { colors } from 'theme';
import { NavLink } from 'react-router-dom'

export const customStyles = {
    rows: {
      style: {
        height: '35px', // override the row height
      }
    },
    headCells: {
      style: {
        paddingLeft: '30px', // override the cell padding for head cells
        paddingRight: '30px',
        background: '#7F58BF',
        color: '#F2F2F2',
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: '15px',
        lineHeight: '22px',
        letterSspacing: '0.03em',
      },
    },
    cells: {
      style: {
        paddingLeft: '30px', // override the cell padding for data cells
        paddingRight: '30px',
      },
    },
  };

  
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
  & div[role=rowgroup] {
    & > div {
        color: ${colors.datatable.row.textColor};
        &:nth-of-type(2n) {
            background: ${colors.datatable.row.evenRowBackground};
        }
    }
  }
  & div[role=heading]{
      color: ${colors.textTitle};
  }`

  export const ListMenu = styled.div`
  position: relative;
  ul {
      background: white;
      min-width: 175px;
      li {
          padding: 5px 10px;
    a{
        color: black;
        font-size: 17px;
        line-height: 48px;
        text-decoration: none;
    }
    }
    }
  & > ul {
      position: absolute;
      top: 100%; left: 10px; z-index: 1;
      display: none;
      ul {
          position: absolute;
          left: 100%; top: 0;
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