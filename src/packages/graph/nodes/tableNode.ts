// import { ModelConfig } from '@antv/g6/lib/types';
// import Group from '@antv/g-canvas/lib/group'
// import { IShape } from '@antv/g-base/lib/interfaces'

export const tableNode = {
  draw(cfg, group) {
    cfg.size = [180, 50];
    const keyShape = group.addShape('rect', {
      attrs: {
        width: 180,
        height: 35,
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
        height: 35,
        fill: '#5da9f7',
        radius: [5, 0, 0, 5]
      },
      name: 'line',
      draggable: true,
    })
    group.addShape('image', {
      attrs: {
        x: 8.75,
        y: 9,
        width: 17.5,
        height: 17.5,
        img: '/img/icons/table.svg'
      },
      name: 'icon',
      draggable: true,
    })
    const fieldShape = group.addShape('dom', {
      attrs: {
        y: 35,
        width: 180,
        height: 0,
        // stroke: '#5da9f7',
        // fill: '#5da9f7',
        // opacity: 0.2,
        html: ''
      },
      name: 'icon',
      draggable: true,
    });
    if (cfg.tableName) {
      group.addShape('text', {
        attrs: {
          x: 75,
          y: 25,
          text: cfg.tableName,
          textAlign: 'center',
          fontSize: 15,
          fill: '#666'
        },
        name: 'text',
        draggable: true,
      })
    }
    fieldShape.hide();
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
        iconShape.attr('img', '/img/icons/table-active.svg');
        let element = '<div class="table-node-container">';
        for (let index = 0; index < group.cfg.item._cfg.model.fields.length; index++) {
          element += `
            <div class="table-node-field">
              <div class="table-node-left-circle"></div>
              <span>${group.cfg.item._cfg.model.fields[index]}</span>
              <div class="table-node-right-circle"></div>
            </div>
          `           
        }
        element += '</div>'
        fieldShape.attr('html', element)
        fieldShape.show(); 
        fieldShape.animate({height: (40 * group.cfg.item._cfg.model.fields.length) + 5},{repeat: false,duration: 500})
        console.log(fieldShape);
        if(textShape) {
          textShape.attr('fontWeight', 800);
        }  
           
      } else {
        shape.attr({ lineWidth: 1 , radius: [5, 5] });
        iconShape.attr('img', '/img/icons/table.svg');
        fieldShape.animate({height: 0},{repeat: false,duration: 500})
        setTimeout(() => {
          fieldShape.attr('html', '');
          fieldShape.hide();
        },500)
        if(textShape) {
          textShape.attr('fontWeight', 400);
        }      
      }
    }
  },
  getAnchorPoints() {
    return [
      [0, 0.5], // 左侧中间
      [1, 0.5], // 右侧中间
    ];
  },
}