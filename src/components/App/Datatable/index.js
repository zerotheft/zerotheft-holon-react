import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import { colors } from 'theme';
import DataTable, { createTheme } from 'react-data-table-component';
import { getCitizensInfo, getProposalsInfo } from 'apis/datas'
import useFetch from 'commons/hooks/useFetch'
import { NavLink } from 'react-router-dom'
import { customStyles } from './styles'
import { tabs } from './constants'

createTheme('custom', {
  text: {
    primary: colors.background.body,
    secondary: colors.textTitle,
  },
  background: {
    default: colors.background.body,
  },
  context: {
    background: colors.datatable.context.background,
    text: colors.text.white,
  }
});

const Datatable = ()=> {

    const [getCitizensInfoApi, loading, citizenData] = useFetch(getCitizensInfo)
    const [getProposalsInfoApi, load, proposalData] = useFetch(getProposalsInfo)
    
    useEffect(()=> {
        getCitizensInfoApi()
        getProposalsInfoApi()
    },[])
    const [tabInfo, updateTab] = useState(Object.assign(tabs[0], {data: citizenData}))

    const updateItems = (index) => {
        switch(index) {
            case 1:
                updateTab(Object.assign(tabs[index-1], {data: citizenData}))
                break;
            case 2:
                updateTab(Object.assign(tabs[index-1], {data: proposalData}))
                break;
        }
    }
    if(load || loading) return null
    return(
    <Wrapper>
        { 
        tabs.map(tab => {
             return (<TabWrapper
                key={tab.id}
                to='/datalist'
                className={tab.id === (tabInfo.id)? 'selected':''}
                onClick={()=>{
                    updateItems(tab.id)
                }}
                >
                {tab.name}
                </TabWrapper>)
                })
    }
    <TableWrapper>
       <DataTable
        className="datatableWrapper"
        title={tabInfo.title}
        columns={tabInfo.columns}
        data={tabInfo.data}
        theme="custom"
        customStyles={customStyles}
        pagination={true}
    />
    </TableWrapper>
    </Wrapper>
)};

const Wrapper = styled.div`
    margin: 0 auto;
    width: 90%;
`,
TableWrapper = styled.div`
  border: 1px solid ${colors.textTitle};
  box-sizing: border-box;
  border-radius: 8px;
  background-color: ${colors.textTitle};
  overflow: hidden;
  .datatableWrapper {
      border-radius: 0;
  }
  & div[role=rowgroup] {
    & > div {
        color: ${colors.datatable.row.textColor};
        &:nth-of-type(2n) {
            background: ${colors.datatable.row.evenRowBackground};
        }
    }
  }
  & div[role=heading]{
      color: ${colors.textTitle};
  }`,
  TabWrapper = styled(NavLink)`
    background: none;
    text-decoration: none;
    color: ${colors.text}
    font-size: 17px;
    line-height: 48px;
    margin: 15px;
    &.selected {
        border-bottom: 2px solid;
        font-weight: 500;
    }
`

export default Datatable
