import React, { useEffect, useState } from 'react'

import { colors } from 'theme';
import DataTable, { createTheme } from 'react-data-table-component';
import { getVotesInfo } from 'apis/datas'
import useFetch from 'commons/hooks/useFetch'
import { Wrapper, TableWrapper, ListMenu, TabWrapper, customStyles } from '../commons/styles'
import { tab } from './constants'
import { startCase, capitalize } from 'lodash'

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

const VoteDatatable = ({history})=> {
    let votePath =  history.location.pathname && history.location.pathname.replace('/votelist','')
    const [getVotesInfoApi, loader, voteData] = useFetch(getVotesInfo)
    
    const hierarchy = {
        industries: {
            finance: {
                high_freq_front_running: true,
                one_eight_exchange: true,
                share_buy_back: true
                },
            healthcare: true,
            pharma: {
                medicare: true
            }
        },
        economic_crisis: {
            ltcm: true,
            '2008_mortgage': true,
            saving_and_loan_bails_out: true
        },
        tax: {
            capital_gain_low: true,
            corp_gain_low: true,
            corporate_tax_evasopn: true,
            tax_evasion_by_offshore: true,
            other_way: true
        }
    }
    
    const [tabInfo, updateTab] = useState(Object.assign(tab, {data: voteData, title: `Vote List for ${votePath.split('/').join(' > ')}`}))
     const updateItems = (index) => {
        updateTab(Object.assign(tab, {data: voteData, title: `Vote List for ${votePath.split('/').join(' > ')}`}))
    }
    useEffect(()=> {
        let path =  history.location.pathname && history.location.pathname.replace('/votelist','')

        getVotesInfoApi(path)
        
        if(path.includes('votelist'))
            updateItems()
            
    },[history.location])
    console.log(tab)
    if(loader) return null
    return(
    <Wrapper>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        { 
            <ListMenu><TabWrapper
                key={tab.id}
                to='/votelist/industries'
                className='selected'
                onClick={()=>{
                    updateItems()
                }}
                >
                {tab.name}
                </TabWrapper>
                <ul>
                    { Object.keys(hierarchy).map((key) => {
                        const inner = hierarchy[key]
                        return (<li>
                                <span style={{cursor: 'pointer'}} onClick = { () => { 
                                    history.push(`/votelist/${key}`)
                                    updateItems(tab.id)
                                } }>{startCase(key)}</span>
                                    <ul>
                                        { 
                                            Object.keys(hierarchy[key]).map((innerKey) => {
                                                return (<li>
                                                        <span style={{cursor: 'pointer'}} onClick = { () => { 
                                                            history.push(`/votelist/${key}/${innerKey}`)
                                                            updateItems(tab.id)
                                                        } }>{startCase(innerKey)}</span>
                                                            <ul>
                                                            {   
                                                                Object.keys(hierarchy[key][innerKey]).map((lastKey) => {
                                                                    return (<li>
                                                                            <span style={{cursor: 'pointer'}} onClick = { () => { 
                                                                                history.push(`/votelist/${key}/$ }{innerKey}/${lastKey}`)
                                                                                updateItems(tab.id)    
                                                                            } }>{startCase(lastKey)}</span></li>)
                                                                })
                                                            }
                                                            </ul>
                                                        </li>)
                                                })
                                        }
                                    </ul>
                                </li>)
                        })
                        }
                </ul>    
                
            </ListMenu>
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
        pagination={true}
        noDataComponent={<div>No Data Avaialble</div>}
    />
    </TableWrapper>
    </Wrapper>
)};

export default VoteDatatable
