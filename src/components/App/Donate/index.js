import React, { useContext } from "react"
import styled from "styled-components"

import { Container } from "commons/styles"
import Button from "commons/Buttons"
import * as ROUTES from "constants/routes"
import { colors } from "theme"
import { AppContext } from "../AppContext"

const Donate = ({ history }) => {
  const { selectedHolon } = useContext(AppContext)

  return (
    <Wrapper>
      {donateContentData(selectedHolon, history).map((i, idx) => {
        const ind = idx + 1
        return (
          <Item>
            <Container>
              <span className="index">{ind < 10 ? `0${ind}` : ind}</span>
              <div className="content">
                <h3>{i.title}</h3>
                <p>{i.content}</p>
                {i.onClickButton && (
                  <Button
                    onClick={() => i.onClickButton()}
                    width={275}
                    height={55}
                    style={{ fontSize: 19, fontWeight: "600", marginTop: 40 }}
                  >
                    View Donation Page
                  </Button>
                )}
              </div>
            </Container>
          </Item>
        )
      })}
    </Wrapper>
  )
}

export default Donate

const Wrapper = styled.div``,
  Item = styled.div`
    padding: 60px 0;
    & > ${Container} {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      max-width: 1165px;
    }
    .index {
      font-size: 118px;
      font-weight: 700;
      color: ${colors.primary};
      margin-right: 85px;
      line-height: 1;
    }
    .content {
      flex: 1;
      h3 {
        font-size: 46px;
        font-weight: 700;
        color: ${colors.primary};
        margin-bottom: 10px;
        line-height: 1.1;
      }
      p {
        font-size: 20px;
        font-weight: 400;
        color: #252525;
      }
    }
    &:nth-of-type(2n) {
      background: #f3f7fc;
      .index {
        color: #696969;
      }
      .content {
        h3 {
          color: #413d3d;
        }
      }
    }
  `

const donateContentData = (selectedHolon, history) => [
  {
    title: "1st, Donate to the Zero Theft Movement",
    content:
      "Donations are needed for us to keep the software and ability open.  If you want crony capitalism removed, to keep the healthy ethical economy protected, then please donate.",
    onClickButton: () => history.push(ROUTES.DONATE_TO),
  },
  {
    title: "2nd, Donate to the Holon",
    content:
      "Your holon is run by an individual, often in another country.  A $50-once-per-year donation will keep the holon running.  Protect one-citizen-one-vote by open source software that corporations don’t control.  You make one-citizen-one-vote master by it being financially self-sustaining.",
    onClickButton: () => window.open(`zerotheft://donate-to/holon?id=${selectedHolon.id}`),
  },
  {
    title: "3rd, Donate to Pay-it-forward fund",
    content:
      "We are dedicated to making this easy-to-use.  Blockchain payments can scare people initially.  The pay-it-forward allows someone to cast their first few votes without having to buy cryptocurrency.  Your donation to tha pay-it-forward fund pays for ~$0.05 per vote to help get people started.  When they get serious, they will donate to the pay-it-forward fund to everyone else.",
    onClickButton: () => window.open(`zerotheft://donate-to/pay-it-forward?id=${selectedHolon.id}`),
  },
]
