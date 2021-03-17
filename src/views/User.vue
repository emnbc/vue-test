<template>
  <div>
    <el-page-header @back="goBack" :content="'Отчеты пользователя №' + $route.params.id"></el-page-header>
    <el-table :data="reports" stripe style="width: 100%" v-loading="loadingTable">
      <el-table-column prop="id" label="ID" width="70px"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="description" label="Description"></el-table-column>
      <el-table-column prop="price" label="Price" width="100px">
        <template slot-scope="scope">{{ scope.row.price }} $</template>
      </el-table-column>
      <el-table-column width="100px">
        <template slot-scope="scope">
          <el-button @click="editReport(scope.row)">Edit</el-button>
        </template>
      </el-table-column>
      <el-table-column width="100px">
        <template slot-scope="scope">
          <el-popconfirm @confirm="deleteReport(scope.row.id)" title="Are you sure to delete this?">
            <el-button slot="reference" type="danger">Delete</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      reports: [],
      loadingTable: false
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    loadReports() {
      this.loadingTable = true;
      axios.get('/api/pizzas', {
        params: {
          // user: this.$route.params.id // так можно передать параметры запроса
        }
      }).then(reports => {
        this.reports = reports.data;
        this.loadingTable = false;
      });
    },
    editReport(report) {
      console.log('editReport', report);
    },
    deleteReport(reportId) {
      console.log('deleteReport', reportId);
    }
  },
  mounted() {
    this.loadReports();
  }
}
</script>
