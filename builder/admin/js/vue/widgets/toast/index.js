import Vue from 'vue';
import Toast from './Toast';

import config from '../../utils/config_element';
import {merge} from '../../utils';
import {registerComponentProgrammatic} from '../../utils/plugins';

const ToastProgrammatic = {
  open(params) {
    let parent;
    if (typeof params === 'string') {
      params = {
        message: params,
      };
    }

    const defaultParam = {
      position: config.defaultToastPosition || 'is-top',
    };
    if (params.parent) {
      parent = params.parent;
      delete params.parent;
    }
    const propsData = merge(defaultParam, params);

    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;
    const ToastComponent = vm.extend(Toast);
    return new ToastComponent({
      parent,
      el: document.createElement('div'),
      propsData,
    });
  },
};

const Plugin = {
  install(Vue) {
    registerComponentProgrammatic(Vue, 'toast', ToastProgrammatic);
  },
};

// use(Plugin)

export default Plugin;

export {
  ToastProgrammatic,
};