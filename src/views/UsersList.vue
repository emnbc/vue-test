<template>
  <div>
    <div class="el-page-header__content">Пользователи</div>
    <div style="margin-top: 10px">
       <el-button @click="createUser()" type="primary">Create New User</el-button>
    </div>
    <el-table :data="users" stripe style="width: 100%" v-loading="loadingTable">
      <el-table-column prop="id" label="ID" width="70px"></el-table-column>
      <el-table-column prop="name" label="Name">
        <template slot-scope="scope">
          <el-button @click="openUser(scope.row)" type="text">{{ scope.row.name }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="Description"></el-table-column>
      <el-table-column prop="price" label="Price" width="100px">
        <template slot-scope="scope">{{ scope.row.price }} $</template>
      </el-table-column>
      <el-table-column width="100px">
        <template slot-scope="scope">
          <el-button @click="editUser(scope.row)">Edit</el-button>
        </template>
      </el-table-column>
      <el-table-column width="100px">
        <template slot-scope="scope">
          <el-popconfirm @confirm="deleteUser(scope.row.id)" title="Are you sure to delete this?">
            <el-button slot="reference" type="danger">Delete</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <UserModal :visible="visible" :handleClose="handleClose" :form="form" />
  </div>
</template>
<script>
  import axios from 'axios';
  import UserModal from '@/components/UserModal.vue';

  export default {
    components: {
      UserModal
    },
    data() {
      return {
        form: { id: null, name: null, desc: null, price: null },
        visible: false,
        users: [],
        loadingTable: false
      }
    },
    methods: {
      editUser(user) {
        this.form = {
          id: user.id,
          name: user.name,
          desc: user.description,
          price: user.price
        };
        this.visible = true;
        console.log(user);
      },
      createUser() {
        this.form = { id: null, name: null, desc: null, price: null }
        this.visible = true;
      },
      openUser(user) {
        this.$router.push('/users/' + user.id);
      },
      deleteUser(id) {
        console.log(id);
      },
      loadUsers() {
        this.loadingTable = true;
        axios.get('/api/pizzas').then(users => {
          this.users = users.data;
          this.loadingTable = false;
        });
      },
      handleClose() {
        this.visible = false;
      }
    },
    mounted() {
      this.loadUsers();
    }
  }
</script>
<style scoped>
 
</style>
