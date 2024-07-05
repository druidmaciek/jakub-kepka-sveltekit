var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = {exports: {}}).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// node_modules/svelte/internal/index.js
var require_internal = __commonJS({
  "node_modules/svelte/internal/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    function noop3() {
    }
    var identity2 = (x) => x;
    function assign2(tar, src2) {
      for (const k in src2)
        tar[k] = src2[k];
      return tar;
    }
    function is_promise(value) {
      return value && typeof value === "object" && typeof value.then === "function";
    }
    function add_location(element2, file, line, column, char) {
      element2.__svelte_meta = {
        loc: {file, line, column, char}
      };
    }
    function run2(fn) {
      return fn();
    }
    function blank_object2() {
      return Object.create(null);
    }
    function run_all2(fns) {
      fns.forEach(run2);
    }
    function is_function2(thing) {
      return typeof thing === "function";
    }
    function safe_not_equal2(a, b) {
      return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
    }
    function not_equal(a, b) {
      return a != a ? b == b : a !== b;
    }
    function is_empty2(obj) {
      return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
      if (store != null && typeof store.subscribe !== "function") {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
      }
    }
    function subscribe2(store, ...callbacks) {
      if (store == null) {
        return noop3;
      }
      const unsub = store.subscribe(...callbacks);
      return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value(store) {
      let value;
      subscribe2(store, (_2) => value = _2)();
      return value;
    }
    function component_subscribe(component, store, callback) {
      component.$$.on_destroy.push(subscribe2(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
      if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
      }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
      return definition[1] && fn ? assign2($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
      if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === void 0) {
          return lets;
        }
        if (typeof lets === "object") {
          const merged = [];
          const len = Math.max($$scope.dirty.length, lets.length);
          for (let i = 0; i < len; i += 1) {
            merged[i] = $$scope.dirty[i] | lets[i];
          }
          return merged;
        }
        return $$scope.dirty | lets;
      }
      return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
      const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
      if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
      }
    }
    function update_slot_spread(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_spread_changes_fn, get_slot_context_fn) {
      const slot_changes = get_slot_spread_changes_fn(dirty) | get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
      if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
      }
    }
    function exclude_internal_props(props) {
      const result = {};
      for (const k in props)
        if (k[0] !== "$")
          result[k] = props[k];
      return result;
    }
    function compute_rest_props(props, keys) {
      const rest = {};
      keys = new Set(keys);
      for (const k in props)
        if (!keys.has(k) && k[0] !== "$")
          rest[k] = props[k];
      return rest;
    }
    function compute_slots(slots) {
      const result = {};
      for (const key in slots) {
        result[key] = true;
      }
      return result;
    }
    function once(fn) {
      let ran = false;
      return function(...args) {
        if (ran)
          return;
        ran = true;
        fn.call(this, ...args);
      };
    }
    function null_to_empty(value) {
      return value == null ? "" : value;
    }
    function set_store_value(store, ret, value = ret) {
      store.set(value);
      return ret;
    }
    var has_prop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    function action_destroyer(action_result) {
      return action_result && is_function2(action_result.destroy) ? action_result.destroy : noop3;
    }
    var is_client = typeof window !== "undefined";
    exports.now = is_client ? () => window.performance.now() : () => Date.now();
    exports.raf = is_client ? (cb) => requestAnimationFrame(cb) : noop3;
    function set_now(fn) {
      exports.now = fn;
    }
    function set_raf(fn) {
      exports.raf = fn;
    }
    var tasks2 = new Set();
    function run_tasks(now) {
      tasks2.forEach((task) => {
        if (!task.c(now)) {
          tasks2.delete(task);
          task.f();
        }
      });
      if (tasks2.size !== 0)
        exports.raf(run_tasks);
    }
    function clear_loops() {
      tasks2.clear();
    }
    function loop(callback) {
      let task;
      if (tasks2.size === 0)
        exports.raf(run_tasks);
      return {
        promise: new Promise((fulfill) => {
          tasks2.add(task = {c: callback, f: fulfill});
        }),
        abort() {
          tasks2.delete(task);
        }
      };
    }
    function append(target, node) {
      target.appendChild(node);
    }
    function insert(target, node, anchor) {
      target.insertBefore(node, anchor || null);
    }
    function detach(node) {
      node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
      for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
          iterations[i].d(detaching);
      }
    }
    function element(name) {
      return document.createElement(name);
    }
    function element_is(name, is) {
      return document.createElement(name, {is});
    }
    function object_without_properties(obj, exclude) {
      const target = {};
      for (const k in obj) {
        if (has_prop(obj, k) && exclude.indexOf(k) === -1) {
          target[k] = obj[k];
        }
      }
      return target;
    }
    function svg_element(name) {
      return document.createElementNS("http://www.w3.org/2000/svg", name);
    }
    function text(data) {
      return document.createTextNode(data);
    }
    function space() {
      return text(" ");
    }
    function empty2() {
      return text("");
    }
    function listen(node, event, handler, options2) {
      node.addEventListener(event, handler, options2);
      return () => node.removeEventListener(event, handler, options2);
    }
    function prevent_default(fn) {
      return function(event) {
        event.preventDefault();
        return fn.call(this, event);
      };
    }
    function stop_propagation(fn) {
      return function(event) {
        event.stopPropagation();
        return fn.call(this, event);
      };
    }
    function self2(fn) {
      return function(event) {
        if (event.target === this)
          fn.call(this, event);
      };
    }
    function attr(node, attribute, value) {
      if (value == null)
        node.removeAttribute(attribute);
      else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
      const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
      for (const key in attributes) {
        if (attributes[key] == null) {
          node.removeAttribute(key);
        } else if (key === "style") {
          node.style.cssText = attributes[key];
        } else if (key === "__value") {
          node.value = node[key] = attributes[key];
        } else if (descriptors[key] && descriptors[key].set) {
          node[key] = attributes[key];
        } else {
          attr(node, key, attributes[key]);
        }
      }
    }
    function set_svg_attributes(node, attributes) {
      for (const key in attributes) {
        attr(node, key, attributes[key]);
      }
    }
    function set_custom_element_data(node, prop, value) {
      if (prop in node) {
        node[prop] = typeof node[prop] === "boolean" && value === "" ? true : value;
      } else {
        attr(node, prop, value);
      }
    }
    function xlink_attr(node, attribute, value) {
      node.setAttributeNS("http://www.w3.org/1999/xlink", attribute, value);
    }
    function get_binding_group_value(group, __value, checked) {
      const value = new Set();
      for (let i = 0; i < group.length; i += 1) {
        if (group[i].checked)
          value.add(group[i].__value);
      }
      if (!checked) {
        value.delete(__value);
      }
      return Array.from(value);
    }
    function to_number(value) {
      return value === "" ? null : +value;
    }
    function time_ranges_to_array(ranges) {
      const array = [];
      for (let i = 0; i < ranges.length; i += 1) {
        array.push({start: ranges.start(i), end: ranges.end(i)});
      }
      return array;
    }
    function children(element2) {
      return Array.from(element2.childNodes);
    }
    function claim_element(nodes, name, attributes, svg) {
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeName === name) {
          let j = 0;
          const remove = [];
          while (j < node.attributes.length) {
            const attribute = node.attributes[j++];
            if (!attributes[attribute.name]) {
              remove.push(attribute.name);
            }
          }
          for (let k = 0; k < remove.length; k++) {
            node.removeAttribute(remove[k]);
          }
          return nodes.splice(i, 1)[0];
        }
      }
      return svg ? svg_element(name) : element(name);
    }
    function claim_text(nodes, data) {
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeType === 3) {
          node.data = "" + data;
          return nodes.splice(i, 1)[0];
        }
      }
      return text(data);
    }
    function claim_space(nodes) {
      return claim_text(nodes, " ");
    }
    function set_data(text2, data) {
      data = "" + data;
      if (text2.wholeText !== data)
        text2.data = data;
    }
    function set_input_value(input, value) {
      input.value = value == null ? "" : value;
    }
    function set_input_type(input, type) {
      try {
        input.type = type;
      } catch (e) {
      }
    }
    function set_style(node, key, value, important) {
      node.style.setProperty(key, value, important ? "important" : "");
    }
    function select_option(select, value) {
      for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
          option.selected = true;
          return;
        }
      }
    }
    function select_options(select, value) {
      for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        option.selected = ~value.indexOf(option.__value);
      }
    }
    function select_value(select) {
      const selected_option = select.querySelector(":checked") || select.options[0];
      return selected_option && selected_option.__value;
    }
    function select_multiple_value(select) {
      return [].map.call(select.querySelectorAll(":checked"), (option) => option.__value);
    }
    var crossorigin;
    function is_crossorigin() {
      if (crossorigin === void 0) {
        crossorigin = false;
        try {
          if (typeof window !== "undefined" && window.parent) {
            void window.parent.document;
          }
        } catch (error3) {
          crossorigin = true;
        }
      }
      return crossorigin;
    }
    function add_resize_listener(node, fn) {
      const computed_style = getComputedStyle(node);
      if (computed_style.position === "static") {
        node.style.position = "relative";
      }
      const iframe = element("iframe");
      iframe.setAttribute("style", "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;");
      iframe.setAttribute("aria-hidden", "true");
      iframe.tabIndex = -1;
      const crossorigin2 = is_crossorigin();
      let unsubscribe;
      if (crossorigin2) {
        iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
        unsubscribe = listen(window, "message", (event) => {
          if (event.source === iframe.contentWindow)
            fn();
        });
      } else {
        iframe.src = "about:blank";
        iframe.onload = () => {
          unsubscribe = listen(iframe.contentWindow, "resize", fn);
        };
      }
      append(node, iframe);
      return () => {
        if (crossorigin2) {
          unsubscribe();
        } else if (unsubscribe && iframe.contentWindow) {
          unsubscribe();
        }
        detach(iframe);
      };
    }
    function toggle_class(element2, name, toggle) {
      element2.classList[toggle ? "add" : "remove"](name);
    }
    function custom_event2(type, detail) {
      const e = document.createEvent("CustomEvent");
      e.initCustomEvent(type, false, false, detail);
      return e;
    }
    function query_selector_all(selector, parent = document.body) {
      return Array.from(parent.querySelectorAll(selector));
    }
    var HtmlTag = class {
      constructor(anchor = null) {
        this.a = anchor;
        this.e = this.n = null;
      }
      m(html, target, anchor = null) {
        if (!this.e) {
          this.e = element(target.nodeName);
          this.t = target;
          this.h(html);
        }
        this.i(anchor);
      }
      h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
      }
      i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
          insert(this.t, this.n[i], anchor);
        }
      }
      p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
      }
      d() {
        this.n.forEach(detach);
      }
    };
    function attribute_to_object(attributes) {
      const result = {};
      for (const attribute of attributes) {
        result[attribute.name] = attribute.value;
      }
      return result;
    }
    function get_custom_elements_slots(element2) {
      const result = {};
      element2.childNodes.forEach((node) => {
        result[node.slot || "default"] = true;
      });
      return result;
    }
    var active_docs2 = new Set();
    var active = 0;
    function hash2(str) {
      let hash3 = 5381;
      let i = str.length;
      while (i--)
        hash3 = (hash3 << 5) - hash3 ^ str.charCodeAt(i);
      return hash3 >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
      const step = 16.666 / duration;
      let keyframes = "{\n";
      for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}
`;
      }
      const rule = keyframes + `100% {${fn(b, 1 - b)}}
}`;
      const name = `__svelte_${hash2(rule)}_${uid}`;
      const doc = node.ownerDocument;
      active_docs2.add(doc);
      const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element("style")).sheet);
      const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
      if (!current_rules[name]) {
        current_rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
      }
      const animation = node.style.animation || "";
      node.style.animation = `${animation ? `${animation}, ` : ""}${name} ${duration}ms linear ${delay}ms 1 both`;
      active += 1;
      return name;
    }
    function delete_rule(node, name) {
      const previous = (node.style.animation || "").split(", ");
      const next = previous.filter(name ? (anim) => anim.indexOf(name) < 0 : (anim) => anim.indexOf("__svelte") === -1);
      const deleted = previous.length - next.length;
      if (deleted) {
        node.style.animation = next.join(", ");
        active -= deleted;
        if (!active)
          clear_rules();
      }
    }
    function clear_rules() {
      exports.raf(() => {
        if (active)
          return;
        active_docs2.forEach((doc) => {
          const stylesheet = doc.__svelte_stylesheet;
          let i = stylesheet.cssRules.length;
          while (i--)
            stylesheet.deleteRule(i);
          doc.__svelte_rules = {};
        });
        active_docs2.clear();
      });
    }
    function create_animation(node, from, fn, params) {
      if (!from)
        return noop3;
      const to = node.getBoundingClientRect();
      if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
        return noop3;
      const {
        delay = 0,
        duration = 300,
        easing = identity2,
        start: start_time = exports.now() + delay,
        end = start_time + duration,
        tick: tick3 = noop3,
        css: css2
      } = fn(node, {from, to}, params);
      let running = true;
      let started = false;
      let name;
      function start() {
        if (css2) {
          name = create_rule(node, 0, 1, duration, delay, easing, css2);
        }
        if (!delay) {
          started = true;
        }
      }
      function stop() {
        if (css2)
          delete_rule(node, name);
        running = false;
      }
      loop((now) => {
        if (!started && now >= start_time) {
          started = true;
        }
        if (started && now >= end) {
          tick3(1, 0);
          stop();
        }
        if (!running) {
          return false;
        }
        if (started) {
          const p = now - start_time;
          const t = 0 + 1 * easing(p / duration);
          tick3(t, 1 - t);
        }
        return true;
      });
      start();
      tick3(0, 1);
      return stop;
    }
    function fix_position(node) {
      const style = getComputedStyle(node);
      if (style.position !== "absolute" && style.position !== "fixed") {
        const {width, height} = style;
        const a = node.getBoundingClientRect();
        node.style.position = "absolute";
        node.style.width = width;
        node.style.height = height;
        add_transform(node, a);
      }
    }
    function add_transform(node, a) {
      const b = node.getBoundingClientRect();
      if (a.left !== b.left || a.top !== b.top) {
        const style = getComputedStyle(node);
        const transform = style.transform === "none" ? "" : style.transform;
        node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
      }
    }
    function set_current_component2(component) {
      exports.current_component = component;
    }
    function get_current_component2() {
      if (!exports.current_component)
        throw new Error("Function called outside component initialization");
      return exports.current_component;
    }
    function beforeUpdate2(fn) {
      get_current_component2().$$.before_update.push(fn);
    }
    function onMount2(fn) {
      get_current_component2().$$.on_mount.push(fn);
    }
    function afterUpdate2(fn) {
      get_current_component2().$$.after_update.push(fn);
    }
    function onDestroy2(fn) {
      get_current_component2().$$.on_destroy.push(fn);
    }
    function createEventDispatcher2() {
      const component = get_current_component2();
      return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
          const event = custom_event2(type, detail);
          callbacks.slice().forEach((fn) => {
            fn.call(component, event);
          });
        }
      };
    }
    function setContext2(key, context) {
      get_current_component2().$$.context.set(key, context);
    }
    function getContext2(key) {
      return get_current_component2().$$.context.get(key);
    }
    function hasContext2(key) {
      return get_current_component2().$$.context.has(key);
    }
    function bubble(component, event) {
      const callbacks = component.$$.callbacks[event.type];
      if (callbacks) {
        callbacks.slice().forEach((fn) => fn(event));
      }
    }
    var dirty_components = [];
    var intros = {enabled: false};
    var binding_callbacks = [];
    var render_callbacks = [];
    var flush_callbacks = [];
    var resolved_promise2 = Promise.resolve();
    var update_scheduled = false;
    function schedule_update() {
      if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise2.then(flush);
      }
    }
    function tick2() {
      schedule_update();
      return resolved_promise2;
    }
    function add_render_callback(fn) {
      render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
      flush_callbacks.push(fn);
    }
    var flushing = false;
    var seen_callbacks2 = new Set();
    function flush() {
      if (flushing)
        return;
      flushing = true;
      do {
        for (let i = 0; i < dirty_components.length; i += 1) {
          const component = dirty_components[i];
          set_current_component2(component);
          update(component.$$);
        }
        set_current_component2(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
          binding_callbacks.pop()();
        for (let i = 0; i < render_callbacks.length; i += 1) {
          const callback = render_callbacks[i];
          if (!seen_callbacks2.has(callback)) {
            seen_callbacks2.add(callback);
            callback();
          }
        }
        render_callbacks.length = 0;
      } while (dirty_components.length);
      while (flush_callbacks.length) {
        flush_callbacks.pop()();
      }
      update_scheduled = false;
      flushing = false;
      seen_callbacks2.clear();
    }
    function update($$) {
      if ($$.fragment !== null) {
        $$.update();
        run_all2($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
      }
    }
    var promise;
    function wait() {
      if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
          promise = null;
        });
      }
      return promise;
    }
    function dispatch(node, direction, kind) {
      node.dispatchEvent(custom_event2(`${direction ? "intro" : "outro"}${kind}`));
    }
    var outroing2 = new Set();
    var outros;
    function group_outros() {
      outros = {
        r: 0,
        c: [],
        p: outros
      };
    }
    function check_outros() {
      if (!outros.r) {
        run_all2(outros.c);
      }
      outros = outros.p;
    }
    function transition_in(block, local) {
      if (block && block.i) {
        outroing2.delete(block);
        block.i(local);
      }
    }
    function transition_out(block, local, detach2, callback) {
      if (block && block.o) {
        if (outroing2.has(block))
          return;
        outroing2.add(block);
        outros.c.push(() => {
          outroing2.delete(block);
          if (callback) {
            if (detach2)
              block.d(1);
            callback();
          }
        });
        block.o(local);
      }
    }
    var null_transition = {duration: 0};
    function create_in_transition(node, fn, params) {
      let config = fn(node, params);
      let running = false;
      let animation_name;
      let task;
      let uid = 0;
      function cleanup() {
        if (animation_name)
          delete_rule(node, animation_name);
      }
      function go() {
        const {delay = 0, duration = 300, easing = identity2, tick: tick3 = noop3, css: css2} = config || null_transition;
        if (css2)
          animation_name = create_rule(node, 0, 1, duration, delay, easing, css2, uid++);
        tick3(0, 1);
        const start_time = exports.now() + delay;
        const end_time = start_time + duration;
        if (task)
          task.abort();
        running = true;
        add_render_callback(() => dispatch(node, true, "start"));
        task = loop((now) => {
          if (running) {
            if (now >= end_time) {
              tick3(1, 0);
              dispatch(node, true, "end");
              cleanup();
              return running = false;
            }
            if (now >= start_time) {
              const t = easing((now - start_time) / duration);
              tick3(t, 1 - t);
            }
          }
          return running;
        });
      }
      let started = false;
      return {
        start() {
          if (started)
            return;
          delete_rule(node);
          if (is_function2(config)) {
            config = config();
            wait().then(go);
          } else {
            go();
          }
        },
        invalidate() {
          started = false;
        },
        end() {
          if (running) {
            cleanup();
            running = false;
          }
        }
      };
    }
    function create_out_transition(node, fn, params) {
      let config = fn(node, params);
      let running = true;
      let animation_name;
      const group = outros;
      group.r += 1;
      function go() {
        const {delay = 0, duration = 300, easing = identity2, tick: tick3 = noop3, css: css2} = config || null_transition;
        if (css2)
          animation_name = create_rule(node, 1, 0, duration, delay, easing, css2);
        const start_time = exports.now() + delay;
        const end_time = start_time + duration;
        add_render_callback(() => dispatch(node, false, "start"));
        loop((now) => {
          if (running) {
            if (now >= end_time) {
              tick3(0, 1);
              dispatch(node, false, "end");
              if (!--group.r) {
                run_all2(group.c);
              }
              return false;
            }
            if (now >= start_time) {
              const t = easing((now - start_time) / duration);
              tick3(1 - t, t);
            }
          }
          return running;
        });
      }
      if (is_function2(config)) {
        wait().then(() => {
          config = config();
          go();
        });
      } else {
        go();
      }
      return {
        end(reset) {
          if (reset && config.tick) {
            config.tick(1, 0);
          }
          if (running) {
            if (animation_name)
              delete_rule(node, animation_name);
            running = false;
          }
        }
      };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
      let config = fn(node, params);
      let t = intro ? 0 : 1;
      let running_program = null;
      let pending_program = null;
      let animation_name = null;
      function clear_animation() {
        if (animation_name)
          delete_rule(node, animation_name);
      }
      function init3(program, duration) {
        const d = program.b - t;
        duration *= Math.abs(d);
        return {
          a: t,
          b: program.b,
          d,
          duration,
          start: program.start,
          end: program.start + duration,
          group: program.group
        };
      }
      function go(b) {
        const {delay = 0, duration = 300, easing = identity2, tick: tick3 = noop3, css: css2} = config || null_transition;
        const program = {
          start: exports.now() + delay,
          b
        };
        if (!b) {
          program.group = outros;
          outros.r += 1;
        }
        if (running_program || pending_program) {
          pending_program = program;
        } else {
          if (css2) {
            clear_animation();
            animation_name = create_rule(node, t, b, duration, delay, easing, css2);
          }
          if (b)
            tick3(0, 1);
          running_program = init3(program, duration);
          add_render_callback(() => dispatch(node, b, "start"));
          loop((now) => {
            if (pending_program && now > pending_program.start) {
              running_program = init3(pending_program, duration);
              pending_program = null;
              dispatch(node, running_program.b, "start");
              if (css2) {
                clear_animation();
                animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
              }
            }
            if (running_program) {
              if (now >= running_program.end) {
                tick3(t = running_program.b, 1 - t);
                dispatch(node, running_program.b, "end");
                if (!pending_program) {
                  if (running_program.b) {
                    clear_animation();
                  } else {
                    if (!--running_program.group.r)
                      run_all2(running_program.group.c);
                  }
                }
                running_program = null;
              } else if (now >= running_program.start) {
                const p = now - running_program.start;
                t = running_program.a + running_program.d * easing(p / running_program.duration);
                tick3(t, 1 - t);
              }
            }
            return !!(running_program || pending_program);
          });
        }
      }
      return {
        run(b) {
          if (is_function2(config)) {
            wait().then(() => {
              config = config();
              go(b);
            });
          } else {
            go(b);
          }
        },
        end() {
          clear_animation();
          running_program = pending_program = null;
        }
      };
    }
    function handle_promise(promise2, info) {
      const token = info.token = {};
      function update2(type, index2, key, value) {
        if (info.token !== token)
          return;
        info.resolved = value;
        let child_ctx = info.ctx;
        if (key !== void 0) {
          child_ctx = child_ctx.slice();
          child_ctx[key] = value;
        }
        const block = type && (info.current = type)(child_ctx);
        let needs_flush = false;
        if (info.block) {
          if (info.blocks) {
            info.blocks.forEach((block2, i) => {
              if (i !== index2 && block2) {
                group_outros();
                transition_out(block2, 1, 1, () => {
                  if (info.blocks[i] === block2) {
                    info.blocks[i] = null;
                  }
                });
                check_outros();
              }
            });
          } else {
            info.block.d(1);
          }
          block.c();
          transition_in(block, 1);
          block.m(info.mount(), info.anchor);
          needs_flush = true;
        }
        info.block = block;
        if (info.blocks)
          info.blocks[index2] = block;
        if (needs_flush) {
          flush();
        }
      }
      if (is_promise(promise2)) {
        const current_component2 = get_current_component2();
        promise2.then((value) => {
          set_current_component2(current_component2);
          update2(info.then, 1, info.value, value);
          set_current_component2(null);
        }, (error3) => {
          set_current_component2(current_component2);
          update2(info.catch, 2, info.error, error3);
          set_current_component2(null);
          if (!info.hasCatch) {
            throw error3;
          }
        });
        if (info.current !== info.pending) {
          update2(info.pending, 0);
          return true;
        }
      } else {
        if (info.current !== info.then) {
          update2(info.then, 1, info.value, promise2);
          return true;
        }
        info.resolved = promise2;
      }
    }
    function update_await_block_branch(info, ctx, dirty) {
      const child_ctx = ctx.slice();
      const {resolved} = info;
      if (info.current === info.then) {
        child_ctx[info.value] = resolved;
      }
      if (info.current === info.catch) {
        child_ctx[info.error] = resolved;
      }
      info.block.p(child_ctx, dirty);
    }
    var globals2 = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
    function destroy_block(block, lookup) {
      block.d(1);
      lookup.delete(block.key);
    }
    function outro_and_destroy_block(block, lookup) {
      transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
      });
    }
    function fix_and_destroy_block(block, lookup) {
      block.f();
      destroy_block(block, lookup);
    }
    function fix_and_outro_and_destroy_block(block, lookup) {
      block.f();
      outro_and_destroy_block(block, lookup);
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
      let o = old_blocks.length;
      let n = list.length;
      let i = o;
      const old_indexes = {};
      while (i--)
        old_indexes[old_blocks[i].key] = i;
      const new_blocks = [];
      const new_lookup = new Map();
      const deltas = new Map();
      i = n;
      while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
          block = create_each_block(key, child_ctx);
          block.c();
        } else if (dynamic) {
          block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
          deltas.set(key, Math.abs(i - old_indexes[key]));
      }
      const will_move = new Set();
      const did_move = new Set();
      function insert2(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
      }
      while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
          next = new_block.first;
          o--;
          n--;
        } else if (!new_lookup.has(old_key)) {
          destroy(old_block, lookup);
          o--;
        } else if (!lookup.has(new_key) || will_move.has(new_key)) {
          insert2(new_block);
        } else if (did_move.has(old_key)) {
          o--;
        } else if (deltas.get(new_key) > deltas.get(old_key)) {
          did_move.add(new_key);
          insert2(new_block);
        } else {
          will_move.add(old_key);
          o--;
        }
      }
      while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
          destroy(old_block, lookup);
      }
      while (n)
        insert2(new_blocks[n - 1]);
      return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
      const keys = new Set();
      for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
          throw new Error("Cannot have duplicate keys in a keyed each");
        }
        keys.add(key);
      }
    }
    function get_spread_update(levels, updates) {
      const update2 = {};
      const to_null_out = {};
      const accounted_for = {$$scope: 1};
      let i = levels.length;
      while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
          for (const key in o) {
            if (!(key in n))
              to_null_out[key] = 1;
          }
          for (const key in n) {
            if (!accounted_for[key]) {
              update2[key] = n[key];
              accounted_for[key] = 1;
            }
          }
          levels[i] = n;
        } else {
          for (const key in o) {
            accounted_for[key] = 1;
          }
        }
      }
      for (const key in to_null_out) {
        if (!(key in update2))
          update2[key] = void 0;
      }
      return update2;
    }
    function get_spread_object(spread_props) {
      return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
    }
    var boolean_attributes2 = new Set([
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ]);
    var invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    function spread(args, classes_to_add) {
      const attributes = Object.assign({}, ...args);
      if (classes_to_add) {
        if (attributes.class == null) {
          attributes.class = classes_to_add;
        } else {
          attributes.class += " " + classes_to_add;
        }
      }
      let str = "";
      Object.keys(attributes).forEach((name) => {
        if (invalid_attribute_name_character.test(name))
          return;
        const value = attributes[name];
        if (value === true)
          str += " " + name;
        else if (boolean_attributes2.has(name.toLowerCase())) {
          if (value)
            str += " " + name;
        } else if (value != null) {
          str += ` ${name}="${String(value).replace(/"/g, "&#34;").replace(/'/g, "&#39;")}"`;
        }
      });
      return str;
    }
    var escaped3 = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    function escape4(html) {
      return String(html).replace(/["'&<>]/g, (match) => escaped3[match]);
    }
    function each2(items, fn) {
      let str = "";
      for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
      }
      return str;
    }
    var missing_component2 = {
      $$render: () => ""
    };
    function validate_component2(component, name) {
      if (!component || !component.$$render) {
        if (name === "svelte:component")
          name += " this={...}";
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
      }
      return component;
    }
    function debug(file, line, column, values) {
      console.log(`{@debug} ${file ? file + " " : ""}(${line}:${column})`);
      console.log(values);
      return "";
    }
    var on_destroy2;
    function create_ssr_component2(fn) {
      function $$render(result, props, bindings, slots, context) {
        const parent_component = exports.current_component;
        const $$ = {
          on_destroy: on_destroy2,
          context: new Map(parent_component ? parent_component.$$.context : context || []),
          on_mount: [],
          before_update: [],
          after_update: [],
          callbacks: blank_object2()
        };
        set_current_component2({$$});
        const html = fn(result, props, bindings, slots);
        set_current_component2(parent_component);
        return html;
      }
      return {
        render: (props = {}, {$$slots = {}, context = new Map()} = {}) => {
          on_destroy2 = [];
          const result = {title: "", head: "", css: new Set()};
          const html = $$render(result, props, {}, $$slots, context);
          run_all2(on_destroy2);
          return {
            html,
            css: {
              code: Array.from(result.css).map((css2) => css2.code).join("\n"),
              map: null
            },
            head: result.title + result.head
          };
        },
        $$render
      };
    }
    function add_attribute2(name, value, boolean) {
      if (value == null || boolean && !value)
        return "";
      return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape4(value)) : `"${value}"`}`}`;
    }
    function add_classes(classes) {
      return classes ? ` class="${classes}"` : "";
    }
    function bind(component, name, callback) {
      const index2 = component.$$.props[name];
      if (index2 !== void 0) {
        component.$$.bound[index2] = callback;
        callback(component.$$.ctx[index2]);
      }
    }
    function create_component(block) {
      block && block.c();
    }
    function claim_component(block, parent_nodes) {
      block && block.l(parent_nodes);
    }
    function mount_component(component, target, anchor, customElement) {
      const {fragment, on_mount, on_destroy: on_destroy3, after_update} = component.$$;
      fragment && fragment.m(target, anchor);
      if (!customElement) {
        add_render_callback(() => {
          const new_on_destroy = on_mount.map(run2).filter(is_function2);
          if (on_destroy3) {
            on_destroy3.push(...new_on_destroy);
          } else {
            run_all2(new_on_destroy);
          }
          component.$$.on_mount = [];
        });
      }
      after_update.forEach(add_render_callback);
    }
    function destroy_component2(component, detaching) {
      const $$ = component.$$;
      if ($$.fragment !== null) {
        run_all2($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
      }
    }
    function make_dirty(component, i) {
      if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
      }
      component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
    }
    function init2(component, options2, instance, create_fragment, not_equal2, props, dirty = [-1]) {
      const parent_component = exports.current_component;
      set_current_component2(component);
      const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        props,
        update: noop3,
        not_equal: not_equal2,
        bound: blank_object2(),
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : options2.context || []),
        callbacks: blank_object2(),
        dirty,
        skip_bound: false
      };
      let ready = false;
      $$.ctx = instance ? instance(component, options2.props || {}, (i, ret, ...rest) => {
        const value = rest.length ? rest[0] : ret;
        if ($$.ctx && not_equal2($$.ctx[i], $$.ctx[i] = value)) {
          if (!$$.skip_bound && $$.bound[i])
            $$.bound[i](value);
          if (ready)
            make_dirty(component, i);
        }
        return ret;
      }) : [];
      $$.update();
      ready = true;
      run_all2($$.before_update);
      $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
      if (options2.target) {
        if (options2.hydrate) {
          const nodes = children(options2.target);
          $$.fragment && $$.fragment.l(nodes);
          nodes.forEach(detach);
        } else {
          $$.fragment && $$.fragment.c();
        }
        if (options2.intro)
          transition_in(component.$$.fragment);
        mount_component(component, options2.target, options2.anchor, options2.customElement);
        flush();
      }
      set_current_component2(parent_component);
    }
    if (typeof HTMLElement === "function") {
      exports.SvelteElement = class extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({mode: "open"});
        }
        connectedCallback() {
          const {on_mount} = this.$$;
          this.$$.on_disconnect = on_mount.map(run2).filter(is_function2);
          for (const key in this.$$.slotted) {
            this.appendChild(this.$$.slotted[key]);
          }
        }
        attributeChangedCallback(attr2, _oldValue, newValue) {
          this[attr2] = newValue;
        }
        disconnectedCallback() {
          run_all2(this.$$.on_disconnect);
        }
        $destroy() {
          destroy_component2(this, 1);
          this.$destroy = noop3;
        }
        $on(type, callback) {
          const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
          callbacks.push(callback);
          return () => {
            const index2 = callbacks.indexOf(callback);
            if (index2 !== -1)
              callbacks.splice(index2, 1);
          };
        }
        $set($$props) {
          if (this.$$set && !is_empty2($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
          }
        }
      };
    }
    var SvelteComponent = class {
      $destroy() {
        destroy_component2(this, 1);
        this.$destroy = noop3;
      }
      $on(type, callback) {
        const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return () => {
          const index2 = callbacks.indexOf(callback);
          if (index2 !== -1)
            callbacks.splice(index2, 1);
        };
      }
      $set($$props) {
        if (this.$$set && !is_empty2($$props)) {
          this.$$.skip_bound = true;
          this.$$set($$props);
          this.$$.skip_bound = false;
        }
      }
    };
    function dispatch_dev(type, detail) {
      document.dispatchEvent(custom_event2(type, Object.assign({version: "3.38.2"}, detail)));
    }
    function append_dev(target, node) {
      dispatch_dev("SvelteDOMInsert", {target, node});
      append(target, node);
    }
    function insert_dev(target, node, anchor) {
      dispatch_dev("SvelteDOMInsert", {target, node, anchor});
      insert(target, node, anchor);
    }
    function detach_dev(node) {
      dispatch_dev("SvelteDOMRemove", {node});
      detach(node);
    }
    function detach_between_dev(before, after) {
      while (before.nextSibling && before.nextSibling !== after) {
        detach_dev(before.nextSibling);
      }
    }
    function detach_before_dev(after) {
      while (after.previousSibling) {
        detach_dev(after.previousSibling);
      }
    }
    function detach_after_dev(before) {
      while (before.nextSibling) {
        detach_dev(before.nextSibling);
      }
    }
    function listen_dev(node, event, handler, options2, has_prevent_default, has_stop_propagation) {
      const modifiers = options2 === true ? ["capture"] : options2 ? Array.from(Object.keys(options2)) : [];
      if (has_prevent_default)
        modifiers.push("preventDefault");
      if (has_stop_propagation)
        modifiers.push("stopPropagation");
      dispatch_dev("SvelteDOMAddEventListener", {node, event, handler, modifiers});
      const dispose = listen(node, event, handler, options2);
      return () => {
        dispatch_dev("SvelteDOMRemoveEventListener", {node, event, handler, modifiers});
        dispose();
      };
    }
    function attr_dev(node, attribute, value) {
      attr(node, attribute, value);
      if (value == null)
        dispatch_dev("SvelteDOMRemoveAttribute", {node, attribute});
      else
        dispatch_dev("SvelteDOMSetAttribute", {node, attribute, value});
    }
    function prop_dev(node, property, value) {
      node[property] = value;
      dispatch_dev("SvelteDOMSetProperty", {node, property, value});
    }
    function dataset_dev(node, property, value) {
      node.dataset[property] = value;
      dispatch_dev("SvelteDOMSetDataset", {node, property, value});
    }
    function set_data_dev(text2, data) {
      data = "" + data;
      if (text2.wholeText === data)
        return;
      dispatch_dev("SvelteDOMSetData", {node: text2, data});
      text2.data = data;
    }
    function validate_each_argument(arg) {
      if (typeof arg !== "string" && !(arg && typeof arg === "object" && "length" in arg)) {
        let msg = "{#each} only iterates over array-like objects.";
        if (typeof Symbol === "function" && arg && Symbol.iterator in arg) {
          msg += " You can use a spread to convert this iterable into an array.";
        }
        throw new Error(msg);
      }
    }
    function validate_slots(name, slot, keys) {
      for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
          console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
      }
    }
    var SvelteComponentDev2 = class extends SvelteComponent {
      constructor(options2) {
        if (!options2 || !options2.target && !options2.$$inline) {
          throw new Error("'target' is a required option");
        }
        super();
      }
      $destroy() {
        super.$destroy();
        this.$destroy = () => {
          console.warn("Component was already destroyed");
        };
      }
      $capture_state() {
      }
      $inject_state() {
      }
    };
    var SvelteComponentTyped2 = class extends SvelteComponentDev2 {
      constructor(options2) {
        super(options2);
      }
    };
    function loop_guard(timeout) {
      const start = Date.now();
      return () => {
        if (Date.now() - start > timeout) {
          throw new Error("Infinite loop detected");
        }
      };
    }
    exports.HtmlTag = HtmlTag;
    exports.SvelteComponent = SvelteComponent;
    exports.SvelteComponentDev = SvelteComponentDev2;
    exports.SvelteComponentTyped = SvelteComponentTyped2;
    exports.action_destroyer = action_destroyer;
    exports.add_attribute = add_attribute2;
    exports.add_classes = add_classes;
    exports.add_flush_callback = add_flush_callback;
    exports.add_location = add_location;
    exports.add_render_callback = add_render_callback;
    exports.add_resize_listener = add_resize_listener;
    exports.add_transform = add_transform;
    exports.afterUpdate = afterUpdate2;
    exports.append = append;
    exports.append_dev = append_dev;
    exports.assign = assign2;
    exports.attr = attr;
    exports.attr_dev = attr_dev;
    exports.attribute_to_object = attribute_to_object;
    exports.beforeUpdate = beforeUpdate2;
    exports.bind = bind;
    exports.binding_callbacks = binding_callbacks;
    exports.blank_object = blank_object2;
    exports.bubble = bubble;
    exports.check_outros = check_outros;
    exports.children = children;
    exports.claim_component = claim_component;
    exports.claim_element = claim_element;
    exports.claim_space = claim_space;
    exports.claim_text = claim_text;
    exports.clear_loops = clear_loops;
    exports.component_subscribe = component_subscribe;
    exports.compute_rest_props = compute_rest_props;
    exports.compute_slots = compute_slots;
    exports.createEventDispatcher = createEventDispatcher2;
    exports.create_animation = create_animation;
    exports.create_bidirectional_transition = create_bidirectional_transition;
    exports.create_component = create_component;
    exports.create_in_transition = create_in_transition;
    exports.create_out_transition = create_out_transition;
    exports.create_slot = create_slot;
    exports.create_ssr_component = create_ssr_component2;
    exports.custom_event = custom_event2;
    exports.dataset_dev = dataset_dev;
    exports.debug = debug;
    exports.destroy_block = destroy_block;
    exports.destroy_component = destroy_component2;
    exports.destroy_each = destroy_each;
    exports.detach = detach;
    exports.detach_after_dev = detach_after_dev;
    exports.detach_before_dev = detach_before_dev;
    exports.detach_between_dev = detach_between_dev;
    exports.detach_dev = detach_dev;
    exports.dirty_components = dirty_components;
    exports.dispatch_dev = dispatch_dev;
    exports.each = each2;
    exports.element = element;
    exports.element_is = element_is;
    exports.empty = empty2;
    exports.escape = escape4;
    exports.escaped = escaped3;
    exports.exclude_internal_props = exclude_internal_props;
    exports.fix_and_destroy_block = fix_and_destroy_block;
    exports.fix_and_outro_and_destroy_block = fix_and_outro_and_destroy_block;
    exports.fix_position = fix_position;
    exports.flush = flush;
    exports.getContext = getContext2;
    exports.get_binding_group_value = get_binding_group_value;
    exports.get_current_component = get_current_component2;
    exports.get_custom_elements_slots = get_custom_elements_slots;
    exports.get_slot_changes = get_slot_changes;
    exports.get_slot_context = get_slot_context;
    exports.get_spread_object = get_spread_object;
    exports.get_spread_update = get_spread_update;
    exports.get_store_value = get_store_value;
    exports.globals = globals2;
    exports.group_outros = group_outros;
    exports.handle_promise = handle_promise;
    exports.hasContext = hasContext2;
    exports.has_prop = has_prop;
    exports.identity = identity2;
    exports.init = init2;
    exports.insert = insert;
    exports.insert_dev = insert_dev;
    exports.intros = intros;
    exports.invalid_attribute_name_character = invalid_attribute_name_character;
    exports.is_client = is_client;
    exports.is_crossorigin = is_crossorigin;
    exports.is_empty = is_empty2;
    exports.is_function = is_function2;
    exports.is_promise = is_promise;
    exports.listen = listen;
    exports.listen_dev = listen_dev;
    exports.loop = loop;
    exports.loop_guard = loop_guard;
    exports.missing_component = missing_component2;
    exports.mount_component = mount_component;
    exports.noop = noop3;
    exports.not_equal = not_equal;
    exports.null_to_empty = null_to_empty;
    exports.object_without_properties = object_without_properties;
    exports.onDestroy = onDestroy2;
    exports.onMount = onMount2;
    exports.once = once;
    exports.outro_and_destroy_block = outro_and_destroy_block;
    exports.prevent_default = prevent_default;
    exports.prop_dev = prop_dev;
    exports.query_selector_all = query_selector_all;
    exports.run = run2;
    exports.run_all = run_all2;
    exports.safe_not_equal = safe_not_equal2;
    exports.schedule_update = schedule_update;
    exports.select_multiple_value = select_multiple_value;
    exports.select_option = select_option;
    exports.select_options = select_options;
    exports.select_value = select_value;
    exports.self = self2;
    exports.setContext = setContext2;
    exports.set_attributes = set_attributes;
    exports.set_current_component = set_current_component2;
    exports.set_custom_element_data = set_custom_element_data;
    exports.set_data = set_data;
    exports.set_data_dev = set_data_dev;
    exports.set_input_type = set_input_type;
    exports.set_input_value = set_input_value;
    exports.set_now = set_now;
    exports.set_raf = set_raf;
    exports.set_store_value = set_store_value;
    exports.set_style = set_style;
    exports.set_svg_attributes = set_svg_attributes;
    exports.space = space;
    exports.spread = spread;
    exports.stop_propagation = stop_propagation;
    exports.subscribe = subscribe2;
    exports.svg_element = svg_element;
    exports.text = text;
    exports.tick = tick2;
    exports.time_ranges_to_array = time_ranges_to_array;
    exports.to_number = to_number;
    exports.toggle_class = toggle_class;
    exports.transition_in = transition_in;
    exports.transition_out = transition_out;
    exports.update_await_block_branch = update_await_block_branch;
    exports.update_keyed_each = update_keyed_each;
    exports.update_slot = update_slot;
    exports.update_slot_spread = update_slot_spread;
    exports.validate_component = validate_component2;
    exports.validate_each_argument = validate_each_argument;
    exports.validate_each_keys = validate_each_keys;
    exports.validate_slots = validate_slots;
    exports.validate_store = validate_store;
    exports.xlink_attr = xlink_attr;
  }
});

// node_modules/svelte/store/index.js
var require_store = __commonJS({
  "node_modules/svelte/store/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    var internal = require_internal();
    var subscriber_queue2 = [];
    function readable(value, start) {
      return {
        subscribe: writable2(value, start).subscribe
      };
    }
    function writable2(value, start = internal.noop) {
      let stop;
      const subscribers = [];
      function set(new_value) {
        if (internal.safe_not_equal(value, new_value)) {
          value = new_value;
          if (stop) {
            const run_queue = !subscriber_queue2.length;
            for (let i = 0; i < subscribers.length; i += 1) {
              const s2 = subscribers[i];
              s2[1]();
              subscriber_queue2.push(s2, value);
            }
            if (run_queue) {
              for (let i = 0; i < subscriber_queue2.length; i += 2) {
                subscriber_queue2[i][0](subscriber_queue2[i + 1]);
              }
              subscriber_queue2.length = 0;
            }
          }
        }
      }
      function update(fn) {
        set(fn(value));
      }
      function subscribe2(run2, invalidate = internal.noop) {
        const subscriber = [run2, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
          stop = start(set) || internal.noop;
        }
        run2(value);
        return () => {
          const index2 = subscribers.indexOf(subscriber);
          if (index2 !== -1) {
            subscribers.splice(index2, 1);
          }
          if (subscribers.length === 0) {
            stop();
            stop = null;
          }
        };
      }
      return {set, update, subscribe: subscribe2};
    }
    function derived(stores, fn, initial_value) {
      const single = !Array.isArray(stores);
      const stores_array = single ? [stores] : stores;
      const auto = fn.length < 2;
      return readable(initial_value, (set) => {
        let inited = false;
        const values = [];
        let pending = 0;
        let cleanup = internal.noop;
        const sync = () => {
          if (pending) {
            return;
          }
          cleanup();
          const result = fn(single ? values[0] : values, set);
          if (auto) {
            set(result);
          } else {
            cleanup = internal.is_function(result) ? result : internal.noop;
          }
        };
        const unsubscribers = stores_array.map((store, i) => internal.subscribe(store, (value) => {
          values[i] = value;
          pending &= ~(1 << i);
          if (inited) {
            sync();
          }
        }, () => {
          pending |= 1 << i;
        }));
        inited = true;
        sync();
        return function stop() {
          internal.run_all(unsubscribers);
          cleanup();
        };
      });
    }
    Object.defineProperty(exports, "get", {
      enumerable: true,
      get: function() {
        return internal.get_store_value;
      }
    });
    exports.derived = derived;
    exports.readable = readable;
    exports.writable = writable2;
  }
});

// node_modules/deepmerge/dist/cjs.js
var require_cjs = __commonJS({
  "node_modules/deepmerge/dist/cjs.js"(exports, module2) {
    "use strict";
    var isMergeableObject = function isMergeableObject2(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === "object";
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
    function isReactElement(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options2) {
      return options2.clone !== false && options2.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options2) : value;
    }
    function defaultArrayMerge(target, source, options2) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options2);
      });
    }
    function getMergeFunction(key, options2) {
      if (!options2.customMerge) {
        return deepmerge;
      }
      var customMerge = options2.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return target.propertyIsEnumerable(symbol);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
      try {
        return property in object;
      } catch (_2) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key) {
      return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
    }
    function mergeObject(target, source, options2) {
      var destination = {};
      if (options2.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options2);
        });
      }
      getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
          return;
        }
        if (propertyIsOnObject(target, key) && options2.isMergeableObject(source[key])) {
          destination[key] = getMergeFunction(key, options2)(target[key], source[key], options2);
        } else {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options2);
        }
      });
      return destination;
    }
    function deepmerge(target, source, options2) {
      options2 = options2 || {};
      options2.arrayMerge = options2.arrayMerge || defaultArrayMerge;
      options2.isMergeableObject = options2.isMergeableObject || isMergeableObject;
      options2.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options2);
      } else if (sourceIsArray) {
        return options2.arrayMerge(target, source, options2);
      } else {
        return mergeObject(target, source, options2);
      }
    }
    deepmerge.all = function deepmergeAll(array, options2) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next) {
        return deepmerge(prev, next, options2);
      }, {});
    };
    var deepmerge_1 = deepmerge;
    module2.exports = deepmerge_1;
  }
});

// node_modules/intl-messageformat/node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "node_modules/intl-messageformat/node_modules/tslib/tslib.js"(exports, module2) {
    var __extends;
    var __assign;
    var __rest;
    var __decorate;
    var __param;
    var __metadata;
    var __awaiter;
    var __generator;
    var __exportStar;
    var __values;
    var __read;
    var __spread;
    var __spreadArrays;
    var __spreadArray;
    var __await;
    var __asyncGenerator;
    var __asyncDelegator;
    var __asyncValues;
    var __makeTemplateObject;
    var __importStar;
    var __importDefault;
    var __classPrivateFieldGet;
    var __classPrivateFieldSet;
    var __createBinding;
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module2 === "object" && typeof module2.exports === "object") {
        factory(createExporter(root, createExporter(module2.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", {value: true});
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v) {
          return exports2[id] = previous ? previous(id, v) : v;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      __extends = function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
      __assign = Object.assign || function(t) {
        for (var s2, i = 1, n = arguments.length; i < n; i++) {
          s2 = arguments[i];
          for (var p in s2)
            if (Object.prototype.hasOwnProperty.call(s2, p))
              t[p] = s2[p];
        }
        return t;
      };
      __rest = function(s2, e) {
        var t = {};
        for (var p in s2)
          if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
            t[p] = s2[p];
        if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
              t[p[i]] = s2[p[i]];
          }
        return t;
      };
      __decorate = function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      __param = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve2) {
            resolve2(value);
          });
        }
        return new (P || (P = Promise))(function(resolve2, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator = function(thisArg, body) {
        var _2 = {label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: []}, f, y, t, g;
        return g = {next: verb(0), "throw": verb(1), "return": verb(2)}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_2)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _2.label++;
                  return {value: op[1], done: false};
                case 5:
                  _2.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _2.ops.pop();
                  _2.trys.pop();
                  continue;
                default:
                  if (!(t = _2.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _2 = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _2.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _2.label < t[1]) {
                    _2.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _2.label < t[2]) {
                    _2.label = t[2];
                    _2.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _2.ops.pop();
                  _2.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _2);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return {value: op[0] ? op[1] : void 0, done: true};
        }
      };
      __exportStar = function(m, o) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
            __createBinding(o, m, p);
      };
      __createBinding = Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, {enumerable: true, get: function() {
          return m[k];
        }});
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      };
      __values = function(o) {
        var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o[s2], i = 0;
        if (m)
          return m.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i >= o.length)
                o = void 0;
              return {value: o && o[i++], done: !o};
            }
          };
        throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read = function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error3) {
          e = {error: error3};
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      __spread = function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
        return ar;
      };
      __spreadArrays = function() {
        for (var s2 = 0, i = 0, il = arguments.length; i < il; i++)
          s2 += arguments[i].length;
        for (var r = Array(s2), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
        return r;
      };
      __spreadArray = function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      __await = function(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
      };
      __asyncGenerator = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function verb(n) {
          if (g[n])
            i[n] = function(v) {
              return new Promise(function(a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
        }
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v) {
          if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator = function(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function(e) {
          throw e;
        }), verb("return"), i[Symbol.iterator] = function() {
          return this;
        }, i;
        function verb(n, f) {
          i[n] = o[n] ? function(v) {
            return (p = !p) ? {value: __await(o[n](v)), done: n === "return"} : f ? f(v) : v;
          } : f;
        }
      };
      __asyncValues = function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v) {
            return new Promise(function(resolve2, reject) {
              v = o[n](v), settle(resolve2, reject, v.done, v.value);
            });
          };
        }
        function settle(resolve2, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve2({value: v2, done: d});
          }, reject);
        }
      };
      __makeTemplateObject = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", {value: raw});
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", {enumerable: true, value: v});
      } : function(o, v) {
        o["default"] = v;
      };
      __importStar = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {"default": mod};
      };
      __classPrivateFieldGet = function(receiver, state, kind, f) {
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };
      __classPrivateFieldSet = function(receiver, state, value, kind, f) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };
      exporter("__extends", __extends);
      exporter("__assign", __assign);
      exporter("__rest", __rest);
      exporter("__decorate", __decorate);
      exporter("__param", __param);
      exporter("__metadata", __metadata);
      exporter("__awaiter", __awaiter);
      exporter("__generator", __generator);
      exporter("__exportStar", __exportStar);
      exporter("__createBinding", __createBinding);
      exporter("__values", __values);
      exporter("__read", __read);
      exporter("__spread", __spread);
      exporter("__spreadArrays", __spreadArrays);
      exporter("__spreadArray", __spreadArray);
      exporter("__await", __await);
      exporter("__asyncGenerator", __asyncGenerator);
      exporter("__asyncDelegator", __asyncDelegator);
      exporter("__asyncValues", __asyncValues);
      exporter("__makeTemplateObject", __makeTemplateObject);
      exporter("__importStar", __importStar);
      exporter("__importDefault", __importDefault);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet);
    });
  }
});

// node_modules/@formatjs/icu-messageformat-parser/node_modules/tslib/tslib.js
var require_tslib2 = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/node_modules/tslib/tslib.js"(exports, module2) {
    var __extends;
    var __assign;
    var __rest;
    var __decorate;
    var __param;
    var __metadata;
    var __awaiter;
    var __generator;
    var __exportStar;
    var __values;
    var __read;
    var __spread;
    var __spreadArrays;
    var __spreadArray;
    var __await;
    var __asyncGenerator;
    var __asyncDelegator;
    var __asyncValues;
    var __makeTemplateObject;
    var __importStar;
    var __importDefault;
    var __classPrivateFieldGet;
    var __classPrivateFieldSet;
    var __createBinding;
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module2 === "object" && typeof module2.exports === "object") {
        factory(createExporter(root, createExporter(module2.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", {value: true});
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v) {
          return exports2[id] = previous ? previous(id, v) : v;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      __extends = function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
      __assign = Object.assign || function(t) {
        for (var s2, i = 1, n = arguments.length; i < n; i++) {
          s2 = arguments[i];
          for (var p in s2)
            if (Object.prototype.hasOwnProperty.call(s2, p))
              t[p] = s2[p];
        }
        return t;
      };
      __rest = function(s2, e) {
        var t = {};
        for (var p in s2)
          if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
            t[p] = s2[p];
        if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
              t[p[i]] = s2[p[i]];
          }
        return t;
      };
      __decorate = function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      __param = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve2) {
            resolve2(value);
          });
        }
        return new (P || (P = Promise))(function(resolve2, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator = function(thisArg, body) {
        var _2 = {label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: []}, f, y, t, g;
        return g = {next: verb(0), "throw": verb(1), "return": verb(2)}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_2)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _2.label++;
                  return {value: op[1], done: false};
                case 5:
                  _2.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _2.ops.pop();
                  _2.trys.pop();
                  continue;
                default:
                  if (!(t = _2.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _2 = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _2.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _2.label < t[1]) {
                    _2.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _2.label < t[2]) {
                    _2.label = t[2];
                    _2.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _2.ops.pop();
                  _2.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _2);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return {value: op[0] ? op[1] : void 0, done: true};
        }
      };
      __exportStar = function(m, o) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
            __createBinding(o, m, p);
      };
      __createBinding = Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, {enumerable: true, get: function() {
          return m[k];
        }});
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      };
      __values = function(o) {
        var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o[s2], i = 0;
        if (m)
          return m.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i >= o.length)
                o = void 0;
              return {value: o && o[i++], done: !o};
            }
          };
        throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read = function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error3) {
          e = {error: error3};
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      __spread = function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
        return ar;
      };
      __spreadArrays = function() {
        for (var s2 = 0, i = 0, il = arguments.length; i < il; i++)
          s2 += arguments[i].length;
        for (var r = Array(s2), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
        return r;
      };
      __spreadArray = function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      __await = function(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
      };
      __asyncGenerator = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function verb(n) {
          if (g[n])
            i[n] = function(v) {
              return new Promise(function(a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
        }
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v) {
          if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator = function(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function(e) {
          throw e;
        }), verb("return"), i[Symbol.iterator] = function() {
          return this;
        }, i;
        function verb(n, f) {
          i[n] = o[n] ? function(v) {
            return (p = !p) ? {value: __await(o[n](v)), done: n === "return"} : f ? f(v) : v;
          } : f;
        }
      };
      __asyncValues = function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v) {
            return new Promise(function(resolve2, reject) {
              v = o[n](v), settle(resolve2, reject, v.done, v.value);
            });
          };
        }
        function settle(resolve2, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve2({value: v2, done: d});
          }, reject);
        }
      };
      __makeTemplateObject = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", {value: raw});
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", {enumerable: true, value: v});
      } : function(o, v) {
        o["default"] = v;
      };
      __importStar = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {"default": mod};
      };
      __classPrivateFieldGet = function(receiver, state, kind, f) {
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };
      __classPrivateFieldSet = function(receiver, state, value, kind, f) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };
      exporter("__extends", __extends);
      exporter("__assign", __assign);
      exporter("__rest", __rest);
      exporter("__decorate", __decorate);
      exporter("__param", __param);
      exporter("__metadata", __metadata);
      exporter("__awaiter", __awaiter);
      exporter("__generator", __generator);
      exporter("__exportStar", __exportStar);
      exporter("__createBinding", __createBinding);
      exporter("__values", __values);
      exporter("__read", __read);
      exporter("__spread", __spread);
      exporter("__spreadArrays", __spreadArrays);
      exporter("__spreadArray", __spreadArray);
      exporter("__await", __await);
      exporter("__asyncGenerator", __asyncGenerator);
      exporter("__asyncDelegator", __asyncDelegator);
      exporter("__asyncValues", __asyncValues);
      exporter("__makeTemplateObject", __makeTemplateObject);
      exporter("__importStar", __importStar);
      exporter("__importDefault", __importDefault);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet);
    });
  }
});

// node_modules/@formatjs/icu-messageformat-parser/error.js
var require_error = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.ErrorKind = void 0;
    var ErrorKind;
    (function(ErrorKind2) {
      ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_CLOSING_BRACE"] = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE";
      ErrorKind2[ErrorKind2["EMPTY_ARGUMENT"] = 2] = "EMPTY_ARGUMENT";
      ErrorKind2[ErrorKind2["MALFORMED_ARGUMENT"] = 3] = "MALFORMED_ARGUMENT";
      ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_TYPE"] = 4] = "EXPECT_ARGUMENT_TYPE";
      ErrorKind2[ErrorKind2["INVALID_ARGUMENT_TYPE"] = 5] = "INVALID_ARGUMENT_TYPE";
      ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_STYLE"] = 6] = "EXPECT_ARGUMENT_STYLE";
      ErrorKind2[ErrorKind2["INVALID_NUMBER_SKELETON"] = 7] = "INVALID_NUMBER_SKELETON";
      ErrorKind2[ErrorKind2["INVALID_DATE_TIME_SKELETON"] = 8] = "INVALID_DATE_TIME_SKELETON";
      ErrorKind2[ErrorKind2["EXPECT_NUMBER_SKELETON"] = 9] = "EXPECT_NUMBER_SKELETON";
      ErrorKind2[ErrorKind2["EXPECT_DATE_TIME_SKELETON"] = 10] = "EXPECT_DATE_TIME_SKELETON";
      ErrorKind2[ErrorKind2["UNCLOSED_QUOTE_IN_ARGUMENT_STYLE"] = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE";
      ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_OPTIONS"] = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS";
      ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE"] = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE";
      ErrorKind2[ErrorKind2["INVALID_PLURAL_ARGUMENT_OFFSET_VALUE"] = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE";
      ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_SELECTOR"] = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR";
      ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_SELECTOR"] = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR";
      ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT"] = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT";
      ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT"] = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT";
      ErrorKind2[ErrorKind2["INVALID_PLURAL_ARGUMENT_SELECTOR"] = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR";
      ErrorKind2[ErrorKind2["DUPLICATE_PLURAL_ARGUMENT_SELECTOR"] = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR";
      ErrorKind2[ErrorKind2["DUPLICATE_SELECT_ARGUMENT_SELECTOR"] = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR";
      ErrorKind2[ErrorKind2["MISSING_OTHER_CLAUSE"] = 22] = "MISSING_OTHER_CLAUSE";
      ErrorKind2[ErrorKind2["INVALID_TAG"] = 23] = "INVALID_TAG";
      ErrorKind2[ErrorKind2["INVALID_TAG_NAME"] = 25] = "INVALID_TAG_NAME";
      ErrorKind2[ErrorKind2["UNMATCHED_CLOSING_TAG"] = 26] = "UNMATCHED_CLOSING_TAG";
      ErrorKind2[ErrorKind2["UNCLOSED_TAG"] = 27] = "UNCLOSED_TAG";
    })(ErrorKind = exports.ErrorKind || (exports.ErrorKind = {}));
  }
});

// node_modules/@formatjs/icu-messageformat-parser/types.js
var require_types = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.createNumberElement = exports.createLiteralElement = exports.isDateTimeSkeleton = exports.isNumberSkeleton = exports.isTagElement = exports.isPoundElement = exports.isPluralElement = exports.isSelectElement = exports.isTimeElement = exports.isDateElement = exports.isNumberElement = exports.isArgumentElement = exports.isLiteralElement = exports.SKELETON_TYPE = exports.TYPE = void 0;
    var TYPE;
    (function(TYPE2) {
      TYPE2[TYPE2["literal"] = 0] = "literal";
      TYPE2[TYPE2["argument"] = 1] = "argument";
      TYPE2[TYPE2["number"] = 2] = "number";
      TYPE2[TYPE2["date"] = 3] = "date";
      TYPE2[TYPE2["time"] = 4] = "time";
      TYPE2[TYPE2["select"] = 5] = "select";
      TYPE2[TYPE2["plural"] = 6] = "plural";
      TYPE2[TYPE2["pound"] = 7] = "pound";
      TYPE2[TYPE2["tag"] = 8] = "tag";
    })(TYPE = exports.TYPE || (exports.TYPE = {}));
    var SKELETON_TYPE;
    (function(SKELETON_TYPE2) {
      SKELETON_TYPE2[SKELETON_TYPE2["number"] = 0] = "number";
      SKELETON_TYPE2[SKELETON_TYPE2["dateTime"] = 1] = "dateTime";
    })(SKELETON_TYPE = exports.SKELETON_TYPE || (exports.SKELETON_TYPE = {}));
    function isLiteralElement(el) {
      return el.type === TYPE.literal;
    }
    exports.isLiteralElement = isLiteralElement;
    function isArgumentElement(el) {
      return el.type === TYPE.argument;
    }
    exports.isArgumentElement = isArgumentElement;
    function isNumberElement(el) {
      return el.type === TYPE.number;
    }
    exports.isNumberElement = isNumberElement;
    function isDateElement(el) {
      return el.type === TYPE.date;
    }
    exports.isDateElement = isDateElement;
    function isTimeElement(el) {
      return el.type === TYPE.time;
    }
    exports.isTimeElement = isTimeElement;
    function isSelectElement(el) {
      return el.type === TYPE.select;
    }
    exports.isSelectElement = isSelectElement;
    function isPluralElement(el) {
      return el.type === TYPE.plural;
    }
    exports.isPluralElement = isPluralElement;
    function isPoundElement(el) {
      return el.type === TYPE.pound;
    }
    exports.isPoundElement = isPoundElement;
    function isTagElement(el) {
      return el.type === TYPE.tag;
    }
    exports.isTagElement = isTagElement;
    function isNumberSkeleton(el) {
      return !!(el && typeof el === "object" && el.type === SKELETON_TYPE.number);
    }
    exports.isNumberSkeleton = isNumberSkeleton;
    function isDateTimeSkeleton(el) {
      return !!(el && typeof el === "object" && el.type === SKELETON_TYPE.dateTime);
    }
    exports.isDateTimeSkeleton = isDateTimeSkeleton;
    function createLiteralElement(value) {
      return {
        type: TYPE.literal,
        value
      };
    }
    exports.createLiteralElement = createLiteralElement;
    function createNumberElement(value, style) {
      return {
        type: TYPE.number,
        value,
        style
      };
    }
    exports.createNumberElement = createNumberElement;
  }
});

// node_modules/@formatjs/icu-messageformat-parser/regex.generated.js
var require_regex_generated = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/regex.generated.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.WHITE_SPACE_REGEX = exports.SPACE_SEPARATOR_END_REGEX = exports.SPACE_SEPARATOR_START_REGEX = void 0;
    exports.SPACE_SEPARATOR_START_REGEX = /^[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]*/i;
    exports.SPACE_SEPARATOR_END_REGEX = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]*$/i;
    exports.WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
  }
});

// node_modules/@formatjs/icu-skeleton-parser/node_modules/tslib/tslib.js
var require_tslib3 = __commonJS({
  "node_modules/@formatjs/icu-skeleton-parser/node_modules/tslib/tslib.js"(exports, module2) {
    var __extends;
    var __assign;
    var __rest;
    var __decorate;
    var __param;
    var __metadata;
    var __awaiter;
    var __generator;
    var __exportStar;
    var __values;
    var __read;
    var __spread;
    var __spreadArrays;
    var __spreadArray;
    var __await;
    var __asyncGenerator;
    var __asyncDelegator;
    var __asyncValues;
    var __makeTemplateObject;
    var __importStar;
    var __importDefault;
    var __classPrivateFieldGet;
    var __classPrivateFieldSet;
    var __createBinding;
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module2 === "object" && typeof module2.exports === "object") {
        factory(createExporter(root, createExporter(module2.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", {value: true});
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v) {
          return exports2[id] = previous ? previous(id, v) : v;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      __extends = function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
      __assign = Object.assign || function(t) {
        for (var s2, i = 1, n = arguments.length; i < n; i++) {
          s2 = arguments[i];
          for (var p in s2)
            if (Object.prototype.hasOwnProperty.call(s2, p))
              t[p] = s2[p];
        }
        return t;
      };
      __rest = function(s2, e) {
        var t = {};
        for (var p in s2)
          if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
            t[p] = s2[p];
        if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
              t[p[i]] = s2[p[i]];
          }
        return t;
      };
      __decorate = function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      __param = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve2) {
            resolve2(value);
          });
        }
        return new (P || (P = Promise))(function(resolve2, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator = function(thisArg, body) {
        var _2 = {label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: []}, f, y, t, g;
        return g = {next: verb(0), "throw": verb(1), "return": verb(2)}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_2)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _2.label++;
                  return {value: op[1], done: false};
                case 5:
                  _2.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _2.ops.pop();
                  _2.trys.pop();
                  continue;
                default:
                  if (!(t = _2.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _2 = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _2.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _2.label < t[1]) {
                    _2.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _2.label < t[2]) {
                    _2.label = t[2];
                    _2.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _2.ops.pop();
                  _2.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _2);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return {value: op[0] ? op[1] : void 0, done: true};
        }
      };
      __exportStar = function(m, o) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
            __createBinding(o, m, p);
      };
      __createBinding = Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, {enumerable: true, get: function() {
          return m[k];
        }});
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      };
      __values = function(o) {
        var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o[s2], i = 0;
        if (m)
          return m.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i >= o.length)
                o = void 0;
              return {value: o && o[i++], done: !o};
            }
          };
        throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read = function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error3) {
          e = {error: error3};
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      __spread = function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
        return ar;
      };
      __spreadArrays = function() {
        for (var s2 = 0, i = 0, il = arguments.length; i < il; i++)
          s2 += arguments[i].length;
        for (var r = Array(s2), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
        return r;
      };
      __spreadArray = function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      __await = function(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
      };
      __asyncGenerator = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function verb(n) {
          if (g[n])
            i[n] = function(v) {
              return new Promise(function(a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
        }
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v) {
          if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator = function(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function(e) {
          throw e;
        }), verb("return"), i[Symbol.iterator] = function() {
          return this;
        }, i;
        function verb(n, f) {
          i[n] = o[n] ? function(v) {
            return (p = !p) ? {value: __await(o[n](v)), done: n === "return"} : f ? f(v) : v;
          } : f;
        }
      };
      __asyncValues = function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v) {
            return new Promise(function(resolve2, reject) {
              v = o[n](v), settle(resolve2, reject, v.done, v.value);
            });
          };
        }
        function settle(resolve2, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve2({value: v2, done: d});
          }, reject);
        }
      };
      __makeTemplateObject = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", {value: raw});
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", {enumerable: true, value: v});
      } : function(o, v) {
        o["default"] = v;
      };
      __importStar = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {"default": mod};
      };
      __classPrivateFieldGet = function(receiver, state, kind, f) {
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };
      __classPrivateFieldSet = function(receiver, state, value, kind, f) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };
      exporter("__extends", __extends);
      exporter("__assign", __assign);
      exporter("__rest", __rest);
      exporter("__decorate", __decorate);
      exporter("__param", __param);
      exporter("__metadata", __metadata);
      exporter("__awaiter", __awaiter);
      exporter("__generator", __generator);
      exporter("__exportStar", __exportStar);
      exporter("__createBinding", __createBinding);
      exporter("__values", __values);
      exporter("__read", __read);
      exporter("__spread", __spread);
      exporter("__spreadArrays", __spreadArrays);
      exporter("__spreadArray", __spreadArray);
      exporter("__await", __await);
      exporter("__asyncGenerator", __asyncGenerator);
      exporter("__asyncDelegator", __asyncDelegator);
      exporter("__asyncValues", __asyncValues);
      exporter("__makeTemplateObject", __makeTemplateObject);
      exporter("__importStar", __importStar);
      exporter("__importDefault", __importDefault);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet);
    });
  }
});

// node_modules/@formatjs/icu-skeleton-parser/date-time.js
var require_date_time = __commonJS({
  "node_modules/@formatjs/icu-skeleton-parser/date-time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.parseDateTimeSkeleton = void 0;
    var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
    function parseDateTimeSkeleton(skeleton) {
      var result = {};
      skeleton.replace(DATE_TIME_REGEX, function(match) {
        var len = match.length;
        switch (match[0]) {
          case "G":
            result.era = len === 4 ? "long" : len === 5 ? "narrow" : "short";
            break;
          case "y":
            result.year = len === 2 ? "2-digit" : "numeric";
            break;
          case "Y":
          case "u":
          case "U":
          case "r":
            throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
          case "q":
          case "Q":
            throw new RangeError("`q/Q` (quarter) patterns are not supported");
          case "M":
          case "L":
            result.month = ["numeric", "2-digit", "short", "long", "narrow"][len - 1];
            break;
          case "w":
          case "W":
            throw new RangeError("`w/W` (week) patterns are not supported");
          case "d":
            result.day = ["numeric", "2-digit"][len - 1];
            break;
          case "D":
          case "F":
          case "g":
            throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
          case "E":
            result.weekday = len === 4 ? "short" : len === 5 ? "narrow" : "short";
            break;
          case "e":
            if (len < 4) {
              throw new RangeError("`e..eee` (weekday) patterns are not supported");
            }
            result.weekday = ["short", "long", "narrow", "short"][len - 4];
            break;
          case "c":
            if (len < 4) {
              throw new RangeError("`c..ccc` (weekday) patterns are not supported");
            }
            result.weekday = ["short", "long", "narrow", "short"][len - 4];
            break;
          case "a":
            result.hour12 = true;
            break;
          case "b":
          case "B":
            throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
          case "h":
            result.hourCycle = "h12";
            result.hour = ["numeric", "2-digit"][len - 1];
            break;
          case "H":
            result.hourCycle = "h23";
            result.hour = ["numeric", "2-digit"][len - 1];
            break;
          case "K":
            result.hourCycle = "h11";
            result.hour = ["numeric", "2-digit"][len - 1];
            break;
          case "k":
            result.hourCycle = "h24";
            result.hour = ["numeric", "2-digit"][len - 1];
            break;
          case "j":
          case "J":
          case "C":
            throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
          case "m":
            result.minute = ["numeric", "2-digit"][len - 1];
            break;
          case "s":
            result.second = ["numeric", "2-digit"][len - 1];
            break;
          case "S":
          case "A":
            throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
          case "z":
            result.timeZoneName = len < 4 ? "short" : "long";
            break;
          case "Z":
          case "O":
          case "v":
          case "V":
          case "X":
          case "x":
            throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
        }
        return "";
      });
      return result;
    }
    exports.parseDateTimeSkeleton = parseDateTimeSkeleton;
  }
});

// node_modules/@formatjs/icu-skeleton-parser/regex.generated.js
var require_regex_generated2 = __commonJS({
  "node_modules/@formatjs/icu-skeleton-parser/regex.generated.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.WHITE_SPACE_REGEX = void 0;
    exports.WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
  }
});

// node_modules/@formatjs/icu-skeleton-parser/number.js
var require_number = __commonJS({
  "node_modules/@formatjs/icu-skeleton-parser/number.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.parseNumberSkeleton = exports.parseNumberSkeletonFromString = void 0;
    var tslib_1 = require_tslib3();
    var regex_generated_1 = require_regex_generated2();
    function parseNumberSkeletonFromString(skeleton) {
      if (skeleton.length === 0) {
        throw new Error("Number skeleton cannot be empty");
      }
      var stringTokens = skeleton.split(regex_generated_1.WHITE_SPACE_REGEX).filter(function(x) {
        return x.length > 0;
      });
      var tokens = [];
      for (var _i = 0, stringTokens_1 = stringTokens; _i < stringTokens_1.length; _i++) {
        var stringToken = stringTokens_1[_i];
        var stemAndOptions = stringToken.split("/");
        if (stemAndOptions.length === 0) {
          throw new Error("Invalid number skeleton");
        }
        var stem = stemAndOptions[0], options2 = stemAndOptions.slice(1);
        for (var _a = 0, options_1 = options2; _a < options_1.length; _a++) {
          var option = options_1[_a];
          if (option.length === 0) {
            throw new Error("Invalid number skeleton");
          }
        }
        tokens.push({stem, options: options2});
      }
      return tokens;
    }
    exports.parseNumberSkeletonFromString = parseNumberSkeletonFromString;
    function icuUnitToEcma(unit) {
      return unit.replace(/^(.*?)-/, "");
    }
    var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
    var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?$/g;
    var INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
    var CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;
    function parseSignificantPrecision(str) {
      var result = {};
      str.replace(SIGNIFICANT_PRECISION_REGEX, function(_2, g1, g2) {
        if (typeof g2 !== "string") {
          result.minimumSignificantDigits = g1.length;
          result.maximumSignificantDigits = g1.length;
        } else if (g2 === "+") {
          result.minimumSignificantDigits = g1.length;
        } else if (g1[0] === "#") {
          result.maximumSignificantDigits = g1.length;
        } else {
          result.minimumSignificantDigits = g1.length;
          result.maximumSignificantDigits = g1.length + (typeof g2 === "string" ? g2.length : 0);
        }
        return "";
      });
      return result;
    }
    function parseSign(str) {
      switch (str) {
        case "sign-auto":
          return {
            signDisplay: "auto"
          };
        case "sign-accounting":
        case "()":
          return {
            currencySign: "accounting"
          };
        case "sign-always":
        case "+!":
          return {
            signDisplay: "always"
          };
        case "sign-accounting-always":
        case "()!":
          return {
            signDisplay: "always",
            currencySign: "accounting"
          };
        case "sign-except-zero":
        case "+?":
          return {
            signDisplay: "exceptZero"
          };
        case "sign-accounting-except-zero":
        case "()?":
          return {
            signDisplay: "exceptZero",
            currencySign: "accounting"
          };
        case "sign-never":
        case "+_":
          return {
            signDisplay: "never"
          };
      }
    }
    function parseConciseScientificAndEngineeringStem(stem) {
      var result;
      if (stem[0] === "E" && stem[1] === "E") {
        result = {
          notation: "engineering"
        };
        stem = stem.slice(2);
      } else if (stem[0] === "E") {
        result = {
          notation: "scientific"
        };
        stem = stem.slice(1);
      }
      if (result) {
        var signDisplay = stem.slice(0, 2);
        if (signDisplay === "+!") {
          result.signDisplay = "always";
          stem = stem.slice(2);
        } else if (signDisplay === "+?") {
          result.signDisplay = "exceptZero";
          stem = stem.slice(2);
        }
        if (!CONCISE_INTEGER_WIDTH_REGEX.test(stem)) {
          throw new Error("Malformed concise eng/scientific notation");
        }
        result.minimumIntegerDigits = stem.length;
      }
      return result;
    }
    function parseNotationOptions(opt) {
      var result = {};
      var signOpts = parseSign(opt);
      if (signOpts) {
        return signOpts;
      }
      return result;
    }
    function parseNumberSkeleton(tokens) {
      var result = {};
      for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        switch (token.stem) {
          case "percent":
          case "%":
            result.style = "percent";
            continue;
          case "%x100":
            result.style = "percent";
            result.scale = 100;
            continue;
          case "currency":
            result.style = "currency";
            result.currency = token.options[0];
            continue;
          case "group-off":
          case ",_":
            result.useGrouping = false;
            continue;
          case "precision-integer":
          case ".":
            result.maximumFractionDigits = 0;
            continue;
          case "measure-unit":
          case "unit":
            result.style = "unit";
            result.unit = icuUnitToEcma(token.options[0]);
            continue;
          case "compact-short":
          case "K":
            result.notation = "compact";
            result.compactDisplay = "short";
            continue;
          case "compact-long":
          case "KK":
            result.notation = "compact";
            result.compactDisplay = "long";
            continue;
          case "scientific":
            result = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, result), {notation: "scientific"}), token.options.reduce(function(all, opt) {
              return tslib_1.__assign(tslib_1.__assign({}, all), parseNotationOptions(opt));
            }, {}));
            continue;
          case "engineering":
            result = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, result), {notation: "engineering"}), token.options.reduce(function(all, opt) {
              return tslib_1.__assign(tslib_1.__assign({}, all), parseNotationOptions(opt));
            }, {}));
            continue;
          case "notation-simple":
            result.notation = "standard";
            continue;
          case "unit-width-narrow":
            result.currencyDisplay = "narrowSymbol";
            result.unitDisplay = "narrow";
            continue;
          case "unit-width-short":
            result.currencyDisplay = "code";
            result.unitDisplay = "short";
            continue;
          case "unit-width-full-name":
            result.currencyDisplay = "name";
            result.unitDisplay = "long";
            continue;
          case "unit-width-iso-code":
            result.currencyDisplay = "symbol";
            continue;
          case "scale":
            result.scale = parseFloat(token.options[0]);
            continue;
          case "integer-width":
            if (token.options.length > 1) {
              throw new RangeError("integer-width stems only accept a single optional option");
            }
            token.options[0].replace(INTEGER_WIDTH_REGEX, function(_2, g1, g2, g3, g4, g5) {
              if (g1) {
                result.minimumIntegerDigits = g2.length;
              } else if (g3 && g4) {
                throw new Error("We currently do not support maximum integer digits");
              } else if (g5) {
                throw new Error("We currently do not support exact integer digits");
              }
              return "";
            });
            continue;
        }
        if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
          result.minimumIntegerDigits = token.stem.length;
          continue;
        }
        if (FRACTION_PRECISION_REGEX.test(token.stem)) {
          if (token.options.length > 1) {
            throw new RangeError("Fraction-precision stems only accept a single optional option");
          }
          token.stem.replace(FRACTION_PRECISION_REGEX, function(_2, g1, g2, g3, g4, g5) {
            if (g2 === "*") {
              result.minimumFractionDigits = g1.length;
            } else if (g3 && g3[0] === "#") {
              result.maximumFractionDigits = g3.length;
            } else if (g4 && g5) {
              result.minimumFractionDigits = g4.length;
              result.maximumFractionDigits = g4.length + g5.length;
            } else {
              result.minimumFractionDigits = g1.length;
              result.maximumFractionDigits = g1.length;
            }
            return "";
          });
          if (token.options.length) {
            result = tslib_1.__assign(tslib_1.__assign({}, result), parseSignificantPrecision(token.options[0]));
          }
          continue;
        }
        if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
          result = tslib_1.__assign(tslib_1.__assign({}, result), parseSignificantPrecision(token.stem));
          continue;
        }
        var signOpts = parseSign(token.stem);
        if (signOpts) {
          result = tslib_1.__assign(tslib_1.__assign({}, result), signOpts);
        }
        var conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);
        if (conciseScientificAndEngineeringOpts) {
          result = tslib_1.__assign(tslib_1.__assign({}, result), conciseScientificAndEngineeringOpts);
        }
      }
      return result;
    }
    exports.parseNumberSkeleton = parseNumberSkeleton;
  }
});

// node_modules/@formatjs/icu-skeleton-parser/index.js
var require_icu_skeleton_parser = __commonJS({
  "node_modules/@formatjs/icu-skeleton-parser/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    var tslib_1 = require_tslib3();
    tslib_1.__exportStar(require_date_time(), exports);
    tslib_1.__exportStar(require_number(), exports);
  }
});

// node_modules/@formatjs/icu-messageformat-parser/parser.js
var require_parser = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/parser.js"(exports) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Parser = void 0;
    var tslib_1 = require_tslib2();
    var error_1 = require_error();
    var types_1 = require_types();
    var regex_generated_1 = require_regex_generated();
    var icu_skeleton_parser_1 = require_icu_skeleton_parser();
    function createLocation(start, end) {
      return {start, end};
    }
    var hasNativeStartsWith = !!String.prototype.startsWith;
    var hasNativeFromCodePoint = !!String.fromCodePoint;
    var hasNativeFromEntries = !!Object.fromEntries;
    var hasNativeCodePointAt = !!String.prototype.codePointAt;
    var hasTrimStart = !!String.prototype.trimStart;
    var hasTrimEnd = !!String.prototype.trimEnd;
    var hasNativeIsSafeInteger = !!Number.isSafeInteger;
    var isSafeInteger = hasNativeIsSafeInteger ? Number.isSafeInteger : function(n) {
      return typeof n === "number" && isFinite(n) && Math.floor(n) === n && Math.abs(n) <= 9007199254740991;
    };
    var REGEX_SUPPORTS_U_AND_Y = true;
    try {
      re = RE("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
      REGEX_SUPPORTS_U_AND_Y = ((_a = re.exec("a")) === null || _a === void 0 ? void 0 : _a[0]) === "a";
    } catch (_2) {
      REGEX_SUPPORTS_U_AND_Y = false;
    }
    var re;
    var startsWith = hasNativeStartsWith ? function startsWith2(s2, search, position) {
      return s2.startsWith(search, position);
    } : function startsWith2(s2, search, position) {
      return s2.slice(position, position + search.length) === search;
    };
    var fromCodePoint = hasNativeFromCodePoint ? String.fromCodePoint : function fromCodePoint2() {
      var codePoints = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        codePoints[_i] = arguments[_i];
      }
      var elements = "";
      var length = codePoints.length;
      var i = 0;
      var code;
      while (length > i) {
        code = codePoints[i++];
        if (code > 1114111)
          throw RangeError(code + " is not a valid code point");
        elements += code < 65536 ? String.fromCharCode(code) : String.fromCharCode(((code -= 65536) >> 10) + 55296, code % 1024 + 56320);
      }
      return elements;
    };
    var fromEntries = hasNativeFromEntries ? Object.fromEntries : function fromEntries2(entries) {
      var obj = {};
      for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var _a2 = entries_1[_i], k = _a2[0], v = _a2[1];
        obj[k] = v;
      }
      return obj;
    };
    var codePointAt = hasNativeCodePointAt ? function codePointAt2(s2, index2) {
      return s2.codePointAt(index2);
    } : function codePointAt2(s2, index2) {
      var size = s2.length;
      if (index2 < 0 || index2 >= size) {
        return void 0;
      }
      var first = s2.charCodeAt(index2);
      var second;
      return first < 55296 || first > 56319 || index2 + 1 === size || (second = s2.charCodeAt(index2 + 1)) < 56320 || second > 57343 ? first : (first - 55296 << 10) + (second - 56320) + 65536;
    };
    var trimStart = hasTrimStart ? function trimStart2(s2) {
      return s2.trimStart();
    } : function trimStart2(s2) {
      return s2.replace(regex_generated_1.SPACE_SEPARATOR_START_REGEX, "");
    };
    var trimEnd = hasTrimEnd ? function trimEnd2(s2) {
      return s2.trimEnd();
    } : function trimEnd2(s2) {
      return s2.replace(regex_generated_1.SPACE_SEPARATOR_END_REGEX, "");
    };
    function RE(s2, flag) {
      return new RegExp(s2, flag);
    }
    var matchIdentifierAtIndex;
    if (REGEX_SUPPORTS_U_AND_Y) {
      IDENTIFIER_PREFIX_RE_1 = RE("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
      matchIdentifierAtIndex = function matchIdentifierAtIndex2(s2, index2) {
        var _a2;
        IDENTIFIER_PREFIX_RE_1.lastIndex = index2;
        var match = IDENTIFIER_PREFIX_RE_1.exec(s2);
        return (_a2 = match[1]) !== null && _a2 !== void 0 ? _a2 : "";
      };
    } else {
      matchIdentifierAtIndex = function matchIdentifierAtIndex2(s2, index2) {
        var match = [];
        while (true) {
          var c = codePointAt(s2, index2);
          if (c === void 0 || _isWhiteSpace(c) || _isPatternSyntax(c)) {
            break;
          }
          match.push(c);
          index2 += c >= 65536 ? 2 : 1;
        }
        return fromCodePoint.apply(void 0, match);
      };
    }
    var IDENTIFIER_PREFIX_RE_1;
    var Parser = function() {
      function Parser2(message, options2) {
        if (options2 === void 0) {
          options2 = {};
        }
        this.message = message;
        this.position = {offset: 0, line: 1, column: 1};
        this.ignoreTag = !!options2.ignoreTag;
        this.requiresOtherClause = !!options2.requiresOtherClause;
        this.shouldParseSkeletons = !!options2.shouldParseSkeletons;
      }
      Parser2.prototype.parse = function() {
        if (this.offset() !== 0) {
          throw Error("parser can only be used once");
        }
        return this.parseMessage(0, "", false);
      };
      Parser2.prototype.parseMessage = function(nestingLevel, parentArgType, expectingCloseTag) {
        var elements = [];
        while (!this.isEOF()) {
          var char = this.char();
          if (char === 123) {
            var result = this.parseArgument(nestingLevel, expectingCloseTag);
            if (result.err) {
              return result;
            }
            elements.push(result.val);
          } else if (char === 125 && nestingLevel > 0) {
            break;
          } else if (char === 35 && (parentArgType === "plural" || parentArgType === "selectordinal")) {
            var position = this.clonePosition();
            this.bump();
            elements.push({
              type: types_1.TYPE.pound,
              location: createLocation(position, this.clonePosition())
            });
          } else if (char === 60 && !this.ignoreTag && this.peek() === 47) {
            if (expectingCloseTag) {
              break;
            } else {
              return this.error(error_1.ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(this.clonePosition(), this.clonePosition()));
            }
          } else if (char === 60 && !this.ignoreTag && _isAlpha(this.peek() || 0)) {
            var result = this.parseTag(nestingLevel, parentArgType);
            if (result.err) {
              return result;
            }
            elements.push(result.val);
          } else {
            var result = this.parseLiteral(nestingLevel, parentArgType);
            if (result.err) {
              return result;
            }
            elements.push(result.val);
          }
        }
        return {val: elements, err: null};
      };
      Parser2.prototype.parseTag = function(nestingLevel, parentArgType) {
        var startPosition = this.clonePosition();
        this.bump();
        var tagName = this.parseTagName();
        this.bumpSpace();
        if (this.bumpIf("/>")) {
          return {
            val: {
              type: types_1.TYPE.literal,
              value: "<" + tagName + "/>",
              location: createLocation(startPosition, this.clonePosition())
            },
            err: null
          };
        } else if (this.bumpIf(">")) {
          var childrenResult = this.parseMessage(nestingLevel + 1, parentArgType, true);
          if (childrenResult.err) {
            return childrenResult;
          }
          var children = childrenResult.val;
          var endTagStartPosition = this.clonePosition();
          if (this.bumpIf("</")) {
            if (this.isEOF() || !_isAlpha(this.char())) {
              return this.error(error_1.ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
            }
            var closingTagNameStartPosition = this.clonePosition();
            var closingTagName = this.parseTagName();
            if (tagName !== closingTagName) {
              return this.error(error_1.ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(closingTagNameStartPosition, this.clonePosition()));
            }
            this.bumpSpace();
            if (!this.bumpIf(">")) {
              return this.error(error_1.ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
            }
            return {
              val: {
                type: types_1.TYPE.tag,
                value: tagName,
                children,
                location: createLocation(startPosition, this.clonePosition())
              },
              err: null
            };
          } else {
            return this.error(error_1.ErrorKind.UNCLOSED_TAG, createLocation(startPosition, this.clonePosition()));
          }
        } else {
          return this.error(error_1.ErrorKind.INVALID_TAG, createLocation(startPosition, this.clonePosition()));
        }
      };
      Parser2.prototype.parseTagName = function() {
        var startOffset = this.offset();
        this.bump();
        while (!this.isEOF() && _isPotentialElementNameChar(this.char())) {
          this.bump();
        }
        return this.message.slice(startOffset, this.offset());
      };
      Parser2.prototype.parseLiteral = function(nestingLevel, parentArgType) {
        var start = this.clonePosition();
        var value = "";
        while (true) {
          var parseQuoteResult = this.tryParseQuote(parentArgType);
          if (parseQuoteResult) {
            value += parseQuoteResult;
            continue;
          }
          var parseUnquotedResult = this.tryParseUnquoted(nestingLevel, parentArgType);
          if (parseUnquotedResult) {
            value += parseUnquotedResult;
            continue;
          }
          var parseLeftAngleResult = this.tryParseLeftAngleBracket();
          if (parseLeftAngleResult) {
            value += parseLeftAngleResult;
            continue;
          }
          break;
        }
        var location = createLocation(start, this.clonePosition());
        return {
          val: {type: types_1.TYPE.literal, value, location},
          err: null
        };
      };
      Parser2.prototype.tryParseLeftAngleBracket = function() {
        if (!this.isEOF() && this.char() === 60 && (this.ignoreTag || !_isAlphaOrSlash(this.peek() || 0))) {
          this.bump();
          return "<";
        }
        return null;
      };
      Parser2.prototype.tryParseQuote = function(parentArgType) {
        if (this.isEOF() || this.char() !== 39) {
          return null;
        }
        switch (this.peek()) {
          case 39:
            this.bump();
            this.bump();
            return "'";
          case 123:
          case 60:
          case 62:
          case 125:
            break;
          case 35:
            if (parentArgType === "plural" || parentArgType === "selectordinal") {
              break;
            }
            return null;
          default:
            return null;
        }
        this.bump();
        var codePoints = [this.char()];
        this.bump();
        while (!this.isEOF()) {
          var ch = this.char();
          if (ch === 39) {
            if (this.peek() === 39) {
              codePoints.push(39);
              this.bump();
            } else {
              this.bump();
              break;
            }
          } else {
            codePoints.push(ch);
          }
          this.bump();
        }
        return fromCodePoint.apply(void 0, codePoints);
      };
      Parser2.prototype.tryParseUnquoted = function(nestingLevel, parentArgType) {
        if (this.isEOF()) {
          return null;
        }
        var ch = this.char();
        if (ch === 60 || ch === 123 || ch === 35 && (parentArgType === "plural" || parentArgType === "selectordinal") || ch === 125 && nestingLevel > 0) {
          return null;
        } else {
          this.bump();
          return fromCodePoint(ch);
        }
      };
      Parser2.prototype.parseArgument = function(nestingLevel, expectingCloseTag) {
        var openingBracePosition = this.clonePosition();
        this.bump();
        this.bumpSpace();
        if (this.isEOF()) {
          return this.error(error_1.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        if (this.char() === 125) {
          this.bump();
          return this.error(error_1.ErrorKind.EMPTY_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        var value = this.parseIdentifierIfPossible().value;
        if (!value) {
          return this.error(error_1.ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bumpSpace();
        if (this.isEOF()) {
          return this.error(error_1.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        switch (this.char()) {
          case 125: {
            this.bump();
            return {
              val: {
                type: types_1.TYPE.argument,
                value,
                location: createLocation(openingBracePosition, this.clonePosition())
              },
              err: null
            };
          }
          case 44: {
            this.bump();
            this.bumpSpace();
            if (this.isEOF()) {
              return this.error(error_1.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
            }
            return this.parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition);
          }
          default:
            return this.error(error_1.ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
      };
      Parser2.prototype.parseIdentifierIfPossible = function() {
        var startingPosition = this.clonePosition();
        var startOffset = this.offset();
        var value = matchIdentifierAtIndex(this.message, startOffset);
        var endOffset = startOffset + value.length;
        this.bumpTo(endOffset);
        var endPosition = this.clonePosition();
        var location = createLocation(startingPosition, endPosition);
        return {value, location};
      };
      Parser2.prototype.parseArgumentOptions = function(nestingLevel, expectingCloseTag, value, openingBracePosition) {
        var _a2;
        var typeStartPosition = this.clonePosition();
        var argType = this.parseIdentifierIfPossible().value;
        var typeEndPosition = this.clonePosition();
        switch (argType) {
          case "":
            return this.error(error_1.ErrorKind.EXPECT_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
          case "number":
          case "date":
          case "time": {
            this.bumpSpace();
            var styleAndLocation = null;
            if (this.bumpIf(",")) {
              this.bumpSpace();
              var styleStartPosition = this.clonePosition();
              var result = this.parseSimpleArgStyleIfPossible();
              if (result.err) {
                return result;
              }
              var style = trimEnd(result.val);
              if (style.length === 0) {
                return this.error(error_1.ErrorKind.EXPECT_ARGUMENT_STYLE, createLocation(this.clonePosition(), this.clonePosition()));
              }
              var styleLocation = createLocation(styleStartPosition, this.clonePosition());
              styleAndLocation = {style, styleLocation};
            }
            var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
            if (argCloseResult.err) {
              return argCloseResult;
            }
            var location_1 = createLocation(openingBracePosition, this.clonePosition());
            if (styleAndLocation && startsWith(styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style, "::", 0)) {
              var skeleton = trimStart(styleAndLocation.style.slice(2));
              if (argType === "number") {
                var result = this.parseNumberSkeletonFromString(skeleton, styleAndLocation.styleLocation);
                if (result.err) {
                  return result;
                }
                return {
                  val: {type: types_1.TYPE.number, value, location: location_1, style: result.val},
                  err: null
                };
              } else {
                if (skeleton.length === 0) {
                  return this.error(error_1.ErrorKind.EXPECT_DATE_TIME_SKELETON, location_1);
                }
                var style = {
                  type: types_1.SKELETON_TYPE.dateTime,
                  pattern: skeleton,
                  location: styleAndLocation.styleLocation,
                  parsedOptions: this.shouldParseSkeletons ? icu_skeleton_parser_1.parseDateTimeSkeleton(skeleton) : {}
                };
                var type = argType === "date" ? types_1.TYPE.date : types_1.TYPE.time;
                return {
                  val: {type, value, location: location_1, style},
                  err: null
                };
              }
            }
            return {
              val: {
                type: argType === "number" ? types_1.TYPE.number : argType === "date" ? types_1.TYPE.date : types_1.TYPE.time,
                value,
                location: location_1,
                style: (_a2 = styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style) !== null && _a2 !== void 0 ? _a2 : null
              },
              err: null
            };
          }
          case "plural":
          case "selectordinal":
          case "select": {
            var typeEndPosition_1 = this.clonePosition();
            this.bumpSpace();
            if (!this.bumpIf(",")) {
              return this.error(error_1.ErrorKind.EXPECT_SELECT_ARGUMENT_OPTIONS, createLocation(typeEndPosition_1, tslib_1.__assign({}, typeEndPosition_1)));
            }
            this.bumpSpace();
            var identifierAndLocation = this.parseIdentifierIfPossible();
            var pluralOffset = 0;
            if (argType !== "select" && identifierAndLocation.value === "offset") {
              if (!this.bumpIf(":")) {
                return this.error(error_1.ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, createLocation(this.clonePosition(), this.clonePosition()));
              }
              this.bumpSpace();
              var result = this.tryParseDecimalInteger(error_1.ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, error_1.ErrorKind.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
              if (result.err) {
                return result;
              }
              this.bumpSpace();
              identifierAndLocation = this.parseIdentifierIfPossible();
              pluralOffset = result.val;
            }
            var optionsResult = this.tryParsePluralOrSelectOptions(nestingLevel, argType, expectingCloseTag, identifierAndLocation);
            if (optionsResult.err) {
              return optionsResult;
            }
            var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
            if (argCloseResult.err) {
              return argCloseResult;
            }
            var location_2 = createLocation(openingBracePosition, this.clonePosition());
            if (argType === "select") {
              return {
                val: {
                  type: types_1.TYPE.select,
                  value,
                  options: fromEntries(optionsResult.val),
                  location: location_2
                },
                err: null
              };
            } else {
              return {
                val: {
                  type: types_1.TYPE.plural,
                  value,
                  options: fromEntries(optionsResult.val),
                  offset: pluralOffset,
                  pluralType: argType === "plural" ? "cardinal" : "ordinal",
                  location: location_2
                },
                err: null
              };
            }
          }
          default:
            return this.error(error_1.ErrorKind.INVALID_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
        }
      };
      Parser2.prototype.tryParseArgumentClose = function(openingBracePosition) {
        if (this.isEOF() || this.char() !== 125) {
          return this.error(error_1.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bump();
        return {val: true, err: null};
      };
      Parser2.prototype.parseSimpleArgStyleIfPossible = function() {
        var nestedBraces = 0;
        var startPosition = this.clonePosition();
        while (!this.isEOF()) {
          var ch = this.char();
          switch (ch) {
            case 39: {
              this.bump();
              var apostrophePosition = this.clonePosition();
              if (!this.bumpUntil("'")) {
                return this.error(error_1.ErrorKind.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, createLocation(apostrophePosition, this.clonePosition()));
              }
              this.bump();
              break;
            }
            case 123: {
              nestedBraces += 1;
              this.bump();
              break;
            }
            case 125: {
              if (nestedBraces > 0) {
                nestedBraces -= 1;
              } else {
                return {
                  val: this.message.slice(startPosition.offset, this.offset()),
                  err: null
                };
              }
              break;
            }
            default:
              this.bump();
              break;
          }
        }
        return {
          val: this.message.slice(startPosition.offset, this.offset()),
          err: null
        };
      };
      Parser2.prototype.parseNumberSkeletonFromString = function(skeleton, location) {
        var tokens = [];
        try {
          tokens = icu_skeleton_parser_1.parseNumberSkeletonFromString(skeleton);
        } catch (e) {
          return this.error(error_1.ErrorKind.INVALID_NUMBER_SKELETON, location);
        }
        return {
          val: {
            type: types_1.SKELETON_TYPE.number,
            tokens,
            location,
            parsedOptions: this.shouldParseSkeletons ? icu_skeleton_parser_1.parseNumberSkeleton(tokens) : {}
          },
          err: null
        };
      };
      Parser2.prototype.tryParsePluralOrSelectOptions = function(nestingLevel, parentArgType, expectCloseTag, parsedFirstIdentifier) {
        var _a2;
        var hasOtherClause = false;
        var options2 = [];
        var parsedSelectors = new Set();
        var selector = parsedFirstIdentifier.value, selectorLocation = parsedFirstIdentifier.location;
        while (true) {
          if (selector.length === 0) {
            var startPosition = this.clonePosition();
            if (parentArgType !== "select" && this.bumpIf("=")) {
              var result = this.tryParseDecimalInteger(error_1.ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, error_1.ErrorKind.INVALID_PLURAL_ARGUMENT_SELECTOR);
              if (result.err) {
                return result;
              }
              selectorLocation = createLocation(startPosition, this.clonePosition());
              selector = this.message.slice(startPosition.offset, this.offset());
            } else {
              break;
            }
          }
          if (parsedSelectors.has(selector)) {
            return this.error(parentArgType === "select" ? error_1.ErrorKind.DUPLICATE_SELECT_ARGUMENT_SELECTOR : error_1.ErrorKind.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, selectorLocation);
          }
          if (selector === "other") {
            hasOtherClause = true;
          }
          this.bumpSpace();
          var openingBracePosition = this.clonePosition();
          if (!this.bumpIf("{")) {
            return this.error(parentArgType === "select" ? error_1.ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : error_1.ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, createLocation(this.clonePosition(), this.clonePosition()));
          }
          var fragmentResult = this.parseMessage(nestingLevel + 1, parentArgType, expectCloseTag);
          if (fragmentResult.err) {
            return fragmentResult;
          }
          var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
          if (argCloseResult.err) {
            return argCloseResult;
          }
          options2.push([
            selector,
            {
              value: fragmentResult.val,
              location: createLocation(openingBracePosition, this.clonePosition())
            }
          ]);
          parsedSelectors.add(selector);
          this.bumpSpace();
          _a2 = this.parseIdentifierIfPossible(), selector = _a2.value, selectorLocation = _a2.location;
        }
        if (options2.length === 0) {
          return this.error(parentArgType === "select" ? error_1.ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR : error_1.ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, createLocation(this.clonePosition(), this.clonePosition()));
        }
        if (this.requiresOtherClause && !hasOtherClause) {
          return this.error(error_1.ErrorKind.MISSING_OTHER_CLAUSE, createLocation(this.clonePosition(), this.clonePosition()));
        }
        return {val: options2, err: null};
      };
      Parser2.prototype.tryParseDecimalInteger = function(expectNumberError, invalidNumberError) {
        var sign = 1;
        var startingPosition = this.clonePosition();
        if (this.bumpIf("+")) {
        } else if (this.bumpIf("-")) {
          sign = -1;
        }
        var hasDigits = false;
        var decimal = 0;
        while (!this.isEOF()) {
          var ch = this.char();
          if (ch >= 48 && ch <= 57) {
            hasDigits = true;
            decimal = decimal * 10 + (ch - 48);
            this.bump();
          } else {
            break;
          }
        }
        var location = createLocation(startingPosition, this.clonePosition());
        if (!hasDigits) {
          return this.error(expectNumberError, location);
        }
        decimal *= sign;
        if (!isSafeInteger(decimal)) {
          return this.error(invalidNumberError, location);
        }
        return {val: decimal, err: null};
      };
      Parser2.prototype.offset = function() {
        return this.position.offset;
      };
      Parser2.prototype.isEOF = function() {
        return this.offset() === this.message.length;
      };
      Parser2.prototype.clonePosition = function() {
        return {
          offset: this.position.offset,
          line: this.position.line,
          column: this.position.column
        };
      };
      Parser2.prototype.char = function() {
        var offset = this.position.offset;
        if (offset >= this.message.length) {
          throw Error("out of bound");
        }
        var code = codePointAt(this.message, offset);
        if (code === void 0) {
          throw Error("Offset " + offset + " is at invalid UTF-16 code unit boundary");
        }
        return code;
      };
      Parser2.prototype.error = function(kind, location) {
        return {
          val: null,
          err: {
            kind,
            message: this.message,
            location
          }
        };
      };
      Parser2.prototype.bump = function() {
        if (this.isEOF()) {
          return;
        }
        var code = this.char();
        if (code === 10) {
          this.position.line += 1;
          this.position.column = 1;
          this.position.offset += 1;
        } else {
          this.position.column += 1;
          this.position.offset += code < 65536 ? 1 : 2;
        }
      };
      Parser2.prototype.bumpIf = function(prefix) {
        if (startsWith(this.message, prefix, this.offset())) {
          for (var i = 0; i < prefix.length; i++) {
            this.bump();
          }
          return true;
        }
        return false;
      };
      Parser2.prototype.bumpUntil = function(pattern) {
        var currentOffset = this.offset();
        var index2 = this.message.indexOf(pattern, currentOffset);
        if (index2 >= 0) {
          this.bumpTo(index2);
          return true;
        } else {
          this.bumpTo(this.message.length);
          return false;
        }
      };
      Parser2.prototype.bumpTo = function(targetOffset) {
        if (this.offset() > targetOffset) {
          throw Error("targetOffset " + targetOffset + " must be greater than or equal to the current offset " + this.offset());
        }
        targetOffset = Math.min(targetOffset, this.message.length);
        while (true) {
          var offset = this.offset();
          if (offset === targetOffset) {
            break;
          }
          if (offset > targetOffset) {
            throw Error("targetOffset " + targetOffset + " is at invalid UTF-16 code unit boundary");
          }
          this.bump();
          if (this.isEOF()) {
            break;
          }
        }
      };
      Parser2.prototype.bumpSpace = function() {
        while (!this.isEOF() && _isWhiteSpace(this.char())) {
          this.bump();
        }
      };
      Parser2.prototype.peek = function() {
        if (this.isEOF()) {
          return null;
        }
        var code = this.char();
        var offset = this.offset();
        var nextCode = this.message.charCodeAt(offset + (code >= 65536 ? 2 : 1));
        return nextCode !== null && nextCode !== void 0 ? nextCode : null;
      };
      return Parser2;
    }();
    exports.Parser = Parser;
    function _isAlpha(codepoint) {
      return codepoint >= 97 && codepoint <= 122 || codepoint >= 65 && codepoint <= 90;
    }
    function _isAlphaOrSlash(codepoint) {
      return _isAlpha(codepoint) || codepoint === 47;
    }
    function _isPotentialElementNameChar(c) {
      return c === 45 || c === 46 || c >= 48 && c <= 57 || c === 95 || c >= 97 && c <= 122 || c >= 65 && c <= 90 || c == 183 || c >= 192 && c <= 214 || c >= 216 && c <= 246 || c >= 248 && c <= 893 || c >= 895 && c <= 8191 || c >= 8204 && c <= 8205 || c >= 8255 && c <= 8256 || c >= 8304 && c <= 8591 || c >= 11264 && c <= 12271 || c >= 12289 && c <= 55295 || c >= 63744 && c <= 64975 || c >= 65008 && c <= 65533 || c >= 65536 && c <= 983039;
    }
    function _isWhiteSpace(c) {
      return c >= 9 && c <= 13 || c === 32 || c === 133 || c >= 8206 && c <= 8207 || c === 8232 || c === 8233;
    }
    function _isPatternSyntax(c) {
      return c >= 33 && c <= 35 || c === 36 || c >= 37 && c <= 39 || c === 40 || c === 41 || c === 42 || c === 43 || c === 44 || c === 45 || c >= 46 && c <= 47 || c >= 58 && c <= 59 || c >= 60 && c <= 62 || c >= 63 && c <= 64 || c === 91 || c === 92 || c === 93 || c === 94 || c === 96 || c === 123 || c === 124 || c === 125 || c === 126 || c === 161 || c >= 162 && c <= 165 || c === 166 || c === 167 || c === 169 || c === 171 || c === 172 || c === 174 || c === 176 || c === 177 || c === 182 || c === 187 || c === 191 || c === 215 || c === 247 || c >= 8208 && c <= 8213 || c >= 8214 && c <= 8215 || c === 8216 || c === 8217 || c === 8218 || c >= 8219 && c <= 8220 || c === 8221 || c === 8222 || c === 8223 || c >= 8224 && c <= 8231 || c >= 8240 && c <= 8248 || c === 8249 || c === 8250 || c >= 8251 && c <= 8254 || c >= 8257 && c <= 8259 || c === 8260 || c === 8261 || c === 8262 || c >= 8263 && c <= 8273 || c === 8274 || c === 8275 || c >= 8277 && c <= 8286 || c >= 8592 && c <= 8596 || c >= 8597 && c <= 8601 || c >= 8602 && c <= 8603 || c >= 8604 && c <= 8607 || c === 8608 || c >= 8609 && c <= 8610 || c === 8611 || c >= 8612 && c <= 8613 || c === 8614 || c >= 8615 && c <= 8621 || c === 8622 || c >= 8623 && c <= 8653 || c >= 8654 && c <= 8655 || c >= 8656 && c <= 8657 || c === 8658 || c === 8659 || c === 8660 || c >= 8661 && c <= 8691 || c >= 8692 && c <= 8959 || c >= 8960 && c <= 8967 || c === 8968 || c === 8969 || c === 8970 || c === 8971 || c >= 8972 && c <= 8991 || c >= 8992 && c <= 8993 || c >= 8994 && c <= 9e3 || c === 9001 || c === 9002 || c >= 9003 && c <= 9083 || c === 9084 || c >= 9085 && c <= 9114 || c >= 9115 && c <= 9139 || c >= 9140 && c <= 9179 || c >= 9180 && c <= 9185 || c >= 9186 && c <= 9254 || c >= 9255 && c <= 9279 || c >= 9280 && c <= 9290 || c >= 9291 && c <= 9311 || c >= 9472 && c <= 9654 || c === 9655 || c >= 9656 && c <= 9664 || c === 9665 || c >= 9666 && c <= 9719 || c >= 9720 && c <= 9727 || c >= 9728 && c <= 9838 || c === 9839 || c >= 9840 && c <= 10087 || c === 10088 || c === 10089 || c === 10090 || c === 10091 || c === 10092 || c === 10093 || c === 10094 || c === 10095 || c === 10096 || c === 10097 || c === 10098 || c === 10099 || c === 10100 || c === 10101 || c >= 10132 && c <= 10175 || c >= 10176 && c <= 10180 || c === 10181 || c === 10182 || c >= 10183 && c <= 10213 || c === 10214 || c === 10215 || c === 10216 || c === 10217 || c === 10218 || c === 10219 || c === 10220 || c === 10221 || c === 10222 || c === 10223 || c >= 10224 && c <= 10239 || c >= 10240 && c <= 10495 || c >= 10496 && c <= 10626 || c === 10627 || c === 10628 || c === 10629 || c === 10630 || c === 10631 || c === 10632 || c === 10633 || c === 10634 || c === 10635 || c === 10636 || c === 10637 || c === 10638 || c === 10639 || c === 10640 || c === 10641 || c === 10642 || c === 10643 || c === 10644 || c === 10645 || c === 10646 || c === 10647 || c === 10648 || c >= 10649 && c <= 10711 || c === 10712 || c === 10713 || c === 10714 || c === 10715 || c >= 10716 && c <= 10747 || c === 10748 || c === 10749 || c >= 10750 && c <= 11007 || c >= 11008 && c <= 11055 || c >= 11056 && c <= 11076 || c >= 11077 && c <= 11078 || c >= 11079 && c <= 11084 || c >= 11085 && c <= 11123 || c >= 11124 && c <= 11125 || c >= 11126 && c <= 11157 || c === 11158 || c >= 11159 && c <= 11263 || c >= 11776 && c <= 11777 || c === 11778 || c === 11779 || c === 11780 || c === 11781 || c >= 11782 && c <= 11784 || c === 11785 || c === 11786 || c === 11787 || c === 11788 || c === 11789 || c >= 11790 && c <= 11798 || c === 11799 || c >= 11800 && c <= 11801 || c === 11802 || c === 11803 || c === 11804 || c === 11805 || c >= 11806 && c <= 11807 || c === 11808 || c === 11809 || c === 11810 || c === 11811 || c === 11812 || c === 11813 || c === 11814 || c === 11815 || c === 11816 || c === 11817 || c >= 11818 && c <= 11822 || c === 11823 || c >= 11824 && c <= 11833 || c >= 11834 && c <= 11835 || c >= 11836 && c <= 11839 || c === 11840 || c === 11841 || c === 11842 || c >= 11843 && c <= 11855 || c >= 11856 && c <= 11857 || c === 11858 || c >= 11859 && c <= 11903 || c >= 12289 && c <= 12291 || c === 12296 || c === 12297 || c === 12298 || c === 12299 || c === 12300 || c === 12301 || c === 12302 || c === 12303 || c === 12304 || c === 12305 || c >= 12306 && c <= 12307 || c === 12308 || c === 12309 || c === 12310 || c === 12311 || c === 12312 || c === 12313 || c === 12314 || c === 12315 || c === 12316 || c === 12317 || c >= 12318 && c <= 12319 || c === 12320 || c === 12336 || c === 64830 || c === 64831 || c >= 65093 && c <= 65094;
    }
  }
});

// node_modules/@formatjs/icu-messageformat-parser/index.js
var require_icu_messageformat_parser = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.parse = void 0;
    var tslib_1 = require_tslib2();
    var error_1 = require_error();
    var parser_1 = require_parser();
    var types_1 = require_types();
    function pruneLocation(els) {
      els.forEach(function(el) {
        delete el.location;
        if (types_1.isSelectElement(el) || types_1.isPluralElement(el)) {
          for (var k in el.options) {
            delete el.options[k].location;
            pruneLocation(el.options[k].value);
          }
        } else if (types_1.isNumberElement(el) && types_1.isNumberSkeleton(el.style)) {
          delete el.style.location;
        } else if ((types_1.isDateElement(el) || types_1.isTimeElement(el)) && types_1.isDateTimeSkeleton(el.style)) {
          delete el.style.location;
        } else if (types_1.isTagElement(el)) {
          pruneLocation(el.children);
        }
      });
    }
    function parse(message, opts) {
      if (opts === void 0) {
        opts = {};
      }
      opts = tslib_1.__assign({shouldParseSkeletons: true, requiresOtherClause: true}, opts);
      var result = new parser_1.Parser(message, opts).parse();
      if (result.err) {
        var error3 = SyntaxError(error_1.ErrorKind[result.err.kind]);
        error3.location = result.err.location;
        error3.originalMessage = result.err.message;
        throw error3;
      }
      if (!(opts === null || opts === void 0 ? void 0 : opts.captureLocation)) {
        pruneLocation(result.val);
      }
      return result.val;
    }
    exports.parse = parse;
    tslib_1.__exportStar(require_types(), exports);
  }
});

// node_modules/@formatjs/fast-memoize/index.js
var require_fast_memoize = __commonJS({
  "node_modules/@formatjs/fast-memoize/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.strategies = void 0;
    function memoize(fn, options2) {
      var cache = options2 && options2.cache ? options2.cache : cacheDefault;
      var serializer = options2 && options2.serializer ? options2.serializer : serializerDefault;
      var strategy = options2 && options2.strategy ? options2.strategy : strategyDefault;
      return strategy(fn, {
        cache,
        serializer
      });
    }
    exports.default = memoize;
    function isPrimitive2(value) {
      return value == null || typeof value === "number" || typeof value === "boolean";
    }
    function monadic(fn, cache, serializer, arg) {
      var cacheKey = isPrimitive2(arg) ? arg : serializer(arg);
      var computedValue = cache.get(cacheKey);
      if (typeof computedValue === "undefined") {
        computedValue = fn.call(this, arg);
        cache.set(cacheKey, computedValue);
      }
      return computedValue;
    }
    function variadic(fn, cache, serializer) {
      var args = Array.prototype.slice.call(arguments, 3);
      var cacheKey = serializer(args);
      var computedValue = cache.get(cacheKey);
      if (typeof computedValue === "undefined") {
        computedValue = fn.apply(this, args);
        cache.set(cacheKey, computedValue);
      }
      return computedValue;
    }
    function assemble(fn, context, strategy, cache, serialize) {
      return strategy.bind(context, fn, cache, serialize);
    }
    function strategyDefault(fn, options2) {
      var strategy = fn.length === 1 ? monadic : variadic;
      return assemble(fn, this, strategy, options2.cache.create(), options2.serializer);
    }
    function strategyVariadic(fn, options2) {
      return assemble(fn, this, variadic, options2.cache.create(), options2.serializer);
    }
    function strategyMonadic(fn, options2) {
      return assemble(fn, this, monadic, options2.cache.create(), options2.serializer);
    }
    var serializerDefault = function() {
      return JSON.stringify(arguments);
    };
    function ObjectWithoutPrototypeCache() {
      this.cache = Object.create(null);
    }
    ObjectWithoutPrototypeCache.prototype.has = function(key) {
      return key in this.cache;
    };
    ObjectWithoutPrototypeCache.prototype.get = function(key) {
      return this.cache[key];
    };
    ObjectWithoutPrototypeCache.prototype.set = function(key, value) {
      this.cache[key] = value;
    };
    var cacheDefault = {
      create: function create() {
        return new ObjectWithoutPrototypeCache();
      }
    };
    exports.strategies = {
      variadic: strategyVariadic,
      monadic: strategyMonadic
    };
  }
});

// node_modules/intl-messageformat/src/error.js
var require_error2 = __commonJS({
  "node_modules/intl-messageformat/src/error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.MissingValueError = exports.InvalidValueTypeError = exports.InvalidValueError = exports.FormatError = exports.ErrorCode = void 0;
    var tslib_1 = require_tslib();
    var ErrorCode;
    (function(ErrorCode2) {
      ErrorCode2["MISSING_VALUE"] = "MISSING_VALUE";
      ErrorCode2["INVALID_VALUE"] = "INVALID_VALUE";
      ErrorCode2["MISSING_INTL_API"] = "MISSING_INTL_API";
    })(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
    var FormatError = function(_super) {
      tslib_1.__extends(FormatError2, _super);
      function FormatError2(msg, code, originalMessage) {
        var _this = _super.call(this, msg) || this;
        _this.code = code;
        _this.originalMessage = originalMessage;
        return _this;
      }
      FormatError2.prototype.toString = function() {
        return "[formatjs Error: " + this.code + "] " + this.message;
      };
      return FormatError2;
    }(Error);
    exports.FormatError = FormatError;
    var InvalidValueError = function(_super) {
      tslib_1.__extends(InvalidValueError2, _super);
      function InvalidValueError2(variableId, value, options2, originalMessage) {
        return _super.call(this, 'Invalid values for "' + variableId + '": "' + value + '". Options are "' + Object.keys(options2).join('", "') + '"', ErrorCode.INVALID_VALUE, originalMessage) || this;
      }
      return InvalidValueError2;
    }(FormatError);
    exports.InvalidValueError = InvalidValueError;
    var InvalidValueTypeError = function(_super) {
      tslib_1.__extends(InvalidValueTypeError2, _super);
      function InvalidValueTypeError2(value, type, originalMessage) {
        return _super.call(this, 'Value for "' + value + '" must be of type ' + type, ErrorCode.INVALID_VALUE, originalMessage) || this;
      }
      return InvalidValueTypeError2;
    }(FormatError);
    exports.InvalidValueTypeError = InvalidValueTypeError;
    var MissingValueError = function(_super) {
      tslib_1.__extends(MissingValueError2, _super);
      function MissingValueError2(variableId, originalMessage) {
        return _super.call(this, 'The intl string context variable "' + variableId + '" was not provided to the string "' + originalMessage + '"', ErrorCode.MISSING_VALUE, originalMessage) || this;
      }
      return MissingValueError2;
    }(FormatError);
    exports.MissingValueError = MissingValueError;
  }
});

// node_modules/intl-messageformat/src/formatters.js
var require_formatters = __commonJS({
  "node_modules/intl-messageformat/src/formatters.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.formatToParts = exports.isFormatXMLElementFn = exports.PART_TYPE = void 0;
    var icu_messageformat_parser_1 = require_icu_messageformat_parser();
    var error_1 = require_error2();
    var PART_TYPE;
    (function(PART_TYPE2) {
      PART_TYPE2[PART_TYPE2["literal"] = 0] = "literal";
      PART_TYPE2[PART_TYPE2["object"] = 1] = "object";
    })(PART_TYPE = exports.PART_TYPE || (exports.PART_TYPE = {}));
    function mergeLiteral(parts) {
      if (parts.length < 2) {
        return parts;
      }
      return parts.reduce(function(all, part) {
        var lastPart = all[all.length - 1];
        if (!lastPart || lastPart.type !== PART_TYPE.literal || part.type !== PART_TYPE.literal) {
          all.push(part);
        } else {
          lastPart.value += part.value;
        }
        return all;
      }, []);
    }
    function isFormatXMLElementFn(el) {
      return typeof el === "function";
    }
    exports.isFormatXMLElementFn = isFormatXMLElementFn;
    function formatToParts(els, locales, formatters, formats, values, currentPluralValue, originalMessage) {
      if (els.length === 1 && icu_messageformat_parser_1.isLiteralElement(els[0])) {
        return [
          {
            type: PART_TYPE.literal,
            value: els[0].value
          }
        ];
      }
      var result = [];
      for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
        var el = els_1[_i];
        if (icu_messageformat_parser_1.isLiteralElement(el)) {
          result.push({
            type: PART_TYPE.literal,
            value: el.value
          });
          continue;
        }
        if (icu_messageformat_parser_1.isPoundElement(el)) {
          if (typeof currentPluralValue === "number") {
            result.push({
              type: PART_TYPE.literal,
              value: formatters.getNumberFormat(locales).format(currentPluralValue)
            });
          }
          continue;
        }
        var varName = el.value;
        if (!(values && varName in values)) {
          throw new error_1.MissingValueError(varName, originalMessage);
        }
        var value = values[varName];
        if (icu_messageformat_parser_1.isArgumentElement(el)) {
          if (!value || typeof value === "string" || typeof value === "number") {
            value = typeof value === "string" || typeof value === "number" ? String(value) : "";
          }
          result.push({
            type: typeof value === "string" ? PART_TYPE.literal : PART_TYPE.object,
            value
          });
          continue;
        }
        if (icu_messageformat_parser_1.isDateElement(el)) {
          var style = typeof el.style === "string" ? formats.date[el.style] : icu_messageformat_parser_1.isDateTimeSkeleton(el.style) ? el.style.parsedOptions : void 0;
          result.push({
            type: PART_TYPE.literal,
            value: formatters.getDateTimeFormat(locales, style).format(value)
          });
          continue;
        }
        if (icu_messageformat_parser_1.isTimeElement(el)) {
          var style = typeof el.style === "string" ? formats.time[el.style] : icu_messageformat_parser_1.isDateTimeSkeleton(el.style) ? el.style.parsedOptions : void 0;
          result.push({
            type: PART_TYPE.literal,
            value: formatters.getDateTimeFormat(locales, style).format(value)
          });
          continue;
        }
        if (icu_messageformat_parser_1.isNumberElement(el)) {
          var style = typeof el.style === "string" ? formats.number[el.style] : icu_messageformat_parser_1.isNumberSkeleton(el.style) ? el.style.parsedOptions : void 0;
          if (style && style.scale) {
            value = value * (style.scale || 1);
          }
          result.push({
            type: PART_TYPE.literal,
            value: formatters.getNumberFormat(locales, style).format(value)
          });
          continue;
        }
        if (icu_messageformat_parser_1.isTagElement(el)) {
          var children = el.children, value_1 = el.value;
          var formatFn = values[value_1];
          if (!isFormatXMLElementFn(formatFn)) {
            throw new error_1.InvalidValueTypeError(value_1, "function", originalMessage);
          }
          var parts = formatToParts(children, locales, formatters, formats, values, currentPluralValue);
          var chunks = formatFn(parts.map(function(p) {
            return p.value;
          }));
          if (!Array.isArray(chunks)) {
            chunks = [chunks];
          }
          result.push.apply(result, chunks.map(function(c) {
            return {
              type: typeof c === "string" ? PART_TYPE.literal : PART_TYPE.object,
              value: c
            };
          }));
        }
        if (icu_messageformat_parser_1.isSelectElement(el)) {
          var opt = el.options[value] || el.options.other;
          if (!opt) {
            throw new error_1.InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
          }
          result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
          continue;
        }
        if (icu_messageformat_parser_1.isPluralElement(el)) {
          var opt = el.options["=" + value];
          if (!opt) {
            if (!Intl.PluralRules) {
              throw new error_1.FormatError('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n', error_1.ErrorCode.MISSING_INTL_API, originalMessage);
            }
            var rule = formatters.getPluralRules(locales, {type: el.pluralType}).select(value - (el.offset || 0));
            opt = el.options[rule] || el.options.other;
          }
          if (!opt) {
            throw new error_1.InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
          }
          result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el.offset || 0)));
          continue;
        }
      }
      return mergeLiteral(result);
    }
    exports.formatToParts = formatToParts;
  }
});

// node_modules/intl-messageformat/src/core.js
var require_core = __commonJS({
  "node_modules/intl-messageformat/src/core.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.IntlMessageFormat = void 0;
    var tslib_1 = require_tslib();
    var icu_messageformat_parser_1 = require_icu_messageformat_parser();
    var fast_memoize_1 = tslib_1.__importStar(require_fast_memoize());
    var formatters_1 = require_formatters();
    function mergeConfig(c1, c2) {
      if (!c2) {
        return c1;
      }
      return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, c1 || {}), c2 || {}), Object.keys(c1).reduce(function(all, k) {
        all[k] = tslib_1.__assign(tslib_1.__assign({}, c1[k]), c2[k] || {});
        return all;
      }, {}));
    }
    function mergeConfigs(defaultConfig, configs) {
      if (!configs) {
        return defaultConfig;
      }
      return Object.keys(defaultConfig).reduce(function(all, k) {
        all[k] = mergeConfig(defaultConfig[k], configs[k]);
        return all;
      }, tslib_1.__assign({}, defaultConfig));
    }
    function createFastMemoizeCache(store) {
      return {
        create: function() {
          return {
            has: function(key) {
              return key in store;
            },
            get: function(key) {
              return store[key];
            },
            set: function(key, value) {
              store[key] = value;
            }
          };
        }
      };
    }
    function createDefaultFormatters(cache) {
      if (cache === void 0) {
        cache = {
          number: {},
          dateTime: {},
          pluralRules: {}
        };
      }
      return {
        getNumberFormat: fast_memoize_1.default(function() {
          var _a;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return new ((_a = Intl.NumberFormat).bind.apply(_a, tslib_1.__spreadArray([void 0], args)))();
        }, {
          cache: createFastMemoizeCache(cache.number),
          strategy: fast_memoize_1.strategies.variadic
        }),
        getDateTimeFormat: fast_memoize_1.default(function() {
          var _a;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return new ((_a = Intl.DateTimeFormat).bind.apply(_a, tslib_1.__spreadArray([void 0], args)))();
        }, {
          cache: createFastMemoizeCache(cache.dateTime),
          strategy: fast_memoize_1.strategies.variadic
        }),
        getPluralRules: fast_memoize_1.default(function() {
          var _a;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return new ((_a = Intl.PluralRules).bind.apply(_a, tslib_1.__spreadArray([void 0], args)))();
        }, {
          cache: createFastMemoizeCache(cache.pluralRules),
          strategy: fast_memoize_1.strategies.variadic
        })
      };
    }
    var IntlMessageFormat = function() {
      function IntlMessageFormat2(message, locales, overrideFormats, opts) {
        var _this = this;
        if (locales === void 0) {
          locales = IntlMessageFormat2.defaultLocale;
        }
        this.formatterCache = {
          number: {},
          dateTime: {},
          pluralRules: {}
        };
        this.format = function(values) {
          var parts = _this.formatToParts(values);
          if (parts.length === 1) {
            return parts[0].value;
          }
          var result = parts.reduce(function(all, part) {
            if (!all.length || part.type !== formatters_1.PART_TYPE.literal || typeof all[all.length - 1] !== "string") {
              all.push(part.value);
            } else {
              all[all.length - 1] += part.value;
            }
            return all;
          }, []);
          if (result.length <= 1) {
            return result[0] || "";
          }
          return result;
        };
        this.formatToParts = function(values) {
          return formatters_1.formatToParts(_this.ast, _this.locales, _this.formatters, _this.formats, values, void 0, _this.message);
        };
        this.resolvedOptions = function() {
          return {
            locale: Intl.NumberFormat.supportedLocalesOf(_this.locales)[0]
          };
        };
        this.getAst = function() {
          return _this.ast;
        };
        if (typeof message === "string") {
          this.message = message;
          if (!IntlMessageFormat2.__parse) {
            throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
          }
          this.ast = IntlMessageFormat2.__parse(message, {
            ignoreTag: opts === null || opts === void 0 ? void 0 : opts.ignoreTag
          });
        } else {
          this.ast = message;
        }
        if (!Array.isArray(this.ast)) {
          throw new TypeError("A message must be provided as a String or AST.");
        }
        this.formats = mergeConfigs(IntlMessageFormat2.formats, overrideFormats);
        this.locales = locales;
        this.formatters = opts && opts.formatters || createDefaultFormatters(this.formatterCache);
      }
      Object.defineProperty(IntlMessageFormat2, "defaultLocale", {
        get: function() {
          if (!IntlMessageFormat2.memoizedDefaultLocale) {
            IntlMessageFormat2.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
          }
          return IntlMessageFormat2.memoizedDefaultLocale;
        },
        enumerable: false,
        configurable: true
      });
      IntlMessageFormat2.memoizedDefaultLocale = null;
      IntlMessageFormat2.__parse = icu_messageformat_parser_1.parse;
      IntlMessageFormat2.formats = {
        number: {
          currency: {
            style: "currency"
          },
          percent: {
            style: "percent"
          }
        },
        date: {
          short: {
            month: "numeric",
            day: "numeric",
            year: "2-digit"
          },
          medium: {
            month: "short",
            day: "numeric",
            year: "numeric"
          },
          long: {
            month: "long",
            day: "numeric",
            year: "numeric"
          },
          full: {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
          }
        },
        time: {
          short: {
            hour: "numeric",
            minute: "numeric"
          },
          medium: {
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
          },
          long: {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short"
          },
          full: {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short"
          }
        }
      };
      return IntlMessageFormat2;
    }();
    exports.IntlMessageFormat = IntlMessageFormat;
  }
});

// node_modules/intl-messageformat/index.js
var require_intl_messageformat = __commonJS({
  "node_modules/intl-messageformat/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    var tslib_1 = require_tslib();
    var core_1 = require_core();
    tslib_1.__exportStar(require_formatters(), exports);
    tslib_1.__exportStar(require_core(), exports);
    tslib_1.__exportStar(require_error2(), exports);
    exports.default = core_1.IntlMessageFormat;
  }
});

// node_modules/svelte-i18n/dist/runtime.cjs.js
var require_runtime_cjs = __commonJS({
  "node_modules/svelte-i18n/dist/runtime.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    var e = require_store();
    var t = require_cjs();
    var n = require_intl_messageformat();
    function r(e2) {
      return e2 && typeof e2 == "object" && "default" in e2 ? e2 : {default: e2};
    }
    var o = r(t);
    var i = r(n);
    var a = {};
    var l = (e2, t2, n2) => n2 ? (t2 in a || (a[t2] = {}), e2 in a[t2] || (a[t2][e2] = n2), n2) : n2;
    var s2 = (e2, t2) => {
      if (t2 == null)
        return;
      if (t2 in a && e2 in a[t2])
        return a[t2][e2];
      const n2 = k(t2);
      for (let r2 = 0; r2 < n2.length; r2++) {
        const o2 = f(n2[r2], e2);
        if (o2)
          return l(e2, t2, o2);
      }
    };
    var u;
    var c = e.writable({});
    function m(e2) {
      return e2 in u;
    }
    function f(e2, t2) {
      if (!m(e2))
        return null;
      return function(e3, t3) {
        if (t3 in e3)
          return e3[t3];
        const n2 = t3.split(".");
        let r2 = e3;
        for (let e4 = 0; e4 < n2.length; e4++)
          if (typeof r2 == "object") {
            if (e4 > 0) {
              const t4 = n2.slice(e4, n2.length).join(".");
              if (t4 in r2) {
                r2 = r2[t4];
                break;
              }
            }
            r2 = r2[n2[e4]];
          } else
            r2 = void 0;
        return r2;
      }(function(e3) {
        return u[e3] || null;
      }(e2), t2);
    }
    function d(e2, ...t2) {
      delete a[e2], c.update((n2) => (n2[e2] = o.default.all([n2[e2] || {}, ...t2]), n2));
    }
    var g = e.derived([c], ([e2]) => Object.keys(e2));
    c.subscribe((e2) => u = e2);
    var p = {};
    function w(e2) {
      return p[e2];
    }
    function h(e2) {
      return k(e2).some((e3) => {
        var t2;
        return (t2 = w(e3)) === null || t2 === void 0 ? void 0 : t2.size;
      });
    }
    function b(e2, t2) {
      return Promise.all(t2.map((t3) => (function(e3, t4) {
        p[e3].delete(t4), p[e3].size === 0 && delete p[e3];
      }(e2, t3), t3().then((e3) => e3.default || e3)))).then((t3) => d(e2, ...t3));
    }
    var y = {};
    function v(e2) {
      if (!h(e2))
        return e2 in y ? y[e2] : void 0;
      const t2 = function(e3) {
        return k(e3).map((e4) => {
          const t3 = w(e4);
          return [e4, t3 ? [...t3] : []];
        }).filter(([, e4]) => e4.length > 0);
      }(e2);
      return y[e2] = Promise.all(t2.map(([e3, t3]) => b(e3, t3))).then(() => {
        if (h(e2))
          return v(e2);
        delete y[e2];
      }), y[e2];
    }
    function x(e2, t2) {
      var n2 = {};
      for (var r2 in e2)
        Object.prototype.hasOwnProperty.call(e2, r2) && t2.indexOf(r2) < 0 && (n2[r2] = e2[r2]);
      if (e2 != null && typeof Object.getOwnPropertySymbols == "function") {
        var o2 = 0;
        for (r2 = Object.getOwnPropertySymbols(e2); o2 < r2.length; o2++)
          t2.indexOf(r2[o2]) < 0 && Object.prototype.propertyIsEnumerable.call(e2, r2[o2]) && (n2[r2[o2]] = e2[r2[o2]]);
      }
      return n2;
    }
    var O = {fallbackLocale: null, initialLocale: null, loadingDelay: 200, formats: {number: {scientific: {notation: "scientific"}, engineering: {notation: "engineering"}, compactLong: {notation: "compact", compactDisplay: "long"}, compactShort: {notation: "compact", compactDisplay: "short"}}, date: {short: {month: "numeric", day: "numeric", year: "2-digit"}, medium: {month: "short", day: "numeric", year: "numeric"}, long: {month: "long", day: "numeric", year: "numeric"}, full: {weekday: "long", month: "long", day: "numeric", year: "numeric"}}, time: {short: {hour: "numeric", minute: "numeric"}, medium: {hour: "numeric", minute: "numeric", second: "numeric"}, long: {hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short"}, full: {hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short"}}}, warnOnMissingMessages: true, ignoreTag: true};
    function j() {
      return O;
    }
    var L = e.writable(false);
    var F;
    var M = e.writable(null);
    function $(e2) {
      return e2.split("-").map((e3, t2, n2) => n2.slice(0, t2 + 1).join("-")).reverse();
    }
    function k(e2, t2 = j().fallbackLocale) {
      const n2 = $(e2);
      return t2 ? [...new Set([...n2, ...$(t2)])] : n2;
    }
    function T() {
      return F;
    }
    M.subscribe((e2) => {
      F = e2, typeof window != "undefined" && e2 !== null && document.documentElement.setAttribute("lang", e2);
    });
    var D = M.set;
    M.set = (e2) => {
      if (function(e3) {
        if (e3 == null)
          return;
        const t2 = k(e3);
        for (let e4 = 0; e4 < t2.length; e4++) {
          const n2 = t2[e4];
          if (m(n2))
            return n2;
        }
      }(e2) && h(e2)) {
        const {loadingDelay: t2} = j();
        let n2;
        return typeof window != "undefined" && T() != null && t2 ? n2 = window.setTimeout(() => L.set(true), t2) : L.set(true), v(e2).then(() => {
          D(e2);
        }).finally(() => {
          clearTimeout(n2), L.set(false);
        });
      }
      return D(e2);
    }, M.update = (e2) => D(e2(F));
    var E = (e2, t2) => {
      const n2 = e2.split("&").find((e3) => e3.indexOf(`${t2}=`) === 0);
      return n2 ? n2.split("=").pop() : null;
    };
    var N = (e2, t2) => {
      const n2 = t2.exec(e2);
      return n2 && n2[1] || null;
    };
    var P = (e2) => {
      const t2 = Object.create(null);
      return (n2) => {
        const r2 = JSON.stringify(n2);
        return r2 in t2 ? t2[r2] : t2[r2] = e2(n2);
      };
    };
    var S = (e2, t2) => {
      const {formats: n2} = j();
      if (e2 in n2 && t2 in n2[e2])
        return n2[e2][t2];
      throw new Error(`[svelte-i18n] Unknown "${t2}" ${e2} format.`);
    };
    var A = P((e2) => {
      var {locale: t2, format: n2} = e2, r2 = x(e2, ["locale", "format"]);
      if (t2 == null)
        throw new Error('[svelte-i18n] A "locale" must be set to format numbers');
      return n2 && (r2 = S("number", n2)), new Intl.NumberFormat(t2, r2);
    });
    var I = P((e2) => {
      var {locale: t2, format: n2} = e2, r2 = x(e2, ["locale", "format"]);
      if (t2 == null)
        throw new Error('[svelte-i18n] A "locale" must be set to format dates');
      return n2 ? r2 = S("date", n2) : Object.keys(r2).length === 0 && (r2 = S("date", "short")), new Intl.DateTimeFormat(t2, r2);
    });
    var q = P((e2) => {
      var {locale: t2, format: n2} = e2, r2 = x(e2, ["locale", "format"]);
      if (t2 == null)
        throw new Error('[svelte-i18n] A "locale" must be set to format time values');
      return n2 ? r2 = S("time", n2) : Object.keys(r2).length === 0 && (r2 = S("time", "short")), new Intl.DateTimeFormat(t2, r2);
    });
    var _2 = (e2 = {}) => {
      var {locale: t2 = T()} = e2, n2 = x(e2, ["locale"]);
      return A(Object.assign({locale: t2}, n2));
    };
    var z = (e2 = {}) => {
      var {locale: t2 = T()} = e2, n2 = x(e2, ["locale"]);
      return I(Object.assign({locale: t2}, n2));
    };
    var H = (e2 = {}) => {
      var {locale: t2 = T()} = e2, n2 = x(e2, ["locale"]);
      return q(Object.assign({locale: t2}, n2));
    };
    var Z = P((e2, t2 = T()) => new i.default(e2, t2, j().formats, {ignoreTag: j().ignoreTag}));
    var C = (e2, t2 = {}) => {
      typeof e2 == "object" && (e2 = (t2 = e2).id);
      const {values: n2, locale: r2 = T(), default: o2} = t2;
      if (r2 == null)
        throw new Error("[svelte-i18n] Cannot format a message without first setting the initial locale.");
      let i2 = s2(e2, r2);
      if (i2) {
        if (typeof i2 != "string")
          return console.warn(`[svelte-i18n] Message with id "${e2}" must be of type "string", found: "${typeof i2}". Gettin its value through the "$format" method is deprecated; use the "json" method instead.`), i2;
      } else
        j().warnOnMissingMessages && console.warn(`[svelte-i18n] The message "${e2}" was not found in "${k(r2).join('", "')}".${h(T()) ? "\n\nNote: there are at least one loader still registered to this locale that wasn't executed." : ""}`), i2 = o2 || e2;
      if (!n2)
        return i2;
      let a2 = i2;
      try {
        a2 = Z(i2, r2).format(n2);
      } catch (t3) {
        console.warn(`[svelte-i18n] Message "${e2}" has syntax error:`, t3.message);
      }
      return a2;
    };
    var G = (e2, t2) => H(t2).format(e2);
    var J = (e2, t2) => z(t2).format(e2);
    var Q = (e2, t2) => _2(t2).format(e2);
    var U = (e2, t2 = T()) => s2(e2, t2);
    var B = e.derived([M, c], () => C);
    var K = e.derived([M], () => G);
    var R = e.derived([M], () => J);
    var V = e.derived([M], () => Q);
    var W = e.derived([M, c], () => U);
    exports._ = B, exports.addMessages = d, exports.date = R, exports.defineMessages = function(e2) {
      return e2;
    }, exports.dictionary = c, exports.format = B, exports.getDateFormatter = z, exports.getLocaleFromHash = (e2) => typeof window == "undefined" ? null : E(window.location.hash.substr(1), e2), exports.getLocaleFromHostname = (e2) => typeof window == "undefined" ? null : N(window.location.hostname, e2), exports.getLocaleFromNavigator = () => typeof window == "undefined" ? null : window.navigator.language || window.navigator.languages[0], exports.getLocaleFromPathname = (e2) => typeof window == "undefined" ? null : N(window.location.pathname, e2), exports.getLocaleFromQueryString = (e2) => typeof window == "undefined" ? null : E(window.location.search.substr(1), e2), exports.getMessageFormatter = Z, exports.getNumberFormatter = _2, exports.getTimeFormatter = H, exports.init = function(e2) {
      const {formats: t2} = e2, n2 = x(e2, ["formats"]), r2 = e2.initialLocale || e2.fallbackLocale;
      return Object.assign(O, n2, {initialLocale: r2}), t2 && ("number" in t2 && Object.assign(O.formats.number, t2.number), "date" in t2 && Object.assign(O.formats.date, t2.date), "time" in t2 && Object.assign(O.formats.time, t2.time)), M.set(r2);
    }, exports.isLoading = L, exports.json = W, exports.locale = M, exports.locales = g, exports.number = V, exports.register = function(e2, t2) {
      w(e2) || function(e3) {
        p[e3] = new Set();
      }(e2);
      const n2 = w(e2);
      w(e2).has(t2) || (m(e2) || c.update((t3) => (t3[e2] = {}, t3)), n2.add(t2));
    }, exports.t = B, exports.time = K, exports.waitLocale = function(e2) {
      return v(e2 || T() || j().initialLocale);
    };
  }
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports, module2) {
    "use strict";
    module2.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (sym in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports, module2) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module2.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports, module2) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var slice = Array.prototype.slice;
    var toStr = Object.prototype.toString;
    var funcType = "[object Function]";
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice.call(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(this, args.concat(slice.call(arguments)));
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(that, args.concat(slice.call(arguments)));
        }
      };
      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push("$" + i);
      }
      bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports, module2) {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/has/src/index.js
var require_src = __commonJS({
  "node_modules/has/src/index.js"(exports, module2) {
    "use strict";
    var bind = require_function_bind();
    module2.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
  }
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports, module2) {
    "use strict";
    var undefined2;
    var $SyntaxError = SyntaxError;
    var $Function = Function;
    var $TypeError = TypeError;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = Object.getOwnPropertyDescriptor;
    if ($gOPD) {
      try {
        $gOPD({}, "");
      } catch (e) {
        $gOPD = null;
      }
    }
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = Object.getPrototypeOf || function(x) {
      return x.__proto__;
    };
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%eval%": eval,
      "%EvalError%": EvalError,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols ? undefined2 : getProto(new Map()[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": RangeError,
      "%ReferenceError%": ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols ? undefined2 : getProto(new Set()[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
    };
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_src();
    var $concat = bind.call(Function.call, Array.prototype.concat);
    var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
    var $replace = bind.call(Function.call, String.prototype.replace);
    var $strSlice = bind.call(Function.call, String.prototype.slice);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module2.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/call-bind/index.js
var require_call_bind = __commonJS({
  "node_modules/call-bind/index.js"(exports, module2) {
    "use strict";
    var bind = require_function_bind();
    var GetIntrinsic = require_get_intrinsic();
    var $apply = GetIntrinsic("%Function.prototype.apply%");
    var $call = GetIntrinsic("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var $max = GetIntrinsic("%Math.max%");
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", {value: 1});
      } catch (e) {
        $defineProperty = null;
      }
    }
    module2.exports = function callBind(originalFunction) {
      var func = $reflectApply(bind, $call, arguments);
      if ($gOPD && $defineProperty) {
        var desc = $gOPD(func, "length");
        if (desc.configurable) {
          $defineProperty(func, "length", {value: 1 + $max(0, originalFunction.length - (arguments.length - 1))});
        }
      }
      return func;
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(module2.exports, "apply", {value: applyBind});
    } else {
      module2.exports.apply = applyBind;
    }
  }
});

// node_modules/call-bind/callBound.js
var require_callBound = __commonJS({
  "node_modules/call-bind/callBound.js"(exports, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBind = require_call_bind();
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    module2.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing);
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBind(intrinsic);
      }
      return intrinsic;
    };
  }
});

// node_modules/object-inspect/util.inspect.js
var require_util_inspect = __commonJS({
  "node_modules/object-inspect/util.inspect.js"(exports, module2) {
    module2.exports = require("util").inspect;
  }
});

// node_modules/object-inspect/index.js
var require_object_inspect = __commonJS({
  "node_modules/object-inspect/index.js"(exports, module2) {
    var hasMap = typeof Map === "function" && Map.prototype;
    var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
    var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === "function" && Set.prototype;
    var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
    var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var match = String.prototype.match;
    var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
    var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
      return O.__proto__;
    } : null);
    var inspectCustom = require_util_inspect().custom;
    var inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;
    var toStringTag = typeof Symbol === "function" && typeof Symbol.toStringTag !== "undefined" ? Symbol.toStringTag : null;
    module2.exports = function inspect_(obj, options2, depth, seen) {
      var opts = options2 || {};
      if (has(opts, "quoteStyle") && (opts.quoteStyle !== "single" && opts.quoteStyle !== "double")) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      }
      if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
      }
      var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
      if (typeof customInspect !== "boolean") {
        throw new TypeError('option "customInspect", if provided, must be `true` or `false`');
      }
      if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
        throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
      }
      if (typeof obj === "undefined") {
        return "undefined";
      }
      if (obj === null) {
        return "null";
      }
      if (typeof obj === "boolean") {
        return obj ? "true" : "false";
      }
      if (typeof obj === "string") {
        return inspectString(obj, opts);
      }
      if (typeof obj === "number") {
        if (obj === 0) {
          return Infinity / obj > 0 ? "0" : "-0";
        }
        return String(obj);
      }
      if (typeof obj === "bigint") {
        return String(obj) + "n";
      }
      var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
      if (typeof depth === "undefined") {
        depth = 0;
      }
      if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
        return isArray(obj) ? "[Array]" : "[Object]";
      }
      var indent = getIndent(opts, depth);
      if (typeof seen === "undefined") {
        seen = [];
      } else if (indexOf(seen, obj) >= 0) {
        return "[Circular]";
      }
      function inspect(value, from, noIndent) {
        if (from) {
          seen = seen.slice();
          seen.push(from);
        }
        if (noIndent) {
          var newOpts = {
            depth: opts.depth
          };
          if (has(opts, "quoteStyle")) {
            newOpts.quoteStyle = opts.quoteStyle;
          }
          return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
      }
      if (typeof obj === "function") {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + keys.join(", ") + " }" : "");
      }
      if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? String(obj).replace(/^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
        return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
      }
      if (isElement(obj)) {
        var s2 = "<" + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
          s2 += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
        }
        s2 += ">";
        if (obj.childNodes && obj.childNodes.length) {
          s2 += "...";
        }
        s2 += "</" + String(obj.nodeName).toLowerCase() + ">";
        return s2;
      }
      if (isArray(obj)) {
        if (obj.length === 0) {
          return "[]";
        }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
          return "[" + indentedJoin(xs, indent) + "]";
        }
        return "[ " + xs.join(", ") + " ]";
      }
      if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (parts.length === 0) {
          return "[" + String(obj) + "]";
        }
        return "{ [" + String(obj) + "] " + parts.join(", ") + " }";
      }
      if (typeof obj === "object" && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === "function") {
          return obj[inspectSymbol]();
        } else if (typeof obj.inspect === "function") {
          return obj.inspect();
        }
      }
      if (isMap(obj)) {
        var mapParts = [];
        mapForEach.call(obj, function(value, key) {
          mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
        });
        return collectionOf("Map", mapSize.call(obj), mapParts, indent);
      }
      if (isSet(obj)) {
        var setParts = [];
        setForEach.call(obj, function(value) {
          setParts.push(inspect(value, obj));
        });
        return collectionOf("Set", setSize.call(obj), setParts, indent);
      }
      if (isWeakMap(obj)) {
        return weakCollectionOf("WeakMap");
      }
      if (isWeakSet(obj)) {
        return weakCollectionOf("WeakSet");
      }
      if (isWeakRef(obj)) {
        return weakCollectionOf("WeakRef");
      }
      if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
      }
      if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
      }
      if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
      }
      if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
      }
      if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? "" : "null prototype";
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? toStr(obj).slice(8, -1) : protoTag ? "Object" : "";
        var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
        var tag = constructorTag + (stringTag || protoTag ? "[" + [].concat(stringTag || [], protoTag || []).join(": ") + "] " : "");
        if (ys.length === 0) {
          return tag + "{}";
        }
        if (indent) {
          return tag + "{" + indentedJoin(ys, indent) + "}";
        }
        return tag + "{ " + ys.join(", ") + " }";
      }
      return String(obj);
    };
    function wrapQuotes(s2, defaultStyle, opts) {
      var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
      return quoteChar + s2 + quoteChar;
    }
    function quote(s2) {
      return String(s2).replace(/"/g, "&quot;");
    }
    function isArray(obj) {
      return toStr(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isDate(obj) {
      return toStr(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isRegExp(obj) {
      return toStr(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isError(obj) {
      return toStr(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isString(obj) {
      return toStr(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isNumber(obj) {
      return toStr(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isBoolean(obj) {
      return toStr(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isSymbol(obj) {
      if (hasShammedSymbols) {
        return obj && typeof obj === "object" && obj instanceof Symbol;
      }
      if (typeof obj === "symbol") {
        return true;
      }
      if (!obj || typeof obj !== "object" || !symToString) {
        return false;
      }
      try {
        symToString.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isBigInt(obj) {
      if (!obj || typeof obj !== "object" || !bigIntValueOf) {
        return false;
      }
      try {
        bigIntValueOf.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    var hasOwn = Object.prototype.hasOwnProperty || function(key) {
      return key in this;
    };
    function has(obj, key) {
      return hasOwn.call(obj, key);
    }
    function toStr(obj) {
      return objectToString.call(obj);
    }
    function nameOf(f) {
      if (f.name) {
        return f.name;
      }
      var m = match.call(functionToString.call(f), /^function\s*([\w$]+)/);
      if (m) {
        return m[1];
      }
      return null;
    }
    function indexOf(xs, x) {
      if (xs.indexOf) {
        return xs.indexOf(x);
      }
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) {
          return i;
        }
      }
      return -1;
    }
    function isMap(x) {
      if (!mapSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        mapSize.call(x);
        try {
          setSize.call(x);
        } catch (s2) {
          return true;
        }
        return x instanceof Map;
      } catch (e) {
      }
      return false;
    }
    function isWeakMap(x) {
      if (!weakMapHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakMapHas.call(x, weakMapHas);
        try {
          weakSetHas.call(x, weakSetHas);
        } catch (s2) {
          return true;
        }
        return x instanceof WeakMap;
      } catch (e) {
      }
      return false;
    }
    function isWeakRef(x) {
      if (!weakRefDeref || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakRefDeref.call(x);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isSet(x) {
      if (!setSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        setSize.call(x);
        try {
          mapSize.call(x);
        } catch (m) {
          return true;
        }
        return x instanceof Set;
      } catch (e) {
      }
      return false;
    }
    function isWeakSet(x) {
      if (!weakSetHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakSetHas.call(x, weakSetHas);
        try {
          weakMapHas.call(x, weakMapHas);
        } catch (s2) {
          return true;
        }
        return x instanceof WeakSet;
      } catch (e) {
      }
      return false;
    }
    function isElement(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
        return true;
      }
      return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
    }
    function inspectString(str, opts) {
      if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
        return inspectString(str.slice(0, opts.maxStringLength), opts) + trailer;
      }
      var s2 = str.replace(/(['\\])/g, "\\$1").replace(/[\x00-\x1f]/g, lowbyte);
      return wrapQuotes(s2, "single", opts);
    }
    function lowbyte(c) {
      var n = c.charCodeAt(0);
      var x = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r"
      }[n];
      if (x) {
        return "\\" + x;
      }
      return "\\x" + (n < 16 ? "0" : "") + n.toString(16).toUpperCase();
    }
    function markBoxed(str) {
      return "Object(" + str + ")";
    }
    function weakCollectionOf(type) {
      return type + " { ? }";
    }
    function collectionOf(type, size, entries, indent) {
      var joinedEntries = indent ? indentedJoin(entries, indent) : entries.join(", ");
      return type + " (" + size + ") {" + joinedEntries + "}";
    }
    function singleLineValues(xs) {
      for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], "\n") >= 0) {
          return false;
        }
      }
      return true;
    }
    function getIndent(opts, depth) {
      var baseIndent;
      if (opts.indent === "	") {
        baseIndent = "	";
      } else if (typeof opts.indent === "number" && opts.indent > 0) {
        baseIndent = Array(opts.indent + 1).join(" ");
      } else {
        return null;
      }
      return {
        base: baseIndent,
        prev: Array(depth + 1).join(baseIndent)
      };
    }
    function indentedJoin(xs, indent) {
      if (xs.length === 0) {
        return "";
      }
      var lineJoiner = "\n" + indent.prev + indent.base;
      return lineJoiner + xs.join("," + lineJoiner) + "\n" + indent.prev;
    }
    function arrObjKeys(obj, inspect) {
      var isArr = isArray(obj);
      var xs = [];
      if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
          xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
        }
      }
      var syms = typeof gOPS === "function" ? gOPS(obj) : [];
      var symMap;
      if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
          symMap["$" + syms[k]] = syms[k];
        }
      }
      for (var key in obj) {
        if (!has(obj, key)) {
          continue;
        }
        if (isArr && String(Number(key)) === key && key < obj.length) {
          continue;
        }
        if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
          continue;
        } else if (/[^\w$]/.test(key)) {
          xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
        } else {
          xs.push(key + ": " + inspect(obj[key], obj));
        }
      }
      if (typeof gOPS === "function") {
        for (var j = 0; j < syms.length; j++) {
          if (isEnumerable.call(obj, syms[j])) {
            xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
          }
        }
      }
      return xs;
    }
  }
});

// node_modules/side-channel/index.js
var require_side_channel = __commonJS({
  "node_modules/side-channel/index.js"(exports, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_callBound();
    var inspect = require_object_inspect();
    var $TypeError = GetIntrinsic("%TypeError%");
    var $WeakMap = GetIntrinsic("%WeakMap%", true);
    var $Map = GetIntrinsic("%Map%", true);
    var $weakMapGet = callBound("WeakMap.prototype.get", true);
    var $weakMapSet = callBound("WeakMap.prototype.set", true);
    var $weakMapHas = callBound("WeakMap.prototype.has", true);
    var $mapGet = callBound("Map.prototype.get", true);
    var $mapSet = callBound("Map.prototype.set", true);
    var $mapHas = callBound("Map.prototype.has", true);
    var listGetNode = function(list, key) {
      for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
        if (curr.key === key) {
          prev.next = curr.next;
          curr.next = list.next;
          list.next = curr;
          return curr;
        }
      }
    };
    var listGet = function(objects, key) {
      var node = listGetNode(objects, key);
      return node && node.value;
    };
    var listSet = function(objects, key, value) {
      var node = listGetNode(objects, key);
      if (node) {
        node.value = value;
      } else {
        objects.next = {
          key,
          next: objects.next,
          value
        };
      }
    };
    var listHas = function(objects, key) {
      return !!listGetNode(objects, key);
    };
    module2.exports = function getSideChannel() {
      var $wm;
      var $m;
      var $o;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        get: function(key) {
          if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
            if ($wm) {
              return $weakMapGet($wm, key);
            }
          } else if ($Map) {
            if ($m) {
              return $mapGet($m, key);
            }
          } else {
            if ($o) {
              return listGet($o, key);
            }
          }
        },
        has: function(key) {
          if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
            if ($wm) {
              return $weakMapHas($wm, key);
            }
          } else if ($Map) {
            if ($m) {
              return $mapHas($m, key);
            }
          } else {
            if ($o) {
              return listHas($o, key);
            }
          }
          return false;
        },
        set: function(key, value) {
          if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
            if (!$wm) {
              $wm = new $WeakMap();
            }
            $weakMapSet($wm, key, value);
          } else if ($Map) {
            if (!$m) {
              $m = new $Map();
            }
            $mapSet($m, key, value);
          } else {
            if (!$o) {
              $o = {key: {}, next: null};
            }
            listSet($o, key, value);
          }
        }
      };
      return channel;
    };
  }
});

// node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "node_modules/qs/lib/formats.js"(exports, module2) {
    "use strict";
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: "RFC1738",
      RFC3986: "RFC3986"
    };
    module2.exports = {
      "default": Format.RFC3986,
      formatters: {
        RFC1738: function(value) {
          return replace.call(value, percentTwenties, "+");
        },
        RFC3986: function(value) {
          return String(value);
        }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
    };
  }
});

// node_modules/qs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/qs/lib/utils.js"(exports, module2) {
    "use strict";
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var hexTable = function() {
      var array = [];
      for (var i = 0; i < 256; ++i) {
        array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
      }
      return array;
    }();
    var compactQueue = function compactQueue2(queue) {
      while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];
        if (isArray(obj)) {
          var compacted = [];
          for (var j = 0; j < obj.length; ++j) {
            if (typeof obj[j] !== "undefined") {
              compacted.push(obj[j]);
            }
          }
          item.obj[item.prop] = compacted;
        }
      }
    };
    var arrayToObject = function arrayToObject2(source, options2) {
      var obj = options2 && options2.plainObjects ? Object.create(null) : {};
      for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== "undefined") {
          obj[i] = source[i];
        }
      }
      return obj;
    };
    var merge = function merge2(target, source, options2) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object") {
        if (isArray(target)) {
          target.push(source);
        } else if (target && typeof target === "object") {
          if (options2 && (options2.plainObjects || options2.allowPrototypes) || !has.call(Object.prototype, source)) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        return [target].concat(source);
      }
      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options2);
      }
      if (isArray(target) && isArray(source)) {
        source.forEach(function(item, i) {
          if (has.call(target, i)) {
            var targetItem = target[i];
            if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
              target[i] = merge2(targetItem, item, options2);
            } else {
              target.push(item);
            }
          } else {
            target[i] = item;
          }
        });
        return target;
      }
      return Object.keys(source).reduce(function(acc, key) {
        var value = source[key];
        if (has.call(acc, key)) {
          acc[key] = merge2(acc[key], value, options2);
        } else {
          acc[key] = value;
        }
        return acc;
      }, mergeTarget);
    };
    var assign2 = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function(acc, key) {
        acc[key] = source[key];
        return acc;
      }, target);
    };
    var decode = function(str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    };
    var encode = function encode2(str, defaultEncoder, charset, kind, format2) {
      if (str.length === 0) {
        return str;
      }
      var string = str;
      if (typeof str === "symbol") {
        string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== "string") {
        string = String(str);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      var out = "";
      for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);
        if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format2 === formats.RFC1738 && (c === 40 || c === 41)) {
          out += string.charAt(i);
          continue;
        }
        if (c < 128) {
          out = out + hexTable[c];
          continue;
        }
        if (c < 2048) {
          out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
          continue;
        }
        if (c < 55296 || c >= 57344) {
          out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
          continue;
        }
        i += 1;
        c = 65536 + ((c & 1023) << 10 | string.charCodeAt(i) & 1023);
        out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
      }
      return out;
    };
    var compact = function compact2(value) {
      var queue = [{obj: {o: value}, prop: "o"}];
      var refs = [];
      for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];
        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
          var key = keys[j];
          var val = obj[key];
          if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
            queue.push({obj, prop: key});
            refs.push(val);
          }
        }
      }
      compactQueue(queue);
      return value;
    };
    var isRegExp = function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    };
    var isBuffer = function isBuffer2(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };
    var combine = function combine2(a, b) {
      return [].concat(a, b);
    };
    var maybeMap = function maybeMap2(val, fn) {
      if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
          mapped.push(fn(val[i]));
        }
        return mapped;
      }
      return fn(val);
    };
    module2.exports = {
      arrayToObject,
      assign: assign2,
      combine,
      compact,
      decode,
      encode,
      isBuffer,
      isRegExp,
      maybeMap,
      merge
    };
  }
});

// node_modules/qs/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/qs/lib/stringify.js"(exports, module2) {
    "use strict";
    var getSideChannel = require_side_channel();
    var utils = require_utils();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
        return prefix + "[]";
      },
      comma: "comma",
      indices: function indices(prefix, key) {
        return prefix + "[" + key + "]";
      },
      repeat: function repeat(prefix) {
        return prefix;
      }
    };
    var isArray = Array.isArray;
    var push = Array.prototype.push;
    var pushToArray = function(arr, valueOrArray) {
      push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
    };
    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats["default"];
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      charset: "utf-8",
      charsetSentinel: false,
      delimiter: "&",
      encode: true,
      encoder: utils.encode,
      encodeValuesOnly: false,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      indices: false,
      serializeDate: function serializeDate(date) {
        return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
    };
    var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
      return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
    };
    var stringify = function stringify2(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format2, formatter, encodeValuesOnly, charset, sideChannel) {
      var obj = object;
      if (sideChannel.has(object)) {
        throw new RangeError("Cyclic object value");
      }
      if (typeof filter === "function") {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && isArray(obj)) {
        obj = utils.maybeMap(obj, function(value2) {
          if (value2 instanceof Date) {
            return serializeDate(value2);
          }
          return value2;
        });
      }
      if (obj === null) {
        if (strictNullHandling) {
          return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format2) : prefix;
        }
        obj = "";
      }
      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
          var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format2);
          return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value", format2))];
        }
        return [formatter(prefix) + "=" + formatter(String(obj))];
      }
      var values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      var objKeys;
      if (generateArrayPrefix === "comma" && isArray(obj)) {
        objKeys = [{value: obj.length > 0 ? obj.join(",") || null : void 0}];
      } else if (isArray(filter)) {
        objKeys = filter;
      } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
      }
      for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        var value = typeof key === "object" && key.value !== void 0 ? key.value : obj[key];
        if (skipNulls && value === null) {
          continue;
        }
        var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(prefix, key) : prefix : prefix + (allowDots ? "." + key : "[" + key + "]");
        sideChannel.set(object, true);
        var valueSideChannel = getSideChannel();
        pushToArray(values, stringify2(value, keyPrefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format2, formatter, encodeValuesOnly, charset, valueSideChannel));
      }
      return values;
    };
    var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.encoder !== null && opts.encoder !== void 0 && typeof opts.encoder !== "function") {
        throw new TypeError("Encoder has to be a function.");
      }
      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var format2 = formats["default"];
      if (typeof opts.format !== "undefined") {
        if (!has.call(formats.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format2 = opts.format;
      }
      var formatter = formats.formatters[format2];
      var filter = defaults.filter;
      if (typeof opts.filter === "function" || isArray(opts.filter)) {
        filter = opts.filter;
      }
      return {
        addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter,
        format: format2,
        formatter,
        serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module2.exports = function(object, opts) {
      var obj = object;
      var options2 = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;
      if (typeof options2.filter === "function") {
        filter = options2.filter;
        obj = filter("", obj);
      } else if (isArray(options2.filter)) {
        filter = options2.filter;
        objKeys = filter;
      }
      var keys = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      var arrayFormat;
      if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if (opts && "indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = "indices";
      }
      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      if (options2.sort) {
        objKeys.sort(options2.sort);
      }
      var sideChannel = getSideChannel();
      for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        if (options2.skipNulls && obj[key] === null) {
          continue;
        }
        pushToArray(keys, stringify(obj[key], key, generateArrayPrefix, options2.strictNullHandling, options2.skipNulls, options2.encode ? options2.encoder : null, options2.filter, options2.sort, options2.allowDots, options2.serializeDate, options2.format, options2.formatter, options2.encodeValuesOnly, options2.charset, sideChannel));
      }
      var joined = keys.join(options2.delimiter);
      var prefix = options2.addQueryPrefix === true ? "?" : "";
      if (options2.charsetSentinel) {
        if (options2.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B&";
        } else {
          prefix += "utf8=%E2%9C%93&";
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    };
  }
});

// node_modules/qs/lib/parse.js
var require_parse = __commonJS({
  "node_modules/qs/lib/parse.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var defaults = {
      allowDots: false,
      allowPrototypes: false,
      allowSparse: false,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: false,
      comma: false,
      decoder: utils.decode,
      delimiter: "&",
      depth: 5,
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1e3,
      parseArrays: true,
      plainObjects: false,
      strictNullHandling: false
    };
    var interpretNumericEntities = function(str) {
      return str.replace(/&#(\d+);/g, function($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    };
    var parseArrayValue = function(val, options2) {
      if (val && typeof val === "string" && options2.comma && val.indexOf(",") > -1) {
        return val.split(",");
      }
      return val;
    };
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = function parseQueryStringValues(str, options2) {
      var obj = {};
      var cleanStr = options2.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
      var limit = options2.parameterLimit === Infinity ? void 0 : options2.parameterLimit;
      var parts = cleanStr.split(options2.delimiter, limit);
      var skipIndex = -1;
      var i;
      var charset = options2.charset;
      if (options2.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
          if (parts[i].indexOf("utf8=") === 0) {
            if (parts[i] === charsetSentinel) {
              charset = "utf-8";
            } else if (parts[i] === isoSentinel) {
              charset = "iso-8859-1";
            }
            skipIndex = i;
            i = parts.length;
          }
        }
      }
      for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
          continue;
        }
        var part = parts[i];
        var bracketEqualsPos = part.indexOf("]=");
        var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
        var key, val;
        if (pos === -1) {
          key = options2.decoder(part, defaults.decoder, charset, "key");
          val = options2.strictNullHandling ? null : "";
        } else {
          key = options2.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
          val = utils.maybeMap(parseArrayValue(part.slice(pos + 1), options2), function(encodedVal) {
            return options2.decoder(encodedVal, defaults.decoder, charset, "value");
          });
        }
        if (val && options2.interpretNumericEntities && charset === "iso-8859-1") {
          val = interpretNumericEntities(val);
        }
        if (part.indexOf("[]=") > -1) {
          val = isArray(val) ? [val] : val;
        }
        if (has.call(obj, key)) {
          obj[key] = utils.combine(obj[key], val);
        } else {
          obj[key] = val;
        }
      }
      return obj;
    };
    var parseObject = function(chain, val, options2, valuesParsed) {
      var leaf = valuesParsed ? val : parseArrayValue(val, options2);
      for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];
        if (root === "[]" && options2.parseArrays) {
          obj = [].concat(leaf);
        } else {
          obj = options2.plainObjects ? Object.create(null) : {};
          var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
          var index2 = parseInt(cleanRoot, 10);
          if (!options2.parseArrays && cleanRoot === "") {
            obj = {0: leaf};
          } else if (!isNaN(index2) && root !== cleanRoot && String(index2) === cleanRoot && index2 >= 0 && (options2.parseArrays && index2 <= options2.arrayLimit)) {
            obj = [];
            obj[index2] = leaf;
          } else {
            obj[cleanRoot] = leaf;
          }
        }
        leaf = obj;
      }
      return leaf;
    };
    var parseKeys = function parseQueryStringKeys(givenKey, val, options2, valuesParsed) {
      if (!givenKey) {
        return;
      }
      var key = options2.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;
      var segment = options2.depth > 0 && brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;
      var keys = [];
      if (parent) {
        if (!options2.plainObjects && has.call(Object.prototype, parent)) {
          if (!options2.allowPrototypes) {
            return;
          }
        }
        keys.push(parent);
      }
      var i = 0;
      while (options2.depth > 0 && (segment = child.exec(key)) !== null && i < options2.depth) {
        i += 1;
        if (!options2.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
          if (!options2.allowPrototypes) {
            return;
          }
        }
        keys.push(segment[1]);
      }
      if (segment) {
        keys.push("[" + key.slice(segment.index) + "]");
      }
      return parseObject(keys, val, options2, valuesParsed);
    };
    var normalizeParseOptions = function normalizeParseOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
        throw new TypeError("Decoder has to be a function.");
      }
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
      return {
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module2.exports = function(str, opts) {
      var options2 = normalizeParseOptions(opts);
      if (str === "" || str === null || typeof str === "undefined") {
        return options2.plainObjects ? Object.create(null) : {};
      }
      var tempObj = typeof str === "string" ? parseValues(str, options2) : str;
      var obj = options2.plainObjects ? Object.create(null) : {};
      var keys = Object.keys(tempObj);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options2, typeof str === "string");
        obj = utils.merge(obj, newObj, options2);
      }
      if (options2.allowSparse === true) {
        return obj;
      }
      return utils.compact(obj);
    };
  }
});

// node_modules/qs/lib/index.js
var require_lib = __commonJS({
  "node_modules/qs/lib/index.js"(exports, module2) {
    "use strict";
    var stringify = require_stringify();
    var parse = require_parse();
    var formats = require_formats();
    module2.exports = {
      formats,
      parse,
      stringify
    };
  }
});

// node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/axios/lib/helpers/bind.js"(exports, module2) {
    "use strict";
    module2.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// node_modules/axios/lib/utils.js
var require_utils2 = __commonJS({
  "node_modules/axios/lib/utils.js"(exports, module2) {
    "use strict";
    var bind = require_bind();
    var toString = Object.prototype.toString;
    function isArray(val) {
      return toString.call(val) === "[object Array]";
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    function isArrayBuffer(val) {
      return toString.call(val) === "[object ArrayBuffer]";
    }
    function isFormData2(val) {
      return typeof FormData !== "undefined" && val instanceof FormData;
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer;
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (toString.call(val) !== "[object Object]") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    function isDate(val) {
      return toString.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString.call(val) === "[object File]";
    }
    function isBlob2(val) {
      return toString.call(val) === "[object Blob]";
    }
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isURLSearchParams(val) {
      return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
    }
    function trim(str) {
      return str.replace(/^\s*/, "").replace(/\s*$/, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    module2.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData: isFormData2,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob: isBlob2,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM
    };
  }
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/axios/lib/helpers/buildURL.js"(exports, module2) {
    "use strict";
    var utils = require_utils2();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module2.exports = function buildURL(url2, params, paramsSerializer) {
      if (!params) {
        return url2;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url2.indexOf("#");
        if (hashmarkIndex !== -1) {
          url2 = url2.slice(0, hashmarkIndex);
        }
        url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url2;
    };
  }
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/axios/lib/core/InterceptorManager.js"(exports, module2) {
    "use strict";
    var utils = require_utils2();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected) {
      this.handlers.push({
        fulfilled,
        rejected
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module2.exports = InterceptorManager;
  }
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/axios/lib/core/transformData.js"(exports, module2) {
    "use strict";
    var utils = require_utils2();
    module2.exports = function transformData(data, headers, fns) {
      utils.forEach(fns, function transform(fn) {
        data = fn(data, headers);
      });
      return data;
    };
  }
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/axios/lib/cancel/isCancel.js"(exports, module2) {
    "use strict";
    module2.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module2) {
    "use strict";
    var utils = require_utils2();
    module2.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  }
});

// node_modules/axios/lib/core/enhanceError.js
var require_enhanceError = __commonJS({
  "node_modules/axios/lib/core/enhanceError.js"(exports, module2) {
    "use strict";
    module2.exports = function enhanceError(error3, config, code, request, response) {
      error3.config = config;
      if (code) {
        error3.code = code;
      }
      error3.request = request;
      error3.response = response;
      error3.isAxiosError = true;
      error3.toJSON = function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code
        };
      };
      return error3;
    };
  }
});

// node_modules/axios/lib/core/createError.js
var require_createError = __commonJS({
  "node_modules/axios/lib/core/createError.js"(exports, module2) {
    "use strict";
    var enhanceError = require_enhanceError();
    module2.exports = function createError(message, config, code, request, response) {
      var error3 = new Error(message);
      return enhanceError(error3, config, code, request, response);
    };
  }
});

// node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/axios/lib/core/settle.js"(exports, module2) {
    "use strict";
    var createError = require_createError();
    module2.exports = function settle(resolve2, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve2(response);
      } else {
        reject(createError("Request failed with status code " + response.status, response.config, null, response.request, response));
      }
    };
  }
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/axios/lib/helpers/cookies.js"(exports, module2) {
    "use strict";
    var utils = require_utils2();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read2(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read2() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  }
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module2) {
    "use strict";
    module2.exports = function isAbsoluteURL(url2) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url2);
    };
  }
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/axios/lib/helpers/combineURLs.js"(exports, module2) {
    "use strict";
    module2.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/axios/lib/core/buildFullPath.js"(exports, module2) {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module2.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/axios/lib/helpers/parseHeaders.js"(exports, module2) {
    "use strict";
    var utils = require_utils2();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module2.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module2) {
    "use strict";
    var utils = require_utils2();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url2) {
        var href = url2;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/axios/lib/adapters/xhr.js"(exports, module2) {
    "use strict";
    var utils = require_utils2();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var createError = require_createError();
    module2.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve2, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        if (utils.isFormData(requestData)) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !config.responseType || config.responseType === "text" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(resolve2, reject, response);
          request = null;
        };
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(createError("Request aborted", config, "ECONNABORTED", request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(createError("Network Error", config, null, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError(timeoutErrorMessage, config, "ECONNABORTED", request));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (config.responseType) {
          try {
            request.responseType = config.responseType;
          } catch (e) {
            if (config.responseType !== "json") {
              throw e;
            }
          }
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken) {
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (!request) {
              return;
            }
            request.abort();
            reject(cancel);
            request = null;
          });
        }
        if (!requestData) {
          requestData = null;
        }
        request.send(requestData);
      });
    };
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module2) {
    var s2 = 1e3;
    var m = s2 * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options2) {
      options2 = options2 || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options2.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s2;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s2) {
        return Math.round(ms / s2) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s2) {
        return plural(ms, msAbs, s2, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash2 = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash2 = (hash2 << 5) - hash2 + namespace.charCodeAt(i);
          hash2 |= 0;
        }
        return createDebug.colors[Math.abs(hash2) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index2 = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format2) => {
            if (match === "%%") {
              return "%";
            }
            index2++;
            const formatter = createDebug.formatters[format2];
            if (typeof formatter === "function") {
              const val = args[index2];
              match = formatter.call(self2, val);
              args.splice(index2, 1);
              index2--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module2) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load2;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index2 = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index2++;
        if (match === "%c") {
          lastC = index2;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error3) {
      }
    }
    function load2() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error3) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error3) {
      }
    }
    module2.exports = require_common()(exports);
    var {formatters} = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error3) {
        return "[UnexpectedJSONParseError]: " + error3.message;
      }
    };
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports, module2) {
    "use strict";
    module2.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports, module2) {
    "use strict";
    var os = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag();
    var {env} = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports, module2) {
    var tty = require("tty");
    var util = require("util");
    exports.init = init2;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load2;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(() => {
    }, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error3) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_2, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const {namespace: name, useColors: useColors2} = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} [0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return new Date().toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load2() {
      return process.env.DEBUG;
    }
    function init2(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports);
    var {formatters} = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src2 = __commonJS({
  "node_modules/debug/src/index.js"(exports, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/follow-redirects/debug.js
var require_debug = __commonJS({
  "node_modules/follow-redirects/debug.js"(exports, module2) {
    var debug;
    module2.exports = function() {
      if (!debug) {
        try {
          debug = require_src2()("follow-redirects");
        } catch (error3) {
          debug = function() {
          };
        }
      }
      debug.apply(null, arguments);
    };
  }
});

// node_modules/follow-redirects/index.js
var require_follow_redirects = __commonJS({
  "node_modules/follow-redirects/index.js"(exports, module2) {
    var url2 = require("url");
    var URL2 = url2.URL;
    var http2 = require("http");
    var https2 = require("https");
    var Writable = require("stream").Writable;
    var assert = require("assert");
    var debug = require_debug();
    var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
    var eventHandlers = Object.create(null);
    events.forEach(function(event) {
      eventHandlers[event] = function(arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
      };
    });
    var RedirectionError = createErrorType("ERR_FR_REDIRECTION_FAILURE", "");
    var TooManyRedirectsError = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded");
    var MaxBodyLengthExceededError = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit");
    var WriteAfterEndError = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    function RedirectableRequest(options2, responseCallback) {
      Writable.call(this);
      this._sanitizeOptions(options2);
      this._options = options2;
      this._ended = false;
      this._ending = false;
      this._redirectCount = 0;
      this._redirects = [];
      this._requestBodyLength = 0;
      this._requestBodyBuffers = [];
      if (responseCallback) {
        this.on("response", responseCallback);
      }
      var self2 = this;
      this._onNativeResponse = function(response) {
        self2._processResponse(response);
      };
      this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(Writable.prototype);
    RedirectableRequest.prototype.abort = function() {
      abortRequest(this._currentRequest);
      this.emit("abort");
    };
    RedirectableRequest.prototype.write = function(data, encoding, callback) {
      if (this._ending) {
        throw new WriteAfterEndError();
      }
      if (!(typeof data === "string" || typeof data === "object" && "length" in data)) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
      }
      if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
      }
      if (data.length === 0) {
        if (callback) {
          callback();
        }
        return;
      }
      if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({data, encoding});
        this._currentRequest.write(data, encoding, callback);
      } else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
      }
    };
    RedirectableRequest.prototype.end = function(data, encoding, callback) {
      if (typeof data === "function") {
        callback = data;
        data = encoding = null;
      } else if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
      }
      if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
      } else {
        var self2 = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function() {
          self2._ended = true;
          currentRequest.end(null, null, callback);
        });
        this._ending = true;
      }
    };
    RedirectableRequest.prototype.setHeader = function(name, value) {
      this._options.headers[name] = value;
      this._currentRequest.setHeader(name, value);
    };
    RedirectableRequest.prototype.removeHeader = function(name) {
      delete this._options.headers[name];
      this._currentRequest.removeHeader(name);
    };
    RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
      var self2 = this;
      if (callback) {
        this.on("timeout", callback);
      }
      function destroyOnTimeout(socket) {
        socket.setTimeout(msecs);
        socket.removeListener("timeout", socket.destroy);
        socket.addListener("timeout", socket.destroy);
      }
      function startTimer(socket) {
        if (self2._timeout) {
          clearTimeout(self2._timeout);
        }
        self2._timeout = setTimeout(function() {
          self2.emit("timeout");
          clearTimer();
        }, msecs);
        destroyOnTimeout(socket);
      }
      function clearTimer() {
        clearTimeout(this._timeout);
        if (callback) {
          self2.removeListener("timeout", callback);
        }
        if (!this.socket) {
          self2._currentRequest.removeListener("socket", startTimer);
        }
      }
      if (this.socket) {
        startTimer(this.socket);
      } else {
        this._currentRequest.once("socket", startTimer);
      }
      this.on("socket", destroyOnTimeout);
      this.once("response", clearTimer);
      this.once("error", clearTimer);
      return this;
    };
    [
      "flushHeaders",
      "getHeader",
      "setNoDelay",
      "setSocketKeepAlive"
    ].forEach(function(method) {
      RedirectableRequest.prototype[method] = function(a, b) {
        return this._currentRequest[method](a, b);
      };
    });
    ["aborted", "connection", "socket"].forEach(function(property) {
      Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function() {
          return this._currentRequest[property];
        }
      });
    });
    RedirectableRequest.prototype._sanitizeOptions = function(options2) {
      if (!options2.headers) {
        options2.headers = {};
      }
      if (options2.host) {
        if (!options2.hostname) {
          options2.hostname = options2.host;
        }
        delete options2.host;
      }
      if (!options2.pathname && options2.path) {
        var searchPos = options2.path.indexOf("?");
        if (searchPos < 0) {
          options2.pathname = options2.path;
        } else {
          options2.pathname = options2.path.substring(0, searchPos);
          options2.search = options2.path.substring(searchPos);
        }
      }
    };
    RedirectableRequest.prototype._performRequest = function() {
      var protocol = this._options.protocol;
      var nativeProtocol = this._options.nativeProtocols[protocol];
      if (!nativeProtocol) {
        this.emit("error", new TypeError("Unsupported protocol " + protocol));
        return;
      }
      if (this._options.agents) {
        var scheme = protocol.substr(0, protocol.length - 1);
        this._options.agent = this._options.agents[scheme];
      }
      var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
      this._currentUrl = url2.format(this._options);
      request._redirectable = this;
      for (var e = 0; e < events.length; e++) {
        request.on(events[e], eventHandlers[events[e]]);
      }
      if (this._isRedirect) {
        var i = 0;
        var self2 = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error3) {
          if (request === self2._currentRequest) {
            if (error3) {
              self2.emit("error", error3);
            } else if (i < buffers.length) {
              var buffer = buffers[i++];
              if (!request.finished) {
                request.write(buffer.data, buffer.encoding, writeNext);
              }
            } else if (self2._ended) {
              request.end();
            }
          }
        })();
      }
    };
    RedirectableRequest.prototype._processResponse = function(response) {
      var statusCode = response.statusCode;
      if (this._options.trackRedirects) {
        this._redirects.push({
          url: this._currentUrl,
          headers: response.headers,
          statusCode
        });
      }
      var location = response.headers.location;
      if (location && this._options.followRedirects !== false && statusCode >= 300 && statusCode < 400) {
        abortRequest(this._currentRequest);
        response.destroy();
        if (++this._redirectCount > this._options.maxRedirects) {
          this.emit("error", new TooManyRedirectsError());
          return;
        }
        if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
          this._options.method = "GET";
          this._requestBodyBuffers = [];
          removeMatchingHeaders(/^content-/i, this._options.headers);
        }
        var previousHostName = removeMatchingHeaders(/^host$/i, this._options.headers) || url2.parse(this._currentUrl).hostname;
        var redirectUrl = url2.resolve(this._currentUrl, location);
        debug("redirecting to", redirectUrl);
        this._isRedirect = true;
        var redirectUrlParts = url2.parse(redirectUrl);
        Object.assign(this._options, redirectUrlParts);
        if (redirectUrlParts.hostname !== previousHostName) {
          removeMatchingHeaders(/^authorization$/i, this._options.headers);
        }
        if (typeof this._options.beforeRedirect === "function") {
          var responseDetails = {headers: response.headers};
          try {
            this._options.beforeRedirect.call(null, this._options, responseDetails);
          } catch (err) {
            this.emit("error", err);
            return;
          }
          this._sanitizeOptions(this._options);
        }
        try {
          this._performRequest();
        } catch (cause) {
          var error3 = new RedirectionError("Redirected request failed: " + cause.message);
          error3.cause = cause;
          this.emit("error", error3);
        }
      } else {
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit("response", response);
        this._requestBodyBuffers = [];
      }
    };
    function wrap(protocols) {
      var exports2 = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024
      };
      var nativeProtocols = {};
      Object.keys(protocols).forEach(function(scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports2[scheme] = Object.create(nativeProtocol);
        function request(input, options2, callback) {
          if (typeof input === "string") {
            var urlStr = input;
            try {
              input = urlToOptions(new URL2(urlStr));
            } catch (err) {
              input = url2.parse(urlStr);
            }
          } else if (URL2 && input instanceof URL2) {
            input = urlToOptions(input);
          } else {
            callback = options2;
            options2 = input;
            input = {protocol};
          }
          if (typeof options2 === "function") {
            callback = options2;
            options2 = null;
          }
          options2 = Object.assign({
            maxRedirects: exports2.maxRedirects,
            maxBodyLength: exports2.maxBodyLength
          }, input, options2);
          options2.nativeProtocols = nativeProtocols;
          assert.equal(options2.protocol, protocol, "protocol mismatch");
          debug("options", options2);
          return new RedirectableRequest(options2, callback);
        }
        function get(input, options2, callback) {
          var wrappedRequest = wrappedProtocol.request(input, options2, callback);
          wrappedRequest.end();
          return wrappedRequest;
        }
        Object.defineProperties(wrappedProtocol, {
          request: {value: request, configurable: true, enumerable: true, writable: true},
          get: {value: get, configurable: true, enumerable: true, writable: true}
        });
      });
      return exports2;
    }
    function noop3() {
    }
    function urlToOptions(urlObject) {
      var options2 = {
        protocol: urlObject.protocol,
        hostname: urlObject.hostname.startsWith("[") ? urlObject.hostname.slice(1, -1) : urlObject.hostname,
        hash: urlObject.hash,
        search: urlObject.search,
        pathname: urlObject.pathname,
        path: urlObject.pathname + urlObject.search,
        href: urlObject.href
      };
      if (urlObject.port !== "") {
        options2.port = Number(urlObject.port);
      }
      return options2;
    }
    function removeMatchingHeaders(regex, headers) {
      var lastValue;
      for (var header in headers) {
        if (regex.test(header)) {
          lastValue = headers[header];
          delete headers[header];
        }
      }
      return lastValue;
    }
    function createErrorType(code, defaultMessage) {
      function CustomError(message) {
        Error.captureStackTrace(this, this.constructor);
        this.message = message || defaultMessage;
      }
      CustomError.prototype = new Error();
      CustomError.prototype.constructor = CustomError;
      CustomError.prototype.name = "Error [" + code + "]";
      CustomError.prototype.code = code;
      return CustomError;
    }
    function abortRequest(request) {
      for (var e = 0; e < events.length; e++) {
        request.removeListener(events[e], eventHandlers[events[e]]);
      }
      request.on("error", noop3);
      request.abort();
    }
    module2.exports = wrap({http: http2, https: https2});
    module2.exports.wrap = wrap;
  }
});

// node_modules/axios/package.json
var require_package = __commonJS({
  "node_modules/axios/package.json"(exports, module2) {
    module2.exports = {
      name: "axios",
      version: "0.21.1",
      description: "Promise based HTTP client for the browser and node.js",
      main: "index.js",
      scripts: {
        test: "grunt test && bundlesize",
        start: "node ./sandbox/server.js",
        build: "NODE_ENV=production grunt build",
        preversion: "npm test",
        version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
        postversion: "git push && git push --tags",
        examples: "node ./examples/server.js",
        coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
        fix: "eslint --fix lib/**/*.js"
      },
      repository: {
        type: "git",
        url: "https://github.com/axios/axios.git"
      },
      keywords: [
        "xhr",
        "http",
        "ajax",
        "promise",
        "node"
      ],
      author: "Matt Zabriskie",
      license: "MIT",
      bugs: {
        url: "https://github.com/axios/axios/issues"
      },
      homepage: "https://github.com/axios/axios",
      devDependencies: {
        bundlesize: "^0.17.0",
        coveralls: "^3.0.0",
        "es6-promise": "^4.2.4",
        grunt: "^1.0.2",
        "grunt-banner": "^0.6.0",
        "grunt-cli": "^1.2.0",
        "grunt-contrib-clean": "^1.1.0",
        "grunt-contrib-watch": "^1.0.0",
        "grunt-eslint": "^20.1.0",
        "grunt-karma": "^2.0.0",
        "grunt-mocha-test": "^0.13.3",
        "grunt-ts": "^6.0.0-beta.19",
        "grunt-webpack": "^1.0.18",
        "istanbul-instrumenter-loader": "^1.0.0",
        "jasmine-core": "^2.4.1",
        karma: "^1.3.0",
        "karma-chrome-launcher": "^2.2.0",
        "karma-coverage": "^1.1.1",
        "karma-firefox-launcher": "^1.1.0",
        "karma-jasmine": "^1.1.1",
        "karma-jasmine-ajax": "^0.1.13",
        "karma-opera-launcher": "^1.0.0",
        "karma-safari-launcher": "^1.0.0",
        "karma-sauce-launcher": "^1.2.0",
        "karma-sinon": "^1.0.5",
        "karma-sourcemap-loader": "^0.3.7",
        "karma-webpack": "^1.7.0",
        "load-grunt-tasks": "^3.5.2",
        minimist: "^1.2.0",
        mocha: "^5.2.0",
        sinon: "^4.5.0",
        typescript: "^2.8.1",
        "url-search-params": "^0.10.0",
        webpack: "^1.13.1",
        "webpack-dev-server": "^1.14.1"
      },
      browser: {
        "./lib/adapters/http.js": "./lib/adapters/xhr.js"
      },
      jsdelivr: "dist/axios.min.js",
      unpkg: "dist/axios.min.js",
      typings: "./index.d.ts",
      dependencies: {
        "follow-redirects": "^1.10.0"
      },
      bundlesize: [
        {
          path: "./dist/axios.min.js",
          threshold: "5kB"
        }
      ]
    };
  }
});

// node_modules/axios/lib/adapters/http.js
var require_http = __commonJS({
  "node_modules/axios/lib/adapters/http.js"(exports, module2) {
    "use strict";
    var utils = require_utils2();
    var settle = require_settle();
    var buildFullPath = require_buildFullPath();
    var buildURL = require_buildURL();
    var http2 = require("http");
    var https2 = require("https");
    var httpFollow = require_follow_redirects().http;
    var httpsFollow = require_follow_redirects().https;
    var url2 = require("url");
    var zlib2 = require("zlib");
    var pkg = require_package();
    var createError = require_createError();
    var enhanceError = require_enhanceError();
    var isHttps = /https:?/;
    function setProxy(options2, proxy, location) {
      options2.hostname = proxy.host;
      options2.host = proxy.host;
      options2.port = proxy.port;
      options2.path = location;
      if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ":" + proxy.auth.password, "utf8").toString("base64");
        options2.headers["Proxy-Authorization"] = "Basic " + base64;
      }
      options2.beforeRedirect = function beforeRedirect(redirection) {
        redirection.headers.host = redirection.host;
        setProxy(redirection, proxy, redirection.href);
      };
    }
    module2.exports = function httpAdapter(config) {
      return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
        var resolve2 = function resolve3(value) {
          resolvePromise(value);
        };
        var reject = function reject2(value) {
          rejectPromise(value);
        };
        var data = config.data;
        var headers = config.headers;
        if (!headers["User-Agent"] && !headers["user-agent"]) {
          headers["User-Agent"] = "axios/" + pkg.version;
        }
        if (data && !utils.isStream(data)) {
          if (Buffer.isBuffer(data)) {
          } else if (utils.isArrayBuffer(data)) {
            data = Buffer.from(new Uint8Array(data));
          } else if (utils.isString(data)) {
            data = Buffer.from(data, "utf-8");
          } else {
            return reject(createError("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", config));
          }
          headers["Content-Length"] = data.length;
        }
        var auth = void 0;
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password || "";
          auth = username + ":" + password;
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        var parsed = url2.parse(fullPath);
        var protocol = parsed.protocol || "http:";
        if (!auth && parsed.auth) {
          var urlAuth = parsed.auth.split(":");
          var urlUsername = urlAuth[0] || "";
          var urlPassword = urlAuth[1] || "";
          auth = urlUsername + ":" + urlPassword;
        }
        if (auth) {
          delete headers.Authorization;
        }
        var isHttpsRequest = isHttps.test(protocol);
        var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
        var options2 = {
          path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ""),
          method: config.method.toUpperCase(),
          headers,
          agent,
          agents: {http: config.httpAgent, https: config.httpsAgent},
          auth
        };
        if (config.socketPath) {
          options2.socketPath = config.socketPath;
        } else {
          options2.hostname = parsed.hostname;
          options2.port = parsed.port;
        }
        var proxy = config.proxy;
        if (!proxy && proxy !== false) {
          var proxyEnv = protocol.slice(0, -1) + "_proxy";
          var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
          if (proxyUrl) {
            var parsedProxyUrl = url2.parse(proxyUrl);
            var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
            var shouldProxy = true;
            if (noProxyEnv) {
              var noProxy = noProxyEnv.split(",").map(function trim(s2) {
                return s2.trim();
              });
              shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
                if (!proxyElement) {
                  return false;
                }
                if (proxyElement === "*") {
                  return true;
                }
                if (proxyElement[0] === "." && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                  return true;
                }
                return parsed.hostname === proxyElement;
              });
            }
            if (shouldProxy) {
              proxy = {
                host: parsedProxyUrl.hostname,
                port: parsedProxyUrl.port,
                protocol: parsedProxyUrl.protocol
              };
              if (parsedProxyUrl.auth) {
                var proxyUrlAuth = parsedProxyUrl.auth.split(":");
                proxy.auth = {
                  username: proxyUrlAuth[0],
                  password: proxyUrlAuth[1]
                };
              }
            }
          }
        }
        if (proxy) {
          options2.headers.host = parsed.hostname + (parsed.port ? ":" + parsed.port : "");
          setProxy(options2, proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options2.path);
        }
        var transport;
        var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
        if (config.transport) {
          transport = config.transport;
        } else if (config.maxRedirects === 0) {
          transport = isHttpsProxy ? https2 : http2;
        } else {
          if (config.maxRedirects) {
            options2.maxRedirects = config.maxRedirects;
          }
          transport = isHttpsProxy ? httpsFollow : httpFollow;
        }
        if (config.maxBodyLength > -1) {
          options2.maxBodyLength = config.maxBodyLength;
        }
        var req = transport.request(options2, function handleResponse(res) {
          if (req.aborted)
            return;
          var stream = res;
          var lastRequest = res.req || req;
          if (res.statusCode !== 204 && lastRequest.method !== "HEAD" && config.decompress !== false) {
            switch (res.headers["content-encoding"]) {
              case "gzip":
              case "compress":
              case "deflate":
                stream = stream.pipe(zlib2.createUnzip());
                delete res.headers["content-encoding"];
                break;
            }
          }
          var response = {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            config,
            request: lastRequest
          };
          if (config.responseType === "stream") {
            response.data = stream;
            settle(resolve2, reject, response);
          } else {
            var responseBuffer = [];
            stream.on("data", function handleStreamData(chunk) {
              responseBuffer.push(chunk);
              if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
                stream.destroy();
                reject(createError("maxContentLength size of " + config.maxContentLength + " exceeded", config, null, lastRequest));
              }
            });
            stream.on("error", function handleStreamError(err) {
              if (req.aborted)
                return;
              reject(enhanceError(err, config, null, lastRequest));
            });
            stream.on("end", function handleStreamEnd() {
              var responseData = Buffer.concat(responseBuffer);
              if (config.responseType !== "arraybuffer") {
                responseData = responseData.toString(config.responseEncoding);
                if (!config.responseEncoding || config.responseEncoding === "utf8") {
                  responseData = utils.stripBOM(responseData);
                }
              }
              response.data = responseData;
              settle(resolve2, reject, response);
            });
          }
        });
        req.on("error", function handleRequestError(err) {
          if (req.aborted && err.code !== "ERR_FR_TOO_MANY_REDIRECTS")
            return;
          reject(enhanceError(err, config, null, req));
        });
        if (config.timeout) {
          req.setTimeout(config.timeout, function handleRequestTimeout() {
            req.abort();
            reject(createError("timeout of " + config.timeout + "ms exceeded", config, "ECONNABORTED", req));
          });
        }
        if (config.cancelToken) {
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (req.aborted)
              return;
            req.abort();
            reject(cancel);
          });
        }
        if (utils.isStream(data)) {
          data.on("error", function handleStreamError(err) {
            reject(enhanceError(err, config, null, req));
          }).pipe(req);
        } else {
          req.end(data);
        }
      });
    };
  }
});

// node_modules/axios/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/axios/lib/defaults.js"(exports, module2) {
    "use strict";
    var utils = require_utils2();
    var normalizeHeaderName = require_normalizeHeaderName();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_http();
      }
      return adapter;
    }
    var defaults = {
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        if (utils.isObject(data)) {
          setContentTypeIfUnset(headers, "application/json;charset=utf-8");
          return JSON.stringify(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        if (typeof data === "string") {
          try {
            data = JSON.parse(data);
          } catch (e) {
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      }
    };
    defaults.headers = {
      common: {
        "Accept": "application/json, text/plain, */*"
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module2.exports = defaults;
  }
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/axios/lib/core/dispatchRequest.js"(exports, module2) {
    "use strict";
    var utils = require_utils2();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
    }
    module2.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData(config.data, config.headers, config.transformRequest);
      config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
      utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
        delete config.headers[method];
      });
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData(response.data, response.headers, config.transformResponse);
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/axios/lib/core/mergeConfig.js"(exports, module2) {
    "use strict";
    var utils = require_utils2();
    module2.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      var valueFromConfig2Keys = ["url", "method", "data"];
      var mergeDeepPropertiesKeys = ["headers", "auth", "proxy", "params"];
      var defaultToConfig2Keys = [
        "baseURL",
        "transformRequest",
        "transformResponse",
        "paramsSerializer",
        "timeout",
        "timeoutMessage",
        "withCredentials",
        "adapter",
        "responseType",
        "xsrfCookieName",
        "xsrfHeaderName",
        "onUploadProgress",
        "onDownloadProgress",
        "decompress",
        "maxContentLength",
        "maxBodyLength",
        "maxRedirects",
        "transport",
        "httpAgent",
        "httpsAgent",
        "cancelToken",
        "socketPath",
        "responseEncoding"
      ];
      var directMergeKeys = ["validateStatus"];
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      }
      utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(void 0, config2[prop]);
        }
      });
      utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
      utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      });
      utils.forEach(directMergeKeys, function merge(prop) {
        if (prop in config2) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      });
      var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
      var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
        return axiosKeys.indexOf(key) === -1;
      });
      utils.forEach(otherKeys, mergeDeepProperties);
      return config;
    };
  }
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/axios/lib/core/Axios.js"(exports, module2) {
    "use strict";
    var utils = require_utils2();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(config) {
      if (typeof config === "string") {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var chain = [dispatchRequest, void 0];
      var promise = Promise.resolve(config);
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url2, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url: url2,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      Axios.prototype[method] = function(url2, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url: url2,
          data
        }));
      };
    });
    module2.exports = Axios;
  }
});

// node_modules/axios/lib/cancel/Cancel.js
var require_Cancel = __commonJS({
  "node_modules/axios/lib/cancel/Cancel.js"(exports, module2) {
    "use strict";
    function Cancel(message) {
      this.message = message;
    }
    Cancel.prototype.toString = function toString() {
      return "Cancel" + (this.message ? ": " + this.message : "");
    };
    Cancel.prototype.__CANCEL__ = true;
    module2.exports = Cancel;
  }
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/axios/lib/cancel/CancelToken.js"(exports, module2) {
    "use strict";
    var Cancel = require_Cancel();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve2) {
        resolvePromise = resolve2;
      });
      var token = this;
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module2.exports = CancelToken;
  }
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/axios/lib/helpers/spread.js"(exports, module2) {
    "use strict";
    module2.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/axios/lib/helpers/isAxiosError.js"(exports, module2) {
    "use strict";
    module2.exports = function isAxiosError(payload) {
      return typeof payload === "object" && payload.isAxiosError === true;
    };
  }
});

// node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/axios/lib/axios.js"(exports, module2) {
    "use strict";
    var utils = require_utils2();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      return instance;
    }
    var axios = createInstance(defaults);
    axios.Axios = Axios;
    axios.create = function create(instanceConfig) {
      return createInstance(mergeConfig(axios.defaults, instanceConfig));
    };
    axios.Cancel = require_Cancel();
    axios.CancelToken = require_CancelToken();
    axios.isCancel = require_isCancel();
    axios.all = function all(promises) {
      return Promise.all(promises);
    };
    axios.spread = require_spread();
    axios.isAxiosError = require_isAxiosError();
    module2.exports = axios;
    module2.exports.default = axios;
  }
});

// node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/axios/index.js"(exports, module2) {
    module2.exports = require_axios();
  }
});

// node_modules/storyblok-js-client/dist/index.cjs.js
var require_index_cjs = __commonJS({
  "node_modules/storyblok-js-client/dist/index.cjs.js"(exports, module2) {
    "use strict";
    var t = require_lib();
    function e(t2) {
      return t2 && typeof t2 == "object" && "default" in t2 ? t2 : {default: t2};
    }
    var r = e(require_axios2());
    function s2(t2) {
      return typeof t2 == "number" && (t2 == t2 && t2 !== 1 / 0 && t2 !== -1 / 0);
    }
    function i(t2, e2, r2) {
      if (!s2(e2))
        throw new TypeError("Expected `limit` to be a finite number");
      if (!s2(r2))
        throw new TypeError("Expected `interval` to be a finite number");
      var i2 = [], n2 = [], a2 = 0, o2 = function() {
        a2++;
        var e3 = setTimeout(function() {
          a2--, i2.length > 0 && o2(), n2 = n2.filter(function(t3) {
            return t3 !== e3;
          });
        }, r2);
        n2.indexOf(e3) < 0 && n2.push(e3);
        var s3 = i2.shift();
        s3.resolve(t2.apply(s3.self, s3.args));
      }, l2 = function() {
        var t3 = arguments, r3 = this;
        return new Promise(function(s3, n3) {
          i2.push({resolve: s3, reject: n3, args: t3, self: r3}), a2 < e2 && o2();
        });
      };
      return l2.abort = function() {
        n2.forEach(clearTimeout), n2 = [], i2.forEach(function(t3) {
          t3.reject(new throttle.AbortError());
        }), i2.length = 0;
      }, l2;
    }
    i.AbortError = function() {
      Error.call(this, "Throttled function aborted"), this.name = "AbortError";
    };
    var n = function(t2, e2) {
      if (!t2)
        return null;
      let r2 = {};
      for (let s3 in t2) {
        let i2 = t2[s3];
        e2.indexOf(s3) > -1 && i2 !== null && (r2[s3] = i2);
      }
      return r2;
    };
    var a = {nodes: {horizontal_rule: (t2) => ({singleTag: "hr"}), blockquote: (t2) => ({tag: "blockquote"}), bullet_list: (t2) => ({tag: "ul"}), code_block: (t2) => ({tag: ["pre", {tag: "code", attrs: t2.attrs}]}), hard_break: (t2) => ({singleTag: "br"}), heading: (t2) => ({tag: "h" + t2.attrs.level}), image: (t2) => ({singleTag: [{tag: "img", attrs: n(t2.attrs, ["src", "alt", "title"])}]}), list_item: (t2) => ({tag: "li"}), ordered_list: (t2) => ({tag: "ol"}), paragraph: (t2) => ({tag: "p"})}, marks: {bold: () => ({tag: "b"}), strike: () => ({tag: "strike"}), underline: () => ({tag: "u"}), strong: () => ({tag: "strong"}), code: () => ({tag: "code"}), italic: () => ({tag: "i"}), link(t2) {
      const e2 = {...t2.attrs}, {linktype: r2 = "url"} = t2.attrs;
      return r2 === "email" && (e2.href = "mailto:" + e2.href), e2.anchor && (e2.href = `${e2.href}#${e2.anchor}`, delete e2.anchor), {tag: [{tag: "a", attrs: e2}]};
    }, styled: (t2) => ({tag: [{tag: "span", attrs: t2.attrs}]})}};
    var o = class {
      constructor(t2) {
        t2 || (t2 = a), this.marks = t2.marks || [], this.nodes = t2.nodes || [];
      }
      addNode(t2, e2) {
        this.nodes[t2] = e2;
      }
      addMark(t2, e2) {
        this.marks[t2] = e2;
      }
      render(t2 = {}) {
        if (t2.content && Array.isArray(t2.content)) {
          let e2 = "";
          return t2.content.forEach((t3) => {
            e2 += this.renderNode(t3);
          }), e2;
        }
        return console.warn("The render method must receive an object with a content field, which is an array"), "";
      }
      renderNode(t2) {
        let e2 = [];
        t2.marks && t2.marks.forEach((t3) => {
          const r3 = this.getMatchingMark(t3);
          r3 && e2.push(this.renderOpeningTag(r3.tag));
        });
        const r2 = this.getMatchingNode(t2);
        return r2 && r2.tag && e2.push(this.renderOpeningTag(r2.tag)), t2.content ? t2.content.forEach((t3) => {
          e2.push(this.renderNode(t3));
        }) : t2.text ? e2.push(function(t3) {
          const e3 = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}, r3 = /[&<>"']/g, s3 = RegExp(r3.source);
          return t3 && s3.test(t3) ? t3.replace(r3, (t4) => e3[t4]) : t3;
        }(t2.text)) : r2 && r2.singleTag ? e2.push(this.renderTag(r2.singleTag, " /")) : r2 && r2.html && e2.push(r2.html), r2 && r2.tag && e2.push(this.renderClosingTag(r2.tag)), t2.marks && t2.marks.slice(0).reverse().forEach((t3) => {
          const r3 = this.getMatchingMark(t3);
          r3 && e2.push(this.renderClosingTag(r3.tag));
        }), e2.join("");
      }
      renderTag(t2, e2) {
        if (t2.constructor === String)
          return `<${t2}${e2}>`;
        return t2.map((t3) => {
          if (t3.constructor === String)
            return `<${t3}${e2}>`;
          {
            let r2 = "<" + t3.tag;
            if (t3.attrs)
              for (let e3 in t3.attrs) {
                let s3 = t3.attrs[e3];
                s3 !== null && (r2 += ` ${e3}="${s3}"`);
              }
            return `${r2}${e2}>`;
          }
        }).join("");
      }
      renderOpeningTag(t2) {
        return this.renderTag(t2, "");
      }
      renderClosingTag(t2) {
        if (t2.constructor === String)
          return `</${t2}>`;
        return t2.slice(0).reverse().map((t3) => t3.constructor === String ? `</${t3}>` : `</${t3.tag}>`).join("");
      }
      getMatchingNode(t2) {
        if (typeof this.nodes[t2.type] == "function")
          return this.nodes[t2.type](t2);
      }
      getMatchingMark(t2) {
        if (typeof this.marks[t2.type] == "function")
          return this.marks[t2.type](t2);
      }
    };
    var l = (t2 = 0, e2 = t2) => {
      const r2 = Math.abs(e2 - t2) || 0, s3 = t2 < e2 ? 1 : -1;
      return ((t3 = 0, e3) => [...Array(t3)].map(e3))(r2, (e3, r3) => r3 * s3 + t2);
    };
    var c = {};
    var h = {};
    module2.exports = class {
      constructor(t2, e2) {
        if (!e2) {
          let r2 = t2.region ? "-" + t2.region : "", s4 = t2.https === false ? "http" : "https";
          e2 = t2.oauthToken === void 0 ? `${s4}://api${r2}.storyblok.com/v2` : `${s4}://api${r2}.storyblok.com/v1`;
        }
        let s3 = Object.assign({}, t2.headers), n2 = 5;
        t2.oauthToken !== void 0 && (s3.Authorization = t2.oauthToken, n2 = 3), t2.rateLimit !== void 0 && (n2 = t2.rateLimit), this.richTextResolver = new o(t2.richTextSchema), typeof t2.componentResolver == "function" && this.setComponentResolver(t2.componentResolver), this.maxRetries = t2.maxRetries || 5, this.throttle = i(this.throttledRequest, n2, 1e3), this.accessToken = t2.accessToken, this.relations = {}, this.links = {}, this.cache = t2.cache || {clear: "manual"}, this.client = r.default.create({baseURL: e2, timeout: t2.timeout || 0, headers: s3, proxy: t2.proxy || false}), t2.responseInterceptor && this.client.interceptors.response.use((e3) => t2.responseInterceptor(e3));
      }
      setComponentResolver(t2) {
        this.richTextResolver.addNode("blok", (e2) => {
          let r2 = "";
          return e2.attrs.body.forEach((e3) => {
            r2 += t2(e3.component, e3);
          }), {html: r2};
        });
      }
      parseParams(t2 = {}) {
        return t2.version || (t2.version = "published"), t2.token || (t2.token = this.getToken()), t2.cv || (t2.cv = h[t2.token]), Array.isArray(t2.resolve_relations) && (t2.resolve_relations = t2.resolve_relations.join(",")), t2;
      }
      factoryParamOptions(t2, e2 = {}) {
        return ((t3 = "") => t3.indexOf("/cdn/") > -1)(t2) ? this.parseParams(e2) : e2;
      }
      makeRequest(t2, e2, r2, s3) {
        const i2 = this.factoryParamOptions(t2, ((t3 = {}, e3 = 25, r3 = 1) => ({...t3, per_page: e3, page: r3}))(e2, r2, s3));
        return this.cacheResponse(t2, i2);
      }
      get(t2, e2) {
        let r2 = "/" + t2;
        const s3 = this.factoryParamOptions(r2, e2);
        return this.cacheResponse(r2, s3);
      }
      async getAll(t2, e2 = {}, r2) {
        const s3 = e2.per_page || 25, i2 = "/" + t2, n2 = i2.split("/");
        r2 = r2 || n2[n2.length - 1];
        const a2 = await this.makeRequest(i2, e2, s3, 1), o2 = Math.ceil(a2.total / s3);
        return ((t3 = [], e3) => t3.map(e3).reduce((t4, e4) => [...t4, ...e4], []))([a2, ...await (async (t3 = [], e3) => Promise.all(t3.map(e3)))(l(1, o2), async (t3) => this.makeRequest(i2, e2, s3, t3 + 1))], (t3) => Object.values(t3.data[r2]));
      }
      post(t2, e2) {
        let r2 = "/" + t2;
        return this.throttle("post", r2, e2);
      }
      put(t2, e2) {
        let r2 = "/" + t2;
        return this.throttle("put", r2, e2);
      }
      delete(t2, e2) {
        let r2 = "/" + t2;
        return this.throttle("delete", r2, e2);
      }
      getStories(t2) {
        return this.get("cdn/stories", t2);
      }
      getStory(t2, e2) {
        return this.get("cdn/stories/" + t2, e2);
      }
      setToken(t2) {
        this.accessToken = t2;
      }
      getToken() {
        return this.accessToken;
      }
      _cleanCopy(t2) {
        return JSON.parse(JSON.stringify(t2));
      }
      _insertLinks(t2, e2) {
        const r2 = t2[e2];
        r2 && r2.fieldtype == "multilink" && r2.linktype == "story" && typeof r2.id == "string" && this.links[r2.id] && (r2.story = this._cleanCopy(this.links[r2.id]));
      }
      _insertRelations(t2, e2, r2) {
        if (r2.indexOf(t2.component + "." + e2) > -1) {
          if (typeof t2[e2] == "string")
            this.relations[t2[e2]] && (t2[e2] = this._cleanCopy(this.relations[t2[e2]]));
          else if (t2[e2].constructor === Array) {
            let r3 = [];
            t2[e2].forEach((t3) => {
              this.relations[t3] && r3.push(this._cleanCopy(this.relations[t3]));
            }), t2[e2] = r3;
          }
        }
      }
      iterateTree(t2, e2) {
        let r2 = (t3) => {
          if (t3 != null) {
            if (t3.constructor === Array)
              for (let e3 = 0; e3 < t3.length; e3++)
                r2(t3[e3]);
            else if (t3.constructor === Object && t3.component && t3._uid)
              for (let s3 in t3)
                this._insertRelations(t3, s3, e2), this._insertLinks(t3, s3), r2(t3[s3]);
          }
        };
        r2(t2.content);
      }
      async resolveLinks(t2, e2) {
        let r2 = [];
        if (t2.link_uuids) {
          const s3 = t2.link_uuids.length;
          let i2 = [];
          const n2 = 50;
          for (let e3 = 0; e3 < s3; e3 += n2) {
            const r3 = Math.min(s3, e3 + n2);
            i2.push(t2.link_uuids.slice(e3, r3));
          }
          for (let t3 = 0; t3 < i2.length; t3++) {
            (await this.getStories({per_page: n2, version: e2.version, by_uuids: i2[t3].join(",")})).data.stories.forEach((t4) => {
              r2.push(t4);
            });
          }
        } else
          r2 = t2.links;
        r2.forEach((t3) => {
          this.links[t3.uuid] = t3;
        });
      }
      async resolveRelations(t2, e2) {
        let r2 = [];
        if (t2.rel_uuids) {
          const s3 = t2.rel_uuids.length;
          let i2 = [];
          const n2 = 50;
          for (let e3 = 0; e3 < s3; e3 += n2) {
            const r3 = Math.min(s3, e3 + n2);
            i2.push(t2.rel_uuids.slice(e3, r3));
          }
          for (let t3 = 0; t3 < i2.length; t3++) {
            (await this.getStories({per_page: n2, version: e2.version, by_uuids: i2[t3].join(",")})).data.stories.forEach((t4) => {
              r2.push(t4);
            });
          }
        } else
          r2 = t2.rels;
        r2.forEach((t3) => {
          this.relations[t3.uuid] = t3;
        });
      }
      async resolveStories(t2, e2) {
        let r2 = [];
        e2.resolve_relations !== void 0 && e2.resolve_relations.length > 0 && (r2 = e2.resolve_relations.split(","), await this.resolveRelations(t2, e2)), ["1", "story", "url"].indexOf(e2.resolve_links) > -1 && await this.resolveLinks(t2, e2);
        for (const t3 in this.relations)
          this.iterateTree(this.relations[t3], r2);
        t2.story ? this.iterateTree(t2.story, r2) : t2.stories.forEach((t3) => {
          this.iterateTree(t3, r2);
        });
      }
      cacheResponse(e2, r2, s3) {
        return s3 === void 0 && (s3 = 0), new Promise(async (i2, n2) => {
          let a2 = t.stringify({url: e2, params: r2}, {arrayFormat: "brackets"}), o2 = this.cacheProvider();
          if (this.cache.clear === "auto" && r2.version === "draft" && await this.flushCache(), r2.version === "published" && e2 != "/cdn/spaces/me") {
            const t2 = await o2.get(a2);
            if (t2)
              return i2(t2);
          }
          try {
            let s4 = await this.throttle("get", e2, {params: r2, paramsSerializer: (e3) => t.stringify(e3, {arrayFormat: "brackets"})}), l3 = {data: s4.data, headers: s4.headers};
            if (s4.headers["per-page"] && (l3 = Object.assign({}, l3, {perPage: parseInt(s4.headers["per-page"]), total: parseInt(s4.headers.total)})), s4.status != 200)
              return n2(s4);
            (l3.data.story || l3.data.stories) && await this.resolveStories(l3.data, r2), r2.version === "published" && e2 != "/cdn/spaces/me" && o2.set(a2, l3), l3.data.cv && (r2.version == "draft" && h[r2.token] != l3.data.cv && this.flushCache(), h[r2.token] = l3.data.cv), i2(l3);
          } catch (t2) {
            if (t2.response && t2.response.status === 429 && (s3 += 1) < this.maxRetries)
              return console.log(`Hit rate limit. Retrying in ${s3} seconds.`), await (l2 = 1e3 * s3, new Promise((t3) => setTimeout(t3, l2))), this.cacheResponse(e2, r2, s3).then(i2).catch(n2);
            n2(t2);
          }
          var l2;
        });
      }
      throttledRequest(t2, e2, r2) {
        return this.client[t2](e2, r2);
      }
      cacheVersions() {
        return h;
      }
      cacheVersion() {
        return h[this.accessToken];
      }
      setCacheVersion(t2) {
        this.accessToken && (h[this.accessToken] = t2);
      }
      cacheProvider() {
        switch (this.cache.type) {
          case "memory":
            return {get: (t2) => c[t2], getAll: () => c, set(t2, e2) {
              c[t2] = e2;
            }, flush() {
              c = {};
            }};
          default:
            return {get() {
            }, getAll() {
            }, set() {
            }, flush() {
            }};
        }
      }
      async flushCache() {
        return await this.cacheProvider().flush(), this;
      }
    };
  }
});

// node_modules/remarkable/dist/cjs/index.js
var require_cjs2 = __commonJS({
  "node_modules/remarkable/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    var entities = {
      "Aacute": "\xC1",
      "aacute": "\xE1",
      "Abreve": "\u0102",
      "abreve": "\u0103",
      "ac": "\u223E",
      "acd": "\u223F",
      "acE": "\u223E\u0333",
      "Acirc": "\xC2",
      "acirc": "\xE2",
      "acute": "\xB4",
      "Acy": "\u0410",
      "acy": "\u0430",
      "AElig": "\xC6",
      "aelig": "\xE6",
      "af": "\u2061",
      "Afr": "\u{1D504}",
      "afr": "\u{1D51E}",
      "Agrave": "\xC0",
      "agrave": "\xE0",
      "alefsym": "\u2135",
      "aleph": "\u2135",
      "Alpha": "\u0391",
      "alpha": "\u03B1",
      "Amacr": "\u0100",
      "amacr": "\u0101",
      "amalg": "\u2A3F",
      "AMP": "&",
      "amp": "&",
      "And": "\u2A53",
      "and": "\u2227",
      "andand": "\u2A55",
      "andd": "\u2A5C",
      "andslope": "\u2A58",
      "andv": "\u2A5A",
      "ang": "\u2220",
      "ange": "\u29A4",
      "angle": "\u2220",
      "angmsd": "\u2221",
      "angmsdaa": "\u29A8",
      "angmsdab": "\u29A9",
      "angmsdac": "\u29AA",
      "angmsdad": "\u29AB",
      "angmsdae": "\u29AC",
      "angmsdaf": "\u29AD",
      "angmsdag": "\u29AE",
      "angmsdah": "\u29AF",
      "angrt": "\u221F",
      "angrtvb": "\u22BE",
      "angrtvbd": "\u299D",
      "angsph": "\u2222",
      "angst": "\xC5",
      "angzarr": "\u237C",
      "Aogon": "\u0104",
      "aogon": "\u0105",
      "Aopf": "\u{1D538}",
      "aopf": "\u{1D552}",
      "ap": "\u2248",
      "apacir": "\u2A6F",
      "apE": "\u2A70",
      "ape": "\u224A",
      "apid": "\u224B",
      "apos": "'",
      "ApplyFunction": "\u2061",
      "approx": "\u2248",
      "approxeq": "\u224A",
      "Aring": "\xC5",
      "aring": "\xE5",
      "Ascr": "\u{1D49C}",
      "ascr": "\u{1D4B6}",
      "Assign": "\u2254",
      "ast": "*",
      "asymp": "\u2248",
      "asympeq": "\u224D",
      "Atilde": "\xC3",
      "atilde": "\xE3",
      "Auml": "\xC4",
      "auml": "\xE4",
      "awconint": "\u2233",
      "awint": "\u2A11",
      "backcong": "\u224C",
      "backepsilon": "\u03F6",
      "backprime": "\u2035",
      "backsim": "\u223D",
      "backsimeq": "\u22CD",
      "Backslash": "\u2216",
      "Barv": "\u2AE7",
      "barvee": "\u22BD",
      "Barwed": "\u2306",
      "barwed": "\u2305",
      "barwedge": "\u2305",
      "bbrk": "\u23B5",
      "bbrktbrk": "\u23B6",
      "bcong": "\u224C",
      "Bcy": "\u0411",
      "bcy": "\u0431",
      "bdquo": "\u201E",
      "becaus": "\u2235",
      "Because": "\u2235",
      "because": "\u2235",
      "bemptyv": "\u29B0",
      "bepsi": "\u03F6",
      "bernou": "\u212C",
      "Bernoullis": "\u212C",
      "Beta": "\u0392",
      "beta": "\u03B2",
      "beth": "\u2136",
      "between": "\u226C",
      "Bfr": "\u{1D505}",
      "bfr": "\u{1D51F}",
      "bigcap": "\u22C2",
      "bigcirc": "\u25EF",
      "bigcup": "\u22C3",
      "bigodot": "\u2A00",
      "bigoplus": "\u2A01",
      "bigotimes": "\u2A02",
      "bigsqcup": "\u2A06",
      "bigstar": "\u2605",
      "bigtriangledown": "\u25BD",
      "bigtriangleup": "\u25B3",
      "biguplus": "\u2A04",
      "bigvee": "\u22C1",
      "bigwedge": "\u22C0",
      "bkarow": "\u290D",
      "blacklozenge": "\u29EB",
      "blacksquare": "\u25AA",
      "blacktriangle": "\u25B4",
      "blacktriangledown": "\u25BE",
      "blacktriangleleft": "\u25C2",
      "blacktriangleright": "\u25B8",
      "blank": "\u2423",
      "blk12": "\u2592",
      "blk14": "\u2591",
      "blk34": "\u2593",
      "block": "\u2588",
      "bne": "=\u20E5",
      "bnequiv": "\u2261\u20E5",
      "bNot": "\u2AED",
      "bnot": "\u2310",
      "Bopf": "\u{1D539}",
      "bopf": "\u{1D553}",
      "bot": "\u22A5",
      "bottom": "\u22A5",
      "bowtie": "\u22C8",
      "boxbox": "\u29C9",
      "boxDL": "\u2557",
      "boxDl": "\u2556",
      "boxdL": "\u2555",
      "boxdl": "\u2510",
      "boxDR": "\u2554",
      "boxDr": "\u2553",
      "boxdR": "\u2552",
      "boxdr": "\u250C",
      "boxH": "\u2550",
      "boxh": "\u2500",
      "boxHD": "\u2566",
      "boxHd": "\u2564",
      "boxhD": "\u2565",
      "boxhd": "\u252C",
      "boxHU": "\u2569",
      "boxHu": "\u2567",
      "boxhU": "\u2568",
      "boxhu": "\u2534",
      "boxminus": "\u229F",
      "boxplus": "\u229E",
      "boxtimes": "\u22A0",
      "boxUL": "\u255D",
      "boxUl": "\u255C",
      "boxuL": "\u255B",
      "boxul": "\u2518",
      "boxUR": "\u255A",
      "boxUr": "\u2559",
      "boxuR": "\u2558",
      "boxur": "\u2514",
      "boxV": "\u2551",
      "boxv": "\u2502",
      "boxVH": "\u256C",
      "boxVh": "\u256B",
      "boxvH": "\u256A",
      "boxvh": "\u253C",
      "boxVL": "\u2563",
      "boxVl": "\u2562",
      "boxvL": "\u2561",
      "boxvl": "\u2524",
      "boxVR": "\u2560",
      "boxVr": "\u255F",
      "boxvR": "\u255E",
      "boxvr": "\u251C",
      "bprime": "\u2035",
      "Breve": "\u02D8",
      "breve": "\u02D8",
      "brvbar": "\xA6",
      "Bscr": "\u212C",
      "bscr": "\u{1D4B7}",
      "bsemi": "\u204F",
      "bsim": "\u223D",
      "bsime": "\u22CD",
      "bsol": "\\",
      "bsolb": "\u29C5",
      "bsolhsub": "\u27C8",
      "bull": "\u2022",
      "bullet": "\u2022",
      "bump": "\u224E",
      "bumpE": "\u2AAE",
      "bumpe": "\u224F",
      "Bumpeq": "\u224E",
      "bumpeq": "\u224F",
      "Cacute": "\u0106",
      "cacute": "\u0107",
      "Cap": "\u22D2",
      "cap": "\u2229",
      "capand": "\u2A44",
      "capbrcup": "\u2A49",
      "capcap": "\u2A4B",
      "capcup": "\u2A47",
      "capdot": "\u2A40",
      "CapitalDifferentialD": "\u2145",
      "caps": "\u2229\uFE00",
      "caret": "\u2041",
      "caron": "\u02C7",
      "Cayleys": "\u212D",
      "ccaps": "\u2A4D",
      "Ccaron": "\u010C",
      "ccaron": "\u010D",
      "Ccedil": "\xC7",
      "ccedil": "\xE7",
      "Ccirc": "\u0108",
      "ccirc": "\u0109",
      "Cconint": "\u2230",
      "ccups": "\u2A4C",
      "ccupssm": "\u2A50",
      "Cdot": "\u010A",
      "cdot": "\u010B",
      "cedil": "\xB8",
      "Cedilla": "\xB8",
      "cemptyv": "\u29B2",
      "cent": "\xA2",
      "CenterDot": "\xB7",
      "centerdot": "\xB7",
      "Cfr": "\u212D",
      "cfr": "\u{1D520}",
      "CHcy": "\u0427",
      "chcy": "\u0447",
      "check": "\u2713",
      "checkmark": "\u2713",
      "Chi": "\u03A7",
      "chi": "\u03C7",
      "cir": "\u25CB",
      "circ": "\u02C6",
      "circeq": "\u2257",
      "circlearrowleft": "\u21BA",
      "circlearrowright": "\u21BB",
      "circledast": "\u229B",
      "circledcirc": "\u229A",
      "circleddash": "\u229D",
      "CircleDot": "\u2299",
      "circledR": "\xAE",
      "circledS": "\u24C8",
      "CircleMinus": "\u2296",
      "CirclePlus": "\u2295",
      "CircleTimes": "\u2297",
      "cirE": "\u29C3",
      "cire": "\u2257",
      "cirfnint": "\u2A10",
      "cirmid": "\u2AEF",
      "cirscir": "\u29C2",
      "ClockwiseContourIntegral": "\u2232",
      "CloseCurlyDoubleQuote": "\u201D",
      "CloseCurlyQuote": "\u2019",
      "clubs": "\u2663",
      "clubsuit": "\u2663",
      "Colon": "\u2237",
      "colon": ":",
      "Colone": "\u2A74",
      "colone": "\u2254",
      "coloneq": "\u2254",
      "comma": ",",
      "commat": "@",
      "comp": "\u2201",
      "compfn": "\u2218",
      "complement": "\u2201",
      "complexes": "\u2102",
      "cong": "\u2245",
      "congdot": "\u2A6D",
      "Congruent": "\u2261",
      "Conint": "\u222F",
      "conint": "\u222E",
      "ContourIntegral": "\u222E",
      "Copf": "\u2102",
      "copf": "\u{1D554}",
      "coprod": "\u2210",
      "Coproduct": "\u2210",
      "COPY": "\xA9",
      "copy": "\xA9",
      "copysr": "\u2117",
      "CounterClockwiseContourIntegral": "\u2233",
      "crarr": "\u21B5",
      "Cross": "\u2A2F",
      "cross": "\u2717",
      "Cscr": "\u{1D49E}",
      "cscr": "\u{1D4B8}",
      "csub": "\u2ACF",
      "csube": "\u2AD1",
      "csup": "\u2AD0",
      "csupe": "\u2AD2",
      "ctdot": "\u22EF",
      "cudarrl": "\u2938",
      "cudarrr": "\u2935",
      "cuepr": "\u22DE",
      "cuesc": "\u22DF",
      "cularr": "\u21B6",
      "cularrp": "\u293D",
      "Cup": "\u22D3",
      "cup": "\u222A",
      "cupbrcap": "\u2A48",
      "CupCap": "\u224D",
      "cupcap": "\u2A46",
      "cupcup": "\u2A4A",
      "cupdot": "\u228D",
      "cupor": "\u2A45",
      "cups": "\u222A\uFE00",
      "curarr": "\u21B7",
      "curarrm": "\u293C",
      "curlyeqprec": "\u22DE",
      "curlyeqsucc": "\u22DF",
      "curlyvee": "\u22CE",
      "curlywedge": "\u22CF",
      "curren": "\xA4",
      "curvearrowleft": "\u21B6",
      "curvearrowright": "\u21B7",
      "cuvee": "\u22CE",
      "cuwed": "\u22CF",
      "cwconint": "\u2232",
      "cwint": "\u2231",
      "cylcty": "\u232D",
      "Dagger": "\u2021",
      "dagger": "\u2020",
      "daleth": "\u2138",
      "Darr": "\u21A1",
      "dArr": "\u21D3",
      "darr": "\u2193",
      "dash": "\u2010",
      "Dashv": "\u2AE4",
      "dashv": "\u22A3",
      "dbkarow": "\u290F",
      "dblac": "\u02DD",
      "Dcaron": "\u010E",
      "dcaron": "\u010F",
      "Dcy": "\u0414",
      "dcy": "\u0434",
      "DD": "\u2145",
      "dd": "\u2146",
      "ddagger": "\u2021",
      "ddarr": "\u21CA",
      "DDotrahd": "\u2911",
      "ddotseq": "\u2A77",
      "deg": "\xB0",
      "Del": "\u2207",
      "Delta": "\u0394",
      "delta": "\u03B4",
      "demptyv": "\u29B1",
      "dfisht": "\u297F",
      "Dfr": "\u{1D507}",
      "dfr": "\u{1D521}",
      "dHar": "\u2965",
      "dharl": "\u21C3",
      "dharr": "\u21C2",
      "DiacriticalAcute": "\xB4",
      "DiacriticalDot": "\u02D9",
      "DiacriticalDoubleAcute": "\u02DD",
      "DiacriticalGrave": "`",
      "DiacriticalTilde": "\u02DC",
      "diam": "\u22C4",
      "Diamond": "\u22C4",
      "diamond": "\u22C4",
      "diamondsuit": "\u2666",
      "diams": "\u2666",
      "die": "\xA8",
      "DifferentialD": "\u2146",
      "digamma": "\u03DD",
      "disin": "\u22F2",
      "div": "\xF7",
      "divide": "\xF7",
      "divideontimes": "\u22C7",
      "divonx": "\u22C7",
      "DJcy": "\u0402",
      "djcy": "\u0452",
      "dlcorn": "\u231E",
      "dlcrop": "\u230D",
      "dollar": "$",
      "Dopf": "\u{1D53B}",
      "dopf": "\u{1D555}",
      "Dot": "\xA8",
      "dot": "\u02D9",
      "DotDot": "\u20DC",
      "doteq": "\u2250",
      "doteqdot": "\u2251",
      "DotEqual": "\u2250",
      "dotminus": "\u2238",
      "dotplus": "\u2214",
      "dotsquare": "\u22A1",
      "doublebarwedge": "\u2306",
      "DoubleContourIntegral": "\u222F",
      "DoubleDot": "\xA8",
      "DoubleDownArrow": "\u21D3",
      "DoubleLeftArrow": "\u21D0",
      "DoubleLeftRightArrow": "\u21D4",
      "DoubleLeftTee": "\u2AE4",
      "DoubleLongLeftArrow": "\u27F8",
      "DoubleLongLeftRightArrow": "\u27FA",
      "DoubleLongRightArrow": "\u27F9",
      "DoubleRightArrow": "\u21D2",
      "DoubleRightTee": "\u22A8",
      "DoubleUpArrow": "\u21D1",
      "DoubleUpDownArrow": "\u21D5",
      "DoubleVerticalBar": "\u2225",
      "DownArrow": "\u2193",
      "Downarrow": "\u21D3",
      "downarrow": "\u2193",
      "DownArrowBar": "\u2913",
      "DownArrowUpArrow": "\u21F5",
      "DownBreve": "\u0311",
      "downdownarrows": "\u21CA",
      "downharpoonleft": "\u21C3",
      "downharpoonright": "\u21C2",
      "DownLeftRightVector": "\u2950",
      "DownLeftTeeVector": "\u295E",
      "DownLeftVector": "\u21BD",
      "DownLeftVectorBar": "\u2956",
      "DownRightTeeVector": "\u295F",
      "DownRightVector": "\u21C1",
      "DownRightVectorBar": "\u2957",
      "DownTee": "\u22A4",
      "DownTeeArrow": "\u21A7",
      "drbkarow": "\u2910",
      "drcorn": "\u231F",
      "drcrop": "\u230C",
      "Dscr": "\u{1D49F}",
      "dscr": "\u{1D4B9}",
      "DScy": "\u0405",
      "dscy": "\u0455",
      "dsol": "\u29F6",
      "Dstrok": "\u0110",
      "dstrok": "\u0111",
      "dtdot": "\u22F1",
      "dtri": "\u25BF",
      "dtrif": "\u25BE",
      "duarr": "\u21F5",
      "duhar": "\u296F",
      "dwangle": "\u29A6",
      "DZcy": "\u040F",
      "dzcy": "\u045F",
      "dzigrarr": "\u27FF",
      "Eacute": "\xC9",
      "eacute": "\xE9",
      "easter": "\u2A6E",
      "Ecaron": "\u011A",
      "ecaron": "\u011B",
      "ecir": "\u2256",
      "Ecirc": "\xCA",
      "ecirc": "\xEA",
      "ecolon": "\u2255",
      "Ecy": "\u042D",
      "ecy": "\u044D",
      "eDDot": "\u2A77",
      "Edot": "\u0116",
      "eDot": "\u2251",
      "edot": "\u0117",
      "ee": "\u2147",
      "efDot": "\u2252",
      "Efr": "\u{1D508}",
      "efr": "\u{1D522}",
      "eg": "\u2A9A",
      "Egrave": "\xC8",
      "egrave": "\xE8",
      "egs": "\u2A96",
      "egsdot": "\u2A98",
      "el": "\u2A99",
      "Element": "\u2208",
      "elinters": "\u23E7",
      "ell": "\u2113",
      "els": "\u2A95",
      "elsdot": "\u2A97",
      "Emacr": "\u0112",
      "emacr": "\u0113",
      "empty": "\u2205",
      "emptyset": "\u2205",
      "EmptySmallSquare": "\u25FB",
      "emptyv": "\u2205",
      "EmptyVerySmallSquare": "\u25AB",
      "emsp": "\u2003",
      "emsp13": "\u2004",
      "emsp14": "\u2005",
      "ENG": "\u014A",
      "eng": "\u014B",
      "ensp": "\u2002",
      "Eogon": "\u0118",
      "eogon": "\u0119",
      "Eopf": "\u{1D53C}",
      "eopf": "\u{1D556}",
      "epar": "\u22D5",
      "eparsl": "\u29E3",
      "eplus": "\u2A71",
      "epsi": "\u03B5",
      "Epsilon": "\u0395",
      "epsilon": "\u03B5",
      "epsiv": "\u03F5",
      "eqcirc": "\u2256",
      "eqcolon": "\u2255",
      "eqsim": "\u2242",
      "eqslantgtr": "\u2A96",
      "eqslantless": "\u2A95",
      "Equal": "\u2A75",
      "equals": "=",
      "EqualTilde": "\u2242",
      "equest": "\u225F",
      "Equilibrium": "\u21CC",
      "equiv": "\u2261",
      "equivDD": "\u2A78",
      "eqvparsl": "\u29E5",
      "erarr": "\u2971",
      "erDot": "\u2253",
      "Escr": "\u2130",
      "escr": "\u212F",
      "esdot": "\u2250",
      "Esim": "\u2A73",
      "esim": "\u2242",
      "Eta": "\u0397",
      "eta": "\u03B7",
      "ETH": "\xD0",
      "eth": "\xF0",
      "Euml": "\xCB",
      "euml": "\xEB",
      "euro": "\u20AC",
      "excl": "!",
      "exist": "\u2203",
      "Exists": "\u2203",
      "expectation": "\u2130",
      "ExponentialE": "\u2147",
      "exponentiale": "\u2147",
      "fallingdotseq": "\u2252",
      "Fcy": "\u0424",
      "fcy": "\u0444",
      "female": "\u2640",
      "ffilig": "\uFB03",
      "fflig": "\uFB00",
      "ffllig": "\uFB04",
      "Ffr": "\u{1D509}",
      "ffr": "\u{1D523}",
      "filig": "\uFB01",
      "FilledSmallSquare": "\u25FC",
      "FilledVerySmallSquare": "\u25AA",
      "fjlig": "fj",
      "flat": "\u266D",
      "fllig": "\uFB02",
      "fltns": "\u25B1",
      "fnof": "\u0192",
      "Fopf": "\u{1D53D}",
      "fopf": "\u{1D557}",
      "ForAll": "\u2200",
      "forall": "\u2200",
      "fork": "\u22D4",
      "forkv": "\u2AD9",
      "Fouriertrf": "\u2131",
      "fpartint": "\u2A0D",
      "frac12": "\xBD",
      "frac13": "\u2153",
      "frac14": "\xBC",
      "frac15": "\u2155",
      "frac16": "\u2159",
      "frac18": "\u215B",
      "frac23": "\u2154",
      "frac25": "\u2156",
      "frac34": "\xBE",
      "frac35": "\u2157",
      "frac38": "\u215C",
      "frac45": "\u2158",
      "frac56": "\u215A",
      "frac58": "\u215D",
      "frac78": "\u215E",
      "frasl": "\u2044",
      "frown": "\u2322",
      "Fscr": "\u2131",
      "fscr": "\u{1D4BB}",
      "gacute": "\u01F5",
      "Gamma": "\u0393",
      "gamma": "\u03B3",
      "Gammad": "\u03DC",
      "gammad": "\u03DD",
      "gap": "\u2A86",
      "Gbreve": "\u011E",
      "gbreve": "\u011F",
      "Gcedil": "\u0122",
      "Gcirc": "\u011C",
      "gcirc": "\u011D",
      "Gcy": "\u0413",
      "gcy": "\u0433",
      "Gdot": "\u0120",
      "gdot": "\u0121",
      "gE": "\u2267",
      "ge": "\u2265",
      "gEl": "\u2A8C",
      "gel": "\u22DB",
      "geq": "\u2265",
      "geqq": "\u2267",
      "geqslant": "\u2A7E",
      "ges": "\u2A7E",
      "gescc": "\u2AA9",
      "gesdot": "\u2A80",
      "gesdoto": "\u2A82",
      "gesdotol": "\u2A84",
      "gesl": "\u22DB\uFE00",
      "gesles": "\u2A94",
      "Gfr": "\u{1D50A}",
      "gfr": "\u{1D524}",
      "Gg": "\u22D9",
      "gg": "\u226B",
      "ggg": "\u22D9",
      "gimel": "\u2137",
      "GJcy": "\u0403",
      "gjcy": "\u0453",
      "gl": "\u2277",
      "gla": "\u2AA5",
      "glE": "\u2A92",
      "glj": "\u2AA4",
      "gnap": "\u2A8A",
      "gnapprox": "\u2A8A",
      "gnE": "\u2269",
      "gne": "\u2A88",
      "gneq": "\u2A88",
      "gneqq": "\u2269",
      "gnsim": "\u22E7",
      "Gopf": "\u{1D53E}",
      "gopf": "\u{1D558}",
      "grave": "`",
      "GreaterEqual": "\u2265",
      "GreaterEqualLess": "\u22DB",
      "GreaterFullEqual": "\u2267",
      "GreaterGreater": "\u2AA2",
      "GreaterLess": "\u2277",
      "GreaterSlantEqual": "\u2A7E",
      "GreaterTilde": "\u2273",
      "Gscr": "\u{1D4A2}",
      "gscr": "\u210A",
      "gsim": "\u2273",
      "gsime": "\u2A8E",
      "gsiml": "\u2A90",
      "GT": ">",
      "Gt": "\u226B",
      "gt": ">",
      "gtcc": "\u2AA7",
      "gtcir": "\u2A7A",
      "gtdot": "\u22D7",
      "gtlPar": "\u2995",
      "gtquest": "\u2A7C",
      "gtrapprox": "\u2A86",
      "gtrarr": "\u2978",
      "gtrdot": "\u22D7",
      "gtreqless": "\u22DB",
      "gtreqqless": "\u2A8C",
      "gtrless": "\u2277",
      "gtrsim": "\u2273",
      "gvertneqq": "\u2269\uFE00",
      "gvnE": "\u2269\uFE00",
      "Hacek": "\u02C7",
      "hairsp": "\u200A",
      "half": "\xBD",
      "hamilt": "\u210B",
      "HARDcy": "\u042A",
      "hardcy": "\u044A",
      "hArr": "\u21D4",
      "harr": "\u2194",
      "harrcir": "\u2948",
      "harrw": "\u21AD",
      "Hat": "^",
      "hbar": "\u210F",
      "Hcirc": "\u0124",
      "hcirc": "\u0125",
      "hearts": "\u2665",
      "heartsuit": "\u2665",
      "hellip": "\u2026",
      "hercon": "\u22B9",
      "Hfr": "\u210C",
      "hfr": "\u{1D525}",
      "HilbertSpace": "\u210B",
      "hksearow": "\u2925",
      "hkswarow": "\u2926",
      "hoarr": "\u21FF",
      "homtht": "\u223B",
      "hookleftarrow": "\u21A9",
      "hookrightarrow": "\u21AA",
      "Hopf": "\u210D",
      "hopf": "\u{1D559}",
      "horbar": "\u2015",
      "HorizontalLine": "\u2500",
      "Hscr": "\u210B",
      "hscr": "\u{1D4BD}",
      "hslash": "\u210F",
      "Hstrok": "\u0126",
      "hstrok": "\u0127",
      "HumpDownHump": "\u224E",
      "HumpEqual": "\u224F",
      "hybull": "\u2043",
      "hyphen": "\u2010",
      "Iacute": "\xCD",
      "iacute": "\xED",
      "ic": "\u2063",
      "Icirc": "\xCE",
      "icirc": "\xEE",
      "Icy": "\u0418",
      "icy": "\u0438",
      "Idot": "\u0130",
      "IEcy": "\u0415",
      "iecy": "\u0435",
      "iexcl": "\xA1",
      "iff": "\u21D4",
      "Ifr": "\u2111",
      "ifr": "\u{1D526}",
      "Igrave": "\xCC",
      "igrave": "\xEC",
      "ii": "\u2148",
      "iiiint": "\u2A0C",
      "iiint": "\u222D",
      "iinfin": "\u29DC",
      "iiota": "\u2129",
      "IJlig": "\u0132",
      "ijlig": "\u0133",
      "Im": "\u2111",
      "Imacr": "\u012A",
      "imacr": "\u012B",
      "image": "\u2111",
      "ImaginaryI": "\u2148",
      "imagline": "\u2110",
      "imagpart": "\u2111",
      "imath": "\u0131",
      "imof": "\u22B7",
      "imped": "\u01B5",
      "Implies": "\u21D2",
      "in": "\u2208",
      "incare": "\u2105",
      "infin": "\u221E",
      "infintie": "\u29DD",
      "inodot": "\u0131",
      "Int": "\u222C",
      "int": "\u222B",
      "intcal": "\u22BA",
      "integers": "\u2124",
      "Integral": "\u222B",
      "intercal": "\u22BA",
      "Intersection": "\u22C2",
      "intlarhk": "\u2A17",
      "intprod": "\u2A3C",
      "InvisibleComma": "\u2063",
      "InvisibleTimes": "\u2062",
      "IOcy": "\u0401",
      "iocy": "\u0451",
      "Iogon": "\u012E",
      "iogon": "\u012F",
      "Iopf": "\u{1D540}",
      "iopf": "\u{1D55A}",
      "Iota": "\u0399",
      "iota": "\u03B9",
      "iprod": "\u2A3C",
      "iquest": "\xBF",
      "Iscr": "\u2110",
      "iscr": "\u{1D4BE}",
      "isin": "\u2208",
      "isindot": "\u22F5",
      "isinE": "\u22F9",
      "isins": "\u22F4",
      "isinsv": "\u22F3",
      "isinv": "\u2208",
      "it": "\u2062",
      "Itilde": "\u0128",
      "itilde": "\u0129",
      "Iukcy": "\u0406",
      "iukcy": "\u0456",
      "Iuml": "\xCF",
      "iuml": "\xEF",
      "Jcirc": "\u0134",
      "jcirc": "\u0135",
      "Jcy": "\u0419",
      "jcy": "\u0439",
      "Jfr": "\u{1D50D}",
      "jfr": "\u{1D527}",
      "jmath": "\u0237",
      "Jopf": "\u{1D541}",
      "jopf": "\u{1D55B}",
      "Jscr": "\u{1D4A5}",
      "jscr": "\u{1D4BF}",
      "Jsercy": "\u0408",
      "jsercy": "\u0458",
      "Jukcy": "\u0404",
      "jukcy": "\u0454",
      "Kappa": "\u039A",
      "kappa": "\u03BA",
      "kappav": "\u03F0",
      "Kcedil": "\u0136",
      "kcedil": "\u0137",
      "Kcy": "\u041A",
      "kcy": "\u043A",
      "Kfr": "\u{1D50E}",
      "kfr": "\u{1D528}",
      "kgreen": "\u0138",
      "KHcy": "\u0425",
      "khcy": "\u0445",
      "KJcy": "\u040C",
      "kjcy": "\u045C",
      "Kopf": "\u{1D542}",
      "kopf": "\u{1D55C}",
      "Kscr": "\u{1D4A6}",
      "kscr": "\u{1D4C0}",
      "lAarr": "\u21DA",
      "Lacute": "\u0139",
      "lacute": "\u013A",
      "laemptyv": "\u29B4",
      "lagran": "\u2112",
      "Lambda": "\u039B",
      "lambda": "\u03BB",
      "Lang": "\u27EA",
      "lang": "\u27E8",
      "langd": "\u2991",
      "langle": "\u27E8",
      "lap": "\u2A85",
      "Laplacetrf": "\u2112",
      "laquo": "\xAB",
      "Larr": "\u219E",
      "lArr": "\u21D0",
      "larr": "\u2190",
      "larrb": "\u21E4",
      "larrbfs": "\u291F",
      "larrfs": "\u291D",
      "larrhk": "\u21A9",
      "larrlp": "\u21AB",
      "larrpl": "\u2939",
      "larrsim": "\u2973",
      "larrtl": "\u21A2",
      "lat": "\u2AAB",
      "lAtail": "\u291B",
      "latail": "\u2919",
      "late": "\u2AAD",
      "lates": "\u2AAD\uFE00",
      "lBarr": "\u290E",
      "lbarr": "\u290C",
      "lbbrk": "\u2772",
      "lbrace": "{",
      "lbrack": "[",
      "lbrke": "\u298B",
      "lbrksld": "\u298F",
      "lbrkslu": "\u298D",
      "Lcaron": "\u013D",
      "lcaron": "\u013E",
      "Lcedil": "\u013B",
      "lcedil": "\u013C",
      "lceil": "\u2308",
      "lcub": "{",
      "Lcy": "\u041B",
      "lcy": "\u043B",
      "ldca": "\u2936",
      "ldquo": "\u201C",
      "ldquor": "\u201E",
      "ldrdhar": "\u2967",
      "ldrushar": "\u294B",
      "ldsh": "\u21B2",
      "lE": "\u2266",
      "le": "\u2264",
      "LeftAngleBracket": "\u27E8",
      "LeftArrow": "\u2190",
      "Leftarrow": "\u21D0",
      "leftarrow": "\u2190",
      "LeftArrowBar": "\u21E4",
      "LeftArrowRightArrow": "\u21C6",
      "leftarrowtail": "\u21A2",
      "LeftCeiling": "\u2308",
      "LeftDoubleBracket": "\u27E6",
      "LeftDownTeeVector": "\u2961",
      "LeftDownVector": "\u21C3",
      "LeftDownVectorBar": "\u2959",
      "LeftFloor": "\u230A",
      "leftharpoondown": "\u21BD",
      "leftharpoonup": "\u21BC",
      "leftleftarrows": "\u21C7",
      "LeftRightArrow": "\u2194",
      "Leftrightarrow": "\u21D4",
      "leftrightarrow": "\u2194",
      "leftrightarrows": "\u21C6",
      "leftrightharpoons": "\u21CB",
      "leftrightsquigarrow": "\u21AD",
      "LeftRightVector": "\u294E",
      "LeftTee": "\u22A3",
      "LeftTeeArrow": "\u21A4",
      "LeftTeeVector": "\u295A",
      "leftthreetimes": "\u22CB",
      "LeftTriangle": "\u22B2",
      "LeftTriangleBar": "\u29CF",
      "LeftTriangleEqual": "\u22B4",
      "LeftUpDownVector": "\u2951",
      "LeftUpTeeVector": "\u2960",
      "LeftUpVector": "\u21BF",
      "LeftUpVectorBar": "\u2958",
      "LeftVector": "\u21BC",
      "LeftVectorBar": "\u2952",
      "lEg": "\u2A8B",
      "leg": "\u22DA",
      "leq": "\u2264",
      "leqq": "\u2266",
      "leqslant": "\u2A7D",
      "les": "\u2A7D",
      "lescc": "\u2AA8",
      "lesdot": "\u2A7F",
      "lesdoto": "\u2A81",
      "lesdotor": "\u2A83",
      "lesg": "\u22DA\uFE00",
      "lesges": "\u2A93",
      "lessapprox": "\u2A85",
      "lessdot": "\u22D6",
      "lesseqgtr": "\u22DA",
      "lesseqqgtr": "\u2A8B",
      "LessEqualGreater": "\u22DA",
      "LessFullEqual": "\u2266",
      "LessGreater": "\u2276",
      "lessgtr": "\u2276",
      "LessLess": "\u2AA1",
      "lesssim": "\u2272",
      "LessSlantEqual": "\u2A7D",
      "LessTilde": "\u2272",
      "lfisht": "\u297C",
      "lfloor": "\u230A",
      "Lfr": "\u{1D50F}",
      "lfr": "\u{1D529}",
      "lg": "\u2276",
      "lgE": "\u2A91",
      "lHar": "\u2962",
      "lhard": "\u21BD",
      "lharu": "\u21BC",
      "lharul": "\u296A",
      "lhblk": "\u2584",
      "LJcy": "\u0409",
      "ljcy": "\u0459",
      "Ll": "\u22D8",
      "ll": "\u226A",
      "llarr": "\u21C7",
      "llcorner": "\u231E",
      "Lleftarrow": "\u21DA",
      "llhard": "\u296B",
      "lltri": "\u25FA",
      "Lmidot": "\u013F",
      "lmidot": "\u0140",
      "lmoust": "\u23B0",
      "lmoustache": "\u23B0",
      "lnap": "\u2A89",
      "lnapprox": "\u2A89",
      "lnE": "\u2268",
      "lne": "\u2A87",
      "lneq": "\u2A87",
      "lneqq": "\u2268",
      "lnsim": "\u22E6",
      "loang": "\u27EC",
      "loarr": "\u21FD",
      "lobrk": "\u27E6",
      "LongLeftArrow": "\u27F5",
      "Longleftarrow": "\u27F8",
      "longleftarrow": "\u27F5",
      "LongLeftRightArrow": "\u27F7",
      "Longleftrightarrow": "\u27FA",
      "longleftrightarrow": "\u27F7",
      "longmapsto": "\u27FC",
      "LongRightArrow": "\u27F6",
      "Longrightarrow": "\u27F9",
      "longrightarrow": "\u27F6",
      "looparrowleft": "\u21AB",
      "looparrowright": "\u21AC",
      "lopar": "\u2985",
      "Lopf": "\u{1D543}",
      "lopf": "\u{1D55D}",
      "loplus": "\u2A2D",
      "lotimes": "\u2A34",
      "lowast": "\u2217",
      "lowbar": "_",
      "LowerLeftArrow": "\u2199",
      "LowerRightArrow": "\u2198",
      "loz": "\u25CA",
      "lozenge": "\u25CA",
      "lozf": "\u29EB",
      "lpar": "(",
      "lparlt": "\u2993",
      "lrarr": "\u21C6",
      "lrcorner": "\u231F",
      "lrhar": "\u21CB",
      "lrhard": "\u296D",
      "lrm": "\u200E",
      "lrtri": "\u22BF",
      "lsaquo": "\u2039",
      "Lscr": "\u2112",
      "lscr": "\u{1D4C1}",
      "Lsh": "\u21B0",
      "lsh": "\u21B0",
      "lsim": "\u2272",
      "lsime": "\u2A8D",
      "lsimg": "\u2A8F",
      "lsqb": "[",
      "lsquo": "\u2018",
      "lsquor": "\u201A",
      "Lstrok": "\u0141",
      "lstrok": "\u0142",
      "LT": "<",
      "Lt": "\u226A",
      "lt": "<",
      "ltcc": "\u2AA6",
      "ltcir": "\u2A79",
      "ltdot": "\u22D6",
      "lthree": "\u22CB",
      "ltimes": "\u22C9",
      "ltlarr": "\u2976",
      "ltquest": "\u2A7B",
      "ltri": "\u25C3",
      "ltrie": "\u22B4",
      "ltrif": "\u25C2",
      "ltrPar": "\u2996",
      "lurdshar": "\u294A",
      "luruhar": "\u2966",
      "lvertneqq": "\u2268\uFE00",
      "lvnE": "\u2268\uFE00",
      "macr": "\xAF",
      "male": "\u2642",
      "malt": "\u2720",
      "maltese": "\u2720",
      "Map": "\u2905",
      "map": "\u21A6",
      "mapsto": "\u21A6",
      "mapstodown": "\u21A7",
      "mapstoleft": "\u21A4",
      "mapstoup": "\u21A5",
      "marker": "\u25AE",
      "mcomma": "\u2A29",
      "Mcy": "\u041C",
      "mcy": "\u043C",
      "mdash": "\u2014",
      "mDDot": "\u223A",
      "measuredangle": "\u2221",
      "MediumSpace": "\u205F",
      "Mellintrf": "\u2133",
      "Mfr": "\u{1D510}",
      "mfr": "\u{1D52A}",
      "mho": "\u2127",
      "micro": "\xB5",
      "mid": "\u2223",
      "midast": "*",
      "midcir": "\u2AF0",
      "middot": "\xB7",
      "minus": "\u2212",
      "minusb": "\u229F",
      "minusd": "\u2238",
      "minusdu": "\u2A2A",
      "MinusPlus": "\u2213",
      "mlcp": "\u2ADB",
      "mldr": "\u2026",
      "mnplus": "\u2213",
      "models": "\u22A7",
      "Mopf": "\u{1D544}",
      "mopf": "\u{1D55E}",
      "mp": "\u2213",
      "Mscr": "\u2133",
      "mscr": "\u{1D4C2}",
      "mstpos": "\u223E",
      "Mu": "\u039C",
      "mu": "\u03BC",
      "multimap": "\u22B8",
      "mumap": "\u22B8",
      "nabla": "\u2207",
      "Nacute": "\u0143",
      "nacute": "\u0144",
      "nang": "\u2220\u20D2",
      "nap": "\u2249",
      "napE": "\u2A70\u0338",
      "napid": "\u224B\u0338",
      "napos": "\u0149",
      "napprox": "\u2249",
      "natur": "\u266E",
      "natural": "\u266E",
      "naturals": "\u2115",
      "nbsp": "\xA0",
      "nbump": "\u224E\u0338",
      "nbumpe": "\u224F\u0338",
      "ncap": "\u2A43",
      "Ncaron": "\u0147",
      "ncaron": "\u0148",
      "Ncedil": "\u0145",
      "ncedil": "\u0146",
      "ncong": "\u2247",
      "ncongdot": "\u2A6D\u0338",
      "ncup": "\u2A42",
      "Ncy": "\u041D",
      "ncy": "\u043D",
      "ndash": "\u2013",
      "ne": "\u2260",
      "nearhk": "\u2924",
      "neArr": "\u21D7",
      "nearr": "\u2197",
      "nearrow": "\u2197",
      "nedot": "\u2250\u0338",
      "NegativeMediumSpace": "\u200B",
      "NegativeThickSpace": "\u200B",
      "NegativeThinSpace": "\u200B",
      "NegativeVeryThinSpace": "\u200B",
      "nequiv": "\u2262",
      "nesear": "\u2928",
      "nesim": "\u2242\u0338",
      "NestedGreaterGreater": "\u226B",
      "NestedLessLess": "\u226A",
      "NewLine": "\n",
      "nexist": "\u2204",
      "nexists": "\u2204",
      "Nfr": "\u{1D511}",
      "nfr": "\u{1D52B}",
      "ngE": "\u2267\u0338",
      "nge": "\u2271",
      "ngeq": "\u2271",
      "ngeqq": "\u2267\u0338",
      "ngeqslant": "\u2A7E\u0338",
      "nges": "\u2A7E\u0338",
      "nGg": "\u22D9\u0338",
      "ngsim": "\u2275",
      "nGt": "\u226B\u20D2",
      "ngt": "\u226F",
      "ngtr": "\u226F",
      "nGtv": "\u226B\u0338",
      "nhArr": "\u21CE",
      "nharr": "\u21AE",
      "nhpar": "\u2AF2",
      "ni": "\u220B",
      "nis": "\u22FC",
      "nisd": "\u22FA",
      "niv": "\u220B",
      "NJcy": "\u040A",
      "njcy": "\u045A",
      "nlArr": "\u21CD",
      "nlarr": "\u219A",
      "nldr": "\u2025",
      "nlE": "\u2266\u0338",
      "nle": "\u2270",
      "nLeftarrow": "\u21CD",
      "nleftarrow": "\u219A",
      "nLeftrightarrow": "\u21CE",
      "nleftrightarrow": "\u21AE",
      "nleq": "\u2270",
      "nleqq": "\u2266\u0338",
      "nleqslant": "\u2A7D\u0338",
      "nles": "\u2A7D\u0338",
      "nless": "\u226E",
      "nLl": "\u22D8\u0338",
      "nlsim": "\u2274",
      "nLt": "\u226A\u20D2",
      "nlt": "\u226E",
      "nltri": "\u22EA",
      "nltrie": "\u22EC",
      "nLtv": "\u226A\u0338",
      "nmid": "\u2224",
      "NoBreak": "\u2060",
      "NonBreakingSpace": "\xA0",
      "Nopf": "\u2115",
      "nopf": "\u{1D55F}",
      "Not": "\u2AEC",
      "not": "\xAC",
      "NotCongruent": "\u2262",
      "NotCupCap": "\u226D",
      "NotDoubleVerticalBar": "\u2226",
      "NotElement": "\u2209",
      "NotEqual": "\u2260",
      "NotEqualTilde": "\u2242\u0338",
      "NotExists": "\u2204",
      "NotGreater": "\u226F",
      "NotGreaterEqual": "\u2271",
      "NotGreaterFullEqual": "\u2267\u0338",
      "NotGreaterGreater": "\u226B\u0338",
      "NotGreaterLess": "\u2279",
      "NotGreaterSlantEqual": "\u2A7E\u0338",
      "NotGreaterTilde": "\u2275",
      "NotHumpDownHump": "\u224E\u0338",
      "NotHumpEqual": "\u224F\u0338",
      "notin": "\u2209",
      "notindot": "\u22F5\u0338",
      "notinE": "\u22F9\u0338",
      "notinva": "\u2209",
      "notinvb": "\u22F7",
      "notinvc": "\u22F6",
      "NotLeftTriangle": "\u22EA",
      "NotLeftTriangleBar": "\u29CF\u0338",
      "NotLeftTriangleEqual": "\u22EC",
      "NotLess": "\u226E",
      "NotLessEqual": "\u2270",
      "NotLessGreater": "\u2278",
      "NotLessLess": "\u226A\u0338",
      "NotLessSlantEqual": "\u2A7D\u0338",
      "NotLessTilde": "\u2274",
      "NotNestedGreaterGreater": "\u2AA2\u0338",
      "NotNestedLessLess": "\u2AA1\u0338",
      "notni": "\u220C",
      "notniva": "\u220C",
      "notnivb": "\u22FE",
      "notnivc": "\u22FD",
      "NotPrecedes": "\u2280",
      "NotPrecedesEqual": "\u2AAF\u0338",
      "NotPrecedesSlantEqual": "\u22E0",
      "NotReverseElement": "\u220C",
      "NotRightTriangle": "\u22EB",
      "NotRightTriangleBar": "\u29D0\u0338",
      "NotRightTriangleEqual": "\u22ED",
      "NotSquareSubset": "\u228F\u0338",
      "NotSquareSubsetEqual": "\u22E2",
      "NotSquareSuperset": "\u2290\u0338",
      "NotSquareSupersetEqual": "\u22E3",
      "NotSubset": "\u2282\u20D2",
      "NotSubsetEqual": "\u2288",
      "NotSucceeds": "\u2281",
      "NotSucceedsEqual": "\u2AB0\u0338",
      "NotSucceedsSlantEqual": "\u22E1",
      "NotSucceedsTilde": "\u227F\u0338",
      "NotSuperset": "\u2283\u20D2",
      "NotSupersetEqual": "\u2289",
      "NotTilde": "\u2241",
      "NotTildeEqual": "\u2244",
      "NotTildeFullEqual": "\u2247",
      "NotTildeTilde": "\u2249",
      "NotVerticalBar": "\u2224",
      "npar": "\u2226",
      "nparallel": "\u2226",
      "nparsl": "\u2AFD\u20E5",
      "npart": "\u2202\u0338",
      "npolint": "\u2A14",
      "npr": "\u2280",
      "nprcue": "\u22E0",
      "npre": "\u2AAF\u0338",
      "nprec": "\u2280",
      "npreceq": "\u2AAF\u0338",
      "nrArr": "\u21CF",
      "nrarr": "\u219B",
      "nrarrc": "\u2933\u0338",
      "nrarrw": "\u219D\u0338",
      "nRightarrow": "\u21CF",
      "nrightarrow": "\u219B",
      "nrtri": "\u22EB",
      "nrtrie": "\u22ED",
      "nsc": "\u2281",
      "nsccue": "\u22E1",
      "nsce": "\u2AB0\u0338",
      "Nscr": "\u{1D4A9}",
      "nscr": "\u{1D4C3}",
      "nshortmid": "\u2224",
      "nshortparallel": "\u2226",
      "nsim": "\u2241",
      "nsime": "\u2244",
      "nsimeq": "\u2244",
      "nsmid": "\u2224",
      "nspar": "\u2226",
      "nsqsube": "\u22E2",
      "nsqsupe": "\u22E3",
      "nsub": "\u2284",
      "nsubE": "\u2AC5\u0338",
      "nsube": "\u2288",
      "nsubset": "\u2282\u20D2",
      "nsubseteq": "\u2288",
      "nsubseteqq": "\u2AC5\u0338",
      "nsucc": "\u2281",
      "nsucceq": "\u2AB0\u0338",
      "nsup": "\u2285",
      "nsupE": "\u2AC6\u0338",
      "nsupe": "\u2289",
      "nsupset": "\u2283\u20D2",
      "nsupseteq": "\u2289",
      "nsupseteqq": "\u2AC6\u0338",
      "ntgl": "\u2279",
      "Ntilde": "\xD1",
      "ntilde": "\xF1",
      "ntlg": "\u2278",
      "ntriangleleft": "\u22EA",
      "ntrianglelefteq": "\u22EC",
      "ntriangleright": "\u22EB",
      "ntrianglerighteq": "\u22ED",
      "Nu": "\u039D",
      "nu": "\u03BD",
      "num": "#",
      "numero": "\u2116",
      "numsp": "\u2007",
      "nvap": "\u224D\u20D2",
      "nVDash": "\u22AF",
      "nVdash": "\u22AE",
      "nvDash": "\u22AD",
      "nvdash": "\u22AC",
      "nvge": "\u2265\u20D2",
      "nvgt": ">\u20D2",
      "nvHarr": "\u2904",
      "nvinfin": "\u29DE",
      "nvlArr": "\u2902",
      "nvle": "\u2264\u20D2",
      "nvlt": "<\u20D2",
      "nvltrie": "\u22B4\u20D2",
      "nvrArr": "\u2903",
      "nvrtrie": "\u22B5\u20D2",
      "nvsim": "\u223C\u20D2",
      "nwarhk": "\u2923",
      "nwArr": "\u21D6",
      "nwarr": "\u2196",
      "nwarrow": "\u2196",
      "nwnear": "\u2927",
      "Oacute": "\xD3",
      "oacute": "\xF3",
      "oast": "\u229B",
      "ocir": "\u229A",
      "Ocirc": "\xD4",
      "ocirc": "\xF4",
      "Ocy": "\u041E",
      "ocy": "\u043E",
      "odash": "\u229D",
      "Odblac": "\u0150",
      "odblac": "\u0151",
      "odiv": "\u2A38",
      "odot": "\u2299",
      "odsold": "\u29BC",
      "OElig": "\u0152",
      "oelig": "\u0153",
      "ofcir": "\u29BF",
      "Ofr": "\u{1D512}",
      "ofr": "\u{1D52C}",
      "ogon": "\u02DB",
      "Ograve": "\xD2",
      "ograve": "\xF2",
      "ogt": "\u29C1",
      "ohbar": "\u29B5",
      "ohm": "\u03A9",
      "oint": "\u222E",
      "olarr": "\u21BA",
      "olcir": "\u29BE",
      "olcross": "\u29BB",
      "oline": "\u203E",
      "olt": "\u29C0",
      "Omacr": "\u014C",
      "omacr": "\u014D",
      "Omega": "\u03A9",
      "omega": "\u03C9",
      "Omicron": "\u039F",
      "omicron": "\u03BF",
      "omid": "\u29B6",
      "ominus": "\u2296",
      "Oopf": "\u{1D546}",
      "oopf": "\u{1D560}",
      "opar": "\u29B7",
      "OpenCurlyDoubleQuote": "\u201C",
      "OpenCurlyQuote": "\u2018",
      "operp": "\u29B9",
      "oplus": "\u2295",
      "Or": "\u2A54",
      "or": "\u2228",
      "orarr": "\u21BB",
      "ord": "\u2A5D",
      "order": "\u2134",
      "orderof": "\u2134",
      "ordf": "\xAA",
      "ordm": "\xBA",
      "origof": "\u22B6",
      "oror": "\u2A56",
      "orslope": "\u2A57",
      "orv": "\u2A5B",
      "oS": "\u24C8",
      "Oscr": "\u{1D4AA}",
      "oscr": "\u2134",
      "Oslash": "\xD8",
      "oslash": "\xF8",
      "osol": "\u2298",
      "Otilde": "\xD5",
      "otilde": "\xF5",
      "Otimes": "\u2A37",
      "otimes": "\u2297",
      "otimesas": "\u2A36",
      "Ouml": "\xD6",
      "ouml": "\xF6",
      "ovbar": "\u233D",
      "OverBar": "\u203E",
      "OverBrace": "\u23DE",
      "OverBracket": "\u23B4",
      "OverParenthesis": "\u23DC",
      "par": "\u2225",
      "para": "\xB6",
      "parallel": "\u2225",
      "parsim": "\u2AF3",
      "parsl": "\u2AFD",
      "part": "\u2202",
      "PartialD": "\u2202",
      "Pcy": "\u041F",
      "pcy": "\u043F",
      "percnt": "%",
      "period": ".",
      "permil": "\u2030",
      "perp": "\u22A5",
      "pertenk": "\u2031",
      "Pfr": "\u{1D513}",
      "pfr": "\u{1D52D}",
      "Phi": "\u03A6",
      "phi": "\u03C6",
      "phiv": "\u03D5",
      "phmmat": "\u2133",
      "phone": "\u260E",
      "Pi": "\u03A0",
      "pi": "\u03C0",
      "pitchfork": "\u22D4",
      "piv": "\u03D6",
      "planck": "\u210F",
      "planckh": "\u210E",
      "plankv": "\u210F",
      "plus": "+",
      "plusacir": "\u2A23",
      "plusb": "\u229E",
      "pluscir": "\u2A22",
      "plusdo": "\u2214",
      "plusdu": "\u2A25",
      "pluse": "\u2A72",
      "PlusMinus": "\xB1",
      "plusmn": "\xB1",
      "plussim": "\u2A26",
      "plustwo": "\u2A27",
      "pm": "\xB1",
      "Poincareplane": "\u210C",
      "pointint": "\u2A15",
      "Popf": "\u2119",
      "popf": "\u{1D561}",
      "pound": "\xA3",
      "Pr": "\u2ABB",
      "pr": "\u227A",
      "prap": "\u2AB7",
      "prcue": "\u227C",
      "prE": "\u2AB3",
      "pre": "\u2AAF",
      "prec": "\u227A",
      "precapprox": "\u2AB7",
      "preccurlyeq": "\u227C",
      "Precedes": "\u227A",
      "PrecedesEqual": "\u2AAF",
      "PrecedesSlantEqual": "\u227C",
      "PrecedesTilde": "\u227E",
      "preceq": "\u2AAF",
      "precnapprox": "\u2AB9",
      "precneqq": "\u2AB5",
      "precnsim": "\u22E8",
      "precsim": "\u227E",
      "Prime": "\u2033",
      "prime": "\u2032",
      "primes": "\u2119",
      "prnap": "\u2AB9",
      "prnE": "\u2AB5",
      "prnsim": "\u22E8",
      "prod": "\u220F",
      "Product": "\u220F",
      "profalar": "\u232E",
      "profline": "\u2312",
      "profsurf": "\u2313",
      "prop": "\u221D",
      "Proportion": "\u2237",
      "Proportional": "\u221D",
      "propto": "\u221D",
      "prsim": "\u227E",
      "prurel": "\u22B0",
      "Pscr": "\u{1D4AB}",
      "pscr": "\u{1D4C5}",
      "Psi": "\u03A8",
      "psi": "\u03C8",
      "puncsp": "\u2008",
      "Qfr": "\u{1D514}",
      "qfr": "\u{1D52E}",
      "qint": "\u2A0C",
      "Qopf": "\u211A",
      "qopf": "\u{1D562}",
      "qprime": "\u2057",
      "Qscr": "\u{1D4AC}",
      "qscr": "\u{1D4C6}",
      "quaternions": "\u210D",
      "quatint": "\u2A16",
      "quest": "?",
      "questeq": "\u225F",
      "QUOT": '"',
      "quot": '"',
      "rAarr": "\u21DB",
      "race": "\u223D\u0331",
      "Racute": "\u0154",
      "racute": "\u0155",
      "radic": "\u221A",
      "raemptyv": "\u29B3",
      "Rang": "\u27EB",
      "rang": "\u27E9",
      "rangd": "\u2992",
      "range": "\u29A5",
      "rangle": "\u27E9",
      "raquo": "\xBB",
      "Rarr": "\u21A0",
      "rArr": "\u21D2",
      "rarr": "\u2192",
      "rarrap": "\u2975",
      "rarrb": "\u21E5",
      "rarrbfs": "\u2920",
      "rarrc": "\u2933",
      "rarrfs": "\u291E",
      "rarrhk": "\u21AA",
      "rarrlp": "\u21AC",
      "rarrpl": "\u2945",
      "rarrsim": "\u2974",
      "Rarrtl": "\u2916",
      "rarrtl": "\u21A3",
      "rarrw": "\u219D",
      "rAtail": "\u291C",
      "ratail": "\u291A",
      "ratio": "\u2236",
      "rationals": "\u211A",
      "RBarr": "\u2910",
      "rBarr": "\u290F",
      "rbarr": "\u290D",
      "rbbrk": "\u2773",
      "rbrace": "}",
      "rbrack": "]",
      "rbrke": "\u298C",
      "rbrksld": "\u298E",
      "rbrkslu": "\u2990",
      "Rcaron": "\u0158",
      "rcaron": "\u0159",
      "Rcedil": "\u0156",
      "rcedil": "\u0157",
      "rceil": "\u2309",
      "rcub": "}",
      "Rcy": "\u0420",
      "rcy": "\u0440",
      "rdca": "\u2937",
      "rdldhar": "\u2969",
      "rdquo": "\u201D",
      "rdquor": "\u201D",
      "rdsh": "\u21B3",
      "Re": "\u211C",
      "real": "\u211C",
      "realine": "\u211B",
      "realpart": "\u211C",
      "reals": "\u211D",
      "rect": "\u25AD",
      "REG": "\xAE",
      "reg": "\xAE",
      "ReverseElement": "\u220B",
      "ReverseEquilibrium": "\u21CB",
      "ReverseUpEquilibrium": "\u296F",
      "rfisht": "\u297D",
      "rfloor": "\u230B",
      "Rfr": "\u211C",
      "rfr": "\u{1D52F}",
      "rHar": "\u2964",
      "rhard": "\u21C1",
      "rharu": "\u21C0",
      "rharul": "\u296C",
      "Rho": "\u03A1",
      "rho": "\u03C1",
      "rhov": "\u03F1",
      "RightAngleBracket": "\u27E9",
      "RightArrow": "\u2192",
      "Rightarrow": "\u21D2",
      "rightarrow": "\u2192",
      "RightArrowBar": "\u21E5",
      "RightArrowLeftArrow": "\u21C4",
      "rightarrowtail": "\u21A3",
      "RightCeiling": "\u2309",
      "RightDoubleBracket": "\u27E7",
      "RightDownTeeVector": "\u295D",
      "RightDownVector": "\u21C2",
      "RightDownVectorBar": "\u2955",
      "RightFloor": "\u230B",
      "rightharpoondown": "\u21C1",
      "rightharpoonup": "\u21C0",
      "rightleftarrows": "\u21C4",
      "rightleftharpoons": "\u21CC",
      "rightrightarrows": "\u21C9",
      "rightsquigarrow": "\u219D",
      "RightTee": "\u22A2",
      "RightTeeArrow": "\u21A6",
      "RightTeeVector": "\u295B",
      "rightthreetimes": "\u22CC",
      "RightTriangle": "\u22B3",
      "RightTriangleBar": "\u29D0",
      "RightTriangleEqual": "\u22B5",
      "RightUpDownVector": "\u294F",
      "RightUpTeeVector": "\u295C",
      "RightUpVector": "\u21BE",
      "RightUpVectorBar": "\u2954",
      "RightVector": "\u21C0",
      "RightVectorBar": "\u2953",
      "ring": "\u02DA",
      "risingdotseq": "\u2253",
      "rlarr": "\u21C4",
      "rlhar": "\u21CC",
      "rlm": "\u200F",
      "rmoust": "\u23B1",
      "rmoustache": "\u23B1",
      "rnmid": "\u2AEE",
      "roang": "\u27ED",
      "roarr": "\u21FE",
      "robrk": "\u27E7",
      "ropar": "\u2986",
      "Ropf": "\u211D",
      "ropf": "\u{1D563}",
      "roplus": "\u2A2E",
      "rotimes": "\u2A35",
      "RoundImplies": "\u2970",
      "rpar": ")",
      "rpargt": "\u2994",
      "rppolint": "\u2A12",
      "rrarr": "\u21C9",
      "Rrightarrow": "\u21DB",
      "rsaquo": "\u203A",
      "Rscr": "\u211B",
      "rscr": "\u{1D4C7}",
      "Rsh": "\u21B1",
      "rsh": "\u21B1",
      "rsqb": "]",
      "rsquo": "\u2019",
      "rsquor": "\u2019",
      "rthree": "\u22CC",
      "rtimes": "\u22CA",
      "rtri": "\u25B9",
      "rtrie": "\u22B5",
      "rtrif": "\u25B8",
      "rtriltri": "\u29CE",
      "RuleDelayed": "\u29F4",
      "ruluhar": "\u2968",
      "rx": "\u211E",
      "Sacute": "\u015A",
      "sacute": "\u015B",
      "sbquo": "\u201A",
      "Sc": "\u2ABC",
      "sc": "\u227B",
      "scap": "\u2AB8",
      "Scaron": "\u0160",
      "scaron": "\u0161",
      "sccue": "\u227D",
      "scE": "\u2AB4",
      "sce": "\u2AB0",
      "Scedil": "\u015E",
      "scedil": "\u015F",
      "Scirc": "\u015C",
      "scirc": "\u015D",
      "scnap": "\u2ABA",
      "scnE": "\u2AB6",
      "scnsim": "\u22E9",
      "scpolint": "\u2A13",
      "scsim": "\u227F",
      "Scy": "\u0421",
      "scy": "\u0441",
      "sdot": "\u22C5",
      "sdotb": "\u22A1",
      "sdote": "\u2A66",
      "searhk": "\u2925",
      "seArr": "\u21D8",
      "searr": "\u2198",
      "searrow": "\u2198",
      "sect": "\xA7",
      "semi": ";",
      "seswar": "\u2929",
      "setminus": "\u2216",
      "setmn": "\u2216",
      "sext": "\u2736",
      "Sfr": "\u{1D516}",
      "sfr": "\u{1D530}",
      "sfrown": "\u2322",
      "sharp": "\u266F",
      "SHCHcy": "\u0429",
      "shchcy": "\u0449",
      "SHcy": "\u0428",
      "shcy": "\u0448",
      "ShortDownArrow": "\u2193",
      "ShortLeftArrow": "\u2190",
      "shortmid": "\u2223",
      "shortparallel": "\u2225",
      "ShortRightArrow": "\u2192",
      "ShortUpArrow": "\u2191",
      "shy": "\xAD",
      "Sigma": "\u03A3",
      "sigma": "\u03C3",
      "sigmaf": "\u03C2",
      "sigmav": "\u03C2",
      "sim": "\u223C",
      "simdot": "\u2A6A",
      "sime": "\u2243",
      "simeq": "\u2243",
      "simg": "\u2A9E",
      "simgE": "\u2AA0",
      "siml": "\u2A9D",
      "simlE": "\u2A9F",
      "simne": "\u2246",
      "simplus": "\u2A24",
      "simrarr": "\u2972",
      "slarr": "\u2190",
      "SmallCircle": "\u2218",
      "smallsetminus": "\u2216",
      "smashp": "\u2A33",
      "smeparsl": "\u29E4",
      "smid": "\u2223",
      "smile": "\u2323",
      "smt": "\u2AAA",
      "smte": "\u2AAC",
      "smtes": "\u2AAC\uFE00",
      "SOFTcy": "\u042C",
      "softcy": "\u044C",
      "sol": "/",
      "solb": "\u29C4",
      "solbar": "\u233F",
      "Sopf": "\u{1D54A}",
      "sopf": "\u{1D564}",
      "spades": "\u2660",
      "spadesuit": "\u2660",
      "spar": "\u2225",
      "sqcap": "\u2293",
      "sqcaps": "\u2293\uFE00",
      "sqcup": "\u2294",
      "sqcups": "\u2294\uFE00",
      "Sqrt": "\u221A",
      "sqsub": "\u228F",
      "sqsube": "\u2291",
      "sqsubset": "\u228F",
      "sqsubseteq": "\u2291",
      "sqsup": "\u2290",
      "sqsupe": "\u2292",
      "sqsupset": "\u2290",
      "sqsupseteq": "\u2292",
      "squ": "\u25A1",
      "Square": "\u25A1",
      "square": "\u25A1",
      "SquareIntersection": "\u2293",
      "SquareSubset": "\u228F",
      "SquareSubsetEqual": "\u2291",
      "SquareSuperset": "\u2290",
      "SquareSupersetEqual": "\u2292",
      "SquareUnion": "\u2294",
      "squarf": "\u25AA",
      "squf": "\u25AA",
      "srarr": "\u2192",
      "Sscr": "\u{1D4AE}",
      "sscr": "\u{1D4C8}",
      "ssetmn": "\u2216",
      "ssmile": "\u2323",
      "sstarf": "\u22C6",
      "Star": "\u22C6",
      "star": "\u2606",
      "starf": "\u2605",
      "straightepsilon": "\u03F5",
      "straightphi": "\u03D5",
      "strns": "\xAF",
      "Sub": "\u22D0",
      "sub": "\u2282",
      "subdot": "\u2ABD",
      "subE": "\u2AC5",
      "sube": "\u2286",
      "subedot": "\u2AC3",
      "submult": "\u2AC1",
      "subnE": "\u2ACB",
      "subne": "\u228A",
      "subplus": "\u2ABF",
      "subrarr": "\u2979",
      "Subset": "\u22D0",
      "subset": "\u2282",
      "subseteq": "\u2286",
      "subseteqq": "\u2AC5",
      "SubsetEqual": "\u2286",
      "subsetneq": "\u228A",
      "subsetneqq": "\u2ACB",
      "subsim": "\u2AC7",
      "subsub": "\u2AD5",
      "subsup": "\u2AD3",
      "succ": "\u227B",
      "succapprox": "\u2AB8",
      "succcurlyeq": "\u227D",
      "Succeeds": "\u227B",
      "SucceedsEqual": "\u2AB0",
      "SucceedsSlantEqual": "\u227D",
      "SucceedsTilde": "\u227F",
      "succeq": "\u2AB0",
      "succnapprox": "\u2ABA",
      "succneqq": "\u2AB6",
      "succnsim": "\u22E9",
      "succsim": "\u227F",
      "SuchThat": "\u220B",
      "Sum": "\u2211",
      "sum": "\u2211",
      "sung": "\u266A",
      "Sup": "\u22D1",
      "sup": "\u2283",
      "sup1": "\xB9",
      "sup2": "\xB2",
      "sup3": "\xB3",
      "supdot": "\u2ABE",
      "supdsub": "\u2AD8",
      "supE": "\u2AC6",
      "supe": "\u2287",
      "supedot": "\u2AC4",
      "Superset": "\u2283",
      "SupersetEqual": "\u2287",
      "suphsol": "\u27C9",
      "suphsub": "\u2AD7",
      "suplarr": "\u297B",
      "supmult": "\u2AC2",
      "supnE": "\u2ACC",
      "supne": "\u228B",
      "supplus": "\u2AC0",
      "Supset": "\u22D1",
      "supset": "\u2283",
      "supseteq": "\u2287",
      "supseteqq": "\u2AC6",
      "supsetneq": "\u228B",
      "supsetneqq": "\u2ACC",
      "supsim": "\u2AC8",
      "supsub": "\u2AD4",
      "supsup": "\u2AD6",
      "swarhk": "\u2926",
      "swArr": "\u21D9",
      "swarr": "\u2199",
      "swarrow": "\u2199",
      "swnwar": "\u292A",
      "szlig": "\xDF",
      "Tab": "	",
      "target": "\u2316",
      "Tau": "\u03A4",
      "tau": "\u03C4",
      "tbrk": "\u23B4",
      "Tcaron": "\u0164",
      "tcaron": "\u0165",
      "Tcedil": "\u0162",
      "tcedil": "\u0163",
      "Tcy": "\u0422",
      "tcy": "\u0442",
      "tdot": "\u20DB",
      "telrec": "\u2315",
      "Tfr": "\u{1D517}",
      "tfr": "\u{1D531}",
      "there4": "\u2234",
      "Therefore": "\u2234",
      "therefore": "\u2234",
      "Theta": "\u0398",
      "theta": "\u03B8",
      "thetasym": "\u03D1",
      "thetav": "\u03D1",
      "thickapprox": "\u2248",
      "thicksim": "\u223C",
      "ThickSpace": "\u205F\u200A",
      "thinsp": "\u2009",
      "ThinSpace": "\u2009",
      "thkap": "\u2248",
      "thksim": "\u223C",
      "THORN": "\xDE",
      "thorn": "\xFE",
      "Tilde": "\u223C",
      "tilde": "\u02DC",
      "TildeEqual": "\u2243",
      "TildeFullEqual": "\u2245",
      "TildeTilde": "\u2248",
      "times": "\xD7",
      "timesb": "\u22A0",
      "timesbar": "\u2A31",
      "timesd": "\u2A30",
      "tint": "\u222D",
      "toea": "\u2928",
      "top": "\u22A4",
      "topbot": "\u2336",
      "topcir": "\u2AF1",
      "Topf": "\u{1D54B}",
      "topf": "\u{1D565}",
      "topfork": "\u2ADA",
      "tosa": "\u2929",
      "tprime": "\u2034",
      "TRADE": "\u2122",
      "trade": "\u2122",
      "triangle": "\u25B5",
      "triangledown": "\u25BF",
      "triangleleft": "\u25C3",
      "trianglelefteq": "\u22B4",
      "triangleq": "\u225C",
      "triangleright": "\u25B9",
      "trianglerighteq": "\u22B5",
      "tridot": "\u25EC",
      "trie": "\u225C",
      "triminus": "\u2A3A",
      "TripleDot": "\u20DB",
      "triplus": "\u2A39",
      "trisb": "\u29CD",
      "tritime": "\u2A3B",
      "trpezium": "\u23E2",
      "Tscr": "\u{1D4AF}",
      "tscr": "\u{1D4C9}",
      "TScy": "\u0426",
      "tscy": "\u0446",
      "TSHcy": "\u040B",
      "tshcy": "\u045B",
      "Tstrok": "\u0166",
      "tstrok": "\u0167",
      "twixt": "\u226C",
      "twoheadleftarrow": "\u219E",
      "twoheadrightarrow": "\u21A0",
      "Uacute": "\xDA",
      "uacute": "\xFA",
      "Uarr": "\u219F",
      "uArr": "\u21D1",
      "uarr": "\u2191",
      "Uarrocir": "\u2949",
      "Ubrcy": "\u040E",
      "ubrcy": "\u045E",
      "Ubreve": "\u016C",
      "ubreve": "\u016D",
      "Ucirc": "\xDB",
      "ucirc": "\xFB",
      "Ucy": "\u0423",
      "ucy": "\u0443",
      "udarr": "\u21C5",
      "Udblac": "\u0170",
      "udblac": "\u0171",
      "udhar": "\u296E",
      "ufisht": "\u297E",
      "Ufr": "\u{1D518}",
      "ufr": "\u{1D532}",
      "Ugrave": "\xD9",
      "ugrave": "\xF9",
      "uHar": "\u2963",
      "uharl": "\u21BF",
      "uharr": "\u21BE",
      "uhblk": "\u2580",
      "ulcorn": "\u231C",
      "ulcorner": "\u231C",
      "ulcrop": "\u230F",
      "ultri": "\u25F8",
      "Umacr": "\u016A",
      "umacr": "\u016B",
      "uml": "\xA8",
      "UnderBar": "_",
      "UnderBrace": "\u23DF",
      "UnderBracket": "\u23B5",
      "UnderParenthesis": "\u23DD",
      "Union": "\u22C3",
      "UnionPlus": "\u228E",
      "Uogon": "\u0172",
      "uogon": "\u0173",
      "Uopf": "\u{1D54C}",
      "uopf": "\u{1D566}",
      "UpArrow": "\u2191",
      "Uparrow": "\u21D1",
      "uparrow": "\u2191",
      "UpArrowBar": "\u2912",
      "UpArrowDownArrow": "\u21C5",
      "UpDownArrow": "\u2195",
      "Updownarrow": "\u21D5",
      "updownarrow": "\u2195",
      "UpEquilibrium": "\u296E",
      "upharpoonleft": "\u21BF",
      "upharpoonright": "\u21BE",
      "uplus": "\u228E",
      "UpperLeftArrow": "\u2196",
      "UpperRightArrow": "\u2197",
      "Upsi": "\u03D2",
      "upsi": "\u03C5",
      "upsih": "\u03D2",
      "Upsilon": "\u03A5",
      "upsilon": "\u03C5",
      "UpTee": "\u22A5",
      "UpTeeArrow": "\u21A5",
      "upuparrows": "\u21C8",
      "urcorn": "\u231D",
      "urcorner": "\u231D",
      "urcrop": "\u230E",
      "Uring": "\u016E",
      "uring": "\u016F",
      "urtri": "\u25F9",
      "Uscr": "\u{1D4B0}",
      "uscr": "\u{1D4CA}",
      "utdot": "\u22F0",
      "Utilde": "\u0168",
      "utilde": "\u0169",
      "utri": "\u25B5",
      "utrif": "\u25B4",
      "uuarr": "\u21C8",
      "Uuml": "\xDC",
      "uuml": "\xFC",
      "uwangle": "\u29A7",
      "vangrt": "\u299C",
      "varepsilon": "\u03F5",
      "varkappa": "\u03F0",
      "varnothing": "\u2205",
      "varphi": "\u03D5",
      "varpi": "\u03D6",
      "varpropto": "\u221D",
      "vArr": "\u21D5",
      "varr": "\u2195",
      "varrho": "\u03F1",
      "varsigma": "\u03C2",
      "varsubsetneq": "\u228A\uFE00",
      "varsubsetneqq": "\u2ACB\uFE00",
      "varsupsetneq": "\u228B\uFE00",
      "varsupsetneqq": "\u2ACC\uFE00",
      "vartheta": "\u03D1",
      "vartriangleleft": "\u22B2",
      "vartriangleright": "\u22B3",
      "Vbar": "\u2AEB",
      "vBar": "\u2AE8",
      "vBarv": "\u2AE9",
      "Vcy": "\u0412",
      "vcy": "\u0432",
      "VDash": "\u22AB",
      "Vdash": "\u22A9",
      "vDash": "\u22A8",
      "vdash": "\u22A2",
      "Vdashl": "\u2AE6",
      "Vee": "\u22C1",
      "vee": "\u2228",
      "veebar": "\u22BB",
      "veeeq": "\u225A",
      "vellip": "\u22EE",
      "Verbar": "\u2016",
      "verbar": "|",
      "Vert": "\u2016",
      "vert": "|",
      "VerticalBar": "\u2223",
      "VerticalLine": "|",
      "VerticalSeparator": "\u2758",
      "VerticalTilde": "\u2240",
      "VeryThinSpace": "\u200A",
      "Vfr": "\u{1D519}",
      "vfr": "\u{1D533}",
      "vltri": "\u22B2",
      "vnsub": "\u2282\u20D2",
      "vnsup": "\u2283\u20D2",
      "Vopf": "\u{1D54D}",
      "vopf": "\u{1D567}",
      "vprop": "\u221D",
      "vrtri": "\u22B3",
      "Vscr": "\u{1D4B1}",
      "vscr": "\u{1D4CB}",
      "vsubnE": "\u2ACB\uFE00",
      "vsubne": "\u228A\uFE00",
      "vsupnE": "\u2ACC\uFE00",
      "vsupne": "\u228B\uFE00",
      "Vvdash": "\u22AA",
      "vzigzag": "\u299A",
      "Wcirc": "\u0174",
      "wcirc": "\u0175",
      "wedbar": "\u2A5F",
      "Wedge": "\u22C0",
      "wedge": "\u2227",
      "wedgeq": "\u2259",
      "weierp": "\u2118",
      "Wfr": "\u{1D51A}",
      "wfr": "\u{1D534}",
      "Wopf": "\u{1D54E}",
      "wopf": "\u{1D568}",
      "wp": "\u2118",
      "wr": "\u2240",
      "wreath": "\u2240",
      "Wscr": "\u{1D4B2}",
      "wscr": "\u{1D4CC}",
      "xcap": "\u22C2",
      "xcirc": "\u25EF",
      "xcup": "\u22C3",
      "xdtri": "\u25BD",
      "Xfr": "\u{1D51B}",
      "xfr": "\u{1D535}",
      "xhArr": "\u27FA",
      "xharr": "\u27F7",
      "Xi": "\u039E",
      "xi": "\u03BE",
      "xlArr": "\u27F8",
      "xlarr": "\u27F5",
      "xmap": "\u27FC",
      "xnis": "\u22FB",
      "xodot": "\u2A00",
      "Xopf": "\u{1D54F}",
      "xopf": "\u{1D569}",
      "xoplus": "\u2A01",
      "xotime": "\u2A02",
      "xrArr": "\u27F9",
      "xrarr": "\u27F6",
      "Xscr": "\u{1D4B3}",
      "xscr": "\u{1D4CD}",
      "xsqcup": "\u2A06",
      "xuplus": "\u2A04",
      "xutri": "\u25B3",
      "xvee": "\u22C1",
      "xwedge": "\u22C0",
      "Yacute": "\xDD",
      "yacute": "\xFD",
      "YAcy": "\u042F",
      "yacy": "\u044F",
      "Ycirc": "\u0176",
      "ycirc": "\u0177",
      "Ycy": "\u042B",
      "ycy": "\u044B",
      "yen": "\xA5",
      "Yfr": "\u{1D51C}",
      "yfr": "\u{1D536}",
      "YIcy": "\u0407",
      "yicy": "\u0457",
      "Yopf": "\u{1D550}",
      "yopf": "\u{1D56A}",
      "Yscr": "\u{1D4B4}",
      "yscr": "\u{1D4CE}",
      "YUcy": "\u042E",
      "yucy": "\u044E",
      "Yuml": "\u0178",
      "yuml": "\xFF",
      "Zacute": "\u0179",
      "zacute": "\u017A",
      "Zcaron": "\u017D",
      "zcaron": "\u017E",
      "Zcy": "\u0417",
      "zcy": "\u0437",
      "Zdot": "\u017B",
      "zdot": "\u017C",
      "zeetrf": "\u2128",
      "ZeroWidthSpace": "\u200B",
      "Zeta": "\u0396",
      "zeta": "\u03B6",
      "Zfr": "\u2128",
      "zfr": "\u{1D537}",
      "ZHcy": "\u0416",
      "zhcy": "\u0436",
      "zigrarr": "\u21DD",
      "Zopf": "\u2124",
      "zopf": "\u{1D56B}",
      "Zscr": "\u{1D4B5}",
      "zscr": "\u{1D4CF}",
      "zwj": "\u200D",
      "zwnj": "\u200C"
    };
    var hasOwn = Object.prototype.hasOwnProperty;
    function has(object, key) {
      return object ? hasOwn.call(object, key) : false;
    }
    function decodeEntity(name) {
      if (has(entities, name)) {
        return entities[name];
      } else {
        return name;
      }
    }
    function typeOf(obj) {
      return Object.prototype.toString.call(obj);
    }
    function isString(obj) {
      return typeOf(obj) === "[object String]";
    }
    var hasOwn$1 = Object.prototype.hasOwnProperty;
    function has$1(object, key) {
      return object ? hasOwn$1.call(object, key) : false;
    }
    function assign2(obj) {
      var sources = [].slice.call(arguments, 1);
      sources.forEach(function(source) {
        if (!source) {
          return;
        }
        if (typeof source !== "object") {
          throw new TypeError(source + "must be object");
        }
        Object.keys(source).forEach(function(key) {
          obj[key] = source[key];
        });
      });
      return obj;
    }
    var UNESCAPE_MD_RE = /\\([\\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
    function unescapeMd(str) {
      if (str.indexOf("\\") < 0) {
        return str;
      }
      return str.replace(UNESCAPE_MD_RE, "$1");
    }
    function isValidEntityCode(c) {
      if (c >= 55296 && c <= 57343) {
        return false;
      }
      if (c >= 64976 && c <= 65007) {
        return false;
      }
      if ((c & 65535) === 65535 || (c & 65535) === 65534) {
        return false;
      }
      if (c >= 0 && c <= 8) {
        return false;
      }
      if (c === 11) {
        return false;
      }
      if (c >= 14 && c <= 31) {
        return false;
      }
      if (c >= 127 && c <= 159) {
        return false;
      }
      if (c > 1114111) {
        return false;
      }
      return true;
    }
    function fromCodePoint(c) {
      if (c > 65535) {
        c -= 65536;
        var surrogate1 = 55296 + (c >> 10), surrogate2 = 56320 + (c & 1023);
        return String.fromCharCode(surrogate1, surrogate2);
      }
      return String.fromCharCode(c);
    }
    var NAMED_ENTITY_RE = /&([a-z#][a-z0-9]{1,31});/gi;
    var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;
    function replaceEntityPattern(match, name) {
      var code2 = 0;
      var decoded = decodeEntity(name);
      if (name !== decoded) {
        return decoded;
      } else if (name.charCodeAt(0) === 35 && DIGITAL_ENTITY_TEST_RE.test(name)) {
        code2 = name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
        if (isValidEntityCode(code2)) {
          return fromCodePoint(code2);
        }
      }
      return match;
    }
    function replaceEntities(str) {
      if (str.indexOf("&") < 0) {
        return str;
      }
      return str.replace(NAMED_ENTITY_RE, replaceEntityPattern);
    }
    var HTML_ESCAPE_TEST_RE = /[&<>"]/;
    var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
    var HTML_REPLACEMENTS = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    };
    function replaceUnsafeChar(ch) {
      return HTML_REPLACEMENTS[ch];
    }
    function escapeHtml(str) {
      if (HTML_ESCAPE_TEST_RE.test(str)) {
        return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
      }
      return str;
    }
    var utils = /* @__PURE__ */ Object.freeze({
      isString,
      has: has$1,
      assign: assign2,
      unescapeMd,
      isValidEntityCode,
      fromCodePoint,
      replaceEntities,
      escapeHtml
    });
    var rules = {};
    rules.blockquote_open = function() {
      return "<blockquote>\n";
    };
    rules.blockquote_close = function(tokens, idx) {
      return "</blockquote>" + getBreak(tokens, idx);
    };
    rules.code = function(tokens, idx) {
      if (tokens[idx].block) {
        return "<pre><code>" + escapeHtml(tokens[idx].content) + "</code></pre>" + getBreak(tokens, idx);
      }
      return "<code>" + escapeHtml(tokens[idx].content) + "</code>";
    };
    rules.fence = function(tokens, idx, options2, env, instance) {
      var token = tokens[idx];
      var langClass = "";
      var langPrefix = options2.langPrefix;
      var langName = "", fences2, fenceName;
      var highlighted;
      if (token.params) {
        fences2 = token.params.split(/\s+/g);
        fenceName = fences2.join(" ");
        if (has$1(instance.rules.fence_custom, fences2[0])) {
          return instance.rules.fence_custom[fences2[0]](tokens, idx, options2, env, instance);
        }
        langName = escapeHtml(replaceEntities(unescapeMd(fenceName)));
        langClass = ' class="' + langPrefix + langName + '"';
      }
      if (options2.highlight) {
        highlighted = options2.highlight.apply(options2.highlight, [token.content].concat(fences2)) || escapeHtml(token.content);
      } else {
        highlighted = escapeHtml(token.content);
      }
      return "<pre><code" + langClass + ">" + highlighted + "</code></pre>" + getBreak(tokens, idx);
    };
    rules.fence_custom = {};
    rules.heading_open = function(tokens, idx) {
      return "<h" + tokens[idx].hLevel + ">";
    };
    rules.heading_close = function(tokens, idx) {
      return "</h" + tokens[idx].hLevel + ">\n";
    };
    rules.hr = function(tokens, idx, options2) {
      return (options2.xhtmlOut ? "<hr />" : "<hr>") + getBreak(tokens, idx);
    };
    rules.bullet_list_open = function() {
      return "<ul>\n";
    };
    rules.bullet_list_close = function(tokens, idx) {
      return "</ul>" + getBreak(tokens, idx);
    };
    rules.list_item_open = function() {
      return "<li>";
    };
    rules.list_item_close = function() {
      return "</li>\n";
    };
    rules.ordered_list_open = function(tokens, idx) {
      var token = tokens[idx];
      var order = token.order > 1 ? ' start="' + token.order + '"' : "";
      return "<ol" + order + ">\n";
    };
    rules.ordered_list_close = function(tokens, idx) {
      return "</ol>" + getBreak(tokens, idx);
    };
    rules.paragraph_open = function(tokens, idx) {
      return tokens[idx].tight ? "" : "<p>";
    };
    rules.paragraph_close = function(tokens, idx) {
      var addBreak = !(tokens[idx].tight && idx && tokens[idx - 1].type === "inline" && !tokens[idx - 1].content);
      return (tokens[idx].tight ? "" : "</p>") + (addBreak ? getBreak(tokens, idx) : "");
    };
    rules.link_open = function(tokens, idx, options2) {
      var title = tokens[idx].title ? ' title="' + escapeHtml(replaceEntities(tokens[idx].title)) + '"' : "";
      var target = options2.linkTarget ? ' target="' + options2.linkTarget + '"' : "";
      return '<a href="' + escapeHtml(tokens[idx].href) + '"' + title + target + ">";
    };
    rules.link_close = function() {
      return "</a>";
    };
    rules.image = function(tokens, idx, options2) {
      var src2 = ' src="' + escapeHtml(tokens[idx].src) + '"';
      var title = tokens[idx].title ? ' title="' + escapeHtml(replaceEntities(tokens[idx].title)) + '"' : "";
      var alt = ' alt="' + (tokens[idx].alt ? escapeHtml(replaceEntities(unescapeMd(tokens[idx].alt))) : "") + '"';
      var suffix = options2.xhtmlOut ? " /" : "";
      return "<img" + src2 + alt + title + suffix + ">";
    };
    rules.table_open = function() {
      return "<table>\n";
    };
    rules.table_close = function() {
      return "</table>\n";
    };
    rules.thead_open = function() {
      return "<thead>\n";
    };
    rules.thead_close = function() {
      return "</thead>\n";
    };
    rules.tbody_open = function() {
      return "<tbody>\n";
    };
    rules.tbody_close = function() {
      return "</tbody>\n";
    };
    rules.tr_open = function() {
      return "<tr>";
    };
    rules.tr_close = function() {
      return "</tr>\n";
    };
    rules.th_open = function(tokens, idx) {
      var token = tokens[idx];
      return "<th" + (token.align ? ' style="text-align:' + token.align + '"' : "") + ">";
    };
    rules.th_close = function() {
      return "</th>";
    };
    rules.td_open = function(tokens, idx) {
      var token = tokens[idx];
      return "<td" + (token.align ? ' style="text-align:' + token.align + '"' : "") + ">";
    };
    rules.td_close = function() {
      return "</td>";
    };
    rules.strong_open = function() {
      return "<strong>";
    };
    rules.strong_close = function() {
      return "</strong>";
    };
    rules.em_open = function() {
      return "<em>";
    };
    rules.em_close = function() {
      return "</em>";
    };
    rules.del_open = function() {
      return "<del>";
    };
    rules.del_close = function() {
      return "</del>";
    };
    rules.ins_open = function() {
      return "<ins>";
    };
    rules.ins_close = function() {
      return "</ins>";
    };
    rules.mark_open = function() {
      return "<mark>";
    };
    rules.mark_close = function() {
      return "</mark>";
    };
    rules.sub = function(tokens, idx) {
      return "<sub>" + escapeHtml(tokens[idx].content) + "</sub>";
    };
    rules.sup = function(tokens, idx) {
      return "<sup>" + escapeHtml(tokens[idx].content) + "</sup>";
    };
    rules.hardbreak = function(tokens, idx, options2) {
      return options2.xhtmlOut ? "<br />\n" : "<br>\n";
    };
    rules.softbreak = function(tokens, idx, options2) {
      return options2.breaks ? options2.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
    };
    rules.text = function(tokens, idx) {
      return escapeHtml(tokens[idx].content);
    };
    rules.htmlblock = function(tokens, idx) {
      return tokens[idx].content;
    };
    rules.htmltag = function(tokens, idx) {
      return tokens[idx].content;
    };
    rules.abbr_open = function(tokens, idx) {
      return '<abbr title="' + escapeHtml(replaceEntities(tokens[idx].title)) + '">';
    };
    rules.abbr_close = function() {
      return "</abbr>";
    };
    rules.footnote_ref = function(tokens, idx) {
      var n = Number(tokens[idx].id + 1).toString();
      var id = "fnref" + n;
      if (tokens[idx].subId > 0) {
        id += ":" + tokens[idx].subId;
      }
      return '<sup class="footnote-ref"><a href="#fn' + n + '" id="' + id + '">[' + n + "]</a></sup>";
    };
    rules.footnote_block_open = function(tokens, idx, options2) {
      var hr2 = options2.xhtmlOut ? '<hr class="footnotes-sep" />\n' : '<hr class="footnotes-sep">\n';
      return hr2 + '<section class="footnotes">\n<ol class="footnotes-list">\n';
    };
    rules.footnote_block_close = function() {
      return "</ol>\n</section>\n";
    };
    rules.footnote_open = function(tokens, idx) {
      var id = Number(tokens[idx].id + 1).toString();
      return '<li id="fn' + id + '"  class="footnote-item">';
    };
    rules.footnote_close = function() {
      return "</li>\n";
    };
    rules.footnote_anchor = function(tokens, idx) {
      var n = Number(tokens[idx].id + 1).toString();
      var id = "fnref" + n;
      if (tokens[idx].subId > 0) {
        id += ":" + tokens[idx].subId;
      }
      return ' <a href="#' + id + '" class="footnote-backref">\u21A9</a>';
    };
    rules.dl_open = function() {
      return "<dl>\n";
    };
    rules.dt_open = function() {
      return "<dt>";
    };
    rules.dd_open = function() {
      return "<dd>";
    };
    rules.dl_close = function() {
      return "</dl>\n";
    };
    rules.dt_close = function() {
      return "</dt>\n";
    };
    rules.dd_close = function() {
      return "</dd>\n";
    };
    function nextToken(tokens, idx) {
      if (++idx >= tokens.length - 2) {
        return idx;
      }
      if (tokens[idx].type === "paragraph_open" && tokens[idx].tight && (tokens[idx + 1].type === "inline" && tokens[idx + 1].content.length === 0) && (tokens[idx + 2].type === "paragraph_close" && tokens[idx + 2].tight)) {
        return nextToken(tokens, idx + 2);
      }
      return idx;
    }
    var getBreak = rules.getBreak = function getBreak2(tokens, idx) {
      idx = nextToken(tokens, idx);
      if (idx < tokens.length && tokens[idx].type === "list_item_close") {
        return "";
      }
      return "\n";
    };
    function Renderer() {
      this.rules = assign2({}, rules);
      this.getBreak = rules.getBreak;
    }
    Renderer.prototype.renderInline = function(tokens, options2, env) {
      var _rules2 = this.rules;
      var len = tokens.length, i2 = 0;
      var result = "";
      while (len--) {
        result += _rules2[tokens[i2].type](tokens, i2++, options2, env, this);
      }
      return result;
    };
    Renderer.prototype.render = function(tokens, options2, env) {
      var _rules2 = this.rules;
      var len = tokens.length, i2 = -1;
      var result = "";
      while (++i2 < len) {
        if (tokens[i2].type === "inline") {
          result += this.renderInline(tokens[i2].children, options2, env);
        } else {
          result += _rules2[tokens[i2].type](tokens, i2, options2, env, this);
        }
      }
      return result;
    };
    function Ruler() {
      this.__rules__ = [];
      this.__cache__ = null;
    }
    Ruler.prototype.__find__ = function(name) {
      var len = this.__rules__.length;
      var i2 = -1;
      while (len--) {
        if (this.__rules__[++i2].name === name) {
          return i2;
        }
      }
      return -1;
    };
    Ruler.prototype.__compile__ = function() {
      var self2 = this;
      var chains = [""];
      self2.__rules__.forEach(function(rule) {
        if (!rule.enabled) {
          return;
        }
        rule.alt.forEach(function(altName) {
          if (chains.indexOf(altName) < 0) {
            chains.push(altName);
          }
        });
      });
      self2.__cache__ = {};
      chains.forEach(function(chain) {
        self2.__cache__[chain] = [];
        self2.__rules__.forEach(function(rule) {
          if (!rule.enabled) {
            return;
          }
          if (chain && rule.alt.indexOf(chain) < 0) {
            return;
          }
          self2.__cache__[chain].push(rule.fn);
        });
      });
    };
    Ruler.prototype.at = function(name, fn, options2) {
      var idx = this.__find__(name);
      var opt = options2 || {};
      if (idx === -1) {
        throw new Error("Parser rule not found: " + name);
      }
      this.__rules__[idx].fn = fn;
      this.__rules__[idx].alt = opt.alt || [];
      this.__cache__ = null;
    };
    Ruler.prototype.before = function(beforeName, ruleName, fn, options2) {
      var idx = this.__find__(beforeName);
      var opt = options2 || {};
      if (idx === -1) {
        throw new Error("Parser rule not found: " + beforeName);
      }
      this.__rules__.splice(idx, 0, {
        name: ruleName,
        enabled: true,
        fn,
        alt: opt.alt || []
      });
      this.__cache__ = null;
    };
    Ruler.prototype.after = function(afterName, ruleName, fn, options2) {
      var idx = this.__find__(afterName);
      var opt = options2 || {};
      if (idx === -1) {
        throw new Error("Parser rule not found: " + afterName);
      }
      this.__rules__.splice(idx + 1, 0, {
        name: ruleName,
        enabled: true,
        fn,
        alt: opt.alt || []
      });
      this.__cache__ = null;
    };
    Ruler.prototype.push = function(ruleName, fn, options2) {
      var opt = options2 || {};
      this.__rules__.push({
        name: ruleName,
        enabled: true,
        fn,
        alt: opt.alt || []
      });
      this.__cache__ = null;
    };
    Ruler.prototype.enable = function(list2, strict) {
      list2 = !Array.isArray(list2) ? [list2] : list2;
      if (strict) {
        this.__rules__.forEach(function(rule) {
          rule.enabled = false;
        });
      }
      list2.forEach(function(name) {
        var idx = this.__find__(name);
        if (idx < 0) {
          throw new Error("Rules manager: invalid rule name " + name);
        }
        this.__rules__[idx].enabled = true;
      }, this);
      this.__cache__ = null;
    };
    Ruler.prototype.disable = function(list2) {
      list2 = !Array.isArray(list2) ? [list2] : list2;
      list2.forEach(function(name) {
        var idx = this.__find__(name);
        if (idx < 0) {
          throw new Error("Rules manager: invalid rule name " + name);
        }
        this.__rules__[idx].enabled = false;
      }, this);
      this.__cache__ = null;
    };
    Ruler.prototype.getRules = function(chainName) {
      if (this.__cache__ === null) {
        this.__compile__();
      }
      return this.__cache__[chainName] || [];
    };
    function block(state) {
      if (state.inlineMode) {
        state.tokens.push({
          type: "inline",
          content: state.src.replace(/\n/g, " ").trim(),
          level: 0,
          lines: [0, 1],
          children: []
        });
      } else {
        state.block.parse(state.src, state.options, state.env, state.tokens);
      }
    }
    function StateInline(src2, parserInline, options2, env, outTokens) {
      this.src = src2;
      this.env = env;
      this.options = options2;
      this.parser = parserInline;
      this.tokens = outTokens;
      this.pos = 0;
      this.posMax = this.src.length;
      this.level = 0;
      this.pending = "";
      this.pendingLevel = 0;
      this.cache = [];
      this.isInLabel = false;
      this.linkLevel = 0;
      this.linkContent = "";
      this.labelUnmatchedScopes = 0;
    }
    StateInline.prototype.pushPending = function() {
      this.tokens.push({
        type: "text",
        content: this.pending,
        level: this.pendingLevel
      });
      this.pending = "";
    };
    StateInline.prototype.push = function(token) {
      if (this.pending) {
        this.pushPending();
      }
      this.tokens.push(token);
      this.pendingLevel = this.level;
    };
    StateInline.prototype.cacheSet = function(key, val) {
      for (var i2 = this.cache.length; i2 <= key; i2++) {
        this.cache.push(0);
      }
      this.cache[key] = val;
    };
    StateInline.prototype.cacheGet = function(key) {
      return key < this.cache.length ? this.cache[key] : 0;
    };
    function parseLinkLabel(state, start) {
      var level, found, marker, labelEnd = -1, max = state.posMax, oldPos = state.pos, oldFlag = state.isInLabel;
      if (state.isInLabel) {
        return -1;
      }
      if (state.labelUnmatchedScopes) {
        state.labelUnmatchedScopes--;
        return -1;
      }
      state.pos = start + 1;
      state.isInLabel = true;
      level = 1;
      while (state.pos < max) {
        marker = state.src.charCodeAt(state.pos);
        if (marker === 91) {
          level++;
        } else if (marker === 93) {
          level--;
          if (level === 0) {
            found = true;
            break;
          }
        }
        state.parser.skipToken(state);
      }
      if (found) {
        labelEnd = state.pos;
        state.labelUnmatchedScopes = 0;
      } else {
        state.labelUnmatchedScopes = level - 1;
      }
      state.pos = oldPos;
      state.isInLabel = oldFlag;
      return labelEnd;
    }
    function parseAbbr(str, parserInline, options2, env) {
      var state, labelEnd, pos, max, label, title;
      if (str.charCodeAt(0) !== 42) {
        return -1;
      }
      if (str.charCodeAt(1) !== 91) {
        return -1;
      }
      if (str.indexOf("]:") === -1) {
        return -1;
      }
      state = new StateInline(str, parserInline, options2, env, []);
      labelEnd = parseLinkLabel(state, 1);
      if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 58) {
        return -1;
      }
      max = state.posMax;
      for (pos = labelEnd + 2; pos < max; pos++) {
        if (state.src.charCodeAt(pos) === 10) {
          break;
        }
      }
      label = str.slice(2, labelEnd);
      title = str.slice(labelEnd + 2, pos).trim();
      if (title.length === 0) {
        return -1;
      }
      if (!env.abbreviations) {
        env.abbreviations = {};
      }
      if (typeof env.abbreviations[":" + label] === "undefined") {
        env.abbreviations[":" + label] = title;
      }
      return pos;
    }
    function abbr(state) {
      var tokens = state.tokens, i2, l, content, pos;
      if (state.inlineMode) {
        return;
      }
      for (i2 = 1, l = tokens.length - 1; i2 < l; i2++) {
        if (tokens[i2 - 1].type === "paragraph_open" && tokens[i2].type === "inline" && tokens[i2 + 1].type === "paragraph_close") {
          content = tokens[i2].content;
          while (content.length) {
            pos = parseAbbr(content, state.inline, state.options, state.env);
            if (pos < 0) {
              break;
            }
            content = content.slice(pos).trim();
          }
          tokens[i2].content = content;
          if (!content.length) {
            tokens[i2 - 1].tight = true;
            tokens[i2 + 1].tight = true;
          }
        }
      }
    }
    function normalizeLink(url2) {
      var normalized = replaceEntities(url2);
      try {
        normalized = decodeURI(normalized);
      } catch (err) {
      }
      return encodeURI(normalized);
    }
    function parseLinkDestination(state, pos) {
      var code2, level, link, start = pos, max = state.posMax;
      if (state.src.charCodeAt(pos) === 60) {
        pos++;
        while (pos < max) {
          code2 = state.src.charCodeAt(pos);
          if (code2 === 10) {
            return false;
          }
          if (code2 === 62) {
            link = normalizeLink(unescapeMd(state.src.slice(start + 1, pos)));
            if (!state.parser.validateLink(link)) {
              return false;
            }
            state.pos = pos + 1;
            state.linkContent = link;
            return true;
          }
          if (code2 === 92 && pos + 1 < max) {
            pos += 2;
            continue;
          }
          pos++;
        }
        return false;
      }
      level = 0;
      while (pos < max) {
        code2 = state.src.charCodeAt(pos);
        if (code2 === 32) {
          break;
        }
        if (code2 < 32 || code2 === 127) {
          break;
        }
        if (code2 === 92 && pos + 1 < max) {
          pos += 2;
          continue;
        }
        if (code2 === 40) {
          level++;
          if (level > 1) {
            break;
          }
        }
        if (code2 === 41) {
          level--;
          if (level < 0) {
            break;
          }
        }
        pos++;
      }
      if (start === pos) {
        return false;
      }
      link = unescapeMd(state.src.slice(start, pos));
      if (!state.parser.validateLink(link)) {
        return false;
      }
      state.linkContent = link;
      state.pos = pos;
      return true;
    }
    function parseLinkTitle(state, pos) {
      var code2, start = pos, max = state.posMax, marker = state.src.charCodeAt(pos);
      if (marker !== 34 && marker !== 39 && marker !== 40) {
        return false;
      }
      pos++;
      if (marker === 40) {
        marker = 41;
      }
      while (pos < max) {
        code2 = state.src.charCodeAt(pos);
        if (code2 === marker) {
          state.pos = pos + 1;
          state.linkContent = unescapeMd(state.src.slice(start + 1, pos));
          return true;
        }
        if (code2 === 92 && pos + 1 < max) {
          pos += 2;
          continue;
        }
        pos++;
      }
      return false;
    }
    function normalizeReference(str) {
      return str.trim().replace(/\s+/g, " ").toUpperCase();
    }
    function parseReference(str, parser, options2, env) {
      var state, labelEnd, pos, max, code2, start, href, title, label;
      if (str.charCodeAt(0) !== 91) {
        return -1;
      }
      if (str.indexOf("]:") === -1) {
        return -1;
      }
      state = new StateInline(str, parser, options2, env, []);
      labelEnd = parseLinkLabel(state, 0);
      if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 58) {
        return -1;
      }
      max = state.posMax;
      for (pos = labelEnd + 2; pos < max; pos++) {
        code2 = state.src.charCodeAt(pos);
        if (code2 !== 32 && code2 !== 10) {
          break;
        }
      }
      if (!parseLinkDestination(state, pos)) {
        return -1;
      }
      href = state.linkContent;
      pos = state.pos;
      start = pos;
      for (pos = pos + 1; pos < max; pos++) {
        code2 = state.src.charCodeAt(pos);
        if (code2 !== 32 && code2 !== 10) {
          break;
        }
      }
      if (pos < max && start !== pos && parseLinkTitle(state, pos)) {
        title = state.linkContent;
        pos = state.pos;
      } else {
        title = "";
        pos = start;
      }
      while (pos < max && state.src.charCodeAt(pos) === 32) {
        pos++;
      }
      if (pos < max && state.src.charCodeAt(pos) !== 10) {
        return -1;
      }
      label = normalizeReference(str.slice(1, labelEnd));
      if (typeof env.references[label] === "undefined") {
        env.references[label] = {title, href};
      }
      return pos;
    }
    function references(state) {
      var tokens = state.tokens, i2, l, content, pos;
      state.env.references = state.env.references || {};
      if (state.inlineMode) {
        return;
      }
      for (i2 = 1, l = tokens.length - 1; i2 < l; i2++) {
        if (tokens[i2].type === "inline" && tokens[i2 - 1].type === "paragraph_open" && tokens[i2 + 1].type === "paragraph_close") {
          content = tokens[i2].content;
          while (content.length) {
            pos = parseReference(content, state.inline, state.options, state.env);
            if (pos < 0) {
              break;
            }
            content = content.slice(pos).trim();
          }
          tokens[i2].content = content;
          if (!content.length) {
            tokens[i2 - 1].tight = true;
            tokens[i2 + 1].tight = true;
          }
        }
      }
    }
    function inline(state) {
      var tokens = state.tokens, tok, i2, l;
      for (i2 = 0, l = tokens.length; i2 < l; i2++) {
        tok = tokens[i2];
        if (tok.type === "inline") {
          state.inline.parse(tok.content, state.options, state.env, tok.children);
        }
      }
    }
    function footnote_block(state) {
      var i2, l, j, t, lastParagraph, list2, tokens, current, currentLabel, level = 0, insideRef = false, refTokens = {};
      if (!state.env.footnotes) {
        return;
      }
      state.tokens = state.tokens.filter(function(tok) {
        if (tok.type === "footnote_reference_open") {
          insideRef = true;
          current = [];
          currentLabel = tok.label;
          return false;
        }
        if (tok.type === "footnote_reference_close") {
          insideRef = false;
          refTokens[":" + currentLabel] = current;
          return false;
        }
        if (insideRef) {
          current.push(tok);
        }
        return !insideRef;
      });
      if (!state.env.footnotes.list) {
        return;
      }
      list2 = state.env.footnotes.list;
      state.tokens.push({
        type: "footnote_block_open",
        level: level++
      });
      for (i2 = 0, l = list2.length; i2 < l; i2++) {
        state.tokens.push({
          type: "footnote_open",
          id: i2,
          level: level++
        });
        if (list2[i2].tokens) {
          tokens = [];
          tokens.push({
            type: "paragraph_open",
            tight: false,
            level: level++
          });
          tokens.push({
            type: "inline",
            content: "",
            level,
            children: list2[i2].tokens
          });
          tokens.push({
            type: "paragraph_close",
            tight: false,
            level: --level
          });
        } else if (list2[i2].label) {
          tokens = refTokens[":" + list2[i2].label];
        }
        state.tokens = state.tokens.concat(tokens);
        if (state.tokens[state.tokens.length - 1].type === "paragraph_close") {
          lastParagraph = state.tokens.pop();
        } else {
          lastParagraph = null;
        }
        t = list2[i2].count > 0 ? list2[i2].count : 1;
        for (j = 0; j < t; j++) {
          state.tokens.push({
            type: "footnote_anchor",
            id: i2,
            subId: j,
            level
          });
        }
        if (lastParagraph) {
          state.tokens.push(lastParagraph);
        }
        state.tokens.push({
          type: "footnote_close",
          level: --level
        });
      }
      state.tokens.push({
        type: "footnote_block_close",
        level: --level
      });
    }
    var PUNCT_CHARS = ` 
()[]'".,!?-`;
    function regEscape(s2) {
      return s2.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1");
    }
    function abbr2(state) {
      var i2, j, l, tokens, token, text2, nodes, pos, level, reg, m, regText, blockTokens = state.tokens;
      if (!state.env.abbreviations) {
        return;
      }
      if (!state.env.abbrRegExp) {
        regText = "(^|[" + PUNCT_CHARS.split("").map(regEscape).join("") + "])(" + Object.keys(state.env.abbreviations).map(function(x) {
          return x.substr(1);
        }).sort(function(a, b) {
          return b.length - a.length;
        }).map(regEscape).join("|") + ")($|[" + PUNCT_CHARS.split("").map(regEscape).join("") + "])";
        state.env.abbrRegExp = new RegExp(regText, "g");
      }
      reg = state.env.abbrRegExp;
      for (j = 0, l = blockTokens.length; j < l; j++) {
        if (blockTokens[j].type !== "inline") {
          continue;
        }
        tokens = blockTokens[j].children;
        for (i2 = tokens.length - 1; i2 >= 0; i2--) {
          token = tokens[i2];
          if (token.type !== "text") {
            continue;
          }
          pos = 0;
          text2 = token.content;
          reg.lastIndex = 0;
          level = token.level;
          nodes = [];
          while (m = reg.exec(text2)) {
            if (reg.lastIndex > pos) {
              nodes.push({
                type: "text",
                content: text2.slice(pos, m.index + m[1].length),
                level
              });
            }
            nodes.push({
              type: "abbr_open",
              title: state.env.abbreviations[":" + m[2]],
              level: level++
            });
            nodes.push({
              type: "text",
              content: m[2],
              level
            });
            nodes.push({
              type: "abbr_close",
              level: --level
            });
            pos = reg.lastIndex - m[3].length;
          }
          if (!nodes.length) {
            continue;
          }
          if (pos < text2.length) {
            nodes.push({
              type: "text",
              content: text2.slice(pos),
              level
            });
          }
          blockTokens[j].children = tokens = [].concat(tokens.slice(0, i2), nodes, tokens.slice(i2 + 1));
        }
      }
    }
    var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;
    var SCOPED_ABBR_RE = /\((c|tm|r|p)\)/ig;
    var SCOPED_ABBR = {
      "c": "\xA9",
      "r": "\xAE",
      "p": "\xA7",
      "tm": "\u2122"
    };
    function replaceScopedAbbr(str) {
      if (str.indexOf("(") < 0) {
        return str;
      }
      return str.replace(SCOPED_ABBR_RE, function(match, name) {
        return SCOPED_ABBR[name.toLowerCase()];
      });
    }
    function replace(state) {
      var i2, token, text2, inlineTokens, blkIdx;
      if (!state.options.typographer) {
        return;
      }
      for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
        if (state.tokens[blkIdx].type !== "inline") {
          continue;
        }
        inlineTokens = state.tokens[blkIdx].children;
        for (i2 = inlineTokens.length - 1; i2 >= 0; i2--) {
          token = inlineTokens[i2];
          if (token.type === "text") {
            text2 = token.content;
            text2 = replaceScopedAbbr(text2);
            if (RARE_RE.test(text2)) {
              text2 = text2.replace(/\+-/g, "\xB1").replace(/\.{2,}/g, "\u2026").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---([^-]|$)/mg, "$1\u2014$2").replace(/(^|\s)--(\s|$)/mg, "$1\u2013$2").replace(/(^|[^-\s])--([^-\s]|$)/mg, "$1\u2013$2");
            }
            token.content = text2;
          }
        }
      }
    }
    var QUOTE_TEST_RE = /['"]/;
    var QUOTE_RE = /['"]/g;
    var PUNCT_RE = /[-\s()\[\]]/;
    var APOSTROPHE = "\u2019";
    function isLetter(str, pos) {
      if (pos < 0 || pos >= str.length) {
        return false;
      }
      return !PUNCT_RE.test(str[pos]);
    }
    function replaceAt(str, index2, ch) {
      return str.substr(0, index2) + ch + str.substr(index2 + 1);
    }
    function smartquotes(state) {
      var i2, token, text2, t, pos, max, thisLevel, lastSpace, nextSpace, item, canOpen, canClose, j, isSingle, blkIdx, tokens, stack;
      if (!state.options.typographer) {
        return;
      }
      stack = [];
      for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
        if (state.tokens[blkIdx].type !== "inline") {
          continue;
        }
        tokens = state.tokens[blkIdx].children;
        stack.length = 0;
        for (i2 = 0; i2 < tokens.length; i2++) {
          token = tokens[i2];
          if (token.type !== "text" || QUOTE_TEST_RE.test(token.text)) {
            continue;
          }
          thisLevel = tokens[i2].level;
          for (j = stack.length - 1; j >= 0; j--) {
            if (stack[j].level <= thisLevel) {
              break;
            }
          }
          stack.length = j + 1;
          text2 = token.content;
          pos = 0;
          max = text2.length;
          OUTER:
            while (pos < max) {
              QUOTE_RE.lastIndex = pos;
              t = QUOTE_RE.exec(text2);
              if (!t) {
                break;
              }
              lastSpace = !isLetter(text2, t.index - 1);
              pos = t.index + 1;
              isSingle = t[0] === "'";
              nextSpace = !isLetter(text2, pos);
              if (!nextSpace && !lastSpace) {
                if (isSingle) {
                  token.content = replaceAt(token.content, t.index, APOSTROPHE);
                }
                continue;
              }
              canOpen = !nextSpace;
              canClose = !lastSpace;
              if (canClose) {
                for (j = stack.length - 1; j >= 0; j--) {
                  item = stack[j];
                  if (stack[j].level < thisLevel) {
                    break;
                  }
                  if (item.single === isSingle && stack[j].level === thisLevel) {
                    item = stack[j];
                    if (isSingle) {
                      tokens[item.token].content = replaceAt(tokens[item.token].content, item.pos, state.options.quotes[2]);
                      token.content = replaceAt(token.content, t.index, state.options.quotes[3]);
                    } else {
                      tokens[item.token].content = replaceAt(tokens[item.token].content, item.pos, state.options.quotes[0]);
                      token.content = replaceAt(token.content, t.index, state.options.quotes[1]);
                    }
                    stack.length = j;
                    continue OUTER;
                  }
                }
              }
              if (canOpen) {
                stack.push({
                  token: i2,
                  pos: t.index,
                  single: isSingle,
                  level: thisLevel
                });
              } else if (canClose && isSingle) {
                token.content = replaceAt(token.content, t.index, APOSTROPHE);
              }
            }
        }
      }
    }
    var _rules = [
      ["block", block],
      ["abbr", abbr],
      ["references", references],
      ["inline", inline],
      ["footnote_tail", footnote_block],
      ["abbr2", abbr2],
      ["replacements", replace],
      ["smartquotes", smartquotes]
    ];
    function Core() {
      this.options = {};
      this.ruler = new Ruler();
      for (var i2 = 0; i2 < _rules.length; i2++) {
        this.ruler.push(_rules[i2][0], _rules[i2][1]);
      }
    }
    Core.prototype.process = function(state) {
      var i2, l, rules2;
      rules2 = this.ruler.getRules("");
      for (i2 = 0, l = rules2.length; i2 < l; i2++) {
        rules2[i2](state);
      }
    };
    function StateBlock(src2, parser, options2, env, tokens) {
      var ch, s2, start, pos, len, indent, indent_found;
      this.src = src2;
      this.parser = parser;
      this.options = options2;
      this.env = env;
      this.tokens = tokens;
      this.bMarks = [];
      this.eMarks = [];
      this.tShift = [];
      this.blkIndent = 0;
      this.line = 0;
      this.lineMax = 0;
      this.tight = false;
      this.parentType = "root";
      this.ddIndent = -1;
      this.level = 0;
      this.result = "";
      s2 = this.src;
      indent = 0;
      indent_found = false;
      for (start = pos = indent = 0, len = s2.length; pos < len; pos++) {
        ch = s2.charCodeAt(pos);
        if (!indent_found) {
          if (ch === 32) {
            indent++;
            continue;
          } else {
            indent_found = true;
          }
        }
        if (ch === 10 || pos === len - 1) {
          if (ch !== 10) {
            pos++;
          }
          this.bMarks.push(start);
          this.eMarks.push(pos);
          this.tShift.push(indent);
          indent_found = false;
          indent = 0;
          start = pos + 1;
        }
      }
      this.bMarks.push(s2.length);
      this.eMarks.push(s2.length);
      this.tShift.push(0);
      this.lineMax = this.bMarks.length - 1;
    }
    StateBlock.prototype.isEmpty = function isEmpty(line) {
      return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
    };
    StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
      for (var max = this.lineMax; from < max; from++) {
        if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
          break;
        }
      }
      return from;
    };
    StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
      for (var max = this.src.length; pos < max; pos++) {
        if (this.src.charCodeAt(pos) !== 32) {
          break;
        }
      }
      return pos;
    };
    StateBlock.prototype.skipChars = function skipChars(pos, code2) {
      for (var max = this.src.length; pos < max; pos++) {
        if (this.src.charCodeAt(pos) !== code2) {
          break;
        }
      }
      return pos;
    };
    StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code2, min) {
      if (pos <= min) {
        return pos;
      }
      while (pos > min) {
        if (code2 !== this.src.charCodeAt(--pos)) {
          return pos + 1;
        }
      }
      return pos;
    };
    StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
      var i2, first, last, queue, shift, line = begin;
      if (begin >= end) {
        return "";
      }
      if (line + 1 === end) {
        first = this.bMarks[line] + Math.min(this.tShift[line], indent);
        last = keepLastLF ? this.eMarks[line] + 1 : this.eMarks[line];
        return this.src.slice(first, last);
      }
      queue = new Array(end - begin);
      for (i2 = 0; line < end; line++, i2++) {
        shift = this.tShift[line];
        if (shift > indent) {
          shift = indent;
        }
        if (shift < 0) {
          shift = 0;
        }
        first = this.bMarks[line] + shift;
        if (line + 1 < end || keepLastLF) {
          last = this.eMarks[line] + 1;
        } else {
          last = this.eMarks[line];
        }
        queue[i2] = this.src.slice(first, last);
      }
      return queue.join("");
    };
    function code(state, startLine, endLine) {
      var nextLine, last;
      if (state.tShift[startLine] - state.blkIndent < 4) {
        return false;
      }
      last = nextLine = startLine + 1;
      while (nextLine < endLine) {
        if (state.isEmpty(nextLine)) {
          nextLine++;
          continue;
        }
        if (state.tShift[nextLine] - state.blkIndent >= 4) {
          nextLine++;
          last = nextLine;
          continue;
        }
        break;
      }
      state.line = nextLine;
      state.tokens.push({
        type: "code",
        content: state.getLines(startLine, last, 4 + state.blkIndent, true),
        block: true,
        lines: [startLine, state.line],
        level: state.level
      });
      return true;
    }
    function fences(state, startLine, endLine, silent) {
      var marker, len, params, nextLine, mem, haveEndMarker = false, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (pos + 3 > max) {
        return false;
      }
      marker = state.src.charCodeAt(pos);
      if (marker !== 126 && marker !== 96) {
        return false;
      }
      mem = pos;
      pos = state.skipChars(pos, marker);
      len = pos - mem;
      if (len < 3) {
        return false;
      }
      params = state.src.slice(pos, max).trim();
      if (params.indexOf("`") >= 0) {
        return false;
      }
      if (silent) {
        return true;
      }
      nextLine = startLine;
      for (; ; ) {
        nextLine++;
        if (nextLine >= endLine) {
          break;
        }
        pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];
        if (pos < max && state.tShift[nextLine] < state.blkIndent) {
          break;
        }
        if (state.src.charCodeAt(pos) !== marker) {
          continue;
        }
        if (state.tShift[nextLine] - state.blkIndent >= 4) {
          continue;
        }
        pos = state.skipChars(pos, marker);
        if (pos - mem < len) {
          continue;
        }
        pos = state.skipSpaces(pos);
        if (pos < max) {
          continue;
        }
        haveEndMarker = true;
        break;
      }
      len = state.tShift[startLine];
      state.line = nextLine + (haveEndMarker ? 1 : 0);
      state.tokens.push({
        type: "fence",
        params,
        content: state.getLines(startLine + 1, nextLine, len, true),
        lines: [startLine, state.line],
        level: state.level
      });
      return true;
    }
    function blockquote(state, startLine, endLine, silent) {
      var nextLine, lastLineEmpty, oldTShift, oldBMarks, oldIndent, oldParentType, lines, terminatorRules, i2, l, terminate, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (pos > max) {
        return false;
      }
      if (state.src.charCodeAt(pos++) !== 62) {
        return false;
      }
      if (state.level >= state.options.maxNesting) {
        return false;
      }
      if (silent) {
        return true;
      }
      if (state.src.charCodeAt(pos) === 32) {
        pos++;
      }
      oldIndent = state.blkIndent;
      state.blkIndent = 0;
      oldBMarks = [state.bMarks[startLine]];
      state.bMarks[startLine] = pos;
      pos = pos < max ? state.skipSpaces(pos) : pos;
      lastLineEmpty = pos >= max;
      oldTShift = [state.tShift[startLine]];
      state.tShift[startLine] = pos - state.bMarks[startLine];
      terminatorRules = state.parser.ruler.getRules("blockquote");
      for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
        pos = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];
        if (pos >= max) {
          break;
        }
        if (state.src.charCodeAt(pos++) === 62) {
          if (state.src.charCodeAt(pos) === 32) {
            pos++;
          }
          oldBMarks.push(state.bMarks[nextLine]);
          state.bMarks[nextLine] = pos;
          pos = pos < max ? state.skipSpaces(pos) : pos;
          lastLineEmpty = pos >= max;
          oldTShift.push(state.tShift[nextLine]);
          state.tShift[nextLine] = pos - state.bMarks[nextLine];
          continue;
        }
        if (lastLineEmpty) {
          break;
        }
        terminate = false;
        for (i2 = 0, l = terminatorRules.length; i2 < l; i2++) {
          if (terminatorRules[i2](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
        oldBMarks.push(state.bMarks[nextLine]);
        oldTShift.push(state.tShift[nextLine]);
        state.tShift[nextLine] = -1337;
      }
      oldParentType = state.parentType;
      state.parentType = "blockquote";
      state.tokens.push({
        type: "blockquote_open",
        lines: lines = [startLine, 0],
        level: state.level++
      });
      state.parser.tokenize(state, startLine, nextLine);
      state.tokens.push({
        type: "blockquote_close",
        level: --state.level
      });
      state.parentType = oldParentType;
      lines[1] = state.line;
      for (i2 = 0; i2 < oldTShift.length; i2++) {
        state.bMarks[i2 + startLine] = oldBMarks[i2];
        state.tShift[i2 + startLine] = oldTShift[i2];
      }
      state.blkIndent = oldIndent;
      return true;
    }
    function hr(state, startLine, endLine, silent) {
      var marker, cnt, ch, pos = state.bMarks[startLine], max = state.eMarks[startLine];
      pos += state.tShift[startLine];
      if (pos > max) {
        return false;
      }
      marker = state.src.charCodeAt(pos++);
      if (marker !== 42 && marker !== 45 && marker !== 95) {
        return false;
      }
      cnt = 1;
      while (pos < max) {
        ch = state.src.charCodeAt(pos++);
        if (ch !== marker && ch !== 32) {
          return false;
        }
        if (ch === marker) {
          cnt++;
        }
      }
      if (cnt < 3) {
        return false;
      }
      if (silent) {
        return true;
      }
      state.line = startLine + 1;
      state.tokens.push({
        type: "hr",
        lines: [startLine, state.line],
        level: state.level
      });
      return true;
    }
    function skipBulletListMarker(state, startLine) {
      var marker, pos, max;
      pos = state.bMarks[startLine] + state.tShift[startLine];
      max = state.eMarks[startLine];
      if (pos >= max) {
        return -1;
      }
      marker = state.src.charCodeAt(pos++);
      if (marker !== 42 && marker !== 45 && marker !== 43) {
        return -1;
      }
      if (pos < max && state.src.charCodeAt(pos) !== 32) {
        return -1;
      }
      return pos;
    }
    function skipOrderedListMarker(state, startLine) {
      var ch, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (pos + 1 >= max) {
        return -1;
      }
      ch = state.src.charCodeAt(pos++);
      if (ch < 48 || ch > 57) {
        return -1;
      }
      for (; ; ) {
        if (pos >= max) {
          return -1;
        }
        ch = state.src.charCodeAt(pos++);
        if (ch >= 48 && ch <= 57) {
          continue;
        }
        if (ch === 41 || ch === 46) {
          break;
        }
        return -1;
      }
      if (pos < max && state.src.charCodeAt(pos) !== 32) {
        return -1;
      }
      return pos;
    }
    function markTightParagraphs(state, idx) {
      var i2, l, level = state.level + 2;
      for (i2 = idx + 2, l = state.tokens.length - 2; i2 < l; i2++) {
        if (state.tokens[i2].level === level && state.tokens[i2].type === "paragraph_open") {
          state.tokens[i2 + 2].tight = true;
          state.tokens[i2].tight = true;
          i2 += 2;
        }
      }
    }
    function list(state, startLine, endLine, silent) {
      var nextLine, indent, oldTShift, oldIndent, oldTight, oldParentType, start, posAfterMarker, max, indentAfterMarker, markerValue, markerCharCode, isOrdered, contentStart, listTokIdx, prevEmptyEnd, listLines, itemLines, tight = true, terminatorRules, i2, l, terminate;
      if ((posAfterMarker = skipOrderedListMarker(state, startLine)) >= 0) {
        isOrdered = true;
      } else if ((posAfterMarker = skipBulletListMarker(state, startLine)) >= 0) {
        isOrdered = false;
      } else {
        return false;
      }
      if (state.level >= state.options.maxNesting) {
        return false;
      }
      markerCharCode = state.src.charCodeAt(posAfterMarker - 1);
      if (silent) {
        return true;
      }
      listTokIdx = state.tokens.length;
      if (isOrdered) {
        start = state.bMarks[startLine] + state.tShift[startLine];
        markerValue = Number(state.src.substr(start, posAfterMarker - start - 1));
        state.tokens.push({
          type: "ordered_list_open",
          order: markerValue,
          lines: listLines = [startLine, 0],
          level: state.level++
        });
      } else {
        state.tokens.push({
          type: "bullet_list_open",
          lines: listLines = [startLine, 0],
          level: state.level++
        });
      }
      nextLine = startLine;
      prevEmptyEnd = false;
      terminatorRules = state.parser.ruler.getRules("list");
      while (nextLine < endLine) {
        contentStart = state.skipSpaces(posAfterMarker);
        max = state.eMarks[nextLine];
        if (contentStart >= max) {
          indentAfterMarker = 1;
        } else {
          indentAfterMarker = contentStart - posAfterMarker;
        }
        if (indentAfterMarker > 4) {
          indentAfterMarker = 1;
        }
        if (indentAfterMarker < 1) {
          indentAfterMarker = 1;
        }
        indent = posAfterMarker - state.bMarks[nextLine] + indentAfterMarker;
        state.tokens.push({
          type: "list_item_open",
          lines: itemLines = [startLine, 0],
          level: state.level++
        });
        oldIndent = state.blkIndent;
        oldTight = state.tight;
        oldTShift = state.tShift[startLine];
        oldParentType = state.parentType;
        state.tShift[startLine] = contentStart - state.bMarks[startLine];
        state.blkIndent = indent;
        state.tight = true;
        state.parentType = "list";
        state.parser.tokenize(state, startLine, endLine, true);
        if (!state.tight || prevEmptyEnd) {
          tight = false;
        }
        prevEmptyEnd = state.line - startLine > 1 && state.isEmpty(state.line - 1);
        state.blkIndent = oldIndent;
        state.tShift[startLine] = oldTShift;
        state.tight = oldTight;
        state.parentType = oldParentType;
        state.tokens.push({
          type: "list_item_close",
          level: --state.level
        });
        nextLine = startLine = state.line;
        itemLines[1] = nextLine;
        contentStart = state.bMarks[startLine];
        if (nextLine >= endLine) {
          break;
        }
        if (state.isEmpty(nextLine)) {
          break;
        }
        if (state.tShift[nextLine] < state.blkIndent) {
          break;
        }
        terminate = false;
        for (i2 = 0, l = terminatorRules.length; i2 < l; i2++) {
          if (terminatorRules[i2](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
        if (isOrdered) {
          posAfterMarker = skipOrderedListMarker(state, nextLine);
          if (posAfterMarker < 0) {
            break;
          }
        } else {
          posAfterMarker = skipBulletListMarker(state, nextLine);
          if (posAfterMarker < 0) {
            break;
          }
        }
        if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) {
          break;
        }
      }
      state.tokens.push({
        type: isOrdered ? "ordered_list_close" : "bullet_list_close",
        level: --state.level
      });
      listLines[1] = nextLine;
      state.line = nextLine;
      if (tight) {
        markTightParagraphs(state, listTokIdx);
      }
      return true;
    }
    function footnote(state, startLine, endLine, silent) {
      var oldBMark, oldTShift, oldParentType, pos, label, start = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (start + 4 > max) {
        return false;
      }
      if (state.src.charCodeAt(start) !== 91) {
        return false;
      }
      if (state.src.charCodeAt(start + 1) !== 94) {
        return false;
      }
      if (state.level >= state.options.maxNesting) {
        return false;
      }
      for (pos = start + 2; pos < max; pos++) {
        if (state.src.charCodeAt(pos) === 32) {
          return false;
        }
        if (state.src.charCodeAt(pos) === 93) {
          break;
        }
      }
      if (pos === start + 2) {
        return false;
      }
      if (pos + 1 >= max || state.src.charCodeAt(++pos) !== 58) {
        return false;
      }
      if (silent) {
        return true;
      }
      pos++;
      if (!state.env.footnotes) {
        state.env.footnotes = {};
      }
      if (!state.env.footnotes.refs) {
        state.env.footnotes.refs = {};
      }
      label = state.src.slice(start + 2, pos - 2);
      state.env.footnotes.refs[":" + label] = -1;
      state.tokens.push({
        type: "footnote_reference_open",
        label,
        level: state.level++
      });
      oldBMark = state.bMarks[startLine];
      oldTShift = state.tShift[startLine];
      oldParentType = state.parentType;
      state.tShift[startLine] = state.skipSpaces(pos) - pos;
      state.bMarks[startLine] = pos;
      state.blkIndent += 4;
      state.parentType = "footnote";
      if (state.tShift[startLine] < state.blkIndent) {
        state.tShift[startLine] += state.blkIndent;
        state.bMarks[startLine] -= state.blkIndent;
      }
      state.parser.tokenize(state, startLine, endLine, true);
      state.parentType = oldParentType;
      state.blkIndent -= 4;
      state.tShift[startLine] = oldTShift;
      state.bMarks[startLine] = oldBMark;
      state.tokens.push({
        type: "footnote_reference_close",
        level: --state.level
      });
      return true;
    }
    function heading(state, startLine, endLine, silent) {
      var ch, level, tmp, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (pos >= max) {
        return false;
      }
      ch = state.src.charCodeAt(pos);
      if (ch !== 35 || pos >= max) {
        return false;
      }
      level = 1;
      ch = state.src.charCodeAt(++pos);
      while (ch === 35 && pos < max && level <= 6) {
        level++;
        ch = state.src.charCodeAt(++pos);
      }
      if (level > 6 || pos < max && ch !== 32) {
        return false;
      }
      if (silent) {
        return true;
      }
      max = state.skipCharsBack(max, 32, pos);
      tmp = state.skipCharsBack(max, 35, pos);
      if (tmp > pos && state.src.charCodeAt(tmp - 1) === 32) {
        max = tmp;
      }
      state.line = startLine + 1;
      state.tokens.push({
        type: "heading_open",
        hLevel: level,
        lines: [startLine, state.line],
        level: state.level
      });
      if (pos < max) {
        state.tokens.push({
          type: "inline",
          content: state.src.slice(pos, max).trim(),
          level: state.level + 1,
          lines: [startLine, state.line],
          children: []
        });
      }
      state.tokens.push({type: "heading_close", hLevel: level, level: state.level});
      return true;
    }
    function lheading(state, startLine, endLine) {
      var marker, pos, max, next = startLine + 1;
      if (next >= endLine) {
        return false;
      }
      if (state.tShift[next] < state.blkIndent) {
        return false;
      }
      if (state.tShift[next] - state.blkIndent > 3) {
        return false;
      }
      pos = state.bMarks[next] + state.tShift[next];
      max = state.eMarks[next];
      if (pos >= max) {
        return false;
      }
      marker = state.src.charCodeAt(pos);
      if (marker !== 45 && marker !== 61) {
        return false;
      }
      pos = state.skipChars(pos, marker);
      pos = state.skipSpaces(pos);
      if (pos < max) {
        return false;
      }
      pos = state.bMarks[startLine] + state.tShift[startLine];
      state.line = next + 1;
      state.tokens.push({
        type: "heading_open",
        hLevel: marker === 61 ? 1 : 2,
        lines: [startLine, state.line],
        level: state.level
      });
      state.tokens.push({
        type: "inline",
        content: state.src.slice(pos, state.eMarks[startLine]).trim(),
        level: state.level + 1,
        lines: [startLine, state.line - 1],
        children: []
      });
      state.tokens.push({
        type: "heading_close",
        hLevel: marker === 61 ? 1 : 2,
        level: state.level
      });
      return true;
    }
    var html_blocks = {};
    [
      "article",
      "aside",
      "button",
      "blockquote",
      "body",
      "canvas",
      "caption",
      "col",
      "colgroup",
      "dd",
      "div",
      "dl",
      "dt",
      "embed",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "header",
      "hgroup",
      "hr",
      "iframe",
      "li",
      "map",
      "object",
      "ol",
      "output",
      "p",
      "pre",
      "progress",
      "script",
      "section",
      "style",
      "table",
      "tbody",
      "td",
      "textarea",
      "tfoot",
      "th",
      "tr",
      "thead",
      "ul",
      "video"
    ].forEach(function(name) {
      html_blocks[name] = true;
    });
    var HTML_TAG_OPEN_RE = /^<([a-zA-Z]{1,15})[\s\/>]/;
    var HTML_TAG_CLOSE_RE = /^<\/([a-zA-Z]{1,15})[\s>]/;
    function isLetter$1(ch) {
      var lc = ch | 32;
      return lc >= 97 && lc <= 122;
    }
    function htmlblock(state, startLine, endLine, silent) {
      var ch, match, nextLine, pos = state.bMarks[startLine], max = state.eMarks[startLine], shift = state.tShift[startLine];
      pos += shift;
      if (!state.options.html) {
        return false;
      }
      if (shift > 3 || pos + 2 >= max) {
        return false;
      }
      if (state.src.charCodeAt(pos) !== 60) {
        return false;
      }
      ch = state.src.charCodeAt(pos + 1);
      if (ch === 33 || ch === 63) {
        if (silent) {
          return true;
        }
      } else if (ch === 47 || isLetter$1(ch)) {
        if (ch === 47) {
          match = state.src.slice(pos, max).match(HTML_TAG_CLOSE_RE);
          if (!match) {
            return false;
          }
        } else {
          match = state.src.slice(pos, max).match(HTML_TAG_OPEN_RE);
          if (!match) {
            return false;
          }
        }
        if (html_blocks[match[1].toLowerCase()] !== true) {
          return false;
        }
        if (silent) {
          return true;
        }
      } else {
        return false;
      }
      nextLine = startLine + 1;
      while (nextLine < state.lineMax && !state.isEmpty(nextLine)) {
        nextLine++;
      }
      state.line = nextLine;
      state.tokens.push({
        type: "htmlblock",
        level: state.level,
        lines: [startLine, state.line],
        content: state.getLines(startLine, nextLine, 0, true)
      });
      return true;
    }
    function getLine(state, line) {
      var pos = state.bMarks[line] + state.blkIndent, max = state.eMarks[line];
      return state.src.substr(pos, max - pos);
    }
    function table(state, startLine, endLine, silent) {
      var ch, lineText, pos, i2, nextLine, rows, cell, aligns, t, tableLines, tbodyLines;
      if (startLine + 2 > endLine) {
        return false;
      }
      nextLine = startLine + 1;
      if (state.tShift[nextLine] < state.blkIndent) {
        return false;
      }
      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      if (pos >= state.eMarks[nextLine]) {
        return false;
      }
      ch = state.src.charCodeAt(pos);
      if (ch !== 124 && ch !== 45 && ch !== 58) {
        return false;
      }
      lineText = getLine(state, startLine + 1);
      if (!/^[-:| ]+$/.test(lineText)) {
        return false;
      }
      rows = lineText.split("|");
      if (rows <= 2) {
        return false;
      }
      aligns = [];
      for (i2 = 0; i2 < rows.length; i2++) {
        t = rows[i2].trim();
        if (!t) {
          if (i2 === 0 || i2 === rows.length - 1) {
            continue;
          } else {
            return false;
          }
        }
        if (!/^:?-+:?$/.test(t)) {
          return false;
        }
        if (t.charCodeAt(t.length - 1) === 58) {
          aligns.push(t.charCodeAt(0) === 58 ? "center" : "right");
        } else if (t.charCodeAt(0) === 58) {
          aligns.push("left");
        } else {
          aligns.push("");
        }
      }
      lineText = getLine(state, startLine).trim();
      if (lineText.indexOf("|") === -1) {
        return false;
      }
      rows = lineText.replace(/^\||\|$/g, "").split("|");
      if (aligns.length !== rows.length) {
        return false;
      }
      if (silent) {
        return true;
      }
      state.tokens.push({
        type: "table_open",
        lines: tableLines = [startLine, 0],
        level: state.level++
      });
      state.tokens.push({
        type: "thead_open",
        lines: [startLine, startLine + 1],
        level: state.level++
      });
      state.tokens.push({
        type: "tr_open",
        lines: [startLine, startLine + 1],
        level: state.level++
      });
      for (i2 = 0; i2 < rows.length; i2++) {
        state.tokens.push({
          type: "th_open",
          align: aligns[i2],
          lines: [startLine, startLine + 1],
          level: state.level++
        });
        state.tokens.push({
          type: "inline",
          content: rows[i2].trim(),
          lines: [startLine, startLine + 1],
          level: state.level,
          children: []
        });
        state.tokens.push({type: "th_close", level: --state.level});
      }
      state.tokens.push({type: "tr_close", level: --state.level});
      state.tokens.push({type: "thead_close", level: --state.level});
      state.tokens.push({
        type: "tbody_open",
        lines: tbodyLines = [startLine + 2, 0],
        level: state.level++
      });
      for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
        if (state.tShift[nextLine] < state.blkIndent) {
          break;
        }
        lineText = getLine(state, nextLine).trim();
        if (lineText.indexOf("|") === -1) {
          break;
        }
        rows = lineText.replace(/^\||\|$/g, "").split("|");
        state.tokens.push({type: "tr_open", level: state.level++});
        for (i2 = 0; i2 < rows.length; i2++) {
          state.tokens.push({type: "td_open", align: aligns[i2], level: state.level++});
          cell = rows[i2].substring(rows[i2].charCodeAt(0) === 124 ? 1 : 0, rows[i2].charCodeAt(rows[i2].length - 1) === 124 ? rows[i2].length - 1 : rows[i2].length).trim();
          state.tokens.push({
            type: "inline",
            content: cell,
            level: state.level,
            children: []
          });
          state.tokens.push({type: "td_close", level: --state.level});
        }
        state.tokens.push({type: "tr_close", level: --state.level});
      }
      state.tokens.push({type: "tbody_close", level: --state.level});
      state.tokens.push({type: "table_close", level: --state.level});
      tableLines[1] = tbodyLines[1] = nextLine;
      state.line = nextLine;
      return true;
    }
    function skipMarker(state, line) {
      var pos, marker, start = state.bMarks[line] + state.tShift[line], max = state.eMarks[line];
      if (start >= max) {
        return -1;
      }
      marker = state.src.charCodeAt(start++);
      if (marker !== 126 && marker !== 58) {
        return -1;
      }
      pos = state.skipSpaces(start);
      if (start === pos) {
        return -1;
      }
      if (pos >= max) {
        return -1;
      }
      return pos;
    }
    function markTightParagraphs$1(state, idx) {
      var i2, l, level = state.level + 2;
      for (i2 = idx + 2, l = state.tokens.length - 2; i2 < l; i2++) {
        if (state.tokens[i2].level === level && state.tokens[i2].type === "paragraph_open") {
          state.tokens[i2 + 2].tight = true;
          state.tokens[i2].tight = true;
          i2 += 2;
        }
      }
    }
    function deflist(state, startLine, endLine, silent) {
      var contentStart, ddLine, dtLine, itemLines, listLines, listTokIdx, nextLine, oldIndent, oldDDIndent, oldParentType, oldTShift, oldTight, prevEmptyEnd, tight;
      if (silent) {
        if (state.ddIndent < 0) {
          return false;
        }
        return skipMarker(state, startLine) >= 0;
      }
      nextLine = startLine + 1;
      if (state.isEmpty(nextLine)) {
        if (++nextLine > endLine) {
          return false;
        }
      }
      if (state.tShift[nextLine] < state.blkIndent) {
        return false;
      }
      contentStart = skipMarker(state, nextLine);
      if (contentStart < 0) {
        return false;
      }
      if (state.level >= state.options.maxNesting) {
        return false;
      }
      listTokIdx = state.tokens.length;
      state.tokens.push({
        type: "dl_open",
        lines: listLines = [startLine, 0],
        level: state.level++
      });
      dtLine = startLine;
      ddLine = nextLine;
      OUTER:
        for (; ; ) {
          tight = true;
          prevEmptyEnd = false;
          state.tokens.push({
            type: "dt_open",
            lines: [dtLine, dtLine],
            level: state.level++
          });
          state.tokens.push({
            type: "inline",
            content: state.getLines(dtLine, dtLine + 1, state.blkIndent, false).trim(),
            level: state.level + 1,
            lines: [dtLine, dtLine],
            children: []
          });
          state.tokens.push({
            type: "dt_close",
            level: --state.level
          });
          for (; ; ) {
            state.tokens.push({
              type: "dd_open",
              lines: itemLines = [nextLine, 0],
              level: state.level++
            });
            oldTight = state.tight;
            oldDDIndent = state.ddIndent;
            oldIndent = state.blkIndent;
            oldTShift = state.tShift[ddLine];
            oldParentType = state.parentType;
            state.blkIndent = state.ddIndent = state.tShift[ddLine] + 2;
            state.tShift[ddLine] = contentStart - state.bMarks[ddLine];
            state.tight = true;
            state.parentType = "deflist";
            state.parser.tokenize(state, ddLine, endLine, true);
            if (!state.tight || prevEmptyEnd) {
              tight = false;
            }
            prevEmptyEnd = state.line - ddLine > 1 && state.isEmpty(state.line - 1);
            state.tShift[ddLine] = oldTShift;
            state.tight = oldTight;
            state.parentType = oldParentType;
            state.blkIndent = oldIndent;
            state.ddIndent = oldDDIndent;
            state.tokens.push({
              type: "dd_close",
              level: --state.level
            });
            itemLines[1] = nextLine = state.line;
            if (nextLine >= endLine) {
              break OUTER;
            }
            if (state.tShift[nextLine] < state.blkIndent) {
              break OUTER;
            }
            contentStart = skipMarker(state, nextLine);
            if (contentStart < 0) {
              break;
            }
            ddLine = nextLine;
          }
          if (nextLine >= endLine) {
            break;
          }
          dtLine = nextLine;
          if (state.isEmpty(dtLine)) {
            break;
          }
          if (state.tShift[dtLine] < state.blkIndent) {
            break;
          }
          ddLine = dtLine + 1;
          if (ddLine >= endLine) {
            break;
          }
          if (state.isEmpty(ddLine)) {
            ddLine++;
          }
          if (ddLine >= endLine) {
            break;
          }
          if (state.tShift[ddLine] < state.blkIndent) {
            break;
          }
          contentStart = skipMarker(state, ddLine);
          if (contentStart < 0) {
            break;
          }
        }
      state.tokens.push({
        type: "dl_close",
        level: --state.level
      });
      listLines[1] = nextLine;
      state.line = nextLine;
      if (tight) {
        markTightParagraphs$1(state, listTokIdx);
      }
      return true;
    }
    function paragraph(state, startLine) {
      var endLine, content, terminate, i2, l, nextLine = startLine + 1, terminatorRules;
      endLine = state.lineMax;
      if (nextLine < endLine && !state.isEmpty(nextLine)) {
        terminatorRules = state.parser.ruler.getRules("paragraph");
        for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
          if (state.tShift[nextLine] - state.blkIndent > 3) {
            continue;
          }
          terminate = false;
          for (i2 = 0, l = terminatorRules.length; i2 < l; i2++) {
            if (terminatorRules[i2](state, nextLine, endLine, true)) {
              terminate = true;
              break;
            }
          }
          if (terminate) {
            break;
          }
        }
      }
      content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
      state.line = nextLine;
      if (content.length) {
        state.tokens.push({
          type: "paragraph_open",
          tight: false,
          lines: [startLine, state.line],
          level: state.level
        });
        state.tokens.push({
          type: "inline",
          content,
          level: state.level + 1,
          lines: [startLine, state.line],
          children: []
        });
        state.tokens.push({
          type: "paragraph_close",
          tight: false,
          level: state.level
        });
      }
      return true;
    }
    var _rules$1 = [
      ["code", code],
      ["fences", fences, ["paragraph", "blockquote", "list"]],
      ["blockquote", blockquote, ["paragraph", "blockquote", "list"]],
      ["hr", hr, ["paragraph", "blockquote", "list"]],
      ["list", list, ["paragraph", "blockquote"]],
      ["footnote", footnote, ["paragraph"]],
      ["heading", heading, ["paragraph", "blockquote"]],
      ["lheading", lheading],
      ["htmlblock", htmlblock, ["paragraph", "blockquote"]],
      ["table", table, ["paragraph"]],
      ["deflist", deflist, ["paragraph"]],
      ["paragraph", paragraph]
    ];
    function ParserBlock() {
      this.ruler = new Ruler();
      for (var i2 = 0; i2 < _rules$1.length; i2++) {
        this.ruler.push(_rules$1[i2][0], _rules$1[i2][1], {
          alt: (_rules$1[i2][2] || []).slice()
        });
      }
    }
    ParserBlock.prototype.tokenize = function(state, startLine, endLine) {
      var rules2 = this.ruler.getRules("");
      var len = rules2.length;
      var line = startLine;
      var hasEmptyLines = false;
      var ok, i2;
      while (line < endLine) {
        state.line = line = state.skipEmptyLines(line);
        if (line >= endLine) {
          break;
        }
        if (state.tShift[line] < state.blkIndent) {
          break;
        }
        for (i2 = 0; i2 < len; i2++) {
          ok = rules2[i2](state, line, endLine, false);
          if (ok) {
            break;
          }
        }
        state.tight = !hasEmptyLines;
        if (state.isEmpty(state.line - 1)) {
          hasEmptyLines = true;
        }
        line = state.line;
        if (line < endLine && state.isEmpty(line)) {
          hasEmptyLines = true;
          line++;
          if (line < endLine && state.parentType === "list" && state.isEmpty(line)) {
            break;
          }
          state.line = line;
        }
      }
    };
    var TABS_SCAN_RE = /[\n\t]/g;
    var NEWLINES_RE = /\r[\n\u0085]|[\u2424\u2028\u0085]/g;
    var SPACES_RE = /\u00a0/g;
    ParserBlock.prototype.parse = function(str, options2, env, outTokens) {
      var state, lineStart = 0, lastTabPos = 0;
      if (!str) {
        return [];
      }
      str = str.replace(SPACES_RE, " ");
      str = str.replace(NEWLINES_RE, "\n");
      if (str.indexOf("	") >= 0) {
        str = str.replace(TABS_SCAN_RE, function(match, offset) {
          var result;
          if (str.charCodeAt(offset) === 10) {
            lineStart = offset + 1;
            lastTabPos = 0;
            return match;
          }
          result = "    ".slice((offset - lineStart - lastTabPos) % 4);
          lastTabPos = offset - lineStart + 1;
          return result;
        });
      }
      state = new StateBlock(str, this, options2, env, outTokens);
      this.tokenize(state, state.line, state.lineMax);
    };
    function isTerminatorChar(ch) {
      switch (ch) {
        case 10:
        case 92:
        case 96:
        case 42:
        case 95:
        case 94:
        case 91:
        case 93:
        case 33:
        case 38:
        case 60:
        case 62:
        case 123:
        case 125:
        case 36:
        case 37:
        case 64:
        case 126:
        case 43:
        case 61:
        case 58:
          return true;
        default:
          return false;
      }
    }
    function text(state, silent) {
      var pos = state.pos;
      while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
        pos++;
      }
      if (pos === state.pos) {
        return false;
      }
      if (!silent) {
        state.pending += state.src.slice(state.pos, pos);
      }
      state.pos = pos;
      return true;
    }
    function newline(state, silent) {
      var pmax, max, pos = state.pos;
      if (state.src.charCodeAt(pos) !== 10) {
        return false;
      }
      pmax = state.pending.length - 1;
      max = state.posMax;
      if (!silent) {
        if (pmax >= 0 && state.pending.charCodeAt(pmax) === 32) {
          if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 32) {
            for (var i2 = pmax - 2; i2 >= 0; i2--) {
              if (state.pending.charCodeAt(i2) !== 32) {
                state.pending = state.pending.substring(0, i2 + 1);
                break;
              }
            }
            state.push({
              type: "hardbreak",
              level: state.level
            });
          } else {
            state.pending = state.pending.slice(0, -1);
            state.push({
              type: "softbreak",
              level: state.level
            });
          }
        } else {
          state.push({
            type: "softbreak",
            level: state.level
          });
        }
      }
      pos++;
      while (pos < max && state.src.charCodeAt(pos) === 32) {
        pos++;
      }
      state.pos = pos;
      return true;
    }
    var ESCAPED = [];
    for (var i = 0; i < 256; i++) {
      ESCAPED.push(0);
    }
    "\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(ch) {
      ESCAPED[ch.charCodeAt(0)] = 1;
    });
    function escape4(state, silent) {
      var ch, pos = state.pos, max = state.posMax;
      if (state.src.charCodeAt(pos) !== 92) {
        return false;
      }
      pos++;
      if (pos < max) {
        ch = state.src.charCodeAt(pos);
        if (ch < 256 && ESCAPED[ch] !== 0) {
          if (!silent) {
            state.pending += state.src[pos];
          }
          state.pos += 2;
          return true;
        }
        if (ch === 10) {
          if (!silent) {
            state.push({
              type: "hardbreak",
              level: state.level
            });
          }
          pos++;
          while (pos < max && state.src.charCodeAt(pos) === 32) {
            pos++;
          }
          state.pos = pos;
          return true;
        }
      }
      if (!silent) {
        state.pending += "\\";
      }
      state.pos++;
      return true;
    }
    function backticks(state, silent) {
      var start, max, marker, matchStart, matchEnd, pos = state.pos, ch = state.src.charCodeAt(pos);
      if (ch !== 96) {
        return false;
      }
      start = pos;
      pos++;
      max = state.posMax;
      while (pos < max && state.src.charCodeAt(pos) === 96) {
        pos++;
      }
      marker = state.src.slice(start, pos);
      matchStart = matchEnd = pos;
      while ((matchStart = state.src.indexOf("`", matchEnd)) !== -1) {
        matchEnd = matchStart + 1;
        while (matchEnd < max && state.src.charCodeAt(matchEnd) === 96) {
          matchEnd++;
        }
        if (matchEnd - matchStart === marker.length) {
          if (!silent) {
            state.push({
              type: "code",
              content: state.src.slice(pos, matchStart).replace(/[ \n]+/g, " ").trim(),
              block: false,
              level: state.level
            });
          }
          state.pos = matchEnd;
          return true;
        }
      }
      if (!silent) {
        state.pending += marker;
      }
      state.pos += marker.length;
      return true;
    }
    function del(state, silent) {
      var found, pos, stack, max = state.posMax, start = state.pos, lastChar, nextChar;
      if (state.src.charCodeAt(start) !== 126) {
        return false;
      }
      if (silent) {
        return false;
      }
      if (start + 4 >= max) {
        return false;
      }
      if (state.src.charCodeAt(start + 1) !== 126) {
        return false;
      }
      if (state.level >= state.options.maxNesting) {
        return false;
      }
      lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
      nextChar = state.src.charCodeAt(start + 2);
      if (lastChar === 126) {
        return false;
      }
      if (nextChar === 126) {
        return false;
      }
      if (nextChar === 32 || nextChar === 10) {
        return false;
      }
      pos = start + 2;
      while (pos < max && state.src.charCodeAt(pos) === 126) {
        pos++;
      }
      if (pos > start + 3) {
        state.pos += pos - start;
        if (!silent) {
          state.pending += state.src.slice(start, pos);
        }
        return true;
      }
      state.pos = start + 2;
      stack = 1;
      while (state.pos + 1 < max) {
        if (state.src.charCodeAt(state.pos) === 126) {
          if (state.src.charCodeAt(state.pos + 1) === 126) {
            lastChar = state.src.charCodeAt(state.pos - 1);
            nextChar = state.pos + 2 < max ? state.src.charCodeAt(state.pos + 2) : -1;
            if (nextChar !== 126 && lastChar !== 126) {
              if (lastChar !== 32 && lastChar !== 10) {
                stack--;
              } else if (nextChar !== 32 && nextChar !== 10) {
                stack++;
              }
              if (stack <= 0) {
                found = true;
                break;
              }
            }
          }
        }
        state.parser.skipToken(state);
      }
      if (!found) {
        state.pos = start;
        return false;
      }
      state.posMax = state.pos;
      state.pos = start + 2;
      if (!silent) {
        state.push({type: "del_open", level: state.level++});
        state.parser.tokenize(state);
        state.push({type: "del_close", level: --state.level});
      }
      state.pos = state.posMax + 2;
      state.posMax = max;
      return true;
    }
    function ins(state, silent) {
      var found, pos, stack, max = state.posMax, start = state.pos, lastChar, nextChar;
      if (state.src.charCodeAt(start) !== 43) {
        return false;
      }
      if (silent) {
        return false;
      }
      if (start + 4 >= max) {
        return false;
      }
      if (state.src.charCodeAt(start + 1) !== 43) {
        return false;
      }
      if (state.level >= state.options.maxNesting) {
        return false;
      }
      lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
      nextChar = state.src.charCodeAt(start + 2);
      if (lastChar === 43) {
        return false;
      }
      if (nextChar === 43) {
        return false;
      }
      if (nextChar === 32 || nextChar === 10) {
        return false;
      }
      pos = start + 2;
      while (pos < max && state.src.charCodeAt(pos) === 43) {
        pos++;
      }
      if (pos !== start + 2) {
        state.pos += pos - start;
        if (!silent) {
          state.pending += state.src.slice(start, pos);
        }
        return true;
      }
      state.pos = start + 2;
      stack = 1;
      while (state.pos + 1 < max) {
        if (state.src.charCodeAt(state.pos) === 43) {
          if (state.src.charCodeAt(state.pos + 1) === 43) {
            lastChar = state.src.charCodeAt(state.pos - 1);
            nextChar = state.pos + 2 < max ? state.src.charCodeAt(state.pos + 2) : -1;
            if (nextChar !== 43 && lastChar !== 43) {
              if (lastChar !== 32 && lastChar !== 10) {
                stack--;
              } else if (nextChar !== 32 && nextChar !== 10) {
                stack++;
              }
              if (stack <= 0) {
                found = true;
                break;
              }
            }
          }
        }
        state.parser.skipToken(state);
      }
      if (!found) {
        state.pos = start;
        return false;
      }
      state.posMax = state.pos;
      state.pos = start + 2;
      if (!silent) {
        state.push({type: "ins_open", level: state.level++});
        state.parser.tokenize(state);
        state.push({type: "ins_close", level: --state.level});
      }
      state.pos = state.posMax + 2;
      state.posMax = max;
      return true;
    }
    function mark(state, silent) {
      var found, pos, stack, max = state.posMax, start = state.pos, lastChar, nextChar;
      if (state.src.charCodeAt(start) !== 61) {
        return false;
      }
      if (silent) {
        return false;
      }
      if (start + 4 >= max) {
        return false;
      }
      if (state.src.charCodeAt(start + 1) !== 61) {
        return false;
      }
      if (state.level >= state.options.maxNesting) {
        return false;
      }
      lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
      nextChar = state.src.charCodeAt(start + 2);
      if (lastChar === 61) {
        return false;
      }
      if (nextChar === 61) {
        return false;
      }
      if (nextChar === 32 || nextChar === 10) {
        return false;
      }
      pos = start + 2;
      while (pos < max && state.src.charCodeAt(pos) === 61) {
        pos++;
      }
      if (pos !== start + 2) {
        state.pos += pos - start;
        if (!silent) {
          state.pending += state.src.slice(start, pos);
        }
        return true;
      }
      state.pos = start + 2;
      stack = 1;
      while (state.pos + 1 < max) {
        if (state.src.charCodeAt(state.pos) === 61) {
          if (state.src.charCodeAt(state.pos + 1) === 61) {
            lastChar = state.src.charCodeAt(state.pos - 1);
            nextChar = state.pos + 2 < max ? state.src.charCodeAt(state.pos + 2) : -1;
            if (nextChar !== 61 && lastChar !== 61) {
              if (lastChar !== 32 && lastChar !== 10) {
                stack--;
              } else if (nextChar !== 32 && nextChar !== 10) {
                stack++;
              }
              if (stack <= 0) {
                found = true;
                break;
              }
            }
          }
        }
        state.parser.skipToken(state);
      }
      if (!found) {
        state.pos = start;
        return false;
      }
      state.posMax = state.pos;
      state.pos = start + 2;
      if (!silent) {
        state.push({type: "mark_open", level: state.level++});
        state.parser.tokenize(state);
        state.push({type: "mark_close", level: --state.level});
      }
      state.pos = state.posMax + 2;
      state.posMax = max;
      return true;
    }
    function isAlphaNum(code2) {
      return code2 >= 48 && code2 <= 57 || code2 >= 65 && code2 <= 90 || code2 >= 97 && code2 <= 122;
    }
    function scanDelims(state, start) {
      var pos = start, lastChar, nextChar, count, can_open = true, can_close = true, max = state.posMax, marker = state.src.charCodeAt(start);
      lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
      while (pos < max && state.src.charCodeAt(pos) === marker) {
        pos++;
      }
      if (pos >= max) {
        can_open = false;
      }
      count = pos - start;
      if (count >= 4) {
        can_open = can_close = false;
      } else {
        nextChar = pos < max ? state.src.charCodeAt(pos) : -1;
        if (nextChar === 32 || nextChar === 10) {
          can_open = false;
        }
        if (lastChar === 32 || lastChar === 10) {
          can_close = false;
        }
        if (marker === 95) {
          if (isAlphaNum(lastChar)) {
            can_open = false;
          }
          if (isAlphaNum(nextChar)) {
            can_close = false;
          }
        }
      }
      return {
        can_open,
        can_close,
        delims: count
      };
    }
    function emphasis(state, silent) {
      var startCount, count, found, oldCount, newCount, stack, res, max = state.posMax, start = state.pos, marker = state.src.charCodeAt(start);
      if (marker !== 95 && marker !== 42) {
        return false;
      }
      if (silent) {
        return false;
      }
      res = scanDelims(state, start);
      startCount = res.delims;
      if (!res.can_open) {
        state.pos += startCount;
        if (!silent) {
          state.pending += state.src.slice(start, state.pos);
        }
        return true;
      }
      if (state.level >= state.options.maxNesting) {
        return false;
      }
      state.pos = start + startCount;
      stack = [startCount];
      while (state.pos < max) {
        if (state.src.charCodeAt(state.pos) === marker) {
          res = scanDelims(state, state.pos);
          count = res.delims;
          if (res.can_close) {
            oldCount = stack.pop();
            newCount = count;
            while (oldCount !== newCount) {
              if (newCount < oldCount) {
                stack.push(oldCount - newCount);
                break;
              }
              newCount -= oldCount;
              if (stack.length === 0) {
                break;
              }
              state.pos += oldCount;
              oldCount = stack.pop();
            }
            if (stack.length === 0) {
              startCount = oldCount;
              found = true;
              break;
            }
            state.pos += count;
            continue;
          }
          if (res.can_open) {
            stack.push(count);
          }
          state.pos += count;
          continue;
        }
        state.parser.skipToken(state);
      }
      if (!found) {
        state.pos = start;
        return false;
      }
      state.posMax = state.pos;
      state.pos = start + startCount;
      if (!silent) {
        if (startCount === 2 || startCount === 3) {
          state.push({type: "strong_open", level: state.level++});
        }
        if (startCount === 1 || startCount === 3) {
          state.push({type: "em_open", level: state.level++});
        }
        state.parser.tokenize(state);
        if (startCount === 1 || startCount === 3) {
          state.push({type: "em_close", level: --state.level});
        }
        if (startCount === 2 || startCount === 3) {
          state.push({type: "strong_close", level: --state.level});
        }
      }
      state.pos = state.posMax + startCount;
      state.posMax = max;
      return true;
    }
    var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
    function sub(state, silent) {
      var found, content, max = state.posMax, start = state.pos;
      if (state.src.charCodeAt(start) !== 126) {
        return false;
      }
      if (silent) {
        return false;
      }
      if (start + 2 >= max) {
        return false;
      }
      if (state.level >= state.options.maxNesting) {
        return false;
      }
      state.pos = start + 1;
      while (state.pos < max) {
        if (state.src.charCodeAt(state.pos) === 126) {
          found = true;
          break;
        }
        state.parser.skipToken(state);
      }
      if (!found || start + 1 === state.pos) {
        state.pos = start;
        return false;
      }
      content = state.src.slice(start + 1, state.pos);
      if (content.match(/(^|[^\\])(\\\\)*\s/)) {
        state.pos = start;
        return false;
      }
      state.posMax = state.pos;
      state.pos = start + 1;
      if (!silent) {
        state.push({
          type: "sub",
          level: state.level,
          content: content.replace(UNESCAPE_RE, "$1")
        });
      }
      state.pos = state.posMax + 1;
      state.posMax = max;
      return true;
    }
    var UNESCAPE_RE$1 = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
    function sup(state, silent) {
      var found, content, max = state.posMax, start = state.pos;
      if (state.src.charCodeAt(start) !== 94) {
        return false;
      }
      if (silent) {
        return false;
      }
      if (start + 2 >= max) {
        return false;
      }
      if (state.level >= state.options.maxNesting) {
        return false;
      }
      state.pos = start + 1;
      while (state.pos < max) {
        if (state.src.charCodeAt(state.pos) === 94) {
          found = true;
          break;
        }
        state.parser.skipToken(state);
      }
      if (!found || start + 1 === state.pos) {
        state.pos = start;
        return false;
      }
      content = state.src.slice(start + 1, state.pos);
      if (content.match(/(^|[^\\])(\\\\)*\s/)) {
        state.pos = start;
        return false;
      }
      state.posMax = state.pos;
      state.pos = start + 1;
      if (!silent) {
        state.push({
          type: "sup",
          level: state.level,
          content: content.replace(UNESCAPE_RE$1, "$1")
        });
      }
      state.pos = state.posMax + 1;
      state.posMax = max;
      return true;
    }
    function links(state, silent) {
      var labelStart, labelEnd, label, href, title, pos, ref, code2, isImage = false, oldPos = state.pos, max = state.posMax, start = state.pos, marker = state.src.charCodeAt(start);
      if (marker === 33) {
        isImage = true;
        marker = state.src.charCodeAt(++start);
      }
      if (marker !== 91) {
        return false;
      }
      if (state.level >= state.options.maxNesting) {
        return false;
      }
      labelStart = start + 1;
      labelEnd = parseLinkLabel(state, start);
      if (labelEnd < 0) {
        return false;
      }
      pos = labelEnd + 1;
      if (pos < max && state.src.charCodeAt(pos) === 40) {
        pos++;
        for (; pos < max; pos++) {
          code2 = state.src.charCodeAt(pos);
          if (code2 !== 32 && code2 !== 10) {
            break;
          }
        }
        if (pos >= max) {
          return false;
        }
        start = pos;
        if (parseLinkDestination(state, pos)) {
          href = state.linkContent;
          pos = state.pos;
        } else {
          href = "";
        }
        start = pos;
        for (; pos < max; pos++) {
          code2 = state.src.charCodeAt(pos);
          if (code2 !== 32 && code2 !== 10) {
            break;
          }
        }
        if (pos < max && start !== pos && parseLinkTitle(state, pos)) {
          title = state.linkContent;
          pos = state.pos;
          for (; pos < max; pos++) {
            code2 = state.src.charCodeAt(pos);
            if (code2 !== 32 && code2 !== 10) {
              break;
            }
          }
        } else {
          title = "";
        }
        if (pos >= max || state.src.charCodeAt(pos) !== 41) {
          state.pos = oldPos;
          return false;
        }
        pos++;
      } else {
        if (state.linkLevel > 0) {
          return false;
        }
        for (; pos < max; pos++) {
          code2 = state.src.charCodeAt(pos);
          if (code2 !== 32 && code2 !== 10) {
            break;
          }
        }
        if (pos < max && state.src.charCodeAt(pos) === 91) {
          start = pos + 1;
          pos = parseLinkLabel(state, pos);
          if (pos >= 0) {
            label = state.src.slice(start, pos++);
          } else {
            pos = start - 1;
          }
        }
        if (!label) {
          if (typeof label === "undefined") {
            pos = labelEnd + 1;
          }
          label = state.src.slice(labelStart, labelEnd);
        }
        ref = state.env.references[normalizeReference(label)];
        if (!ref) {
          state.pos = oldPos;
          return false;
        }
        href = ref.href;
        title = ref.title;
      }
      if (!silent) {
        state.pos = labelStart;
        state.posMax = labelEnd;
        if (isImage) {
          state.push({
            type: "image",
            src: href,
            title,
            alt: state.src.substr(labelStart, labelEnd - labelStart),
            level: state.level
          });
        } else {
          state.push({
            type: "link_open",
            href,
            title,
            level: state.level++
          });
          state.linkLevel++;
          state.parser.tokenize(state);
          state.linkLevel--;
          state.push({type: "link_close", level: --state.level});
        }
      }
      state.pos = pos;
      state.posMax = max;
      return true;
    }
    function footnote_inline(state, silent) {
      var labelStart, labelEnd, footnoteId, oldLength, max = state.posMax, start = state.pos;
      if (start + 2 >= max) {
        return false;
      }
      if (state.src.charCodeAt(start) !== 94) {
        return false;
      }
      if (state.src.charCodeAt(start + 1) !== 91) {
        return false;
      }
      if (state.level >= state.options.maxNesting) {
        return false;
      }
      labelStart = start + 2;
      labelEnd = parseLinkLabel(state, start + 1);
      if (labelEnd < 0) {
        return false;
      }
      if (!silent) {
        if (!state.env.footnotes) {
          state.env.footnotes = {};
        }
        if (!state.env.footnotes.list) {
          state.env.footnotes.list = [];
        }
        footnoteId = state.env.footnotes.list.length;
        state.pos = labelStart;
        state.posMax = labelEnd;
        state.push({
          type: "footnote_ref",
          id: footnoteId,
          level: state.level
        });
        state.linkLevel++;
        oldLength = state.tokens.length;
        state.parser.tokenize(state);
        state.env.footnotes.list[footnoteId] = {tokens: state.tokens.splice(oldLength)};
        state.linkLevel--;
      }
      state.pos = labelEnd + 1;
      state.posMax = max;
      return true;
    }
    function footnote_ref(state, silent) {
      var label, pos, footnoteId, footnoteSubId, max = state.posMax, start = state.pos;
      if (start + 3 > max) {
        return false;
      }
      if (!state.env.footnotes || !state.env.footnotes.refs) {
        return false;
      }
      if (state.src.charCodeAt(start) !== 91) {
        return false;
      }
      if (state.src.charCodeAt(start + 1) !== 94) {
        return false;
      }
      if (state.level >= state.options.maxNesting) {
        return false;
      }
      for (pos = start + 2; pos < max; pos++) {
        if (state.src.charCodeAt(pos) === 32) {
          return false;
        }
        if (state.src.charCodeAt(pos) === 10) {
          return false;
        }
        if (state.src.charCodeAt(pos) === 93) {
          break;
        }
      }
      if (pos === start + 2) {
        return false;
      }
      if (pos >= max) {
        return false;
      }
      pos++;
      label = state.src.slice(start + 2, pos - 1);
      if (typeof state.env.footnotes.refs[":" + label] === "undefined") {
        return false;
      }
      if (!silent) {
        if (!state.env.footnotes.list) {
          state.env.footnotes.list = [];
        }
        if (state.env.footnotes.refs[":" + label] < 0) {
          footnoteId = state.env.footnotes.list.length;
          state.env.footnotes.list[footnoteId] = {label, count: 0};
          state.env.footnotes.refs[":" + label] = footnoteId;
        } else {
          footnoteId = state.env.footnotes.refs[":" + label];
        }
        footnoteSubId = state.env.footnotes.list[footnoteId].count;
        state.env.footnotes.list[footnoteId].count++;
        state.push({
          type: "footnote_ref",
          id: footnoteId,
          subId: footnoteSubId,
          level: state.level
        });
      }
      state.pos = pos;
      state.posMax = max;
      return true;
    }
    var url_schemas = [
      "coap",
      "doi",
      "javascript",
      "aaa",
      "aaas",
      "about",
      "acap",
      "cap",
      "cid",
      "crid",
      "data",
      "dav",
      "dict",
      "dns",
      "file",
      "ftp",
      "geo",
      "go",
      "gopher",
      "h323",
      "http",
      "https",
      "iax",
      "icap",
      "im",
      "imap",
      "info",
      "ipp",
      "iris",
      "iris.beep",
      "iris.xpc",
      "iris.xpcs",
      "iris.lwz",
      "ldap",
      "mailto",
      "mid",
      "msrp",
      "msrps",
      "mtqp",
      "mupdate",
      "news",
      "nfs",
      "ni",
      "nih",
      "nntp",
      "opaquelocktoken",
      "pop",
      "pres",
      "rtsp",
      "service",
      "session",
      "shttp",
      "sieve",
      "sip",
      "sips",
      "sms",
      "snmp",
      "soap.beep",
      "soap.beeps",
      "tag",
      "tel",
      "telnet",
      "tftp",
      "thismessage",
      "tn3270",
      "tip",
      "tv",
      "urn",
      "vemmi",
      "ws",
      "wss",
      "xcon",
      "xcon-userid",
      "xmlrpc.beep",
      "xmlrpc.beeps",
      "xmpp",
      "z39.50r",
      "z39.50s",
      "adiumxtra",
      "afp",
      "afs",
      "aim",
      "apt",
      "attachment",
      "aw",
      "beshare",
      "bitcoin",
      "bolo",
      "callto",
      "chrome",
      "chrome-extension",
      "com-eventbrite-attendee",
      "content",
      "cvs",
      "dlna-playsingle",
      "dlna-playcontainer",
      "dtn",
      "dvb",
      "ed2k",
      "facetime",
      "feed",
      "finger",
      "fish",
      "gg",
      "git",
      "gizmoproject",
      "gtalk",
      "hcp",
      "icon",
      "ipn",
      "irc",
      "irc6",
      "ircs",
      "itms",
      "jar",
      "jms",
      "keyparc",
      "lastfm",
      "ldaps",
      "magnet",
      "maps",
      "market",
      "message",
      "mms",
      "ms-help",
      "msnim",
      "mumble",
      "mvn",
      "notes",
      "oid",
      "palm",
      "paparazzi",
      "platform",
      "proxy",
      "psyc",
      "query",
      "res",
      "resource",
      "rmi",
      "rsync",
      "rtmp",
      "secondlife",
      "sftp",
      "sgn",
      "skype",
      "smb",
      "soldat",
      "spotify",
      "ssh",
      "steam",
      "svn",
      "teamspeak",
      "things",
      "udp",
      "unreal",
      "ut2004",
      "ventrilo",
      "view-source",
      "webcal",
      "wtai",
      "wyciwyg",
      "xfire",
      "xri",
      "ymsgr"
    ];
    var EMAIL_RE = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;
    var AUTOLINK_RE = /^<([a-zA-Z.\-]{1,25}):([^<>\x00-\x20]*)>/;
    function autolink(state, silent) {
      var tail, linkMatch, emailMatch, url2, fullUrl, pos = state.pos;
      if (state.src.charCodeAt(pos) !== 60) {
        return false;
      }
      tail = state.src.slice(pos);
      if (tail.indexOf(">") < 0) {
        return false;
      }
      linkMatch = tail.match(AUTOLINK_RE);
      if (linkMatch) {
        if (url_schemas.indexOf(linkMatch[1].toLowerCase()) < 0) {
          return false;
        }
        url2 = linkMatch[0].slice(1, -1);
        fullUrl = normalizeLink(url2);
        if (!state.parser.validateLink(url2)) {
          return false;
        }
        if (!silent) {
          state.push({
            type: "link_open",
            href: fullUrl,
            level: state.level
          });
          state.push({
            type: "text",
            content: url2,
            level: state.level + 1
          });
          state.push({type: "link_close", level: state.level});
        }
        state.pos += linkMatch[0].length;
        return true;
      }
      emailMatch = tail.match(EMAIL_RE);
      if (emailMatch) {
        url2 = emailMatch[0].slice(1, -1);
        fullUrl = normalizeLink("mailto:" + url2);
        if (!state.parser.validateLink(fullUrl)) {
          return false;
        }
        if (!silent) {
          state.push({
            type: "link_open",
            href: fullUrl,
            level: state.level
          });
          state.push({
            type: "text",
            content: url2,
            level: state.level + 1
          });
          state.push({type: "link_close", level: state.level});
        }
        state.pos += emailMatch[0].length;
        return true;
      }
      return false;
    }
    function replace$1(regex, options2) {
      regex = regex.source;
      options2 = options2 || "";
      return function self2(name, val) {
        if (!name) {
          return new RegExp(regex, options2);
        }
        val = val.source || val;
        regex = regex.replace(name, val);
        return self2;
      };
    }
    var attr_name = /[a-zA-Z_:][a-zA-Z0-9:._-]*/;
    var unquoted = /[^"'=<>`\x00-\x20]+/;
    var single_quoted = /'[^']*'/;
    var double_quoted = /"[^"]*"/;
    var attr_value = replace$1(/(?:unquoted|single_quoted|double_quoted)/)("unquoted", unquoted)("single_quoted", single_quoted)("double_quoted", double_quoted)();
    var attribute = replace$1(/(?:\s+attr_name(?:\s*=\s*attr_value)?)/)("attr_name", attr_name)("attr_value", attr_value)();
    var open_tag = replace$1(/<[A-Za-z][A-Za-z0-9]*attribute*\s*\/?>/)("attribute", attribute)();
    var close_tag = /<\/[A-Za-z][A-Za-z0-9]*\s*>/;
    var comment = /<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->/;
    var processing = /<[?].*?[?]>/;
    var declaration = /<![A-Z]+\s+[^>]*>/;
    var cdata = /<!\[CDATA\[[\s\S]*?\]\]>/;
    var HTML_TAG_RE = replace$1(/^(?:open_tag|close_tag|comment|processing|declaration|cdata)/)("open_tag", open_tag)("close_tag", close_tag)("comment", comment)("processing", processing)("declaration", declaration)("cdata", cdata)();
    function isLetter$2(ch) {
      var lc = ch | 32;
      return lc >= 97 && lc <= 122;
    }
    function htmltag(state, silent) {
      var ch, match, max, pos = state.pos;
      if (!state.options.html) {
        return false;
      }
      max = state.posMax;
      if (state.src.charCodeAt(pos) !== 60 || pos + 2 >= max) {
        return false;
      }
      ch = state.src.charCodeAt(pos + 1);
      if (ch !== 33 && ch !== 63 && ch !== 47 && !isLetter$2(ch)) {
        return false;
      }
      match = state.src.slice(pos).match(HTML_TAG_RE);
      if (!match) {
        return false;
      }
      if (!silent) {
        state.push({
          type: "htmltag",
          content: state.src.slice(pos, pos + match[0].length),
          level: state.level
        });
      }
      state.pos += match[0].length;
      return true;
    }
    var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i;
    var NAMED_RE = /^&([a-z][a-z0-9]{1,31});/i;
    function entity(state, silent) {
      var ch, code2, match, pos = state.pos, max = state.posMax;
      if (state.src.charCodeAt(pos) !== 38) {
        return false;
      }
      if (pos + 1 < max) {
        ch = state.src.charCodeAt(pos + 1);
        if (ch === 35) {
          match = state.src.slice(pos).match(DIGITAL_RE);
          if (match) {
            if (!silent) {
              code2 = match[1][0].toLowerCase() === "x" ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
              state.pending += isValidEntityCode(code2) ? fromCodePoint(code2) : fromCodePoint(65533);
            }
            state.pos += match[0].length;
            return true;
          }
        } else {
          match = state.src.slice(pos).match(NAMED_RE);
          if (match) {
            var decoded = decodeEntity(match[1]);
            if (match[1] !== decoded) {
              if (!silent) {
                state.pending += decoded;
              }
              state.pos += match[0].length;
              return true;
            }
          }
        }
      }
      if (!silent) {
        state.pending += "&";
      }
      state.pos++;
      return true;
    }
    var _rules$2 = [
      ["text", text],
      ["newline", newline],
      ["escape", escape4],
      ["backticks", backticks],
      ["del", del],
      ["ins", ins],
      ["mark", mark],
      ["emphasis", emphasis],
      ["sub", sub],
      ["sup", sup],
      ["links", links],
      ["footnote_inline", footnote_inline],
      ["footnote_ref", footnote_ref],
      ["autolink", autolink],
      ["htmltag", htmltag],
      ["entity", entity]
    ];
    function ParserInline() {
      this.ruler = new Ruler();
      for (var i2 = 0; i2 < _rules$2.length; i2++) {
        this.ruler.push(_rules$2[i2][0], _rules$2[i2][1]);
      }
      this.validateLink = validateLink;
    }
    ParserInline.prototype.skipToken = function(state) {
      var rules2 = this.ruler.getRules("");
      var len = rules2.length;
      var pos = state.pos;
      var i2, cached_pos;
      if ((cached_pos = state.cacheGet(pos)) > 0) {
        state.pos = cached_pos;
        return;
      }
      for (i2 = 0; i2 < len; i2++) {
        if (rules2[i2](state, true)) {
          state.cacheSet(pos, state.pos);
          return;
        }
      }
      state.pos++;
      state.cacheSet(pos, state.pos);
    };
    ParserInline.prototype.tokenize = function(state) {
      var rules2 = this.ruler.getRules("");
      var len = rules2.length;
      var end = state.posMax;
      var ok, i2;
      while (state.pos < end) {
        for (i2 = 0; i2 < len; i2++) {
          ok = rules2[i2](state, false);
          if (ok) {
            break;
          }
        }
        if (ok) {
          if (state.pos >= end) {
            break;
          }
          continue;
        }
        state.pending += state.src[state.pos++];
      }
      if (state.pending) {
        state.pushPending();
      }
    };
    ParserInline.prototype.parse = function(str, options2, env, outTokens) {
      var state = new StateInline(str, this, options2, env, outTokens);
      this.tokenize(state);
    };
    function validateLink(url2) {
      var BAD_PROTOCOLS = ["vbscript", "javascript", "file", "data"];
      var str = url2.trim().toLowerCase();
      str = replaceEntities(str);
      if (str.indexOf(":") !== -1 && BAD_PROTOCOLS.indexOf(str.split(":")[0]) !== -1) {
        return false;
      }
      return true;
    }
    var defaultConfig = {
      options: {
        html: false,
        xhtmlOut: false,
        breaks: false,
        langPrefix: "language-",
        linkTarget: "",
        typographer: false,
        quotes: "\u201C\u201D\u2018\u2019",
        highlight: null,
        maxNesting: 20
      },
      components: {
        core: {
          rules: [
            "block",
            "inline",
            "references",
            "replacements",
            "smartquotes",
            "references",
            "abbr2",
            "footnote_tail"
          ]
        },
        block: {
          rules: [
            "blockquote",
            "code",
            "fences",
            "footnote",
            "heading",
            "hr",
            "htmlblock",
            "lheading",
            "list",
            "paragraph",
            "table"
          ]
        },
        inline: {
          rules: [
            "autolink",
            "backticks",
            "del",
            "emphasis",
            "entity",
            "escape",
            "footnote_ref",
            "htmltag",
            "links",
            "newline",
            "text"
          ]
        }
      }
    };
    var fullConfig = {
      options: {
        html: false,
        xhtmlOut: false,
        breaks: false,
        langPrefix: "language-",
        linkTarget: "",
        typographer: false,
        quotes: "\u201C\u201D\u2018\u2019",
        highlight: null,
        maxNesting: 20
      },
      components: {
        core: {},
        block: {},
        inline: {}
      }
    };
    var commonmarkConfig = {
      options: {
        html: true,
        xhtmlOut: true,
        breaks: false,
        langPrefix: "language-",
        linkTarget: "",
        typographer: false,
        quotes: "\u201C\u201D\u2018\u2019",
        highlight: null,
        maxNesting: 20
      },
      components: {
        core: {
          rules: [
            "block",
            "inline",
            "references",
            "abbr2"
          ]
        },
        block: {
          rules: [
            "blockquote",
            "code",
            "fences",
            "heading",
            "hr",
            "htmlblock",
            "lheading",
            "list",
            "paragraph"
          ]
        },
        inline: {
          rules: [
            "autolink",
            "backticks",
            "emphasis",
            "entity",
            "escape",
            "htmltag",
            "links",
            "newline",
            "text"
          ]
        }
      }
    };
    var config = {
      "default": defaultConfig,
      "full": fullConfig,
      "commonmark": commonmarkConfig
    };
    function StateCore(instance, str, env) {
      this.src = str;
      this.env = env;
      this.options = instance.options;
      this.tokens = [];
      this.inlineMode = false;
      this.inline = instance.inline;
      this.block = instance.block;
      this.renderer = instance.renderer;
      this.typographer = instance.typographer;
    }
    function Remarkable2(preset, options2) {
      if (typeof preset !== "string") {
        options2 = preset;
        preset = "default";
      }
      if (options2 && options2.linkify != null) {
        console.warn("linkify option is removed. Use linkify plugin instead:\n\nimport Remarkable from 'remarkable';\nimport linkify from 'remarkable/linkify';\nnew Remarkable().use(linkify)\n");
      }
      this.inline = new ParserInline();
      this.block = new ParserBlock();
      this.core = new Core();
      this.renderer = new Renderer();
      this.ruler = new Ruler();
      this.options = {};
      this.configure(config[preset]);
      this.set(options2 || {});
    }
    Remarkable2.prototype.set = function(options2) {
      assign2(this.options, options2);
    };
    Remarkable2.prototype.configure = function(presets) {
      var self2 = this;
      if (!presets) {
        throw new Error("Wrong `remarkable` preset, check name/content");
      }
      if (presets.options) {
        self2.set(presets.options);
      }
      if (presets.components) {
        Object.keys(presets.components).forEach(function(name) {
          if (presets.components[name].rules) {
            self2[name].ruler.enable(presets.components[name].rules, true);
          }
        });
      }
    };
    Remarkable2.prototype.use = function(plugin, options2) {
      plugin(this, options2);
      return this;
    };
    Remarkable2.prototype.parse = function(str, env) {
      var state = new StateCore(this, str, env);
      this.core.process(state);
      return state.tokens;
    };
    Remarkable2.prototype.render = function(str, env) {
      env = env || {};
      return this.renderer.render(this.parse(str, env), this.options, env);
    };
    Remarkable2.prototype.parseInline = function(str, env) {
      var state = new StateCore(this, str, env);
      state.inlineMode = true;
      this.core.process(state);
      return state.tokens;
    };
    Remarkable2.prototype.renderInline = function(str, env) {
      env = env || {};
      return this.renderer.render(this.parseInline(str, env), this.options, env);
    };
    exports.Remarkable = Remarkable2;
    exports.utils = utils;
  }
});

// .svelte-kit/vercel/entry.js
__markAsModule(exports);
__export(exports, {
  default: () => entry_default
});

// node_modules/@sveltejs/kit/dist/node.js
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h = req.headers;
    if (!h["content-type"]) {
      fulfil(null);
      return;
    }
    req.on("error", reject);
    const length = Number(h["content-length"]);
    let data;
    if (!isNaN(length)) {
      data = new Uint8Array(length);
      let i = 0;
      req.on("data", (chunk) => {
        data.set(chunk, i);
        i += chunk.length;
      });
    } else {
      if (h["transfer-encoding"] === void 0) {
        fulfil(null);
        return;
      }
      data = new Uint8Array(0);
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      const [type] = h["content-type"].split(/;\s*/);
      if (type === "application/octet-stream") {
        fulfil(data);
      }
      const decoder = new TextDecoder(h["content-encoding"] || "utf-8");
      fulfil(decoder.decode(data));
    });
  });
}

// node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var {Readable} = import_stream.default;
var wm = new WeakMap();
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
var Blob = class {
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let buffer;
      if (element instanceof Buffer) {
        buffer = element;
      } else if (ArrayBuffer.isView(element)) {
        buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
      } else if (element instanceof ArrayBuffer) {
        buffer = Buffer.from(element);
      } else if (element instanceof Blob) {
        buffer = element;
      } else {
        buffer = Buffer.from(typeof element === "string" ? element : String(element));
      }
      size += buffer.length || buffer.size || 0;
      return buffer;
    });
    const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
    wm.set(this, {
      type: /[^\u0020-\u007E]/.test(type) ? "" : type,
      size,
      parts
    });
  }
  get size() {
    return wm.get(this).size;
  }
  get type() {
    return wm.get(this).type;
  }
  async text() {
    return Buffer.from(await this.arrayBuffer()).toString();
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of this.stream()) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    return Readable.from(read(wm.get(this).parts));
  }
  slice(start = 0, end = this.size, type = "") {
    const {size} = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = wm.get(this).parts.values();
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
        blobParts.push(chunk);
        added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
        relativeStart = 0;
        if (added >= span) {
          break;
        }
      }
    }
    const blob = new Blob([], {type: String(type).toLowerCase()});
    Object.assign(wm.get(blob), {size: span, parts: blobParts});
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(Blob.prototype, {
  size: {enumerable: true},
  type: {enumerable: true},
  slice: {enumerable: true}
});
var fetchBlob = Blob;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && object[NAME] === "AbortSignal";
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (err) => {
        const error3 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
        this[INTERNALS$2].error = error3;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const {buffer, byteOffset, byteLength} = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new fetchBlob([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: {enumerable: true},
  bodyUsed: {enumerable: true},
  arrayBuffer: {enumerable: true},
  blob: {enumerable: true},
  json: {enumerable: true},
  text: {enumerable: true}
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let {body} = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error3) {
    if (error3 instanceof FetchBaseError) {
      throw error3;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error3.message}`, "system", error3);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error3) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error3.message}`, "system", error3);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let {body} = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({highWaterMark});
    p2 = new import_stream.PassThrough({highWaterMark});
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const {body} = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, {body}) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(err, "code", {value: "ERR_INVALID_HTTP_TOKEN"});
    throw err;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const err = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(err, "code", {value: "ERR_INVALID_CHAR"});
    throw err;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback) {
    for (const name of this.keys()) {
      callback(this.get(name), name);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = {enumerable: true};
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response2 = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status || 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response2(clone(this, this.highWaterMark), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url2, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response2(null, {
      headers: {
        location: new URL(url2).toString()
      },
      status
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response2.prototype, {
  url: {enumerable: true},
  status: {enumerable: true},
  ok: {enumerable: true},
  redirected: {enumerable: true},
  statusText: {enumerable: true},
  headers: {enumerable: true},
  clone: {enumerable: true}
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal !== null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: {enumerable: true},
  url: {enumerable: true},
  headers: {enumerable: true},
  redirect: {enumerable: true},
  clone: {enumerable: true},
  signal: {enumerable: true}
});
var getNodeRequestOptions = (request) => {
  const {parsedURL} = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let {agent} = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch2(url2, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url2, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url2}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = src(request.url);
      const response2 = new Response2(data, {headers: {"Content-Type": data.typeFull}});
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const {signal} = request;
    let response = null;
    const abort = () => {
      const error3 = new AbortError("The operation was aborted.");
      reject(error3);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error3);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error3);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error3) {
                reject(error3);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch2(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
        reject(error3);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error3) => {
          reject(error3);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
          reject(error3);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error3) => {
              reject(error3);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error3) => {
              reject(error3);
            });
          }
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error3) => {
          reject(error3);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
globalThis.fetch = fetch2;
globalThis.Response = Response2;
globalThis.Request = Request;
globalThis.Headers = Headers;

// node_modules/@sveltejs/kit/dist/ssr.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return {set, update, subscribe: subscribe2};
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  options: options2,
  $session,
  page_config,
  status,
  error: error3,
  branch,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error3) {
    error3.stack = options2.get_stack(error3);
  }
  if (branch) {
    branch.forEach(({node, loaded, fetched, uses_credentials}) => {
      if (node.css)
        node.css.forEach((url2) => css2.add(url2));
      if (node.js)
        node.js.forEach((url2) => js.add(url2));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({node}) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = {head: "", html: "", css: ""};
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 ? `<style amp-custom>${Array.from(styles).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"></script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error4) => {
      throw new Error(`Failed to serialize session data: ${error4.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error3)},
					nodes: [
						${branch.map(({node}) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page.path)},
						query: new URLSearchParams(${s$1(page.query.toString())}),
						params: ${s$1(page.params)}
					}
				}` : "null"}
			});
		</script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({url: url2, body: body2, json}) => {
    return body2 ? `<script type="svelte-data" url="${url2}" body="${hash(body2)}">${json}</script>` : `<script type="svelte-data" url="${url2}">${json}</script>`;
  }).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({head, body})
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error3) {
  if (!error3)
    return null;
  let serialized = try_serialize(error3);
  if (!serialized) {
    const {name, message, stack} = error3;
    serialized = try_serialize({name, message, stack});
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  if (loaded.error) {
    const error3 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    const status = loaded.status;
    if (!(error3 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error3}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return {status: 500, error: error3};
    }
    return {status, error: error3};
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
function resolve(base, path) {
  const baseparts = path[0] === "/" ? [] : base.slice(1).split("/");
  const pathparts = path[0] === "/" ? path.slice(1).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  return `/${baseparts.join("/")}`;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  context,
  is_leaf,
  is_error,
  status,
  error: error3
}) {
  const {module: module2} = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  if (module2.load) {
    const load_input = {
      page,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url2;
        if (typeof resource === "string") {
          url2 = resource;
        } else {
          url2 = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        if (options2.read && url2.startsWith(options2.paths.assets)) {
          url2 = url2.replace(options2.paths.assets, "");
        }
        if (url2.startsWith("//")) {
          throw new Error(`Cannot request protocol-relative URL (${url2}) in server-side fetch`);
        }
        let response;
        if (/^[a-zA-Z]+:/.test(url2)) {
          response = await fetch(url2, opts);
        } else {
          const [path, search] = url2.split("?");
          const resolved = resolve(request.path, path);
          const filename = resolved.slice(1);
          const filename_html = `${filename}/index.html`;
          const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
          if (asset) {
            if (options2.read) {
              response = new Response(options2.read(asset.file), {
                headers: {
                  "content-type": asset.type
                }
              });
            } else {
              response = await fetch(`http://${page.host}/${asset.file}`, opts);
            }
          }
          if (!response) {
            const headers = {...opts.headers};
            if (opts.credentials !== "omit") {
              uses_credentials = true;
              headers.cookie = request.headers.cookie;
              if (!headers.authorization) {
                headers.authorization = request.headers.authorization;
              }
            }
            if (opts.body && typeof opts.body !== "string") {
              throw new Error("Request body must be a string");
            }
            const rendered = await respond({
              host: request.host,
              method: opts.method || "GET",
              headers,
              path: resolved,
              rawBody: opts.body,
              query: new URLSearchParams(search)
            }, options2, {
              fetched: url2,
              initiator: route
            });
            if (rendered) {
              if (state.prerender) {
                state.prerender.dependencies.set(resolved, rendered);
              }
              response = new Response(rendered.body, {
                status: rendered.status,
                headers: rendered.headers
              });
            }
          }
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url: url2,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape2(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: {...context}
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error3;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape2(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
async function respond_with_error({request, options: options2, state, $session, status, error: error3}) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    context: {},
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      context: loaded.context,
      is_leaf: false,
      is_error: true,
      status,
      error: error3
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error3,
      branch,
      page
    });
  } catch (error4) {
    options2.handle_error(error4);
    return {
      status: 500,
      headers: {},
      body: error4.stack
    };
  }
}
async function respond$1({request, options: options2, state, $session, route}) {
  const match = route.pattern.exec(request.path);
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id && options2.load_component(id)));
  } catch (error4) {
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  const page_config = {
    ssr: "ssr" in leaf ? leaf.ssr : options2.ssr,
    router: "router" in leaf ? leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? leaf.hydrate : options2.hydrate
  };
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: null
    };
  }
  let branch;
  let status = 200;
  let error3;
  ssr:
    if (page_config.ssr) {
      let context = {};
      branch = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              request,
              options: options2,
              state,
              route,
              page,
              node,
              $session,
              context,
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
            }
            if (loaded.loaded.error) {
              ({status, error: error3} = loaded.loaded);
            }
          } catch (e) {
            options2.handle_error(e);
            status = 500;
            error3 = e;
          }
          if (error3) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let error_loaded;
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  error_loaded = await load_node({
                    request,
                    options: options2,
                    state,
                    route,
                    page,
                    node: error_node,
                    $session,
                    context: node_loaded.context,
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error3
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (e) {
                  options2.handle_error(e);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error3
            });
          }
        }
        branch.push(loaded);
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      options: options2,
      $session,
      page_config,
      status,
      error: error3,
      branch: branch && branch.filter(Boolean),
      page
    });
  } catch (error4) {
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
}
async function render_page(request, route, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const $session = await options2.hooks.getSession(request);
  if (route) {
    const response = await respond$1({
      request,
      options: options2,
      state,
      $session,
      route
    });
    if (response) {
      return response;
    }
    if (state.fetched) {
      return {
        status: 500,
        headers: {},
        body: `Bad request in load function: failed to fetch ${state.fetched}`
      };
    }
  } else {
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 404,
      error: new Error(`Not found: ${request.path}`)
    });
  }
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
async function render_route(request, route) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (handler) {
    const match = route.pattern.exec(request.path);
    const params = route.params(match);
    const response = await handler({...request, params});
    if (response) {
      if (typeof response !== "object") {
        return error(`Invalid response from route ${request.path}: expected an object, got ${typeof response}`);
      }
      let {status = 200, body, headers = {}} = response;
      headers = lowercase_keys(headers);
      const type = headers["content-type"];
      if (type === "application/octet-stream" && !(body instanceof Uint8Array)) {
        return error(`Invalid response from route ${request.path}: body must be an instance of Uint8Array if content type is application/octet-stream`);
      }
      if (body instanceof Uint8Array && type !== "application/octet-stream") {
        return error(`Invalid response from route ${request.path}: Uint8Array body must be accompanied by content-type: application/octet-stream header`);
      }
      let normalized_body;
      if (typeof body === "object" && (!type || type === "application/json")) {
        headers = {...headers, "content-type": "application/json"};
        normalized_body = JSON.stringify(body);
      } else {
        normalized_body = body;
      }
      return {status, body: normalized_body, headers};
    }
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        map.get(key).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  #map;
  constructor(map) {
    this.#map = map;
  }
  get(key) {
    const value = this.#map.get(key);
    return value && value[0];
  }
  getAll(key) {
    return this.#map.get(key);
  }
  has(key) {
    return this.#map.has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield key;
      }
    }
  }
  *values() {
    for (const [, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield value;
      }
    }
  }
};
function parse_body(req) {
  const raw = req.rawBody;
  if (!raw)
    return raw;
  const [type, ...directives] = req.headers["content-type"].split(/;\s*/);
  if (typeof raw === "string") {
    switch (type) {
      case "text/plain":
        return raw;
      case "application/json":
        return JSON.parse(raw);
      case "application/x-www-form-urlencoded":
        return get_urlencoded(raw);
      case "multipart/form-data": {
        const boundary = directives.find((directive) => directive.startsWith("boundary="));
        if (!boundary)
          throw new Error("Missing boundary");
        return get_multipart(raw, boundary.slice("boundary=".length));
      }
      default:
        throw new Error(`Invalid Content-Type ${type}`);
    }
  }
  return raw;
}
function get_urlencoded(text) {
  const {data, append} = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  const nope = () => {
    throw new Error("Malformed form data");
  };
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    nope();
  }
  const {data, append} = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          nope();
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      nope();
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path.endsWith("/") && incoming.path !== "/") {
    const q = incoming.query.toString();
    return {
      status: 301,
      headers: {
        location: encodeURI(incoming.path.slice(0, -1) + (q ? `?${q}` : ""))
      }
    };
  }
  try {
    return await options2.hooks.handle({
      request: {
        ...incoming,
        headers: lowercase_keys(incoming.headers),
        body: parse_body(incoming),
        params: null,
        locals: {}
      },
      render: async (request) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request),
            page_config: {ssr: false, router: true, hydrate: true},
            status: 200,
            error: null,
            branch: [],
            page: null
          });
        }
        for (const route of options2.manifest.routes) {
          if (!route.pattern.test(request.path))
            continue;
          const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options2, state);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${hash(response.body)}"`;
                if (request.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: null
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        return await render_page(request, null, options2, state);
      }
    });
  } catch (e) {
    options2.handle_error(e);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}

// node_modules/svelte/internal/index.mjs
function noop2() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
var tasks = new Set();
function custom_event(type, detail) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, false, false, detail);
  return e;
}
var active_docs = new Set();
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
var resolved_promise = Promise.resolve();
var seen_callbacks = new Set();
var outroing = new Set();
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
var boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
var escaped2 = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape3(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({$$});
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, {$$slots = {}, context = new Map()} = {}) => {
      on_destroy = [];
      const result = {title: "", head: "", css: new Set()};
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape3(value)) : `"${value}"`}`}`;
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: "open"});
    }
    connectedCallback() {
      const {on_mount} = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted) {
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr, _oldValue, newValue) {
      this[attr] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop2;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index2 = callbacks.indexOf(callback);
        if (index2 !== -1)
          callbacks.splice(index2, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}

// .svelte-kit/output/server/app.js
var import_svelte_i18n = __toModule(require_runtime_cjs());
var import_storyblok_js_client = __toModule(require_index_cjs());
var import_remarkable = __toModule(require_cjs2());
var css$2 = {
  code: "#svelte-announcer.svelte-1pdgbjn{clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;left:0;overflow:hidden;position:absolute;top:0;white-space:nowrap;width:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n</script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>#svelte-announcer{clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;left:0;overflow:hidden;position:absolute;top:0;white-space:nowrap;width:1px}</style>"],"names":[],"mappings":"AAqDO,gCAAiB,CAAC,KAAK,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,kBAAkB,MAAM,GAAG,CAAC,CAAC,UAAU,MAAM,GAAG,CAAC,CAAC,OAAO,GAAG,CAAC,KAAK,CAAC,CAAC,SAAS,MAAM,CAAC,SAAS,QAAQ,CAAC,IAAI,CAAC,CAAC,YAAY,MAAM,CAAC,MAAM,GAAG,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {stores} = $$props;
  let {page} = $$props;
  let {components} = $$props;
  let {props_0 = null} = $$props;
  let {props_1 = null} = $$props;
  let {props_2 = null} = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title = document.title || "untitled page";
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$2);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1pdgbjn"}">${navigated ? `${escape3(title)}` : ``}</div>` : ``}`;
});
function set_paths(paths) {
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({head, body}) => `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<link rel="icon" href="/favicon.ico" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
		rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">

	<title>Jakub K\u0119pka</title>
	<meta name="description"
		content="oung artist from Warsaw. Student of International School of Clothing Design and Costume Design. A painter by avocation. Possesses works in galleries House with Art Pragaleria, Avantgarden, Xanadu Gallery, some works also on Gallerystore.pl, and took part in this year's Fair of Accessible Art, I also cooperate with Artinfo and Onebid.pl in which he exhibited, among others, works for charity.">

	<style>
		html,
		body {
			overflow-x: hidden;
		}

		body {
			position: relative;
		}


		body {
			-webkit-animation: fadeIn 2.5s !important;
			-moz-animation: fadeIn 2.5s !important;
			animation: fadeIn 2.5s !important;
		}

		@keyframes fadeIn {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@-moz-keyframes fadeIn {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@-webkit-keyframes fadeIn {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		html {
			scroll-behavior: smooth
		}

	</style>
	` + head + '\n\n</head>\n\n<div class="z-50 fixed top-0 w-full flex items-center justify-between gap-x-6 bg-[#FF0000] px-6 py-2.5 sm:pr-3.5 lg:pl-8">\n    <p class="text-sm leading-6 text-black">\n        <a href="https://buy.stripe.com/14k7sT1uH4IIcIEdQQ">\n            <strong class="font-semibold">ABGRUND POKAZ</strong>\n            <svg viewBox="0 0 2 2" class="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">\n                <circle cx="1" cy="1" r="1" />\n            </svg>\n            Widok 22, Warszawa \n			<svg viewBox="0 0 2 2" class="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">\n                <circle cx="1" cy="1" r="1" />\n            </svg>\n			17 Lipca - 21:00\n			<svg viewBox="0 0 2 2" class="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">\n                <circle cx="1" cy="1" r="1" />\n            </svg>\n			Kup Wej\u015Bci\xF3wke&nbsp;<span aria-hidden="true">&rarr;</span>\n        </a>\n    </p>\n    \n</div>\n\n  \n\n<body class="bg-black">\n	<div id="svelte">' + body + "</div>\n</body>\n\n</html>";
var options = null;
function init(settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: "/./_app/start-eea98b70.js",
      css: ["/./_app/assets/start-0826e215.css"],
      js: ["/./_app/start-eea98b70.js", "/./_app/chunks/vendor-ce27f2cc.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => "/./_app/" + entry_lookup[id],
    get_stack: (error22) => String(error22),
    handle_error: (error22) => {
      console.error(error22.stack);
      error22.stack = options.get_stack(error22);
    },
    hooks: get_hooks(user_hooks),
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    read: settings.read,
    root: Root,
    router: true,
    ssr: true,
    target: "#svelte",
    template
  };
}
var empty = () => ({});
var manifest = {
  assets: [{file: "abgrund.JPG", size: 95236, type: "image/jpeg"}],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({request, render: render2}) => render2(request))
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error2;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index;
  })
};
var metadata_lookup = {"src/routes/__layout.svelte": {entry: "/./_app/pages/__layout.svelte-ff651cff.js", css: ["/./_app/assets/pages/__layout.svelte-daa17c7d.css"], js: ["/./_app/pages/__layout.svelte-ff651cff.js", "/./_app/chunks/vendor-ce27f2cc.js"], styles: null}, ".svelte-kit/build/components/error.svelte": {entry: "/./_app/error.svelte-8bc22ad0.js", css: [], js: ["/./_app/error.svelte-8bc22ad0.js", "/./_app/chunks/vendor-ce27f2cc.js"], styles: null}, "src/routes/index.svelte": {entry: "/./_app/pages/index.svelte-7df113ad.js", css: ["/./_app/assets/pages/index.svelte-931c5337.css"], js: ["/./_app/pages/index.svelte-7df113ad.js", "/./_app/chunks/vendor-ce27f2cc.js"], styles: null}};
async function load_component(file) {
  return {
    module: await module_lookup[file](),
    ...metadata_lookup[file]
  };
}
init({paths: {base: "", assets: "/."}});
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({...request, host}, options, {prerender});
}
var Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_, $$unsubscribe__;
  $$unsubscribe__ = subscribe(import_svelte_i18n._, (value) => $_ = value);
  let year = new Date().getFullYear();
  $$unsubscribe__();
  return `<div id="${"nav"}" class="${"mt-24 p-1 sm:py-2 sm:px-4 flex justify-between items-center text-gray-50 uppercase text-xs  sm:text-base"}"><a href="${"#hero"}">\xA9 ${escape3(year)} Jakub K\u0119pka</a>

    <div class="${"hidden sm:block flex justify-start space-x-8 font-semibold"}"><a href="${"#about"}">${escape3($_("nav.about"))}</a>
        <a href="${"#photos"}">${escape3($_("nav.photoshoots"))}</a>
        <a href="${"#nav"}">${escape3($_("nav.paintings"))}</a></div>

    <div><a href="${"https://janowski.dev"}">${escape3($_("footer.by"))}: Janowski.dev</a></div></div>`;
});
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${slots.default ? slots.default({}) : ``}
  
  ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: _layout
});
function load$1({error: error22, status}) {
  return {props: {error: error22, status}};
}
var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {status} = $$props;
  let {error: error22} = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error22 !== void 0)
    $$bindings.error(error22);
  return `<h1>${escape3(status)}</h1>

<p>${escape3(error22.message)}</p>


${error22.stack ? `<pre>${escape3(error22.stack)}</pre>` : ``}`;
});
var error2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Error$1,
  load: load$1
});
var client = new import_storyblok_js_client.default({
  accessToken: "KxvPHENMsmwwwKgGllYrDgtt"
});
var css$1 = {
  code: "img.svelte-9w9yqb{transition:opacity 1s ease-in-out}",
  map: `{"version":3,"file":"Hero.svelte","sources":["Hero.svelte"],"sourcesContent":["<script>\\n\\timport {\\n\\t\\t_\\n\\t}\\n\\tfrom 'svelte-i18n';\\n\\timport { fade } from 'svelte/transition';\\n    function shuffle(array) {\\n    return array.sort(function(){ \\n        return .5 - Math.random(); \\n    });\\n    }\\n\\tlet current = 0;\\n\\tlet images = shuffle([\\n\\t\\t'https://img2.storyblok.com/800x0/filters:format(png)/f/105186/1080x1080/cb06d0f19d/106818436_438138920476271_1604832123519850608_n.jpg',\\n\\t\\t'https://img2.storyblok.com/f/105186/1080x1080/65ba114caa/106256589_145117863876877_2643895214070327709_n.jpg',\\n        'https://img2.storyblok.com/800x0/filters:quality(90),format(png)/f/105186/6000x4000/3023bef980/dscf0080.jpg',\\n        'https://img2.storyblok.com/800x0/filters:quality(90),format(png)/f/105186/5297x3889/6a7cc33d3b/dscf0190.jpg',\\n\\t]);\\n\\n    \\n\\n    \\n\\n\\tconst interval = setInterval(function () {\\n\\t\\tif (current > images.length) {\\n\\t\\t\\tcurrent = 0;\\n\\t\\t} else {\\n\\t\\t\\tcurrent += 1;\\n\\t\\t}\\n\\t}, 3000);\\n</script>\\n\\n<div id=\\"hero\\" class=\\"relative mb-24 text-gray-50 font-title max-h-screen\\">\\n\\t<div transition:fade class=\\"h-screen relative\\" id=\\"hero-image\\">\\n\\t\\t{#each images as image, i}\\n\\t\\t\\t<img style=\\"opacity:0\\"\\n\\t\\t\\t\\tclass=\\"{current === i\\n\\t\\t\\t\\t\\t? '!opacity-25'\\n\\t\\t\\t\\t\\t: 'opacity-0'} opacity-0 absolute h-screen w-full object-cover object-top\\"\\n\\t\\t\\t\\tsrc={image}\\n\\t\\t\\t\\talt=\\"\\"\\n\\t\\t\\t/>\\n\\t\\t{/each}\\n\\t</div>\\n\\t<div class=\\"mt-[35%] sm:mt-[30%] lg:mt-[25%] absolute inset-0\\">\\n\\t\\t<div class=\\"flex justify-center\\">\\n\\t\\t\\t<div>\\n\\t\\t\\t\\t<h1 class=\\"uppercase cursor-default text-9xl font-black text-center tracking-tight\\">Jakub K\u0119pka</h1>\\n\\t\\t\\t\\t<div class=\\"mt-4 text-center\\">\\n\\t\\t\\t\\t\\t<a href=\\"#nav\\" class=\\"group outline-none\\">\\n\\t\\t\\t\\t\\t\\t<p class=\\"uppercase font-semibold text-3xl group-hover:text-gray-200\\">{$_('hero.button')}</p>\\n\\t\\t\\t\\t\\t\\t<div class=\\"flex justify-center\\">\\n\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"h-6 w-6 text-gray-50 group-hover:text-gray-200\\"\\n\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 20 20\\"\\n\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tfill-rule=\\"evenodd\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tclip-rule=\\"evenodd\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>img{transition:opacity 1s ease-in-out}</style>\\n"],"names":[],"mappings":"AAwEO,iBAAG,CAAC,WAAW,OAAO,CAAC,EAAE,CAAC,WAAW,CAAC"}`
};
function shuffle(array) {
  return array.sort(function() {
    return 0.5 - Math.random();
  });
}
var Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_, $$unsubscribe__;
  $$unsubscribe__ = subscribe(import_svelte_i18n._, (value) => $_ = value);
  let current = 0;
  let images = shuffle([
    "https://img2.storyblok.com/800x0/filters:format(png)/f/105186/1080x1080/cb06d0f19d/106818436_438138920476271_1604832123519850608_n.jpg",
    "https://img2.storyblok.com/f/105186/1080x1080/65ba114caa/106256589_145117863876877_2643895214070327709_n.jpg",
    "https://img2.storyblok.com/800x0/filters:quality(90),format(png)/f/105186/6000x4000/3023bef980/dscf0080.jpg",
    "https://img2.storyblok.com/800x0/filters:quality(90),format(png)/f/105186/5297x3889/6a7cc33d3b/dscf0190.jpg"
  ]);
  setInterval(function() {
    if (current > images.length) {
      current = 0;
    } else {
      current += 1;
    }
  }, 3e3);
  $$result.css.add(css$1);
  $$unsubscribe__();
  return `<div id="${"hero"}" class="${"relative mb-24 text-gray-50 font-title max-h-screen"}"><div class="${"h-screen relative"}" id="${"hero-image"}">${each(images, (image, i) => `<img style="${"opacity:0"}" class="${escape3(current === i ? "!opacity-25" : "opacity-0") + " opacity-0 absolute h-screen w-full object-cover object-top svelte-9w9yqb"}"${add_attribute("src", image, 0)} alt="${""}">`)}</div>
	<div class="${"mt-[35%] sm:mt-[30%] lg:mt-[25%] absolute inset-0"}"><div class="${"flex justify-center"}"><div><h1 class="${"uppercase cursor-default text-9xl font-black text-center tracking-tight"}">Jakub K\u0119pka</h1>
				<div class="${"mt-4 text-center"}"><a href="${"#nav"}" class="${"group outline-none"}"><p class="${"uppercase font-semibold text-3xl group-hover:text-gray-200"}">${escape3($_("hero.button"))}</p>
						<div class="${"flex justify-center"}"><svg class="${"h-6 w-6 text-gray-50 group-hover:text-gray-200"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" fill="${"currentColor"}"><path fill-rule="${"evenodd"}" d="${"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"}" clip-rule="${"evenodd"}"></path></svg></div></a></div></div></div></div>
</div>`;
});
var Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_, $$unsubscribe__;
  $$unsubscribe__ = subscribe(import_svelte_i18n._, (value) => $_ = value);
  let {isPL} = $$props;
  createEventDispatcher();
  if ($$props.isPL === void 0 && $$bindings.isPL && isPL !== void 0)
    $$bindings.isPL(isPL);
  $$unsubscribe__();
  return `<div id="${"nav"}" class="${"px-2 sm:px-0 flex justify-between items-center text-gray-50 uppercase"}"><span class="${"text-4xl cursor-default font-black tracking-tight font-title"}">Jakub K\u0119pka</span>

	<div class="${"flex justify-start items-center space-x-2 font-semibold"}"><a class="${"p-1 hidden sm:block"}" href="${"#about"}">${escape3($_("nav.about"))}</a>
		<a class="${"p-1 hidden sm:block"}" href="${"#nav"}">${escape3($_("nav.paintings"))}</a>
		<a class="${"p-1 hidden sm:block"}" href="${"#photos"}">${escape3($_("nav.photoshoots"))}</a>
		<a class="${"p-1 hidden sm:block"}" href="${"#contact"}">${escape3($_("nav.contact"))}</a>

		<button class="${"cursor-pointer p-1 hidden sm:block group focus:outline-none"}"><span class="${"w-8 inline-block group-hover:hidden"}">${isPL ? `PL` : `ENG`}</span>
			<span class="${"w-8 hidden group-hover:inline-block"}">${isPL ? `ENG` : `PL`}</span></button>

		<button class="${"block sm:hidden p-1 rounded"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"text-gray-50 h-5 w-5"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M4 6h16M4 12h16M4 18h16"}"></path></svg></button></div></div>

${``}`;
});
var Painting = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {painting} = $$props;
  let {isPL} = $$props;
  createEventDispatcher();
  if ($$props.painting === void 0 && $$bindings.painting && painting !== void 0)
    $$bindings.painting(painting);
  if ($$props.isPL === void 0 && $$bindings.isPL && isPL !== void 0)
    $$bindings.isPL(isPL);
  return `<div class="${"group aspect-w-10 aspect-h-12 cursor-pointer"}"><img class="${"rounded-sm border border-gray-900 object-cover object-top sm:object-center lg:h-full lg:w-full group-hover:opacity-25"}"${add_attribute("src", painting.content.image.filename.replace("//a.storyblok.com", "//img2.storyblok.com/500x0/filters:format(png)"), 0)}${add_attribute("alt", painting.content.image.alt, 0)}>
    
    <div class="${"px-4 pt-8 font-semibold opacity-0 group-hover:opacity-100"}"><p class="${"text-gray-50 font-title text-3xl"}">${isPL ? `${escape3(painting.content.Title_PL)}` : `${escape3(painting.content.Title_ENG)}`}</p></div></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_, $$unsubscribe__;
  $$unsubscribe__ = subscribe(import_svelte_i18n._, (value) => $_ = value);
  let md = new import_remarkable.Remarkable({linkTarget: "_blank"});
  let {painting} = $$props;
  let {isPL} = $$props;
  createEventDispatcher();
  if ($$props.painting === void 0 && $$bindings.painting && painting !== void 0)
    $$bindings.painting(painting);
  if ($$props.isPL === void 0 && $$bindings.isPL && isPL !== void 0)
    $$bindings.isPL(isPL);
  $$unsubscribe__();
  return `<div class="${"fixed z-50 inset-0 overflow-y-auto"}"><div class="${"flex items-end justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0"}"><div class="${"fixed inset-0 transition-opacity"}"><div class="${"absolute inset-0 bg-black"}"></div></div>

        
        <span class="${"hidden sm:inline-block sm:align-middle"}"></span>\u200B

        <div class="${"inline-block align-bottom bg-black px-4 text-left overflow-hidden\n          transform transition-all sm:mt-4 sm:align-middle sm:max-w-4xl sm:w-full sm:px-6"}" role="${"dialog"}" aria-modal="${"true"}" aria-labelledby="${"modal-headline"}">
            <div class="${"flex justify-between items-center"}"><button class="${"inline-flex focus:outline-none"}"><svg class="${"h-6 w-6 text-gray-50"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" fill="${"currentColor"}"><path fill-rule="${"evenodd"}" d="${"M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"}" clip-rule="${"evenodd"}"></path></svg>
                    <span x-show="${"eng"}" class="${"ml-2 font-semibold uppercase text-gray-50"}">${escape3($_("modal.back"))}</span></button>
                <button class="${"focus:outline-none"}"><svg class="${"h-6 w-6 text-gray-50"}" xmlns="${"http://www.w3.org/2000/svg"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M6 18L18 6M6 6l12 12"}"></path></svg></button></div>

            
            <div class="${"mt-4"}"><img style="${"max-height: 500px;"}" width="${"640"}" height="${"360"}" class="${"w-full object-contain"}"${add_attribute("src", painting.content.image.filename.replace("//a.storyblok.com", "//img2.storyblok.com/800x0/filters:quality(95),format(png)"), 0)} alt="${""}">
                <div class="${"text-gray-50 text-cente mt-6"}"><h2 class="${"text-4xl  font-title font-black mb-2"}">${isPL ? ` ${escape3(painting.content.Title_PL)}` : ` ${escape3(painting.content.Title_ENG)} `}</h2>
                    <p>${isPL ? ` ${md.render(painting.content.Description_PL)} ` : ` ${md.render(painting.content.Description_ENG)} `}</p></div></div></div></div></div>`;
});
var Grid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {paintings} = $$props;
  let {preview = true} = $$props;
  let {isPL} = $$props;
  if ($$props.paintings === void 0 && $$bindings.paintings && paintings !== void 0)
    $$bindings.paintings(paintings);
  if ($$props.preview === void 0 && $$bindings.preview && preview !== void 0)
    $$bindings.preview(preview);
  if ($$props.isPL === void 0 && $$bindings.isPL && isPL !== void 0)
    $$bindings.isPL(isPL);
  return `${``}
<div class="${"hidden sm:block"}"><div class="${"mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10"}">${each(paintings, (painting, i) => `${i < 6 ? `${validate_component(Painting, "Painting").$$render($$result, {painting, isPL}, {}, {})}` : `${!preview ? `${validate_component(Painting, "Painting").$$render($$result, {painting, isPL}, {}, {})}` : ``}`}`)}</div></div>

<div class="${"block sm:hidden"}"><div class="${"mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10"}">${each(paintings, (painting, i) => `${i < 3 ? `${validate_component(Painting, "Painting").$$render($$result, {painting, isPL}, {}, {})}` : `${!preview ? `${validate_component(Painting, "Painting").$$render($$result, {painting, isPL}, {}, {})}` : ``}`}`)}</div></div>

<div><div class="${"mt-24 flex justify-center items-center"}"><button class="${"cursor-pointer group focus:outline-none"}"><div class="${"uppercase tracking-wider font-semibold  text-xl text-gray-50 group-hover:text-gray-200"}">${preview ? `<span>Show All</span>` : `<span>Hide</span>`}</div>
        <div class="${"flex justify-center"}">${preview ? `<svg class="${"h-6 w-6 text-gray-50 group-hover:text-gray-200"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" fill="${"currentColor"}"><path fill-rule="${"evenodd"}" d="${"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"}" clip-rule="${"evenodd"}"></path></svg>` : `<svg class="${"h-6 w-6 text-gray-50 group-hover:text-gray-200"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" fill="${"currentColor"}"><path fill-rule="${"evenodd"}" d="${"M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"}" clip-rule="${"evenodd"}"></path></svg>`}</div></button></div></div>`;
});
var About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {isPL} = $$props;
  let {about} = $$props;
  if ($$props.isPL === void 0 && $$bindings.isPL && isPL !== void 0)
    $$bindings.isPL(isPL);
  if ($$props.about === void 0 && $$bindings.about && about !== void 0)
    $$bindings.about(about);
  return `<div id="${"about"}" class="${"mt-24 mb-24 text-gray-50 max-w-2xl mx-auto"}"><div class="${""}"><h1 class="${"uppercase text-3xl font-black tracking-tight"}">Jakub K\u0119pka</h1>
		<div class="${"mt-4 prose"}">${isPL ? `${about.content.body_pl}` : `${about.content.body_eng}`}</div></div></div>`;
});
var Photoshoot = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_, $$unsubscribe__;
  $$unsubscribe__ = subscribe(import_svelte_i18n._, (value) => $_ = value);
  let md = new import_remarkable.Remarkable({linkTarget: "_blank"});
  let {photoshoot} = $$props;
  let {left = true} = $$props;
  let {isPL} = $$props;
  createEventDispatcher();
  if ($$props.photoshoot === void 0 && $$bindings.photoshoot && photoshoot !== void 0)
    $$bindings.photoshoot(photoshoot);
  if ($$props.left === void 0 && $$bindings.left && left !== void 0)
    $$bindings.left(left);
  if ($$props.isPL === void 0 && $$bindings.isPL && isPL !== void 0)
    $$bindings.isPL(isPL);
  $$unsubscribe__();
  return `<div class="${"sm:flex sm:items-start mt-24 sm:mt-48 px-4 sm:px-0"}"><div class="${escape3(left ? "order-1" : "order-2") + " w-full sm:w-3/5 pl-0 sm:px-12 text-gray-50 text-center sm:text-left"}"><h2 class="${"mt-4 text-5xl smtext-3xl uppercase font-semibold font-title tracking-wider cursor-pointer"}">${isPL ? `${escape3(photoshoot.content.name_pl)}` : `${escape3(photoshoot.content.name_eng)}`}</h2>
		<div class="${"hidden sm:block mt-2 prose font-normal"}">${isPL ? `${md.render(photoshoot.content.desc_pl)}` : `${md.render(photoshoot.content.desc_eng)}`}</div>
		<button class="${"mb-6 sm:mb-0 mt-6 text-xl font-semibold tracking-wider hover:underline"}">${escape3($_("photoshoots.button"))}</button></div>

	<img width="${"640"}" height="${"360"}" class="${escape3(left ? "order-2" : "order-1") + " cursor-pointer sm:pr-12 w-full sm:w-2/5 object-cover rounded-sm h-full"}"${add_attribute("src", photoshoot.content.gallery[0].filename.replace("//a.storyblok.com", "//img2.storyblok.com/0x950/filters:quality(90),format(png)"), 0)} alt="${""}"></div>`;
});
var css = {
  code: ".svelte-25hx6a::-webkit-scrollbar{background:transparent;width:0}",
  map: `{"version":3,"file":"ModalSession.svelte","sources":["ModalSession.svelte"],"sourcesContent":["<script>\\n\\timport { fade } from 'svelte/transition';\\n\\timport { createEventDispatcher } from 'svelte';\\n    import { Remarkable } from 'remarkable';\\n    import { _ } from \\"svelte-i18n\\";\\n    \\n\\tlet md = new Remarkable({linkTarget: \\"_blank\\"});\\n\\texport let photoshoot;\\n    export let isPL;\\n\\n\\tconst dispatch = createEventDispatcher();\\n\\n\\tfunction closeModal() {\\n\\t\\tdispatch('hidePhotoshoot', false);\\n\\t}\\n\\n\\n    export let gallery = photoshoot.content.gallery;\\n    let activeImage = 0;\\n\\n    function previousImage() {\\n        if (activeImage == 0) { activeImage = gallery.length } else { activeImage -= 1; }\\n    }\\n    \\n    function nextImage() {\\n        if (activeImage == gallery.length) { activeImage = 0 } else { activeImage += 1; }\\n    }\\n\\n</script>\\n\\n\\n<style>html{overflow:scroll;overflow-x:hidden}::-webkit-scrollbar{background:transparent;width:0}</style>\\n\\n\\n<div transition:fade=\\"{{duration: 250 }}\\" class=\\"fixed z-50 inset-0 overflow-y-auto\\">\\n    <div\\n         class=\\"flex items-end justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0\\">\\n        <div class=\\"fixed inset-0 transition-opacity\\">\\n            <div on:click={closeModal} class=\\"absolute inset-0 bg-black\\"></div>\\n\\n\\n        </div>\\n\\n        <!-- This element is to trick the browser into centering the modal contents. -->\\n        <span class=\\"hidden sm:inline-block sm:align-middle\\"></span>&#8203;\\n\\n        <div \\n             class=\\"inline-block align-bottom bg-black px-4 text-left overflow-hidden\\n          transform transition-all sm:mt-4 sm:align-middle sm:max-w-4xl sm:w-full sm:px-6\\" role=\\"dialog\\"\\n             aria-modal=\\"true\\" aria-labelledby=\\"modal-headline\\">\\n\\n            <!-- Close buttons -->\\n            <div class=\\"flex justify-between items-center\\">\\n                <button  on:click={closeModal} class=\\"inline-flex focus:outline-none\\">\\n                    <svg class=\\"h-6 w-6 text-gray-50\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 20 20\\"\\n                         fill=\\"currentColor\\">\\n                        <path fill-rule=\\"evenodd\\"\\n                              d=\\"M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z\\"\\n                              clip-rule=\\"evenodd\\"/>\\n                    </svg>\\n                    <span class=\\"ml-2 font-semibold uppercase text-gray-50\\">{$_('modal.back')}</span>\\n                </button>\\n                <button  on:click={closeModal}  class=\\"focus:outline-none\\">\\n                    <svg class=\\"h-6 w-6 text-gray-50\\" xmlns=\\"http://www.w3.org/2000/svg\\" fill=\\"none\\"\\n                         viewBox=\\"0 0 24 24\\" stroke=\\"currentColor\\">\\n                        <path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M6 18L18 6M6 6l12 12\\"/>\\n                    </svg>\\n                </button>\\n            </div>\\n\\n            <!-- Painting and Info -->\\n            <div class=\\"mt-4\\">\\n                <div class=\\"block overflow-x-auto flex items-center justify-between\\">\\n                    {#each gallery as image}\\n                    \\n                        <img style=\\"max-height: 500px;\\"\\n                             width=\\"640\\" height=\\"360\\"\\n                         class=\\"w-full object-contain\\"\\n                         src={image.filename.replace('//a.storyblok.com', '//img2.storyblok.com/500x0/filters:quality(95),format(png)')}\\n                         alt=\\"\\">\\n                    \\n                    {/each}\\n                </div>\\n                <div class=\\"hidden\\">\\n                    <button on:click={previousImage}\\n                            type=\\"button\\">\\n                        <svg class=\\"text-white hover:text-gray-500 h-6 w-6\\" xmlns=\\"http://www.w3.org/2000/svg\\"\\n                             viewBox=\\"0 0 20 20\\" fill=\\"currentColor\\">\\n                            <path fill-rule=\\"evenodd\\"\\n                                  d=\\"M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z\\"\\n                                  clip-rule=\\"evenodd\\"/>\\n                        </svg>\\n                    </button>\\n                    <img style=\\"max-height: 500px;\\"\\n                         width=\\"640\\" height=\\"360\\"\\n                         class=\\"w-full object-contain\\"\\n                         src=\\"{gallery[activeImage].filename.replace('//a.storyblok.com', '//img2.storyblok.com/800x0/filters:quality(95),format(png)')}\\"\\n                         alt=\\"\\">\\n                    <button on:click={nextImage}\\n                            type=\\"button\\">\\n                        <svg class=\\"text-white hover:text-gray-500 h-6 w-6\\" xmlns=\\"http://www.w3.org/2000/svg\\"\\n                             viewBox=\\"0 0 20 20\\" fill=\\"currentColor\\">\\n                            <path fill-rule=\\"evenodd\\"\\n                                  d=\\"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z\\"\\n                                  clip-rule=\\"evenodd\\"/>\\n                        </svg>\\n                    </button>\\n\\n                </div>\\n                <div class=\\"text-white mt-6\\">\\n                    <h2 class=\\"text-3xl font-bold mb-2\\">{#if isPL}{ photoshoot.content.name_pl}{:else}{photoshoot.content.name_eng}{/if}</h2>\\n                    <div class=\\"prose font-normal\\">{#if isPL}{@html md.render(photoshoot.content.desc_pl)}{:else}{@html md.render(photoshoot.content.desc_eng)}{/if}</div>\\n                </div>\\n                \\n            </div>\\n        </div>\\n    </div>\\n</div>\\n"],"names":[],"mappings":"cA+B8C,mBAAmB,CAAC,WAAW,WAAW,CAAC,MAAM,CAAC,CAAC"}`
};
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_, $$unsubscribe__;
  $$unsubscribe__ = subscribe(import_svelte_i18n._, (value) => $_ = value);
  let md = new import_remarkable.Remarkable({linkTarget: "_blank"});
  let {photoshoot} = $$props;
  let {isPL} = $$props;
  createEventDispatcher();
  let {gallery = photoshoot.content.gallery} = $$props;
  let activeImage = 0;
  if ($$props.photoshoot === void 0 && $$bindings.photoshoot && photoshoot !== void 0)
    $$bindings.photoshoot(photoshoot);
  if ($$props.isPL === void 0 && $$bindings.isPL && isPL !== void 0)
    $$bindings.isPL(isPL);
  if ($$props.gallery === void 0 && $$bindings.gallery && gallery !== void 0)
    $$bindings.gallery(gallery);
  $$result.css.add(css);
  $$unsubscribe__();
  return `<div class="${"fixed z-50 inset-0 overflow-y-auto svelte-25hx6a"}"><div class="${"flex items-end justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0 svelte-25hx6a"}"><div class="${"fixed inset-0 transition-opacity svelte-25hx6a"}"><div class="${"absolute inset-0 bg-black svelte-25hx6a"}"></div></div>

        
        <span class="${"hidden sm:inline-block sm:align-middle svelte-25hx6a"}"></span>\u200B

        <div class="${"inline-block align-bottom bg-black px-4 text-left overflow-hidden\n          transform transition-all sm:mt-4 sm:align-middle sm:max-w-4xl sm:w-full sm:px-6 svelte-25hx6a"}" role="${"dialog"}" aria-modal="${"true"}" aria-labelledby="${"modal-headline"}">
            <div class="${"flex justify-between items-center svelte-25hx6a"}"><button class="${"inline-flex focus:outline-none svelte-25hx6a"}"><svg class="${"h-6 w-6 text-gray-50 svelte-25hx6a"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" fill="${"currentColor"}"><path fill-rule="${"evenodd"}" d="${"M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"}" clip-rule="${"evenodd"}" class="${"svelte-25hx6a"}"></path></svg>
                    <span class="${"ml-2 font-semibold uppercase text-gray-50 svelte-25hx6a"}">${escape3($_("modal.back"))}</span></button>
                <button class="${"focus:outline-none svelte-25hx6a"}"><svg class="${"h-6 w-6 text-gray-50 svelte-25hx6a"}" xmlns="${"http://www.w3.org/2000/svg"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M6 18L18 6M6 6l12 12"}" class="${"svelte-25hx6a"}"></path></svg></button></div>

            
            <div class="${"mt-4 svelte-25hx6a"}"><div class="${"block overflow-x-auto flex items-center justify-between svelte-25hx6a"}">${each(gallery, (image) => `<img style="${"max-height: 500px;"}" width="${"640"}" height="${"360"}" class="${"w-full object-contain svelte-25hx6a"}"${add_attribute("src", image.filename.replace("//a.storyblok.com", "//img2.storyblok.com/500x0/filters:quality(95),format(png)"), 0)} alt="${""}">`)}</div>
                <div class="${"hidden svelte-25hx6a"}"><button type="${"button"}" class="${"svelte-25hx6a"}"><svg class="${"text-white hover:text-gray-500 h-6 w-6 svelte-25hx6a"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" fill="${"currentColor"}"><path fill-rule="${"evenodd"}" d="${"M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"}" clip-rule="${"evenodd"}" class="${"svelte-25hx6a"}"></path></svg></button>
                    <img style="${"max-height: 500px;"}" width="${"640"}" height="${"360"}" class="${"w-full object-contain svelte-25hx6a"}"${add_attribute("src", gallery[activeImage].filename.replace("//a.storyblok.com", "//img2.storyblok.com/800x0/filters:quality(95),format(png)"), 0)} alt="${""}">
                    <button type="${"button"}" class="${"svelte-25hx6a"}"><svg class="${"text-white hover:text-gray-500 h-6 w-6 svelte-25hx6a"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" fill="${"currentColor"}"><path fill-rule="${"evenodd"}" d="${"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"}" clip-rule="${"evenodd"}" class="${"svelte-25hx6a"}"></path></svg></button></div>
                <div class="${"text-white mt-6 svelte-25hx6a"}"><h2 class="${"text-3xl font-bold mb-2 svelte-25hx6a"}">${isPL ? `${escape3(photoshoot.content.name_pl)}` : `${escape3(photoshoot.content.name_eng)}`}</h2>
                    <div class="${"prose font-normal svelte-25hx6a"}">${isPL ? `${md.render(photoshoot.content.desc_pl)}` : `${md.render(photoshoot.content.desc_eng)}`}</div></div></div></div></div></div>`;
});
var List = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {photoshoots} = $$props;
  let {isPL} = $$props;
  if ($$props.photoshoots === void 0 && $$bindings.photoshoots && photoshoots !== void 0)
    $$bindings.photoshoots(photoshoots);
  if ($$props.isPL === void 0 && $$bindings.isPL && isPL !== void 0)
    $$bindings.isPL(isPL);
  return `${``}

<div id="${"photos"}" class="${"mt-48"}">${each(photoshoots, (photoshoot, i) => `${validate_component(Photoshoot, "Photoshoot").$$render($$result, {photoshoot, left: i % 2 == 0, isPL}, {}, {})}`)}</div>`;
});
var Contact = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_, $$unsubscribe__;
  $$unsubscribe__ = subscribe(import_svelte_i18n._, (value) => $_ = value);
  $$unsubscribe__();
  return `<div id="${"contact"}" class="${"text-gray-50 mt-24 px-4"}"><div class="${"sm:text-center"}"><h2 class="${"text-5xl uppercase font-semibold font-title "}">${escape3($_("nav.contact"))}</h2>
        <div class="${"mt-2 mb-4 hover:text-gray-300 tracking-wider"}"><ul><li>Tel:<a class="${"hover:underline"}" href="${"tel:+48884894852"}">884 894 852</a></li>
                <li>Email:<a class="${"hover:underline"}" href="${"mailto:jakub.kuba.kepka@gmail.com"}">jakub.kuba.kepka@gmail.com</a></li>
                <li>Instagram: <a class="${"hover:underline"}" target="${"_blank"}" href="${"https://instagram.com/jakub___kepka/"}">@jakub___kepka</a></li></ul></div></div></div>`;
});
async function load({page, fetch: fetch3, session, context}) {
  const res = await client.get("cdn/stories/?starts_with=paintings/");
  const res2 = await client.get("cdn/stories/?starts_with=sesje/");
  const res3 = await client.get("cdn/stories/bio");
  if (res.data.stories && res.data.stories) {
    return {
      props: {
        paintings: await res.data.stories,
        photoshoots: await res2.data.stories,
        about: await res3.data.story
      }
    };
  }
  return {
    status: res.status,
    error: new Error(`Could not load ${url}`)
  };
}
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {paintings} = $$props;
  let {photoshoots} = $$props;
  let {isPL = false} = $$props;
  let {about} = $$props;
  import_svelte_i18n.dictionary.set({
    en: {
      hero: {button: "Skip"},
      nav: {
        about: "About",
        paintings: "Paintings",
        photoshoots: "Photoshoots",
        contact: "Contact"
      },
      modal: {back: "Back"},
      photoshoots: {button: "See Photoshoot"},
      footer: {by: "Made by"}
    },
    pl: {
      hero: {button: "Pomi\u0144"},
      nav: {
        about: "O Mnie",
        paintings: "Obrazy",
        photoshoots: "Sesje",
        contact: "Kontakt"
      },
      modal: {back: "Powr\xF3t"},
      photoshoots: {button: "Zobacz Sesje"},
      footer: {by: "Wykonanie"}
    }
  });
  import_svelte_i18n.locale.set("en");
  onMount(async () => {
    if (!(localStorage.getItem("lang_pl") === null)) {
      isPL = await window.localStorage.getItem("lang_pl") === "true";
      if (isPL) {
        import_svelte_i18n.locale.set("pl");
      } else {
        import_svelte_i18n.locale.set("en");
      }
    }
  });
  if ($$props.paintings === void 0 && $$bindings.paintings && paintings !== void 0)
    $$bindings.paintings(paintings);
  if ($$props.photoshoots === void 0 && $$bindings.photoshoots && photoshoots !== void 0)
    $$bindings.photoshoots(photoshoots);
  if ($$props.isPL === void 0 && $$bindings.isPL && isPL !== void 0)
    $$bindings.isPL(isPL);
  if ($$props.about === void 0 && $$bindings.about && about !== void 0)
    $$bindings.about(about);
  return `${validate_component(Hero, "Hero").$$render($$result, {}, {}, {})}

<div class="${"flex justify-center items-center h-full"}"><div class="${"bg-white border-4 border-black p-4 shadow-lg text-center max-w-sm"}"><img src="${"abgrund.JPG"}" alt="${"Event Image"}" class="${"w-full h-auto border-b-4 border-black mb-4"}">
		<h2 class="${"text-2xl font-bold mb-2"}">ABGRUND POKAZ</h2>
		<p class="${"text-lg mb-4"}">Join us for a unique experience at the ABGRUND POKAZ event. Don\u2019t miss out on this exciting opportunity!</p>
		<button class="${"bg-black text-white font-bold py-2 px-4 border-4 border-black hover:bg-red-600"}">Buy Ticket
		</button></div></div>



<div class="${"max-w-7xl mx-auto sm:px-6 lg:px-8"}">${validate_component(Nav, "Nav").$$render($$result, {isPL}, {}, {})}

	${validate_component(Grid, "Grid").$$render($$result, {isPL, paintings}, {}, {})}

	${validate_component(About, "About").$$render($$result, {about, isPL}, {}, {})}

	${validate_component(List, "List").$$render($$result, {isPL, photoshoots}, {}, {})}

	${validate_component(Contact, "Contact").$$render($$result, {}, {}, {})}</div>`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Routes,
  load
});

// .svelte-kit/vercel/entry.js
var entry_default = async (req, res) => {
  const {pathname, searchParams} = new URL(req.url || "", "http://localhost");
  const rendered = await render({
    method: req.method,
    headers: req.headers,
    path: pathname,
    query: searchParams,
    rawBody: await getRawBody(req)
  });
  if (rendered) {
    const {status, headers, body} = rendered;
    return res.writeHead(status, headers).end(body);
  }
  return res.writeHead(404).end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*!
 * storyblok-js-client v4.0.9
 * Universal JavaScript SDK for Storyblok's API
 * (c) 2020-2021 Stobylok Team
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
