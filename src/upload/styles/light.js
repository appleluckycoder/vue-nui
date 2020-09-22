import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color'

export default create({
  name: 'Upload',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      iconColorOverlay,
      primaryColor,
      errorColor,
      textColorSecondary,
      successColor,
      opacityDisabled,
      actionColorOverlay,
      borderColor
    } = derived

    return {
      draggerColor: actionColorOverlay,
      draggerBorderColor: borderColor,
      draggerBorderColorHover: primaryColor,
      itemColorHover: changeColor(primaryColor, {
        alpha: 0.1
      }),
      itemColorErrorHover: changeColor(errorColor, {
        alpha: 0.1
      }),
      itemTextColor: textColorSecondary,
      itemTextColorError: errorColor,
      itemTextColorSuccess: successColor,
      itemIconColor: iconColorOverlay,
      itemDisabledOpacity: opacityDisabled
    }
  }
})
