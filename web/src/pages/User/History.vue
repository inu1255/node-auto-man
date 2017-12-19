<template>
  <el-container>
    <el-header>
      <span v-show="user&&user.port">
        <div class="stop">{{(user||{}).port}}</div>
        <el-button @click="stop" size="small">停止</el-button>
      </span>
      <span v-show="!user||!user.port">
        <el-button @click="start" size="small">开始</el-button>
      </span>
      <el-button @click="refresh" size="small">刷新</el-button>
      <el-button @click="clear" size="small">清空</el-button>
      <el-input class="add" placeholder="请输入标题" v-model="title" size="small">
        <el-button @click="add" slot="append">添加任务</el-button>
      </el-input>
    </el-header>
    <el-container>
      <el-aside>
        <el-tree :data="data" @node-click="selectNode" show-checkbox ref="tree" node-key="id"></el-tree>
      </el-aside>
      <el-main>
        <HttpCard :info="info"></HttpCard>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import request from "../../utils/request";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      data: [],
      info: false,
      title: ""
    };
  },
  created() {
    this.refresh();
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    async refresh() {
      let data = await request("/service/history-tree");
      this.data = data;
    },
    async start() {
      let data = await request("/service/start");
      this.$set(this.user, "port", data.port);
      let host = location.host.split(":")[0]
      this.$alert("请连接代理: http://"+host+":"+data.port, "代理信息");
    },
    async stop() {
      await request("/service/stop");
      this.user.port = 0;
    },
    async selectNode(a, b, c) {
      if (!a.id) return
      if (!a.data) {
        a.data = await request("/service/history?id=" + a.id);
      }
      console.log(a.data)
      this.info = a.data;
    },
    async add() {
      let ids = this.$refs.tree.getCheckedKeys();
      if (!ids||!ids.length) {
        this.$message.error("请勾选任务")
        return;
      }
      if (!this.title) {
        this.$message.error("请输入任务名")
        return;
      }
      await request("/service/add-task", { ids, title: this.title });
      this.tilte = ""
      this.$message.success("添加成功")
      this.refresh();
    },
    async clear() {
      await request("/service/clear");
      this.refresh();
    }
  }
};
</script>

<style lang="less" scoped>
.stop {
  float: left;
  line-height: 32px;
  margin-right: 0.5rem;
}
.add {
  float: right;
  width: 50%;
}
</style>

