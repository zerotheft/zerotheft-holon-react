import React, { useEffect, useContext, useState } from "react"
import {
  get,

  // isEmpty,
  // filter as filterArray,
} from "lodash"

// import yaml from 'js-yaml';
import styled from "styled-components"
import { convertDollarToString, numberWithCommas } from "utils"
import { colors } from "theme"
import { getReport, getTheftInfo } from "apis/reports"
import { getProposalTemplate } from "apis/proposals"
import useFetch from "commons/hooks/useFetch"
import OverlaySpinner from "commons/OverlaySpinner"

// import Button from "commons/Buttons";
// import SeeMore from 'commons/SeeMore';

// import { EmptyText } from "commons/styles";
import { AppContext } from "components/App/AppContext"
import { IssueContext } from "../IssueContext"
import {
  // Header,
  Left,
  Right,
  Wrapper,

  // WarningWrapper,
} from "../commons/styles"

// import Path from "../../Path/Path";
// import SummaryReport from "./SummaryReport";
import Points from "../commons/Points"
import PathProposals from "./PathProposals"

// const dateRange = range(1999, new Date().getFullYear())
//   .reverse()
//   .map(i => ({ label: i, value: i }));
const Dashboard = ({ match }) => {
  const decodedPath = decodeURIComponent(get(match, "params.pathname"))
  const { issue, loading: issueLoading } = useContext(IssueContext)
  const [getReportApi, loading] = useFetch(getReport)
  const [getTemplateApi, templateLoading] = useFetch(getProposalTemplate)
  const { filterParams } = useContext(AppContext)
  const [getTheftApi, loadingTheft, theftInfo] = useFetch(getTheftInfo)

  // const { pathname } = location;
  const { selection } = useContext(IssueContext)
  const [selectedItem, updateSelectedItem] = useState(get(selection, "proposal") || {})

  // const displayYaml = template => {
  //   let data;
  //   try {
  //     data = yaml.safeLoad(template);
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  //   return (
  //     <div className="item">
  //       <h5>
  //         {get(data, 'title') || ' This problem has no title at this time'}
  //       </h5>
  //       <p>
  //         <SeeMore
  //           text={
  //             get(data, 'describe_problem_area') ||
  //             'This problem has no descriptions at this time. You can add your description by adding a new proposal.'
  //           }
  //           textLength="200"
  //         />
  //       </p>
  //     </div>
  //   );
  // };

  useEffect(() => {
    if (get(match, "params.pathname") && get(match, "params.id") && get(filterParams, "year")) {
      getReportApi(`${get(match, "params.pathname")}%2F${get(match, "params.id")}`, false, get(filterParams, "year"))
    }
    getTheftApi(`${get(match, "params.pathname")}%2F${get(match, "params.id")}`, false, get(filterParams, "year"))
  }, [get(match, "params.pathname"), get(match, "params.id"), get(filterParams, "year")])

  useEffect(() => {
    const templatePath = `${decodedPath.replace("USA", "proposals")}/${get(match, "params.id")}`
    getTemplateApi(templatePath)
  }, [get(match, "params.id"), get(match, "params.pathname")])

  // const allProposals = [
  //   ...(get(issue, 'proposals') || []),
  //   ...(get(issue, 'counter_proposals') || []),
  // ];

  // const filteredProposals = sortedUniqBy(isEmpty(filterParams.year) ? filterArray(allProposals, { year: filterParams.year }) : allProposals, 'description')
  // const filteredProposals = sortedUniqBy(allProposals, 'description');
  const theftData = theftInfo && theftInfo[`${match.params.pathname}/${match.params.id}`.replaceAll("%2F", "/")]
  const yes = theftData && ((theftData.for / theftData.votes) * 100).toFixed()
  const no = 100 - yes
  if (issueLoading || templateLoading || loading || loadingTheft) return <OverlaySpinner loading />
  return (
    <Wrapper style={{ height: "calc(100vh - 125px)" }}>
      <Left
        style={{
          width: "auto",
          margin: "0 30px 0 0",
          display: "flex",
          flexDirection: "column",
          maxWidth: "440px",
        }}
      >
        <div style={{ overflowY: "auto", height: "100%" }}>
          <div style={{ overflow: "hidden", height: "100%" }}>
            {/* <Points data={filterParams.year ? Filter(get(issue, 'proposals', []), { year: parseInt(filterParams.year) }) : get(issue, 'proposals', [])} issue={issue} selectedItem={selectedItem} updateSelectedItem={updateSelectedItem} loading={loading} /> */}
            <Points
              data={get(issue, "proposals", [])}
              issue={issue}
              selectedItem={selectedItem}
              updateSelectedItem={updateSelectedItem}
              loading={loading}
              viewPage
            />
          </div>
        </div>
      </Left>
      <Right style={{ flex: "1", overflowY: "auto", padding: "30px 0 0" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ width: "80%", float: "left" }}>
            <PathProposals
              regularProp={get(issue, "proposals") || []}
              counterProp={get(issue, "counter_proposals") || []}
              theftData={theftData}
            />
          </div>
          <div style={{ width: "20%", float: "right" }}>
            <SelectWrapper>
              {theftData && (no || yes) && (
                <TheftInfo>
                  <h2>Was there theft?</h2>
                  <div className="wrapLeftRightsec">
                    <div className="leftTheftSec">
                      <TheftBlockSec className="yesTheftsec" width={yes}>
                        <span>Yes {yes}%</span>
                      </TheftBlockSec>
                      <TheftBlockSec className="noTheftsec" width={no}>
                        <span>No {no}%</span>
                      </TheftBlockSec>
                    </div>
                    <div className="rightTheftSec">
                      <h2>
                        Amount of theft: <span>${convertDollarToString(parseFloat(get(theftData, "theft")))}</span>
                      </h2>
                    </div>
                  </div>

                  <div className="totlVotersSec">Total Voters : {numberWithCommas(get(theftData, "votes"))}</div>
                </TheftInfo>
              )}
            </SelectWrapper>
          </div>
        </div>
      </Right>
    </Wrapper>
  )

  // {
  //   /* <InnerWrapper>
  //     <Left style={{ width: 'auto', margin: '0 30px 0 0', display: 'flex', flexDirection: 'column', maxWidth: '440px' }}> */
  // }
  // {
  //   /* <div style={{ overflowY: 'auto', height: '100%' }}>
  //       <div style={{ overflow: 'hidden', height: '100%' }}>
  //         {/* <Points data={filterParams.year ? Filter(get(issue, 'proposals', []), { year: parseInt(filterParams.year) }) : get(issue, 'proposals', [])} issue={issue} selectedItem={selectedItem} updateSelectedItem={updateSelectedItem} loading={loading} />

  //       </div>
  //       </div> */
  // }
  // {
  //   /* <Points data={get(issue, 'proposals', [])} issue={issue} selectedItem={selectedItem} updateSelectedItem={updateSelectedItem} loading={loading} viewPage={true} />
  //     </Left>
  //     <Right style={{ flex: '1', overflowY: 'auto', padding: '30px 0 0' }}>
  //     <div style={{ overflow: 'hidden' }}>
  //     <div style={{width: '75%'}}>
  //         <PathProposals regularProp={get(issue, 'proposals') || []} counterProp={get(issue, 'counter_proposals') || []} theftData={theftData} style={{float: 'left', paddingRight: '20px'}} />

  //         </div>
  //       <Header>
  //         <SelectWrapper> */
  // }
  // {
  //   /* <div className="btns" style={{ margin: '15px 0', justifyContent: 'center' }}>
  //             {filteredProposals.length ? <Button onClick={() => history.push(`${pathname}/proposals`)} width={180} height={55} style={{ fontSize: 22 }}>Vote</Button> :
  //               <CustomButton href={`zerotheft://home/path/${match.params.pathname}%2F${match.params.id}/create-proposal`}>
  //                 Add your proposal
  //               </CustomButton>}
  //             {/* <Select
  //               defaultValue={get(filter, 'year') ? { label: `Year: ${get(filter, 'year')}`, value: get(filter, 'year') } : null}
  //               options={dateRange}
  //               placeholder='Year'
  //               isSearchable={false}
  //               noOptionsMessage={() => 'data unavailable.'}
  //               styles={{
  //                 container: styles => ({
  //                   ...styles,
  //                   width: 180,
  //                 }),
  //                 control: styles => ({
  //                   ...styles,
  //                   borderColor: `${colors.primary} !important`,
  //                   paddingLeft: 5,
  //                   borderRadius: 8,
  //                   minHeight: 0,
  //                   height: 55,
  //                   background: 'transparent',
  //                   boxShadow: 'none !important',
  //                   fontSize: 22,
  //                 }),
  //                 option: styles => ({
  //                   ...styles,
  //                   fontSize: 16,
  //                 }),
  //                 menu: styles => ({
  //                   ...styles,
  //                   margin: '5px 0 0',
  //                   width: 120,
  //                   borderRadius: 0,
  //                 }),
  //                 placeholder: styles => ({
  //                   ...styles,
  //                   fontSize: 22
  //                 }),
  //                 noOptionsMessage: styles => ({
  //                   ...styles,
  //                   fontSize: 16
  //                 }),
  //                 singleValue: styles => ({
  //                   ...styles,
  //                   color: colors.primary,
  //                   fontSize: 22,
  //                   fontWeight: '500'
  //                 }),
  //                 indicatorSeparator: () => ({
  //                   display: 'none'
  //                 }),
  //                 dropdownIndicator: styles => ({
  //                   ...styles,
  //                   paddingLeft: 0,
  //                   color: colors.primary
  //                 }),
  //                 clearIndicator: styles => ({
  //                   ...styles,
  //                   color: colors.primary
  //                 })
  //               }}
  //               onChange={selected => {
  //                 updateFilter({ year: selected ? selected.value : null })
  //                 updateMainFilter({ year: selected ? selected.value : null })
  //               }}
  //             />
  //           </div> */
  // }

  // {
  //   /* {theftData && (no || yes) && <TheftInfo>
  //             <h2>Was There Theft?</h2>
  //             <div class="wrapLeftRightsec">
  //               <div class="leftTheftSec">
  //                 <TheftBlockSec className="yesTheftsec" width={yes}>
  //                   <span>Yes {yes}%</span>
  //                 </TheftBlockSec>
  //                 <TheftBlockSec className="noTheftsec" width={no}>
  //                   <span>No {no}%</span>
  //                 </TheftBlockSec>
  //               </div>
  //               <div class="rightTheftSec">
  //                 <h2>Amount of theft: <span>${(convertDollarToString(parseFloat(get(theftData, 'theft'))))}</span></h2>
  //               </div>
  //             </div>

  //             <div class="totlVotersSec">
  //               Total Voters : {numberWithCommas(get(theftData, 'votes'))}
  //             </div>
  //           </TheftInfo>
  //           }
  //         </SelectWrapper>
  //       </Header>
  //       {(filteredProposals.length && get(filterParams, 'year')) ? <IWrapper style={{ flex: get(report, 'report') ? 1 : 'initial' }}>
  //         <OverlaySpinner loading={loading} overlayParent />
  //         {get(report, 'report') && <SummaryReport url={report.report} />}
  //         {(!loading && !get(report, 'report') && (get(issue, 'proposals', []).length || get(issue, 'counter_proposals', []).length)) ? <EmptyText></EmptyText> : null}
  //       </IWrapper> : null}
  //       </div>
  //     </Right>
  //   </InnerWrapper>
  //   <Path history={history} match={match} isIssuePath={true} />
  // </div> */
  // }
}

export default Dashboard

// const InnerWrapper = styled.div`
//     min-height: 80vh;
//     @media (min-width: 991px) {
//       display: flex;
//       flex-flow: row wrap;
//     }
//   `,
const TheftInfo = styled.div`
    display: flex;
    flex-flow: column;

    h2 {
      color: ${colors.text.gray};
      font-family: Poppins;
      font-style: normal;
      font-weight: 600;
      font-size: 15px;
      line-height: 39px;
      letter-spacing: 0.01em;
    }
    .totlVotersSec {
      color: ${colors.text.gray};
    }
    .wrapLeftRightsec {
      display: flex;
      flex-flow: row wrap;
      .leftTheftSec {
        // width:calc(100% - 209px);
        width: auto;
      }
      .rightTheftSec {
        // width: 209px;
        width: auto;
        padding-left: 20px;
        h2 {
          display: flex;
          flex-flow: column;
          font-family: Poppins;
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 34px;
          color: ${colors.primary};

          span {
            font-weight: bold;
            font-size: 20px;
            letter-spacing: -0.025em;
          }
        }
      }
    }
  `,
  TheftBlockSec = styled.div`
    display: flex;
    flex-flow: column;
    height: auto;
    margin-bottom: 10px;
    align-item: center;
    background: ${colors.button.greyBackground};
    font-family: Poppins;
    font-size: 18px;
    position: relative;
    span {
      display: flex;
      flex-flow: column;
      height: 100%;
      white-space: nowrap;
      justify-content: center;
      color: white;
      padding-left: 10px;
      position: relative;
      z-index: 1;
    }
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100%;
      width: ${(props) => props.width || 0}%;
      background: green;
    }
    &.noTheftsec {
      &::before {
        background: red;
      }
    }
  `,
  // Title = styled.div`
  //   margin-bottom: 20px;
  //   h4 {
  //     font-size: 33px;
  //     color: ${colors.primary};
  //     font-weight: 600;
  //   }
  //   h5 {
  //     font-size: 16px;
  //   }
  // `,
  // ProposalContents = styled.div`
  //   .header {
  //     background: #e9e9e9;
  //     color: #000;
  //     font-size: 20px;
  //     font-weight: 600;
  //     padding: 20px;
  //     border-radius: 8px 8px 0 0;
  //     border: 1px solid #e9e9e9;
  //   }
  //   .content {
  //     border: 1px solid #e9e9e9;
  //     border-radius: 0 0 8px 8px;
  //     padding: 20px;
  //     margin-bottom: 20px;
  //     .item {
  //       margin-bottom: 20px;
  //       h5 {
  //         font-size: 18px;
  //         font-weight: 500;
  //         color: #504949;
  //       }
  //       p {
  //         margin-top: 5px;
  //         font-size: 16px;
  //         font-weight: 400;
  //         color: rgba(0, 0, 0, 0.69);
  //       }
  //     }
  //   }
  // `,
  SelectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-self: flex-start;
    .btns {
      display: flex;
      justify-content: flex-start;
      align-self: flex-start;
      border-radius: 8px;
      margin-right: 10px;
    }
    & > span {
      font-size: 15px;
      font-weight: 500;
      color: #000;
      margin-right: 10px;
    }
  `

// CustomButton = styled.a`
//   text-decoration: none;
//   background: ${colors.primary};
//   display: inline-block;
//   border-radius: 8px;
//   border: none;
//   font-weight: 600;
//   color: #fff;
//   width: auto;
//   height: 55px;
//   margin-right: 20px;
//   padding: 10px 20px;
//   font-size: 22px;
//   align-items: center;
//   justify-content: center;
// `,
// IWrapper = styled.div`
//   overflow: hidden;
//   border: 1px solid #f2f2f2;
//   min-height: 100px;
//   position: relative;
//   margin-top: 20px;
//   flex: 1;
//   & > iframe {
//     width: 100%;
//     position: relative;
//     box-shadow: none;
//     border: none;
//   }
// `;
