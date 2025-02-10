import { useEffect, useState } from "react"
import { ComputeSession } from "sas-viya-api-wrappers-js"
import DataTable from "./components/DataTable"
import SelectBox, { SelectItem } from "./components/SelectBox"
import TopBar from "./components/TopBar"

const App = () => {
  const [session, setSession] = useState<ComputeSession>()
  const [library, setLibrary] = useState<string>("")
  const [table, setTable] = useState<string>("")
  const [column, setColumn] = useState<string>("")
  const [filter, setFilter] = useState<string>("")
  const [libraries, setLibraries] = useState<SelectItem[]>([])
  const [tables, setTables] = useState<SelectItem[]>([])
  const [columns, setColumns] = useState<SelectItem[]>([])
  const [values, setValues] = useState<SelectItem[]>([])
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    const createComputeSession = async () => {
      const session = await ComputeSession.init({
        baseURL: 'https://server.demo.sas.com/',
        contextName: 'SAS Job Execution compute context',
      })
      setSession(session)
    }
    createComputeSession()
  }, [])
  useEffect(() => {
    const getLibraries = async () => {
      const libraries = await session?.getLibraries({}) as string[]
      const data = libraries?.map(item => { return { value: item, label: item } as SelectItem })
      if (data) {
        setLibraries(data)
      }
    }
    setLibraries([])
    setTables([])
    setColumns([])
    setValues([])
    setLibrary("")
    setTable("")
    setColumn("")
    setFilter("")
    getLibraries()
  }, [session])
  useEffect(() => {
    const getTables = async () => {
      const tables = await session?.getTables({ libraryName: library }) as string[]
      const data = tables?.map(item => { return { value: item, label: item } as SelectItem })
      if (data) {
        setTables(data)
      }
    }
    setTables([])
    setColumns([])
    setValues([])
    setTable("")
    setColumn("")
    setFilter("")
    if (library !== "") {
      getTables()
    }
  }, [library])
  useEffect(() => {
    const getColumns = async () => {
      const columns = await session?.getColumns({ libraryName: library, tableName: table }) as string[]
      const data = columns?.map(item => { return { value: item, label: item } as SelectItem })
      if (data) {
        setColumns(data)
      }
    }
    setColumns([])
    setValues([])
    setColumn("")
    setFilter("")
    if (library !== "" && table !== "") {
      getColumns()
    }
  }, [table])
  useEffect(() => {
    const getValues = async () => {
      const values = await session?.getValues({ libraryName: library, tableName: table, columnName: column }) as string[]
      const data = values?.map(item => { return { value: item, label: item } as SelectItem })
      if (data) {
        setValues(data)
      }
    }
    setValues([])
    setFilter("")
    if (library !== "" && table !== "" && column !== "") {
      getValues()
    }
  }, [column])

  useEffect(() => {
    type Column = {
      type: string
      name: string
    }
    const getResults = async () => {
      const columns = await session?.getColumns({ libraryName: library, tableName: table, outputType: 'api' }) as Column[]
      const varInfo = columns?.find(element => element?.name === column)
      let exportStatement = `export ${library}.${table} (where=(${column} = "${filter}"));`
      if (varInfo?.type !== "CHAR") {
        exportStatement = `export ${library}.${table} (where=(${column} = ${filter}));`
      }
      const code = [
        `filename results "results.json";`,
        `proc json out=results nosastags pretty ; `,
        exportStatement,
        `run;`
      ]
      const data: any[] = await session?.executeCode({ code: code, resultName: "results" })
      setData(data)
    }
    setData([])
    if (library !== "" && table !== "" && column !== "" && filter !== "") {
      getResults()
    }
  }, [filter])
  return (
    <>
      <TopBar />

      <SelectBox label={"Library"} data={libraries} disabled={libraries.length === 0} handler={{
        value: library, setValue: setLibrary
      }} />

      <SelectBox label={"Table"} data={tables} disabled={library === ""} handler={{
        value: table, setValue: setTable
      }} />

      <SelectBox label={"Column"} data={columns} disabled={table === ""} handler={{
        value: column, setValue: setColumn
      }} />

      <SelectBox label={"Value"} data={values} disabled={column === ""} handler={{
        value: filter, setValue: setFilter
      }} />

      <DataTable data={data} />
    </>
  )
}

export default App
