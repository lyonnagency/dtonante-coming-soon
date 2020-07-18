import es from 'vee-validate/dist/locale/es.json';
import { required, email } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';
import Vue from 'vue';
import { ValidationProvider} from 'vee-validate';
// Override the default message.
extend('email', {
  ...email,
  message: es.messages['email']
});
extend('required', {
  ...required,
  message: es.messages['required']
});
// Register it globally
Vue.component('ValidationProvider', ValidationProvider);