import React, { useEffect, useState } from 'react'

import DataTable, { createTheme } from 'react-data-table-component';
import { getCitizensInfo, getProposalsInfo } from 'apis/datas'
import useFetch from 'commons/hooks/useFetch'
import { capitalize } from 'lodash'
import { colors } from 'theme';
import { Wrapper, TableWrapper, ListMenu, TabWrapper, customStyles } from './commons/styles'
import { tabs } from './constants'

createTheme('custom', {
  text: {
    primary  : colors.background.body,
    secondary: colors.textTitle,
  },
  background: {
    default: colors.background.body,
  },
  context: {
    background: colors.datatable.context.background,
    text      : colors.text.white,
  }
});

const Datatable = ({ history })=> {
  const [getCitizensInfoApi, loading, citizenData] = useFetch(getCitizensInfo)
  const [getProposalsInfoApi, load, proposalData] = useFetch(getProposalsInfo)
    
  const [tabInfo, updateTab] = useState(Object.assign(tabs[0], { data: citizenData }))
  const updateItems = index => {
    switch(index) {
    case 1:
      updateTab(Object.assign(tabs[index-1], { data: citizenData }))
      break;
    case 2:
      updateTab(Object.assign(tabs[index-1], { data: proposalData }))
      break;
    }
  }
  useEffect(()=> {
    getCitizensInfoApi()
    getProposalsInfoApi()
  },[])

  if(load || loading) return null
  return(
    <Wrapper>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        { 
          tabs.map(tab => {
            return (<ListMenu><TabWrapper
              key={tab.id}
              to='/datalist'
              className={tab.id === (tabInfo.id)? 'selected':''}
              onClick={()=>{
                updateItems(tab.id)
              }}
            >
              {tab.name}
            </TabWrapper>
            </ListMenu>)
          })
        }
      </div>
      <TableWrapper>
        <DataTable
          className="datatableWrapper"
          title={tabInfo.title.replaceAll('_',' ').replace(/\w+/g, capitalize)}
          columns={tabInfo.columns}
          data={tabInfo.data}
          theme="custom"
          customStyles={customStyles}
          pagination
          noDataComponent={<div>No Data Avaialble</div>}
        />
      </TableWrapper>
    </Wrapper>
  )};

export default Datatable
