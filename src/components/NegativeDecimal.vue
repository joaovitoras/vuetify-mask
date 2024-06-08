<template>
  <div>
    <v-text-field
      v-model="cmpValue"
      :label="label"
      v-bind="properties"
      :maxlength="options.length + options.precision"
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
    signal: {
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
        };
      },
    },
  },
  data: () => ({
    block: false,
  }),
  /*
   v-model="cmpValue": Dessa forma, ao digitar, o valor é atualizado automaticamente no componente pai.
   O valor digitado entra pelo newValue do Set é emitido para o componente pai, retorna pelo get e pára.
  */
  computed: {
    cmpValue: {
      get: function () {
        return this.humanFormat(this.modelValue);
      },
      set: function (newValue) {
        this.$emit("update:modelValue", this.machineFormat(newValue));
      },
    },
  },
  watch: {},
  methods: {
    humanFormat: function (modelValue) {
      if (modelValue || modelValue === 0) {
        if (modelValue < 0) {
          modelValue = modelValue * -1;
          this.$emit("update:modelValue", modelValue);
          this.$emit("signal", "-");
          this.block = true;
        } else {
          if (!this.block) {
            this.$emit("signal", "+");
          }
          this.block = false;
        }
        modelValue = Number(modelValue).toLocaleString(this.options.locale, {
          maximumFractionDigits: this.options.precision,
          minimumFractionDigits: this.options.precision,
        });
      } else {
        modelValue = this.options.empty;
      }
      return modelValue;
    },

    machineFormat(modelValue) {
      if (modelValue) {
        modelValue = this.clearNumber(modelValue);
        // Ajustar quantidade de zeros à esquerda
        modelValue = modelValue.padStart(
          parseInt(this.options.precision) + 1,
          "0",
        );
        // Incluir ponto na casa correta, conforme a precisão configurada
        modelValue =
          modelValue.substring(
            0,
            modelValue.length - parseInt(this.options.precision),
          ) +
          "." +
          modelValue.substring(
            modelValue.length - parseInt(this.options.precision),
            modelValue.length,
          );
        if (modelValue === "") {
          modelValue = this.options.empty;
        }
      } else {
        modelValue = this.options.empty;
      }
      return modelValue;
    },

    // Retira todos os caracteres não numéricos e zeros à esquerda
    clearNumber: function (modelValue) {
      let result = "";
      if (modelValue) {
        let flag = false;
        let arrayValue = modelValue.toString().split("");
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
          }
        }
      }
      return result;
    },

    keyPress($event) {
      // console.log($event.keyCode); //keyCodes modelValue
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      // Positive key
      if (keyCode === 43) {
        this.$emit("signal", ""); // +
      }
      // Negative key
      if (keyCode === 45) {
        this.$emit("signal", "-");
      }
      // if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
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
      setTimeout(() => {
        this.$refs.ref.focus();
      }, 500);
    },
  },
};
</script>
