import React, { useContext, useState, useEffect } from 'react'
import EasyEdit from 'react-easy-edit';
import { get, capitalize, filter as Filter } from 'lodash'
import { Formik, Field, Form } from 'formik'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { IssueContext } from '../IssueContext'
import { AppContext } from '../../AppContext'
import { VoteContext, VoteProvider } from './VoteContext'
import ProposalDetail from '../commons/ProposalDetail'
import useFetch from 'commons/hooks/useFetch'
import { Row } from 'commons/Form/styles'
import { TextField, TextAreaField, Radio, EditableField } from 'commons/Form/InputFields'
import Button from 'commons/Buttons'
import { colors } from 'theme'
import { isChrome, numberWithCommas, getParameterByName, convertUNIXtoDATETIME } from 'utils'
import Modal from 'commons/Modal'
import OverlaySpinner from 'commons/OverlaySpinner'
import { getUserInfo } from 'apis/vote'
import Steps from './Steps'

const VoteFinalize = ({ match, history, location }) => {
  const queryParams = location.search
  const { issue, selection, priorVoteInfo, loading } = useContext(IssueContext)
  const { filterParams } = useContext(AppContext)
  const { checkStep, finalVote, popup, showErrorPopUp, voting, vote, voteWithHolon } = useContext(VoteContext)
  const [getUserInfoApi, loadingUser, userInfo] = useFetch(getUserInfo)
  const [initialValues, updateValues] = useState()

  const [stepsPage, showStepsPage] = useState(queryParams && getParameterByName('page') === 'steps')
  const amount = finalVote === 'yes' ? get(selection, 'proposal.theftAmt') : get(selection, 'counterProposal.theftAmt')
  const theftAmtYears = finalVote === 'yes' ? get(selection, 'proposal.theftYears') : get(selection, 'counterProposal.theftYears')

  const getVotedIdeas = async () => {
    if (localStorage.getItem('address')) {
      //fetch user information
      await getUserInfoApi(localStorage.getItem('address'))
    }
  }

  const checkQueryParams = async () => {
    if (queryParams && getParameterByName('page') === 'steps') {
      const { step } = await checkStep(true)
      if (step > 6) return null
      showStepsPage(true)
      if (getParameterByName('details')) {
        const details = localStorage.getItem('voteDetails')
        if (details) {
          updateValues(JSON.parse(details))
        }
      }
    } else {
      showStepsPage(false)
      checkStep()
    }
  }
  const save = (value) => { alert(value) }
  const cancel = () => { alert("Cancelled") }
  useEffect(() => {
    checkQueryParams()
  }, [queryParams])

  useEffect(() => {
    getVotedIdeas()
  }, [])

  if (!loading && !get(selection, 'proposal') && !get(selection, 'counterProposal'))
    return <Redirect to={`/path/${get(match, 'params.pathname')}/issue/${get(match, 'params.id')}`} />

  if (stepsPage) return <Steps showStepsPage={showStepsPage} vote={() => {
    showStepsPage(false)
    vote(initialValues)
  }} />

  return <React.Fragment>
    <Wrapper>
      <OverlaySpinner loading={voting} />
      {/* <EasyEdit
        type="number"
        onSave={save}
        onCancel={cancel}
        saveButtonLabel="Save Me"
        cancelButtonLabel="Cancel Me"
      /> */}
      <FormWrapper>
        <div>
          <h4>Do you consider this as theft via a rigged economy?</h4>
          <Formik
            enableReinitialize
            initialValues={initialValues || {
              vote: capitalize(finalVote),
              amount: 'static',
              ...theftAmtYears
            }}
            onSubmit={async (values) => {
              let altTheftAmounts = {}
              Object.keys(theftAmtYears).map((yr) => {
                if (theftAmtYears[yr] !== values[yr]) altTheftAmounts[yr] = values[yr]
                // delete values[yr]
              })
              if (!isChrome()) {
                toast.error('Please open on chrome browser to vote!!!')
                return
              }
              const { step: curStep } = await checkStep()
              const updatedVal = { ...values, altTheftAmounts: JSON.stringify(altTheftAmounts).replace('"', '\"') }
              localStorage.setItem('voteDetails', JSON.stringify(updatedVal))
              history.push({ search: '?page=steps' })
              if (curStep <= 6) {
                updateValues(updatedVal)
                showStepsPage(true)
              }
              else vote(updatedVal)
            }}
          >
            {({ values }) => {
              return <Form>
                {popup && <Modal onClose={() => showErrorPopUp(false)}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                    {get(popup, 'message') || 'There was some error while trying to vote.'}
                    <Button style={{ marginTop: 10 }} onClick={voteWithHolon}>Vote through holon</Button>
                  </div>
                </Modal>}
                <Row>
                  <Field name="vote" component={TextField} label="Your Vote" labelWidth={110} readonly />
                </Row>
                <Row>
                  <Label>Proposed Total Amount:</Label>
                  <Field
                    name="amount"
                    component={Radio}
                    values={[{
                      value: 'static',
                      label: `${`$${numberWithCommas(amount)}`} (from Problem Proposal)`
                    }]}
                  />
                </Row>

                <Row>
                  <Field
                    name="comment"
                    component={TextAreaField}
                    label="Add Comment"
                    labelWidth={130}
                  />
                </Row>
                {finalVote === 'yes' && theftAmtYears &&
                  Object.keys(theftAmtYears).map((y) =>
                    <Row>
                      <Field
                        name={y}
                        component={EditableField}
                        type="number"
                        min={0}
                        label={y}
                        labelWidth={130}
                      />
                    </Row>
                  )}
                <Row>
                  <Button type="submit" height={50}>I approve this vote</Button>
                </Row>
              </Form>
            }}
          </Formik>
        </div>
      </FormWrapper>
      <div>
        {userInfo && userInfo.success && <FinalizeContentWrapper>
          <div className='content'>
            <h3>Finalize your vote</h3>
            <h5>Your Zerotheft Public Voter Registeration:</h5>
            <p className='data-row' style={{ fontSize: 18, fontWeight: '500' }}>
              <span>Your Voter ID:</span>
              <span>{localStorage.getItem('address')}</span>
            </p>
            <p className='data-row'>
              <span>Your Name:</span>
              <span className='max'>{userInfo.name}</span>
            </p>
            <p className='data-row'>
              <span>Your Linked-in Account:</span>
              <a href={userInfo.linkedin} target="_blank" rel="noopener noreferrer">{userInfo.linkedin}</a>
            </p>
            {priorVoteInfo && priorVoteInfo.success && <Button onClick={() => { }} style={{ cursor: 'default', background: '#E96F6F', width: '100%', fontSize: 20, fontWeight: '500' }} height={62}>PRIOR VOTE</Button>}
          </div>
          {priorVoteInfo && priorVoteInfo.success && <div className='content bottom'>
            <p className='data-row'>
              You voted on this problem for this year already. Voting again will override your existing vote.
            </p>
            <p className='data-row' style={{ fontSize: 22 }}>
              Prior Vote: {get(priorVoteInfo, 'voteIsTheft') ? 'YES' : 'NO'}
            </p>
            <p className='data-row' style={{ fontWeight: '500' }}>
              {/* <span>
                Amount Stolen : ${get(priorVoteInfo, 'altTheftAmt') || get(priorVoteInfo, 'theftAmt')}
              </span> */}
              <span>
                Voted on : {convertUNIXtoDATETIME(get(priorVoteInfo, 'date'))}
              </span>
            </p>
            <Button plain onClick={() => window.open('zerotheft://settings/history')} style={{ width: '100%', fontSize: 20, fontWeight: '500', background: 'transparent', borderWidth: 2 }} height={62}>View Voting History</Button>
          </div>}
        </FinalizeContentWrapper>}
      </div>
    </Wrapper>
    <ProposalWrapper>
      <ProposalDetail show_details chartData={Filter(get(issue, finalVote === 'yes' ? 'proposals' : 'counter-proposals', []), { year: filterParams.year })} item={finalVote === 'yes' ? selection.proposal : selection.counterProposal} type={finalVote === 'yes' ? 'proposal' : 'counter'} />
    </ProposalWrapper>
  </React.Fragment >
}

const FinalizeWrapper = (props) => {
  return <VoteProvider><VoteFinalize {...props} /> </VoteProvider>
}
export default FinalizeWrapper

const Wrapper = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  & > div {
    flex: 1;
  }
`,
  FormWrapper = styled.div`
  form {
    max-width: 500px;
  }
  h4 {
    font-size: 29px;
    font-weight: 600;
    color: ${colors.primary};
    margin-bottom: 10px;
  }
`,
  Label = styled.div`
  font-weight: 600;
  color: #062928;
  opacity: 0.7;
  font-size: 13px;
  line-height: 18px;
  padding-right: 10px;
  width: 140px;
  ${props => props.full && `
    width: 100%;
    color: ${colors.primary};
  `}
`,
  Column = styled.div`
  display: flex;
  flex-direction: column;
`,
  FinalizeContentWrapper = styled.div`
  margin-left: 75px;
  max-width: 580px;
  width: 100%;
  background: #F9F9F9;
  box-shadow: 0px 2px 43px rgba(0, 0, 0, 0.29);
  border-radius: 10px;
  overflow: hidden;
  h3 {
    font-size: 33px;
    font-weight: 600;
    color: ${colors.primary};
    margin: 0 0 5px;
    text-align: center;
  }
  h5 {
    font-size: 18px;
    font-weight: 500;
    color: rgba(0,0,0,0.6);
    text-align: center;
  }
  & > .content {
    padding: 25px 30px;
    &.bottom {
      background: #E4ECEE;
    }
    p {
      margin: 10px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      font-weight: 400;
      & > a {
        color: #000;
      }
      & > span, & > a {
        max-width: 50%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`,
  ProposalWrapper = styled.div`
  margin-top: 30px; 
  padding: 30px;
  border-top: 1px solid #C9C9C9;
`
