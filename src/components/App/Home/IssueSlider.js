import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Carousel from 'react-elastic-carousel'
import { get, isEmpty } from 'lodash'
import { colors } from 'theme'
import styled from 'styled-components'
import yaml from 'js-yaml'
import { nextAreaToVote } from 'apis/path'
import { getProposalTemplate } from 'apis/proposals'
import OverlaySpinner from 'commons/OverlaySpinner'
import Button from 'commons/Buttons'
import { Container, EmptyText } from 'commons/styles'
import { AppContext } from '../AppContext'

// const getLeafNodes = (data, path = '/path/USA', searchFilter) => {
//   if (!isObject(data)) return []
//   const arr = []
//   Object.keys(data).forEach(i => {
//     if (!data[i] || data[i].leaf) {
//       if (!searchFilter) arr.push({ title: i, path: `${path}/issue/${i}` })
//       else if (searchFilter === lowerCase(i).charAt(0)) arr.push({ title: i, path: `${path}/issue/${i}` })
//     } else {
//       arr.push(...getLeafNodes(data[i], `${path}%2F${i}`, searchFilter))
//     }
//   })
//   return arr
// }

// const getRelatedEndNodes = (issues, name, path) => {
//   if (!name || !isArray(name)) {
//     return take(shuffle(getLeafNodes(issues, path)), 10)
//   }

//   let arr = []
//   const username = [...take(name, 2), ...takeRight(name, 2)] // get first 2 and last 2 characters

//   for (const u of username) {
//     const letters = remove([...username], i => i !== u) || []
//     for (const letter of letters) {
//       for (const i in issues) {
//         if (u === lowerCase(i).charAt(0)) {
//           arr = [...arr, ...getLeafNodes(issues[i], `${path}%2F${i}`, letter)]
//         }
//         if (arr.length >= 9) return arr // If arr length greater than 10; END
//       }
//     }
//   }

//   return arr
// }

const IssueSlider = ({ afterVote = false, updateIssue, onlySlider = false }) => {
  const history = useHistory()
  const { paths, loadingPaths: loading } = useContext(AppContext)
  // const [getCitizenInfoApi, loadingUser, userInfo] = useFetch(getCitizenInfo)
  const [allIssues, setIssues] = useState([])

  useEffect(() => {
    // if (localStorage.getItem('citizenID')) { getCitizenInfoApi(localStorage.getItem('citizenID')) }
    prepareCarouselData(paths)

  }, [paths])

  const prepareCarouselData = async paths => {
    const nextAreaData = await nextAreaToVote()

    // const username = uniqBy(
    //   lowerCase(get(userInfo, 'name', ''))
    //     .replace(/[^a-zA-Z0-9]/g, '')
    //     .split('')
    // )
    // let issues = getRelatedEndNodes(
    //   get(paths, get(filterParams, 'initPath'), {}),
    //   userInfo ? username : null,
    //   `/path/${get(filterParams, 'initPath', 'USA')}`
    // )
    // if (issues.length < 3) {
    //   issues = getRelatedEndNodes(
    //     get(paths, get(filterParams, 'initPath'), {}),
    //     null,
    //     `/path/${get(filterParams, 'initPath', 'USA')}`
    //   )
    // }
    // console.log(issues)
    // const mappedIssues = (
    //   await Promise.all(
    //     issues.map(async i => {
    //       let path = get(i, 'path', '').split('/')[2] || ''
    //       const templatePath = `${path.replace('USA', 'proposals').replace(/%2F/g, '/')}/${i.title}`
    //       const template = await getTemplateApi(templatePath)
    //       path = path.replace(/%2F/g, ' > ');
    //       console.log("purano", path, i.path)

    //       return { title: i.title, path, rawPath: `${i.path}/proposals`, description: displayYaml(template, i.path) }
    //     })
    //   )
    // ).filter(i => i.description)
    // setIssues(mappedIssues)
    if (!isEmpty(nextAreaData)) {
      let path = nextAreaData.nextVotein.hierarchy
      let pathElms = path.split('/')
      let title = pathElms.pop()
      path = pathElms.join('%2F')
      const templatePath = `${path.replace('USA', 'proposals').replace(/%2F/g, '/')}/${title}`
      const template = await getProposalTemplate(templatePath)
      path = path.replace(/%2F/g, ' > ');
      setIssues([{ title, path, rawPath: `/path/${pathElms.join('%2F')}/issue/${title}/proposals`, description: displayYaml(template, path) }])
    }
  }

  const truncateString = (str, num) => {
    if (num && str && str.length > num) {
      return `${str.slice(0, num)}...`
    }
    return str
  }

  const displayYaml = (template, path) => {
    let data
    try {
      data = yaml.safeLoad(template)
    } catch (e) {
      console.log('loading yaml', e.message)
    }

    const details = get(data, 'describe_problem_area') || ''
    return truncateString(details, 100)
  }
  return (
    <Wrapper>
      <Container>
        {!onlySlider && (
          <Welcome>
            <h2>Welcome Citizen!</h2>
            <p>
              You can now explore the areas where your fellow citizens believe the rigged economy is resulting in THEFT.
              Get Started by learning, voting, and even proposing your own areas of theft.
            </p>
          </Welcome>
        )}
        <SliderContent className={!onlySlider ? '' : 'full'}>
          {loading ? (
            <OverlaySpinner loading overlayParent style={{ zIndex: 0 }} />
          ) : (
            <>
              <h3>For you to vote on next:</h3>
              {allIssues.length ? (
                <Carousel pagination={false} enableMouseSwipe={false} style={{ height: '160px' }}>
                  {allIssues.map(element => {
                    return (
                      <Item>
                        <Path>
                          {get(element, 'path', '').replace(/_/g, ' ')} {'>'}
                          {get(element, 'title', '').replace(/_/g, ' ')}
                        </Path>
                        <div style={{ fontSize: '15px' }}>{element.description}</div>
                        <Button onClick={() => {
                          if (afterVote) { updateIssue([]); }
                          history.push(element.rawPath)
                        }} plain>
                          Read More
                        </Button>
                      </Item>
                    )
                  })}
                </Carousel>
              ) : null}
            </>
          )}
          {!loading && !allIssues.length ? <EmptyText>Recommendations are currently unavailable</EmptyText> : null}
        </SliderContent>
      </Container>
    </Wrapper>
  )
}

export default IssueSlider

const Wrapper = styled.section`
    padding: 45px 0;
    ${Container} {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  `,
  Welcome = styled.div`
    max-width: 47%;
    h2 {
      font-size: 49px;
      line-height: 73px;
      color: ${colors.primary};
    }
    p {
      font-size: 18px;
      font-weight: 400;
      color: rgba(66, 54, 75, 0.96);
    }
  `,
  SliderContent = styled.div`
    width: 100%;
    max-width: 47%;
    min-height: 256px;
    background: #ffffff;
    box-shadow: 0px 0px 16px 1px #e2edea;
    border-radius: 17px;
    position: relative;
    padding: 20px 50px;
    h3 {
      font-size: 31px;
      color: #333;
      margin-bottom: 10px;
    }
    .rec-slider-container {
      margin: 0;
    }
    .rec-item-wrapper {
      & > div {
        width: 100%;
      }
    }
    button.rec-arrow.rec {
      position: absolute;
      top: 110px;
      background: transparent;
      box-shadow: none;
      border: none;
      color: ${colors.primary};
      &:disabled {
        opacity: 0.7;
      }
      &.rec-arrow-left {
        left: 0;
      }
      &.rec-arrow-right {
        right: 0;
      }
    }
    &.full {
      max-width: 100%;
    }
  `,
  Item = styled.div`
    & > button {
      margin: 15px 0 0 0;
    }
  `,
  Path = styled.div`
    font-size: 17px;
    color: #333;
    font-weight: 500;
    text-transform: capitalize;
  `
