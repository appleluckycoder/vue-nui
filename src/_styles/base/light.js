import create from '../../_styles/utils/create-theme-base.js'
import { read, composite } from '../../_utils/color/index.js'
import commonVariables from './_common.js'

export default create({
  theme: 'light',
  name: 'base',
  getBaseVariables () {
    return Object.assign({
      neutralBase: '#FFF',
      neutralInvertBase: '#000',
      neutralTextBase: '#000',
      neutralPopover: '#fff',
      neutralCard: '#fff',
      neutralModal: '#fff',
      neutralBody: '#eff2f5',

      alpha1: '0.82',
      alpha2: '0.72',
      alpha3: '0.38',
      alpha4: '0.24', // disabled text, placeholder, icon
      alpha5: '0.18', // disabled placeholder

      alphaClose: '0.52',

      alphaDisabled: '0.5',
      alphaDisabledInput: '0.02',
      alphaPending: '0.04',
      alphaTablePending: '0.02',
      alphaActive: '0.06',

      alphaAvatar: '0.2',
      alphaRail: '0.14',
      alphaProgressRail: '.08',
      alphaBorder: '0.12',
      alphaDivider: '0.06',
      alphaInput: '0',
      alphaAction: '0.02',
      alphaTab: '0.04',
      alphaScrollbar: '0.25',
      alphaScrollbarHover: '0.4',
      alphaCode: '0.05',
      alphaTag: '0.02',

      // primary
      primaryHover: '#36ad6a',
      primaryDefault: '#18a058',
      primaryActive: '#0c7a43',
      primarySuppl: '#36ad6a',

      // info
      infoHover: '#4098fc',
      infoDefault: '#2080f0',
      infoActive: '#1060c9',
      infoSuppl: '#4098fc',

      // error
      errorHover: '#de576d',
      errorDefault: '#d03050',
      errorActive: '#ab1f3f',
      errorSuppl: '#de576d',

      // warning
      warningHover: '#fcb040',
      warningDefault: '#f0a020',
      warningActive: '#c97c10',
      warningSuppl: '#fcb040',

      // success
      successHover: '#36ad6a',
      successDefault: '#18a058',
      successActive: '#0c7a43',
      successSuppl: '#36ad6a',

      boxShadow1: '',
      boxShadow2: '0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)',
      boxShadow3: '0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)'
    }, commonVariables)
  },
  getDerivedVariables (base) {
    const baseBackgroundRgb = read(base.neutralBase)
    const baseInvertBackgroundRgb = read(base.neutralInvertBase)
    const overlayPrefix = 'rgba(' + baseInvertBackgroundRgb.slice(0, 3).join(', ') + ', '
    function overlay (alpha) {
      return overlayPrefix + String(alpha) + ')'
    }
    function neutral (alpha) {
      const overlayRgba = Array.from(baseInvertBackgroundRgb)
      overlayRgba[3] = Number(alpha)
      return composite(baseBackgroundRgb, overlayRgba)
    }
    const derived = {
      baseColor: base.neutralBase,

      // primary color
      primaryColor: base.primaryDefault,
      primaryColorHover: base.primaryHover,
      primaryColorPressed: base.primaryActive,
      primaryColorSuppl: base.primarySuppl,
      // info color
      infoColor: base.infoDefault,
      infoColorHover: base.infoHover,
      infoColorPressed: base.infoActive,
      infoColorSuppl: base.infoSuppl,
      // success color
      successColor: base.successDefault,
      successColorHover: base.successHover,
      successColorPressed: base.successActive,
      successColorSuppl: base.successSuppl,
      // warning color
      warningColor: base.warningDefault,
      warningColorHover: base.warningHover,
      warningColorPressed: base.warningActive,
      warningColorSuppl: base.warningSuppl,
      // error color
      errorColor: base.errorDefault,
      errorColorHover: base.errorHover,
      errorColorPressed: base.errorActive,
      errorColorSuppl: base.errorSuppl,
      // text color
      textColorBase: base.neutralTextBase,
      textColor1: neutral(base.alpha1),
      textColor1Overlay: overlay(base.alpha1),
      textColor2: neutral(base.alpha2),
      textColor2Overlay: overlay(base.alpha2),
      textColor3: neutral(base.alpha3),
      textColor3Overlay: overlay(base.alpha3),
      textColor4: neutral(base.alpha4), // disabled, placeholder, icon
      textColor4Overlay: overlay(base.alpha4),
      textColor5: neutral(base.alpha5),
      textColor5Overlay: overlay(base.alpha5),

      textColorDisabled: neutral(base.alpha4),
      textColorDisabledOverlay: overlay(base.alpha4),
      placeholderColor: neutral(base.alpha4),
      placeholderColorOverlay: overlay(base.alpha4),
      placeholderColorDisabled: neutral(base.alpha5),
      placeholderColorDisabledOverlay: overlay(base.alpha5),
      iconColor: neutral(base.alpha4),
      iconColorOverlay: overlay(base.alpha4),
      iconColorDisabled: neutral(base.alpha5),
      iconColorDisabledOverlay: neutral(base.alpha5),

      opacity1: base.alpha1,
      opacity2: base.alpha2,
      opacity3: base.alpha3,
      opacity4: base.alpha4,
      opacity5: base.alpha5,
      opacityPending: base.alphaPending,
      inputOpacityDisabled: base.alphaDisabledInput,

      dividerColor: neutral(base.alphaDivider),
      dividerColorOverlay: overlay(base.alphaDivider),
      borderColor: neutral(base.alphaBorder),
      borderColorOverlay: overlay(base.alphaBorder),

      // close
      closeColorHover: neutral(base.alphaClose * 0.8),
      colorColorHoverOverlay: overlay(base.alphaClose * 0.8),
      closeColor: neutral(base.alphaClose),
      closeColorOverlay: overlay(base.alphaClose),
      closeColorPressed: neutral(base.alphaClose * 1.25),
      closeColorPressedOverlay: overlay(base.alphaClose * 1.25),
      closeColorDisabled: neutral(base.alpha4),
      closeColorDisabledOverlay: overlay(base.alpha4),
      closeOpacity: base.alphaClose,
      closeOpacityHover: base.alphaClose * 0.8,
      closeOpacityPressed: base.alphaClose * 1.25,

      scrollbarColorOverlay: overlay(base.alphaScrollbar),
      scrollbarColorHoverOverlay: overlay(base.alphaScrollbarHover),

      progressRailColor: neutral(base.alphaProgressRail),
      progressRailColorOverlay: overlay(base.alphaProgressRail),
      railColor: neutral(base.alphaRail),
      railColorOverlay: overlay(base.alphaRail),

      popoverColor: base.neutralPopover,
      tableColor: base.neutralCard,
      cardColor: base.neutralCard,
      modalColor: base.neutralModal,
      bodyColor: base.neutralBody,
      tagColor: neutral(base.alphaTag),
      avatarColor: neutral(base.alphaAvatar),

      inputColor: neutral(base.alphaInput),
      inputColorOverlay: overlay(base.alphaInput),
      codeColor: neutral(base.alphaCode),
      codeColorOverlay: overlay(base.alphaCode),
      tabColorOverlay: overlay(base.alphaTab),
      avatarColorOverlay: overlay(base.alphaAvatar),
      actionColor: neutral(base.alphaAction),
      actionColorOverlay: overlay(base.alphaAction),
      tableHeaderColorOverlay: overlay(base.alphaAction),

      hoverColorOverlay: overlay(base.alphaPending),
      tableColorHoverOverlay: overlay(base.alphaTablePending),
      activeColorOverlay: overlay(base.alphaActive),

      opacityDisabled: base.alphaDisabled,
      inputColorDisabled: neutral(base.alphaDisabledInput),
      inputColorDisabledOverlay: overlay(base.alphaDisabledInput),

      boxShadow2: base.boxShadow2,
      boxShadow3: base.boxShadow3
    }
    return derived
  }
})
