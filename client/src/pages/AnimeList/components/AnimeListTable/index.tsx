import { FC, MouseEventHandler, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'
import {
	GridReadyEvent,
	ColDef,
	GridApi,
	CellClickedEvent,
	PaginationChangedEvent
} from 'ag-grid-community'

import { Averlist } from '@averlistApi/types'
import { StatusCellRenderer } from '@pages/AnimeList/components/AnimeListTable/components/StatusCellRenderer'
import { NameCellRenderer } from '@pages/AnimeList/components/AnimeListTable/components/NameCellRenderer'
import { ActionCellRenderer } from '@pages/AnimeList/components/AnimeListTable/components/ActionCellRenderer'
import animeListStore from '@stores/animeList.store'
import { NameTooltip } from '@pages/AnimeList/components/AnimeListTable/components/NameTooltip'
import { averlist } from '@averlistApi/averlist'
import { EditStatusModal } from '@pages/AnimeList/components/AnimeListTable/components/EditStatusModal'
import { successToast } from '@helpers/toasts'

const Table = dynamic(() => import('@components/Table'), { ssr: false })

interface AnimeListTableProps {
	pageSize: number
	filteredAnimeList: Averlist.Anime[]
}

export const AnimeListTable: FC<AnimeListTableProps> = observer(
	({ pageSize, filteredAnimeList }) => {
		const [gridApi, setGridApi] = useState<GridApi<Averlist.Anime> | null>(null)

		const [editStatusModalOpened, setEditStatusModalOpened] =
			useState<boolean>(false)
		const closeEditStatusModal = () => setEditStatusModalOpened(false)
		const openEditStatusModal: MouseEventHandler<HTMLDivElement> = event => {
			event.stopPropagation()
			setEditStatusModalOpened(true)
		}

		const changeStatus = async (
			animeId: string,
			status: Averlist.AnimeStatus
		) => {
			await averlist.anime.editStatus(animeId, status)
			animeListStore.editStatus(animeId, status)
			gridApi?.setRowData(animeListStore.animeList)
		}
		const removeAnime = async (animeId: string, animeName: string) => {
			await averlist.anime.remove(animeId)
			animeListStore.removeFromAnimeList(animeId)
			gridApi?.setRowData(animeListStore.animeList)
			successToast(`Аниме "${animeName}" успешно удалено`)
		}

		const defaultColDefs: ColDef<Averlist.Anime> = {
			tooltipComponent: NameTooltip,
			sortable: true
		}

		const colDefs: ColDef<Averlist.Anime>[] = [
			{
				field: 'name',
				headerName: 'Название',
				cellRenderer: NameCellRenderer,
				tooltipField: 'name',
				maxWidth: 350,
				minWidth: 150
			},
			{
				field: 'status',
				headerName: 'Статус',
				cellRenderer: StatusCellRenderer,
				cellRendererParams: {
					openEditStatusModal
				},
				minWidth: 150
			},
			{
				field: '',
				headerName: '',
				cellRenderer: ActionCellRenderer,
				cellRendererParams: { removeAnime },
				minWidth: 150
			}
		]

		const onGridReady = (event: GridReadyEvent<Averlist.Anime>) => {
			setGridApi(event.api)
		}

		const [currentAnime, setCurrentAnime] = useState<Averlist.Anime>(
			{} as Averlist.Anime
		)
		const onCellClicked = (props: CellClickedEvent<Averlist.Anime>) => {
			if (!props.data) return
			setCurrentAnime(props.data)
		}

		return (
			<>
				<Table
					height='calc(100vh - 159px)'
					defaultColDef={defaultColDefs}
					columnDefs={colDefs}
					rowData={filteredAnimeList}
					onGridReady={onGridReady}
					onCellClicked={onCellClicked}
					headerHeight={35}
					rowSelection='multiple'
					tooltipShowDelay={0}
					tooltipHideDelay={3000}
					paginationPageSize={pageSize}
					suppressRowTransform
					animateRows
					pagination
				/>
				<EditStatusModal
					closeEditStatusModal={closeEditStatusModal}
					editStatusModalOpened={editStatusModalOpened}
					changeStatus={changeStatus}
					currentAnime={currentAnime}
				/>
			</>
		)
	}
)
