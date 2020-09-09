import { createApp, defineComponent } from 'vue';
import './index.scss';

import { RotateSquare, RotateSquare2, RotateSquare3, RotateSquare4, RotateSquare5, 
  RotateSquare6, CubeShadow, Cube, CubeGrid, DoubleBounce, Stretch, ScaleOut, Jumper, 
  Wave, Circle, Circle2, Circle3, Circle4, Circle5, Circle6, Circle7, Circle8, Circle9, 
  Circle10, Circle11, GoogleSpin, ThreeDots, Gauge, Origami, Hexagon, Socket, HourGlass, 
  Pencil, Jawn, LetterCube, PingPong, Diamond, SpinLine, Plane, Mikepad, Texture 
} from 'vue-loading-spinner'

// const text = '加载中...';
// const type = 'RotateSquare2';

interface OptionProps {
  text: string;
  type: string;
  el: Element | string | undefined;
}

const setTypeCom = (option: OptionProps) => {
  let typeCom: any = null;
  switch (option.type) {
    case 'RotateSquare':
      typeCom = <RotateSquare style="margin: 0 auto;" />
      break;
    case 'RotateSquare2':
      typeCom = <RotateSquare2 style="margin: 0 auto;" />
      break;
    case 'RotateSquare3':
      typeCom = <RotateSquare3 style="margin: 0 auto;" />
      break;
    case 'RotateSquare4':
      typeCom = <RotateSquare4 style="margin: 0 auto;" />
      break;
    case 'RotateSquare5':
      typeCom = <RotateSquare5 style="margin: 0 auto;" />
      break;
    case 'RotateSquare6':
      typeCom = <RotateSquare6 style="margin: 0 auto;" />
      break;
    case 'CubeShadow':
      typeCom = <CubeShadow style="margin: 0 auto;" />
      break;
    case 'Cube':
      typeCom = <Cube style="margin: 0 auto;" />
      break;
    case 'CubeGrid':
      typeCom = <CubeGrid style="margin: 0 auto;" />
      break;
    case 'DoubleBounce':
      typeCom = <DoubleBounce style="margin: 0 auto;" />
      break;
    case 'Stretch':
      typeCom = <Stretch style="margin: 0 auto;" />
      break;
    case 'ScaleOut':
      typeCom = <ScaleOut style="margin: 0 auto;" />
      break;
    case 'Jumper':
      typeCom = <Jumper style="margin: 0 auto;" />
      break;
    case 'Wave':
      typeCom = <Wave style="margin: 0 auto;" />
      break;
    case 'Circle':
      typeCom = <Circle style="margin: 0 auto;" />
      break;
    case 'Circle2':
      typeCom = <Circle2 style="margin: 0 auto;" />
      break;
    case 'Circle3':
      typeCom = <Circle3 style="margin: 0 auto;" />
      break;
    case 'Circle4':
      typeCom = <Circle4 style="margin: 0 auto;" />
      break;
    case 'Circle5':
      typeCom = <Circle5 style="margin: 0 auto;" />
      break;
    case 'Circle6':
      typeCom = <Circle6 style="margin: 0 auto;" />
      break;
    case 'Circle7':
      typeCom = <Circle7 style="margin: 0 auto;" />
      break;
    case 'Circle8':
      typeCom = <Circle8 style="margin: 0 auto;" />
      break;
    case 'Circle9':
      typeCom = <Circle9 style="margin: 0 auto;" />
      break;
    case 'Circle10':
      typeCom = <Circle10 style="margin: 0 auto;" />
      break;
    case 'Circle11':
      typeCom = <Circle11 style="margin: 0 auto;" />
      break;
    case 'GoogleSpin':
      typeCom = <GoogleSpin style="margin: 0 auto;" />
      break;
    case 'ThreeDots':
      typeCom = <ThreeDots style="margin: 0 auto;" />
      break; 
    case 'Gauge':
      typeCom = <Gauge style="margin: 0 auto;" />
      break;
    case 'Origami':
      typeCom = <Origami style="margin: 0 auto;" />
      break;
    case 'Hexagon':
      typeCom = <Hexagon style="margin: 0 auto;" />
      break;
    case 'Socket':
      typeCom = <Socket style="margin: 0 auto;" />
      break;
    case 'HourGlass':
      typeCom = <HourGlass style="margin: 0 auto;" />
      break;
    case 'Pencil':
      typeCom = <Pencil style="margin: 0 auto;" />
      break;
    case 'Jawn':
      typeCom = <Jawn style="margin: 0 auto;" />
      break;
    case 'LetterCube':
      typeCom = <LetterCube style="margin: 0 auto;" />
      break;
    case 'PingPong':
      typeCom = <PingPong style="margin: 0 auto;" />
      break; 
    case 'Diamond':
      typeCom = <Diamond style="margin: 0 auto;" />
      break;
    case 'SpinLine':
      typeCom = <SpinLine style="margin: 0 auto;" />
      break;
    case 'Plane':
      typeCom = <Plane style="margin: 0 auto;" />
      break;
    case 'Mikepad':
      typeCom = <Mikepad style="margin: 0 auto;" />
      break;
    case 'Texture':
      typeCom = <Texture style="margin: 0 auto;" />
      break;
    default:
      break;
  }

  return typeCom;
}

const loadingId = 'yf-loading-container'
const domId = 'yf-loading-service'

export function open(option: OptionProps) {
  if (option.text === undefined || option.text === null) {
    option.text = '加载中...';
  }

  if (option.type === null || option.type === undefined) {
    option.type = 'Circle8';
  }

  const app = createApp(defineComponent({
    setup(){
      return () => (
        <div id={loadingId}>
          <div class="loading-mask">
            <div>
              { setTypeCom(option) }
              <div style="margin-top: 5px">{ option.text }</div>
            </div>
          </div>
        </div>
      )
    }
  }));
  const div = document.createElement('div');
  div.setAttribute('id', domId);

  if (option.el === undefined || option.el === null) {   
    document.body.appendChild(div);
  } else {
    if (typeof(option.el) === 'string') {
      const dom = document.getElementById(option.el);
      if (dom === null) {
        document.body.appendChild(div);
      } else {
        dom.appendChild(div);
      }
    } else {
      option.el.appendChild(div)
    }
  }
  app.mount(div);
}

