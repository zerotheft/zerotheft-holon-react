import React, { useContext } from "react"
import { get } from "lodash"
import { Redirect } from "react-router-dom"
import styled from "styled-components"

import { colors } from "theme"
import { IssueContext } from "../IssueContext"
import Compare from "../commons/Compare"

const Vote = ({ match }) => {
  const { issue, selection } = useContext(IssueContext)
  const title = get(issue, "title", "N/A")

  if (!get(selection, "proposal") && !get(selection, "counterProposal"))
    return <Redirect to={`/path/${get(match, "params.pathname")}/issue/${get(match, "params.id")}`} />

  return (
    <Wrapper>
      <Header>
        <div>VOTE</div>
        <div>
          if there was or was not theft <br />
          (Ethically, not legally)
        </div>
      </Header>
      <Compare data={selection} title={title} id={get(match, "params.id")} />
    </Wrapper>
  )
}

export default Vote

const Wrapper = styled.div`
    padding-top: 75px;
  `,
  Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    & > div:first-of-type {
      font-size: 74px;
      font-weight: 800;
      color: ${colors.primary};
    }
    & > div:last-of-type {
      font-size: 19px;
      font-weight: 500;
      margin-left: 15px;
    }
  `
