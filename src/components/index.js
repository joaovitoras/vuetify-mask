import Decimal from "./Decimal.vue";
import Integer from "./Integer.vue";
import DateTime from "./DateTime.vue";
import DateTimePicker from "./DateTimePicker.vue";
import SimpleMask from "./SimpleMask.vue";
import Cpf from "./Cpf.vue";
import Cnpj from "./Cnpj.vue";
import Cep from "./Cep.vue";
import FileBase64 from "./FileBase64.vue";
import DotNumber from "./DotNumber.vue";

function install(Vue) {
  Vue.component("VTextFieldMoney", Decimal);
  Vue.component("VTextFieldPercent", Decimal);
  Vue.component("VTextFieldInteger", Integer);
  Vue.component("VTextFieldDatetime", DateTime);
  Vue.component("VTextFieldDatetimepicker", DateTimePicker);
  Vue.component("VTextFieldSimplemask", SimpleMask);
  Vue.component("VTextFieldCpf", Cpf);
  Vue.component("VTextFieldCnpj", Cnpj);
  Vue.component("VTextFieldCep", Cep);
  Vue.component("VTextFieldFilebase64", FileBase64);
  Vue.component("VTextFieldDotnumber", DotNumber);
}

export default install;
