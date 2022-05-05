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

<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Users"
        :rows="userList.data"
        :columns="columns"
        row-key="username"
        :pagination="initialPagination"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';

import { IUser } from 'src/components/models/user';

const columns = [
  {
    name: 'id',
    align: 'left',
    label: 'id',
    field: 'id',
    sortable: true,
  },
  {
    name: 'username',
    align: 'left',
    label: 'username',
    field: 'username',
    sortable: true,
  },
  {
    name: 'email',
    align: 'left',
    label: 'email',
    field: 'email',
    sortable: true,
  },
];

export default {
  name: 'UsersIndex',
  data() {
    return {};
  },
  setup() {
    let userList = ref<IUser[]>([]);
    async function getUserList() {
      // userList.value = await listUser();
    }
    onMounted(() => {
      void getUserList();
    });
    return {
      columns,
      userList,
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 10,
      },
    };
  },
};
</script>
