import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiCalendarWeekFill, RiLoader3Fill, MdKeyboardarrowright, MdKeyboardarrowleft, MdKeyboardarrowup, MdKeyboardarrowdown } from "oh-vue-icons/icons";
import CustomCollapse from '@/components/CustomCollapse.vue';

const app = createApp(App);

app.use(router);

// Icons
addIcons(BiCalendarWeekFill, RiLoader3Fill, MdKeyboardarrowright, MdKeyboardarrowleft, MdKeyboardarrowup, MdKeyboardarrowdown);
app.component("v-icon", OhVueIcon);

// Register components
app.component('CustomCollapse', CustomCollapse);

app.mount('#app');