import React, { useState, useEffect, useContext } from 'react'
import { find, get } from 'lodash'
import styled from 'styled-components'

import useFetch from 'commons/hooks/useFetch'
import { getHolons } from 'apis/holon'

import { Wrapper, Container } from 'commons/styles'
import Button from 'commons/Buttons'
import Table from 'commons/Table'
import { colors } from 'theme'
import { truncateString } from 'utils'
import { AppContext } from '../AppContext'

const Areas = () => {
  const { selectedHolon } = useContext(AppContext)

  const [selectedArea, selectArea] = useState(null)
  const [getHolonsApi, loading, holons = []] = useFetch(getHolons)

  useEffect(() => {
    window.location.replace('/')
    // getHolonsApi().then(data => {
    //   selectArea(find(data, { address: get(selectedHolon, 'id') }))
    // })
  }, [])

  const getColumns = (selectedArea, localHolon) => ({
    state: {
      width: 20,
      content: i => {
        if (i.address === get(localHolon, 'id'))
          return <GreenCircle></GreenCircle>
        return null
      }
    },
    holon: {
      key: 'holon',
      label: 'Holon',
      content: i => <p>{i.url}</p>,
    },
    country: {
      label: 'Country',
      width: 125,
      content: i => <p>{i.countryCode}</p>
    },
    health: {
      key: 'health',
      label: 'Health',
      width: 100,
    },
    action: {
      width: 30,
      content: i => <Arrow status={i.address === get(selectedArea, 'address') || i.address === get(localHolon, 'id')}></Arrow>
    }
  })

  return null

  return <Wrapper>
    <Container>
      <TitleSection>
        <h3>Select which Holon <br />you want to join</h3>
        <h5>You need a holon on where you will view problems and vote.  PICK one you can trust.  Picking one outside of your country can be a good thing.</h5>
      </TitleSection>
      <AreasWrapper>
        <div className='areas'>
          <Table
            columns={getColumns(selectedArea, selectedHolon)}
            data={holons || []}
            loading={loading}
            rowConfig={{
              onClick: i => selectArea(i),
              className: i => `${i.address === get(selectedArea, 'address') ? 'active' : ''} ${i.address === get(selectedHolon, 'id') ? 'local' : ''}`
            }}
          />
        </div>
        <div className='description'>
          {selectedArea && <React.Fragment>
            <div className='title'>
              <h4>{selectedArea.port}</h4>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>Status: <span style={{ fontWeight: 'bold' }}>{selectedArea.health}</span></div>
                <Button style={{display: 'none'}}onClick={() => window.open('zerotheft://areas')} disabled={selectedArea.address === selectedHolon.id}>{selectedArea.address === selectedHolon.id ? 'Selected' : 'Select this'} Holon</Button>
              </div>
            </div>
            <div className='details'>
              <div>Description:</div>
            </div>
            <div className='holonId'>ID: <span>{truncateString(selectedArea.address, 12)}</span></div>
          </React.Fragment>}
        </div>
      </AreasWrapper>
    </Container>
  </Wrapper>
}

export default Areas

const TitleSection = styled.div`
  padding-bottom: 50px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 32px;
  }
  h5 {
    font-size: 20px;
    max-width: 500px;
    font-weight: normal;
  }
`,
  AreasWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  min-height: 200px;
  line-height: 1.3;
  & > .areas {
    flex: 1;
    padding-right: 30px;
    margin-right: 30px;
    border-right: 2px solid #ccc;
    table {
      tbody {
        tr {
          &.active {
            td {
              background: #f2f2f2;
            }
          }
          &.local {
            td {
              color: ${colors.primary};
            }
          }
        }
      }
    }
  }
  & > .description {
    width: 500px;
    font-size: 18px;
    .title {
      h4 {
        font-size: 24px;
        margin-bottom: 10px;
      }
      margin-bottom: 20px;
    }
    .details {
      min-height: 300px;
    }
    .holonId {
      text-align: right;
      span {
        color: ${colors.primary};
      }
    }
  }
`,
  Arrow = styled.span`
  margin: 5px 0;
  width: 15px; height: 15px;
  display: block;
  border: 2px solid #ccc;
  border-width: 2px 2px 0 0;
  transform: rotate(45deg);
  float: right;
  ${props => props.status && `
    border-width: 3px 3px 0 0;
    border-color: ${colors.primary};
  `}
`,
  GreenCircle = styled.span`
  width: 15px; height: 15px;
  display: block;
  border-radius: 15px;
  background: green;
  float: left;
`
