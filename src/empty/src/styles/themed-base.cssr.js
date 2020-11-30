import { c, cTB, cE } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      textColor,
      iconColor,
      extraTextColor
    } = props.$local
    const base = props.$global
    const cubicBezierEaseInOut = base.cubicBezierEaseInOut
    return [
      cTB('empty', {
        raw: `
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 14px;
        `
      },
      [
        cE('icon', {
          raw: `
            color: ${iconColor};
            transition:
              color .3s ${cubicBezierEaseInOut};
          `
        }),
        cE('description', {
          raw: `
            margin-top: 4px;
            transition: color .3s ${cubicBezierEaseInOut};
            color: ${textColor};
          `
        }),
        cE('extra', {
          raw: `
            text-align: center;
            transition: color .3s ${cubicBezierEaseInOut};
            margin-top: 16px;
            color: ${extraTextColor};
          `
        })
      ])
    ]
  }
])
