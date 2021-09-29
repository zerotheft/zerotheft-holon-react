import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import useFetch from 'commons/hooks/useFetch'
import OverlaySpinner from 'commons/OverlaySpinner'
import { getReport, getNationReport } from 'apis/reports'
import { AppContext } from 'components/App/AppContext'
import { colors } from 'theme'

const Report = ({ match, history }) => {
  const [getReportApi, fetching, reportResponse] = useFetch(getReport)
  const [getNationReportApi, nationFetching, nationReportResponse] = useFetch(getNationReport)
  const { pathName, leafName } = match.params
  const { loading, filterParams } = useContext(AppContext)

  useEffect(() => {
    if (pathName) {
      if (pathName === get(filterParams, 'initPath')) {
        getNationReportApi(pathName, get(filterParams, 'year'))
      } else {
        getReportApi(pathName, !!pathName, get(filterParams, 'year'))
      }
    }
    if (leafName) getReportApi(leafName, false, get(filterParams, 'year'))
  }, [get(filterParams, 'year')])

  return (
    <>
      {(fetching || loading || nationFetching) ? (
        <>
          <OverlaySpinner loading={fetching || loading || nationFetching} />
          <NoReportWrapper>Generating Report...</NoReportWrapper>
        </>
      ) :
        <>
          <GoBackDiv><span onClick={() => history.goBack()}>&#60;Go Back</span></GoBackDiv>
          {(get(reportResponse, 'report') || get(nationReportResponse, 'report')) ?
            <IframeWrapper>
              <Iframe src={get(reportResponse, 'report') || get(nationReportResponse, 'report')} width="100%" height="100%" ></Iframe>
            </IframeWrapper> :
            (<NoReportWrapper>{get(reportResponse, 'message') || get(nationReportResponse, 'message') || 'Report is not available yet. Please come back later or error encountered.'}</NoReportWrapper>)
          }
        </>
      }
    </>
  )
}


export const Iframe = styled.iframe`
  overflow: auto;
  width: calc(100% + 17px);
  border: ${props => props.border || '2px solid var(--lighterGrey)'};
  height:calc(100vh - 60px - 45px - 20px);
  scrolling: no;
`,
  IframeWrapper = styled.div`
  overflow: hidden;
  `,
  NoReportWrapper = styled.div`
  padding: 30px 10px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  `,
  GoBackDiv = styled.div`
  width: 100%;
  color: ${colors.primary};
  font-weight: 500;
  margin-top: -40px;
  text-align: right;
  padding: 20px 40px 0 0;
  > span {
    cursor: pointer;
  }
  `
  ;


export default Report