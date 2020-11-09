const node = (cfg) => (<rect style={
  {
    width: 100, 
    height: 20, 
    fill: '#1890ff', 
    stroke: '#1890ff', 
    radius: [6, 6, 0, 0]
  }
} keyshape="true" name="test">
  <text style={{ 
    marginTop: 2, 
    marginLeft: 50, 
    textAlign: 'center', 
    fontWeight: 'bold', 
    fill: '#fff' }} 
    name="title">wwwwwwwww</text>
  <polygon style={{
    points:[[ 30, 30 ], [ 40, 20 ], [ 30, 50 ], [ 60, 100 ]],
        fill: 'red'
  }} />
      <polyline style={{ points: [[ 30, 30 ], [ 40, 20 ], [ 60, 100 ]] }} />
      <image style={{ img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png', width: 48, height: 48, marginTop: 100 }} />
</rect>)

export default node;