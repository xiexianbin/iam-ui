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
// import { listUser } from 'src/rest/users';

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
