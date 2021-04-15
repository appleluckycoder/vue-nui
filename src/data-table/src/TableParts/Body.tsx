import { h, ref, defineComponent, inject } from 'vue'
import { pxfy } from 'seemly'
import { NCheckbox } from '../../../checkbox'
import { NScrollbar, ScrollbarInst } from '../../../scrollbar'
import { formatLength } from '../../../_utils'
import { dataTableInjectionKey, RowKey, TmNode } from '../interface'
import { createRowClassName } from '../utils'
import Cell from './Cell'
import ExpandTrigger from './ExpandTrigger'

export default defineComponent({
  name: 'DataTableBody',
  setup () {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NDataTable = inject(dataTableInjectionKey)!
    const scrollbarInstRef = ref<ScrollbarInst | null>(null)
    function handleCheckboxUpdateChecked (
      tmNode: TmNode,
      checked: boolean
    ): void {
      NDataTable.doUpdateCheckedRowKeys(
        checked
          ? NDataTable.treeMate.check(
            tmNode.key,
            NDataTable.mergedCheckedRowKeys
          ).checkedKeys
          : NDataTable.treeMate.uncheck(
            tmNode.key,
            NDataTable.mergedCheckedRowKeys
          ).checkedKeys
      )
    }
    function getScrollContainer (): HTMLElement | null {
      const { value } = scrollbarInstRef
      if (value) return value.containerRef
      return null
    }
    function handleScroll (event: Event): void {
      NDataTable.handleTableBodyScroll(event)
    }
    function handleUpdateExpanded (key: RowKey): void {
      const { mergedExpandedRowKeys, doUpdateExpandedRowKeys } = NDataTable
      const index = mergedExpandedRowKeys.indexOf(key)
      const nextExpandedKeys = Array.from(mergedExpandedRowKeys)
      if (~index) {
        nextExpandedKeys.splice(index, 1)
      } else {
        nextExpandedKeys.push(key)
      }
      doUpdateExpandedRowKeys(nextExpandedKeys)
    }
    return {
      NDataTable,
      scrollbarInstRef,
      getScrollContainer,
      handleScroll,
      handleCheckboxUpdateChecked,
      handleUpdateExpanded
    }
  },
  render () {
    const { NDataTable, handleScroll } = this
    const { mergedTheme, scrollX, cPrefix } = NDataTable
    return (
      <NScrollbar
        ref="scrollbarInstRef"
        class={`${cPrefix}-data-table-base-table-body`}
        theme={mergedTheme.peers.Scrollbar}
        themeOverrides={mergedTheme.peerOverrides.Scrollbar}
        contentStyle={{
          minWidth: formatLength(scrollX)
        }}
        horizontalRailStyle={{ zIndex: 3 }}
        verticalRailStyle={{ zIndex: 3 }}
        xScrollable
        onScroll={handleScroll}
      >
        {{
          default: () => {
            let hasExpandedRows = false
            const cordToPass: Record<number, number[]> = {}
            const {
              cols,
              paginatedData,
              mergedTheme,
              fixedColumnLeftMap,
              fixedColumnRightMap,
              currentPage,
              mergedCheckedRowKeys,
              rowClassName,
              leftActiveFixedColKey,
              rightActiveFixedColKey,
              renderExpand,
              mergedExpandedRowKeys
            } = NDataTable
            const { length: colCount } = cols
            const { length: rowCount } = paginatedData
            const { handleCheckboxUpdateChecked, handleUpdateExpanded } = this
            const rows = paginatedData.map((tmNode, rowIndex) => {
              const { rawNode: rowData, key: rowKey } = tmNode
              const expanded =
                renderExpand && mergedExpandedRowKeys.includes(rowKey)
              const row = (
                <tr
                  key={rowKey}
                  class={[
                    `${cPrefix}-data-table-tr`,
                    createRowClassName(rowData, rowIndex, rowClassName)
                  ]}
                >
                  {cols.map((col, colIndex) => {
                    if (rowIndex in cordToPass) {
                      const cordOfRowToPass = cordToPass[rowIndex]
                      const indexInCordOfRowToPass = cordOfRowToPass.indexOf(
                        colIndex
                      )
                      if (~indexInCordOfRowToPass) {
                        cordOfRowToPass.splice(indexInCordOfRowToPass, 1)
                        return null
                      }
                    }
                    const { key: colKey, column } = col
                    const { rowSpan, colSpan } = column
                    const mergedColSpan = colSpan
                      ? colSpan(rowData, rowIndex)
                      : 1
                    const mergedRowSpan = rowSpan
                      ? rowSpan(rowData, rowIndex)
                      : 1
                    const isLastCol = colIndex + mergedColSpan === colCount
                    const isLastRow = rowIndex + mergedRowSpan === rowCount
                    if (mergedColSpan > 1 || mergedRowSpan > 1) {
                      for (
                        let i = rowIndex;
                        i < rowIndex + mergedRowSpan;
                        ++i
                      ) {
                        for (
                          let j = colIndex;
                          j < colIndex + mergedColSpan;
                          ++j
                        ) {
                          if (i === rowIndex && j === colIndex) continue
                          if (!(i in cordToPass)) {
                            cordToPass[i] = [j]
                          } else {
                            cordToPass[i].push(j)
                          }
                        }
                      }
                    }
                    return (
                      <td
                        key={colKey}
                        style={{
                          textAlign: column.align || undefined,
                          left: pxfy(fixedColumnLeftMap[colKey]),
                          right: pxfy(fixedColumnRightMap[colKey])
                        }}
                        colspan={mergedColSpan}
                        rowspan={mergedRowSpan}
                        class={[
                          `${cPrefix}-data-table-td`,
                          column.className,
                          column.fixed &&
                            `${cPrefix}-data-table-td--fixed-${column.fixed}`,
                          column.align &&
                            `${cPrefix}-data-table-td--${column.align}-align`,
                          {
                            [`${cPrefix}-data-table-td--ellipsis`]:
                              column.ellipsis === true ||
                              // don't add ellpisis class if tooltip exists
                              (column.ellipsis && !column.ellipsis.tooltip),
                            [`${cPrefix}-data-table-td--shadow-after`]:
                              leftActiveFixedColKey === colKey,
                            [`${cPrefix}-data-table-td--shadow-before`]:
                              rightActiveFixedColKey === colKey,
                            [`${cPrefix}-data-table-td--selection`]:
                              column.type === 'selection',
                            [`${cPrefix}-data-table-td--expand`]:
                              column.type === 'expand',
                            [`${cPrefix}-data-table-td--last-col`]: isLastCol,
                            [`${cPrefix}-data-table-td--last-row`]:
                              isLastRow && !expanded
                          }
                        ]}
                      >
                        {column.type === 'selection' ? (
                          <NCheckbox
                            key={currentPage}
                            disabled={column.disabled?.(rowData)}
                            checked={mergedCheckedRowKeys.includes(rowKey)}
                            onUpdateChecked={(checked) =>
                              handleCheckboxUpdateChecked(tmNode, checked)
                            }
                          />
                        ) : column.type === 'expand' ? (
                          !column.expandable ||
                          column.expandable?.(rowData, rowIndex) ? (
                              <ExpandTrigger
                                clsPrefix={cPrefix}
                                expanded={expanded}
                                onClick={() => handleUpdateExpanded(rowKey)}
                              />
                            ) : null
                        ) : (
                          <Cell
                            index={rowIndex}
                            row={rowData}
                            column={column}
                            mergedTheme={mergedTheme}
                          />
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
              if (expanded && renderExpand) {
                if (!hasExpandedRows) {
                  hasExpandedRows = true
                }
                return [
                  row,
                  <tr
                    class={`${cPrefix}-data-table-tr`}
                    key={`${rowKey}__expand`}
                  >
                    <td
                      class={[
                        `${cPrefix}-data-table-td`,
                        `${cPrefix}-data-table-td--last-col`,
                        rowIndex + 1 === rowCount &&
                          `${cPrefix}-data-table-td--last-row`
                      ]}
                      colspan={colCount}
                    >
                      {renderExpand(rowData, rowIndex)}
                    </td>
                  </tr>
                ]
              }
              return row
            })

            return (
              <table ref="body" class={`${cPrefix}-data-table-table`}>
                <colgroup>
                  {cols.map((col) => (
                    <col key={col.key} style={col.style}></col>
                  ))}
                </colgroup>
                <tbody ref="tbody" class={`${cPrefix}-data-table-tbody`}>
                  {hasExpandedRows ? rows.flat() : rows}
                </tbody>
              </table>
            )
          }
        }}
      </NScrollbar>
    )
  }
})
