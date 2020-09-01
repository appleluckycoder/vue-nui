import create from '../../styles/_utils/create-component-base'
import { composite, changeColor } from '../../_utils/color/index.js'
import sizeVariables from './_common'

export default create({
  name: 'Slider',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.12)'
    const {
      railBackgroundOverlayColor,
      railHoverBackgroundOverlayColor,
      cardBackgroundColor,
      primaryColor,
      popoverBackgroundColor,
      secondaryTextOverlayColor
    } = derived
    const defaultFillColor = composite(cardBackgroundColor, changeColor(primaryColor, { alpha: 0.7 }))
    return {
      ...sizeVariables,
      // defaultFillColor: defaultFillColor,
      railColor: railBackgroundOverlayColor,
      railColorHover: railHoverBackgroundOverlayColor,
      railFillColor: defaultFillColor,
      railFillColorHover: primaryColor,
      handleColor: cardBackgroundColor,
      handleBoxShadow: `inset 0 0 0 2px ${defaultFillColor}`,
      handleBoxShadowHover: `inset 0 0 0 2px ${primaryColor}`,
      handleBoxShadowActive: `inset 0 0 0 2px ${primaryColor}, 0 0 0 3px ${changeColor(primaryColor, { alpha: 0.2 })}`,
      handleBoxShadowFocus: `inset 0 0 0 2px ${primaryColor}, 0 0 0 3px ${changeColor(primaryColor, { alpha: 0.2 })}`,
      indicatorColor: popoverBackgroundColor,
      indicatorBoxShadow: boxShadow,
      indicatorTextColor: secondaryTextOverlayColor,
      dotBoxShadow: `inset 0 0 0 2px ${defaultFillColor}`,
      dotBoxShadowActive: `inset 0 0 0 2px ${primaryColor}`
    }
  }
})
