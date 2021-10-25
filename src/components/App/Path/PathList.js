import React, { useEffect, useContext } from 'react'
import { get, random } from 'lodash'
import styled from 'styled-components'
import { getYear } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons'
import { Wrapper, Container } from 'commons/styles'
import Button from 'commons/Buttons'
import useFetch from 'commons/hooks/useFetch'
import { getNations } from 'apis/path'
import OverlaySpinner from 'commons/OverlaySpinner'
import { colors } from 'theme'
import { AppContext } from 'components/App/AppContext'
import Select from 'react-select'

const PathList = ({ history, match }) => {
  const { filterParams } = useContext(AppContext)
  const [getNationsApi, loading, nations] = useFetch(getNations)

  useEffect(() => {
    getNationsApi()
  }, [])

  return (
    <Wrapper>
      {loading && <OverlaySpinner loading />}
      <Container style={{ maxWidth: 1100 }}>
        <ListWrapper>
          {get(nations, 'data', []).map((i) => (
            <div>
              <div className="issue">
                <div style={{ width: 410 }}>
                  <FontAwesomeIcon icon={faFolder} style={{ marginRight: 5, color: colors.primary }} />
                  <span style={{ cursor: 'pointer' }} onClick={() => history.push(`/path/${i.nation}`)}>
                    {i.nation || 'N/A'}
                  </span>
                </div>
                <div style={{ width: 180, filter: loading ? 'blur(2px)' : '', display: 'none', alignItems: 'center' }}>
                  <span style={{ paddingRight: 5 }}>for </span>
                  <Select
                    defaultValue={{ label: get(filterParams, 'year'), value: get(filterParams, 'year') }}
                    options={new Array(20).fill(undefined).map((i, idx) => {
                      const year = getYear(new Date()) - (idx + 1)
                      return { label: year, value: year }
                    })}
                    isSearchable={false}
                    styles={SelectStyles}
                    onChange={(selected) => {
                      // updateFilter({ ...filterParams, year: selected.value })
                    }}
                  />
                </div>
                <div style={{ width: 260 }} className="details">
                  <div className={`vote ${'YES' === 'YES' ? 'active' : ''} ${true && 'blurred'}`}>
                    <div className="status">NO</div>
                    <div className="percent">{random(51, 95)}%</div>
                  </div>
                </div>
                <div style={{ width: 260 }}>$3,4646,34344,455</div>
                <Button onClick={() => history.push(`/pathReport/${i.nation}`)} plain>
                  <FontAwesomeIcon icon={faFile} style={{ fontSize: 16, marginRight: 5 }} />
                  View Report
                </Button>
              </div>
            </div>
          ))}
          {!get(nations, 'data', []).length && <div style={{ padding: 10, fontStyle: 'italic' }}>Empty Path</div>}
        </ListWrapper>
      </Container>
    </Wrapper>
  )
}

export default PathList

const SelectStyles = {
  singleValue: (styles) => ({
    ...styles,
    fontSize: 14,
  }),
  control: (styles) => ({
    ...styles,
    borderColor: '#ccc !important',
    borderRadius: 0,
    minHeight: 0,
    background: 'transparent',
    boxShadow: 'none !important',
    width: 100,
  }),
  option: (styles) => ({
    ...styles,
    fontSize: 14,
  }),
  menu: (styles) => ({
    ...styles,
    margin: '5px 0 0',
    borderRadius: 0,
  }),
  menuList: (styles) => ({
    ...styles,
    maxHeight: 150,
  }),
  placeholder: (styles) => ({
    ...styles,
    fontSize: 14,
  }),
}

const ListWrapper = styled.div`
  letter-spacing: 0.5px;
  border-radius: 4px 4px 0 0;
  margin: 20px auto 0;
  max-width: 1100px;
  width: 100%;
  .issue {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 5px 0;
    border-bottom: 2px solid #e0e0e0;
    span.clickable {
      cursor: pointer;
    }
  }
  .details {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .vote {
    display: flex;
    flex-direction: row;
    line-height: 1.5;
    .percent {
      margin-left: 3px;
    }
    & > div {
      background: #fb8a84;
      color: #f2f2f2;
      padding: 0 5px;
      min-width: 45px;
      text-align: center;
    }
    &.active > div {
      background: #aedd94;
    }
  }
  .blurred {
    // filter: blur(4px);
  }
`
