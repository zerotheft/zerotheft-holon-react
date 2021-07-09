import React from 'react'
import moment from 'moment'


  const voteColumns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Vote Type',
      selector: 'vote_type',
      sortable: true
    },
    {
        name: 'Holon Url',
        selector: 'holon_url',
        sortable: true
    },
    {
        name: 'Voter ID',
        selector: 'voter_id',
        sortable: true
    },
    {
        name: 'Voter Name',
        selector: 'voter_name',
        sortable: true
    },
    {
        name: 'Voter Country',
        selector: 'voter_country',
        sortable: true
    }
  ];

export const tab = {
    id: 1,
    path: 'votelist',
    name: 'Vote',
    title: 'Vote List',
    columns: voteColumns
  }