import React, { useContext, useState, useEffect } from "react"
import { get, capitalize } from "lodash"
import { Formik, Field, Form } from "formik"
import { toast } from "react-toastify"
import styled from "styled-components"

import { Redirect } from "react-router"
import { API_URL } from "constants/index"
import { Row } from "commons/Form/styles"
import { TextAreaField, EditableField } from "commons/Form/InputFields"
import Button from "commons/Buttons"
import { colors } from "theme"
import { isChrome, getParameterByName, convertUNIXtoDATETIME } from "utils"
import Modal from "commons/Modal"
import OverlaySpinner from "commons/OverlaySpinner"
import ProposalDetail from "../commons/ProposalDetail"
import { AppContext } from "../../AppContext"
import { IssueContext } from "../IssueContext"
import { VoteContext, VoteProvider } from "./VoteContext"

const VoteFinalize = ({ match, location }) => {
  const queryParams = location.search
  const { selection, checkAndTransferFund } = useContext(IssueContext)
  const { umbrellaPaths, holonInfo } = useContext(AppContext)
  const {
    checkStep,
    voterInfo: userInfo,
    finalVote,
    popup,
    showErrorPopUp,
    voting,
    vote,
    priorVoteInfo,
  } = useContext(VoteContext)

  // const [getCitizenInfoApi, loadingUser, userInfo] = useFetch(getCitizenInfo)
  const [initialValues, updateValues] = useState()
  const [commentState, showHideComment] = useState(false)

  // const [stepsPage, showStepsPage] = useState(queryParams && getParameterByName('page') === 'steps')

  // const amount = finalVote === 'yes' ? get(selection, 'proposal.theftAmt') : get(selection, 'counterProposal.theftAmt')
  const theftAmtYears =
    finalVote === "yes" ? get(selection, "proposal.theftYears") : get(selection, "counterProposal.theftYears")
  const hierarchyPath = `${get(match, "params.pathname")}%2F${get(match, "params.id")}`.replaceAll("%2F", "/")

  const issuePath = `${match.params.pathname}/${match.params.id}`.replace(/%2F/g, "/")

  /* eslint-disable-next-line no-useless-escape */
  const issuePathNoNation = issuePath.replace(/[^\/]+\/?/, "")

  const isUmbrella = !!get(umbrellaPaths, issuePathNoNation)

  const reportPath = `${API_URL}/${get(holonInfo, "reportsPath")}/${
    isUmbrella ? "multiIssueReport" : "ztReport"
  }/${issuePath.replace(/\//g, "-")}`

  const [formValues, updateFormValues] = useState()
  const [localStorageData, updatelocalStorageData] = useState(true)
  const [loading, updateLoading] = useState(false)

  // Store data in local storage for the reload
  const storeDataInLocalStorage = async () => {
    if (!get(selection, "proposal")) {
      const data = JSON.parse(localStorage.getItem(issuePath))
      if (data && data.selection) {
        updatelocalStorageData(true)
      } else {
        updatelocalStorageData(false)
      }
      return
    }

    const storagePayload = {
      selection,
      initialValues,
      queryParams,
      issuePath,
      formValues,
    }

    localStorage.setItem(issuePath, JSON.stringify(storagePayload))
  }

  const retrieveDataFromLocalStorage = async () => {
    const data = JSON.parse(localStorage.getItem(issuePath))
    if (data) {
      if (data.selection) {
        selection.proposal = data.selection.proposal
        selection.counterProposal = data.selection.counterProposal
      }
    }
  }

  retrieveDataFromLocalStorage()

  const checkQueryParams = async () => {
    const hierarchyPath = `${get(match, "params.pathname")}%2F${get(match, "params.id")}`.replaceAll("%2F", "/")
    if (queryParams && getParameterByName("page") === "steps") {
      const { step } = await checkStep(hierarchyPath, true)
      if (step > 6) return null

      // showStepsPage(true)
      if (getParameterByName("details")) {
        const details = localStorage.getItem("voteDetails")
        if (details) {
          updateValues(JSON.parse(details))
        }
      }
    } else {
      // showStepsPage(false)
      checkStep(hierarchyPath)
    }
  }

  const submitForm = async (values) => {
    updateLoading(true)
    const fundTransferStatus = await checkAndTransferFund()
    if (!fundTransferStatus) {
      updateLoading(false)
      return
    }

    updateFormValues(values)
    const altTheftAmounts = {}
    Object.keys(theftAmtYears).forEach((yr) => {
      if (theftAmtYears[yr] !== values[yr]) altTheftAmounts[yr] = values[yr]
    })
    if (!isChrome()) {
      toast.error("Please open on chrome browser to vote!!!")
      return
    }
    const updatedVal = {
      ...values,
      priorVoteInfo,
      altTheftAmounts: JSON.stringify(altTheftAmounts).replace('"', '"'),
      hierarchyPath,
    }
    localStorage.removeItem(issuePath)
    localStorage.setItem("voteDetails", JSON.stringify(updatedVal))

    // history.push({ search: '?page=steps' })
    updateValues(updatedVal)

    // showStepsPage(true);

    // For vote if all steps are completed
    await vote(updatedVal)
    updateLoading(false)
  }

  useEffect(() => {
    checkQueryParams()
  }, [queryParams])

  useEffect(() => {
    storeDataInLocalStorage()
  }, [])

  if (!localStorageData) {
    return <Redirect to={`/path/${get(match, "params.pathname")}/issue/${get(match, "params.id")}`} />
  }

  return (
    <>
      <Wrapper>
        <OverlaySpinner loading={voting} />
        <OverlaySpinner loading={loading} />
        <FormWrapper>
          <div>
            <TitleSummary>
              <h3>This Finalizes Your Vote That</h3>
              <span>{finalVote === "yes" ? "Yes there is theft" : "No there is not theft"}</span>
              <h3>In this Area</h3>
            </TitleSummary>
            {/* <h4>Do you consider this as theft via a rigged economy?</h4> */}
            <Formik
              enableReinitialize
              initialValues={
                initialValues || {
                  vote: capitalize(finalVote),
                  amount: "static",
                  ...theftAmtYears,
                }
              }
              onSubmit={async (values) => {
                submitForm(values)
              }}
            >
              {
                // eslint-disable-next-line no-unused-vars
                ({ values }) => {
                  return (
                    <Form>
                      {popup && (
                        <Modal onClose={() => showErrorPopUp(false)}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              marginTop: 30,
                            }}
                          >
                            {get(popup, "message") || "There was some error while trying to vote."}
                            {/* <Button style={{ marginTop: 10 }} onClick={voteWithHolon}>Vote through holon</Button> */}
                          </div>
                        </Modal>
                      )}
                      {/* <Row>
                  <Field name="vote" component={TextField} label="Your Vote" labelWidth={110} readonly />
                </Row> */}
                      {/* <Row>
                  <Label>Proposed Total Amount:</Label>
                  <Field
                    name="amount"
                    component={Radio}
                    values={[{
                      value: 'static',
                      label: `${`$${numberWithCommas(amount)}`} (from Problem Proposal)`
                    }]}
                  />
                </Row> */}

                      {finalVote === "yes" &&
                        theftAmtYears &&
                        Object.keys(theftAmtYears).map((y) => (
                          <Row>
                            <Field name={y} component={EditableField} type="number" min={0} label={y} />
                          </Row>
                        ))}
                      {commentState && (
                        <CommentBox>
                          <span>Add Comment:</span>
                          <Field name="comment" component={TextAreaField} />
                        </CommentBox>
                      )}
                      <BottomRow>
                        <Button type="submit" height={50}>
                          I approve & FINALIZE this vote
                        </Button>
                        <span
                          onClick={() => {
                            showHideComment(!commentState)
                          }}
                        >
                          {!commentState ? "Add a comment" : "Do not add a comment"}
                        </span>
                      </BottomRow>
                    </Form>
                  )
                }
              }
            </Formik>
          </div>
        </FormWrapper>
        <div>
          {userInfo && userInfo.unverifiedCitizen && (
            <FinalizeContentWrapper>
              <div className="content">
                <h3>Finalize your vote</h3>
                <h5>Your Zerotheft Public Voter Registeration:</h5>
                <p className="data-row" style={{ fontSize: 18, fontWeight: "500" }}>
                  <span>Your Voter Address:</span>
                  <span>{userInfo.ethereumAddress}</span>
                </p>
                <p className="data-row" style={{ fontSize: 18, fontWeight: "500" }}>
                  <span>Your Citizen ID:</span>
                  <span>{userInfo.unverifiedCitizen}</span>
                </p>
                <p className="data-row">
                  <span>Your Name:</span>
                  <span className="max">
                    {userInfo.firstName} {userInfo.middleName} {userInfo.lastName}
                  </span>
                </p>
                <p className="data-row">
                  <span>Your Linked-in Account:</span>
                  <a href={userInfo.linkedin} target="_blank" rel="noopener noreferrer">
                    {userInfo.linkedin}
                  </a>
                </p>
                {priorVoteInfo && priorVoteInfo.success && (
                  <Button
                    onClick={() => {}}
                    style={{
                      cursor: "default",
                      background: "#E96F6F",
                      width: "100%",
                      fontSize: 20,
                      fontWeight: "500",
                    }}
                    height={62}
                  >
                    PRIOR VOTE
                  </Button>
                )}
              </div>
              {priorVoteInfo && priorVoteInfo.success && (
                <div className="content bottom">
                  <p className="data-row">
                    You voted on this problem for this year already. Voting again will override your existing vote.
                  </p>
                  <p className="data-row" style={{ fontSize: 22 }}>
                    Prior Vote: {get(priorVoteInfo, "voteIsTheft") === "True" ? "YES" : "NO"}
                  </p>
                  <p className="data-row" style={{ fontWeight: "500" }}>
                    {/* <span>
                Amount Stolen : ${get(priorVoteInfo, 'altTheftAmt') || get(priorVoteInfo, 'theftAmt')}
              </span> */}
                    <span>Voted on : {convertUNIXtoDATETIME(get(priorVoteInfo, "date"))}</span>
                  </p>
                  {/* TODO: When we maintain the proper historical data then we will show this button
            <Button plain onClick={() => window.open('zerotheft://settings/history')} style={{ width: '100%', fontSize: 20, fontWeight: '500', background: 'transparent', borderWidth: 2 }} height={62}>View Voting History</Button> */}
                </div>
              )}
            </FinalizeContentWrapper>
          )}
        </div>
      </Wrapper>
      <ProposalWrapper>
        <ProposalDetail
          allowSelect={false}
          reportPath={reportPath}
          item={finalVote === "yes" ? selection.proposal : selection.counterProposal}
          type={finalVote === "yes" ? "proposal" : "counter"}
        />
      </ProposalWrapper>
    </>
  )
}

const FinalizeWrapper = (props) => {
  return (
    <VoteProvider>
      <VoteFinalize {...props} />{" "}
    </VoteProvider>
  )
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
  TitleSummary = styled.div`
    display: flex;
    align-items: center;
    span {
      padding: 10px;
      background: ${colors.primary};
      border-radius: 8px;
      color: ${colors.text.white};
      font-weight: bold;
      margin: 0 5px;
      text-transform: uppercase;
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
  CommentBox = styled(Row)`
    display: flex;
    flex-direction: column;
    span {
      font-weight: bold;
      color: ${colors.text.gray};
    }
  `,
  // Label = styled.div`
  //   font-weight: 600;
  //   color: #062928;
  //   opacity: 0.7;
  //   font-size: 13px;
  //   line-height: 18px;
  //   padding-right: 10px;
  //   width: 140px;
  //   ${props =>
  //   props.full &&
  //     `
  //   width: 100%;
  //   color: ${colors.primary};
  // `}
  // `,
  // Column = styled.div`
  //   display: flex;
  //   flex-direction: column;
  // `,
  BottomRow = styled(Row)`
    align-items: center;
    span {
      color: ${colors.primary};
      cursor: pointer;
      :hover {
      }
    }
  `,
  FinalizeContentWrapper = styled.div`
    margin-left: 75px;
    max-width: 580px;
    width: 100%;
    background: #f9f9f9;
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
      color: rgba(0, 0, 0, 0.6);
      text-align: center;
    }
    & > .content {
      padding: 25px 30px;
      &.bottom {
        background: #e4ecee;
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
        & > span,
        & > a {
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
    border-top: 1px solid #c9c9c9;
  `
