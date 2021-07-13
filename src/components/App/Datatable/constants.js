import React from 'react'
import moment from 'moment'

const citizenColumns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true
    },
    {
        name: 'Country',
        selector: 'country',
        sortable: true
    },
    {
        name: 'Linkedin URL',
        selector: 'linkedin_url',
        sortable: true,
        cell: ({linkedin_url}) => <a href={`https://${linkedin_url}`} target="_blank">{linkedin_url}</a>

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
      name: 'Name',
      selector: 'name',
      sortable: true
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
        sortable: true
    },
    {
        name: 'Date',
        selector: 'date',
        sortable: true,
        cell: ({date}) => moment.unix(date).format("DD/MM/YYYY HH:mm:ss")

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