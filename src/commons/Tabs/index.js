import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Container } from 'commons/styles'
import { colors, fontSize } from 'theme'

const Tabs = ({ tabs, wrapperStyle, tabStyle, activeStyle, tabInnerStyle, activeTab }) => {
  return (
    <Wrapper style={wrapperStyle}>
      <Container style={{ display: 'flex', flexDirection: 'column', ...tabInnerStyle }}>
        {tabs.map(tab => {
          return (
            <TabWrapper
              key={tab.id}
              to={tab.path}
              active={activeTab==tab.pathId}
              onClick={()=>{
                const elementPosition = document.getElementById(tab.pathId).offsetTop;
                const offsetPosition = elementPosition - 130;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }}
              style={tabStyle}
              activeStyle={{
                fontWeight: '600',
                background: '#7F51C1',
                color     : 'white',
                ...activeStyle,
              }
              }
            >
              {tab.name}
            </TabWrapper>
          )
        })}
      </Container>
    </Wrapper>
  )
}

Tabs.propTypes = {
  activeStyle  : PropTypes.object,
  tabInnerStyle: PropTypes.object,
  tabs         : PropTypes.array.isRequired,
  tabStyle     : PropTypes.object,
  wrapperStyle : PropTypes.object,
}

const Wrapper = styled.div`
    display: none;
    @media(min-width: 768px){
        display: flex;
    }
`,
  TabWrapper = styled(NavLink)`
    text-decoration: none;
    color: #000;
    border-radius: 10px;
    font-size: 17px;
    line-height: 48px;
    padding: 0 15px;
`

export default Tabs
