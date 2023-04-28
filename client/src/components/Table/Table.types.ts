import { AgGridReactProps } from 'ag-grid-react'
import { Property } from 'csstype'

export interface TableProps extends AgGridReactProps {
	height: Property.Height
}
