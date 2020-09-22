import create from '../../styles/_utils/create-component-base'
import { composite } from '../../_utils/color'
import commonVariables from './_common'

export default create({
  theme: 'light',
  name: 'DataTable',
  getDerivedVariables ({ base, derived }) {
    const {
      strongFontWeight,
      borderRadius
    } = base
    const {
      cardColor,
      modalColor,
      dividerColorOverlay,
      textColorSecondary,
      textColorPrimary,
      tableHeaderColorOverlay,
      tableColorHoverOverlay,
      iconColorOverlay,
      primaryColor
    } = derived
    return {
      ...commonVariables,
      borderRadius,
      default: {
        borderColor: composite(cardColor, dividerColorOverlay),
        bodyColorHover: composite(cardColor, tableColorHoverOverlay),
        headerColor: composite(cardColor, tableHeaderColorOverlay),
        headerColorHover: composite(
          composite(cardColor, tableHeaderColorOverlay),
          tableHeaderColorOverlay
        ),
        bodyColor: cardColor,
        bodyTextColor: textColorSecondary,
        headerTextColor: textColorPrimary,
        headerFontWeight: strongFontWeight,
        headerButtonColorHover: tableColorHoverOverlay,
        headerButtonIconColor: iconColorOverlay,
        headerButtonIconColorActive: primaryColor,
        fixedColumnBoxShadowColor: 'rgba(0, 0, 0, .18)'
      },
      modal: {
        borderColor: composite(modalColor, dividerColorOverlay),
        bodyColorHover: composite(modalColor, tableColorHoverOverlay),
        headerColor: composite(modalColor, tableHeaderColorOverlay),
        headerColorHover: composite(
          composite(modalColor, tableHeaderColorOverlay),
          tableHeaderColorOverlay
        ),
        bodyColor: modalColor
      }
    }
  }
})
