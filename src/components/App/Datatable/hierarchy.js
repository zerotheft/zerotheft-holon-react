import React, { useEffect } from 'react'
import useFetch from 'commons/hooks/useFetch'
import { getNations } from 'apis/path'
import YAML from 'json2yaml'
import SyntaxHighlighter from 'react-syntax-highlighter'

const HierarchyYaml = () => {
  // eslint-disable-next-line no-unused-vars
  const [getNationsApi, loading, nations] = useFetch(getNations)
  useEffect(() => {
    getNationsApi()
  }, [])
  if (nations) {
    return (
      <div>
        <div>Version {nations.data[0].version} </div>
        <SyntaxHighlighter language="yaml">{YAML.stringify(nations.data[0].hierarchy.USA)}</SyntaxHighlighter>
      </div>
    )
  }
  return null
}

export default HierarchyYaml
