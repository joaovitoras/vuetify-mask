<template>
  <div>
    <v-text-field-simplemask
      v-model="modelValue"
      :label="label"
      :properties="{
        prefix: '',
        suffix: '',
        readonly: false,
        disabled: false,
        outlined: false,
        clearable: true,
        placeholder: '',
      }"
      :options="{
        inputMask: '##-####-####-###',
        outputMask: '##-####-####-###',
        empty: null,
        applyAfter: false,
        alphanumeric: true,
        lowerCase: false,
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
import SimpleMask from "@/components/SimpleMask.vue";

export default {
  components: {
    "v-text-field-simplemask": SimpleMask,
  },
  data: () => ({
    modelValue: "23-A568-B953-356", // 1.23 or "1.23" or "" or null
    label: "Simple Mask",
  }),
};
</script>
