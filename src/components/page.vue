<template>
  <div class="page">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" background :total="total"></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 5
    },
    total: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [5, 10, 20, 50]
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('sizeChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('pageChange', val)
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  margin-top: 10px;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
  /deep/.el-pager {
    .number.active {
      background-color: #4a9dd7 !important;
    }
  }
}
</style>
