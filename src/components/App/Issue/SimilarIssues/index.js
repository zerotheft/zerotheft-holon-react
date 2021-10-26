import React, { useEffect } from 'react'
import { get, reject } from 'lodash'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'

import { colors } from 'theme'
import OverlaySpinner from 'commons/OverlaySpinner'
import useFetch from 'commons/hooks/useFetch'
import { getPathProposals } from 'apis/path'
import { convertUNIXtoDATETIME } from 'utils'

const SimilarIssues = ({ history, match }) => {
  const [getPathProposalsApi, loading, res] = useFetch(getPathProposals)

  useEffect(() => {
    if (get(match, 'params.pathname')) getPathProposalsApi(get(match, 'params.pathname'))
  }, [])

  return (
    <div>
      {loading && <OverlaySpinner loading />}
      <Header>
        <h2>Issue Suggestions</h2>
      </Header>
      <ListWrapper>
        <table cellSpacing="0" cellPadding="0">
          <thead>
            <th>
              <td>Name</td>
            </th>
          </thead>
          <tbody>
            {reject(get(res, 'issues', []), { id: get(match, 'params.id') }).map(i => (
              <tr>
                <td
                  className="issue"
                  onClick={() => history.push(`/path/${get(match, 'params.pathname')}/issue/${i.id}`)}
                >
                  <div>
                    <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: 5, color: colors.primary }} />{' '}
                    {i.title || 'N/A'}{' '}
                    <span style={{ fontSize: 14, fontStyle: 'italic' }}>
                      (proposals: {i.total_proposals || 0}, counter proposals: {i.total_counter_proposals || 0})
                    </span>
                    <br />
                    <div className="createdOn">Created On: {convertUNIXtoDATETIME(i.created_at)}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!get(res, 'issues', []).length && <div style={{ padding: 10, fontStyle: 'italic' }}>No issues available</div>}
      </ListWrapper>
    </div>
  )
}

export default SimilarIssues

const Header = styled.div`
    h2 {
      font-size: 28px;
    }
  `,
  ListWrapper = styled.div`
    letter-spacing: 0.5px;
    border: 1px solid #dbdbdb;
    border-radius: 4px 4px 0 0;
    overflow: hidden;
    margin: 20px auto 0;
    max-width: 800px;
    width: 100%;
    & > table {
      width: 100%;
      font-size: 16px;
      thead {
        background: #f2f2f2;
        overflow: hidden;
        th {
          td {
            padding: 10px;
          }
        }
      }
      tbody {
        tr {
          td {
            border-top: 1px solid #dbdbdb;
            padding: 10px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            &:hover {
              background: #fafafa;
            }
            & > div {
              &:hover {
                cursor: pointer;
                color: ${colors.primary};
              }
            }
            & > a {
              display: inline-block;
              border: 1px solid ${colors.primary};
              padding: 5px 8px;
              border-radius: 4px;
              font-size: 14px;
              text-decoration: none;
              color: ${colors.primary};
              transition: background 0.3s ease, color 0.3s ease;
              &:hover {
                color: #fff;
                background: ${colors.primary};
              }
            }
          }
        }
      }
    }
    .createdOn {
      color: #ccc;
      font-size: 13px;
      margin-top: 5px;
    }
  `
