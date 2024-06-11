<template>
  <div>
    <v-text-field-cnpj
      v-model="modelValue"
      :label="label"
      :properties="{
        disabled: false,
        outlined: true,
        clearable: true,
        placeholder: '',
      }"
      :options="{
        outputMask: '##############',
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
import Cnpj from "@/components/Cnpj.vue";

export default {
  components: {
    "v-text-field-cnpj": Cnpj,
  },
  data: () => ({
    modelValue: "50703512000192", // 123 or "123" or "" or null
    label: "CNPJ (Brazilian mask)",
  }),
};
</script>
