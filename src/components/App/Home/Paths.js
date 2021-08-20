import React, { useContext } from 'react'
import { get, startCase, isEmpty } from 'lodash'
import styled from 'styled-components'

import Button from 'commons/Buttons'
import { Container, LoadingText, EmptyText } from 'commons/styles'
import { AppContext } from '../AppContext'
import PathItem from './PathItem'

const Paths = ({ summary = [] }) => {
  const { paths, loading, loadingTheft, filterParams } = useContext(AppContext)
  const allPaths = get(paths, get(filterParams, 'initPath'), {})
  return <Wrapper>
    <Container>
      <ContentWrapper className={!loading && !loadingTheft && !isEmpty(get(paths, get(filterParams, 'initPath'), {})) ? 'divide' : ''}>
        {(loading || loadingTheft) ? <LoadingText>Fetching Paths</LoadingText> :
          <UL>
            {Object.keys(allPaths).map((key) => {
              const isIssuePath = isEmpty(get(paths, get(filterParams, 'initPath'), {})[key])
              const childPaths = get(paths, get(filterParams, 'initPath'), {})[key] || {}
              const childPathsClone = Object.assign({}, childPaths);
              ['umbrella', 'leaf', 'display_name', 'parent', 'metadata'].forEach(k => delete childPathsClone[k])
              return <li>
                <PathItem summary={summary} parent={true} to={isIssuePath ? `/path/${get(filterParams, 'initPath')}/${key}` : `/path/${get(filterParams, 'initPath')}/${key}`} name={allPaths[key]['display_name'] ? allPaths[key]['display_name'] : startCase(key || 'N/A')} />
                {!isEmpty(childPaths) ? <ul>
                  {Object.keys(childPathsClone).map((innerKey) => {
                    const isIssue = childPaths[innerKey] && childPaths[innerKey].leaf
                    return <li><PathItem summary={summary} to={isIssue ? `/path/${get(filterParams, 'initPath')}/${key}` : `/path/${get(filterParams, 'initPath')}/${key}/${innerKey}`} name={(childPaths[innerKey]['metadata'] && childPaths[innerKey]['metadata']['display_name']) || childPaths[innerKey]['display_name'] || startCase(innerKey || 'N/A')} /></li>
                  })}
                </ul> : null}
              </li>
            })}
          </UL>
        }
        {(!loading && !loadingTheft && isEmpty(get(paths, get(filterParams, 'initPath'), {}))) ? <EmptyText>No Data Available</EmptyText> : null}
      </ContentWrapper>
      <Button onClick={() => window.open(`https://zerotheft.net/propose_problem?path=USA`)} plain width={280} height={52} style={{ margin: '30px auto 0', backgroundColor: 'transparent' }}>PROPOSE NEW PROBLEM AREA</Button>
    </Container>
  </Wrapper>
}

export default Paths

const Wrapper = styled.div`
  background: #F6FAFB;
  padding: 40px 0;
  margin: 40px 0 0;
`,
  ContentWrapper = styled.div`
  position: relative;
  padding: 20px;
  &:not(.divide) {
    background: #FFFFFF;
    box-shadow: 0px 0px 14px #D8E1E3;
    border-radius: 14px;
  }
  &.divide {
    &::before, &::after {
      content: '';
      display: block;
      width: calc(50% - 20px);
      height: 100%;
      position: absolute;
      top: 0;
      background: #FFFFFF;
      box-shadow: 0px 0px 14px #D8E1E3;
      border-radius: 14px;
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
  }
`,
  UL = styled.ul`
  column-count: 2;
  column-gap: 80px;
  position: relative;
  z-index: 1;
  & > li {
    break-inside: avoid;
    page-break-inside: avoid;
    will-change: transform;
    & > ul {
      margin-left: 20px;
      a {
        
      }
    }
  }
`
