import React from "react"

import CopyIcon from "assets/icons/copy-icon.svg"
import MainWrapper from "./commons/MainWrapper"
import { ContentWrapper, EthAddress, History } from "./commons/styles"

const Holon = () => {
  return (
    <MainWrapper>
      <ContentWrapper>
        <p>
          Your holon is run by an individual, often in another country. A $50-once-per-year donation will keep the holon
          running. Protect one-citizen-one-vote by open source software that corporations don’t control. You make
          one-citizen-one-vote master by it being financially self-sustaining.
        </p>
        <ul className="checklist">
          <li>Keeps your holon running</li>
          <li>Protect forever availability</li>
          <li>Enable power in the citizens hands (instead of corporations lobbyists)</li>
        </ul>
        <EthAddress>
          <p>Send to Ethereum Address</p>
          <img className="copy" src={CopyIcon} alt="copy" />
          <p style={{ fontWeight: "700" }}>0xDC25EF3F5B8A186998338A2ADA83795FBA2D695E</p>
        </EthAddress>
        <History>
          <h5>Your history of donations to Holons:</h5>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ETH</th>
                  <th>USD</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0.035 ETH</td>
                  <td>$19.00 USD</td>
                  <td>Donate 6/19/2021</td>
                </tr>
              </tbody>
            </table>
          </div>
        </History>
      </ContentWrapper>
    </MainWrapper>
  )
}

export default Holon
