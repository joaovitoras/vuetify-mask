<template>
  <div>
    <v-text-field-cpf
      v-model="modelValue"
      :label="label"
      :properties="{
        readonly: false,
        disabled: false,
        outlined: true,
        clearable: true,
        placeholder: '',
      }"
      :options="{
        outputMask: '###########',
        empty: null,
        applyAfter: true,
      }"
    />
    v-model:
    {{
      modelValue !== null && modelValue !== ""
        ? modelValue
        : modelValue === null
          ? "null"
          : modelValue === ""
            ? "''"
            : ""
    }}
  </div>
</template>

<script>
import Cpf from "@/components/Cpf.vue";

export default {
  components: {
    "v-text-field-cpf": Cpf,
  },
  data: () => ({
    modelValue: "97702036028", // 123 or "123" or "" or null
    label: "CPF (Brazilian mask)",
  }),
};
</script>

// 'append-icon': modelValue ? 'mdi-check-circle' : 'mdi-minus-circle', //
success: modelValue ? true : false // or // v-bind:properties="{ // readonly:
false, // disabled: false, // outlined: true, // clearable: true, //
placeholder: '', // 'append-icon': appendIcone(), // success: success(), //
error: !success() // }" // methods: { // appendIcone() { // if (this.modelValue)
{ // return "mdi-check-circle"; // } else { // return "mdi-minus-circle"; // }
// }, // success() { // if (this.modelValue) { // return true; // } else { //
return false; // } // } // }
