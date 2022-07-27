export default {
  'menu-bar': `flex
               flex-row
               items-center
               justify-between
               bg-slate-700/50
               text-white
               text-size-3.5
               p-1`,
  'menu-subbar': `flex
                  flex-row
                  items-center
                  justify-between
                  `,
  'menu-subbar-item': `ml-2
                       mr-2
                       cursor-default`,

  'app-bar': `flex
              flex-row
              items-center
              space-evenly
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


  'global-transition': `transition-all
                        duration-700`,
  'scale-transition': `transition-all
                       duration-300`,
  'global-scale': `scale-120 
                   -translate-y-2`,
}