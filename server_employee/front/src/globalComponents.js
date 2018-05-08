import fgInput from './components/UIComponents/Inputs/formGroupInput.vue'
import DropDown from './components/UIComponents/Dropdown.vue'
import NavButton from './components/Tools/NavButton'
import Page from './components/Tools/Page.vue'
import Box from './components/Tools/Box.vue'

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install (Vue) {
    Vue.component('fg-input', fgInput)
    Vue.component('drop-down', DropDown)
    Vue.component('page', Page)
    Vue.component('box', Box)
    Vue.component('nav-button', NavButton)
  }
}

export default GlobalComponents
