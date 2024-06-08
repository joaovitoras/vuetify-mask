<template>
  <div>
    <v-text-field
      v-model="cmpValue"
      :label="label"
      v-bind="properties"
      :maxlength="options.length"
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
          length: 10,
          empty: "",
          applyAfter: false,
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
        modelValue = this.formatValue(modelValue);
      } else {
        modelValue = this.options.empty;
      }
      return modelValue;
    },

    machineFormat(modelValue) {
      if (modelValue) {
        modelValue = this.formatValue(modelValue);
        if (modelValue === "") {
          modelValue = this.options.empty;
        }
        // Apply the mask only only after filling
        if (this.options.applyAfter) {
          if (modelValue.length !== this.options.length) {
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

    formatValue: function (modelValue) {
      return modelValue;
    },

    keyPress($event) {
      // console.log($event.keyCode); //keyCodes modelValue
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // if (keyCode < 48 || keyCode > 57) {
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
  },
};
</script>
