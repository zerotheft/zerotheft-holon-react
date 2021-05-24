export const HOME = '/'

export const
  PATH = '/path',
  PATH_DETAIL = `${PATH}/:pathname`

export const
  ISSUE = `${PATH_DETAIL}/issue/:id`,
  PROPOSALS = `${PATH_DETAIL}/issue/:id/proposals`,
  COUNTER_PROPOSALS = `${PATH_DETAIL}/issue/:id/counter-proposals`,
  VOTE = `${PATH_DETAIL}/issue/:id/vote`,
  VOTE_FINALIZE = `${PATH_DETAIL}/issue/:id/finalize`,
  AFTER_VOTE = `${PATH_DETAIL}/issue/:id/voted`

export const VIEW_PROPOSAL = `/proposals/:id`
export const VIEW_COUNTER_PROPOSAL = `/counter-proposals/:id`

export const HOLON = '/holon'
export const THEFT = '/theft'
export const WALLET = '/wallet'
export const SETTING = '/setting'
export const DONATE = '/donate'
export const DONATE_TO = '/donate-to'
export const PATHREPORT = '/pathReport/:pathName'
export const LEAFREPORT = '/leafReport/:leafName'
export const ALL_PROPOSALS = '/all-proposals'
export const ALL_CITIZENS = '/all-citizens'
