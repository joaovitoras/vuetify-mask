<template>
  <div>
    <v-text-field
      v-model="cmpValue"
      :label="label"
      v-bind="properties"
      :maxlength="inputMask.length"
      :append-inner-icon="
        options.applyAfter && modelValue ? 'mdi-check-circle' : ''
      "
      :success="options.applyAfter && modelValue ? true : false"
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
          outputMask: "##############",
          empty: "",
          applyAfter: false,
        };
      },
    },
  },
  data: () => ({
    inputMask: "##.###.###/####-##",
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
      if (modelValue) {
        modelValue = this.formatValue(modelValue, this.inputMask);
      } else {
        modelValue = this.options.empty;
      }
      return modelValue;
    },

    machineFormat(modelValue) {
      if (modelValue) {
        modelValue = this.formatValue(modelValue, this.options.outputMask);
        if (modelValue === "") {
          modelValue = this.options.empty;
        }
        // Apply the mask only only after filling
        if (this.options.applyAfter) {
          if (modelValue.length !== this.options.outputMask.length) {
            modelValue = this.options.empty;
          } else {
            if (!this.validateCnpj(modelValue)) {
              modelValue = this.options.empty;
            } else {
              // Event sended after filling the mask
              this.$emit("masked");
            }
          }
        }
      } else {
        modelValue = this.options.empty;
      }
      return modelValue;
    },

    formatValue: function (modelValue, mask) {
      return this.formatCnpj(modelValue, mask);
    },

    formatCnpj: function (modelValue, mask) {
      modelValue = this.clearValue(modelValue);
      let result = "";
      let count = 0;
      if (modelValue) {
        let arrayValue = modelValue.toString().split("");
        let arrayMask = mask.toString().split("");
        for (var i = 0; i < arrayMask.length; i++) {
          if (i < arrayValue.length + count) {
            if (arrayMask[i] === "#") {
              result = result + arrayValue[i - count];
            } else {
              result = result + arrayMask[i];
              count++;
            }
          }
        }
      }
      return result;
    },

    keyPress($event) {
      // console.log($event.keyCode); //keyCodes modelValue
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      // if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
    },

    clearValue: function (modelValue) {
      let result = "";
      if (modelValue) {
        let arrayValue = modelValue.toString().split("");
        for (var i = 0; i < arrayValue.length; i++) {
          if (this.isInteger(arrayValue[i])) {
            result = result + arrayValue[i];
          }
        }
      }
      return result;
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

    validateCnpj: function (cnpj) {
      cnpj = cnpj.replace(/[^\d]+/g, "");
      if (cnpj == "") return false;
      if (cnpj.length != 14) return false;
      // Elimina CNPJs invalidos conhecidos
      if (
        cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999"
      )
        return false;
      // Valida DVs
      let tamanho = cnpj.length - 2;
      let numeros = cnpj.substring(0, tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(0)) return false;
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(1)) return false;
      return true;
    },
  },
};
</script>
