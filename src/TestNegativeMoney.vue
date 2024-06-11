<template>
  <div>
    <v-text-field-negative-money
      v-model="modelValue"
      :label="label"
      :properties="{
        prefix: 'R$ ' + signal,
        readonly: false,
        disabled: disabled,
        outlined: false,
        clearable: true,
        placeholder: ' ',
      }"
      :options="{
        locale: 'pt-BR',
        length: 11,
        precision: 2,
        empty: null,
      }"
      @signal="signal = $event"
      ref="ref"
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
    }}<br />
    signal: {{ signal }}
  </div>
</template>

<script>
import NegativeMoney from "@/components/NegativeDecimal.vue";

export default {
  components: {
    "v-text-field-negative-money": NegativeMoney,
  },
  data: () => ({
    modelValue: -123456789.0, // 1.23 or "1.23" or "" or null
    label: "Negative Money",
    disabled: false,
    signal: "",
  }),
};
</script>
