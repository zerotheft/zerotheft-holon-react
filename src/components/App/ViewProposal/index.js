import React, { useEffect } from 'react'
import { startCase, compact, concat, get } from 'lodash'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Wrapper, Container } from 'commons/styles'
import Button from 'commons/Buttons'
import { convertJSONtoString } from 'utils'
import { getProposal } from 'apis/proposals'
import useFetch from 'commons/hooks/useFetch'
import OverlaySpinner from 'commons/OverlaySpinner'

const ViewProposal = ({ match, history }) => {
  const [getProposalApi, loading, proposal] = useFetch(getProposal, true)

  useEffect(() => {
    getProposalApi(match.params.id)
  }, [])

  if (loading) return <OverlaySpinner loading />
  if (!proposal || !proposal.detail) return <div style={{ padding: 40 }}>Proposal is not available.</div>

  const hierarchy = proposal.detail.Hierarchy || proposal.detail.hierarchy || ''
  const pathArray = compact(hierarchy.split('/'))
  const issue = pathArray.pop()
  const path = concat(get(proposal, 'detail.summary_country', 'USA'), pathArray).join('%2F')

  return (
    <Wrapper>
      <Container>
        {hierarchy && (
          <HeaderContainer>
            <Header>Proposal for {startCase(issue)}</Header>
            <Button onClick={() => history.push(`/path/${path}/issue/${issue}/proposals`)}>View</Button>
          </HeaderContainer>
        )}
        {convertJSONtoString(proposal.detail)}
      </Container>
    </Wrapper>
  )
}

export default ViewProposal

ViewProposal.propTypes = {
  history: PropTypes.object,
  match  : PropTypes.object,
}

const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    align-items: center;
    justify-content: space-between;
  `,
  Header = styled.div`
    font-size: 26px;
    font-weight: 600;
  `
