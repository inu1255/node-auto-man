<template>
    <el-collapse value="5" v-if="info">
        <div>
            <b style="margin-right: 1rem;">{{info.method}}</b>
            <span>{{info.url}}</span>
        </div>
        <el-collapse-item title="请求头" name="2">
            <div>{{info.req_header}}</div>
        </el-collapse-item>
        <el-collapse-item v-show="info.req_body" title="请求body" name="3">
            <div>{{req_body}}</div>
        </el-collapse-item>
        <el-collapse-item title="响应头" name="4">
            <div>{{info.res_header}}</div>
        </el-collapse-item>
        <el-collapse-item title="响应body" name="5">
            <div>{{res_body}}</div>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
import pako from 'pako'

export default {
  props: {
      info:{
          default: false
      }
  },
  computed:{
      req_body(){
          if (!this.info||!this.info.req_body) return ""
          if (typeof this.info.req_header==="string") {
              this.info.req_header = JSON.parse(this.info.req_header)
          }
          let body = window.atob(this.info.req_body)
        //   if (/gzip/.test(this.info.req_header["accept-encoding"])) {
        //       body = pako.inflate(body)
        //   }
          return body
      },
      res_body(){
          if (!this.info) return ""
          if (typeof this.info.res_header==="string") {
              this.info.res_header = JSON.parse(this.info.res_header)
          }
          let body = window.atob(this.info.res_body)
        //   if (this.info.res_header["content-encoding"]=="gzip") {
        //       body = new TextDecoder("utf-8").decode(pako.inflate(body));
        //   }
          return body
      }
  }
}
</script>

