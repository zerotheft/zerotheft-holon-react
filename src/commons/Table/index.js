import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from 'theme'
import OverlaySpinner from 'commons/OverlaySpinner'

export const Wrapper = styled.div`
    width: 100%;
    position: relative;
    background: #fff;
    overflow: auto;
    padding-bottom: 100px;
  `,
  Td = styled.td`
    text-align: ${props => props.align || 'left'};
    padding: 7px 10px;
    min-width: ${props => (props.width ? `${props.width}px` : 'auto')};
    border-bottom: 1px solid #f4f4f4;
    ${props => props.css}
  `,
  Th = styled.th`
    padding: 10px;
    font-weight: 600;
    background: #fff;
    border-bottom: 2px solid #f4f4f4;
    & > span {
      display: flex;
      flex-direction: row;
      justify-content: ${props => align[props.align]};
      align-items: center;
      & > img {
        margin-left: 5px;
        width: 15px;
      }
    }
    ${props =>
    props.maxWidth &&
      `
      max-width: ${props.maxWidth}px;
    `}
  `,
  Tr = styled.tr`
    ${props =>
    props.clickable &&
      `
      cursor: pointer;
    `}
  `,
  THead = styled.thead`
    ${Tr} {
      ${Th}:first-of-type {
        border-radius: 6px 0 0 0;
      }
      ${Th}:last-of-type {
        border-radius: 0 6px 0 0;
      }
    }
  `,
  TBody = styled.tbody``,
  T = styled.table`
    width: 100%;
    min-width: ${props => props.minWidth || 1000}px;
    padding-bottom: 40px;
  `,
  PaginationWrapper = styled.div`
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    ul {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      list-style: none;
      li {
        margin: 0 5px;
        a {
          outline: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
        }
        &.active {
          a {
            color: ${colors.primary};
          }
        }
      }
    }
  `

const cell = (key, item, columns) => (
  <Td key={key} align={columns[key].align} width={columns[key].width} css={columns[key].css}>
    {columns[key].content ? columns[key].content(item) : item[key]}
  </Td>
)

const getRows = (item, columns, rowConfig = {}) => (
  <>
    <Tr
      onClick={() => (rowConfig.onClick ? rowConfig.onClick(item) : null)}
      className={rowConfig.className ? rowConfig.className(item) : null}
      style={{
        ...(rowConfig.getStyle ? rowConfig.getStyle(item) : {}),
        cursor: rowConfig.onClick ? 'pointer' : 'default',
      }}
    >
      {Object.keys(columns).map(key => cell(key, item, columns))}
    </Tr>
    {rowConfig.getExtraRow ? rowConfig.getExtraRow(item) : null}
  </>
)

const getHeaderColumns = columns =>
  Object.keys(columns).map(key => {
    return (
      <Th
        key={key}
        align={columns[key].align || 'left'}
        style={{
          cursor: columns[key].label && columns[key].onSort ? 'pointer' : 'default',
        }}
        onClick={columns[key].label && columns[key].onSort ? columns[key].onSort : null}
        maxWidth={columns[key].maxWidth || null}
      >
        <span>{columns[key].label ? columns[key].label : ''}</span>
      </Th>
    )
  })

const Table = ({
  columns,
  data = [],
  minWidth = 768,
  limit = 0,
  totalRows = 0,
  showPagination = false,
  currentPage = 0,
  setCurrentPage,
  hideUnavailableInfo,
  loading = false,
  rowConfig = {},
  wrapperStyle,
}) => {
  const noData = !loading && !data.length && !hideUnavailableInfo

  return (
    <Wrapper style={wrapperStyle}>
      {loading && <OverlaySpinner loading overlayParent />}
      <T cellSpacing="0" cellPadding="0" minWidth={minWidth} style={noData ? { paddingBottom: 10 } : {}}>
        <THead>
          <Tr>{getHeaderColumns(columns)}</Tr>
        </THead>
        <TBody>{data.length ? data.map(i => getRows(i, columns, rowConfig)) : null}</TBody>
      </T>
      {noData && <span style={{ fontStyle: 'italic' }}>No Data Available</span>}
    </Wrapper>
  )
}

export default Table

Table.propTypes = {
  columns            : PropTypes.object,
  currentPage        : PropTypes.number,
  data               : PropTypes.array,
  hideUnavailableInfo: PropTypes.bool,
  limit              : PropTypes.number,
  loading            : PropTypes.bool,
  minWidth           : PropTypes.number,
  rowConfig          : PropTypes.object,
  setCurrentPage     : PropTypes.func,
  showPagination     : PropTypes.bool,
  totalRows          : PropTypes.number,
  wrapperStyle       : PropTypes.object,
}

const align = {
  left  : 'flex-start',
  center: 'center',
  right : 'flex-end',
}
