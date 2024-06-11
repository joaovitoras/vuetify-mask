<template>
  <div>
    <v-text-field-money
      v-model="modelValue"
      :label="label"
      :properties="{
        prefix: 'R$',
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
        allowNegative,
      }"
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
    }}
    <br />
    <v-btn
      @click="$refs.ref.focus()"
      size="x-small"
      variant="outlined"
      class="mr-1"
      >Focus</v-btn
    >
    <v-btn
      @click="disabled = !disabled"
      size="x-small"
      class="mr-1"
      variant="outlined"
      >{{ disabled ? "Enabled" : "Disabled" }}</v-btn
    >
    <v-btn
      @click="allowNegative = !allowNegative"
      size="x-small"
      class="mr-1"
      variant="outlined"
    >
      {{ allowNegative ? "Disallow negative" : "Allow negative" }}
    </v-btn>
  </div>
</template>

<script>
import Money from "@/components/Decimal.vue";

export default {
  components: {
    "v-text-field-money": Money,
  },
  data: () => ({
    modelValue: 123456789.0, // 1.23 or "1.23" or "" or null
    label: "Money",
    disabled: false,
    allowNegative: false,
  }),
};
</script>
