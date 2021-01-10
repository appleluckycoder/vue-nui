import commonVariables from './_common'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Message',
  common: commonLight,
  self (vars) {
    const {
      textColor2,
      closeColor,
      closeColorHover,
      closeColorPressed,
      infoColor,
      successColor,
      errorColor,
      warningColor,
      popoverColor,
      boxShadow2,
      primaryColor,
      lineHeight,
      borderRadius
    } = vars
    return {
      ...commonVariables,
      textColorInfo: textColor2,
      textColorSuccess: textColor2,
      textColorError: textColor2,
      textColorWarning: textColor2,
      textColorLoading: textColor2,
      colorInfo: popoverColor,
      colorSuccess: popoverColor,
      colorError: popoverColor,
      colorWarning: popoverColor,
      colorLoading: popoverColor,
      boxShadowInfo: boxShadow2,
      boxShadowSuccess: boxShadow2,
      boxShadowError: boxShadow2,
      boxShadowWarning: boxShadow2,
      boxShadowLoading: boxShadow2,
      iconColorInfo: infoColor,
      iconColorSuccess: successColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      iconColorLoading: primaryColor,
      closeColorInfo: closeColor,
      closeColorHoverInfo: closeColorHover,
      closeColorPressedInfo: closeColorPressed,
      closeColorSuccess: closeColor,
      closeColorHoverSuccess: closeColorHover,
      closeColorPressedSuccess: closeColorPressed,
      closeColorError: closeColor,
      closeColorHoverError: closeColorHover,
      closeColorPressedError: closeColorPressed,
      closeColorWarning: closeColor,
      closeColorHoverWarning: closeColorHover,
      closeColorPressedWarning: closeColorPressed,
      closeColorLoading: closeColor,
      closeColorHoverLoading: closeColorHover,
      closeColorPressedLoading: closeColorPressed,
      loadingColor: primaryColor,
      lineHeight,
      borderRadius
    }
  }
}
