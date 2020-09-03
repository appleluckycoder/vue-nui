import create from '../../../styles/_utils/create-component-base'
import commonVariables from './_common'

export default create({
  name: 'BaseSelectMenu',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      color: derived.popoverBackgroundColor,
      boxShadow: derived.popoverBoxShadow,
      groupHeaderTextColor: derived.tertiaryTextColor,
      actionDividerColor: derived.dividerOverlayColor,
      optionTextColor: derived.secondaryTextColor,
      optionTextColorPressed: derived.primaryActiveColor,
      optionTextColorDisabled: derived.disabledTextColor,
      optionTextColorSelected: derived.primaryColor,
      optionOpacityDisabled: derived.disabledOpacity,
      optionCheckColor: derived.primaryColor,
      actionTextColor: derived.secondaryTextColor
    }
  }
})
