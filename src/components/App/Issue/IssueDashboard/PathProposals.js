import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { isEmpty, get } from "lodash"
import { colors } from "theme"
import { getProposal } from "apis/proposals"
import { convertJSONtoString } from "utils"
import proposal from "assets/icons/proposal.svg"
import OverlaySpinner from "commons/OverlaySpinner"

const PathProposals = ({ regularProp, counterProp, theftData }) => {
  const [proposalNumber, updateProposal] = useState(0),
    [leadingProps, updateLeadingProps] = useState([]),
    [proposalLoading, updateLoader] = useState(true),
    proposals = [...regularProp, ...counterProp]

  const getLeadingProp = (allProps) => {
    return allProps.length && allProps.reduce((proposal, temp) => (proposal.votes > temp.votes ? proposal : temp))
  }

  const firstLeadingProp = proposals.length && getLeadingProp(proposals)
  const secondLeadingProp = regularProp.length && regularProp.length !== proposals.length && getLeadingProp(regularProp)

  const getLeadingProposals = async (firstLeadingProp) => {
    updateLoader(true)
    const props = []
    const firstProp = await getProposal(firstLeadingProp.id)
    if (firstProp && parseInt(firstProp.theftAmt) === 0 && theftData && theftData.for >= theftData.against) {
      const secondProp = await getProposal(secondLeadingProp.id)
      props.push(secondProp)
    }
    props.push(firstProp)
    updateLeadingProps(props)
    updateLoader(false)
  }
  useEffect(() => {
    /* eslint-disable-next-line no-unused-expressions */
    firstLeadingProp.id && getLeadingProposals(firstLeadingProp)
    updateLoader(false)
  }, [firstLeadingProp.id])
  if (proposalLoading)
    return (
      <Wrapper>
        <OverlaySpinner loading />
      </Wrapper>
    )
  if (isEmpty(proposals))
    return (
      <Wrapper>
        <div className="no-proposal">
          <div>
            <img src={proposal} style={{ height: 75, width: 60 }} alt="No proposal" />
          </div>
          <div>
            <h2>No Proposal Found</h2>
            <span> No proposals for the path exists yet. </span>
          </div>
        </div>
      </Wrapper>
    )

  return (
    <Wrapper>
      <h3>{proposals[proposalNumber].title}</h3>
      <div className="description">{proposals[proposalNumber].description}</div>
      <div className="proposal-list">
        {proposalNumber !== 0 && (
          <button
            onClick={() => {
              updateProposal(proposalNumber - 1)
            }}
          >
            Previous
          </button>
        )}
        {proposalNumber !== proposals.length - 1 && (
          <button
            onClick={() => {
              updateProposal(proposalNumber + 1)
            }}
          >
            Next Description
          </button>
        )}
      </div>
      {leadingProps.length > 0 && (
        <>
          <h3>Leading Proposal{leadingProps.length > 1 && "s"}</h3>
          {leadingProps.map((prop, index) => {
            return (
              <>
                <h4>{`${index + 1}. ${prop.title}`}</h4>
                <div className="best-proposal">{convertJSONtoString(get(prop, "detail", {}))}</div>
              </>
            )
          })}
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  float: left;
  margin-right: 10px;
  .description {
    white-space: pre-wrap;
  }
  .no-proposal {
    display: flex;
    flex-direction: row;
    background: ${colors.lightPrimary};
    border-radius: 12px;
    padding: 30px 60px 35px 30px;
    min-width: 700px;
    img {
      margin-right: 25px;
    }
    h2 {
      color: ${colors.primary};
      font-size: 48px;
      line-height: 50px;
      font-weight: 700;
    }
    span {
      color: ${colors.lightText};
      font-size: 17px;
      line-height: 26px;
      font-weight: 400;
    }
  }
  h3 {
    background: ${colors.primary};
    border-radius: 12px;
    padding: 10px 35px;
    color: ${colors.text.white};
    font-size: 24px;
    margin-bottom: 10px;
  }
  h4 {
    background: ${colors.textBackground};
    padding: 10px 35px;
    color: ${colors.textTitle};
    margin-botton: 24px;
    font-size: 22px;
  }
  .proposal-list {
    display: flex;
    margin-bottom: 50px;
    align-item: flex-end;
    justify-content: flex-end;
  }
  .proposal-list button {
    background: ${colors.button.greyBackground};
    color: ${colors.button.blackText};
    border: none;
    font-weight: 300;
    margin-left: 12px;
    border-radius: 6px;
    padding: 8px 21px;
    cursor: pointer;
  }
  .best-proposal {
    padding: 24px 0px;
  }
`
export default PathProposals
