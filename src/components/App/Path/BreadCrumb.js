import React from 'react'
import { colors } from 'theme'
import { get, startCase } from 'lodash'
import styled from 'styled-components'

import { Container } from 'commons/styles'

const BreadCrumbs = ({ match, history }) => {
  let breadcrumb = get(match, 'params.pathname').split('%2F')
  if (breadcrumb.length) {
    let current_path = ''
    breadcrumb = breadcrumb.map((i) => {
      current_path = current_path ? `${current_path}%2F${i}` : i
      return { label: i, path: current_path }
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
