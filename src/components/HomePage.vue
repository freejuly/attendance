<template> 
    <div class="toogle">   
      <!-- 加载loader -->  
       <r-loader double :show="double"></r-loader>
       <r-loader bar :show="bar"></r-loader>
       <!-- 顶部+部门日期选择 -->
       <r-card>
        <r-card-row  class="green darken-1;" height="20px">
          <r-card-title class="white-text">嘉乐智能科技股份有限公司出勤日报</r-card-title>
        </r-card-row>
        <r-card-text>
          <r-card-row height="40px"> 
              <div v-show="formText" style="display: flex;margin:0 0 10px 0">
                <!--选择查看的部门-->
                <el-cascader style="width:300px;margin:5px 0px 0 5px;" :options="options" v-model="selectedKeys"
                :props="{checkStrictly:true}" :filterable="true" clearable  @change="handleChange">
                  <template slot-scope="{ node, data }" >
                    <span>{{ data.label }}</span>
                    <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                  </template>
                </el-cascader> 
                <!-- 选择日期 -->
                <el-date-picker  style="margin:5px 5px 0 5px;height: 42px;" v-model="checkDate" type="date" placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
                <!-- <el-button style="margin:0 0 0 10px" :size="daxiao" type="primary" plain @click="getTable">确认</el-button> -->
                <span @click="ToView" style="max-height:40px;margin: auto 0 auto 5px;">  
                  <r-btn class="white black-text"  large v-wave="{color:'purple'}">搜索</r-btn>
                </span>

                <!-- <span @click="TheAdministrator()" style="max-height:40px;margin: auto 0 auto 30px;">  
                  <r-btn class="white black-text"  large v-wave="{color:'purple'}">查看权限</r-btn>
                </span> -->
            </div> 
          </r-card-row>
        </r-card-text>
      </r-card>
    <el-card style="height:calc(100vh - 145px);"> 

    <!-- 表单区域 -->
    <!-- 表单区域控制表单大小 -->
    <el-radio-group v-model="daxiao"  v-show="sj" style="margin:0 0 20px 0 ">
      <el-radio label="" name="defualt">默认</el-radio>
      <el-radio label="medium" name="medium">中等</el-radio>
      <el-radio label="small" name="small">小型</el-radio>
      <el-radio label="mini" name="mini">超小</el-radio>
    </el-radio-group>
    <div style="padding:5px;"></div>
    <!-- 表单 -->
    
    <!-- 底部合计 -->
    <!-- <el-table  v-show="sj" :size="daxiao" class="header_warp"  v-loading="loading"  :data="attendanceSum" border height="90" style="width: 100%;margin: -20px 0 0 0;">  
      <el-table-column :label="'部门  -----    报表日期：' + date" width="300" align="center">
        <template>
          合计
        </template>
      </el-table-column>
      <el-table-column prop="" label="应到人数"  style="width: 100%;" align="center">
        <template slot-scope="scope">
          <div style="font-weight: 700;font-size: 14px;">{{scope.row.expected}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="actual" label="实到人数" style="width: 100%;" align="center">
        <template slot-scope="scope">
          <el-tooltip placement="right-end" effect="light">
            <div slot="content">
              补卡：{{ scope.row.actual_cio }}
              <br />
              调休：{{ scope.row.actual_st }}
              <br />
              出差：{{ scope.row.actual_obt }}
            </div>
              <r-tag rect class="blue white-text" plain style="font-weight: 700;font-size: 14px;">{{ scope.row.actual }}</r-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column  label="间接人数" style="width: 100%;" align="center">
        <template slot-scope="scope">
          <div style="font-weight: 700;font-size: 14px;">{{scope.row.actual_IndirectLabor}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="直接人数" style="width: 100%;" align="center">
        <template slot-scope="scope">
          <div style="font-weight: 700;font-size: 14px;">{{scope.row.actual_DirectLabor}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="直接辅助人数" style="width: 100%;" align="center">
        <template slot-scope="scope">
          <div style="font-weight: 700;font-size: 14px;">{{scope.row.actual_DirectSupportLabor}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="请假人数" style="width: 100%;" align="center">
        <template slot-scope="scope">
          <div style="font-weight: 700;font-size: 14px;">{{scope.row.numAbsence}}</div>
        </template>
      </el-table-column>
      <el-table-column label="出勤率" style="width: 100%;" align="center">
          <template slot-scope="scope">
            <div style="font-weight: 700;font-size: 14px;">{{ scope.row.ratio }}%</div>
          </template>
      </el-table-column> 
      <el-table-column label="操作" width="100" align="center">
          <template>  
            <el-button icon="el-icon-s-finance" :size="daxiao" @click="exportEx()">导出</el-button>
          </template>
      </el-table-column>
       <el-table-column label="" width="17" align="center" v-if="tableData.length>9"></el-table-column>
    </el-table> -->

    <el-table v-show="sj"   v-loading="loading" :element-loading-text="text"
    ref="multipleTable" @selection-change="handleSelectionChange" tooltip-effect="dark"
    :data="tableData" style="width: 100%;margin-bottom: 20px;" :size="daxiao" height="700"
    border :indent="40" :highlight-current-row="true" :fit="true"
    default-expand-all :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" row-key="id">
      <el-table-column label="合计" align="center">
          <!-- <el-table-column  type="selection" width="50" ></el-table-column>  -->
        <el-table-column prop="department" :label="'部门  -----    报表日期：' + date" width="300"></el-table-column>
      </el-table-column> 

      <el-table-column :label="attendanceSum.length>0? attendanceSum[0].expected:''" align="center">
          <!-- <el-table-column  type="selection" width="50" ></el-table-column>  -->
        <el-table-column prop="expected" label="应到人数" style="width: 100%;" align="center"></el-table-column>
      </el-table-column> 
      
      <el-table-column :label="attendanceSum.length>0? attendanceSum[0].actual:''" align="center">  
        <el-table-column label="实到人数" style="width: 100%;" align="center">
          <template slot-scope="scope">
            <el-tooltip placement="right-end" effect="light">
              <div slot="content">
                补卡：{{ scope.row.actual_cio }}
                <br />
                调休：{{ scope.row.actual_st }}
                <br />
                出差：{{ scope.row.actual_obt }}
              </div> 
              <div>
                <r-tag rect class="blue white-text">{{ scope.row.actual }}</r-tag>
              </div>
              <!-- <el-tag size="medium" type="info" style="width:100%">{{ scope.row.actual }}</el-tag> -->
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table-column> 
      <el-table-column :label="attendanceSum.length>0? attendanceSum[0].actual_IndirectLabor:''" align="center">
          <!-- <el-table-column  type="selection" width="50" ></el-table-column>  -->
        <el-table-column prop="actual_IndirectLabor" label="间接人数" style="width: 100%;" align="center"></el-table-column>
      </el-table-column> 
      <el-table-column :label="attendanceSum.length>0? attendanceSum[0].actual_DirectLabor:''" align="center"> 
      <el-table-column prop="actual_DirectLabor" label="直接人数" style="width: 100%;" align="center"></el-table-column>
      </el-table-column>  
      <el-table-column :label="attendanceSum.length>0? attendanceSum[0].actual_DirectSupportLabor:''" align="center">
        <el-table-column prop="actual_DirectSupportLabor" label="直接辅助人数" style="width: 100%;" align="center"></el-table-column> 
      </el-table-column>
      <el-table-column :label="attendanceSum.length>0? attendanceSum[0].numAbsence:''" align="center">
        <el-table-column prop="numAbsence" label="请假人数" style="width: 100%;" align="center"></el-table-column>
      </el-table-column> 
      <el-table-column :label="attendanceSum.length>0? attendanceSum[0].ratio+'%':''" align="center">
        <el-table-column label="出勤率" style="width: 100%;" align="center">
          <template slot-scope="scope">{{ scope.row.ratio }}%</template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="" align="center">
        <template slot="header">
            <el-button icon="el-icon-s-finance" :size="daxiao" @click="exportEx()">导出</el-button>
        </template>
        <el-table-column label="人员" width="100" align="center"> 
          <template slot-scope="prop">
            <el-button size="mini"  icon="el-icon-user" plain @click="txt(prop.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table-column>
      
    </el-table> 
    <!-- 表单不显示的时候显示这个 -->
      <el-empty v-show="!sj" :description="text"></el-empty>
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible" width="50%">
      <!-- <div v-for="(item,index) in txtdialogFormVisible" :key="index">{{item}}</div> -->
      <el-table :data="txtdialogFormVisible" border height="50vh">
        <el-table-column  type="expand" width="30">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item style="margin:0 0 0 20px" label="打卡记录"> 
              <div v-if="props.row.clockInOutTimeText">
                <span v-for="(item,index) in props.row.clockInOutTimeText.split(',')" :key="index">
                  <div>{{item}}</div>
                </span> 
              </div>
              <div v-else>暂无</div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
        <el-table-column property="remark" label="状态" align="center" style="width:50%"></el-table-column>
        <el-table-column property="userName" label="姓名" align="center" style="width:50%"></el-table-column>
        <el-table-column property="userCode" label="工号" align="center" style="width:50%"></el-table-column>
      </el-table>
    </el-dialog>

     
    <!-- <el-dialog
      title="管理权限"
      :visible.sync="centerDialogVisible"
      width="40%"
      center>
      <span>
        <table class="bordered  highlight  responsive-table centered">
            <thead>
              <tr>
                  <th>姓名</th>
                  <th>工号</th>
                  <th>操作</th>
              </tr>
            </thead>

            <tbody v-for="(i,index) in administrator" :key="index">
              <tr>
                <td>{{i.name}}</td>
                <td>{{i.code}}</td>
                <td width="100px" @click="DeleteAdministrator(i.id)">
                  <r-btn error >
                    <r-icon>delete</r-icon>删除
                  </r-btn>
                </td>
              </tr>
            </tbody>
        </table>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->

  </div>
</template>

<script>
const url = "http://api.careline.ltd:8083/"
// const url = "http://172.18.56.24:8089/"
import * as XLSX from "xlsx";
export default {
  data() {
    return {
      // 加载
      // 判断空状态和表格的一个变量，有表格数据时为false，没有为true
      sj: true, 
      // 第一次进入页面时加载此布尔
      double: false,
      // 加载管理员
      bar:false,
      // 表格的加载提示
      loading: true,
      // 表格的加载提示文字
      text: "数据正在加载",
      // 弹窗
      dialogFormVisible: false,
      // 弹窗
      centerDialogVisible:false, 
      // 时间
      date: "",
      // 顶部选择查看日期的时间
      checkDate: "", 
      val:"",
      // 表格中显示的数据
      tableData: [],
      // 表格下的合计数据
      attendanceSum:[],
      // 控制表单大小
      daxiao: "small",
      // 控制顶部选择部门日期的变量，加载数据时隐藏顶部信息，加载完毕显示顶部信息
      formText:true,
      // 点击查看员工打卡信息的数据数组
      txtdialogFormVisible: [],
      // 选择器数据
      selectedKeys: [], 
      // 选择部门的数组
      options: [],
      // 工号
      code:"",
      administrator:[],
    }
  },
  created() {
    let params = JSON.parse(this.$Base64.decode(this.$route.query.info))
    this.code = params.code 
    //日期转yyyy-MM-dd
    var date = new Date()
    var y = 1900 + date.getYear()
    var m = '0' + (date.getMonth() + 1)
    var d = '0' + date.getDate()
    this.checkDate = y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length)
    this.bar=true
    //this.bar= false
    setTimeout( ()=> {
        this.bar= false
    },1000)
    this.getTable()
    this.getOption() 
  },
  // updated(){
  //   console.log("sasas");
  //   this.getOption()
  // },		 
  watch: {
   // 如果 `checkDate` 发生改变，这个函数就会运行
		checkDate() {
      this.options = []
      console.log("日期发生改变，重新请求部门数据");
      this.getOption();
		}
	},
  methods: {
    // showLoader(){
    //     this.double=true
    //     setTimeout( ()=> {
    //         this.double= false
    //       }, 1500)
    //     },
    ToView(){
      this.text = "正在请求中!!!"
      setTimeout(() => { 
        this.getTable()
      }, 1000);
    },
    // 级联选择器选择的数据值
    handleChange(){
      // console.log(this.selectedKeys)
      // 选择的值只取最后一个value 
      if (this.selectedKeys.length == 0) {
        return
      }
      this.val =  this.selectedKeys[this.selectedKeys.length - 1] 
      console.log(this.val)
    },
    getTable() {
      // console.log(this.val);
      // console.log(this.checkDate);
      if(this.val==""||this.checkDate==""){  
          // this.$alert(`<strong>请选择查看部门和查看日期</strong>`, {
          //   dangerouslyUseHTMLString: true
          // }); 
          this.text = "请选择查看部门和查看日期"
          this.sj = false
        return
      }  
      this.loading = true
      this.formText = false
      this.text = "正在请求中，如数据量过大请耐心等候"
      // this.axios.get("http://172.18.56.24:8089/api/v1/attendance/daily/single?date=2022-04-01&department=3001").then(res => {
      this.axios.get(url+"api/v1/attendance/daily/single?date="+this.checkDate+"&department="+this.val+"&requester="+this.code).then(res => {
        if (res.data.code == 0) {
          setTimeout(() => {
            this.sj = true
            this.loading = false
            this.formText = true
            this.tableData = res.data.data.attendances
            this.date = res.data.data.checkDate
            this.attendanceSum = res.data.data.attendanceSum 
          }, 1000);
          this.text = "数据加载完毕!!!"
        } else {
          // this.$alert(`<strong>'${res.data.msg}'</strong>`, {
          //   dangerouslyUseHTMLString: true
          // }); 
          this.text = res.data.msg
          this.sj = false
          this.loading = false
          this.formText = true
        }
      })
 
    },
    // 级联选择器中的部门结构数据
    getOption() {
      this.axios.get(url+"api/v1/attendance/daily/department-tree?date="+this.checkDate+"&requester="+this.code).then(res => {
        if (res.data.code==0) {
        this.options = res.data.data
        }
      })
    }, 
    // 点击查看获取到这一行表格的row值
    txt(value) {
      // 将row值赋值给this.txtdialogFormVisible
      this.txtdialogFormVisible = value._records
      // 打开查看人员状态数据的表格弹窗
      this.dialogFormVisible = true
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    }, 
    exportEx() {
        this.$confirm('此操作将导出该文件(xlsx), 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.get(url+"api/v1/attendance/daily/single/export?date="+this.checkDate+"&department="+this.val+"&requester="+this.code).then(res=>{
            const exportTabel = res.data  
            const val = [];         
            var date = new Date()                   
            val.push([
                "部门","应到人数","实到人数","间接人数",
                "直接人数","直接辅助人数","请假人数","出勤率","考勤日期","导出日期",
            ]); 
            exportTabel.map(r=>{
                let ts = [
                r.department,
                r.expected,
                r.actual,
                r.actual_IndirectLabor,
                r.actual_DirectLabor,
                r.actual_DirectSupportLabor,
                r.numAbsence, 
                r.ratio+"%",
                this.date,
                date,
                ]
                val.push(ts)
            }) 
            const fileName =this.date+"出勤日报.xlsx";
            let workbook = XLSX.utils.book_new(),
            sheet = "Sheet1",
            body = XLSX.utils.aoa_to_sheet(val);
            XLSX.utils.book_append_sheet(workbook, body, sheet);
            XLSX.writeFile(workbook, fileName); 
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消导出'
          });          
        });  
    },
    // TheAdministrator(){
    //   this.bar=true
    //   this.axios.get(url+"api/v1/attendance/daily/visitor/list?requester="+this.code).then(res=>{
    //     if(res.data.code == 0){
    //       this.administrator = res.data.data
    //     }else{ 
    //       this.centerDialogVisible = false
    //       this.$message.error(res.data.msg);
    //       return 
    //     }
    //   })
    //   setTimeout( ()=> {
    //       this.bar= false
    //       this.centerDialogVisible = true 
    //   },1000)
    // },
    // getTheAdministrator(){
    //    this.axios.get(url+"api/v1/attendance/daily/visitor/list?requester="+this.code).then(res=>{
    //       this.administrator = res.data.data
    //     })
    // },
    // DeleteAdministrator(row){
    //    this.$confirm('此操作将永久删除此人员, 是否继续?', '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'error'
    //     })
    //     .then(() => {
    //         this.axios.delete(url+"/api/v1/accountsreceivable/delete/"+row.id+"?requester="+this.code).then(res=>{
    //             if(res.data.code==0){
    //                 this.getTheAdministrator()
    //                 this.$message({
    //                     type: 'success',
    //                     message: res.data.msg
    //                 }); 
    //             }else{
    //                 this.$message({
    //                     type: 'error',
    //                     message: res.data.msg
    //                 });
    //             }
    //         })
    //     })
    //     .catch(() => {
    //         this.$message({
    //             type: 'info',
    //             message: '已取消删除'
    //         });          
    //     });
    // },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
  }
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style > 
.header_warp thead{
  display: none;
}
.showclass{
  display: none;
}
.bbrq {
  font-weight: 700;
  margin: 0 0 10px 0;
  color: rgb(95, 97, 99);
}
.el-cascader-menu__wrap {
  height: auto!important;
  overflow-x:hidden;overflow-y:hidden;
  padding: 5px 10px 5px 0 ;
}
.el-cascader-menu{
  height: auto!important;
  overflow-x:hidden;overflow-y:hidden;
  padding: 5px 10px 5px 0 ;
}
.el-cascader-panel{
  height: auto!important;
  overflow-x:hidden;overflow-y:hidden;
  padding: 5px 10px 5px 0 ;
}
</style>
