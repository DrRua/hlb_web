<template>
  <el-container class="container">
    <el-header class="header" height="">
      <el-form :inline="true" class="search-bar-form">
        <el-form-item label="产品名称">
          <el-input v-model="Name" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="合同号">
          <el-input v-model="SaleNo" placeholder="请输入合同号" />
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
        <el-table-column label="任务单号" width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.FProduceTaskNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="合同号" width="95">
          <template slot-scope="scope">
            {{ scope.row.FSaleNo }}
          </template>
        </el-table-column>
        <el-table-column label="产品名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.FName }}
          </template>
        </el-table-column>
        <el-table-column label="计划数" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.FProduceNumber }}
          </template>
        </el-table-column>
        <el-table-column label="成型数" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.FCxReportNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="未成型数" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.FWCxReportNumber }}
          </template>
        </el-table-column>
        <el-table-column label="上轴数" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.FSyReportNumber }}
          </template>
        </el-table-column>
        <el-table-column label="待上轴数" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.FWSyReportNumber }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="110" align="center">
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
