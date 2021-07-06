import { round } from 'lodash'

export const calculate = obj => {
  if (!obj) return {}

  const { for: forVote, against, votes } = obj

  if (!votes) return {}
  const vote = forVote >= against ? 'YES' : 'NO'
  const toMeasure = vote === 'YES' ? forVote : against

  const votedPercent = round(toMeasure / votes * 100, 2)

  return { votedPercent, vote, amount: obj.theft }
}
