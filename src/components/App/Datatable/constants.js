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
        sortable: true
    },
  ];

  const proposalColumns = [
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
        sortable: true
    },
  ];

  export const tabs = [{
    id: 1,
    path: 'citizen',
    name: 'Citizen',
    title: 'Citizen List',
    columns: citizenColumns
}, {
    id: 2,
    path: 'proposal',
    name: 'Proposal',
    title: 'Proposal List',
    columns: proposalColumns
}]