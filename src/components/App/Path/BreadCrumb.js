import React from 'react'
import PropTypes from 'prop-types'
import { colors } from 'theme'
import { get, startCase } from 'lodash'
import styled from 'styled-components'

import { Container } from 'commons/styles'

const BreadCrumbs = ({ match }) => {
  let breadcrumb = get(match, 'params.pathname').split('%2F')
  if (breadcrumb.length) {
    let currentPath = ''
    breadcrumb = breadcrumb.map((i) => {
      currentPath = currentPath ? `${currentPath}%2F${i}` : i
      return { label: i, path: currentPath }
    })
  }

  return (
    <Wrapper>
      <BreadCrumb>
        {breadcrumb.map((i) => (
          <li>
            <span onClick={() => window.location.replace(i.path)}>{startCase(i.label)}</span>
          </li>
        ))}
      </BreadCrumb>
    </Wrapper>
  )
}

export default BreadCrumbs
BreadCrumbs.propTypes = {
  match: PropTypes.object,
}

const Wrapper = styled(Container)`
    margin: 20px auto;
  `,
  BreadCrumb = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    li {
      &:not(:last-of-type) {
        &::after {
          content: '>';
          margin: 0 5px;
        }
      }
      & > span {
        cursor: pointer;
        font-size: 17px;
        font-weight: 600;
        color: #7d7288;
        &:hover {
          color: ${colors.primary};
        }
      }
    }
  `
