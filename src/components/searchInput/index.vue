<!--
 * @params {formStyle} 输入框外层样式，注意键名小驼峰
 * @params {inputStyle} 输入框样式，注意键名小驼峰
 * @params {placeholder} 输入框placeholder 属性
 * @params {keyWord} 输入框初始值属性
 * @params {formClass} 大盒子类名
 * @params {inputClass} 输入框类名
 * @params {hasIcon} 是否带图标
 * @params {icon} 图标name属性
 * @params {iconUrl} 图片url
 * @params {isRight} 图标位置。
 * @params {iconStyle} 图标行内样式，如需要可用于如覆盖定位位置
 * @ methosd {onSubmit } 确认搜索事件，主搜索逻辑在父组件
* 用例:
      <SearchInput :keyWord="keyWord" @handerSubmit="onSearch"></SearchInput>
-->
<template>
  <div class="search-input" :style="formStyle" :class="formClass">
    <form @submit="onSubmit" action=''>
      <input v-model="propKeyword" ref="searchKey" type="search" :class="['input-class',inputClass,hasIcon ?'hasIconInput':'']" :style="inputStyle" id="searchKey" :placeholder="placeholder" />
      <span v-if="hasIcon" :class="['icon-box',isRight?'isRight':'isLeft']" :style="iconStyle">
        <img :src="iconUrl" v-if="iconUrl">
      </span>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      propKeyword: this.keyWord
    }
  },
  props: {
    formClass: {
      type: String,
      default: ''
    },
    inputClass: {
      type: String,
      default: ''
    },
    formStyle: {
      type: Object,
      default: () => {
        return {
          padding: '5px 15px',
          backgroundColor: '#fff',
        }
      }
    },
    inputStyle: {
      type: Object,
      default: () => {
        return {
          width: '100%',
          backgroundColor: '#efefef',
          border: 'none',
          borderRadius: '8px',
        }
      }
    },
    placeholder: {
      type: String,
      default: '请输入关键字搜索'
    },
    keyWord: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'search'
    },
    iconUrl: {
      type: String,
      default: ''
    },
    hasIcon: {
      type: Boolean,
      default: false
    },
    iconStyle: {
      type: Object,
      default: () => {
        return {
        }
      }
    },
    isRight: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    inputStyle: {
      handler(newVal, oldVal) {
        this.inputStyle = newVal
      },
      immediate: true,
      deep: true
    },
    formStyle: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal, '---')
        this.formStyle = newVal
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    console.log(this.formStyle)
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.$refs['searchKey'].blur()
      // document.getElementById('searchKey').blur()
      this.$emit('handerSubmit', this.propKeyword)
    }
  }
}
</script>

<style lang="less" scoped>
.search-input {
  position: relative;
  .input-class {
    padding: 7px;
  }
  .hasIconInput {
    padding: 7px 21px;
  }
  .icon-box {
    position: absolute;
    top: 50%;
    display: block;
    width: 16px;
    height: 16px;
    background: "#efefef";
    margin-top: -8px;
    i {
      font-size: 16px;
    }
    img {
      width: 16px;
      height: 16px;
    }
  }
  .isRight {
    right: 20px;
  }
  .isLeft {
    left: 20px;
  }
}
</style>
