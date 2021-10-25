import React, { useEffect } from 'react'
import { startCase, compact, concat, get } from 'lodash'
import { Wrapper, Container } from 'commons/styles'
import { HeaderContainer, ButtonSection, DataSection } from '../styles'

const Vote = ({ match, history }) => {
  return <Wrapper>
    <Container>
      <HeaderContainer>
        <h2>View One Vote</h2>
        <ButtonSection>
          <a href="#" className="btn btn-border">Linkedin</a>
          <a href="#" className="btn btn-bg">Blockchain ID Address</a>
        </ButtonSection>
      </HeaderContainer>
      <DataSection className='viewVoteDtlsSec'>
        <h4>Voter Details</h4>
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
      <DataSection>
        <h4>Problem Proposal (They Voted On )</h4>
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
      <DataSection>
        <h4>Voter Details</h4>
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
    </Container>
  </Wrapper>
}
  
export default Vote
