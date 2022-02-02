import React, { useContext, useEffect } from "react"
import { Button, Grid } from "@mui/material"
import { NavigateNext } from "@mui/icons-material"
import { ZTM_WALLET_URL } from "constants/index"
import { CardSection, GrayHeadlineH3, GraySubTextdimP, GraySubTextUL, MaterialLinkText } from "commons/newStyles"
import metamaskIcon from "assets/icons/metamask.svg"
import config from "config"
import { ToastContext } from "commons/ToastContext"
import useWeb3 from "utils/useWeb3"
import { VoteContext } from "../VoteContext"
import { OrderedList } from "./styles"
import { ButtonsWrapper } from "./Buttons"

const Step4 = () => {
  const { checkStep } = useContext(VoteContext)
  const { CHAIN_NAME } = config
  const { setToastProperties } = useContext(ToastContext)
  const { isWalletInstalled } = useWeb3()
  const { installed } = isWalletInstalled()
  useEffect(() => {
    checkStep()
  }, [])

  const handleContinue = async () => {
    window.location.reload()
    if (!installed) {
      const message = "Please install browser wallet extension."
      setToastProperties({ message, type: "error" })
    }
  }

  return (
    <CardSection>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={6} sm={9} lg={6} xl={9}>
          <GrayHeadlineH3>Please install our Chrome Extension</GrayHeadlineH3>
          <GraySubTextUL>
            <p>
              You need to install the wallet to have the necessary funds to deploy your votes and proposals on the
              {CHAIN_NAME} blockchain. Follow the steps below to install ZTM Browser Extension.
            </p>
            <OrderedList>
              <li>
                Download wallet extension from{" "}
                <a href={`${ZTM_WALLET_URL}`}>
                  <MaterialLinkText>here</MaterialLinkText>
                </a>
              </li>
              <li> Unzip the file </li>
              <li> Go to chrome://extensions/ </li>
              <li>On the right side, Enable developer mode by toggling the button</li>
              <li> From menu bar, click on load unpacked </li>
              <li> Select the extracted folder. </li>
              <li>Once selected, extension will automatically be added to the chrome</li>
            </OrderedList>
            <ButtonsWrapper>
              <Button
                variant="contained"
                onClick={async () => {
                  await handleContinue()
                }}
                endIcon={<NavigateNext />}
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
        <Grid item xs={12} md={6} sm={9} lg={3} xl={2} sx={{ flexDirection: { xs: "row", md: "column" } }}>
          <img src={metamaskIcon} alt="Metamask extension" />
        </Grid>
      </Grid>
    </CardSection>
  )
}

export default Step4
