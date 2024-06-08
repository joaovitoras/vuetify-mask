import { config } from "@vue/test-utils";

import { VTextField } from "vuetify/components";
import { createVuetify } from "vuetify";

const vuetify = createVuetify({
  components: { VTextField },
});

config.global.plugins.push(vuetify);
