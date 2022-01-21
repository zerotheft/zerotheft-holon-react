import React from "react"
import { Button, Grid } from "@mui/material"
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
          <GrayHeadlineH3>Verify Voter Id</GrayHeadlineH3>
          <GrayTextP>You need to verify your voter id in order to vote</GrayTextP>
          <Body>
            <div>
              <GrayHeadlineH5>Voter ID verification</GrayHeadlineH5>
              <GraySubTextP>
                If you have already verified your voter id, Please click on continue. else, please follow below steps.
              </GraySubTextP>
              <GraySubTextUL>
                <OrderedList>
                  <li>
                    Please click <MaterialLinkText onClick={() => window.open(retryUrl)}>here</MaterialLinkText> to
                    verify.
                  </li>
                  <li>Proceed to verify your Voter Id</li>
                  <li>Once Voter id has been verified, Click on continue. </li>
                </OrderedList>
              </GraySubTextUL>
            </div>
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
          </Body>
        </Grid>
      </Grid>
    </CardSection>
  )
}

export default UnverifiedCitizen
