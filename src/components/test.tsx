import { defineComponent, onMounted } from 'vue';
import G6 from '@antv/g6';
import { IShape } from '@antv/g-base/lib/interfaces'
import { ModelConfig } from '@antv/g6/lib/types';
import Group from '@antv/g-canvas/lib/group'

export default defineComponent ({
  name: 'Test',

  

  setup() {

    const init = () => {
      G6.registerNode('customNode', {
        draw(cfg: ModelConfig, group: Group): IShape{
          const keyShape = group.addShape('dom', {
            attrs: {
              width: cfg.width,
              height: cfg.height,
              html:
              <div style="background-color: #fff; border:2px solid #5B8FF9"></div>
            }
          })

          return keyShape;
        },
        // 返回菱形的路径
        getPath(cfg: any) {
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
      });
  
      const data = {
        nodes: [
          { id: 'node1', x: 50, y: 100, type: 'customNode' }, // 最简单的
          { id: 'node2', x: 150, y: 100, type: 'customNode', size: [50, 100] }, // 添加宽高
          { id: 'node3', x: 250, y: 100, color: 'red', type: 'customNode' }, // 添加颜色
          { id: 'node4', x: 350, y: 100, text: '菱形', type: 'customNode' }, // 附加文本
        ]
      };
  
      const graph = new G6.Graph({
        container: 'mountNode',
        width: 500,
        height: 500,
      });
  
      graph.data(data);
      graph.render();
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
