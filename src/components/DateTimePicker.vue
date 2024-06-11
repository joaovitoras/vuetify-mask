<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      offset="40"
      transition="scale-transition"
      data-app="true"
      location="right"
    >
      <template #activator="{ props }">
        <v-text-field
          v-model="compShow"
          :label="label"
          v-bind="{
            ...props,
            ...properties,
          }"
          @click:append="(menu = true), (activeTab = 1)"
          @click:clear="menu = false"
        ></v-text-field>
      </template>
      <v-card>
        <v-tabs v-model="activeTab" :bg-color="options.tabBackgroundColor">
          <v-tab :value="0">
            <v-icon start>mdi-calendar-outline</v-icon>
            {{ options.tabDateTitle }}
          </v-tab>
          <v-tab :value="1">
            <v-icon start>mdi-calendar-clock</v-icon>
            {{ options.tabTimeTitle }}
          </v-tab>
        </v-tabs>

        <v-card-text>
          <v-tabs-window v-model="activeTab">
            <v-tabs-window-item :value="0">
              <v-date-picker
                hide-header=""
                v-model="modDate"
                @change="closingControl(), emit()"
              ></v-date-picker>
            </v-tabs-window-item>

            <v-tabs-window-item :value="1">
              <v-time-picker
                landscape
                ref="refTimePicker"
                format="24hr"
                v-model="modTime"
                :color="options.tabBackgroundColor"
                :use-seconds="options.useSeconds"
                @change="(menu = false), emit()"
                :disabled="formattedDate === null || formattedDate === ''"
              >
              </v-time-picker>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    modelValue: {
      type: [Number, String],
      default: 0,
    },
    label: {
      type: String,
      default: "Label",
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
        return {};
      },
    },
  },
  data: () => ({
    modDate: "",
    modTime: "00:00",
    formattedDate: "",
    menu: false,
    readonly: true,
    activeTab: null,
  }),
  computed: {
    compShow: {
      get: function () {
        const THIS = this;
        let mdf = this.modelValue
          ? (THIS.formattedDate = moment(new Date(this.modelValue)).format(
              this.options.format,
            ))
          : "";
        let mt = this.modelValue
          ? (THIS.modTime = moment(new Date(this.modelValue)).format(
              this.options.useSeconds ? "HH:mm:ss" : "HH:mm",
            ))
          : "";
        return mdf + " " + mt;
      },
      set: function () {
        const THIS = this;
        THIS.modDate = null;
        THIS.modTime = this.options.useSeconds ? "00:00:00" : "00:00";
        THIS.formattedDate = null;
        this.$emit("update:modelValue", null);
      },
    },
  },
  watch: {
    // When computed.compShow.formattedDate is changed:
    formattedDate() {
      return this.modelValue
        ? (this.modDate = moment(new Date(this.modelValue)).format(
            "YYYY-MM-DD",
          ))
        : null;
    },
    // Open always on date tab and selected hour
    menu() {
      if (!this.menu) {
        this.activeTab = 0;
        if (this.$refs.refTimePicker) {
          this.$refs.refTimePicker.selectingHour = true;
        }
      }
    },
  },
  methods: {
    emit() {
      this.$emit(
        "update:modelValue",
        this.stringToMillisecond(this.modDate, this.modTime),
      );
    },
    stringToMillisecond: function (date, time) {
      return Date.parse(date + " " + time);
    },
    closingControl() {
      if (this.options.closeOnDateClick === true) {
        this.menu = false;
      } else {
        this.activeTab = 1;
      }
    },
  },
};
// Str to milli
// var d = Date.parse(date);
// milli to date
// this.date = new Date(d);
</script>
