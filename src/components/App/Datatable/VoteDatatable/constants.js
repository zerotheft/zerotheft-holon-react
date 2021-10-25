import React from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment'


const voteColumns = [
  {
    name    : 'ID',
    selector: 'id',
    sortable: true,
    cell    : row => <a href={`/vote/${row.id}`} target="_blank" rel="noreferrer">{(`${row.id.slice(0,15) }...`)}</a>  
  },
  {
    name    : 'Vote Type',
    selector: 'vote_type',
    sortable: true
  },
  {
    name    : 'Holon Url',
    selector: 'holon_url',
    sortable: true,
    cell    : ({ holon_url }) => <a href={holon_url} target="_blank" rel="noreferrer">{holon_url}</a>  
  },
  {
    name    : 'Voter ID',
    selector: 'voter_id',
    sortable: true
  },
  {
    name    : 'Voter Name',
    selector: 'voter_name',
    sortable: true
  },
  {
    name    : 'Voter Country',
    selector: 'voter_country',
    sortable: true
  }
];

export const tab = {
  id     : 1,
  path   : 'votelist',
  name   : 'Vote',
  title  : 'Vote List',
  columns: voteColumns
}
