import { defineComponent, onMounted } from 'vue';
import G6 from '@antv/g6';
// import { IShape } from '@antv/g-base/lib/interfaces'
// import { ModelConfig } from '@antv/g6/lib/types';
import Group from '@antv/g-canvas/lib/group'

export default defineComponent ({
  name: 'Test',

  

  setup() {

    const init = () => {
      G6.registerNode('diamond', {
        draw(cfg: any, group: Group) {
          // 如果 cfg 中定义了 style 需要同这里的属性进行融合
          const keyShape = group.addShape('path', {
            attrs: {
              path: this.getPath(cfg), // 根据配置获取路径
              stroke: cfg.color || '#666', // 颜色应用到描边上，如果应用到填充，则使用 fill: cfg.color
              fill: '#ccc'
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: 'path-shape',
            // 设置 draggable 以允许响应鼠标的图拽事件
            draggable: true,
          });

          // 如果有文本
          // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
          // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
          // style.text = cfg.label;
          const label = group.addShape('text', {
            // attrs: style
            attrs: {
              x: 0, // 居中
              y: 0,
              textAlign: 'center',
              textBaseline: 'middle',
              text: cfg.label || '团子',
              fill: '#666',
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: 'text-shape',
            // 设置 draggable 以允许响应鼠标的图拽事件
            draggable: true,
          });
          return keyShape;
        },
        // 返回菱形的路径
        getPath(cfg) {
          const size = cfg.size || [40, 40]; // 如果没有 size 时的默认大小
          const width = size[0];
          const height = size[1];
          //  / 1 \
          // 4     2
          //  \ 3 /
          const path = [
            ['M', 0, 0 - height / 2], // 上部顶点
            ['L', width / 2, 0], // 右侧顶点
            ['L', 0, height / 2], // 下部顶点
            ['L', -width / 2, 0], // 左侧顶点
            ['Z'], // 封闭
          ];
          return path;
        },
        getAnchorPoints() {
          return [
            [0, 0.5], // 左侧中间
            [1, 0.5], // 右侧中间
          ];
        },
        // 响应状态变化
        setState(name, value, item: any) {
          console.log(item);
          const group = item.getContainer();
          const shape = group.get('children')[0]; // 顺序根据 draw 时确定
          const label = group.get('children')[1]

          const model = item.getModel();
          console.log(model);
          if (name === 'selected') {
            if (value) {
              shape.attr('fill', 'red');
              label.attr('text', '团子傻逼');
              model.label = '张曼';
              label.hide();
            } else {
              shape.attr('fill', 'white');
              label.attr('text', '团子');
              label.show();
            }
          }
        },
      });
  
      const data = {
        nodes: [
          { id: 'node1', x: 50, y: 100, type: 'diamond' }, // 最简单的
          { id: 'node2', x: 150, y: 100, type: 'diamond', size: [50, 100] }, // 添加宽高
          { id: 'node3', x: 250, y: 100, color: 'red', type: 'diamond' }, // 添加颜色
          { id: 'node4', x: 350, y: 100, label: '菱形', type: 'diamond' }, // 附加文本
        ],
        edges: [{source: 'node1', target: 'node2'}],
      };
  
      const graph = new G6.Graph({
        container: 'mountNode',
        width: 500,
        height: 500,
        renderer: 'svg',
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'], // 允许拖拽画布、放缩画布、拖拽节点
        },
      });
      graph.data(data);
      graph.render();

      // 点击时选中，再点击时取消
      graph.on('node:click', (ev) => {
        const node = ev.item;
        graph.setItemState(node, 'selected', !node.hasState('selected')); // 切换选中
      });
    }

    onMounted(() => {
      init();
    })

    

    return () => (
      <div style="color: red;">
        <div id='mountNode' />
      </div>
    )
  }
})
