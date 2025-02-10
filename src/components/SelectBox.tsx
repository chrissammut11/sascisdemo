import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Dispatch, SetStateAction } from 'react'

type Props = {
    label: string
    data: SelectItem[]
    disabled?: boolean
    handler: Handler
}

export type SelectItem = {
    value: string | number
    label: string
}

type Handler = {
    value: string
    setValue: Dispatch<SetStateAction<string>>
}


const SelectBox = ({ label, data, disabled = true, handler }: Props) => {

    return (
        <FormControl sx={{ m: 1, minWidth: 200, }} disabled={disabled} >
            <InputLabel id="label">{label}</InputLabel>
            <Select
                labelId="label"
                id="select"
                value={handler.value}
                label={label}
                onChange={(event: SelectChangeEvent) => handler.setValue(event?.target.value)}
            >
                {data.map((item, index) =>
                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

export default SelectBox