<template>
  <el-container class="container">
    <el-header class="header" height="">
      <el-form :inline="true" class="search-bar-form">
        <el-form-item label="Name">
          <el-input v-model="Name" placeholder="Name" />
        </el-form-item>
        <el-form-item label="SaleNo">
          <el-input v-model="SaleNo" placeholder="SaleNo" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="onClear">清空</el-button>
          <el-button type="primary" @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main height="">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="FSaleNo" width="95">
          <template slot-scope="scope">
            {{ scope.row.FSaleNo }}
          </template>
        </el-table-column>
        <el-table-column label="FProduceTaskNo" width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.FProduceTaskNo }}
          </template>
        </el-table-column>
        <el-table-column label="FCxReportNumber" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.FCxReportNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="FName" align="center">
          <template slot-scope="scope">
            {{ scope.row.FName }}
          </template>
        </el-table-column>
        <el-table-column label="FProduceNumber" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.FProduceNumber }}
          </template>
        </el-table-column>
        <el-table-column label="FSyReportNumber" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.FSyReportNumber }}
          </template>
        </el-table-column>
        <el-table-column label="FWCxReportNumber" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.FWCxReportNumber }}
          </template>
        </el-table-column>
        <el-table-column label="FWSyReportNumber" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.FWSyReportNumber }}
          </template>
        </el-table-column>
        <el-table-column label="FWSyReportNumber" width="110" align="center">
          <template slot-scope="scope">
            <div class="check-detail" @click="goDetail(scope.row)">查看</div>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="footer" height="">
      <el-pagination
        :total="totalNum"
        :current-page="pageIndex"
        layout="total, prev, pager, next, jumper"
        background
        @current-change="currentChange"
      />
    </el-footer>
  </el-container>
</template>

<script>
import { GetOperationSummary } from '@/api/user'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      totalNum: 0,
      listLoading: true,
      Name: '',
      SaleNo: '',
      pageIndex: 1
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取全部工序
    getList() {
      GetOperationSummary(this.Name, this.SaleNo, this.pageIndex).then((res) => {
        this.listLoading = false
        this.list = res.List
        this.totalNum = res.Count
      })
    },
    // 换页
    currentChange(e) {
      this.pageIndex = e
      this.listLoading = true
      this.getList()
    },
    onClear() {
      this.Name = ''
      this.SaleNo = ''
    },
    goDetail(data) {
      console.log('', this.$router)
      this.$router.push({
        path: '/detail',
        params: {
          ...data
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.container{
  height: 100%;
  .header{
    height: auto;
    padding: 15px;
    border-bottom: 1px solid #f5f5f5;

    .search-bar-form{
      .el-form-item{
        margin: 0 20px 0 0;
      }
    }
  }
  .check-detail{
    color: skyblue;
    cursor: pointer;
  }
  .footer{
    padding: 10px;
    border-top: 1px solid #f5f5f5;
  }
}
</style>
