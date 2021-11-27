"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] || []).push([[921],{

/***/ 921:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Jobs; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9c96ad4-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Jobs.vue?vue&type=template&id=6e58a1a0&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('p',[_vm._v("Monitor the status of the Jobs.")]),_c('JobsTable'),_c('div',{staticClass:"d-flex legend-wrapper"},[_c('b-card',{attrs:{"title":"Status","tag":"article"}},[_c('ul',[_c('li',[_c('span',[_c('font-awesome-icon',{staticClass:"text-primary",attrs:{"fixed-width":"","icon":['fas', 'bookmark']}}),_vm._v(": "),_c('span',[_vm._v("Job ready to be processed")])],1)]),_c('li',[_c('span',[_c('font-awesome-icon',{staticClass:"text-success",attrs:{"fixed-width":"","icon":['fas', 'check-circle']}}),_vm._v(": "),_c('span',[_vm._v("Job process completed")])],1)]),_c('li',[_c('span',[_c('font-awesome-icon',{staticClass:"text-secondary",attrs:{"fixed-width":"","icon":['fas', 'spinner']}}),_vm._v(": "),_c('span',[_vm._v("Job being processed")])],1)]),_c('li',[_c('span',[_c('font-awesome-icon',{staticClass:"text-danger",attrs:{"fixed-width":"","icon":['fas', 'exclamation-circle']}}),_vm._v(": "),_c('span',[_vm._v("Job stopped due to error")])],1)]),_c('li',[_c('span',[_c('font-awesome-icon',{staticClass:"text-secondary",attrs:{"fixed-width":"","icon":['fas', 'stop-circle']}}),_vm._v(": "),_c('span',[_vm._v("Job stopped by user")])],1)])])]),_c('b-card',{staticClass:"ml-2",attrs:{"title":"Actions","tag":"article"}},[_c('ul',[_c('li',[_c('span',[_c('font-awesome-icon',{staticClass:"text-primary",attrs:{"fixed-width":"","icon":['fas', 'stopwatch']}}),_vm._v(": "),_c('span',[_vm._v("Stop a Job in progress")])],1)]),_c('li',[_c('span',[_c('font-awesome-icon',{staticClass:"text-success",attrs:{"fixed-width":"","icon":['fas', 'sync-alt']}}),_vm._v(": "),_c('span',[_vm._v("Start a stopped Job")])],1)]),_c('li',[_c('span',[_c('font-awesome-icon',{staticClass:"text-danger",attrs:{"fixed-width":"","icon":['fas', 'trash']}}),_vm._v(": "),_c('span',[_vm._v("Delete a Job and its associated file")])],1)])])]),_c('b-card',{staticClass:"ml-2",attrs:{"title":"Types","tag":"article"}},[_c('ul',[_c('li',[_c('span',[_c('font-awesome-icon',{staticClass:"text-primary",attrs:{"fixed-width":"","icon":['fas', 'file-import']}}),_vm._v(": "),_c('span',[_c('em',[_vm._v("\"Import\"")]),_vm._v(" type Job")])],1)]),_c('li',[_c('span',[_c('font-awesome-icon',{staticClass:"text-danger",attrs:{"fixed-width":"","icon":['fas', 'file-export']}}),_vm._v(": "),_c('span',[_c('em',[_vm._v("\"Export\"")]),_vm._v(" type Job")])],1)])])])],1)],1)}
var staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9c96ad4-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/JobsTable.vue?vue&type=template&id=210fe272&scoped=true&
var JobsTablevue_type_template_id_210fe272_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"overflow-auto"},[_c('div',{staticClass:"d-flex flex-row justify-content-start align-items-start"},[_c('b-button',{attrs:{"size":"sm","variant":"info","disabled":_vm.loading},on:{"click":_vm.getItems}},[(_vm.loading)?_c('font-awesome-icon',{attrs:{"icon":['fas', 'spinner'],"spin":""}}):_c('font-awesome-icon',{attrs:{"icon":['fas', 'sync']}}),_c('span',[_vm._v(" Reload")])],1),_c('b-modal',{attrs:{"id":"modal-delete","title":"Delete jobs"},on:{"ok":_vm.handleOkDelete}},[_c('p',{staticClass:"my-4"},[_vm._v("Are you sure you want to delete all tasks for the current project?")])]),(_vm.hasItems)?_c('b-pagination',{staticClass:"ml-2 mb-0",attrs:{"total-rows":_vm.rows,"per-page":_vm.per_page,"aria-controls":"my-table","size":"sm"},model:{value:(_vm.current_page),callback:function ($$v) {_vm.current_page=$$v},expression:"current_page"}}):_vm._e()],1),_c('div',{staticClass:"table-wrapper"},[_c('b-table',{staticClass:"my-2",attrs:{"id":"my-table","items":_vm.items_proxy,"fields":_vm.fields,"_per-page":"per_page","_current-page":"current_page","small":"","bordered":"","striped":"","hover":""},scopedSlots:_vm._u([{key:"cell(error)",fn:function(data){return [(data.value)?_c('div',[_c('div',{staticClass:"job-error text-muted small"},[_vm._v(_vm._s(data.value))])]):_vm._e()]}},{key:"cell(status)",fn:function(data){return [(data.value)?_c('div',{staticClass:"d-flex justify-content-center align-items-center",attrs:{"set":_vm.params=_vm.getStatusIcon(data.value)}},[_c('font-awesome-icon',{class:_vm.params.class,attrs:{"title":data.value,"icon":_vm.params.icon,"spin":_vm.params.spin}})],1):_vm._e()]}},{key:"cell(created_at)",fn:function(data){return [(data.value)?_c('div',[_vm._v(_vm._s(data.value))]):_vm._e()]}},{key:"cell(updated_at)",fn:function(data){return [(data.value)?_c('div',[_vm._v(_vm._s(data.value))]):_vm._e()]}},{key:"cell(completed_at)",fn:function(data){return [(data.value)?_c('div',[_vm._v(_vm._s(data.value))]):_vm._e()]}},{key:"cell(type)",fn:function(data){return [(data.value)?_c('div',{staticClass:"d-flex justify-content-center align-items-center"},[(data.value=='import')?_c('font-awesome-icon',{staticClass:"text-primary",attrs:{"title":data.value,"icon":['fas', 'file-import']}}):(data.value=='export')?_c('font-awesome-icon',{staticClass:"text-danger",attrs:{"title":data.value,"icon":['fas', 'file-export']}}):_vm._e()],1):_vm._e()]}},{key:"cell(actions)",fn:function(data){return [(data.item.id)?_c('div',{staticClass:"d-flex"},[_c('b-button',{attrs:{"size":"sm","variant":"outline-secondary"},on:{"click":function($event){return _vm.showSettings(data.item.settings)}}},[_c('font-awesome-icon',{attrs:{"icon":['fas','eye'],"fixed-width":""}})],1),(data.item.status=='stopped')?_c('b-button',{staticClass:"ml-2",attrs:{"variant":"outline-success","size":"sm"},on:{"click":function($event){return _vm.confirmStartTask(data.item.id)}}},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'sync-alt'],"fixed-width":""}})],1):_c('b-button',{staticClass:"ml-2",attrs:{"variant":"outline-primary","size":"sm","disabled":_vm.getStopDisabled(data.item.status)},on:{"click":function($event){return _vm.confirmStopTask(data.item.id)}}},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'stopwatch'],"fixed-width":""}})],1),_c('b-button',{staticClass:"ml-2",attrs:{"variant":"outline-danger","size":"sm","disabled":_vm.getDeleteDisabled(data.item.status)},on:{"click":function($event){return _vm.confirmDeleteTask(data.item.id)}}},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'trash'],"fixed-width":""}})],1),(_vm.debugMode)?_c('b-button',{staticClass:"ml-2",attrs:{"variant":"outline-success","size":"sm"},on:{"click":function($event){return _vm.showEdit(data.item)}}},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'edit'],"fixed-width":""}})],1):_vm._e()],1):_vm._e()]}}])})],1),(_vm.hasItems)?_c('b-pagination',{staticClass:"mb-2",attrs:{"total-rows":_vm.rows,"per-page":_vm.per_page,"aria-controls":"my-table","size":"sm"},model:{value:(_vm.current_page),callback:function ($$v) {_vm.current_page=$$v},expression:"current_page"}}):_vm._e(),_c('b-modal',{ref:"modal-settings",attrs:{"title":"Settings","ok-only":""}},[_c('pre',[_vm._v(_vm._s(_vm.current_settings))])]),_c('b-modal',{ref:"modal-edit",attrs:{"title":"Edit","hide-footer":""}},[_c('EditJob',{attrs:{"job":_vm.editing_data},scopedSlots:_vm._u([{key:"footer",fn:function(ref){
var form = ref.form;
var object_keys = ref.object_keys;
return [_c('div',{staticClass:"d-flex justify-content-end"},[_c('b-button',{staticClass:"mr-2",attrs:{"size":"sm","variant":"secondary"},on:{"click":function($event){return _vm.$refs['modal-edit'].hide()}}},[_vm._v("Cancel")]),_c('b-button',{attrs:{"size":"sm","variant":"success"},on:{"click":function($event){return _vm.editJob(form, object_keys)}}},[_vm._v("OK")])],1)]}}])})],1)],1)}
var JobsTablevue_type_template_id_210fe272_scoped_true_staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__(9280);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(1531);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(7810);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(8792);
// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(5666);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.freeze.js
var es_object_freeze = __webpack_require__(3371);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(7941);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(2222);
// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(629);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9c96ad4-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/EditJob.vue?vue&type=template&id=32029953&
var EditJobvue_type_template_id_32029953_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._l((_vm.form),function(value,key){return _c('b-form-group',{key:key,attrs:{"label":key,"label-for":("input-" + key)}},[((typeof value =='boolean'))?_c('b-form-checkbox',{attrs:{"id":("input-" + key)},model:{value:(_vm.form[key]),callback:function ($$v) {_vm.$set(_vm.form, key, $$v)},expression:"form[key]"}}):_c('b-form-input',{attrs:{"id":("input-" + key)},model:{value:(_vm.form[key]),callback:function ($$v) {_vm.$set(_vm.form, key, $$v)},expression:"form[key]"}})],1)}),_c('footer',[_vm._t("footer",null,{"form":_vm.form,"object_keys":_vm.object_keys})],2)],2)}
var EditJobvue_type_template_id_32029953_staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(8327);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(8908);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__(9720);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__(8862);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-80[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/EditJob.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var EditJobvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      form: {},
      object_keys: [] // store keys of the JSON that need to be converted back to object

    };
  },
  props: {
    job: {
      type: Object,
      default: null
    }
  },
  methods: {
    editObject: function editObject(key, value) {
      console.log(key, value);
      if ((0,esm_typeof/* default */.Z)(value) != 'object') return;
    }
  },
  watch: {
    job: {
      immediate: true,
      handler: function handler(job) {
        for (var _i = 0, _Object$entries = Object.entries(job); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = (0,slicedToArray/* default */.Z)(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              value = _Object$entries$_i[1];

          if (value == null) value = undefined;
          /**
           * stringify objects for editing, but keep track of the key
           * to convert it back to object before sending to server
           */
          else if ((0,esm_typeof/* default */.Z)(value) == 'object') {
            if (this.object_keys.indexOf(key) < 0) this.object_keys.push(key);
            value = JSON.stringify(value);
          }
          this.$set(this.form, key, value);
        }
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/EditJob.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_EditJobvue_type_script_lang_js_ = (EditJobvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/EditJob.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  components_EditJobvue_type_script_lang_js_,
  EditJobvue_type_template_id_32029953_render,
  EditJobvue_type_template_id_32029953_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EditJob = (component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-80[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/JobsTable.vue?vue&type=script&lang=js&









//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var statusList = Object.freeze({
  READY: 'ready',
  ERROR: 'error',
  COMPLETED: 'completed',
  PROCESSING: 'processing',
  STOPPED: 'stopped',
  DELETED: 'deleted'
});
/* harmony default export */ var JobsTablevue_type_script_lang_js_ = ({
  components: {
    EditJob: EditJob
  },
  data: function data() {
    return {
      items: [],
      metadata: {},
      fields: [{
        key: 'id',
        lable: 'ID'
      }, {
        key: 'status',
        lable: 'Status'
      }, // {key: 'filename', lable: 'Filename'},
      {
        key: 'processed_lines',
        lable: 'Processed Lines'
      }, {
        key: 'error',
        lable: 'Error'
      }, {
        key: 'created_at',
        lable: 'Created at'
      }, {
        key: 'updated_at',
        lable: 'Updated at'
      }, {
        key: 'completed_at',
        lable: 'Completed at'
      }, {
        key: 'type',
        lable: 'Type'
      }, {
        key: 'actions',
        lable: 'Actions'
      }],
      per_page: 10,
      current_page: 1,
      loading: false,
      current_settings: null,
      editing_data: null
    };
  },
  created: function created() {
    return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  computed: (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, (0,vuex_esm/* mapState */.rn)({
    debugMode: function debugMode(state) {
      return state.app.debugMode;
    }
  })), {}, {
    fields_proxy: function fields_proxy() {
      var items = (0,toConsumableArray/* default */.Z)(this.items);

      if (items.length == 0) return [];
      var keys = items.reduce(function (accumulator, item) {
        var keys = Object.keys(item);
        return [].concat((0,toConsumableArray/* default */.Z)(accumulator), (0,toConsumableArray/* default */.Z)(keys));
      }, []);
      return [].concat((0,toConsumableArray/* default */.Z)(keys), (0,toConsumableArray/* default */.Z)(this.fields));
    },
    items_proxy: function items_proxy() {
      var items = (0,toConsumableArray/* default */.Z)(this.items);

      var remainder = this.per_page - items.length;
      if (remainder < 0) remainder = 0;

      for (var i = 0; i < remainder; i++) {
        items.push({});
      }

      return items;
    },
    rows: function rows() {
      var _this$metadata$total = this.metadata.total,
          total = _this$metadata$total === void 0 ? 0 : _this$metadata$total;
      return total;
    },
    hasItems: function hasItems() {
      try {
        return this.items.length > 0;
      } catch (error) {
        return false;
      }
    }
  }),
  watch: {
    current_page: {
      immediate: true,
      handler: function handler() {
        this.getItems();
      }
    }
  },
  methods: {
    getItems: function getItems() {
      var _this = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var limit, start, response, _response$data, data, _data$data, list, _data$metadata, metadata;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _this.loading = true;
                _this.items = [];
                _this.metadata = {};
                limit = _this.per_page;
                start = _this.per_page * (_this.current_page - 1);
                _context2.next = 8;
                return _this.$API.dispatch('jobs/get', {
                  start: start,
                  limit: limit
                });

              case 8:
                response = _context2.sent;
                _response$data = response.data, data = _response$data === void 0 ? {} : _response$data;
                _data$data = data.data, list = _data$data === void 0 ? {} : _data$data, _data$metadata = data.metadata, metadata = _data$metadata === void 0 ? {} : _data$metadata;
                _this.items = list;
                _this.metadata = metadata;
                _context2.next = 18;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);

              case 18:
                _context2.prev = 18;
                _this.loading = false;
                return _context2.finish(18);

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 15, 18, 21]]);
      }))();
    },
    handleOkDelete: function handleOkDelete() {
      var _this2 = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this2.$API.dispatch('jobs/delete');

              case 2:
                response = _context3.sent;
                console.log(response);

                _this2.getItems();

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    getStopDisabled: function getStopDisabled(status) {
      return status != statusList.PROCESSING;
    },
    getDeleteDisabled: function getDeleteDisabled(status) {
      var disabled_status = [statusList.PROCESSING, statusList.DELETED];
      return disabled_status.indexOf(status) >= 0;
    },
    getStatusIcon: function getStatusIcon(status) {
      var params = {
        icon: ['fas', 'tasks'],
        spin: false
      };

      switch (status) {
        case statusList.READY:
          params = (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, params), {
            icon: ['fas', 'bookmark'],
            class: 'text-primary'
          });
          break;

        case statusList.COMPLETED:
          params = (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, params), {
            icon: ['fas', 'check-circle'],
            class: 'text-success'
          });
          break;

        case statusList.PROCESSING:
          params = (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, params), {
            icon: ['fas', 'spinner'],
            class: 'text-secondary',
            spin: true
          });
          break;

        case statusList.ERROR:
          params = (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, params), {
            icon: ['fas', 'exclamation-circle'],
            class: 'text-danger'
          });
          break;

        case statusList.STOPPED:
          params = (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, params), {
            icon: ['fas', 'stop-circle'],
            class: 'text-secondary'
          });
          break;

        case statusList.DELETED:
          params = (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, params), {
            icon: ['fas', 'minus-circle'],
            class: 'text-danger'
          });
          break;

        default:
          break;
      }

      return params;
    },
    confirmStopTask: function confirmStopTask(id) {
      var _this3 = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var message, title, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                message = "Do you want to stop this job?";
                title = "Stop job ID ".concat(id);
                _context4.next = 4;
                return _this3.$bvModal.msgBoxConfirm(message, {
                  title: title,
                  size: 'sm',
                  buttonSize: 'sm',
                  okVariant: 'primary',
                  headerClass: 'p-2 border-bottom-0',
                  footerClass: 'p-2 border-top-0',
                  centered: true
                });

              case 4:
                response = _context4.sent;
                if (response) _this3.stopTask(id);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    stopTask: function stopTask(id) {
      var _this4 = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var message, title, variant;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _this4.$API.dispatch('jobs/stop', {
                  id: id
                });

              case 3:
                message = "The job id ".concat(id, " has been stopped.");
                title = 'Success';
                variant = 'success';
                _context5.next = 13;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](0);
                message = "There was an error stopping the job ID ".concat(id, ".");
                title = 'Error';
                variant = 'danger';

              case 13:
                _context5.prev = 13;

                _this4.$bvToast.toast(message, {
                  title: title,
                  autoHideDelay: 1500,
                  appendToast: true,
                  variant: variant
                });

                _this4.getItems();

                return _context5.finish(13);

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 8, 13, 17]]);
      }))();
    },
    confirmStartTask: function confirmStartTask(id) {
      var _this5 = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var message, title, response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                message = "Do you want to restart this job?";
                title = "Start job ID ".concat(id);
                _context6.next = 4;
                return _this5.$bvModal.msgBoxConfirm(message, {
                  title: title,
                  size: 'sm',
                  buttonSize: 'sm',
                  okVariant: 'primary',
                  headerClass: 'p-2 border-bottom-0',
                  footerClass: 'p-2 border-top-0',
                  centered: true
                });

              case 4:
                response = _context6.sent;
                if (response) _this5.startTask(id);

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    startTask: function startTask(id) {
      var _this6 = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var message, title, variant;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return _this6.$API.dispatch('jobs/start', {
                  id: id
                });

              case 3:
                message = "The job id ".concat(id, " has been started.");
                title = 'Success';
                variant = 'success';
                _context7.next = 13;
                break;

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](0);
                message = "There was an error starting the job ID ".concat(id, ".");
                title = 'Error';
                variant = 'danger';

              case 13:
                _context7.prev = 13;

                _this6.$bvToast.toast(message, {
                  title: title,
                  autoHideDelay: 1500,
                  appendToast: true,
                  variant: variant
                });

                _this6.getItems();

                return _context7.finish(13);

              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 8, 13, 17]]);
      }))();
    },
    confirmDeleteTask: function confirmDeleteTask(id) {
      var _this7 = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var message, title, response;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                message = "Do you want to delete this job?";
                title = "Delete job ID ".concat(id);
                _context8.next = 4;
                return _this7.$bvModal.msgBoxConfirm(message, {
                  title: title,
                  size: 'sm',
                  buttonSize: 'sm',
                  okVariant: 'danger',
                  headerClass: 'p-2 border-bottom-0',
                  footerClass: 'p-2 border-top-0',
                  centered: true
                });

              case 4:
                response = _context8.sent;
                if (response) _this7.deleteTask(id);

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    deleteTask: function deleteTask(id) {
      var _this8 = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var message, title, variant;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return _this8.$API.dispatch('jobs/delete', {
                  id: id
                });

              case 3:
                message = "The job ID ".concat(id, " has been deleted.");
                title = 'Success';
                variant = 'success';
                _context9.next = 13;
                break;

              case 8:
                _context9.prev = 8;
                _context9.t0 = _context9["catch"](0);
                message = "There was an error deleting the job ID ".concat(id, ".");
                title = 'Error';
                variant = 'danger';

              case 13:
                _context9.prev = 13;

                _this8.$bvToast.toast(message, {
                  title: title,
                  autoHideDelay: 1500,
                  appendToast: true,
                  variant: variant
                });

                _this8.getItems();

                return _context9.finish(13);

              case 17:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 8, 13, 17]]);
      }))();
    },
    showSettings: function showSettings(settings) {
      var modal = this.$refs['modal-settings'];
      if (!modal) return;
      this.current_settings = settings;
      modal.show();
    },
    showEdit: function showEdit(data) {
      var modal = this.$refs['modal-edit'];
      if (!modal) return;
      this.editing_data = data;
      modal.show();
    },
    editJob: function editJob(form, object_keys) {
      var _this9 = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var data, id, _iterator, _step, key, converted, modal;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                data = (0,objectSpread2/* default */.Z)({}, form);
                id = data.id; // convert back strings that were objects before being edited in the form

                _iterator = (0,createForOfIteratorHelper/* default */.Z)(object_keys);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    key = _step.value;
                    converted = JSON.parse(data[key]); // will throw error if cannot parse

                    data[key] = converted;
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                _context10.next = 7;
                return _this9.$API.dispatch('jobs/update', {
                  id: id,
                  data: (0,objectSpread2/* default */.Z)({}, data)
                });

              case 7:
                _context10.next = 13;
                break;

              case 9:
                _context10.prev = 9;
                _context10.t0 = _context10["catch"](0);
                console.log(_context10.t0);

                _this9.$bvModal.msgBoxOk('The JSON object is malformed and cannot be parsed. Data will not be updated.', {
                  title: 'Error parsing JSON',
                  // size: 'sm',
                  buttonSize: 'sm',
                  okVariant: 'secondary',
                  centered: true
                });

              case 13:
                _context10.prev = 13;
                modal = _this9.$refs['modal-edit'];
                if (modal) modal.hide();

                _this9.getItems();

                return _context10.finish(13);

              case 18:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[0, 9, 13, 18]]);
      }))();
    }
  }
});
;// CONCATENATED MODULE: ./src/components/JobsTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JobsTablevue_type_script_lang_js_ = (JobsTablevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-52[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-52[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-52[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/JobsTable.vue?vue&type=style&index=0&id=210fe272&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/JobsTable.vue?vue&type=style&index=0&id=210fe272&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/JobsTable.vue



;


/* normalize component */

var JobsTable_component = (0,componentNormalizer/* default */.Z)(
  components_JobsTablevue_type_script_lang_js_,
  JobsTablevue_type_template_id_210fe272_scoped_true_render,
  JobsTablevue_type_template_id_210fe272_scoped_true_staticRenderFns,
  false,
  null,
  "210fe272",
  null
  
)

/* harmony default export */ var JobsTable = (JobsTable_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-80[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Jobs.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Jobsvue_type_script_lang_js_ = ({
  components: {
    JobsTable: JobsTable
  },
  computed: {}
});
;// CONCATENATED MODULE: ./src/pages/Jobs.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Jobsvue_type_script_lang_js_ = (Jobsvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-52[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-52[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-52[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Jobs.vue?vue&type=style&index=0&id=6e58a1a0&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/pages/Jobs.vue?vue&type=style&index=0&id=6e58a1a0&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/pages/Jobs.vue



;


/* normalize component */

var Jobs_component = (0,componentNormalizer/* default */.Z)(
  pages_Jobsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "6e58a1a0",
  null
  
)

/* harmony default export */ var Jobs = (Jobs_component.exports);

/***/ })

}]);
//# sourceMappingURL=advanced_import.umd.921.js.map