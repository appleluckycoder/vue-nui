import { c, cTB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      color,
      opacity1Depth,
      opacity2Depth,
      opacity3Depth,
      opacity4Depth,
      opacity5Depth
    } = props.$local
    const { cubicBezierEaseInOut } = props.$base
    return [
      cTB('icon', {
        raw: `
          height: 1em;
          width: 1em;
          line-height: 1em;
          text-align: center;
          display: inline-block;
          position: relative;
          transition:
            fill .3s ${cubicBezierEaseInOut},
            stroke .3s ${cubicBezierEaseInOut},
            opacity .3s ${cubicBezierEaseInOut};
          fill: currentColor;
          stroke: currentColor;
        `
      },
      [
        cM('1-depth, 2-depth, 3-depth, 4-depth, 5-depth', {
          fill: color,
          stroke: color
        }),
        c('svg', {
          height: '1em',
          width: '1em'
        }),
        cM('1-depth', {
          opacity: opacity1Depth
        }),
        cM('2-depth', {
          opacity: opacity2Depth
        }),
        cM('3-depth', {
          opacity: opacity3Depth
        }),
        cM('4-depth', {
          opacity: opacity4Depth
        }),
        cM('5-depth', {
          opacity: opacity5Depth
        })
      ])
    ]
  }
])
