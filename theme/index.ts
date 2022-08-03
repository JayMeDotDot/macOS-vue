export default {
  'window': `min-w-50 min-h-50
             bg-white
             bg-opacity-50
             backdrop-blur-20
             text-slate-700
             rounded-2
             p-2`,
  'window-dark': `bg-slate-500/50
                  text-slate-400`,
  'window-bar': `relative`,
  'window-title': `inline-block
                   absolute
                   left-50%`,
  'window-content': `width-100%`,

  'search-bar-container': `bg-white
                           bg-opacity-50
                           backdrop-blur-20
                           p-2 w-40%
                           text-size-9
                           text-slate-700
                           flex justify-center items-center
                           rounded-3`,
  'search-bar-container-dark': `bg-slate-500/50
                                 text-slate-400`,
  'search-bar': `text-slate-700
                 text-size-8
                 bg-transparent
                 border-none
                 w-100%`,
  'search-bar-dark': `text-slate-400`,

  'menu-bar': `flex
               flex-row
               items-center
               justify-between
               bg-slate-700/50
               color-warmgray-200
               text-size-3.5
               p-1`,
  'menu-subbar': `flex
                  flex-row
                  items-center
                  justify-between`,
  'menu-subbar-item': `ml-2
                       mr-2
                       cursor-default`,

  'app-bar': `flex
              flex-row
              items-center
              bg-white
              bg-opacity-50
              backdrop-blur-20
              w-fit
              p-1
              rounded-3`,
  'app-bar-dark': `bg-slate-500/50`,
  'app-bar-item': `flex
                   flex-row
                   items-center
                   ml-0
                   mr-0`,

  'jbutton': `bg-white
              bg-opacity-30
              backdrop-blur-20
              border-none
              color-bluegray-900
              text-size-5
              `,

  'global-transition': `transition-colors
                        duration-700`,
  'scale-transition': `transition-transform
                       duration-300`,
  'global-scale': `scale-120 
                   -translate-y-2`,

  'item-center': `absolute
                  top-50% left-50%
                  translate-x--50% translate-y--50%`,
}