import React from "react"
import { Button, Grid } from "@mui/material"
import { NavigateNext } from "@mui/icons-material"
import config from "config"
import {
  CardSection,
  GrayHeadlineH3,
  GrayHeadlineH5,
  GraySubTextP,
  GraySubTextUL,
  GrayTextP,
  MaterialLinkText,
} from "commons/newStyles"
import { ButtonsWrapper } from "./Buttons"
import { Body, OrderedList } from "./styles"

const UnverifiedCitizen = ({ proceed }) => {
  const { CENTRALIZED_SERVER_FRONTEND } = config
  const retryUrl = `${CENTRALIZED_SERVER_FRONTEND}/donation-wizard/identity-verification?retry=true`
  return (
    <CardSection>
      <Grid container>
        <Grid item lg={12}>
          <GrayHeadlineH3>Verify Voter ID</GrayHeadlineH3>
          <GrayTextP>You need to verify your voter ID in order to vote</GrayTextP>
          <Body>
            <div>
              <GrayHeadlineH5>Voter ID verification</GrayHeadlineH5>
              <GraySubTextP>
                If you have already verified your voter ID, Please click on continue. else, please follow below steps.
              </GraySubTextP>
              <GraySubTextUL>
                <OrderedList>
                  <li>
                    Please click <MaterialLinkText onClick={() => window.open(retryUrl)}>here</MaterialLinkText> to
                    verify.
                  </li>
                  <li>Proceed to verify your Voter ID</li>
                  <li>Once Voter ID has been verified, Click on continue. </li>
                </OrderedList>
              </GraySubTextUL>
            </div>
            <ButtonsWrapper>
              <Button
                variant="contained"
                onClick={async () => {
                  await proceed()
                }}
                endIcon={<NavigateNext />}
              >
                Continue
              </Button>
            </ButtonsWrapper>
          </Body>
        </Grid>
      </Grid>
    </CardSection>
  )
}

export default UnverifiedCitizen
