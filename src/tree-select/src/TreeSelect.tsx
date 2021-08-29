import {
  h,
  defineComponent,
  PropType,
  ref,
  toRef,
  Transition,
  withDirectives,
  computed,
  CSSProperties,
  provide,
  watch,
  nextTick
} from 'vue'
import {
  FollowerPlacement,
  VBinder,
  VFollower,
  VTarget,
  FollowerInst
} from 'vueuc'
import { useIsMounted, useMergedState } from 'vooks'
import { clickoutside } from 'vdirs'
import { createTreeMate } from 'treemate'
import { Key, InternalTreeInst } from '../../tree/src/interface'
import type { SelectBaseOption } from '../../select/src/interface'
import { createTreeMateOptions, treeSharedProps } from '../../tree/src/Tree'
import {
  NInternalSelection,
  InternalSelectionInst,
  NBaseFocusDetector
} from '../../_internal'
import { NTree } from '../../tree'
import { NEmpty } from '../../empty'
import { useConfig, useFormItem, useLocale, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  call,
  ExtractPublicPropTypes,
  MaybeArray,
  useAdjustedTo
} from '../../_utils'
import { treeSelectLight, TreeSelectTheme } from '../styles'
import type {
  OnUpdateValue,
  OnUpdateValueImpl,
  TreeSelectOption,
  Value
} from './interface'
import { treeSelectInjectionKey } from './interface'
import {
  treeOption2SelectOption,
  filterTree,
  treeOption2SelectOptionWithPath
} from './utils'
import style from './styles/index.cssr'

const props = {
  ...(useTheme.props as ThemeProps<TreeSelectTheme>),
  bordered: {
    type: Boolean,
    default: true
  },
  nodeKey: String,
  cascade: Boolean,
  checkable: Boolean,
  clearable: Boolean,
  consistentMenuWidth: {
    type: Boolean,
    default: true
  },
  defaultShow: Boolean,
  defaultValue: {
    type: [String, Number, Array] as PropType<
    string | number | Array<string | number> | null
    >,
    default: null
  },
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  filterable: Boolean,
  leafOnly: Boolean,
  maxTagCount: [String, Number] as PropType<number | 'responsive'>,
  multiple: Boolean,
  showPath: Boolean,
  separator: {
    type: String,
    default: ' / '
  },
  options: {
    type: Array as PropType<TreeSelectOption[]>,
    default: () => []
  },
  placeholder: String,
  placement: {
    type: String as PropType<FollowerPlacement>,
    default: 'bottom-start'
  },
  show: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  size: String as PropType<'small' | 'medium' | 'large'>,
  value: [String, Number, Array] as PropType<
  string | number | Array<string | number> | null
  >,
  to: useAdjustedTo.propTo,
  virtualScroll: {
    type: Boolean,
    default: true
  },
  ...treeSharedProps,
  onBlur: Function as PropType<(e: FocusEvent) => void>,
  onFocus: Function as PropType<(e: FocusEvent) => void>,
  onUpdateShow: [Function, Array] as PropType<
  MaybeArray<(show: boolean) => void>
  >,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  'onUpdate:show': [Function, Array] as PropType<
  MaybeArray<(show: boolean) => void>
  >
} as const

export type TreeSelectProps = ExtractPublicPropTypes<typeof props>

export default defineComponent({
  name: 'TreeSelect',
  props,
  setup (props) {
    const followerInstRef = ref<FollowerInst | null>(null)
    const triggerInstRef = ref<InternalSelectionInst | null>(null)
    const treeInstRef = ref<InternalTreeInst | null>(null)
    const menuElRef = ref<HTMLDivElement | null>(null)
    const { mergedClsPrefixRef, namespaceRef } = useConfig(props)
    const { localeRef } = useLocale('Select')
    const {
      mergedSizeRef,
      mergedDisabledRef,
      nTriggerFormBlur,
      nTriggerFormChange,
      nTriggerFormFocus,
      nTriggerFormInput
    } = useFormItem(props)
    const uncontrolledValueRef = ref<Value>(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const uncontrolledShowRef = ref(props.defaultShow)
    const controlledShowRef = toRef(props, 'show')
    const mergedShowRef = useMergedState(controlledShowRef, uncontrolledShowRef)
    const patternRef = ref('')
    const filteredTreeInfoRef = computed<{
      filteredTree: TreeSelectOption[]
      highlightKeySet: Set<Key> | undefined
      expandedKeys: Key[] | undefined
    }>(() => {
      if (!props.filterable) {
        return {
          filteredTree: props.options,
          highlightKeySet: undefined,
          expandedKeys: undefined
        }
      }
      const { value: pattern } = patternRef
      if (!pattern.length || !props.filter) {
        return {
          filteredTree: props.options,
          highlightKeySet: undefined,
          expandedKeys: undefined
        }
      }
      return filterTree(props.options, props.filter, pattern)
    })
    // used to resolve selected options
    const dataTreeMateRef = computed(() =>
      createTreeMate<TreeSelectOption>(
        props.options,
        createTreeMateOptions(props.nodeKey)
      )
    )
    const displayTreeMateRef = computed(() =>
      createTreeMate<TreeSelectOption>(
        filteredTreeInfoRef.value.filteredTree,
        createTreeMateOptions(props.nodeKey)
      )
    )
    const { value: initMergedValue } = mergedValueRef
    const pendingNodeKeyRef = ref(
      props.checkable
        ? null
        : Array.isArray(initMergedValue) && initMergedValue.length
          ? initMergedValue[initMergedValue.length - 1]
          : null
    )
    const mergedCascadeRef = computed(() => {
      return props.multiple && props.cascade
    })
    // The same logic as tree, now it's not that complex so I don't extract a
    // function to reuse it.
    const uncontrolledExpandedKeysRef = ref(
      props.defaultExpandAll
        ? displayTreeMateRef.value.getNonLeafKeys()
        : props.defaultExpandedKeys || props.expandedKeys
    )
    const controlledExpandedKeysRef = toRef(props, 'expandedKeys')
    const mergedExpandedKeysRef = useMergedState(
      controlledExpandedKeysRef,
      uncontrolledExpandedKeysRef
    )
    const focusedRef = ref(false)
    const mergedPlaceholderRef = computed(() => {
      const { placeholder } = props
      if (placeholder !== undefined) return placeholder
      return localeRef.value.placeholder
    })
    const treeSelectedKeysRef = computed<Key[]>(() => {
      if (props.checkable) return []
      const { value: mergedValue } = mergedValueRef
      const { multiple } = props
      return Array.isArray(mergedValue)
        ? multiple
          ? mergedValue
          : []
        : multiple
          ? []
          : mergedValue === null
            ? []
            : [mergedValue]
    })
    const treeCheckedKeysRef = computed<Key[]>(() => {
      if (!props.checkable) return []
      const { value: mergedValue } = mergedValueRef
      if (props.multiple) {
        if (Array.isArray(mergedValue)) return mergedValue
        else return []
      } else {
        if (mergedValue === null || Array.isArray(mergedValue)) return []
        else return [mergedValue]
      }
    })
    const selectedOptionRef = computed(() => {
      const { multiple, showPath, separator } = props
      if (multiple) return null
      const { value: mergedValue } = mergedValueRef
      if (!Array.isArray(mergedValue) && mergedValue !== null) {
        const { value: treeMate } = dataTreeMateRef
        const tmNode = treeMate.getNode(mergedValue)
        if (tmNode !== null) {
          return showPath
            ? treeOption2SelectOptionWithPath(
              tmNode,
              treeMate.getPath(mergedValue).treeNodePath,
              separator
            )
            : treeOption2SelectOption(tmNode)
        }
      }
      return null
    })
    const selectedOptionsRef = computed(() => {
      const { multiple, showPath, separator } = props
      if (!multiple) return null
      const { value: mergedValue } = mergedValueRef
      if (Array.isArray(mergedValue)) {
        const res: SelectBaseOption[] = []
        const { value: treeMate } = dataTreeMateRef
        mergedValue.forEach((value) => {
          const tmNode = treeMate.getNode(value)
          if (tmNode !== null) {
            res.push(
              showPath
                ? treeOption2SelectOptionWithPath(
                  tmNode,
                  treeMate.getPath(value).treeNodePath,
                  separator
                )
                : treeOption2SelectOption(tmNode)
            )
          }
        })
        return res
      }
      return []
    })
    const menuPaddingRef = computed(() => {
      const {
        self: { menuPadding }
      } = themeRef.value
      return menuPadding
    })
    function focusSelection (): void {
      triggerInstRef.value?.focus()
    }
    function focusSelectionInput (): void {
      triggerInstRef.value?.focusInput()
    }
    function doUpdateShow (value: boolean): void {
      const { onUpdateShow, 'onUpdate:show': _onUpdateShow } = props
      if (onUpdateShow) call(onUpdateShow, value)
      if (_onUpdateShow) call(_onUpdateShow, value)
      uncontrolledShowRef.value = value
    }
    function doUpdateValue (
      value: string | number | Array<string | number> | null
    ): void {
      const { onUpdateValue, 'onUpdate:value': _onUpdateValue } = props
      if (onUpdateValue) call(onUpdateValue as OnUpdateValueImpl, value)
      if (_onUpdateValue) call(_onUpdateValue as OnUpdateValueImpl, value)
      uncontrolledValueRef.value = value
      nTriggerFormInput()
      nTriggerFormChange()
    }
    function doUpdateExpandedKeys (keys: Key[]): void {
      const {
        onUpdateExpandedKeys,
        'onUpdate:expandedKeys': _onUpdateExpandedKeys
      } = props
      if (onUpdateExpandedKeys) call(onUpdateExpandedKeys, keys)
      if (_onUpdateExpandedKeys) call(_onUpdateExpandedKeys, keys)
      uncontrolledExpandedKeysRef.value = keys
    }
    function doFocus (e: FocusEvent): void {
      const { onFocus } = props
      if (onFocus) onFocus(e)
      nTriggerFormFocus()
    }
    function doBlur (e: FocusEvent): void {
      closeMenu()
      const { onBlur } = props
      if (onBlur) onBlur(e)
      nTriggerFormBlur()
    }
    function closeMenu (): void {
      doUpdateShow(false)
    }
    function openMenu (): void {
      if (!mergedDisabledRef.value) {
        patternRef.value = ''
        doUpdateShow(true)
        if (props.filterable) {
          focusSelectionInput()
        }
      }
    }
    function handleMenuLeave (): void {
      patternRef.value = ''
    }
    function handleMenuClickoutside (e: MouseEvent): void {
      if (mergedShowRef.value) {
        if (!triggerInstRef.value?.$el.contains(e.target as Node)) {
          // outside select, don't need to return focus
          closeMenu()
        }
      }
    }
    function handleTriggerClick (): void {
      if (mergedDisabledRef.value) return
      if (!mergedShowRef.value) {
        openMenu()
      } else {
        if (!props.filterable) {
          // already focused, don't need to return focus
          closeMenu()
        }
      }
    }
    function handleUpdateSelectedKeys (keys: Key[]): void {
      if (props.checkable && props.multiple) {
        return
      }
      if (props.multiple) {
        doUpdateValue(keys)
      } else {
        doUpdateValue(keys[0] ?? null)
        closeMenu()
        if (!props.filterable) {
          // Currently it is not necessary. However if there is an action slot,
          // it will be useful. So just leave it here.
          focusSelection()
        }
      }
      if (props.filterable) {
        focusSelectionInput()
        patternRef.value = ''
      }
    }
    function handleUpdateCheckedKeys (keys: Key[]): void {
      // only in checkable & multiple mode, we use tree's check update
      if (props.checkable && props.multiple) {
        doUpdateValue(keys)
        if (props.filterable) {
          focusSelectionInput()
          patternRef.value = ''
        }
      }
    }
    function handleTriggerFocus (e: FocusEvent): void {
      if (menuElRef.value?.contains(e.relatedTarget as Element)) return
      focusedRef.value = true
      doFocus(e)
    }
    function handleTriggerBlur (e: FocusEvent): void {
      if (menuElRef.value?.contains(e.relatedTarget as Element)) return
      focusedRef.value = false
      doBlur(e)
    }
    function handleMenuFocusin (e: FocusEvent): void {
      if (
        menuElRef.value?.contains(e.relatedTarget as Element) ||
        triggerInstRef.value?.$el?.contains(e.relatedTarget as Element)
      ) {
        return
      }
      focusedRef.value = true
      doFocus(e)
    }
    function handleMenuFocusout (e: FocusEvent): void {
      if (
        menuElRef.value?.contains(e.relatedTarget as Element) ||
        triggerInstRef.value?.$el?.contains(e.relatedTarget as Element)
      ) {
        return
      }
      focusedRef.value = false
      doBlur(e)
    }
    function handleClear (e: MouseEvent): void {
      e.stopPropagation()
      const { multiple } = props
      if (!multiple && props.filterable) {
        closeMenu()
      }
      if (multiple) {
        doUpdateValue([])
      } else {
        doUpdateValue(null)
      }
    }
    function handleDeleteOption (option: SelectBaseOption): void {
      // only work for multiple mode
      const { value: mergedValue } = mergedValueRef
      if (Array.isArray(mergedValue)) {
        const index = mergedValue.findIndex((key) => key === option.value)
        if (~index) {
          if (props.checkable) {
            const { checkedKeys } = dataTreeMateRef.value.uncheck(
              option.value,
              mergedValue,
              {
                cascade: mergedCascadeRef.value
              }
            )
            doUpdateValue(checkedKeys)
          } else {
            const nextValue = Array.from(mergedValue)
            nextValue.splice(index, 1)
            doUpdateValue(nextValue)
          }
        }
      }
    }
    function handlePatternInput (e: InputEvent): void {
      const { value } = e.target as unknown as HTMLInputElement
      patternRef.value = value
    }
    function handleKeydown (e: KeyboardEvent): void {
      const { value: treeInst } = treeInstRef
      if (treeInst) {
        treeInst.handleKeydown(e)
      }
    }
    function handleKeyup (e: KeyboardEvent): void {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        if (mergedShowRef.value) {
          treeHandleKeyup(e)
          if (!props.multiple) {
            closeMenu()
            focusSelection()
          }
        } else {
          openMenu()
        }
        e.preventDefault()
      } else if (e.code === 'Escape') {
        closeMenu()
        focusSelection()
      } else {
        if (mergedShowRef.value) {
          treeHandleKeyup(e)
        } else if (e.code === 'ArrowDown') {
          openMenu()
        }
      }
    }
    function treeHandleKeyup (e: KeyboardEvent): void {
      const { value: treeInst } = treeInstRef
      if (treeInst) {
        treeInst.handleKeyup(e)
      }
    }
    function handleTabOut (): void {
      closeMenu()
      focusSelection()
    }
    function handleMenuMousedown (e: MouseEvent): void {
      // If there's an action slot later, we need to check if mousedown happens
      // in action panel
      e.preventDefault()
    }
    provide(treeSelectInjectionKey, {
      pendingNodeKeyRef
    })
    function syncPosition (): void {
      followerInstRef.value?.syncPosition()
    }
    watch(mergedValueRef, () => {
      if (!mergedShowRef.value) return
      void nextTick(syncPosition)
    })
    let memorizedExpandedKeys: Key[] | undefined
    watch(patternRef, (value, oldValue) => {
      if (!value.length) {
        if (memorizedExpandedKeys !== undefined) {
          doUpdateExpandedKeys(memorizedExpandedKeys)
        }
      } else {
        if (!oldValue.length) {
          memorizedExpandedKeys = mergedExpandedKeysRef.value
        }
        const { expandedKeys } = filteredTreeInfoRef.value
        if (expandedKeys !== undefined) {
          doUpdateExpandedKeys(expandedKeys)
        }
      }
    })
    const themeRef = useTheme(
      'TreeSelect',
      'TreeSelect',
      style,
      treeSelectLight,
      props,
      mergedClsPrefixRef
    )
    return {
      menuElRef,
      triggerInstRef,
      followerInstRef,
      treeInstRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue: mergedValueRef,
      mergedShow: mergedShowRef,
      namespace: namespaceRef,
      adjustedTo: useAdjustedTo(props),
      isMounted: useIsMounted(),
      focused: focusedRef,
      filteredTreeInfo: filteredTreeInfoRef,
      dataTreeMate: dataTreeMateRef,
      displayTreeMate: displayTreeMateRef,
      menuPadding: menuPaddingRef,
      mergedPlaceholder: mergedPlaceholderRef,
      mergedExpandedKeys: mergedExpandedKeysRef,
      treeSelectedKeys: treeSelectedKeysRef,
      treeCheckedKeys: treeCheckedKeysRef,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      selectedOption: selectedOptionRef,
      selectedOptions: selectedOptionsRef,
      pattern: patternRef,
      pendingNodeKey: pendingNodeKeyRef,
      mergedCascade: mergedCascadeRef,
      doUpdateExpandedKeys,
      handleMenuLeave,
      handleTriggerClick,
      handleMenuClickoutside,
      handleUpdateSelectedKeys,
      handleUpdateCheckedKeys,
      handleTriggerFocus,
      handleTriggerBlur,
      handleMenuFocusin,
      handleMenuFocusout,
      handleClear,
      handleDeleteOption,
      handlePatternInput,
      handleKeydown,
      handleKeyup,
      handleTabOut,
      handleMenuMousedown,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { menuBoxShadow, menuBorderRadius, menuColor, menuHeight }
        } = themeRef.value
        return {
          '--menu-box-shadow': menuBoxShadow,
          '--menu-border-radius': menuBorderRadius,
          '--menu-color': menuColor,
          '--menu-height': menuHeight,
          '--bezier': cubicBezierEaseInOut
        }
      }),
      mergedTheme: themeRef
    }
  },
  render () {
    const { mergedTheme, mergedClsPrefix } = this
    return (
      <div class={`${mergedClsPrefix}-tree-select`}>
        <VBinder>
          {{
            default: () => [
              <VTarget>
                {{
                  default: () => (
                    <NInternalSelection
                      ref="triggerInstRef"
                      focused={this.focused}
                      clsPrefix={mergedClsPrefix}
                      theme={mergedTheme.peers.InternalSelection}
                      themeOverrides={
                        mergedTheme.peerOverrides.InternalSelection
                      }
                      selectedOption={this.selectedOption}
                      selectedOptions={this.selectedOptions}
                      size={this.mergedSize}
                      bordered={this.bordered}
                      placeholder={this.mergedPlaceholder}
                      disabled={this.mergedDisabled}
                      active={this.mergedShow}
                      multiple={this.multiple}
                      maxTagCount={this.maxTagCount}
                      showArrow={true}
                      filterable={this.filterable}
                      clearable={this.clearable}
                      pattern={this.pattern}
                      onPatternInput={this.handlePatternInput}
                      onClear={this.handleClear}
                      onClick={this.handleTriggerClick}
                      onFocus={this.handleTriggerFocus}
                      onBlur={this.handleTriggerBlur}
                      onDeleteOption={this.handleDeleteOption}
                      onKeydown={this.handleKeydown}
                      onKeyup={this.handleKeyup}
                    />
                  )
                }}
              </VTarget>,
              <VFollower
                ref="followerInstRef"
                show={this.mergedShow}
                placement={this.placement}
                to={this.adjustedTo}
                teleportDisabled={this.adjustedTo === useAdjustedTo.tdkey}
                containerClass={this.namespace}
                width={this.consistentMenuWidth ? 'target' : undefined}
                minWidth="target"
              >
                {{
                  default: () => (
                    <Transition
                      name="fade-in-scale-up-transition"
                      appear={this.isMounted}
                      onLeave={this.handleMenuLeave}
                    >
                      {{
                        default: () => {
                          if (!this.mergedShow) return null
                          const {
                            mergedClsPrefix,
                            filteredTreeInfo,
                            checkable,
                            multiple
                          } = this
                          return withDirectives(
                            <div
                              class={`${mergedClsPrefix}-tree-select-menu`}
                              ref="menuElRef"
                              style={this.cssVars as CSSProperties}
                              tabindex={0}
                              onMousedown={this.handleMenuMousedown}
                              onKeyup={this.handleKeyup}
                              onKeydown={this.handleKeydown}
                              onFocusin={this.handleMenuFocusin}
                              onFocusout={this.handleMenuFocusout}
                            >
                              {filteredTreeInfo.filteredTree.length ? (
                                <NTree
                                  ref="treeInstRef"
                                  blockLine
                                  animated={false}
                                  data={filteredTreeInfo.filteredTree}
                                  cancelable={multiple}
                                  theme={mergedTheme.peers.Tree}
                                  themeOverrides={
                                    mergedTheme.peerOverrides.Tree
                                  }
                                  defaultExpandAll={this.defaultExpandAll}
                                  defaultExpandedKeys={this.defaultExpandedKeys}
                                  expandedKeys={this.mergedExpandedKeys}
                                  checkedKeys={this.treeCheckedKeys}
                                  selectedKeys={this.treeSelectedKeys}
                                  checkable={checkable}
                                  cascade={this.mergedCascade}
                                  leafOnly={this.leafOnly}
                                  multiple={this.multiple}
                                  virtualScroll={
                                    this.consistentMenuWidth &&
                                    this.virtualScroll
                                  }
                                  internalDataTreeMate={this.dataTreeMate}
                                  internalDisplayTreeMate={this.displayTreeMate}
                                  internalHighlightKeySet={
                                    filteredTreeInfo.highlightKeySet
                                  }
                                  internalCheckOnSelect
                                  internalScrollable
                                  internalScrollablePadding={this.menuPadding}
                                  internalFocusable={false}
                                  internalCheckboxFocusable={false}
                                  onUpdateCheckedKeys={
                                    this.handleUpdateCheckedKeys
                                  }
                                  onUpdateExpandedKeys={
                                    this.doUpdateExpandedKeys
                                  }
                                  onUpdateSelectedKeys={
                                    this.handleUpdateSelectedKeys
                                  }
                                />
                              ) : (
                                <div
                                  class={`${mergedClsPrefix}-tree-select-menu__empty`}
                                >
                                  <NEmpty
                                    theme={mergedTheme.peers.Empty}
                                    themeOverrides={
                                      mergedTheme.peerOverrides.Empty
                                    }
                                  />
                                </div>
                              )}
                              <NBaseFocusDetector onFocus={this.handleTabOut} />
                            </div>,
                            [[clickoutside, this.handleMenuClickoutside]]
                          )
                        }
                      }}
                    </Transition>
                  )
                }}
              </VFollower>
            ]
          }}
        </VBinder>
      </div>
    )
  }
})
