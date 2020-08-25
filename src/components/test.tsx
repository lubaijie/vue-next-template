import { defineComponent, ref, onMounted, reactive } from 'vue';
import G6 from '@antv/g6';

export default defineComponent ({
  name: 'Test',
  setup() {
    const count = ref(0);

    let initData = reactive({
      // 点集
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 200,
          label: '起始点'
        },
        {
          id: 'node2',
          x: 300,
          y: 200,
          label: '目标点',
        }
      ],
      // 边集
      edges: [
        {
          source: 'node1',
          target: 'node2',
          label: '连线'
        }
      ]
    });

    const getData = async () => {
      const response = await fetch('https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json');
      initData = await response.json();
      console.log(initData);
    }

    onMounted(async () => {
      await getData();
      const graph = new G6.Graph({
        container: 'mountNode',//.value, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: 800, // Number，必须，图的宽度
        height: 500, // Number，必须，图的高度
        fitView: true,
        fitViewPadding: [20, 40, 50, 20],
        modes: {
          // 支持的 behavior
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
          edit: ['click-select'],
        },
        layout: {
          type: 'dagre',
          rankdir: 'LR', // 可选，默认为图的中心
          align: 'DL', // 可选
          nodesep: 20, // 可选
          ranksep: 50, // 可选
          controlPoints: true, // 可选
        },
      });
      graph.data(initData); // 读取 Step 2 中的数据源到图上
      graph.render(); // 渲染图

      // 点击节点
      graph.on('node:click', (e: any) => {
        console.log(e.item);
        // 先将所有当前是 click 状态的节点置为非 click 状态
        const clickNodes = graph.findAllByState('node', 'click');
        clickNodes.forEach((cn) => {
          graph.setItemState(cn, 'click', false);
        });
        const nodeItem = e.item; // 获取被点击的节点元素对象
        graph.setItemState(nodeItem, 'click', true); // 设置当前节点的 click 状态为 true
      });
    })

    const add = () => {
      count.value++;
    };

    return () => (
      <div style="color: red;">{ count.value }
        <a-button type="primary" onClick={getData}>+1</a-button>
        <div id='mountNode' />
      </div>
    )
  }
})
