<template>
  <el-dialog
      title="编辑视频"
      width="750px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="80px">
      <row-col>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="中文"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="titleEn" slot="r">
          <el-input v-model="form.titleEn" placeholder="英文"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="介绍" prop="info">
          <el-input v-model="form.info" placeholder="中文"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="infoEn" slot="r">
          <el-input v-model="form.infoEn" placeholder="英文"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="按钮提示" prop="btnText">
          <el-input v-model="form.btnText" placeholder="中文"></el-input>
        </el-form-item>
        <el-form-item label="按钮提示" prop="btnTextEn" slot="r">
          <el-input v-model="form.btnTextEn" placeholder="英文"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="城市" prop="cityTypeId">
          <search-select ref="SearchSelect" v-model="form.cityTypeId"></search-select>
        </el-form-item>
        <el-form-item label="类别" prop="videoTypeId" slot="r">
          <el-select v-model="form.videoTypeId" clearable placeholder="请选择类别">
            <el-option v-for="item in options" :label="item.type" :value="item.id" :key="item.id"/>
          </el-select>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="价钱" prop="price">
          <el-input-number
              v-model="form.price"
              controls-position="right"
              :min="0"/>
          <span>w</span>
        </el-form-item>
        <el-form-item label="是否热门" slot="r">
          <el-radio-group v-model="form.hot">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="封面" prop="cover">
          <image-uploader-plus v-model="form.cover" :width="248" :height="160"/>
        </el-form-item>
        <el-form-item label="视频" prop="video" slot="r">
          <video-uploader v-model="form.video"/>
        </el-form-item>
      </row-col>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import SearchSelect from "./components/SearchSelect";
  import {editVideoApi, getVideoApi} from '@/api/video';
  import {objectEvaluate, resetForm} from "@/utils/common";

  export default {
    name: "Edit",
    components: {SearchSelect},
    props: {
      options: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        visible: false,
        form: {
          btnText: '',
          btnTextEn: '',
          id: null,
          info: '',
          infoEn: '',
          title: '',
          titleEn: '',
          cityTypeId: null,
          videoTypeId: null,
          price: null,
          hot: false,
          cover: '',
          video: ''
        },
        rules: {
          info: {required: true, message: '请输入内容', trigger: 'blur'},
          infoEn: {required: true, message: '请输入内容', trigger: 'blur'},
          btnText: {required: true, message: '请输入内容', trigger: 'blur'},
          btnTextEn: {required: true, message: '请输入内容', trigger: 'blur'},
          title: {required: true, message: '请输入标题', trigger: 'blur'},
          titleEn: {required: true, message: '请输入标题', trigger: 'blur'},
          cityTypeId: {required: true, message: '请选择所属城市', trigger: 'change'},
          videoTypeId: {required: true, message: '请选择视频类型', trigger: 'change'},
          price: {required: true, message: '请输入价钱', trigger: 'change'},
          cover: {required: true, message: '请上传封面', trigger: 'change'},
          video: {required: true, message: '请上传视频', trigger: 'change'}
        }
      }
    },
    methods: {
      getData() {
        getVideoApi({id: this.form.id}).then(result => {
          objectEvaluate(this.form, result.data);
          this.$refs.SearchSelect.set(result.data.cityTypeId);
        })
      },
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          this.$refs.Submit.start();
          editVideoApi(data).then(() => {
            this.$refs.Submit.stop();
            this.$emit('update');
            this.cancel()
          }).catch(() => {
            this.$refs.Submit.stop();
          })
        });
      },
      cancel() {
        resetForm(this)
      }
    }
  }
</script>
