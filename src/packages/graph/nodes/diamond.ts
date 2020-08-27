import { ModelConfig } from '@antv/g6/lib/types';
import Group from '@antv/g-canvas/lib/group'
import { IShape } from '@antv/g-base/lib/interfaces'


export const diamond = {
  draw(cfg: ModelConfig, group: Group): IShape {
    const keyShape = group.addShape('path', {
      attrs: {
        path: this.getPath(cfg),
        stroke: cfg.color || '#666',
        fill: '#ccc'
      },
      name: 'path-shape',
      draggable: true,
    });
    group.addShape('text', {
      // attrs: style
      attrs: {
        x: typeof(cfg.size) !== 'undefined' ? cfg.size[0] : 0, // 居中
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
        label.hide();
      } else {
        shape.attr('fill', 'white');
        label.attr('text', '团子');
        label.show();
      }
    }
  }
}