"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var g6_1 = require("@antv/g6");
exports["default"] = vue_1.defineComponent({
    name: 'Test',
    setup: function () {
        var init = function () {
            g6_1["default"].registerNode('diamond', {
                draw: function (cfg, group) {
                    // 如果 cfg 中定义了 style 需要同这里的属性进行融合
                    var keyShape = group.addShape('path', {
                        attrs: {
                            path: this.getPath(cfg),
                            stroke: cfg.color || '#666',
                            fill: '#ccc'
                        },
                        // must be assigned in G6 3.3 and later versions. it can be any value you want
                        name: 'path-shape',
                        // 设置 draggable 以允许响应鼠标的图拽事件
                        draggable: true
                    });
                    // 如果有文本
                    // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
                    // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
                    // style.text = cfg.label;
                    var label = group.addShape('text', {
                        // attrs: style
                        attrs: {
                            x: 0,
                            y: 0,
                            textAlign: 'center',
                            textBaseline: 'middle',
                            text: cfg.label || '团子',
                            fill: '#666'
                        },
                        // must be assigned in G6 3.3 and later versions. it can be any value you want
                        name: 'text-shape',
                        // 设置 draggable 以允许响应鼠标的图拽事件
                        draggable: true
                    });
                    return keyShape;
                },
                // 返回菱形的路径
                getPath: function (cfg) {
                    var size = cfg.size || [40, 40]; // 如果没有 size 时的默认大小
                    var width = size[0];
                    var height = size[1];
                    //  / 1 \
                    // 4     2
                    //  \ 3 /
                    var path = [
                        ['M', 0, 0 - height / 2],
                        ['L', width / 2, 0],
                        ['L', 0, height / 2],
                        ['L', -width / 2, 0],
                        ['Z'],
                    ];
                    return path;
                },
                getAnchorPoints: function () {
                    return [
                        [0, 0.5],
                        [1, 0.5],
                    ];
                },
                // 响应状态变化
                setState: function (name, value, item) {
                    console.log(item);
                    var group = item.getContainer();
                    var shape = group.get('children')[0]; // 顺序根据 draw 时确定
                    var label = group.get('children')[1];
                    var model = item.getModel();
                    console.log(model);
                    if (name === 'selected') {
                        if (value) {
                            shape.attr('fill', 'red');
                            label.attr('text', '团子傻逼');
                            model.label = '张曼';
                            label.hide();
                        }
                        else {
                            shape.attr('fill', 'white');
                            label.attr('text', '团子');
                            label.show();
                        }
                    }
                }
            });
            var data = {
                nodes: [
                    { id: 'node1', x: 50, y: 100, type: 'diamond' },
                    { id: 'node2', x: 150, y: 100, type: 'diamond', size: [50, 100] },
                    { id: 'node3', x: 250, y: 100, color: 'red', type: 'diamond' },
                    { id: 'node4', x: 350, y: 100, label: '菱形', type: 'diamond' },
                ],
                edges: [{ source: 'node1', target: 'node2' }]
            };
            var graph = new g6_1["default"].Graph({
                container: 'mountNode',
                width: 500,
                height: 500,
                renderer: 'svg',
                modes: {
                    "default": ['drag-canvas', 'zoom-canvas', 'drag-node']
                }
            });
            graph.data(data);
            graph.render();
            // 点击时选中，再点击时取消
            graph.on('node:click', function (ev) {
                var node = ev.item;
                graph.setItemState(node, 'selected', !node.hasState('selected')); // 切换选中
            });
        };
        vue_1.onMounted(function () {
            init();
        });
        return function () { return (React.createElement("div", { style: "color: red;" },
            React.createElement("div", { id: 'mountNode' }))); };
    }
});
