<template>
  <div>
    <v-text-field-cep
      v-model="modelValue"
      :label="label"
      :properties="{
        disabled: false,
        outlined: true,
        clearable: true,
        placeholder: '',
      }"
      :options="{
        outputMask: '########',
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
import Cep from "@/components/Cep.vue";

export default {
  components: {
    "v-text-field-cep": Cep,
  },
  data: () => ({
    modelValue: "82515260", // 1.23 or "1.23" or "" or null
    label: "CEP (Brazilian mask)",
  }),
};
</script>
