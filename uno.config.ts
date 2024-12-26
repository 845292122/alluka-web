import presetRemToPx from '@unocss/preset-rem-to-px'
import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetRemToPx({ baseFontSize: 4 })],
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['f-c-c', 'flex justify-center items-center'],
    ['flex-col', 'flex flex-col'],
    ['text-ellipsis', 'truncate']
  ],
  rules: [
    [/^m-([\\.\d]+)$/, ([, num]) => ({ margin: `${num}px` })],
    [/^flex-(\d+)$/, ([, n]) => ({ flex: n })],
    [/^bc-(.+)$/, ([, color]) => ({ 'border-color': `#${color}` })],
    [
      'card-shadow',
      {
        'box-shadow': '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017'
      }
    ]
  ]
})
