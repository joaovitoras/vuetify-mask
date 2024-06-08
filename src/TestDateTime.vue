<template>
  <div>
    <v-text-field-datetime
      v-model="modelValue"
      :label="label"
      :properties="{
        readonly: false,
        disabled: false,
        outlined: false,
        clearable: true,
        placeholder: 'YYYY-MM-DD HH:mm:ss',
        'prepend-icon': 'mdi-calendar',
      }"
      :options="{
        inputMask: 'YYYY-MM-DD HH:mm:ss',
        empty: null,
      }"
    />
    v-model:
    {{
      modelValue !== null && modelValue !== ""
        ? modelValue + " (milliseconds)"
        : modelValue === null
          ? "null"
          : modelValue === ""
            ? "''"
            : ""
    }}
  </div>
</template>

<script>
import DateTime from "@/components/DateTime.vue";

export default {
  components: {
    "v-text-field-datetime": DateTime,
  },
  data: () => ({
    modelValue: "1595386800000", // Milliseconds
    label: "DateTime",
  }),
};
</script>
