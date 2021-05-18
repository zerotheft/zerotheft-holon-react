import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { isEmpty, get } from 'lodash'
import { colors } from 'theme'
import useFetch from 'commons/hooks/useFetch'
import { getProposal } from 'apis/proposals'
import { convertJSONtoString } from 'utils'

const PathProposals = ({ regularProp, counterProp, theftData }) => {
    const [proposalNumber, updateProposal] = useState(0),
        [leadingProps, updateLeadingProps] = useState([]),
        [proposalLoading, updateLoader] = useState(true),
        proposals = [...regularProp, ...counterProp];

    const getLeadingProp = (allProps) => {
        return allProps.length && allProps.reduce((proposal, temp) => proposal.votes > temp.votes ? proposal : temp);
    }

    let firstLeadingProp = proposals.length && getLeadingProp(proposals);
    let secondLeadingProp = regularProp.length && regularProp.length !== proposals.length && getLeadingProp(regularProp);

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
        firstLeadingProp.id && getLeadingProposals(firstLeadingProp)
    }, [firstLeadingProp.id])


    if (isEmpty(proposals)) return (<span> No proposals for the path exists yet. </span>)
    return <Wrapper>
        <h3>{proposals[proposalNumber].title}</h3>
        <div>{proposals[proposalNumber].description}
        </div>
        <div className="proposal-list">
            {proposalNumber !== 0 && <button onClick={() => { updateProposal(proposalNumber - 1) }}>Previous</button>}
            {proposalNumber !== (proposals.length - 1) && <button onClick={() => { updateProposal(proposalNumber + 1) }}>Next Description</button>}
        </div>
        {!proposalLoading && leadingProps.length && <>
            <h3>Leading Proposal{leadingProps.length > 1 && 's'}</h3>
            {
                leadingProps.map((prop, index) => {

                    return (<>
                        <h4>{`${index + 1}. ${prop.title}`}</h4>
                        <div className="best-proposal">
                            {convertJSONtoString(get(prop, 'detail', {}))}
                        </div>
                    </>)
                })
            }

        </>
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
        margin-bottom:10px;
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