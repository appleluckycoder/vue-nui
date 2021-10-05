import { computed, ref, ComputedRef } from 'vue'
import {
  ColumnKey,
  InternalRowData,
  SortOrder,
  SortState,
  TmNode,
  TableBaseColumn,
  TableExpandColumn,
  TableSelectionColumn,
  CompareFn
} from './interface'
import { getFlagOfOrder } from './utils'
import { call } from '../../_utils'
import type { DataTableSetupProps } from './DataTable'

function getMultiplePriority ({
  sorter
}: {
  sorter: TableBaseColumn['sorter']
}): number | false {
  if (typeof sorter === 'object' && typeof sorter.multiple === 'number') {
    return sorter.multiple
  }
  return false
}

function getSortFunction (
  sorter: TableBaseColumn['sorter'],
  columnKey: ColumnKey
): CompareFn | false {
  if (
    columnKey &&
    (sorter === undefined ||
      sorter === 'default' ||
      (typeof sorter === 'object' && sorter.compare === 'default'))
  ) {
    return getDefaultSorterFn(columnKey)
  }
  if (typeof sorter === 'function') {
    return sorter
  }
  if (
    sorter &&
    typeof sorter === 'object' &&
    sorter.compare &&
    sorter.compare !== 'default'
  ) {
    return sorter.compare
  }
  return false
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getDefaultSorterFn (columnKey: ColumnKey) {
  return (row1: InternalRowData, row2: InternalRowData) => {
    const value1 = row1[columnKey]
    const value2 = row2[columnKey]

    if (typeof value1 === 'number' && typeof value2 === 'number') {
      return value1 - value2
    } else if (typeof value1 === 'string' && typeof value2 === 'string') {
      return value1.localeCompare(value2)
    }
    return 0
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useSorter (
  props: DataTableSetupProps,
  {
    dataRelatedColsRef,
    filteredDataRef
  }: {
    dataRelatedColsRef: ComputedRef<
    Array<TableSelectionColumn | TableBaseColumn | TableExpandColumn>
    >
    filteredDataRef: ComputedRef<TmNode[]>
  }
) {
  const uncontrolledSortStateRef = ref<SortState[]>([])
  const mergedSortStateRef = computed(() => {
    // If one of the columns's sort order is false or 'ascend' or 'descend',
    // the table's controll functionality should work in controlled manner.
    const columnsWithControlledSortOrder = dataRelatedColsRef.value.filter(
      (column) =>
        column.type !== 'selection' &&
        column.sorter !== undefined &&
        (column.sortOrder === 'ascend' ||
          column.sortOrder === 'descend' ||
          column.sortOrder === false)
    )
    // if multiple columns are controlled sortable, then we need to find columns with active sortOrder
    const columnToSort: TableBaseColumn[] | undefined = (
      columnsWithControlledSortOrder as TableBaseColumn[]
    ).filter((col: TableBaseColumn) => col.sortOrder !== false)
    if (columnToSort.length) {
      return columnToSort.map((column) => {
        return {
          columnKey: column.key,
          // column to sort has controlled sorter
          // sorter && sort order won't be undefined
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          order: column.sortOrder!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          sorter: column.sorter!
        }
      })
    }
    if (columnsWithControlledSortOrder.length) return []
    return uncontrolledSortStateRef.value
  })
  const sortedDataRef = computed<TmNode[]>(() => {
    const activeSorters = mergedSortStateRef.value.slice().sort((a, b) => {
      const item1Priority = getMultiplePriority(a) || 0
      const item2Priority = getMultiplePriority(b) || 0
      return item2Priority - item1Priority
    })
    if (activeSorters.length) {
      const filteredData = filteredDataRef.value.slice()
      return filteredData.sort((tmNode1, tmNode2) => {
        let compareResult = 0
        activeSorters.some((sorterState) => {
          const { columnKey, sorter, order } = sorterState

          const compareFn = getSortFunction(sorter, columnKey)
          if (compareFn && order) {
            compareResult = compareFn(tmNode1.rawNode, tmNode2.rawNode)

            if (compareResult !== 0) {
              compareResult = compareResult * getFlagOfOrder(order)
              return true
            }
          }
          return false
        })
        return compareResult
      })
    }
    return filteredDataRef.value
  })

  dataRelatedColsRef.value.forEach((column) => {
    if (column.sorter !== undefined) {
      addSortSate({
        columnKey: column.key,
        sorter: column.sorter,
        order: column.defaultSortOrder ?? false
      })
    }
  })

  function getUpdatedSorterState (
    sortState: SortState | null
  ): SortState | null | SortState[] {
    let currentSortState = mergedSortStateRef.value.slice()
    // Multiple sorter
    if (
      sortState &&
      getMultiplePriority({ sorter: sortState.sorter }) !== false
    ) {
      // clear column is not multiple sort
      currentSortState = currentSortState.filter(
        (sortState) =>
          getMultiplePriority({ sorter: sortState.sorter }) !== false
      )
      updateSortInSortStates(currentSortState, sortState)
      return currentSortState
    } else if (sortState) {
      // single sorter
      return sortState
    }
    // no sorter
    return null
  }

  function doUpdateSorter (sortState: SortState | null): void {
    const {
      'onUpdate:sorter': _onUpdateSorter,
      onUpdateSorter,
      onSorterChange
    } = props

    const updateSorterState: SortState | SortState[] | null =
      getUpdatedSorterState(sortState)

    if (_onUpdateSorter) call(_onUpdateSorter, updateSorterState)
    if (onUpdateSorter) call(onUpdateSorter, updateSorterState)
    if (onSorterChange) call(onSorterChange, updateSorterState)
    if (Array.isArray(updateSorterState)) {
      uncontrolledSortStateRef.value = updateSorterState
    } else if (updateSorterState) {
      uncontrolledSortStateRef.value = [updateSorterState]
    } else {
      uncontrolledSortStateRef.value = []
    }
  }

  function sort (columnKey: ColumnKey, order: SortOrder = 'ascend'): void {
    if (!columnKey) {
      clearSorter()
    } else {
      const columnToSort = dataRelatedColsRef.value.find(
        (column) =>
          column.type !== 'selection' &&
          column.type !== 'expand' &&
          column.key === columnKey
      )
      if (!columnToSort || !columnToSort.sorter) return
      const sorter = columnToSort.sorter
      doUpdateSorter({
        columnKey,
        sorter,
        order: order
      })
    }
  }

  function clearSorter (): void {
    doUpdateSorter(null)
  }

  function updateSortInSortStates (
    sortStates: SortState[],
    sortState: SortState
  ): void {
    const index = sortStates.findIndex(
      (state) => sortState?.columnKey && state.columnKey === sortState.columnKey
    )
    if (index !== undefined && index >= 0) {
      sortStates[index] = sortState
    } else {
      sortStates.push(sortState)
    }
  }

  function addSortSate (sortState: SortState): void {
    updateSortInSortStates(uncontrolledSortStateRef.value, sortState)
  }

  return {
    clearSorter,
    sort,
    sortedDataRef,
    mergedSortStateRef,
    uncontrolledSortStateRef,
    doUpdateSorter
  }
}
