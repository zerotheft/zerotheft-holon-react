import React, { useState, useContext, useEffect } from 'react'
import { get } from 'lodash'
import { getYear } from 'date-fns'
import { NavLink, Link } from 'react-router-dom'
import Select from 'react-select'
import styled from 'styled-components'

import BRANDLOGO from 'assets/icons/zerotheft.svg'
import HomeIcon from './svgs/home'
import DonateIcon from './svgs/donate'
import PathIcon from './svgs/path'
import HolonIcon from './svgs/holon'

import { getNations } from 'apis/path'
import useFetch from 'commons/hooks/useFetch'

import * as ROUTES from 'constants/routes'
import OverlaySpinner from 'commons/OverlaySpinner'
import { Container } from 'commons/styles'
import { colors } from 'theme'
import { AppContext } from '../../AppContext'

const Header = () => {
  const [getNationsApi, loading, nations] = useFetch(getNations)
  const { selectedHolon, filterParams, updateFilter } = useContext(AppContext)
  const [country, selectCountry] = useState({ value: get(filterParams, 'initPath', 'USA'), label: get(filterParams, 'initPath', 'USA') })

  useEffect(() => {
    getNationsApi()
  }, [])

  return <Wrapper>
    {loading && <OverlaySpinner loading />}
    {/* <Container>
      <TopHeader>
        {selectedHolon.id ? `Connected to: ${selectedHolon.port}` : 'Not connected to any holons'}
        <a href="zerotheft://holon"><span style={{ marginLeft: 15 }}>{selectedHolon.id ? 'Change' : 'Select'} Holon</span></a>
      </TopHeader>
    </Container> */}
    <Container>
      <LeftWrapper>
        <BrandLogo>
          <Link to='/'>
            <img src={BRANDLOGO} alt='brand logo' />
          </Link>
        </BrandLogo>
        <MenuWrapper>
          <li>
            <NavLink to={'/'} activeClassName='active1'>
              <HomeIcon />
            Home
          </NavLink>
          </li>
          <li>
            <a href="zerotheft://holon">
              <HolonIcon />
            Holons
          </a>
          </li>
          <li>
            <NavLink to={`${ROUTES.PATH}/${country.value}`} activeClassName='active'>
              <PathIcon />
            Paths
          </NavLink>
          </li>
          {selectedHolon.id && <li>
            <NavLink to={ROUTES.DONATE} activeClassName='active'>
              <DonateIcon />
            Donate
          </NavLink>
          </li>}
          <li className='more'>
              <PathIcon />
            More
              <ul>
                <li><NavLink to={`${ROUTES.DATALIST}`} activeClassName='active'>Citizens/Proposals</NavLink></li>
                <li><NavLink to={`${ROUTES.VOTELIST}`} activeClassName='active'>Votes</NavLink></li>
              </ul>
          </li>
        </MenuWrapper>
      </LeftWrapper>
      <RightWrapper>
        <Select
          value={country}
          isSearchable={false}
          options={[...get(nations, 'data', []).map(i => ({ label: i.nation, value: i.nation })), { value: 'none', label: 'Select Another Country' }]}
          onChange={async i => {
            if (i.value === 'none') {
              await selectCountry({ value: 'USA', label: 'USA' })
              window.open('https://zerotheft.net/the-zt-global-expansion/', true)
            }
            else selectCountry(i)
          }}
          styles={{
            container: styles => ({
              ...styles,
              marginRight: 5
            }),
            menu: styles => ({
              ...styles,
              width: 210
            }),
            control: styles => ({
              ...styles,
              width: 90,
              borderColor: 'transparent !important',
              border: 'none !important',
            }),
            singleValue: styles => ({
              ...styles,
              fontSize: 15,
              fontWeight: 500,
              color: '#77707D'
            }),
            indicatorSeparator: () => ({
              display: 'none'
            })
          }}
        />
        <Select
          defaultValue={{ value: filterParams.year, label: filterParams.year }}
          options={new Array(20).fill(undefined).map((val, index) => ({ label: getYear(new Date) - (index + 1), value: getYear(new Date) - (index + 1) }))}
          onChange={selected => {
            localStorage.setItem("filterYear", selected.value)
            updateFilter({ ...filterParams, year: selected.value })
          }}
          isSearchable={false}
          styles={{
            control: styles => ({
              ...styles,
              width: 90,
              border: 'none'
            }),
            singleValue: styles => ({
              ...styles,
              fontSize: 15,
              fontWeight: 500,
              color: '#77707D'
            }),
            indicatorSeparator: () => ({
              display: 'none'
            })
          }}
        />
      </RightWrapper>
    </Container>
  </Wrapper>
}

export default Header

const Wrapper = styled.header`
  height: 60px;
  width: 100%;
  position: fixed;
  top: 0; left: 0;
  box-shadow: 0px 1px 0px 0px #CDDADD;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  background: #fff;
  & > ${Container} {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top:10px;
  }
`,
  TopHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px 0;
  align-items: center;
  a {
    color: ${colors.primary};
  }
`
const BrandLogo = styled.div`
  img {
    display: block
  }
`;
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  max-width: 750px;
  justify-content: space-between;
`;
const RightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const MenuWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  .more {
    cursor: pointer;
    color: #8C8989;
    position: relative;
    ul {
      opacity:0;
      visibility:visible;
      box-shadow: 0 0 8px rgba(0,0,0,0.2);
      border-radius: 4px;
      background: #fff;
      transition: 0.5s ease-in-out;
      top: 10px;
      position: absolute;
      li {
        margin: 0;
        a {
          padding: 3px 10px;
        }
      }
    }
  }
  li.more:hover ul {
    opacity:1;
    visibility:visible;
    top: 50px;
  }
  li {
    margin: 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    a {
      text-decoration: none;
      color: #8C8989;
      font-size: 15px;
      font-weight: 500;
      display: flex;
      flex-direction: row;
      align-items: center;
      svg {
        margin-right: 10px;
      }
      &.active {
        color: ${colors.primary};
        svg {
          path {
            fill: ${colors.primary};
          }
        }
      }
    }
  }
`;