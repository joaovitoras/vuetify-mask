<template>
  <div>
    <v-text-field
      v-model="cmpValue"
      :label="label"
      v-bind="properties"
      :maxlength="options.inputMask.length"
      :append-inner-icon="modelValue ? 'mdi-check-circle' : ''"
      :success="modelValue ? true : false"
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
import moment from "moment";

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
          inputMask: "YYYY-MM-DD HH:mm:ss",
          empty: "",
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
        modelValue = moment(this.toDate(this.toInteger(modelValue))).format(
          this.options.inputMask,
        );
      } else {
        modelValue = this.options.empty;
      }
      return modelValue;
    },

    machineFormat(modelValue) {
      if (modelValue) {
        modelValue = this.formatValue(modelValue, this.options.inputMask);
        if (modelValue === "") {
          modelValue = this.options.empty;
        } else {
          // Apply the mask only only after filling
          if (modelValue.length !== this.options.inputMask.length) {
            modelValue = this.options.empty;
          } else {
            let stringDate = moment(modelValue, this.options.inputMask).format(
              "YYYY-MM-DD HH:mm:ss",
            );
            modelValue = this.toMillisecond(stringDate);
            if (!modelValue) {
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
      return this.formatDate(modelValue, mask);
    },

    formatDate: function (modelValue, mask) {
      modelValue = this.clearValue(modelValue);
      let result = "";
      let count = 0;
      if (modelValue) {
        let arrayValue = modelValue.toString().split("");
        let arrayMask = mask.toString().split("");
        for (var i = 0; i < arrayMask.length; i++) {
          if (i < arrayValue.length + count) {
            if (
              arrayMask[i].toLowerCase().includes("y") ||
              arrayMask[i].toLowerCase().includes("m") ||
              arrayMask[i].toLowerCase().includes("d") ||
              arrayMask[i].toLowerCase().includes("h") ||
              arrayMask[i].toLowerCase().includes("m") ||
              arrayMask[i].toLowerCase().includes("s")
            ) {
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

    toInteger(modelValue) {
      return Number.parseInt(modelValue);
    },

    /* String Date to Milliseconds */
    toMillisecond: function (modelValue) {
      return Date.parse(modelValue);
    },

    /* Milliseconds to Date*/
    toDate: function (modelValue) {
      return new Date(modelValue); // Return String
    },

    focus() {
      setTimeout(() => {
        this.$refs.ref.focus();
      }, 500);
    },
  },
};
</script>
