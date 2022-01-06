import React from "react"
import { Formik, Field, Form } from "formik"
import { getYear } from "date-fns"
import * as Yup from "yup"
import styled from "styled-components"
import { colors } from "theme"

import { Row } from "commons/Form/styles"
import { LabelledRadioField, Radio, TextField, SelectField, Checkbox, TextAreaField } from "commons/Form/InputFields"
import Button from "commons/Buttons"
import MainWrapper from "./commons/MainWrapper"

const ZeroTheft = () => {
  return (
    <MainWrapper>
      <Description>
        <Title>How your donation helps.</Title>
        <Paragraph>
          Donations are needed for us to keep our voting platform permanent and public through the blockchain. If you
          want to help eliminate the rigged parts of our otherwise ethical economy, then please donate
        </Paragraph>
        <ul>
          <li>In the interest of full transparency, we will use these funds to:</li>
          <li> Keep your votes and proposals deployed on the blockchain</li>
          <li> Continue improving on our voting platform</li>
          <li> Develop our educational content on the Zero Theft Movement</li>
          <li> Attract citizens to strengthen our cause</li>
        </ul>
      </Description>
      <Content>
        <Title>Donation Amount</Title>
        <Formik
          enableReinitialize
          initialValues={{
            amount: 50,
            payType: "one-time",
            first_name: null,
            last_name: null,
            email: null,
            phone: null,
            payBy: "credit-card",
            credit_card: {
              card_number: null,
              expire: {
                year: null,
                month: null,
              },
              cvv: null,
            },
            address: "",
            state: null,
            country: null,
            zip: null,
            include_reason: false,
            comment: null,
          }}
          validationSchema={Yup.object().shape({
            first_name: Yup.string().nullable().required("Name Required."),
            email: Yup.string().nullable().required("Email Required."),
            phone: Yup.string()
              .nullable()
              .required("Phone Required.")
              .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                "Phone number is not valid"
              )
              .min(10, "to short")
              .max(10, "to long"),
            address: Yup.string().nullable().required("Address Required."),
            zip: Yup.string().nullable().required("Zip/Postal Code Required."),
          })}
          /* eslint-disable-next-line no-console */
          onSubmit={(values) => console.log(values)}
        >
          {({ values, isValid }) => {
            return (
              <Form>
                <Row style={{ flexWrap: "wrap" }}>
                  <Field
                    component={LabelledRadioField}
                    name="amount"
                    values={[
                      { value: 50, label: "$50" },
                      { value: 100, label: "$100" },
                      { value: 250, label: "$250" },
                      { value: 500, label: "$500" },
                      { value: 1000, label: "$1,000" },
                      { value: 5000, label: "$5,000" },
                      { value: 10000, label: "$10,000" },
                      { value: "other", label: "other" },
                    ]}
                    style={{ margin: "10px 0" }}
                  />
                  <Field
                    component={TextField}
                    type="number"
                    min="0"
                    name="custom_amount"
                    placeholder="Enter Custom Amount"
                    style={{ display: values.amount !== "other" ? "none" : "flex" }}
                    inputStyles={{ minWidth: 150, maxWidth: 350 }}
                  />
                </Row>
                <Row style={{ padding: "10px 0", borderBottom: "1px solid #C4C4C4" }}>
                  <Field
                    component={Radio}
                    name="payType"
                    values={[
                      { value: "one-time", label: "One Time" },
                      { value: "monthly", label: "Monthly" },
                    ]}
                    radioStyle={{
                      color: "#7C7B7D",
                      fontSize: 16,
                      fontWeight: "500",
                      width: "auto",
                    }}
                  />
                </Row>
                <Row style={{ flexWrap: "wrap" }}>
                  <Field
                    name="first_name"
                    component={TextField}
                    label="First Name"
                    placeholder="First Name"
                    labelType="top"
                    style={{ margin: 10, minWidth: 350 }}
                  />
                  <Field
                    name="last_name"
                    component={TextField}
                    label="Last Name"
                    placeholder="Last Name"
                    labelType="top"
                    style={{ margin: 10, minWidth: 350 }}
                  />
                  <Field
                    name="email"
                    component={TextField}
                    label="Email Address"
                    placeholder="Email Address"
                    labelType="top"
                    style={{ margin: 10, minWidth: 350 }}
                  />
                  <div style={{ width: "100%", maxWidth: "33%" }}>
                    <Field
                      name="phone"
                      component={TextField}
                      label="Phone Number"
                      placeholder="Phone Number"
                      labelType="top"
                      style={{ margin: 10, minWidth: 350 }}
                    />
                  </div>
                </Row>
                <Row style={{ margin: "30px 0" }}>
                  <Field
                    component={LabelledRadioField}
                    name="payBy"
                    values={[
                      { value: "credit-card", label: "Credit Card" },
                      { value: "e-check", label: "E-Check" },
                      { value: "paypal", label: "Paypal" },
                      { value: "amazon-pay", label: "Amazon Pay" },
                      { value: "crypto", label: "Crypto" },
                    ]}
                    style={{ margin: "10px 0" }}
                  />
                </Row>
                <Row>
                  <Field
                    component={TextField}
                    name="credit_card.card_number"
                    placeholder="Enter a valid card number"
                    label="Credit Card"
                    labelType="top"
                    style={{ margin: 10, minWidth: 350 }}
                  />
                  <Row style={{ margin: 0 }}>
                    <Field
                      component={TextField}
                      name="credit_card.expire.month"
                      placeholder="Enter Month"
                      label="Expiration Month"
                      type="number"
                      min={1}
                      max={12}
                      labelType="top"
                      style={{ margin: 10 }}
                    />
                    <Field
                      component={TextField}
                      name="credit_card.expire.year"
                      placeholder="Enter Year"
                      label="Expiration Year"
                      type="number"
                      min={getYear(new Date())}
                      labelType="top"
                      style={{ margin: 10 }}
                    />
                  </Row>
                  <Field
                    component={TextField}
                    name="credit_card.cvv"
                    placeholder="Enter CVV"
                    label="CVV"
                    type="number"
                    min={100}
                    max={999}
                    labelType="top"
                    style={{ margin: 10, minWidth: 350 }}
                  />
                </Row>
                <Row style={{ flexWrap: "wrap" }}>
                  <Field
                    component={TextField}
                    name="address"
                    placeholder="Enter Address"
                    label="Address"
                    labelType="top"
                    style={{ margin: 10, minWidth: 350 }}
                  />
                  <Field
                    name="state"
                    component={SelectField}
                    label="State (required for U.S)"
                    labelType="top"
                    options={[
                      { value: "NY", label: "NY" },
                      { value: "LA", label: "LA" },
                      { value: "VIR", label: "VIR" },
                    ]}
                    placeholder="Select Your State"
                    searchable={false}
                    style={{ margin: 10, minWidth: 350 }}
                  />
                  <Field
                    name="country"
                    component={SelectField}
                    label="Country"
                    labelType="top"
                    placeholder="Select Your Country"
                    options={[
                      { value: "USA", label: "USA" },
                      { value: "Nepal", label: "Nepal" },
                    ]}
                    searchable={false}
                    style={{ margin: 10, minWidth: 350 }}
                  />
                  <div style={{ width: "100%", maxWidth: "33%" }}>
                    <Field
                      component={TextField}
                      name="zip"
                      placeholder="Zip / Postal Code"
                      label="Zip / Postal Code"
                      type="number"
                      labelType="top"
                      style={{ margin: 10, minWidth: 350 }}
                    />
                  </div>
                </Row>
                <Row>
                  <Field
                    component={Checkbox}
                    name="include_reason"
                    label="I have included reason in my will or other estate plans"
                    style={{ margin: 10 }}
                  />
                </Row>
                <Row>
                  <Field
                    component={TextAreaField}
                    name="comment"
                    label="Comments"
                    placeholder="Comments"
                    labelType="top"
                  />
                </Row>
                <Button type="submit" width={195} height={45} style={{ fontSize: 17 }} disabled={!isValid}>
                  Submit
                </Button>
              </Form>
            )
          }}
        </Formik>
      </Content>
    </MainWrapper>
  )
}

export default ZeroTheft

const Content = styled.div`
    h5 {
      font-size: 31px;
      color: #504d4d;
      font-weight: 600;
      margin-bottom: 20px;
    }
  `,
  Description = styled.div`
    margin-bottom: 20px;
    li {
      padding: 5px;
    }
    li:before {
      content: "✓";
    }
  `,
  Title = styled.div`
    color: ${colors.text.black};
    font-size: 20px;
    font-weight: 600;
  `,
  Paragraph = styled.div`
    color: ${colors.text.gray};
    padding: 10px 0;
    font-weight: 500;
  `
