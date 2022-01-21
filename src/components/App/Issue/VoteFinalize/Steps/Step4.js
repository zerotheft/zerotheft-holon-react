import React, { useContext, useEffect } from "react"
import { Button, Grid } from "@mui/material"
import { CardSection, GrayHeadlineH3, GraySubTextdimP, GraySubTextUL, MaterialLinkText } from "commons/newStyles"
import metamaskIcon from "assets/icons/metamask.svg"
import { VoteContext } from "../VoteContext"
import { OrderedList } from "./styles"
import { ButtonsWrapper } from "./Buttons"

const Step4 = ({ proceed }) => {
  const { checkStep, loadWeb3 } = useContext(VoteContext)

  useEffect(() => {
    checkStep()
  }, [])

  const connectMetamask = () => {
    if (window.etherem) {
      loadWeb3()
    } else {
      // window.location.href = buildUrl()
      window.location.reload()
    }
  }

  return (
    <CardSection>
      <Grid container>
        <Grid item xs={12} md={6} sm={8} lg={8} xl={8}>
          <GrayHeadlineH3>Setup Zerotheft Wallet</GrayHeadlineH3>{" "}
          <GraySubTextUL>
            <OrderedList>
              <li>
                Download and open Zerotheft Wallet{" "}
                <MaterialLinkText
                  onClick={() =>
                    window.open(
                      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
                      "_blank"
                    )
                  }
                >
                  Download Metamask
                </MaterialLinkText>
              </li>
              <li>Create your zerotheft wallet account by clicking create wallet button and follow necessary steps.</li>
              <li>
                Connect zerotheft wallet to our holon.{" "}
                <MaterialLinkText onClick={() => connectMetamask()}>Connect</MaterialLinkText>
              </li>
            </OrderedList>
            <ButtonsWrapper>
              <Button
                variant="contained"
                onClick={async () => {
                  await proceed()
                }}
              >
                CONTINUE
              </Button>
            </ButtonsWrapper>
            <GraySubTextdimP>
              <p
                className="outLink"
                onClick={() => {
                  window.open(
                    "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }}
                style={{ cursor: "pointer", marginTop: "15px" }}
              >
                I will use MetaMask as my chrome cryptocurrency wallet
              </p>
            </GraySubTextdimP>
          </GraySubTextUL>
        </Grid>
        <Grid item xs={12} md={6} sm={4} lg={4} xl={4}>
          <img src={metamaskIcon} alt="Metamask extension" />
        </Grid>
      </Grid>
    </CardSection>
  )
}

export default Step4
