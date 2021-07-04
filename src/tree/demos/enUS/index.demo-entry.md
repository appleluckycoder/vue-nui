# Tree

To be honest, I'm not good at biology. I can figure out few kinds of trees.

What's more, not only biology, I forget balanced tree everytime after I revise it shortly.

## Demos

```demo
basic
cascade
multiple
filter
drag-drop
virtual
async
disabled
prefix-and-suffix
```

## API

### Tree Props

| Name | Type | default | Description |
| --- | --- | --- | --- |
| allow-drop | `(info: { dropPosition: DropPosition, node: TreeOption, phase: 'drag' \| 'drop' }) => boolean` | A function that prohibit dropping inside leaf node. | Whether to allow dropping. |
| block-line | `boolean` | `false` |  |
| block-node | `boolean` | `false` |  |
| cancelable | `boolean` | `true` | Whether node's select status can be cancelled. |
| cascade | `boolean` | `false` | Whether to cascade checkboxes. |
| checkable | `boolean` | `false` |  |
| checked-keys | `Array<string \| number>` | `undefined` | If set, checked status will work in controlled manner. |
| data | `Array<TreeOption>` | `[]` | The node data of the tree. Reset `data` will cause clearing of some uncontrolled status. If you need to modify data, you'd better make tree work in a controlled manner. |
| default-checked-keys | `Array<string \| number>` | `[]` |  |
| default-expand-all | `boolean` | `false` |  |
| default-expanded-keys | `Array<string \| number>` | `[]` |  |
| default-selected-keys | `Array<string \| number>` | `[]` |  |
| draggable | `boolean` | `false` |  |
| expand-on-dragenter | `boolean` | `true` | Whether to expand nodes after dragenter. |
| expanded-keys | `Array<string \| number>` | `undefined` | If set, expanded status will work in controlled manner. |
| filter | `(node: TreeOption) => boolean` | A simple string based filter |  |
| multiple | `boolean` | `false` |  |
| on-load | `(node: TreeOption) => Promise<void>` | `undefined` |  |
| pattern | `string` | `''` |  |
| remote | `boolean` | `false` | Whether to load nodes async. It should work with `on-load` |
| selectable | `boolean` | `true` |  |
| selected-keys | `Array<string \| number>` | `undefined` | If set, selected status will work in controlled manner. |
| virtual-scroll | `boolean` | `false` | Whether to enable virtual scroll. You need to set proper style height of the tree in advance. |
| on-dragend | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` |  |
| on-dragenter | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` |  |
| on-dragleave | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` |  |
| on-dragstart | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` |  |
| on-drop | `(data: { node: TreeOption, dragNode: TreeOption, dropPosition: 'before' \| 'inside' \| 'after', event: DragEvent }) => void` | `undefined` |  |
| on-update:checked-keys | `(keys: Array<string \| number>) => void` | `undefined` |  |
| on-update:expanded-keys | `(keys: Array<string \| number>) => void` | `undefined` |  |
| on-update:selected-keys | `(keys: Array<string \| number>) => void` | `undefined` |  |

### TreeOption Properties

| Name | Type | Description |
| --- | --- | --- |
| key | `string \| number` | Key of the node, should be unique. |
| label | `string` | Label of the node. |
| checkboxDisabled? | `boolean` | Whether the checkbox is disabled. |
| children? | `TreeOption[]` | Child nodes of the node. |
| disabled? | `boolean` | Whether the node is disabled. |
| isLeaf? | `boolean` | Whether the node is leaf. Required in remote mode. |
| prefix? | `string \| (() => VNodeChild)` | Prefix of the node. |
| suffix? | `string \| (() => VNodeChild)` | Suffix of the node. |
