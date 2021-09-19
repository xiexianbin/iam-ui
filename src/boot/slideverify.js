import { boot } from 'quasar/wrappers'

import SliderVerify from 'slider-verify-v3'
import 'slider-verify-v3/lib/SliderVerify.css'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
// eslint-disable-next-line @typescript-eslint/require-await
export default boot(({ app }) => {
  app.use(SliderVerify);
})
