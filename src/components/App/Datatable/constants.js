import React from 'react'
import moment from 'moment'
import { convertDollarToString } from 'utils'

const citizenColumns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
      cell: ({id}) => <a href={`/citizen/${id}}`} target="_blank">{(id.slice(0,15) + '...')}</a>
    },
    {
      name: 'Name',
      sortable: true,
      cell: ({firstName, lastName}) => `${firstName} ${lastName}`
    },
    {
        name: 'Country',
        selector: 'country',
        sortable: true
    },
    {
        name: 'Linkedin URL',
        sortable: true,
        cell: ({linkedin}) => <a href={`https://${linkedin}`} target="_blank">{linkedin}</a>

    },
  ];

  const proposalColumns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
      cell: ({id}) => <a href={`proposals/${id}`} target="_blank">{id}</a>
    },
    {
        name: 'Country',
        selector: 'country',
        sortable: true
    },
    {
        name: 'Path',
        selector: 'path',
        sortable: true
    },
    {
        name: 'Theft Amount',
        selector: 'theft_amount',
        sortable: true,
        cell: ({theft_amount}) => `$${convertDollarToString(theft_amount)}`
    },
    {
        name: 'Date',
        selector: 'date',
        sortable: true,
        cell: ({date}) => `${moment.unix(date).format("MMMM DD, YYYY, h:mm:ss a")} PT`

    },
  ];

export const tabs = [
  {
    id: 1,
    path: 'citizen',
    name: 'Citizen',
    title: 'Citizen List',
    columns: citizenColumns
  },
  {
    id: 2,
    path: 'proposal',
    name: 'Proposal',
    title: 'Proposal List',
    columns: proposalColumns
  }
]