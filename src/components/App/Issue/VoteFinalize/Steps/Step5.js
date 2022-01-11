import React from "react"
import { Button, Grid } from "@mui/material"
import metamaskIcon from "assets/icons/metamask.svg"
import config from "config"
import { CardSection, GrayHeadlineH3, GrayHeadlineH5, GraySubTextUL, GrayTextP } from "commons/newStyles"
import { ButtonsWrapper } from "./Buttons"
import { OrderedList } from "./styles"

const { MODE, TOKEN, CHAIN_ID, HTTP_PROVIDER } = config

const Step5 = ({ proceed }) => {
  let name
  switch (MODE) {
    case "private":
      name = "ETC Privatenet"
      break
    case "staging":
      name = "Polygon Testnet"
      break
    case "production":
      name = "Polygon Mainnet"
      break
    default:
      name = "Local Network"
      break
  }

  return (
    <CardSection>
      <Grid container>
        <Grid item lg={8}>
          <div>
            <GrayHeadlineH3>Configure Zerotheft Wallet</GrayHeadlineH3>
            <GrayTextP>We need to configure zerotheft wallet to connect to {name}.</GrayTextP>
            <GrayHeadlineH5>Zerotheft Wallet Network Setup</GrayHeadlineH5>
            <div>
              <GrayTextP>
                If you have already done the following steps, select ‘ETC Privatenet’ from network selector tab.
              </GrayTextP>
            </div>
            <GraySubTextUL>
              <OrderedList>
                <li>Open my accounts selector at the top right corner section of the zerotheft wallet.</li>
                <li>Click on settings and then go to networks setting.</li>
                <li>
                  Click &apos;Add Network&apos; button and fill the details as:
                  <br />
                  <div>
                    <span>Network Name:</span> {name}
                  </div>
                  <div>
                    <span>New RPC URL:</span> {HTTP_PROVIDER}
                  </div>
                  <div>
                    <span>Chain ID:</span> {CHAIN_ID}
                  </div>
                  <div>
                    <span>Currency Symbol:</span> {TOKEN}
                  </div>
                </li>
                <li>Click on save</li>
              </OrderedList>
            </GraySubTextUL>
            <ButtonsWrapper>
              <Button
                variant="contained"
                onClick={async () => {
                  await proceed()
                }}
              >
                Continue
              </Button>
            </ButtonsWrapper>
          </div>
        </Grid>
        <Grid item lg={4}>
          <div>
            <img src={metamaskIcon} alt="Metamask extension" />
          </div>
        </Grid>
      </Grid>
    </CardSection>
  )
}

export default Step5
