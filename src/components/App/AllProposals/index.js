import React, { useEffect, useMemo } from "react"
import styled from "styled-components"
import DataTable from "react-data-table-component"
import Button from "commons/Buttons"
import useFetch from "commons/hooks/useFetch"
import { Wrapper, Container } from "commons/styles"
import { convertUNIXtoDATETIME } from "utils"
import { getExportedProposals } from "apis/proposals"

const AllProposals = () => {
  // eslint-disable-next-line no-unused-vars
  const [getExportedProposalsApi, loading, allProposals] = useFetch(getExportedProposals)
  const [filterText, setFilterText] = React.useState("")
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false)
  const filteredProposals =
    allProposals &&
    allProposals.filter((item) => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()))

  const columns = useMemo(
    () => [
      {
        name: "ID",
        selector: "id",
        sortable: true,
      },
      {
        name: "Theft Amount",
        selector: "name",
        sortable: true,
      },
      {
        name: "Country",
        selector: "country",
        sortable: true,
      },
      {
        name: "Path",
        selector: "path",
        sortable: true,
      },

      {
        name: "Year",
        selector: "year",
        sortable: true,
      },
      {
        name: "Date",
        selector: "date",
        sortable: true,
        cell: (props) => convertUNIXtoDATETIME(props.date),
      },
    ],
    []
  )
  useEffect(() => {
    getExportedProposalsApi()
  }, [])

  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      <TextField
        id="search"
        type="text"
        placeholder="Filter By Theft Amount"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <ClearButton type="button" onClick={onClear}>
        X
      </ClearButton>
    </>
  )

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText("")
      }
    }

    return (
      <FilterComponent onFilter={(e) => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    )
  }, [filterText, resetPaginationToggle])
  return (
    <Wrapper>
      <Container>
        <DataTable
          title="Proposal List"
          pagination
          columns={columns}
          data={filteredProposals}
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
        />
      </Container>
    </Wrapper>
  )
}

export default AllProposals

const TextField = styled.input`
    height: 32px;
    width: 200px;
    border-radius: 3px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #e5e5e5;
    padding: 0 32px 0 16px;

    &:hover {
      cursor: pointer;
    }
  `,
  ClearButton = styled(Button)`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
          columns={columns}
    height: 34px;
    width: 32px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`
