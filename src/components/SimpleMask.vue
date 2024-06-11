<template>
  <div>
    <v-text-field
      v-model="cmpValue"
      :label="label"
      v-bind="properties"
      :maxlength="options.inputMask.length"
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
          inputMask: "#########",
          outputMask: "#########",
          empty: "", // v-model modelValue when v-text-field is empty. You can use "0" or "" or null or other.
          applyAfter: true, // Apply the mask only after filling
          alphanumeric: false,
          lowerCase: false,
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
        modelValue = this.formatValue(modelValue, this.options.inputMask);
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
        // UpperCase or LowerCase
        if (this.options.lowerCase) {
          modelValue = modelValue ? modelValue.toLowerCase() : modelValue;
        } else {
          modelValue = modelValue ? modelValue.toUpperCase() : modelValue;
        }
        // Apply the mask only after filling
        if (this.options.applyAfter) {
          if (modelValue.length !== this.options.outputMask.length) {
            modelValue = this.options.empty;
          } else {
            // Event sended after filling the mask
            this.$emit("masked");
          }
        }
      } else {
        modelValue = this.options.empty;
      }
      return modelValue;
    },

    formatValue: function (modelValue, mask) {
      return this.formatDefault(modelValue, mask);
    },

    formatDefault: function (modelValue, mask) {
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
      if (!this.options.alphanumeric) {
        // console.log($event.keyCode); //keyCodes modelValue
        let keyCode = $event.keyCode ? $event.keyCode : $event.which;
        // if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        if (keyCode < 48 || keyCode > 57) {
          // 46 is dot
          $event.preventDefault();
        }
      }
    },

    clearValue: function (modelValue) {
      let result = "";
      if (modelValue) {
        let arrayValue = modelValue.toString().split("");
        for (var i = 0; i < arrayValue.length; i++) {
          if (this.isValid(arrayValue[i])) {
            result = result + arrayValue[i];
          }
        }
      }
      return result;
    },

    isValid(modelValue) {
      if (this.options.alphanumeric) {
        return this.isAlphaNumeric(modelValue);
      } else {
        return this.isInteger(modelValue);
      }
    },

    isInteger(modelValue) {
      let result = false;
      if (Number.isInteger(parseInt(modelValue))) {
        result = true;
      }
      return result;
    },

    isAlphaNumeric(modelValue) {
      let letterNumber = /^[0-9a-zA-Z]+$/;
      if (modelValue.match(letterNumber)) {
        return true;
      }
      return false;
    },

    focus() {
      setTimeout(() => {
        this.$refs.ref.focus();
      }, 500);
    },
  },
};
</script>
