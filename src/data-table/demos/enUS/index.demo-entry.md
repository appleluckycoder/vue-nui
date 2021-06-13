# Data Table

<!--single-column-->

DataTable is used to displays rows of structured data.

## Demos

<n-alert type="warning" title="Caveat" style="margin-bottom: 16px;">
  Every row data needs a unique key property, otherwise you should specify <n-text code>row-key</n-text>
</n-alert>

```demo
basic
empty
border
size
row-props
merge-cell
filter-and-sorter
select
custom-select
group-header
controlled-page
controlled-filter
controlled-sorter
fixed-header
fixed-header-column
summary
ellipsis
ellipsis-tooltip
expand
render-header
custom-style
ajax-usage
virtual
custom-filter-menu
tree
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` |  |
| bottom-bordered | `boolean` | `true` |  |
| checked-row-keys | `Array<string \| number>` | `undefined` | The keys of checked rows. |
| cascade | `boolean` | `true` | Whether to do cascade checking when using tree data. |
| children-key | `string` | `'children'` | The key of children data in tree data's data entity. |
| columns | `Array<Column>` | `[]` | Columns to display. |
| data | `Array<object>` | `[]` | Data to display. |
| default-checked-row-keys | `Array<string \| number>` | `[]` |  |
| indent | `number` | `16` | Indent of row content when using tree data. |
| loading | `boolean` | `false` |  |
| max-height | `number \| string` | `undefined` | The max-height of the table content. Can be a CSS value. |
| min-height | `number \| string` | `undefined` | The min-height of the table content. Can be a CSS value. |
| pagination | `false \| object` | `false` | See [Pagination props](pagination#Props) |
| paging | `boolean` | `true` | If data-table do automatic paging. You may set it to `false` in async usage. |
| row-class-name | `string \| (rowData: object, rowIndex : number) => string \| object` | `undefined` |  |
| row-key | `(rowData: object) => (number \| string)` | `undefined` | Generate the key of the row by row data (if you don't want to set the key) |
| row-props | `(rowData: object, rowIndex : number) => object` | `undefined` |  |
| scroll-x | `number \| string` | `undefined` | If columns are horizontal fixed, scroll-x need to be set |
| single-column | `boolean` | `false` |  |
| single-line | `boolean` | `true` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| summary | `CreateSummary` | `undefined` | Data of table summary row. For types, see <n-a href="#CreateSummary-Type">CreateSummary Type</n-a>. |
| table-layout | `'auto' \| 'fixed'` | `'auto'` | Style `table-layout` of the table. When `ellpisis` or `max-height` are set, it will always be `'fixed'` regardless of what you set. |
| virtual-scroll | `boolean` | `false` | Whether to use virtual scroll to deal with large data. Make sure `max-height` is set before using it. |
| on-update:checked-row-keys | `(keys: Array<string \| number>) => void` | `undefined` |  |
| on-update:filters | `(filters: { [string \| number]: Array<string \| number> \| string \| number }, initiatorColumn: Column)` |  |
| on-update:page | `(page: number)` | `undefined` |  |
| on-update:page-size | `(pageSize: number) => void` | `undefined` |  |
| on-update:sorter | `(options: { columnKey: string \| number, sorter: 'default' \| function \| boolean, order: 'ascend' \| 'descend' \| false } \| null) => void` | `undefined` | If there won't be a active sorter after change, `options` will be `null` |

## Methods

These methods can help you control table in an uncontrolled manner. However, it's not recommended to use them to implement some async operations. If async operations is needed, use table in a **controlled** manner.

| Name | Type | Description |
| --- | --- | --- |
| clearFilters | `() => void` |  |
| clearSorter | `() => void` |  |
| filters | `(filters: { [string \| number]: Array<string \| number> \| string \| number }) => void` | Set the active filters of the table. |
| page | `(page: number) => void` |  |
| sort | `(columnKey: string \| number \| null, order: 'ascend' \| 'descend' \| false) => void` | If columnKey set to `null`, it is the same as clearSorter. |

## Slots

### Slots

| Name  | Type | Description                                    |
| ----- | ---- | ---------------------------------------------- |
| empty | `()` | Custom description when data of table is empty. |

## API

### Column Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| align | `'left' \| 'right' \| 'center'` | `'left'` | Text align in column |
| children | `Column[]` | `undefined` | Child nodes of a grouped column |
| className | `string` | `undefined` |  |
| colSpan | `(rowData: object, rowIndex: number) => number` | `undefined` |  |
| defaultFilterOptionValue | `string \| number \| null` | `null` | The default active filter option value in uncontrolled manner. (works when not using multiple filters) |
| defaultFilterOptionValues | `Array<string \| number>` | `[]` | The default active filter option values in uncontrolled manner. (works when there are multiple filters) |
| defaultSortOrder | `'descend' \| 'ascend' \| false` | `false` | The default sort order of the table in uncontrolled manner |
| disabled | `(rowData: object, rowIndex: number) => boolean` | `() => false` |  |
| ellipsis | `boolean \| EllipsisProps` | `false` |  |
| expandable | `(rowData: object, rowIndex: number) => boolean` | `undefined` | Whethe the row is expandable. Only works when `type` is `'expand'`. |
| filter | `boolean \| (optionValue: string \| number, rowData: object) => boolean \| 'default'` | `false` | The filter of the column. If set to `true`, it will only display filter button on the column, which can be used in async status. |
| filterMode | `'and' \| 'or'` | `'or'` |  |
| filterMultiple | `boolean` | `true` |  |
| filterOptionValue | `string \| number \| null` | `undefined` | The active filter option value in controlled manner. If not set, the filter of the column works in an uncontrolled manner. (works when not using multiple filters) |
| filterOptionValues | `Array<string \| number> \| null` | `undefined` | The active filter option values in controlled manner. If not set, the filter of the column works in an uncontrolled manner. (works when there are multiple filters) |
| filterOptions | `Array<{ label: string, value: string \| number}>` | `undefined` |  |
| fixed | `'left \| 'right' \| false` | `false` |  |
| key | `string \| number` | `undefined` | Unique key of this column, **required** when table's row-key is not set. |
| options | `Array<'all' \| 'none' \| { label: string, key: string \| number, onSelect: (pageData: RowData) => void }>` | `undefined` | Options of custom selection. Only work with `type='selection'` |
| render | `(rowData: object, rowIndex: number) => VNodeChild` | `undefined` | Render function of column row cell. |
| renderExpand | `(rowData: object, rowIndex: number) => VNodeChild` | `undefined` | Render function of the expand area. Only works when `type` is `'expand'`. |
| renderFilterMenu | `() => VNodeChild` | `undefined` | Render function of column filter menu. |
| renderFilterIcon | `(options: { active: boolean, show: boolean }) => VNodeChild` | `undefined` | Render function of column filter icon. |
| renderFilter | `(options: { active: boolean, show: boolean }) => VNodeChild` | `undefined` | Render function of column filter trigger. |
| rowSpan | `(rowData: object, rowIndex: number) => number` | `undefined` |  |
| sortOrder | `'descend' \| 'ascend' \| false` | `undefined` | The controlled sort order of the column. If multiple columns' sortOrder is set, the first one will affect. |
| sorter | `boolean \| function \| 'default'` | `false` | The sorter of the column. If set `'default'`, it will use a basic builtin compare function. If set to `true`, it will only display sort icon on the column, which can be used in async status. Otherwise it works like `Array.sort`'s compare function. |
| title | `string \| (() => VNodeChild)` | `undefined` | Can be a render function. |
| titleRowSpan | `number` | `undefined` |  |
| type | `'selection' \| 'expand'` | `undefined` |  |
| width | `number \| string` | `undefined` | Width of the column, **required** when fixed. |

### CreateSummary Type

```__ts
type CreateSummary = (
  pageData: RowData[]
) =>
  | Array<{
      [columnKey: string]: {
        value: string | number
        colSpan?: number
        rowSpan?: number
      }
    }>
  | {
      [columnKey: string]: {
        value: string | number
        colSpan?: number
        rowSpan?: number
      }
    }
```
