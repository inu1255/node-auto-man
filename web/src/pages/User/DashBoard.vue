<template>
    <el-container>
        <el-header>
            <el-button @click="refresh" size="small">刷新</el-button>
            <div class="fr" style="line-height: 32px">
                <span style="margin-right: 7px">
                    我的邀请码:
                    <b>{{invite}}</b>
                </span>
                <span>
                    我的豆豆:
                    <b>{{(user.money-user.used_money)||0}}</b>豆
                </span>
            </div>
        </el-header>
        <el-main>
            <el-table :data="data" style="width: 100%">
                <el-table-column prop="title" label="任务名">
                </el-table-column>
                <el-table-column prop="count" label="每天消耗">
                    <span slot-scope="scope">{{ scope.row.count }}豆</span>
                </el-table-column>
                <el-table-column prop="money" label="总消耗">
                    <span slot-scope="scope">{{ scope.row.money }}豆</span>
                </el-table-column>
                <el-table-column prop="lastrun_at" label="签到时间">
                    <span slot-scope="scope">{{ scope.row.lastrun_at | fromNow }}</span>
                </el-table-column>
                <el-table-column label="操作">
                    <div slot-scope="scope">
                        <el-button @click="del(scope.row)" size="small" type="danger" plain>删除</el-button>
                    </div>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
import request from "../../utils/request";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      data: []
    };
  },
  created() {
    this.refresh();
  },
  computed: {
    ...mapGetters(["user"]),
    invite() {
      if (!this.user || !this.user.id) {
        return "";
      }
      let s = window.btoa(this.user.id);
      return s.slice(0, s.length - 2);
    }
  },
  methods: {
    async refresh() {
      this.$store.dispatch("whoami", true);
      let data = await request("/service/list-task");
      this.data = data;
    },
    async del(what) {
      await request("/service/del-task?title=" + what.title);
      let data = await request("/service/list-task");
      this.data = data;
    }
  }
};
</script>
