import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color'

export default create({
  name: 'Message',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorBase,
      textColorSecondaryOverlay,
      infoColorSuppl,
      successColorSuppl,
      errorColorSuppl,
      warningColorSuppl,
      popoverColor
    } = derived
    const {
      popmenuBoxShadow
    } = base
    return {
      textColorInfo: textColorBase,
      textColorSuccess: textColorBase,
      textColorError: textColorBase,
      textColorWarning: textColorBase,
      textColorLoading: textColorSecondaryOverlay,
      colorInfo: infoColorSuppl,
      colorSuccess: successColorSuppl,
      colorError: errorColorSuppl,
      colorWarning: warningColorSuppl,
      colorLoading: popoverColor,
      boxShadowInfo: `0 2px 12px 0 ${changeColor(infoColorSuppl, { alpha: '0.4' })}`,
      boxShadowSuccess: `0 2px 12px 0 ${changeColor(successColorSuppl, { alpha: '0.4' })}`,
      boxShadowError: `0 2px 12px 0 ${changeColor(errorColorSuppl, { alpha: '0.4' })}`,
      boxShadowWarning: `0 2px 12px 0 ${changeColor(warningColorSuppl, { alpha: '0.4' })}`,
      boxShadowLoading: popmenuBoxShadow,
      iconColorInfo: 'rgba(255, 255, 255, .5)',
      iconColorSuccess: 'rgba(255, 255, 255, .5)',
      iconColorWarning: 'rgba(255, 255, 255, .5)',
      iconColorError: 'rgba(255, 255, 255, .5)',
      iconColorLoading: 'rgba(255, 255, 255, .5)',
      closeColor: 'rgba(255, 255, 255, .5)',
      closeColorHover: 'rgba(255, 255, 255, .6)',
      closeColorActive: 'rgba(255, 255, 255, .4)',
      closeColorLoading: 'rgba(255, 255, 255, .5)',
      closeColorLoadingHover: 'rgba(255, 255, 255, .6)',
      closeColorLoadingActive: 'rgba(255, 255, 255, .4)'
    }
  }
})
