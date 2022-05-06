// Copyright 2022 me@xiexianbin.cn. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Notify } from 'quasar';

export function showMessage(type: string, text: string) {
  console.log(type, text)

  if (type === 'success' || type === 'info' || type === 'ok') {
    Notify.create({
      message: text,
      color: 'positive'
    })
  } else if (type === 'error') {
    Notify.create({
      message: text,
      color: 'negative'
    })
  } else {
    Notify.create({
      message: text,
      color: 'warning'
    })
  }
}
