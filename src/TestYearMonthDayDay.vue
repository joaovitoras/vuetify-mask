<template>
  <div>
    <v-text-field-yearmonthdayday
      v-model="modelValue"
      :label="label"
      :placeholder="placeholder"
      :properties="{
        prefix: '',
        suffix: '',
        readonly: false,
        disabled: false,
        outlined: true,
        clearable: false,
        persistentPlaceholder: true,
      }"
      :options="{
        empty: '',
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
import YearMonthDayDay from "@/components/YearMonthDayDay.vue";

export default {
  components: {
    "v-text-field-yearmonthdayday": YearMonthDayDay,
  },
  data: () => ({
    modelValue: "",
    label: "Ano;Mes;DiaInicial;DiaFinal;",
    placeholder: "AAAA;MM;DD;DD;",
  }),
};
</script>
