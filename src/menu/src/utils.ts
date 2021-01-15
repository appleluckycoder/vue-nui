import { h, VNode } from 'vue'
import type { TreeNode, RawNode } from 'treemate'
import { keep, keysOf } from '../../_utils'
import NMenuItemGroup, { menuItemGroupProps } from './MenuItemGroup'
import NSubmenu, { submenuProps } from './Submenu'
import NMenuItem, { menuItemProps } from './MenuItem'

const groupPropKeys = keysOf(menuItemGroupProps)
const itemPropKeys = keysOf(menuItemProps)
const submenuPropKeys = keysOf(submenuProps)

export function itemRenderer (tmNode: TreeNode): VNode {
  const { rawNode, key, level } = tmNode
  const props = {
    ...rawNode,
    key,
    internalKey: key, // since key can't be used as a prop
    level,
    root: level === 0
  }

  if (tmNode.children) {
    if (tmNode.isGroup) {
      return h(
        NMenuItemGroup,
        keep(props, groupPropKeys, { tmNodes: tmNode.children })
      )
    }
    return h(
      NSubmenu,
      keep(props, submenuPropKeys, {
        rawNodes: tmNode.rawNode.children as RawNode[],
        tmNodes: tmNode.children
      })
    )
  } else {
    return h(
      NMenuItem,
      keep(props, itemPropKeys, {
        tmNode
      })
    )
  }
}
