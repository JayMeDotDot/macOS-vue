export default {
  'avatar': `w-25 h-25
             bg-white rounded-50%`,

  'menu': `min-w-10rem w-fit
           bg-white
           bg-opacity-70
           backdrop-blur-20
           text-slate-900
           rounded-2
           p-4px box-border
           flex flex-col
           select-none`,
  'right-menu-layer': `absolute top-0 left-0
                       w-100vw h-100vh`,
  'menu-dark': `bg-slate-500/50
                text-white`,
  'menu-item': `text-size-3.5
                pl-2 pr-2 mt-1 mb-1
                rounded-1
                cursor-default
                flex justify-between`,
  'item-hover': `bg-[rgba(255,160,0,.6)]
                 text-white`,


  'calculator': `w-100% h-100%
                 flex flex-col`,
  'calculator-result': `w-100% h-100% min-h-12 
                        text-xl leading-12 text-end
                        flex-grow-1 flex-shrink-1 flex-basis-0/1`,
  'calculator-keys': `grid gap-1px
                      grid-cols-4
                      min-w-15 min-h-15
                      w-100% h-100%
                      flex-grow-6.25 flex-shrink-1 flex-basis-0/1`,
  'calculator-key': `min-w-15 min-h-15
                     w-100% h-100%
                     border-none
                     bg-white
                     bg-opacity-10
                     backdrop-blur-20
                     text-slate-700
                     text-xl`,
  'calculator-key-dark': `text-white`,
  'calculator-key-active': `bg-slate-100`,
  'calculator-key-dark-active': `bg-slate-800`,

  'window': `w-fit
             bg-white
             bg-opacity-50
             backdrop-blur-20
             text-slate-700
             rounded-2
             p-4px box-border
             flex flex-col
             select-none`,
  'window-dark': `bg-slate-500/50
                  text-white`,
  'window-bar': `relative
                 m-1`,
  'window-title': `inline-block cursor-default`,
  'window-content': `width-100% height-100%
                     flex justify-center items-center flex-grow`,

  'search-bar-container': `bg-white
                           bg-opacity-50
                           backdrop-blur-20
                           p-2 w-40%
                           text-size-9
                           text-slate-700
                           flex justify-space items-center
                           rounded-3`,
  'search-bar-container-dark': `bg-slate-800
                                 text-slate-400`,
  'search-bar': `text-slate-700
                 text-size-6
                 bg-transparent
                 border-none`,
  'search-bar-dark': `text-slate-100`,

  'menu-bar': `flex
               flex-row
               items-center
               justify-between
               absolute left-0 right-0 top-0
               bg-slate-700/50
               color-warmgray-200
               text-size-3.5
               select-none`,
  'menu-subbar': `flex
                  flex-row
                  items-center
                  justify-between`,
  'menu-subbar-item': `pl-3 pr-3 pt-1 pb-1
                       cursor-default`,

  'app-bar': `flex
              flex-row
              items-center
              bg-white
              bg-opacity-50
              backdrop-blur-20
              w-fit
              p-1
              rounded-3
              select-none`,
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

  'theme-transition': `transition-colors
                        duration-700`,
  'scale-transition': `transition-transform
                       duration-300`,
  'app-scale': `scale-120 
                -translate-y-2`,
  'filp-transition': `transition-transform
                      duration-1000`,

  'item-center': `absolute
                  top-50% left-50%
                  translate-x--50% translate-y--50%`,
  'text-disabled': `opacity-50`,
}