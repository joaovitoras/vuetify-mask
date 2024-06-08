<template>
  <div>
    <v-text-field-dotnumber
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
        length: 20,
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
import DotNumber from "@/components/DotNumber.vue";

export default {
  components: {
    "v-text-field-dotnumber": DotNumber,
  },
  data: () => ({
    modelValue: "1.23.456.789", // 123 or "123" or "" or null
    label: "Only Dot and Number",
  }),
};
</script>
