import React from "react"
import { Button, Grid } from "@mui/material"
import config from "config"
import {
  CardSection,
  GrayHeadlineH3,
  GrayHeadlineH5,
  GraySubTextUL,
  GrayTextP,
  MaterialLinkText,
} from "commons/newStyles"
import { ButtonsWrapper } from "./Buttons"
import { Body, OrderedList } from "./styles"

const Step6 = ({ proceed }) => {
  const { CENTRALIZED_SERVER_FRONTEND } = config
  const registrationLink = `${CENTRALIZED_SERVER_FRONTEND}/donation-wizard/donate`
  return (
    <CardSection>
      <Grid container>
        <Grid item lg={12}>
          <GrayHeadlineH3>Register your public voter ID</GrayHeadlineH3>
          <GrayTextP>We need your public voter ID so that we can keep track of your votes.</GrayTextP>
          <Body>
            <div>
              <GrayHeadlineH5>Register Public Voter</GrayHeadlineH5>
              <GraySubTextUL>
                <OrderedList>
                  <li>
                    Navigate to register voter.{" "}
                    <MaterialLinkText onClick={() => window.open(registrationLink)}>Register Voter</MaterialLinkText>
                  </li>
                  <li>Proceed with the flow provided on page to register your Voter Id</li>
                  <li>Switch back to this page and click continue.</li>
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
          </Body>
        </Grid>
      </Grid>
    </CardSection>
  )
}

export default Step6
