import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { isEmpty, get } from 'lodash'
import { colors } from 'theme'
import useFetch from 'commons/hooks/useFetch'
import { getProposal } from 'apis/proposals'
import { convertJSONtoString } from 'utils'

const PathProposals =  ({proposals}) =>  {
    const [getProposalApi, proposalLoading, bestProposalInfo] = useFetch(getProposal)
    const [proposalNumber, updateProposal] = useState(0)
    let bestProposal = proposals.length && proposals.reduce((proposal,temp)=>proposal.votes>temp.votes?proposal:temp);
    useEffect(() => {
        bestProposal.id && getProposalApi(bestProposal.id)
    },[bestProposal.id])
    if(isEmpty(proposals)) return (<span> No proposals for the path exists yet. </span>)
    return <Wrapper>
    <h3>{proposals[proposalNumber].title}</h3>
    <div>{proposals[proposalNumber].description}
    </div>
    <div className="proposal-list">
        { proposalNumber !== 0 && <button onClick={()=> {updateProposal(proposalNumber - 1)}}>Previous</button>}
        { proposalNumber !== (proposals.length - 1) && <button onClick={()=> {updateProposal(proposalNumber + 1)}}>Next Description</button> }
    </div>
    <h4>{bestProposal.title}</h4>
        
    { !proposalLoading && <div className="best-proposal">
            {convertJSONtoString(get(bestProposalInfo, 'detail', {}))}
        </div>
    }
    </Wrapper>
}

const Wrapper = styled.div`
    h3 {
        background: ${colors.primary};
        border-radius: 12px;
        padding: 10px 35px;
        color: ${colors.text.white};
        font-size: 24px;
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
    .proposal-list button{
        background: ${colors.button.greyBackground};
        color: ${colors.button.blackText};
        border: none;
        font-weight: 300;
        margin-left: 12px;
        border-radius: 6px;
        padding: 8px 21px;
        cursor: pointer;
    }
    .best-proposal{
        padding: 24px 0px;
    }
`;
export default PathProposals;