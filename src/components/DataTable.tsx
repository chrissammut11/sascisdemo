import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

type Props = {
    data: any[]
}

const DataTable = ({ data }: Props) => {
    if (data.length > 0) {
        const columns = Object.keys(data[0]) as string[]
        const rows: (string | number)[][] = data.map(row => Object.values(row))
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="data table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) =>
                                <TableCell key={index}>{column}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {row.map((cell, index) => <TableCell key={index}>{cell}</TableCell>)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        )
    } else {
        return <Typography>No data</Typography>
    }
}

export default DataTable