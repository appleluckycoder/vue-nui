import { cB, c, cE, cM, cNotM } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up'

// vars:
// --ip-bezier
// --ip-color
// --ip-font-size
// --ip-border-radius
// --ip-height
// --ip-padding-left
// --ip-padding-right
// --ip-text-color
// --ip-text-color-disabled
// --ip-caret-color
// --ip-text-decoration-color
// --ip-border
// --ip-border-disabled
// --ip-border-hover
// --ip-border-focus
// --ip-placeholder-color
// --ip-placeholder-color-disabled
// --ip-line-height-textarea
// --ip-color-disabled
// --ip-color-focus
// --ip-box-shadow-focus
// --ip-icon-size
export default c([
  cB('input', `
    line-height: 1.5;
    z-index: auto;
    outline: none;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    display: inline-block;
    border-radius: var(--ip-border-radius);
    background-color: var(--ip-color);
    transition: background-color .3s var(--ip-bezier);
    --ip-padding-vertical: calc((var(--ip-height) - 1.5 * var(--ip-font-size)) / 2);
  `, [
    cE('input', {
      height: 'var(--ip-height)'
    }),
    cE('input, textarea, textarea-mirror, splitor, placeholder', `
      padding-left: var(--ip-padding-left);
      padding-right: var(--ip-padding-right);
      padding-top: var(--ip-padding-vertical);
      padding-bottom: var(--ip-padding-vertical);
      font-size: var(--ip-font-size);
      line-height: 1.5;
    `),
    // cM('suffix, clearable', [
    //   cM('split', [
    //     cE('input', [
    //       cM('second', {
    //         // paddingRight: `${paddingIcon} !important`
    //       }, [
    //         c('& +', [
    //           cE('placeholder', {
    //             // right: `${paddingIcon} !important`
    //           })
    //         ])
    //       ])
    //     ])
    //   ]),
    //   cNotM('split', [
    //     cE('input', [
    //       cM('first', {
    //         // paddingRight: `${paddingIcon} !important`
    //       })
    //     ]),
    //     cE('placeholder', {
    //       //right: `${paddingIcon} !important`
    //     })
    //   ])
    // ]),
    // cM('prefix', [
    //   cNotM('split', [
    //     cE('placeholder', {
    //       left: `${paddingIcon} !important`
    //     })
    //   ]),
    //   cM('split', [
    //     cE('input', [
    //       cM('first', [
    //         c('& +', [
    //           cE('placeholder', {
    //             left: `${paddingIcon} !important`
    //           })
    //         ])
    //       ])
    //     ])
    //   ]),
    //   cE('input', [
    //     cM('first', {
    //       paddingLeft: `${paddingIcon} !important`
    //     })
    //   ])
    // ]),
    cM('round', [
      cNotM('textarea', {
        borderRadius: 'calc(var(--ip-height) / 2)'
      })
    ]),
    cM('split', {
      display: 'inline-flex'
    }, [
      cE('input, placeholder', {
        textAlign: 'center'
      })
    ]),
    cNotM('textarea', [
      cE('placeholder', {
        whiteSpace: 'nowrap'
      })
    ]),
    cM('textarea', [
      cE('placeholder', {
        whiteSpace: 'unset'
      })
    ]),
    cM('disabled', {
      cursor: 'not-allowed',
      backgroundColor: 'var(--ip-color-disabled)'
    }, [
      cE('border', {
        border: 'var(--ip-border-disabled)'
      }),
      cE('input, textarea', {
        cursor: 'not-allowed',
        color: 'var(--ip-text-color-disabled)'
      }),
      cE('placeholder', {
        color: 'var(--ip-placeholder-color-disabled)'
      }),
      cE('splitor', {
        color: 'var(--ip-text-color-disabled)'
      })
    ]),
    cNotM('disabled', [
      cM('focus', {
        backgroundColor: 'var(--ip-color-focus)'
      }, [
        cE('state-border', {
          border: 'var(--ip-border-focus)',
          boxShadow: 'var(--ip-box-shadow-focus)'
        })
      ]),
      c('&:hover', [
        cE('state-border', {
          border: 'var(--ip-border-focus)'
        })
      ])
    ]),
    cE('border, state-border', `
      box-sizing: border-box;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      border-radius: inherit;
      border: var(--ip-border);
      transition:
        box-shadow .3s var(--ip-bezier),
        border-color .3s var(--ip-bezier);
    `),
    cE('state-border', {
      borderColor: 'transparent',
      zIndex: 1
    }),
    cE('placeholder', `
      box-sizing: border-box;
      pointer-events: none;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      overflow: hidden;
      transition: color .3s var(--ip-bezier);
      color: var(--ip-placeholder-color);
    `),
    cE('suffix, prefix', `
      position: absolute;
      line-height: 1;
      height: 0;
      white-space: nowrap;
      display: flex;
      align-items: center;
      top: 50%;
      width: var(--ip-icon-size);
    `, [
      cB('base-clear-button', {
        fontSize: 'var(--ip-icon-size)'
      }),
      cB('icon', {
        justifySelf: 'center',
        fontSize: 'var(--ip-icon-color)',
        color: 'var(--ip-icon-color)',
        transition: 'color .3s var(--ip-bezier)'
      })
    ]),
    cE('suffix', {
      justifyContent: 'flex-end',
      right: '12px'
    }, [
      fadeInScaleUpTransition() // button suffix
    ]),
    cE('prefix', {
      justifyContent: 'flex-start',
      left: '12px'
    }),
    cE('textarea, textarea-mirror', `
      display: inline-block;
      vertical-align: bottom;
      box-sizing: border-box;
      font-family: inherit;
      font-size: inherit;
      line-height: var(--ip-line-height-textarea);
      margin: 0;
      resize: vertical;
      padding-left: 14px;
      padding-right: 14px;
    `),
    cE('textarea', [
      cM('autosize', `
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        resize: none;
      `)
    ]),
    cE('textarea-mirror', `
      overflow: hidden;
      visibility: hidden;
      position: static;
      white-space: pre-wrap;
      overflow-wrap: break-word;
    `),
    cE('input, textarea', `
      -webkit-appearance: none;
      box-sizing: border-box;
      border: none;
      font-size: inherit;
      outline: none;
      font-family: inherit;
      width: 100%;
      background-color: transparent;
      min-width: 0;
      text-decoration-color: var(--ip-text-decoration-color);
      color: var(--ip-text-color);
      caret-color: var(--ip-caret-color);
      transition:
        caret-color .3s var(--ip-bezier),
        color .3s var(--ip-bezier),
        text-decoration-color .3s var(--ip-bezier);
    `, [
      c('&::placeholder', {
        color: 'transparent'
      })
    ]),
    cE('splitor', {
      transition: 'color .3s var(--ip-bezier)',
      color: 'var(--ip-text-color)',
      paddingLeft: '0 !important',
      paddingRight: '0 !important'
    }),
    cB('input-clear', {
      display: 'flex',
      marginRight: '4px'
    }),
    cB('input-first-input', {
      flexGrow: 1,
      position: 'relative'
    }),
    cB('input-second-input', {
      flexGrow: 1,
      position: 'relative'
    })
  ])
])
