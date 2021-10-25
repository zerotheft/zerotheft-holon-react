import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Container } from 'commons/styles'
import OverlaySpinner from 'commons/OverlaySpinner'
import { colors } from 'theme'
import { DONATE_TO } from 'constants/routes'
import { AppContext } from '../../../AppContext'

const MainWrapper = ({ loading, children }) => {
  const { selectedHolon } = useContext(AppContext)

  return (
    <Wrapper>
      <Container>
        <TitleHead>
          <h4>Donate to the Zero Theft Movement</h4>
          <ul>
            <li>
              <NavLink to={`${DONATE_TO}/zerotheft`} activeClassName="active">
                To Zero Theft Movement
              </NavLink>
            </li>
            <li>
              <a
                href={`zerotheft://home/holon/holon-donate/${selectedHolon.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Holon
              </a>
            </li>
            <li>
              <a
                href={`zerotheft://home/holon/holon-donate/${selectedHolon.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pay-it-Forward Fund
              </a>
            </li>
          </ul>
        </TitleHead>

        <Content>{loading ? <OverlaySpinner loading overlayParent /> : children}</Content>
      </Container>
    </Wrapper>
  )
}

export default MainWrapper

const Wrapper = styled.div``,
  TitleHead = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    h4 {
      font-size: 25px;
      color: ${colors.primary};
      font-weight: 700;
    }
    ul {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 50px;
      padding: 0 25px;
      position: relative;
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 6px;
        position: absolute;
        top: 50%;
        left: 0;
        margin-top: -3px;
      }
      li {
        padding: 0 3px;
        a {
          font-size: 20px;
          font-weight: 600;
          display: block;
          padding: 15px 20px;
          color: #000;
          text-decoration: none;
          &.active {
            text-decoration: underline;
            color: ${colors.primary};
          }
        }
      }
    }
  `,
  Content = styled.div`
    padding: 25px;
    border-radius: 13px;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.15);
    position: relative;
    margin-bottom: 30px;
    border-radius: 16px;
    overflow: hidden;
  `
