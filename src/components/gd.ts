import G6 from '@antv/g6'
import { diamond } from '@/packages/graph/nodes/diamond'
import { tableNode } from '@/packages/graph/nodes/tableNode'
// import { test } from '@/api/test';


export default class Gd {
  static init() {
    G6.registerNode('diamond', diamond);
    G6.registerNode('tablenode', tableNode);

    const data = {
      nodes: [
        { id: 'node1', x: 200, y: 100, type: 'tablenode', tableName: 'sys_user', fields: ['id','name','age','isdel','username'] }, // 最简单的
        { id: 'node2', x: 350, y: 400, type: 'tablenode', tableName: 'sys_user', fields: ['id','name','age','isdel','username'] }, // 添加宽高
        // { id: 'node3', x: 250, y: 100, color: 'red', type: 'diamond' }, // 添加颜色
        // { id: 'node4', x: 350, y: 100, label: '菱形', type: 'diamond' }, // 附加文本
      ],
      // edges: [{source: 'node1', target: 'node2'}],
    };

    const graph = new G6.Graph({
      container: 'mountNode',
      width: 1200,
      height: 1000,
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
      // const el: any = document.getElementsByClassName('table-node-left-circle');
      // .addEventListener()
      graph.setItemState(node, 'selected', !node.hasState('selected')); // 切换选中
    });
  }
}