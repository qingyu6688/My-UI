/* eslint-disable vue/one-component-per-file */
import { defineComponent, h, type Component, type SVGAttributes, type VNode } from 'vue'

type IconNode = readonly [
  tag: string,
  attrs: SVGAttributes,
  children?: readonly IconNode[],
]

export interface IconMeta {
  name: string
  label: string
  component: Component
  keywords?: readonly string[]
}

const CUTOUT_FILL = 'var(--my-icon-cutout-color, var(--my-bg-color))'

function renderNode([tag, attrs, children]: IconNode): VNode {
  return h(tag, attrs, children?.map(renderNode))
}

function createLineIcon(name: string, nodes: readonly IconNode[], strokeWidth = 2): Component {
  return defineComponent({
    name,
    inheritAttrs: false,
    setup(_, { attrs }) {
      return () =>
        h(
          'svg',
          {
            ...attrs,
            class: ['my-ui-line-icon', attrs.class],
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': strokeWidth,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
          },
          nodes.map(renderNode),
        )
    },
  })
}

function createFilledIcon(name: string, nodes: readonly IconNode[]): Component {
  return defineComponent({
    name,
    inheritAttrs: false,
    setup(_, { attrs }) {
      return () =>
        h(
          'svg',
          {
            ...attrs,
            class: ['my-ui-fill-icon', attrs.class],
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 24 24',
            fill: 'currentColor',
          },
          nodes.map(renderNode),
        )
    },
  })
}

export const MyLogoIcon = defineComponent({
  name: 'MyLogoIcon',
  inheritAttrs: false,
  setup(_, { attrs }) {
    return () =>
      h(
        'svg',
        {
          ...attrs,
          class: ['my-ui-brand-icon', attrs.class],
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          fill: 'none',
        },
        [
          h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 5, fill: 'currentColor', opacity: 0.18 }),
          h('path', {
            d: 'M7 16V8.8c0-.44.36-.8.8-.8h1.55c.28 0 .55.15.69.4L12 11.8l1.96-3.4c.14-.25.41-.4.69-.4h1.55c.44 0 .8.36.8.8V16',
            stroke: 'currentColor',
            'stroke-width': 1.9,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
          }),
          h('path', {
            d: 'M7.2 17h9.6',
            stroke: 'currentColor',
            'stroke-width': 1.9,
            'stroke-linecap': 'round',
          }),
          h('circle', { cx: 17.4, cy: 6.6, r: 1.6, fill: 'currentColor', opacity: 0.56 }),
        ],
      )
  },
})

export const MyOdometerIcon = createLineIcon('MyOdometerIcon', [
  ['path', { d: 'M4 14a8 8 0 1 1 16 0' }],
  ['path', { d: 'M12 14l4-4' }],
  ['path', { d: 'M8 18h8' }],
])

export const MyChatSquareIcon = createLineIcon('MyChatSquareIcon', [
  ['path', { d: 'M5 5h14v10H8l-3 3Z' }],
])

export const MyChatRoundIcon = createLineIcon('MyChatRoundIcon', [
  ['path', { d: 'M12 4c5 0 8 2.9 8 6.6S17 17.2 12 17.2c-1 0-2-.12-2.9-.38L5 20l.9-4.1A6 6 0 0 1 4 10.6C4 6.9 7 4 12 4Z' }],
])

export const MyChatLineRoundIcon = createLineIcon('MyChatLineRoundIcon', [
  ['path', { d: 'M12 4c5 0 8 2.9 8 6.6S17 17.2 12 17.2c-1 0-2-.12-2.9-.38L5 20l.9-4.1A6 6 0 0 1 4 10.6C4 6.9 7 4 12 4Z' }],
  ['path', { d: 'M8 10h8' }],
  ['path', { d: 'M8 13h5' }],
])

export const MyChatLineSquareIcon = createLineIcon('MyChatLineSquareIcon', [
  ['path', { d: 'M5 5h14v10H8l-3 3Z' }],
  ['path', { d: 'M8 9h8' }],
  ['path', { d: 'M8 12h5' }],
])

export const MyChatDotSquareIcon = createLineIcon('MyChatDotSquareIcon', [
  ['path', { d: 'M5 5h14v10H8l-3 3Z' }],
  ['path', { d: 'M8.5 10.5h.01' }],
  ['path', { d: 'M12 10.5h.01' }],
  ['path', { d: 'M15.5 10.5h.01' }],
])

export const MyViewIcon = createLineIcon('MyViewIcon', [
  ['path', { d: 'M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z' }],
  ['circle', { cx: 12, cy: 12, r: 2.5 }],
])

export const MyHideIcon = createLineIcon('MyHideIcon', [
  ['path', { d: 'M3 3l18 18' }],
  ['path', { d: 'M10.6 10.6A2.5 2.5 0 0 0 14 14' }],
  ['path', { d: 'M9.5 5.4A10 10 0 0 1 12 5c6 0 9.5 7 9.5 7a18 18 0 0 1-3 3.8' }],
  ['path', { d: 'M6.2 6.8A18 18 0 0 0 2.5 12S6 19 12 19a9.8 9.8 0 0 0 4.2-.95' }],
])

export const MyUnlockIcon = createLineIcon('MyUnlockIcon', [
  ['rect', { x: 5, y: 10, width: 14, height: 10, rx: 2 }],
  ['path', { d: 'M8 10V7a4 4 0 0 1 7.5-2' }],
])

export const MyLockIcon = createLineIcon('MyLockIcon', [
  ['rect', { x: 5, y: 10, width: 14, height: 10, rx: 2 }],
  ['path', { d: 'M8 10V7a4 4 0 0 1 8 0v3' }],
])

export const MyRefreshRightIcon = createLineIcon('MyRefreshRightIcon', [
  ['path', { d: 'M20 6v5h-5' }],
  ['path', { d: 'M20 11a8 8 0 1 1-2.34-5.66' }],
])

export const MyRefreshLeftIcon = createLineIcon('MyRefreshLeftIcon', [
  ['path', { d: 'M4 6v5h5' }],
  ['path', { d: 'M4 11a8 8 0 1 0 2.34-5.66' }],
])

export const MyRefreshIcon = createLineIcon('MyRefreshIcon', [
  ['path', { d: 'M21 12a9 9 0 0 1-15.3 6.4' }],
  ['path', { d: 'M3 12A9 9 0 0 1 18.3 5.6' }],
  ['path', { d: 'M18 3v3h3' }],
  ['path', { d: 'M6 21v-3H3' }],
])

export const MyBellIcon = createLineIcon('MyBellIcon', [
  ['path', { d: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9' }],
  ['path', { d: 'M10 20a2 2 0 0 0 4 0' }],
])

export const MyMuteNotificationIcon = createLineIcon('MyMuteNotificationIcon', [
  ['path', { d: 'M3 3l18 18' }],
  ['path', { d: 'M18 8a6 6 0 0 0-9.1-5.1' }],
  ['path', { d: 'M6 6.8A6 6 0 0 0 6 8c0 7-3 7-3 9h12' }],
])

export const MyUserIcon = createLineIcon('MyUserIcon', [
  ['circle', { cx: 12, cy: 8, r: 4 }],
  ['path', { d: 'M4 21c1.5-4 4.2-6 8-6s6.5 2 8 6' }],
])

export const MyCheckIcon = createLineIcon('MyCheckIcon', [
  ['path', { d: 'm5 12 4 4L19 6' }],
])

export const MyCircleCheckIcon = createLineIcon('MyCircleCheckIcon', [
  ['circle', { cx: 12, cy: 12, r: 9 }],
  ['path', { d: 'm8 12 2.5 2.5L16.5 8.5' }],
])

export const MyWarningIcon = createLineIcon('MyWarningIcon', [
  ['circle', { cx: 12, cy: 12, r: 9 }],
  ['path', { d: 'M12 8v5' }],
  ['path', { d: 'M12 16h.01' }],
])

export const MyCircleCloseIcon = createLineIcon('MyCircleCloseIcon', [
  ['circle', { cx: 12, cy: 12, r: 9 }],
  ['path', { d: 'm9 9 6 6' }],
  ['path', { d: 'm15 9-6 6' }],
])

export const MyCloseIcon = createLineIcon('MyCloseIcon', [
  ['path', { d: 'M18 6 6 18' }],
  ['path', { d: 'm6 6 12 12' }],
])

export const MyPieChartIcon = createLineIcon('MyPieChartIcon', [
  ['path', { d: 'M12 3v9h9' }],
  ['path', { d: 'M20.5 15A9 9 0 1 1 9 3.5' }],
])

export const MyMoreIcon = createLineIcon('MyMoreIcon', [
  ['path', { d: 'M5 12h.01' }],
  ['path', { d: 'M12 12h.01' }],
  ['path', { d: 'M19 12h.01' }],
])

export const MyCompassIcon = createLineIcon('MyCompassIcon', [
  ['circle', { cx: 12, cy: 12, r: 9 }],
  ['path', { d: 'm15.5 8.5-2 5-5 2 2-5Z' }],
])

export const MyFilterIcon = createLineIcon('MyFilterIcon', [
  ['path', { d: 'M4 5h16l-6.5 7.2V19l-3 1v-7.8Z' }],
])

export const MySwitchIcon = createLineIcon('MySwitchIcon', [
  ['path', { d: 'M17 7H5' }],
  ['path', { d: 'm13 3 4 4-4 4' }],
  ['path', { d: 'M7 17h12' }],
  ['path', { d: 'm11 21-4-4 4-4' }],
])

export const MySelectIcon = createLineIcon('MySelectIcon', [
  ['path', { d: 'm5 12 4 4L19 6' }],
])

export const MySemiSelectIcon = createLineIcon('MySemiSelectIcon', [
  ['path', { d: 'M6 12h12' }],
])

export const MyCloseBoldIcon = createLineIcon('MyCloseBoldIcon', [
  ['path', { d: 'M18 6 6 18' }],
  ['path', { d: 'm6 6 12 12' }],
], 3)

export const MyEditPenIcon = createLineIcon('MyEditPenIcon', [
  ['path', { d: 'M12 20h9' }],
  ['path', { d: 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z' }],
])

export const MyEditIcon = createLineIcon('MyEditIcon', [
  ['path', { d: 'M5 5h10' }],
  ['path', { d: 'M5 19h14' }],
  ['path', { d: 'M5 5v14' }],
  ['path', { d: 'M19 10v9' }],
  ['path', { d: 'm12 14 6-6 2 2-6 6-3 1Z' }],
])

export const MyMessageIcon = createLineIcon('MyMessageIcon', [
  ['rect', { x: 4, y: 6, width: 16, height: 12, rx: 2 }],
  ['path', { d: 'm4 8 8 6 8-6' }],
])

export const MyMessageBoxIcon = createLineIcon('MyMessageBoxIcon', [
  ['path', { d: 'M4 8h16v10H4Z' }],
  ['path', { d: 'm4 8 2-3h12l2 3' }],
  ['path', { d: 'M9 12h6' }],
])

export const MyTurnOffIcon = createLineIcon('MyTurnOffIcon', [
  ['path', { d: 'M12 3v9' }],
  ['path', { d: 'M7.3 7.3a7 7 0 1 0 9.4 0' }],
])

export const MyFinishedIcon = createLineIcon('MyFinishedIcon', [
  ['path', { d: 'm4 12 4 4L20 5' }],
  ['path', { d: 'M4 19h16' }],
])

export const MyDeleteIcon = createLineIcon('MyDeleteIcon', [
  ['path', { d: 'M4 7h16' }],
  ['path', { d: 'M10 11v6' }],
  ['path', { d: 'M14 11v6' }],
  ['path', { d: 'M6 7l1 13h10l1-13' }],
  ['path', { d: 'M9 7V4h6v3' }],
])

export const MyCropIcon = createLineIcon('MyCropIcon', [
  ['path', { d: 'M6 2v14a2 2 0 0 0 2 2h14' }],
  ['path', { d: 'M18 22V8a2 2 0 0 0-2-2H2' }],
])

export const MySwitchButtonIcon = createLineIcon('MySwitchButtonIcon', [
  ['rect', { x: 3, y: 7, width: 18, height: 10, rx: 5 }],
  ['circle', { cx: 8, cy: 12, r: 2.5 }],
])

export const MyOperationIcon = createLineIcon('MyOperationIcon', [
  ['path', { d: 'M4 7h10' }],
  ['path', { d: 'M18 7h2' }],
  ['circle', { cx: 16, cy: 7, r: 2 }],
  ['path', { d: 'M4 17h2' }],
  ['path', { d: 'M10 17h10' }],
  ['circle', { cx: 8, cy: 17, r: 2 }],
])

export const MyOpenIcon = createLineIcon('MyOpenIcon', [
  ['rect', { x: 3, y: 8, width: 18, height: 8, rx: 4 }],
  ['circle', { cx: 15, cy: 12, r: 2 }],
])

export const MyRemoveIcon = createLineIcon('MyRemoveIcon', [
  ['circle', { cx: 12, cy: 12, r: 9 }],
  ['path', { d: 'M8 12h8' }],
])

export const MyZoomOutIcon = createLineIcon('MyZoomOutIcon', [
  ['circle', { cx: 10.5, cy: 10.5, r: 6.5 }],
  ['path', { d: 'M8 10.5h5' }],
  ['path', { d: 'm16 16 4 4' }],
])

export const MyZoomInIcon = createLineIcon('MyZoomInIcon', [
  ['circle', { cx: 10.5, cy: 10.5, r: 6.5 }],
  ['path', { d: 'M8 10.5h5' }],
  ['path', { d: 'M10.5 8v5' }],
  ['path', { d: 'm16 16 4 4' }],
])

export const MyInfoIcon = createLineIcon('MyInfoIcon', [
  ['circle', { cx: 12, cy: 12, r: 9 }],
  ['path', { d: 'M12 11v5' }],
  ['path', { d: 'M12 8h.01' }],
])

export const MyToolsIcon = createLineIcon('MyToolsIcon', [
  ['path', { d: 'M14.7 6.3a4 4 0 0 0-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5l-2.6 2.6-2.8-2.8Z' }],
])

export const MyHomeIcon = createLineIcon('MyHomeIcon', [
  ['path', { d: 'M3 11 12 4l9 7' }],
  ['path', { d: 'M5 10v10h14V10' }],
  ['path', { d: 'M10 20v-6h4v6' }],
])

export const MyMenuIcon = createLineIcon('MyMenuIcon', [
  ['path', { d: 'M4 7h16' }],
  ['path', { d: 'M4 12h16' }],
  ['path', { d: 'M4 17h16' }],
])

export const MyUploadIcon = createLineIcon('MyUploadIcon', [
  ['path', { d: 'M12 16V4' }],
  ['path', { d: 'm7 9 5-5 5 5' }],
  ['path', { d: 'M5 20h14' }],
])

export const MyDownloadIcon = createLineIcon('MyDownloadIcon', [
  ['path', { d: 'M12 4v12' }],
  ['path', { d: 'm7 11 5 5 5-5' }],
  ['path', { d: 'M5 20h14' }],
])

export const MyAvatarIcon = createLineIcon('MyAvatarIcon', [
  ['circle', { cx: 12, cy: 8, r: 3 }],
  ['path', { d: 'M6 20v-1a6 6 0 0 1 12 0v1' }],
  ['path', { d: 'M4 20h16' }],
])

export const MyShareIcon = createLineIcon('MyShareIcon', [
  ['circle', { cx: 18, cy: 5, r: 2.5 }],
  ['circle', { cx: 6, cy: 12, r: 2.5 }],
  ['circle', { cx: 18, cy: 19, r: 2.5 }],
  ['path', { d: 'm8.2 10.8 7.6-4.6' }],
  ['path', { d: 'm8.2 13.2 7.6 4.6' }],
])

export const MyCommentIcon = createLineIcon('MyCommentIcon', [
  ['path', { d: 'M5 5h14v11H9l-4 4Z' }],
  ['path', { d: 'M8 9h8' }],
  ['path', { d: 'M8 12h5' }],
])

export const MyHistogramIcon = createLineIcon('MyHistogramIcon', [
  ['path', { d: 'M5 20V10' }],
  ['path', { d: 'M12 20V4' }],
  ['path', { d: 'M19 20v-7' }],
  ['path', { d: 'M3 20h18' }],
])

export const MyGridIcon = createLineIcon('MyGridIcon', [
  ['rect', { x: 4, y: 4, width: 5, height: 5 }],
  ['rect', { x: 10.5, y: 4, width: 5, height: 5 }],
  ['rect', { x: 17, y: 4, width: 3, height: 5 }],
  ['rect', { x: 4, y: 10.5, width: 5, height: 5 }],
  ['rect', { x: 10.5, y: 10.5, width: 5, height: 5 }],
  ['rect', { x: 17, y: 10.5, width: 3, height: 5 }],
  ['rect', { x: 4, y: 17, width: 5, height: 3 }],
  ['rect', { x: 10.5, y: 17, width: 5, height: 3 }],
  ['rect', { x: 17, y: 17, width: 3, height: 3 }],
])

export const MyPromotionIcon = createLineIcon('MyPromotionIcon', [
  ['path', { d: 'M3 11 21 3l-7 18-3-8Z' }],
  ['path', { d: 'm11 13 5-5' }],
])

export const MyPlusIcon = createLineIcon('MyPlusIcon', [
  ['path', { d: 'M12 5v14' }],
  ['path', { d: 'M5 12h14' }],
])

export const MySettingIcon = createLineIcon('MySettingIcon', [
  ['circle', { cx: 12, cy: 12, r: 3 }],
  ['path', { d: 'M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.37a1.7 1.7 0 0 0-1 .58V20a2 2 0 1 1-4 0v-.08a1.7 1.7 0 0 0-1-.58 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.63 15a1.7 1.7 0 0 0-.58-1H4a2 2 0 1 1 0-4h.08a1.7 1.7 0 0 0 .58-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.63a1.7 1.7 0 0 0 1-.58V4a2 2 0 1 1 4 0v.08a1.7 1.7 0 0 0 1 .58 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.37 9c.21.36.4.7.58 1H20a2 2 0 1 1 0 4h-.08c-.14.34-.32.67-.52 1Z' }],
])

export const MyThemeIcon = createLineIcon('MyThemeIcon', [
  ['path', { d: 'M12 3a9 9 0 0 0 0 18 1.6 1.6 0 0 0 1.2-2.68 1.45 1.45 0 0 1 1.07-2.45H16a5 5 0 0 0 0-10Z' }],
  ['circle', { cx: 7.5, cy: 10.5, r: 0.7 }],
  ['circle', { cx: 10, cy: 7.5, r: 0.7 }],
  ['circle', { cx: 13.2, cy: 7.4, r: 0.7 }],
])

export const MyComponentIcon = createLineIcon('MyComponentIcon', [
  ['rect', { x: 4, y: 4, width: 7, height: 7, rx: 1.5 }],
  ['rect', { x: 13, y: 4, width: 7, height: 7, rx: 1.5 }],
  ['rect', { x: 4, y: 13, width: 7, height: 7, rx: 1.5 }],
  ['rect', { x: 13, y: 13, width: 7, height: 7, rx: 1.5 }],
])

export const MySuccessIcon = MyCircleCheckIcon

export const MyLoadingIcon = createLineIcon('MyLoadingIcon', [
  ['path', { d: 'M21 12a9 9 0 1 1-2.64-6.36' }],
])

export const MySunIcon = createLineIcon('MySunIcon', [
  ['circle', { cx: 12, cy: 12, r: 4 }],
  ['path', { d: 'M12 2v2' }],
  ['path', { d: 'M12 20v2' }],
  ['path', { d: 'm4.93 4.93 1.41 1.41' }],
  ['path', { d: 'm17.66 17.66 1.41 1.41' }],
  ['path', { d: 'M2 12h2' }],
  ['path', { d: 'M20 12h2' }],
  ['path', { d: 'm6.34 17.66-1.41 1.41' }],
  ['path', { d: 'm19.07 4.93-1.41 1.41' }],
])

export const MyMoonIcon = createLineIcon('MyMoonIcon', [
  ['path', { d: 'M21 12.8A8.2 8.2 0 1 1 11.2 3 6.4 6.4 0 0 0 21 12.8Z' }],
])

export const MySearchIcon = createLineIcon('MySearchIcon', [
  ['circle', { cx: 11, cy: 11, r: 7 }],
  ['path', { d: 'm20 20-3.5-3.5' }],
])

export const MyInfoFilledIcon = createFilledIcon('MyInfoFilledIcon', [
  ['circle', { cx: 12, cy: 12, r: 10 }],
  ['rect', { x: 11, y: 10, width: 2, height: 7, rx: 1, fill: CUTOUT_FILL }],
  ['circle', { cx: 12, cy: 7.2, r: 1.2, fill: CUTOUT_FILL }],
])

export const MyCircleCheckFilledIcon = createFilledIcon('MyCircleCheckFilledIcon', [
  ['circle', { cx: 12, cy: 12, r: 10 }],
  ['path', { d: 'm7.5 12.2 3 3 6-7', fill: 'none', stroke: CUTOUT_FILL, 'stroke-width': 2.4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }],
])

export const MySuccessFilledIcon = MyCircleCheckFilledIcon

export const MyWarningFilledIcon = createFilledIcon('MyWarningFilledIcon', [
  ['circle', { cx: 12, cy: 12, r: 10 }],
  ['rect', { x: 11, y: 6.8, width: 2, height: 8, rx: 1, fill: CUTOUT_FILL }],
  ['circle', { cx: 12, cy: 17.2, r: 1.2, fill: CUTOUT_FILL }],
])

export const MyCircleCloseFilledIcon = createFilledIcon('MyCircleCloseFilledIcon', [
  ['circle', { cx: 12, cy: 12, r: 10 }],
  ['path', { d: 'm8.5 8.5 7 7M15.5 8.5l-7 7', fill: 'none', stroke: CUTOUT_FILL, 'stroke-width': 2.4, 'stroke-linecap': 'round' }],
])

export const MyQuestionFilledIcon = createFilledIcon('MyQuestionFilledIcon', [
  ['circle', { cx: 12, cy: 12, r: 10 }],
  ['path', { d: 'M9.2 9a3 3 0 1 1 4.8 2.4c-1 .7-1.5 1.2-1.5 2.3', fill: 'none', stroke: CUTOUT_FILL, 'stroke-width': 2.1, 'stroke-linecap': 'round' }],
  ['circle', { cx: 12, cy: 17.2, r: 1.1, fill: CUTOUT_FILL }],
])

export const MyWarnTriangleFilledIcon = createFilledIcon('MyWarnTriangleFilledIcon', [
  ['path', { d: 'M10.3 4.4c.76-1.28 2.64-1.28 3.4 0l8 13.5c.78 1.32-.18 3.1-1.7 3.1H4c-1.52 0-2.48-1.78-1.7-3.1Z' }],
  ['rect', { x: 11, y: 8.2, width: 2, height: 6.5, rx: 1, fill: CUTOUT_FILL }],
  ['circle', { cx: 12, cy: 17.3, r: 1.1, fill: CUTOUT_FILL }],
])

export const MyUserFilledIcon = createFilledIcon('MyUserFilledIcon', [
  ['circle', { cx: 12, cy: 8, r: 4 }],
  ['path', { d: 'M4.5 21a7.5 7.5 0 0 1 15 0Z' }],
])

export const MyMoreFilledIcon = createFilledIcon('MyMoreFilledIcon', [
  ['circle', { cx: 5, cy: 12, r: 2 }],
  ['circle', { cx: 12, cy: 12, r: 2 }],
  ['circle', { cx: 19, cy: 12, r: 2 }],
])

export const MyHomeFilledIcon = createFilledIcon('MyHomeFilledIcon', [
  ['path', { d: 'M3 11.2 12 4l9 7.2-1.2 1.5L18 11.3V20h-4v-5h-4v5H6v-8.7l-1.8 1.4Z' }],
])

export const MyUploadFilledIcon = createFilledIcon('MyUploadFilledIcon', [
  ['path', { d: 'M12 3 6.5 8.5h3.2V15h4.6V8.5h3.2Z' }],
  ['path', { d: 'M5 18h14v3H5Z' }],
])

export const MyHelpFilledIcon = createFilledIcon('MyHelpFilledIcon', [
  ['circle', { cx: 12, cy: 12, r: 10 }],
  ['path', { d: 'M8.8 9a3.3 3.3 0 1 1 5.2 2.7c-1 .68-1.5 1.14-1.5 2.3', fill: 'none', stroke: CUTOUT_FILL, 'stroke-width': 2.1, 'stroke-linecap': 'round' }],
  ['circle', { cx: 12, cy: 17.2, r: 1.1, fill: CUTOUT_FILL }],
])

export const MyStarFilledIcon = createFilledIcon('MyStarFilledIcon', [
  ['path', { d: 'm12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z' }],
])

export const MyDeleteFilledIcon = createFilledIcon('MyDeleteFilledIcon', [
  ['path', { d: 'M9 3h6l1 3h5v2H3V6h5Z' }],
  ['path', { d: 'M6 10h12l-.9 11H6.9Z' }],
])

export const MyRemoveFilledIcon = createFilledIcon('MyRemoveFilledIcon', [
  ['circle', { cx: 12, cy: 12, r: 10 }],
  ['rect', { x: 7, y: 11, width: 10, height: 2, rx: 1, fill: CUTOUT_FILL }],
])

export const MyCirclePlusFilledIcon = createFilledIcon('MyCirclePlusFilledIcon', [
  ['circle', { cx: 12, cy: 12, r: 10 }],
  ['rect', { x: 7, y: 11, width: 10, height: 2, rx: 1, fill: CUTOUT_FILL }],
  ['rect', { x: 11, y: 7, width: 2, height: 10, rx: 1, fill: CUTOUT_FILL }],
])

export const icons = [
  { name: 'MyLogoIcon', label: 'Logo', component: MyLogoIcon, keywords: ['brand', 'my ui'] },
  { name: 'MySearchIcon', label: 'Search', component: MySearchIcon, keywords: ['find'] },
  { name: 'MyOdometerIcon', label: 'Odometer', component: MyOdometerIcon },
  { name: 'MyChatSquareIcon', label: 'ChatSquare', component: MyChatSquareIcon },
  { name: 'MyChatRoundIcon', label: 'ChatRound', component: MyChatRoundIcon },
  { name: 'MyChatLineRoundIcon', label: 'ChatLineRound', component: MyChatLineRoundIcon },
  { name: 'MyChatLineSquareIcon', label: 'ChatLineSquare', component: MyChatLineSquareIcon },
  { name: 'MyChatDotSquareIcon', label: 'ChatDotSquare', component: MyChatDotSquareIcon },
  { name: 'MyViewIcon', label: 'View', component: MyViewIcon },
  { name: 'MyHideIcon', label: 'Hide', component: MyHideIcon },
  { name: 'MyUnlockIcon', label: 'Unlock', component: MyUnlockIcon },
  { name: 'MyLockIcon', label: 'Lock', component: MyLockIcon },
  { name: 'MyRefreshRightIcon', label: 'RefreshRight', component: MyRefreshRightIcon },
  { name: 'MyRefreshLeftIcon', label: 'RefreshLeft', component: MyRefreshLeftIcon },
  { name: 'MyRefreshIcon', label: 'Refresh', component: MyRefreshIcon },
  { name: 'MyBellIcon', label: 'Bell', component: MyBellIcon },
  { name: 'MyMuteNotificationIcon', label: 'MuteNotification', component: MyMuteNotificationIcon },
  { name: 'MyUserIcon', label: 'User', component: MyUserIcon },
  { name: 'MyCheckIcon', label: 'Check', component: MyCheckIcon },
  { name: 'MyCircleCheckIcon', label: 'CircleCheck', component: MyCircleCheckIcon },
  { name: 'MyWarningIcon', label: 'Warning', component: MyWarningIcon },
  { name: 'MyCircleCloseIcon', label: 'CircleClose', component: MyCircleCloseIcon },
  { name: 'MyCloseIcon', label: 'Close', component: MyCloseIcon },
  { name: 'MyPieChartIcon', label: 'PieChart', component: MyPieChartIcon },
  { name: 'MyMoreIcon', label: 'More', component: MyMoreIcon },
  { name: 'MyCompassIcon', label: 'Compass', component: MyCompassIcon },
  { name: 'MyFilterIcon', label: 'Filter', component: MyFilterIcon },
  { name: 'MySwitchIcon', label: 'Switch', component: MySwitchIcon },
  { name: 'MySelectIcon', label: 'Select', component: MySelectIcon },
  { name: 'MySemiSelectIcon', label: 'SemiSelect', component: MySemiSelectIcon },
  { name: 'MyCloseBoldIcon', label: 'CloseBold', component: MyCloseBoldIcon },
  { name: 'MyEditPenIcon', label: 'EditPen', component: MyEditPenIcon },
  { name: 'MyEditIcon', label: 'Edit', component: MyEditIcon },
  { name: 'MyMessageIcon', label: 'Message', component: MyMessageIcon },
  { name: 'MyMessageBoxIcon', label: 'MessageBox', component: MyMessageBoxIcon },
  { name: 'MyTurnOffIcon', label: 'TurnOff', component: MyTurnOffIcon },
  { name: 'MyFinishedIcon', label: 'Finished', component: MyFinishedIcon },
  { name: 'MyDeleteIcon', label: 'Delete', component: MyDeleteIcon },
  { name: 'MyCropIcon', label: 'Crop', component: MyCropIcon },
  { name: 'MySwitchButtonIcon', label: 'SwitchButton', component: MySwitchButtonIcon },
  { name: 'MyOperationIcon', label: 'Operation', component: MyOperationIcon },
  { name: 'MyOpenIcon', label: 'Open', component: MyOpenIcon },
  { name: 'MyRemoveIcon', label: 'Remove', component: MyRemoveIcon },
  { name: 'MyZoomOutIcon', label: 'ZoomOut', component: MyZoomOutIcon },
  { name: 'MyZoomInIcon', label: 'ZoomIn', component: MyZoomInIcon },
  { name: 'MyInfoFilledIcon', label: 'InfoFilled', component: MyInfoFilledIcon },
  { name: 'MyCircleCheckFilledIcon', label: 'CircleCheckFilled', component: MyCircleCheckFilledIcon },
  { name: 'MySuccessFilledIcon', label: 'SuccessFilled', component: MySuccessFilledIcon },
  { name: 'MyWarningFilledIcon', label: 'WarningFilled', component: MyWarningFilledIcon },
  { name: 'MyCircleCloseFilledIcon', label: 'CircleCloseFilled', component: MyCircleCloseFilledIcon },
  { name: 'MyQuestionFilledIcon', label: 'QuestionFilled', component: MyQuestionFilledIcon },
  { name: 'MyWarnTriangleFilledIcon', label: 'WarnTriangleFilled', component: MyWarnTriangleFilledIcon },
  { name: 'MyUserFilledIcon', label: 'UserFilled', component: MyUserFilledIcon },
  { name: 'MyMoreFilledIcon', label: 'MoreFilled', component: MyMoreFilledIcon },
  { name: 'MyToolsIcon', label: 'Tools', component: MyToolsIcon },
  { name: 'MyHomeFilledIcon', label: 'HomeFilled', component: MyHomeFilledIcon },
  { name: 'MyMenuIcon', label: 'Menu', component: MyMenuIcon },
  { name: 'MyUploadFilledIcon', label: 'UploadFilled', component: MyUploadFilledIcon },
  { name: 'MyAvatarIcon', label: 'Avatar', component: MyAvatarIcon },
  { name: 'MyHelpFilledIcon', label: 'HelpFilled', component: MyHelpFilledIcon },
  { name: 'MyShareIcon', label: 'Share', component: MyShareIcon },
  { name: 'MyStarFilledIcon', label: 'StarFilled', component: MyStarFilledIcon },
  { name: 'MyCommentIcon', label: 'Comment', component: MyCommentIcon },
  { name: 'MyHistogramIcon', label: 'Histogram', component: MyHistogramIcon },
  { name: 'MyGridIcon', label: 'Grid', component: MyGridIcon },
  { name: 'MyPromotionIcon', label: 'Promotion', component: MyPromotionIcon },
  { name: 'MyDeleteFilledIcon', label: 'DeleteFilled', component: MyDeleteFilledIcon },
  { name: 'MyRemoveFilledIcon', label: 'RemoveFilled', component: MyRemoveFilledIcon },
  { name: 'MyCirclePlusFilledIcon', label: 'CirclePlusFilled', component: MyCirclePlusFilledIcon },
  { name: 'MyPlusIcon', label: 'Plus', component: MyPlusIcon },
  { name: 'MySettingIcon', label: 'Setting', component: MySettingIcon },
  { name: 'MyThemeIcon', label: 'Theme', component: MyThemeIcon },
  { name: 'MyComponentIcon', label: 'Component', component: MyComponentIcon },
  { name: 'MyUploadIcon', label: 'Upload', component: MyUploadIcon },
  { name: 'MyDownloadIcon', label: 'Download', component: MyDownloadIcon },
  { name: 'MySuccessIcon', label: 'Success', component: MySuccessIcon },
  { name: 'MyInfoIcon', label: 'Info', component: MyInfoIcon },
  { name: 'MyLoadingIcon', label: 'Loading', component: MyLoadingIcon },
  { name: 'MySunIcon', label: 'Sun', component: MySunIcon },
  { name: 'MyMoonIcon', label: 'Moon', component: MyMoonIcon },
] satisfies readonly IconMeta[]
