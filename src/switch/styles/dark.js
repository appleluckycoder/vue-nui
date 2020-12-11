import create from '../../_styles/utils/create-component-base'
import commonVars from './_common'
import { baseDark } from '../../_styles/base'

export default create({
  theme: 'dark',
  name: 'Switch',
  peer: [
    baseDark
  ],
  getLocalVars (vars) {
    const {
      primaryColorSuppl
    } = vars
    const railOverlayColor = 'rgba(255, 255, 255, .20)'
    return {
      ...commonVars,
      railColor: railOverlayColor,
      railColorActive: primaryColorSuppl,
      buttonBoxShadow: '0px 2px 4px 0 rgba(0, 0, 0, 0.4)',
      buttonColor: '#FFF'
    }
  }
})
