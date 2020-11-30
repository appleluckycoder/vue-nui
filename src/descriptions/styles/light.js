import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { composite } from 'seemly'

export default create({
  theme: 'light',
  name: 'Descriptions',
  getDerivedVars (vars) {
    const {
      tableHeaderColorOverlay,
      textColor1Overlay,
      textColor2Overlay,
      cardColor,
      modalColor,
      dividerColorOverlay,
      borderRadius,
      fontWeightStrong
    } = vars
    return {
      ...commonVariables,
      headerColor: composite(cardColor, tableHeaderColorOverlay),
      headerTextColor: textColor1Overlay,
      headerFontWeight: fontWeightStrong,
      contentTextColor: textColor2Overlay,
      contentColor: cardColor,
      contentColorModal: modalColor,
      borderColor: dividerColorOverlay,
      borderRadius: borderRadius
    }
  }
})
