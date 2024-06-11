<template>
  <div>
    <v-text-field
      v-model="cmpValue"
      v-bind:label="label"
      v-bind:maxlength="maxLength"
      v-bind="properties"
      @keypress="keyPress"
      @blur="$emit('blur')"
      @change="$emit('change')"
      @click="$emit('click')"
      @focus="$emit('focus')"
      @keydown="$emit('keydown')"
      @mousedown="$emit('mousedown')"
      @mouseup="$emit('mouseup')"
      ref="ref"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: "0",
    },
    label: {
      type: String,
      default: "",
    },
    properties: {
      type: Object,
      default: function () {
        return {};
      },
    },
    options: {
      type: Object,
      default: function () {
        return {
          locale: "pt-BR",
          length: 11,
          precision: 2,
          empty: null,
          allowNegative: false,
        };
      },
    },
  },
  data: () => ({}),
  /*
   v-model="cmpValue": Dessa forma, ao digitar, o valor é atualizado automaticamente no componente pai.
   O valor digitado entra pelo newValue do Set é emitido para o componente pai, retorna pelo get e pára.
  */
  computed: {
    allowNegative() {
      return this.options.allowNegative;
    },
    precision() {
      return this.options.precision;
    },
    cmpValue: {
      get: function () {
        return this.humanFormat(this.modelValue);
      },
      set: function (newValue) {
        this.$emit("update:modelValue", this.machineFormat(newValue));
      },
    },
    maxLength() {
      if (this.allowNegative) {
        return this.options.length + this.precision + 1;
      }

      return this.options.length + this.precision;
    },
  },
  watch: {},
  methods: {
    humanFormat: function (modelValue) {
      if (modelValue || modelValue === 0) {
        modelValue = Number(modelValue).toLocaleString(this.options.locale, {
          maximumFractionDigits: this.precision,
          minimumFractionDigits: this.precision,
        });
      } else {
        modelValue = this.options.empty;
      }

      return modelValue;
    },
    machineFormat(modelValue) {
      if (modelValue || (this.allowNegative && Object.is(modelValue, -0))) {
        modelValue = this.clearNumber(modelValue);
        modelValue = this.fillZeros(modelValue);
        modelValue = this.insertPoint(modelValue);

        if (modelValue === "") {
          modelValue = this.options.empty;
        }
      } else {
        modelValue = this.options.empty;
      }
      return modelValue;
    },
    // Ajustar quantidade de zeros à esquerda
    fillZeros(modelValue) {
      let result = "";

      if (
        this.allowNegative &&
        (modelValue.startsWith("-") || Object.is(modelValue, -0))
      ) {
        result = modelValue.substring(1, modelValue.length);
        result = result.padStart(parseInt(this.precision) + 1, "0");
        result = "-" + result;
      } else {
        result = modelValue.padStart(parseInt(this.precision) + 1, "0");
      }

      return result;
    },

    // Incluir ponto na casa correta, conforme a precisão configurada
    insertPoint(modelValue) {
      const length = modelValue.length;
      const left = modelValue.substring(0, length - parseInt(this.precision));
      const right = modelValue.substring(
        length - parseInt(this.precision),
        length,
      );

      return `${left}.${right}`;
    },

    // Retira todos os caracteres não numéricos e zeros à esquerda
    clearNumber: function (modelValue) {
      let result = "";

      if (modelValue || (this.allowNegative && modelValue === 0)) {
        let flag = false;
        let arrayValue = this.valueToArray(modelValue);

        for (var i = 0; i < arrayValue.length; i++) {
          if (this.isInteger(arrayValue[i])) {
            if (!flag) {
              // Retirar zeros à esquerda
              if (arrayValue[i] !== "0") {
                result = result + arrayValue[i];
                flag = true;
              } else {
                // Permitir zero quando valor igual a zero - Tipo 3 (Money or Percent)
                if (Number(modelValue) === 0) {
                  result = result + arrayValue[i];
                }
              }
            } else {
              result = result + arrayValue[i];
            }
            // allow negative numbers to be passed
            // when the first char is '-'
          } else if (this.allowNegative && i === 0 && arrayValue[0] === "-") {
            result = result + arrayValue[i];
          }
        }
      }

      return result;
    },
    valueToArray(modelValue) {
      if (this.allowNegative && Object.is(modelValue, -0)) {
        return ["-", "0"];
      } else {
        return modelValue.toString().split("");
      }
    },
    keyPress($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;

      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot!
        // 45 is minus!

        if (this.allowNegative && keyCode === 45) {
          let curVal = this.humanFormat(this.modelValue);

          if (curVal == null) {
            this.cmpValue = -0;
          } else if (!curVal.includes("-")) {
            this.cmpValue = `-${curVal}`;
          }
        }
        $event.preventDefault();
      }
    },
    isInteger(modelValue) {
      let result = false;
      if (Number.isInteger(parseInt(modelValue))) {
        result = true;
      }
      return result;
    },
    focus() {
      this.$nextTick(() => {
        this.$refs.ref.focus();
      });
    },
  },
};
</script>
