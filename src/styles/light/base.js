import create from '../utils/create-theme-base.js'
import { read, composite } from '../../_utils/color/index.js'
import commonVariables from '../common-style/index.js'

export default create({
  getBaseVariables () {
    return Object.assign({
      neutralBase: '#FFF',
      neutralInvertBase: '#000',
      neutralTextBase: '#000',
      neutralPopover: '#fff',
      neutralCard: '#fff',
      neutralModal: '#fff',
      neutralBody: 'rgb(248, 248, 248)',

      alpha1: '0.82',
      alpha2: '0.72',
      alpha3: '0.38',
      alpha4: '0.24',

      alphaDisabled: '0.5',
      alphaDisabledFill: '0.02',
      alphaPending: '0.04',
      alphaTablePending: '0.02',
      alphaActive: '0.06',

      alphaAvatar: '0.2',
      alphaRail: '0.14',
      alphaBorder: '0.14',
      alphaDivider: '0.08',
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
      primaryHs: '#36ad6a',

      // info
      infoHover: '#4098fc',
      infoDefault: '#2080f0',
      infoActive: '#1060c9',
      infoHs: '#4098fc',

      // error
      errorHover: '#de576d',
      errorDefault: '#d03050',
      errorActive: '#ab1f3f',
      errorHs: '#de576d',

      // warning
      warningHover: '#fcb040',
      warningDefault: '#f0a020',
      warningActive: '#c97c10',
      warningHs: '#fcb040',

      // success
      successHover: '#36ad6a',
      successDefault: '#18a058',
      successActive: '#0c7a43',
      successHs: '#36ad6a'
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
      baseBackgroundColor: base.neutralBase,

      // primary color
      primaryColor: base.primaryDefault,
      primaryHoverColor: base.primaryHover,
      primaryActiveColor: base.primaryActive,
      primaryHsColor: base.primaryHs,
      // info color
      infoColor: base.infoDefault,
      infoHoverColor: base.infoHover,
      infoActiveColor: base.infoActive,
      infoHsColor: base.infoHs,
      // success color
      successColor: base.successDefault,
      successHoverColor: base.successHover,
      successActiveColor: base.successActive,
      successHsColor: base.successHs,
      // warning color
      warningColor: base.warningDefault,
      warningHoverColor: base.warningHover,
      warningActiveColor: base.warningActive,
      warningHsColor: base.warningHs,
      // error color
      errorColor: base.errorDefault,
      errorHoverColor: base.errorHover,
      errorActiveColor: base.errorActive,
      errorHsColor: base.errorHs,
      // text color
      baseTextColor: base.neutralTextBase,
      primaryTextColor: neutral(base.alpha1),
      primaryTextOverlayColor: overlay(base.alpha1),
      secondaryTextColor: neutral(base.alpha2),
      secondaryTextOverlayColor: overlay(base.alpha2),
      tertiaryTextColor: neutral(base.alpha3),
      tertiaryTextOverlayColor: overlay(base.alpha3),
      quaternaryTextColor: neutral(base.alpha4), // disabled, placeholder, icon
      quaternaryTextOverlayColor: overlay(base.alpha4),

      primaryOpacity: base.alpha1,
      secondaryOpacity: base.alpha2,
      tertiaryOpacity: base.alpha3,
      pendingOpacity: base.alphaPending,
      disabledFillOpacity: base.alphaDisabledFill,

      iconColor: neutral(base.alpha4),
      iconOverlayColor: overlay(base.alpha4),

      dividerColor: neutral(base.alphaDivider),
      dividerOverlayColor: neutral(base.alphaDivider),
      borderColor: neutral(base.alphaBorder),
      borderOverlayColor: neutral(base.alphaBorder),

      closeHoverColor: neutral(base.alpha2),
      closeHoverOverlayColor: overlay(base.alpha2),
      closeColor: neutral(base.alpha3),
      closeOverlayColor: overlay(base.alpha3),
      disabledCloseColor: neutral(base.alpha4),
      disabledCloseHoverColor: overlay(base.alpha4),

      scrollbarOverlayBackgroundColor: overlay(base.alphaScrollbar),
      scrollbarHoverOverlayBackgroundColor: overlay(base.alphaScrollbarHover),

      railBackgroundColor: neutral(base.alphaRail),
      railOverlayBackgroundColor: overlay(base.alphaRail),

      popoverBackgroundColor: base.neutralPopover,
      tableBodyBackgroundColor: base.neutralCard,
      cardBackgroundColor: base.neutralCard,
      modalBackgroundColor: base.neutralModal,
      bodyBackgroundColor: base.neutralBody,
      tagBackgroundColor: neutral(base.alphaTag),

      inputOverlayBackgroundColor: overlay(base.alphaInput),
      codeOverlayBackgroundColor: overlay(base.alphaCode),
      tabOverlayBackgroundColor: overlay(base.alphaTab),
      avatarOverlayBackgroundColor: overlay(base.alphaAvatar),
      actionOverlayBackgroundColor: overlay(base.alphaAction),
      tableHeaderOverlayBackgroundColor: overlay(base.alphaAction),

      pendingOverlayBackgroundColor: overlay(base.alphaPending),
      tablePendingOverlayBackgroundColor: overlay(base.alphaTablePending),
      activeOverlayBackgroundColor: overlay(base.alphaActive),

      disabledOpacity: base.alphaDisabled,
      disabledFillBackgroundColor: neutral(base.alphaDisabledFill),

      messageColoredBoxShadow: '0px 2px 18px 0px rgba(0, 0, 0, 0.27)'
    }
    return derived
  }
})
