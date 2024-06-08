<template>
  <div>
    <v-text-field-integer
      v-model="modelValue"
      :label="label"
      :properties="{
        readonly: false,
        disabled: false,
        outlined: false,
        clearable: true,
        placeholder: '',
      }"
      :options="{
        inputMask: '#########',
        outputMask: '#########',
        empty: null,
        applyAfter: false,
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
import Integer from "@/components/Integer.vue";

export default {
  components: {
    "v-text-field-integer": Integer,
  },
  data: () => ({
    modelValue: "123456789", // 123 or "123" or "" or null
    label: "Integer",
  }),
};
</script>
