import { h, defineComponent, inject, PropType } from 'vue'
import { happensIn, pxfy } from 'seemly'
import { formatLength } from '../../../_utils'
import { NCheckbox } from '../../../checkbox'
import SortButton from '../HeaderButton/SortButton'
import FilterButton from '../HeaderButton/FilterButton'
import {
  isColumnSortable,
  isColumnFilterable,
  createNextSorter,
  getColKey
} from '../utils'
import {
  DataTableInjection,
  SelectionColInfo,
  TableColumnInfo
} from '../interface'

export default defineComponent({
  name: 'DataTableHeader',
  props: {
    onScroll: Function as PropType<(e: Event) => void>
  },
  setup () {
    const NDataTable = inject<DataTableInjection>(
      'NDataTable'
    ) as DataTableInjection
    function handleCheckboxUpdateChecked (column: SelectionColInfo): void {
      if (NDataTable.someRowsChecked || NDataTable.allRowsChecked) {
        NDataTable.doUncheckAll(column)
      } else {
        NDataTable.doCheckAll(column)
      }
    }
    function handleColHeaderClick (
      e: MouseEvent,
      column: TableColumnInfo
    ): void {
      if (happensIn(e, 'dataTableFilter')) return
      if (!isColumnSortable(column)) return
      const activeSorter = NDataTable.mergedSortState
      const nextSorter = createNextSorter(column, activeSorter)
      NDataTable.doUpdateSorter(nextSorter)
    }
    return {
      NDataTable,
      headerStyle: {
        overflow: 'scroll'
      },
      handleCheckboxUpdateChecked,
      handleColHeaderClick
    }
  },
  render () {
    const {
      NDataTable: {
        scrollX,
        fixedColumnLeftMap,
        fixedColumnRightMap,
        currentPage,
        allRowsChecked,
        someRowsChecked,
        leftActiveFixedColKey,
        rightActiveFixedColKey,
        rows,
        cols
      },
      headerStyle,
      handleColHeaderClick,
      handleCheckboxUpdateChecked
    } = this
    return (
      <div
        style={headerStyle}
        class="n-data-table-base-table-header"
        onScroll={this.onScroll}
      >
        <table
          ref="body"
          class="n-data-table-table"
          style={{ width: formatLength(scrollX) }}
        >
          <colgroup>
            {cols.map((col) => (
              <col key={col.key} style={col.style} />
            ))}
          </colgroup>
          <thead class="n-data-table-thead">
            {rows.map((row) => {
              return (
                <tr class="n-data-table-tr">
                  {row.map(({ column, colSpan, rowSpan, isLast }) => {
                    const key = getColKey(column)
                    return (
                      <th
                        key={key}
                        style={{
                          textAlign: column.align,
                          left: pxfy(fixedColumnLeftMap[key]),
                          right: pxfy(fixedColumnRightMap[key])
                        }}
                        colspan={colSpan}
                        rowspan={rowSpan}
                        class={[
                          'n-data-table-th',
                          column.fixed &&
                            `n-data-table-th--fixed-${column.fixed}`,
                          {
                            'n-data-table-th--filterable': isColumnFilterable(
                              column
                            ),
                            'n-data-table-th--sortable': isColumnSortable(
                              column
                            ),
                            'n-data-table-th--shadow-after':
                              leftActiveFixedColKey === key,
                            'n-data-table-th--shadow-before':
                              rightActiveFixedColKey === key,
                            'n-data-table-th--selection':
                              column.type === 'selection',
                            'n-data-table-th--last': isLast
                          },
                          column.className
                        ]}
                        onClick={(e) => {
                          column.type !== 'selection' &&
                            handleColHeaderClick(e, column)
                        }}
                      >
                        {column.type === 'selection' ? (
                          <NCheckbox
                            key={currentPage}
                            tableHeader
                            checked={allRowsChecked}
                            indeterminate={someRowsChecked}
                            onUpdateChecked={() =>
                              handleCheckboxUpdateChecked(column)
                            }
                          />
                        ) : column.ellipsis ? (
                          <div class="n-data-table-th__ellipsis">
                            {typeof column.title === 'function'
                              ? column.title(column)
                              : column.title}
                          </div>
                        ) : typeof column.title === 'function' ? (
                          column.title(column)
                        ) : (
                          column.title
                        )}
                        {isColumnSortable(column) ? (
                          <SortButton column={column as TableColumnInfo} />
                        ) : null}
                        {isColumnFilterable(column) ? (
                          <FilterButton
                            column={column as TableColumnInfo}
                            options={column.filterOptions}
                          />
                        ) : null}
                      </th>
                    )
                  })}
                </tr>
              )
            })}
          </thead>
        </table>
      </div>
    )
  }
})
