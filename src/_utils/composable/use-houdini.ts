let houdiniRegistered = false

export function useHoudini (): void {
  if (typeof window === 'undefined') return
  if (!houdiniRegistered) {
    houdiniRegistered = true
    if ('registerProperty' in window?.CSS) {
      try {
        ;(CSS as any).registerProperty({
          name: '--color-start',
          syntax: '<color>',
          inherits: false,
          initialValue: '#0000'
        })
        ;(CSS as any).registerProperty({
          name: '--color-end',
          syntax: '<color>',
          inherits: false,
          initialValue: '#0000'
        })
      } catch (e) {}
    }
  }
}
