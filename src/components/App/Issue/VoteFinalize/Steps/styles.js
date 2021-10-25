import styled from 'styled-components'

import { colors } from 'theme'

export const Wrapper = styled.div`
    display: flex;
  `,
  InnerWrapper = styled.div`
    flex: 1;
    margin-right: 30px;
  `,
  Header = styled.div`
    font-size: 34px;
    font-weight: 600;
    color: ${colors.primary};
  `,
  Body = styled.div`
    margin: 20px 0;
  `,
  BodyInfo = styled.div`
    margin-bottom: 20px;
  `,
  OrderedList = styled.ol`
    list-style-type: inside;
    margin: 0 20px;
    li {
      margin: 5px 0;
      div {
        margin-top: 5px;
        span {
          font-weight: 600;
        }
      }
    }
  `,
  Info = styled.div`
    margin-bottom: 20px;
    font-style: italic;
  `,
  SubHeader = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  `
