<template>
  <card id="add-house">
    <el-form :model="form" :rules="rules" ref="Form" label-width="125px">
      <h1 class="title">展示位置</h1>
      <el-form-item prop="isBusiHouse">
        <el-radio-group v-model="form.isBusiHouse">
          <el-radio :label="false">新盘优选</el-radio>
          <el-radio :label="true">商业地产</el-radio>
        </el-radio-group>
      </el-form-item>
      <h1 class="title">基本信息</h1>
      <row-col>
        <el-form-item label="项目标题" prop="title">
          <el-input v-model="form.title" placeholder="中"></el-input>
        </el-form-item>
        <el-form-item label="项目标题" prop="titleEn" slot="r">
          <el-input v-model="form.titleEn" placeholder="英"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="项目副标题" prop="subhead">
          <el-input v-model="form.subhead" placeholder="中"></el-input>
        </el-form-item>
        <el-form-item label="项目副标题" prop="subheadEn" slot="r">
          <el-input v-model="form.subheadEn" placeholder="英"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="物业类型" prop="ywlx">
          <el-input v-model="form.ywlx" placeholder="中"></el-input>
        </el-form-item>
        <el-form-item label="物业类型" prop="ywlxEn" slot="r">
          <el-input v-model="form.ywlxEn" placeholder="英"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="交房标准" prop="jfbz">
          <el-input v-model="form.jfbz" placeholder="中"></el-input>
        </el-form-item>
        <el-form-item label="交房标准" prop="jfbzEn" slot="r">
          <el-input v-model="form.jfbzEn" placeholder="英"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="产权年限" prop="cqnx">
          <el-input v-model="form.cqnx" placeholder="中"></el-input>
        </el-form-item>
        <el-form-item label="产权年限" prop="cqnxEn" slot="r">
          <el-input v-model="form.cqnxEn" placeholder="英"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="开发商" prop="developer">
          <el-input v-model="form.developer" placeholder="中"></el-input>
        </el-form-item>
        <el-form-item label="开发商" prop="developerEn" slot="r">
          <el-input v-model="form.developerEn" placeholder="英"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="建筑设计公司" prop="designCompany">
          <el-input v-model="form.designCompany" placeholder="中"></el-input>
        </el-form-item>
        <el-form-item label="建筑设计公司" prop="designCompanyEn" slot="r">
          <el-input v-model="form.designCompanyEn" placeholder="英"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="剩余租约年限" prop="residueAge">
          <el-input v-model="form.residueAge" placeholder="中"></el-input>
        </el-form-item>
        <el-form-item label="剩余租约年限" prop="residueAgeEn" slot="r">
          <el-input v-model="form.residueAgeEn" placeholder="英"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="交房时间" prop="jfsj">
          <el-date-picker v-model="form.jfsj" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"/>
        </el-form-item>
        <el-form-item label="楼盘总房屋数" prop="houseCount" slot="r">
          <el-input-number v-model="form.houseCount" controls-position="right" :min="0"/>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="室内面积" prop="symj">
          <el-input-number v-model="form.symj" controls-position="right" :min="0"/>㎡
        </el-form-item>
        <el-form-item label="土地面积" prop="landArea" slot="r">
          <el-input-number v-model="form.landArea" controls-position="right" :min="0"/>㎡
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="项目总价(RMB)" prop="xmzj">
          <el-input-number v-model="form.xmzj" controls-position="right" :min="0"/>
          <span> w</span>
        </el-form-item>
        <el-form-item label="房产单价" prop="xmdj" slot="r">
          <el-input-number v-model="form.xmdj" controls-position="right" :min="0"/>
          <span> 万元/㎡</span>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="项目总价(美元)" prop="xmzjEn">
          <el-input-number v-model="form.xmzjEn" controls-position="right" :min="0"/>
          <span> Million</span>
        </el-form-item>
        <el-form-item label="楼层" prop="floor" slot="r">
          <el-input-number v-model="form.floor" controls-position="right" :min="0"/>层
        </el-form-item>
      </row-col>
      <row-col v-if="false">
        <el-form-item label="开盘提醒" prop="kptx">
          <el-input v-model="form.kptx" placeholder="中"></el-input>
        </el-form-item>
        <el-form-item label="开盘提醒" prop="kptxEn" slot="r">
          <el-input v-model="form.kptxEn" placeholder="英"></el-input>
        </el-form-item>
      </row-col>
      <row-col v-if="false">
        <el-form-item label="开盘优惠" prop="kpyh">
          <el-input v-model="form.kpyh" placeholder="中"></el-input>
        </el-form-item>
        <el-form-item label="开盘优惠" prop="kpyhEn" slot="r">
          <el-input v-model="form.kpyhEn" placeholder="英"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="年净收益" prop="njsy">
          <el-input-number v-model="form.njsy" controls-position="right"/>
          <span> %</span>
        </el-form-item>
        <el-form-item label="近一年房价涨幅" prop="fjzf" slot="r">
          <el-input-number v-model="form.fjzf" controls-position="right"/>
          <span> %</span>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="首付比例" prop="sfbl">
          <el-input-number v-model="form.sfbl" controls-position="right"/>
          <span> %</span>
        </el-form-item>
        <el-form-item label="关联卖家" prop="sellerId" slot="r">
          <search-select-seller v-model="form.sellerId" ref="SearchSelectSeller"/>
        </el-form-item>
      </row-col>
      <el-form-item label="关联城市" prop="cityId">
        <search-select-city ref="SearchSelectCity" v-model="form.cityId"/>
      </el-form-item>
      <el-form-item label="目的(可多选)" prop="objective">
        <el-select v-model="form.objective" multiple clearable class="w-100">
          <el-option v-for="item in options.objective" :label="item.type" :value="item.id" :key="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="房源轮播图" prop="cover">
        <image-uploader-batch v-model="form.cover" :limit="20"/>
      </el-form-item>
      <h1 class="title">标签分类</h1>
      <row-col>
        <el-form-item label="关联类别" prop="lb">
          <el-select v-model="form.lb" clearable>
            <el-option v-for="item in options.lb" :label="item.type" :value="item.id" :key="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="关联区域" prop="region" slot="r">
          <el-select v-model="form.region" clearable>
            <el-option v-for="item in options.region" :label="item.type" :value="item.id" :key="item.id"/>
          </el-select>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="关联房型" prop="fx">
          <el-select v-model="form.fx" clearable>
            <el-option v-for="item in options.fx" :label="item.type" :value="item.id" :key="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="关联类型" prop="lx" slot="r">
          <el-select v-model="form.lx" clearable>
            <el-option v-for="item in options.lx" :label="item.type" :value="item.id" :key="item.id"/>
          </el-select>
        </el-form-item>
      </row-col>
      <el-form-item label="关联物业类型" prop="wylx">
        <el-select v-model="form.wylx" clearable>
          <el-option v-for="item in options.wylx" :label="item.type" :value="item.id" :key="item.id"/>
        </el-select>
      </el-form-item>
      <row-col>
        <el-form-item label="立刻上架">
          <el-radio-group v-model="form.display">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="热门推荐" slot="r">
          <el-radio-group v-model="form.hot">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="高租金收益楼盘">
          <el-radio-group v-model="form.gzjsy">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="稳健长租学区楼盘" slot="r">
          <el-radio-group v-model="form.wjczxq">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="豪宅鉴赏">
          <el-radio-group v-model="form.hzjs">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="NNN三净租约" slot="r">
          <el-radio-group v-model="form.sjzy">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </row-col>
      <el-form-item label="低首付优质房源">
        <el-radio-group v-model="form.dsfyz">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <h1 class="title">房源详情</h1>
      <el-tabs v-model="active.one" type="card">
        <el-tab-pane label="在售户型(中)" name="first">
          <custom-editor v-show="false" :editor-key="0"/>
          <image-uploader-batch v-model="form.zshx" :limit="999"/>
        </el-tab-pane>
        <el-tab-pane label="在售户型(英)" name="second">
          <custom-editor v-show="false" :editor-key="1"/>
          <image-uploader-batch v-model="form.zshxEn" :limit="999"/>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="active.two" type="card">
        <el-tab-pane label="房源视频" name="first">
          <row-col>
            <el-form-item prop="video">
              <video-uploader v-model="form.video"></video-uploader>
            </el-form-item>
          </row-col>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="active.three" type="card">
        <el-tab-pane label="项目介绍(中)" name="first">
          <custom-editor v-model="form.xmtx" :editor-key="2"/>
        </el-tab-pane>
        <el-tab-pane label="项目介绍(英)" name="second">
          <custom-editor v-model="form.xmtxEn" :editor-key="3"/>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="active.four" type="card">
        <el-tab-pane label="区域介绍(中)" name="first">
          <custom-editor v-model="form.zbss" :editor-key="4"/>
        </el-tab-pane>
        <el-tab-pane label="区域介绍(英)" name="second">
          <custom-editor v-model="form.zbssEn" :editor-key="5"/>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="active.five" type="card">
        <el-tab-pane label="购买流程(中)" name="first">
          <custom-editor v-model="form.gmlc" :editor-key="6"/>
        </el-tab-pane>
        <el-tab-pane label="购买流程(英)" name="second">
          <custom-editor v-model="form.gmlcEn" :editor-key="7"/>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="active.six" type="card">
        <el-tab-pane label="投资评估(中)" name="first">
          <custom-editor v-model="form.tzpg" :editor-key="8"/>
        </el-tab-pane>
        <el-tab-pane label="投资评估(英)" name="second">
          <custom-editor v-model="form.tzpgEn" :editor-key="9"/>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="active.seven" type="card">
        <el-tab-pane label="项目亮点(中)" name="first">
          <custom-editor v-model="form.xmld" :editor-key="10"/>
        </el-tab-pane>
        <el-tab-pane label="项目亮点(英)" name="second">
          <custom-editor v-model="form.xmldEn" :editor-key="11"/>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div style="display: flex;justify-content: space-between">
      <el-button type="warning" ref="Submit" @click="clear('确认重置该页面数据？')">重置</el-button>
      <submit-button ref="Submit" @submit="submit" text="提交"/>
    </div>
  </card>
</template>

<script>
  import {addHouseApi} from '@/api/house';
  import {getLabelApi} from '@/api/label';
  import {resetForm} from "@/utils/common";
  import SearchSelectCity from "../components/SearchSelectCity";
  import SearchSelectSeller from "../components/SearchSelectSeller";

  export default {
    name: "AddHouse",
    components: {SearchSelectCity, SearchSelectSeller},
    data() {
      return {
        active: {
          one: 'first',
          two: 'first',
          three: 'first',
          four: 'first',
          five: 'first',
          six: 'first',
          seven: 'first'
        },
        options: {
          // sellerId: [], 关联卖家(自定义组件)
          // cityId: [], 关联城市（自定义组件）
          objective: [], // 关联目的(可多选)  0  1
          lb: [], // 关联类别  2  3
          region: [], // 关联区域  2  4
          fx: [], // 关联房型  2  5
          lx: [], // 关联类型  2  6
          wylx: [] // 关联物业类型  0  0
        },
        form: {
          isBusiHouse: false, // 展示位置(新盘优选 商业地产)

          title: '', // 项目标题
          titleEn: '', // 项目标题
          subhead: '', // 项目副标题
          subheadEn: '', // 项目副标题
          ywlx: '', // 物业类型
          ywlxEn: '', // 物业类型
          xmzj: 0, // 项目总价
          xmzjEn: 0, // 项目总价(美元)
          xmdj: 0, // 房产单价
          jfbz: '', // 交房标准
          jfbzEn: '', // 交房标准
          cqnx: '', // 产权年限
          cqnxEn: '', // 产权年限
          residueAge: '', // 剩余租约年限
          residueAgeEn: '', // 剩余租约年限
          symj: '', // 室内面积
          jfsj: '', // 交房时间
          objective: [], // 关联目的,存目的代号,分割
          cover: '', // 房源轮播图
          kptx: '', // 开盘提醒
          kptxEn: '', // 开盘提醒
          kpyh: '', // 开盘优惠
          kpyhEn: '', // 开盘优惠
          njsy: 0, // 年净收益
          fjzf: 0, // 近一年房价涨幅
          sfbl: 0, // 首付比例
          sellerId: null, // 关联卖家id
          cityId: null, // 关联城市
          landArea: null, // 土地面积
          houseCount: null, // 楼盘总房屋数
          floor: null, // 楼层
          developer: '', // 开发商
          developerEn: '', // 开发商
          designCompany: '', // 建筑设计公司
          designCompanyEn: '', // 建筑设计公司

          lb: null, // 关联类别
          region: null, // 关联区域
          fx: null, // 关联房型
          lx: null, // 关联类型
          wylx: null, // 关联物业类型
          display: false, // 立刻上架
          hot: false, // 热门推荐
          gzjsy: false, // 高租金收益楼盘
          wjczxq: false, // 稳健长租学区楼盘
          hzjs: false, // 豪宅鉴赏
          sjzy: false, // NNN三净租约
          dsfyz: false, // 低首付优质房源

          xmld: '', // 项目亮点
          xmldEn: '', // 项目亮点
          zshx: '', // 在售户型
          zshxEn: '', // 在售户型
          video: '', // 房源视频
          xmtx: '', // 项目介绍
          xmtxEn: '', // 项目介绍
          zbss: '', // 区域介绍
          zbssEn: '', // 区域介绍
          gmlc: '', // 购买流程
          gmlcEn: '', // 购买流程
          tzpg: '', // 投资评估
          tzpgEn: '', // 投资评估
        },
        rules: {
          title: {required: true, message: '请输入标题', trigger: 'blur'},
          titleEn: {required: true, message: '请输入标题', trigger: 'blur'},
          sellerId: {required: true, message: '请选择卖家', trigger: 'change'},
          cityId: {required: true, message: '请选择城市', trigger: 'change'},
          cover: {required: true, message: '请上传房源轮播图', trigger: 'change'},
          objective: {required: true, message: '请选择', trigger: 'change'},
          lb: {required: true, message: '请选择', trigger: 'change'},
          region: {required: true, message: '请选择', trigger: 'change'},
          fx: {required: true, message: '请选择', trigger: 'change'},
          lx: {required: true, message: '请选择', trigger: 'change'},
          wylx: {required: true, message: '请选择', trigger: 'change'}
        }
      }
    },
    beforeCreate() {
      this.$startLoading('rgba(0, 0, 0, 0.6)');
    },
    mounted() {
      this.$stopLoading();
    },
    created() {
      this.getOptions()
    },
    methods: {
      getOptions() {
        getLabelApi({classifyId: 0, groupId: 1}).then(result => {
          this.options.objective = result.data; // 关联目的(可多选)
        })
        getLabelApi({classifyId: 2, groupId: 3}).then(result => {
          this.options.lb = result.data; // 关联类别
        })
        getLabelApi({classifyId: 2, groupId: 4}).then(result => {
          this.options.region = result.data; // 关联区域
        })
        getLabelApi({classifyId: 2, groupId: 5}).then(result => {
          this.options.fx = result.data; // 关联房型
        })
        getLabelApi({classifyId: 2, groupId: 6}).then(result => {
          this.options.lx = result.data; // 关联类型
        })
        getLabelApi({classifyId: 0, groupId: 0}).then(result => {
          this.options.wylx = result.data; // 关联物业类型
        })
      },
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return false;
          this.$msgBox('确认提交？').then(() => {
            let data = {...this.form};
            data.objective = data.objective.join(',');
            this.$refs.Submit.start();
            addHouseApi(data)
              .then(result => {
                this.$refs.Submit.stop();
                if (result.code === 200)
                  this.clear('提交成功，是否重置该页面数据？')
              })
              .catch(() => {
                this.$refs.Submit.stop();
              })
          })
        });
      },
      clear(text) {
        this.$msgBox(text).then(() => {
          this.cancel();
        })
      },
      cancel() {
        resetForm(this)
      }
    }
  }
</script>

<style lang="scss">
  #add-house {
    .el-tabs--card {
      margin-bottom: 20px;
    }

    .title {
      font-size: 22px;

      &:first-child {
        margin-top: 0;
      }
    }
  }
</style>
