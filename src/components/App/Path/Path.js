import React, { useEffect, useContext, useState, useRef } from 'react'
import { get, isEmpty, startCase, toNumber, last } from 'lodash'
import { getYear } from 'date-fns'
import Collapsible from 'react-collapsible';
import Select from 'react-select'
import styled from 'styled-components'
import Tabs from 'commons/Tabs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash';
import { Container } from 'commons/styles'
import Button from 'commons/Buttons'
import OverlaySpinner from 'commons/OverlaySpinner'
import { AppContext } from 'components/App/AppContext'
import { getTheftInfo } from 'apis/reports'
import PathDetails from './PathDetails'
import BreadCrumb from './BreadCrumb'
import { calculate } from 'components/App/commons/services'
import { convertDollarToString } from 'utils'
import { colors } from 'theme'

const Path = ({ history, match, isIssuePath }) => {
  const { paths, loadingPaths: loading, filterParams, updateFilter, umbrellaPaths = [] } = useContext(AppContext)

  const [summary, setSummary] = useState({})
  const [amtLoading, updateAmtLoading] = useState(false)
  const nation = get(filterParams, 'initPath') || 'USA'
  const getTheftSummary = async () => {
    updateAmtLoading(true)
    const theftSummary = await getTheftInfo(nation, true, get(filterParams, 'year'))
    const data = theftSummary
    setSummary(data);
    updateAmtLoading(false)
  }

  const pathInTabs = paths && Object.keys(paths['USA']).map((path, index) => {
    if (paths['USA'][path] !== null)
      return { id: `path-${index + 1}`, pathId: path, name: _.startCase(path), path: `/path/USA/${path}` }
  }).filter(Boolean)
  useEffect(() => {
    getTheftSummary()
  }, [get(filterParams, 'year')]);

  const populateList = (master, parents = [match.params.pathname.split('%2F')], depth = 0) => {
    if (master && (Object.keys(master)[0]) === "parent") {
      return null
    }
    return Object.keys(master).map(i => {

      let masterClone = Object.assign({}, master[i])
      if(masterClone){
        if(masterClone.umbrella)
          delete masterClone.umbrella
        if(masterClone.leaf)
          delete masterClone.leaf
        if(masterClone.display_name)
          delete masterClone.display_name
        if(masterClone.parent)
          delete masterClone.parent
      }
      if((!isEmpty(master[i]) && (master[i]['umbrella'] || master[i]['parent']))) {
        let newParents = [...parents, i]
        let url = newParents.join('/')
        let isUmbrellaPath = umbrellaPaths.includes(url.replace('USA/', ''))
        return <CollapsibleWrapper className='collapsiblewrapper'>
          <h4 className='col-title'>{master[i]['display_name'] ? master[i]['display_name'] : startCase(i)}</h4>
          <Collapsible containerElementProps={{ id: i }} open={true} trigger={<>
            {master[i]['umbrella'] && <ItemHead>
              <div className='item-title'>
                <FontAwesomeIcon className='icon' icon={faChevronRight} style={{ marginRight: 18, color: '#878688' }} />
                <h5>Umbrella</h5>
              </div>
              <PathDetails isPath={!isUmbrellaPath} url={url} summary={summary} index={i} parents={parents} viewLink={`/path/${url.replaceAll('/' + i, '').replaceAll('/', '%2F')}/issue/${i}`} />
            </ItemHead>}
          </>}>
            <ItemBody>
              {Object.keys(master[i]).map(j => {
                return populateList({ [j]: masterClone[j] }, newParents, depth + 1)
              })}
            </ItemBody>
          </Collapsible>
        </CollapsibleWrapper>
      } else {
        let url = parents.join('/')
        if(!['umbrella', 'leaf', 'display_name'].includes(i))
        {
          return <ItemHead type='issue'>
            <div className='item-title'>
              <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: 18, color: '#878688' }} />
              <h5>{master[i] && master[i]['display_name'] ? master[i]['display_name'] : startCase(i) || 'N/A'}</h5>
            </div>
            <PathDetails url={`${url}/${i}`} summary={summary} index={i} viewLink={`/path/${url.replaceAll('/' + i, '').replaceAll('/', '%2F')}/issue/${i}`} />
          </ItemHead>
        }
      }
    })
  }
  const currentPathName = `${match.params.pathname}${match.params.id ? `%2F${match.params.id}` : ''}`,
  currentPath = get(paths, currentPathName.split('%2F').join('.')) || {}
  if (!currentPath || !Object.keys(currentPath).length) return null
  const current_path_summary = !isEmpty(summary) ? calculate(summary[get(match, 'params.pathname', '').replaceAll("%2F", "/")]) : {}
  
  return <Wrapper>
    {(loading || amtLoading) && <OverlaySpinner loading={loading || amtLoading} />}
    {!get(match, 'params.id') && <Title>
      <h3>{startCase(last(get(match, 'params.pathname', '').split('%2F')))}</h3>
      {!isIssuePath && <>
        <CurrentDetails>
          <Select
            value={{ value: filterParams.year, label: filterParams.year }}
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
          <div className={`vote-percent ${get(current_path_summary, 'vote') === 'NO' ? 'no' : ''}`}>{`${get(current_path_summary, 'vote', 'Yes')}  ${get(current_path_summary, 'votedPercent', '0')}%`}</div>
          <div className='amt'>${convertDollarToString(toNumber(get(current_path_summary, 'amount', 0)))}</div>
          <CustomButton onClick={() => {
            const isUmbrellaPath = umbrellaPaths.includes(get(match, 'params.pathname', '').replace(/%2F/g, '/').replace('USA/', ''))
            history.push(`/${isUmbrellaPath ? 'leafReport' : 'pathReport'}/${get(match, 'params.pathname', '')}`)
          }} plain width={140} height={31}>View Report</CustomButton>
        </CurrentDetails></>}
    </Title>
    }

    <div className='content'>
      {!get(match, 'params.id') && <div className='tabs'>
        <Tabs
          wrapperStyle={{ maxWidth: 250, border: '1px solid #DDDDDD', background: '#FBFBFB', borderRadius: '15px' }}
          tabs={pathInTabs}
          tabInnerStyle={{ minWidth: 0 }}
          activeTab={history.location.hash.replace('#', '')}
        />
      </div>
      }
      <div className='tabContent'>
        <ListWrapper>
          {isIssuePath && <div style={{ margin: 25 }}>
            <h4 style={{ fontSize: 20 }}>Dive Deeper</h4>
          </div>}
          {populateList(currentPath, currentPathName.split('%2F'))}
        </ListWrapper>
        <Button onClick={() => window.open(`https://zerotheft.net/propose_problem?path=${get(match, 'params.pathname', '')}`)} plain width={280} height={52} style={{ margin: '30px auto' }}>PROPOSE NEW PROBLEM AREA</Button>
      </div>
    </div>
  </Wrapper>
}

export default Path

const Wrapper = styled(Container)`
  .content {
    display: flex;
    flex-direction: row;
    padding-top: 50px;
    .tabContent {
      flex: 1;
      margin-top: 5px;
    }
    .tabs {
      width: 250px;
      position: relative;
      & > div {
        position: fixed;
        top: 155px;
        padding: 25px 0px;
      }
    }
  }
`,
  Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  position: fixed;
  z-index: 1;
  top: 60px;
  width: 100%;
  max-width: 1440px;
  padding: 10px 20px;
  h3 {
    font-size: 45px;
    color: #7F51C1;
  }
`,
  CollapsibleWrapper = styled.div`
  border-radius: 13px;
  background: #E9E6ED;
  padding: 20px;
  h4.col-title {
    background: #7F51C1;
    color: #fff;
    font-size: 19px;
    line-height: 55px;
    border-radius: 7px;
    padding: 0 25px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .collapsiblewrapper {
    background: #fff;
    padding: 20px 0 20px 20px;
    h4.col-title {
      border-radius: 7px 0 0 7px;
    }
  }
  .Collapsible__contentInner > div {
    background: white;
  }
`,
  ItemHead = styled.div`
  min-height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;
  ${props => props.type !== 'issue' && `
    border: 1px solid #B0A8A8;
    background: #fff;
    border-radius: 5px;
  `}
  h5 {
    color: #676565;
    font-size: 20px;
    font-weight: 500;
    display: inline-block;
    transition: color 0.3s ease;
    cursor: pointer;
    max-width: 320px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  svg.icon {
    transition: transform 0.3s ease;
  }
  .item-title {
    display: flex;
    height: 40px;
    flex-direction; row;
    align-items: center;
    justify-content: flex-start;
    min-width: 250px;
  }
  ${props => props.type === 'issue' && `
    cursor: default;
  `}
`,
  ItemBody = styled.div`
  padding: 10px 0px 10px 20px;
  border: 1px solid #F0F0F0;
  border-width: 0 1px 1px;
  border-radius: 0 0 28px 28px;
  margin-bottom: 10px;
`,
  ListWrapper = styled.div`
  background: #FFFFFF;
  border-radius: 28px;
  margin: 0 auto;
  width: 100%;
  .Collapsible__trigger.is-open {
    ${ItemHead} {
      svg.icon {
        transform: rotate(90deg);
      }
    }
  }
  .Collapsible .Collapsible { 
    ${ItemHead} { 
      border-radius: 16px 0 0 0;
      border-width: 1px 0 1px 1px;
    }
    ${ItemBody} {
      border-width: 0px 0 1px 1px;
      border-radius: 0 0 0 16px;
    }
  }
`,
  CurrentDetails = styled.div`
  padding: 10px;
  border-radius: 11px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #F0EDED;
  justify-content: flex-end;
  .path {
    flex: 1;
    font-size: 30px;
    font-weight: 600;
    color: ${colors.primary};
  }
  .amt {
    font-size: 27px;
    font-weight: 600;
    color: ${colors.primary};
  }
  .vote-percent {
    font-size: 16px;
    font-weight: 600;
    color: #6AB768;
    text-transform: uppercase;
    margin: 0 15px;
    &.no {
      color: #D76969;
    }
  }
`,
  CustomButton = styled(Button)`
  font-size: 13px;
  border-radius: 31px;
  border-color: #7890A7;
  color: #000;
  transition: background-color 0.3s ease, color 0.3s ease;
  margin-left: 10px;
  &:hover {
    background-color: #7890A7;
    color: #fff;
  }
`
