/* eslint-disable camelcase */

import { round } from "lodash"

export const calculate = (obj) => {
  if (!obj) return {}
  const { for: forVote, against, votes, unlock_votes } = obj

  if (!votes) return {}
  const vote = forVote >= against ? "YES" : "NO"
  const toMeasure = vote === "YES" ? forVote : against

  const votedPercent = round((toMeasure / votes) * 100, 2)
  const unOfficial = votes < unlock_votes
  return { votedPercent, vote, amount: obj.theft, unlockVotes: unlock_votes, votes, unOfficial }
}
