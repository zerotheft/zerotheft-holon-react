import React, { useEffect } from 'react'
import { startCase, compact, concat, get } from 'lodash'
import { Wrapper, Container } from 'commons/styles'
import { HeaderContainer, ButtonSection, DataSection, VoteDetailSection } from '../styles'

const Citizen = ({ match, history }) => {
  return <Wrapper>
    <Container>
      <HeaderContainer>
        <h2>View One Citizen</h2>
        <ButtonSection>
          <a href="#" className="btn btn-border">Linkedin</a>
          <a href="#" className="btn btn-bg">Blockchain ID Address</a>
        </ButtonSection>
      </HeaderContainer>
      <DataSection>
        <ul>
          <li>
            <strong>Full Name</strong>
            <span>David Lambard 
              <div className="verifiedSec"><i className="fa fa-checked" /> Verified
              </div>
            </span>
          </li>
          <li><strong>No Of Votes</strong> <span>35</span></li>
          <li><strong>Linked-In URL</strong> <span><a href="#">https://www.linkedin.com/davidlampard</a></span></li>
          <li><strong>Country</strong> <span>United States of America</span></li>
          <li><strong>Date Created</strong> <span>2021 Jan 22</span></li>
          <li><strong>Coming</strong> <span><div className="yesText">75% YES</div><div className="noText">45% NO</div></span></li>
          <li><strong>Date last voted</strong> <span>2021 Jan 22</span></li>
          <li><strong>BTC Blockchain Address</strong><span>asdw54821asdf8w2f4812881854e1</span></li>
        </ul>
      </DataSection>
      <VoteDetailSection>
        <h2>Their Votes</h2>
        <table>
          <thead>
            <tr>
              <th>Hiearchry Paths</th>
              <th>Proposal ID</th>
              <th>Evety Voter</th>
              <th>Total Amount</th>
              <th>Their Amount</th>
              <th>Their Vote</th>
              <th>Date of Vote</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Healthcare / Finance</td>
              <td>45</td>
              <td><span className="yestheft">45% Yes Theft</span> <span className="notheft">34% Notheft</span></td>
              <td>$14.88</td>
              <td><span className="yestheft">45% Yes Theft</span> ></td>
              <td>Theft</td>
              <td>4th Oct 2020</td>
            </tr>

            <tr>
              <td>Healthcare / Finance</td>
              <td>45</td>
              <td><span className="yestheft">45% Yes Theft</span> <span className="notheft">34% Notheft</span></td>
              <td className="totalAmount">$14.88</td>
              <td><span className="yestheft">45% Yes Theft</span> ></td>
              <td>Theft</td>
              <td>4th Oct 2020</td>
            </tr>
          </tbody>
        </table>
      </VoteDetailSection>
    </Container>
  </Wrapper>
}
  
export default Citizen

  
