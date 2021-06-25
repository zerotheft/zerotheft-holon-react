import React from 'react'
import { startCase } from 'lodash'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Container } from 'commons/styles'
import { colors } from 'theme'

// const checkRoute = (routes, currentRoute) => {
//   if (!currentRoute || isEmpty(routes)) return true
//   else if (!includes(routes, last(currentRoute.split('/')))) return true
//   return false
// }

const MainWrapper = ({ title, stepsPage, pathname, children, }) => {
  const history = useHistory()
  const pathCrumbs = pathname.split('%2F')

  return <Wrapper>
    {!stepsPage && <BreadcrumbWrapper>
      <Container>
        <ul className='breadcrumb'>
          {pathCrumbs.map((crumb, index, { length }) => {
            const currentPath = pathCrumbs.slice(0, index + 1).join('%2F')
            return index + 1 === length ? <li>{startCase(crumb)}</li> : 
              <li><Link to={`/path/${currentPath}`}>{startCase(crumb)}</Link></li>
          })}
        </ul>
        <h4>{history.location.pathname.includes('voted') ? 'You Added Your Vote on:' : 'Add your vote on:'} <span>{title ? startCase(title) : 'N/A'}</span></h4>
      </Container>
    </BreadcrumbWrapper>}
    <Container>{children}</Container>
  </Wrapper>
}

export default MainWrapper

const Wrapper = styled.div`
  position: relative;
  overflow-x: hidden;
`,
BreadcrumbWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0px; left: 0;
  background: ${colors.background.white};
  z-index: 2;
  ul.breadcrumb {
    display: flex;
    flex-direction: row;
    align-items: center;
    li {
      font-size: 18px;
      font-weight: 500;
      color: ${colors.primary};
      a {
        color: #A4A4A4;
        transition: color 0.3s ease;
        text-decoration: none;
        &:hover {
          color: ${colors.primary};
        }
      }
      
      &:not(:last-of-type) {
        &::after {
          color: #A4A4A4;
          content: '>';
          margin: 0 10px;
        }
      }
    }
  }
  h4 {
    margin-top: 5px;
    font-size: 19px;
    font-weight: 600;
    color: #898293;
    text-transform: uppercase;
    span {
      color: ${colors.primary};
    }
  }
`
