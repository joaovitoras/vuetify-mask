import { config } from "@vue/test-utils";

import { VTextField } from "vuetify/components";
import { createVuetify } from "vuetify";
import { cleanup } from "@testing-library/vue";
import { afterEach } from "vitest";

const vuetify = createVuetify({
  components: { VTextField },
});

config.global.plugins.push(vuetify);

afterEach(() => {
  cleanup();
});
