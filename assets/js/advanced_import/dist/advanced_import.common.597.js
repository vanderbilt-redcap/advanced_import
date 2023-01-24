"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] || []).push([[597],{

/***/ 597:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Jobs; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Jobs.vue?vue&type=template&id=6e58a1a0&scoped=true&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('p', [_vm._v("Monitor the status of the Jobs.")]), _c('JobsTable'), _c('div', {
    staticClass: "d-flex legend-wrapper"
  }, [_c('b-card', {
    attrs: {
      "title": "Status",
      "tag": "article"
    }
  }, [_c('ul', [_c('li', [_c('span', [_c('font-awesome-icon', {
    staticClass: "text-primary",
    attrs: {
      "fixed-width": "",
      "icon": ['fas', 'bookmark']
    }
  }), _vm._v(": "), _c('span', [_vm._v("Job ready to be processed")])], 1)]), _c('li', [_c('span', [_c('font-awesome-icon', {
    staticClass: "text-success",
    attrs: {
      "fixed-width": "",
      "icon": ['fas', 'check-circle']
    }
  }), _vm._v(": "), _c('span', [_vm._v("Job process completed")])], 1)]), _c('li', [_c('span', [_c('font-awesome-icon', {
    staticClass: "text-secondary",
    attrs: {
      "fixed-width": "",
      "icon": ['fas', 'spinner']
    }
  }), _vm._v(": "), _c('span', [_vm._v("Job being processed")])], 1)]), _c('li', [_c('span', [_c('font-awesome-icon', {
    staticClass: "text-danger",
    attrs: {
      "fixed-width": "",
      "icon": ['fas', 'exclamation-circle']
    }
  }), _vm._v(": "), _c('span', [_vm._v("Job stopped due to error")])], 1)]), _c('li', [_c('span', [_c('font-awesome-icon', {
    staticClass: "text-secondary",
    attrs: {
      "fixed-width": "",
      "icon": ['fas', 'stop-circle']
    }
  }), _vm._v(": "), _c('span', [_vm._v("Job stopped by user")])], 1)])])]), _c('b-card', {
    staticClass: "ml-2",
    attrs: {
      "title": "Actions",
      "tag": "article"
    }
  }, [_c('ul', [_c('li', [_c('span', [_c('font-awesome-icon', {
    staticClass: "text-primary",
    attrs: {
      "fixed-width": "",
      "icon": ['fas', 'stopwatch']
    }
  }), _vm._v(": "), _c('span', [_vm._v("Stop a Job in progress")])], 1)]), _c('li', [_c('span', [_c('font-awesome-icon', {
    staticClass: "text-success",
    attrs: {
      "fixed-width": "",
      "icon": ['fas', 'sync-alt']
    }
  }), _vm._v(": "), _c('span', [_vm._v("Start a stopped Job")])], 1)]), _c('li', [_c('span', [_c('font-awesome-icon', {
    staticClass: "text-danger",
    attrs: {
      "fixed-width": "",
      "icon": ['fas', 'trash']
    }
  }), _vm._v(": "), _c('span', [_vm._v("Delete a Job and its associated file")])], 1)])])]), _c('b-card', {
    staticClass: "ml-2",
    attrs: {
      "title": "Types",
      "tag": "article"
    }
  }, [_c('ul', [_c('li', [_c('span', [_c('font-awesome-icon', {
    staticClass: "text-primary",
    attrs: {
      "fixed-width": "",
      "icon": ['fas', 'file-import']
    }
  }), _vm._v(": "), _c('span', [_c('em', [_vm._v("\"Import\"")]), _vm._v(" type Job")])], 1)]), _c('li', [_c('span', [_c('font-awesome-icon', {
    staticClass: "text-danger",
    attrs: {
      "fixed-width": "",
      "icon": ['fas', 'file-export']
    }
  }), _vm._v(": "), _c('span', [_c('em', [_vm._v("\"Export\"")]), _vm._v(" type Job")])], 1)])])])], 1)], 1);
};
var staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/JobsTable.vue?vue&type=template&id=210fe272&scoped=true&
var JobsTablevue_type_template_id_210fe272_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "overflow-auto"
  }, [_c('div', {
    staticClass: "d-flex flex-row justify-content-start align-items-start"
  }, [_c('b-button', {
    attrs: {
      "size": "sm",
      "variant": "info",
      "disabled": _vm.loading
    },
    on: {
      "click": _vm.getItems
    }
  }, [_vm.loading ? _c('font-awesome-icon', {
    attrs: {
      "icon": ['fas', 'spinner'],
      "spin": ""
    }
  }) : _c('font-awesome-icon', {
    attrs: {
      "icon": ['fas', 'sync']
    }
  }), _c('span', [_vm._v(" Reload")])], 1), _c('b-modal', {
    attrs: {
      "id": "modal-delete",
      "title": "Delete jobs"
    },
    on: {
      "ok": _vm.handleOkDelete
    }
  }, [_c('p', {
    staticClass: "my-4"
  }, [_vm._v("Are you sure you want to delete all tasks for the current project?")])]), _vm.hasItems ? _c('b-pagination', {
    staticClass: "ml-2 mb-0",
    attrs: {
      "total-rows": _vm.rows,
      "per-page": _vm.per_page,
      "aria-controls": "my-table",
      "size": "sm"
    },
    model: {
      value: _vm.current_page,
      callback: function ($$v) {
        _vm.current_page = $$v;
      },
      expression: "current_page"
    }
  }) : _vm._e()], 1), _c('div', {
    staticClass: "table-wrapper"
  }, [_c('b-table', {
    staticClass: "my-2",
    attrs: {
      "id": "my-table",
      "items": _vm.items_proxy,
      "fields": _vm.fields,
      "_per-page": "per_page",
      "_current-page": "current_page",
      "small": "",
      "bordered": "",
      "striped": "",
      "hover": ""
    },
    scopedSlots: _vm._u([{
      key: "cell(error)",
      fn: function (data) {
        return [data.value ? _c('div', [_c('div', {
          staticClass: "job-error text-muted small"
        }, [_vm._v(_vm._s(data.value))])]) : _vm._e()];
      }
    }, {
      key: "cell(status)",
      fn: function (data) {
        return [data.value ? _c('div', {
          staticClass: "d-flex justify-content-center align-items-center",
          attrs: {
            "set": _vm.params = _vm.getStatusIcon(data.value)
          }
        }, [_c('font-awesome-icon', {
          class: _vm.params.class,
          attrs: {
            "title": data.value,
            "icon": _vm.params.icon,
            "spin": _vm.params.spin
          }
        })], 1) : _vm._e()];
      }
    }, {
      key: "cell(created_at)",
      fn: function (data) {
        return [data.value ? _c('div', [_vm._v(_vm._s(data.value))]) : _vm._e()];
      }
    }, {
      key: "cell(updated_at)",
      fn: function (data) {
        return [data.value ? _c('div', [_vm._v(_vm._s(data.value))]) : _vm._e()];
      }
    }, {
      key: "cell(completed_at)",
      fn: function (data) {
        return [data.value ? _c('div', [_vm._v(_vm._s(data.value))]) : _vm._e()];
      }
    }, {
      key: "cell(type)",
      fn: function (data) {
        return [data.value ? _c('div', {
          staticClass: "d-flex justify-content-center align-items-center"
        }, [data.value == 'import' ? _c('font-awesome-icon', {
          staticClass: "text-primary",
          attrs: {
            "title": data.value,
            "icon": ['fas', 'file-import']
          }
        }) : data.value == 'export' ? _c('font-awesome-icon', {
          staticClass: "text-danger",
          attrs: {
            "title": data.value,
            "icon": ['fas', 'file-export']
          }
        }) : _vm._e()], 1) : _vm._e()];
      }
    }, {
      key: "cell(actions)",
      fn: function (data) {
        return [data.item.id ? _c('div', {
          staticClass: "d-flex"
        }, [_c('b-button', {
          attrs: {
            "size": "sm",
            "variant": "outline-secondary"
          },
          on: {
            "click": function ($event) {
              return _vm.showSettings(data.item.settings);
            }
          }
        }, [_c('font-awesome-icon', {
          attrs: {
            "icon": ['fas', 'eye'],
            "fixed-width": ""
          }
        })], 1), data.item.status == 'stopped' ? _c('b-button', {
          staticClass: "ml-2",
          attrs: {
            "variant": "outline-success",
            "size": "sm"
          },
          on: {
            "click": function ($event) {
              return _vm.confirmStartTask(data.item.id);
            }
          }
        }, [_c('font-awesome-icon', {
          attrs: {
            "icon": ['fas', 'sync-alt'],
            "fixed-width": ""
          }
        })], 1) : _c('b-button', {
          staticClass: "ml-2",
          attrs: {
            "variant": "outline-primary",
            "size": "sm",
            "disabled": _vm.getStopDisabled(data.item.status)
          },
          on: {
            "click": function ($event) {
              return _vm.confirmStopTask(data.item.id);
            }
          }
        }, [_c('font-awesome-icon', {
          attrs: {
            "icon": ['fas', 'stopwatch'],
            "fixed-width": ""
          }
        })], 1), _c('b-button', {
          staticClass: "ml-2",
          attrs: {
            "variant": "outline-danger",
            "size": "sm",
            "disabled": _vm.getDeleteDisabled(data.item.status)
          },
          on: {
            "click": function ($event) {
              return _vm.confirmDeleteTask(data.item.id);
            }
          }
        }, [_c('font-awesome-icon', {
          attrs: {
            "icon": ['fas', 'trash'],
            "fixed-width": ""
          }
        })], 1), _vm.debugMode ? _c('b-button', {
          staticClass: "ml-2",
          attrs: {
            "variant": "outline-success",
            "size": "sm"
          },
          on: {
            "click": function ($event) {
              return _vm.showEdit(data.item);
            }
          }
        }, [_c('font-awesome-icon', {
          attrs: {
            "icon": ['fas', 'edit'],
            "fixed-width": ""
          }
        })], 1) : _vm._e()], 1) : _vm._e()];
      }
    }])
  })], 1), _vm.hasItems ? _c('b-pagination', {
    staticClass: "mb-2",
    attrs: {
      "total-rows": _vm.rows,
      "per-page": _vm.per_page,
      "aria-controls": "my-table",
      "size": "sm"
    },
    model: {
      value: _vm.current_page,
      callback: function ($$v) {
        _vm.current_page = $$v;
      },
      expression: "current_page"
    }
  }) : _vm._e(), _c('b-modal', {
    ref: "modal-settings",
    attrs: {
      "title": "Settings",
      "ok-only": ""
    }
  }, [_c('pre', [_vm._v(_vm._s(_vm.current_settings))])]), _c('b-modal', {
    ref: "modal-edit",
    attrs: {
      "title": "Edit",
      "hide-footer": ""
    }
  }, [_c('EditJob', {
    attrs: {
      "job": _vm.editing_data
    },
    scopedSlots: _vm._u([{
      key: "footer",
      fn: function ({
        form,
        object_keys
      }) {
        return [_c('div', {
          staticClass: "d-flex justify-content-end"
        }, [_c('b-button', {
          staticClass: "mr-2",
          attrs: {
            "size": "sm",
            "variant": "secondary"
          },
          on: {
            "click": function ($event) {
              return _vm.$refs['modal-edit'].hide();
            }
          }
        }, [_vm._v("Cancel")]), _c('b-button', {
          attrs: {
            "size": "sm",
            "variant": "success"
          },
          on: {
            "click": function ($event) {
              return _vm.editJob(form, object_keys);
            }
          }
        }, [_vm._v("OK")])], 1)];
      }
    }])
  })], 1)], 1);
};
var JobsTablevue_type_template_id_210fe272_scoped_true_staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(629);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/EditJob.vue?vue&type=template&id=32029953&
var EditJobvue_type_template_id_32029953_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_vm._l(_vm.form, function (value, key) {
    return _c('b-form-group', {
      key: key,
      attrs: {
        "label": key,
        "label-for": `input-${key}`
      }
    }, [typeof value == 'boolean' ? _c('b-form-checkbox', {
      attrs: {
        "id": `input-${key}`
      },
      model: {
        value: _vm.form[key],
        callback: function ($$v) {
          _vm.$set(_vm.form, key, $$v);
        },
        expression: "form[key]"
      }
    }) : _c('b-form-input', {
      attrs: {
        "id": `input-${key}`
      },
      model: {
        value: _vm.form[key],
        callback: function ($$v) {
          _vm.$set(_vm.form, key, $$v);
        },
        expression: "form[key]"
      }
    })], 1);
  }), _c('footer', [_vm._t("footer", null, {
    "form": _vm.form,
    "object_keys": _vm.object_keys
  })], 2)], 2);
};
var EditJobvue_type_template_id_32029953_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/EditJob.vue?vue&type=script&lang=js&

/* harmony default export */ var EditJobvue_type_script_lang_js_ = ({
  data() {
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
    editObject(key, value) {
      console.log(key, value);
      if (typeof value != 'object') return;
    }
  },
  watch: {
    job: {
      immediate: true,
      handler(job) {
        for (let [key, value] of Object.entries(job)) {
          if (value == null) value = undefined;
          /**
           * stringify objects for editing, but keep track of the key
           * to convert it back to object before sending to server
           */else if (typeof value == 'object') {
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
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/JobsTable.vue?vue&type=script&lang=js&



const statusList = Object.freeze({
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
  data() {
    return {
      items: [],
      metadata: {},
      fields: [{
        key: 'id',
        lable: 'ID'
      }, {
        key: 'status',
        lable: 'Status'
      },
      // {key: 'filename', lable: 'Filename'},
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
  async created() {},
  computed: {
    ...(0,vuex_esm/* mapState */.rn)({
      debugMode: state => state.app.debugMode
    }),
    fields_proxy() {
      const items = [...this.items];
      if (items.length == 0) return [];
      let keys = items.reduce((accumulator, item) => {
        let keys = Object.keys(item);
        return [...accumulator, ...keys];
      }, []);
      return [...keys, ...this.fields];
    },
    items_proxy() {
      const items = [...this.items];
      let remainder = this.per_page - items.length;
      if (remainder < 0) remainder = 0;
      for (let i = 0; i < remainder; i++) items.push({});
      return items;
    },
    rows() {
      const {
        total = 0
      } = this.metadata;
      return total;
    },
    hasItems() {
      try {
        return this.items.length > 0;
      } catch (error) {
        return false;
      }
    }
  },
  watch: {
    current_page: {
      immediate: true,
      handler() {
        this.getItems();
      }
    }
  },
  methods: {
    async getItems() {
      try {
        this.loading = true;
        this.items = [];
        this.metadata = {};
        const limit = this.per_page;
        const start = this.per_page * (this.current_page - 1);
        const response = await this.$API.dispatch('jobs/get', {
          start,
          limit
        });
        const {
          data = {}
        } = response;
        const {
          data: list = {},
          metadata = {}
        } = data;
        this.items = list;
        this.metadata = metadata;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async handleOkDelete() {
      const response = await this.$API.dispatch('jobs/delete');
      console.log(response);
      this.getItems();
    },
    getStopDisabled(status) {
      return status != statusList.PROCESSING;
    },
    getDeleteDisabled(status) {
      const disabled_status = [statusList.PROCESSING, statusList.DELETED];
      return disabled_status.indexOf(status) >= 0;
    },
    getStatusIcon(status) {
      let params = {
        icon: ['fas', 'tasks'],
        spin: false
      };
      switch (status) {
        case statusList.READY:
          params = {
            ...params,
            ...{
              icon: ['fas', 'bookmark'],
              class: 'text-primary'
            }
          };
          break;
        case statusList.COMPLETED:
          params = {
            ...params,
            ...{
              icon: ['fas', 'check-circle'],
              class: 'text-success'
            }
          };
          break;
        case statusList.PROCESSING:
          params = {
            ...params,
            ...{
              icon: ['fas', 'spinner'],
              class: 'text-secondary',
              spin: true
            }
          };
          break;
        case statusList.ERROR:
          params = {
            ...params,
            ...{
              icon: ['fas', 'exclamation-circle'],
              class: 'text-danger'
            }
          };
          break;
        case statusList.STOPPED:
          params = {
            ...params,
            ...{
              icon: ['fas', 'stop-circle'],
              class: 'text-secondary'
            }
          };
          break;
        case statusList.DELETED:
          params = {
            ...params,
            ...{
              icon: ['fas', 'minus-circle'],
              class: 'text-danger'
            }
          };
          break;
        default:
          break;
      }
      return params;
    },
    async confirmStopTask(id) {
      const message = `Do you want to stop this job?`;
      const title = `Stop job ID ${id}`;
      const response = await this.$bvModal.msgBoxConfirm(message, {
        title: title,
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'primary',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true
      });
      if (response) this.stopTask(id);
    },
    async stopTask(id) {
      let message, title, variant;
      try {
        await this.$API.dispatch('jobs/stop', {
          id
        });
        message = `The job id ${id} has been stopped.`;
        title = 'Success';
        variant = 'success';
      } catch (error) {
        message = `There was an error stopping the job ID ${id}.`;
        title = 'Error';
        variant = 'danger';
      } finally {
        this.$bvToast.toast(message, {
          title: title,
          autoHideDelay: 1500,
          appendToast: true,
          variant
        });
        this.getItems();
      }
    },
    async confirmStartTask(id) {
      const message = `Do you want to restart this job?`;
      const title = `Start job ID ${id}`;
      const response = await this.$bvModal.msgBoxConfirm(message, {
        title: title,
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'primary',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true
      });
      if (response) this.startTask(id);
    },
    async startTask(id) {
      let message, title, variant;
      try {
        await this.$API.dispatch('jobs/start', {
          id
        });
        message = `The job id ${id} has been started.`;
        title = 'Success';
        variant = 'success';
      } catch (error) {
        message = `There was an error starting the job ID ${id}.`;
        title = 'Error';
        variant = 'danger';
      } finally {
        this.$bvToast.toast(message, {
          title: title,
          autoHideDelay: 1500,
          appendToast: true,
          variant
        });
        this.getItems();
      }
    },
    async confirmDeleteTask(id) {
      const message = `Do you want to delete this job?`;
      const title = `Delete job ID ${id}`;
      const response = await this.$bvModal.msgBoxConfirm(message, {
        title: title,
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true
      });
      if (response) this.deleteTask(id);
    },
    async deleteTask(id) {
      let message, title, variant;
      try {
        await this.$API.dispatch('jobs/delete', {
          id
        });
        message = `The job ID ${id} has been deleted.`;
        title = 'Success';
        variant = 'success';
      } catch (error) {
        message = `There was an error deleting the job ID ${id}.`;
        title = 'Error';
        variant = 'danger';
      } finally {
        this.$bvToast.toast(message, {
          title: title,
          autoHideDelay: 1500,
          appendToast: true,
          variant
        });
        this.getItems();
      }
    },
    showSettings(settings) {
      const modal = this.$refs['modal-settings'];
      if (!modal) return;
      this.current_settings = settings;
      modal.show();
    },
    showEdit(data) {
      const modal = this.$refs['modal-edit'];
      if (!modal) return;
      this.editing_data = data;
      modal.show();
    },
    async editJob(form, object_keys) {
      try {
        const data = {
          ...form
        };
        const {
          id
        } = data;
        // convert back strings that were objects before being edited in the form
        for (let key of object_keys) {
          const converted = JSON.parse(data[key]); // will throw error if cannot parse
          data[key] = converted;
        }
        await this.$API.dispatch('jobs/update', {
          id,
          data: {
            ...data
          }
        });
      } catch (error) {
        console.log(error);
        this.$bvModal.msgBoxOk('The JSON object is malformed and cannot be parsed. Data will not be updated.', {
          title: 'Error parsing JSON',
          // size: 'sm',
          buttonSize: 'sm',
          okVariant: 'secondary',
          centered: true
        });
      } finally {
        const modal = this.$refs['modal-edit'];
        if (modal) modal.hide();
        this.getItems();
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/JobsTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JobsTablevue_type_script_lang_js_ = (JobsTablevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/JobsTable.vue?vue&type=style&index=0&id=210fe272&prod&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/JobsTable.vue?vue&type=style&index=0&id=210fe272&prod&scoped=true&lang=css&

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
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Jobs.vue?vue&type=script&lang=js&

/* harmony default export */ var Jobsvue_type_script_lang_js_ = ({
  components: {
    JobsTable: JobsTable
  },
  computed: {}
});
;// CONCATENATED MODULE: ./src/pages/Jobs.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Jobsvue_type_script_lang_js_ = (Jobsvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Jobs.vue?vue&type=style&index=0&id=6e58a1a0&prod&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/pages/Jobs.vue?vue&type=style&index=0&id=6e58a1a0&prod&scoped=true&lang=css&

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
//# sourceMappingURL=advanced_import.common.597.js.map