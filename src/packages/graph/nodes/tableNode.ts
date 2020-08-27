import { ModelConfig } from '@antv/g6/lib/types';
import Group from '@antv/g-canvas/lib/group'
import { IShape } from '@antv/g-base/lib/interfaces'

export const tableNode = {
  draw(cfg: ModelConfig, group: Group): IShape {
    cfg.size = [180, 50];
    const keyShape = group.addShape('rect', {
      attrs: {
        width: 180,
        height: 50,
        stroke: '#5da9f7',
        fill: 'white',
        radius: [5, 5],
        lineWidth: 1
      },
      name: 'mainRect',
      draggable: true,
    });
    group.addShape('rect', {
      attrs: {
        width: 8,
        height: 50,
        fill: '#5da9f7',
        radius: [5, 0, 0, 5]
      },
      name: 'line',
      draggable: true,
    })
    group.addShape('image', {
      attrs: {
        x: 12,
        y: 12.5,
        width: 25,
        height: 25,
        img: './img/icons/table.svg'
      },
      name: 'icon',
      draggable: true,
    })
    const fieldShape = group.addShape('dom', {
      attrs: {
        y: 50,
        width: 180,
        height: 300,
        // stroke: '#5da9f7',
        // fill: '#5da9f7',
        // opacity: 0.2,
        html: ''
      }
    })
    if (cfg.tableName) {
      group.addShape('text', {
        attrs: {
          x: 75,
          y: 33,
          text: cfg.tableName,
          textAlign: 'center',
          fontSize: 15,
          fill: '#666'
        },
        name: 'name',
        draggable: true,
      })
    }
    fieldShape.hide();
    let str = '';
    for (let index = 0; index < 10; index++) {
      str += `<div>${index}</div>`           
    }
    fieldShape.attr('html', str)
    return keyShape;
  },
  setState(name, value, item) {
    const group = item.getContainer();
    const shape = group.get('children')[0];
    const iconShape = group.get('children')[2];
    const fieldShape = group.get('children')[3];
    const textShape = group.get('children')[4];
    if(name === 'selected') {
      if (value) {
        shape.attr({ lineWidth: 2 , radius: [5, 5, 0, 0] });
        iconShape.attr('img', './img/icons/table-active.svg');
        fieldShape.show(); 
        if(textShape) {
          textShape.attr('fontWeight', 800);
        }  
           
      } else {
        shape.attr({ lineWidth: 1 , radius: [5, 5] });
        iconShape.attr('img', './img/icons/table.svg');
        fieldShape.hide();
        if(textShape) {
          textShape.attr('fontWeight', 400);
        }      
      }
    }
  },
}