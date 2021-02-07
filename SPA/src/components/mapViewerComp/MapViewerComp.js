import React, { Component } from "react";
import mapboxgl from 'mapbox-gl';
import './MapViewerComp.css';
import {Button, Space, Select} from "antd";
import masterDataRede from "../../apis/masterDataRede";
import PitchToggle from './PitchToogle';
mapboxgl.accessToken = 'pk.eyJ1IjoidmVyYXBpbnRvMjEiLCJhIjoiY2tpdGU1djNoMmIxbDJxcDMxMGlkMzFwayJ9.dh2-1KNwIQnTZceaY1POAA';
const { Option } = Select;

var map;

class MapViewerComp extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      map: undefined,
      lat: 41.2084,
      lng: -8.3464,
      zoom: 11,
      nodeList: [],
      modelPath: "",
      lati: 0,
      long: 0,
      name: "",
      pathNodesList: [],
      pathsList: [],
      linePathsList: [],
      linesList: []
    };
    this.getNodesRequest();
    this.getPathNodes();
    this.getPaths();
    this.getLinePaths();
    this.getLines();
  }

  getNodesRequest = async () => {
    const response = await masterDataRede.get("/nodes/complete");
    this.setState({nodeList: response.data.nodes});
  };
  getPathNodes = async () => {
    const response = await masterDataRede.get("/pathNodes/complete");
    this.setState({pathNodesList: response.data.pathNodes});
  };
  getPaths = async () => {
    const response = await masterDataRede.get("/paths/complete");
    this.setState({pathsList: response.data.paths});
  };
  getLinePaths = async () => {
    const response = await masterDataRede.get("/linePaths/complete");
    this.setState({linePathsList: response.data.linePaths});
  };
  getLines = async () => {
    const response = await masterDataRede.get("/lines/complete");
    this.setState({linesList: response.data.lines});
  };

  onChangeModelPath = async (value) => {
    await this.setState({modelPath : value})
    console.log(this.state.modelPath)
  }

  onChangeNodeInfo = async (value) => {
    var nodeLat;
    var nodeLong;
    var node = this.state.nodeList.find(node => node.name === value);
    nodeLat = node.latitude;
    nodeLong = node.longitude;
    await this.setState({lati : nodeLat, long: nodeLong, name: value});
    console.log(this.state.lati + " - " + this.state.long)
  }

  addModel = async () => {
    await map.removeLayer(this.state.name);
    map.addLayer(this.createCustomLayer(this.state.name, this.state.long, this.state.lati, this.state.modelPath), 'waterway-label');
  }

  createCustomLayer = (layerName, long, lat, path) => {
    var coords = [];
    coords[0] = long;
    coords[1] = lat;
    var modelAltitude = 0;
    var modelRotate = [Math.PI / 2, 3.5, 0];
    var modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(coords, modelAltitude);
    var modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 0.1};
    
      var THREE = window.THREE;
    
    var customLayer = {
      id: layerName,
      type: 'custom',
      renderingMode: '3d',
      onAdd: function (map, gl) {
      this.camera = new THREE.Camera();
      this.scene = new THREE.Scene();

      var ambLight = new THREE.AmbientLight(0xffffff);
      this.scene.add(ambLight);

      var ambLight2 = new THREE.AmbientLight(0x404040);
      this.scene.add(ambLight2);
     
      // use the three.js GLTF loader to add the 3D model to the three.js scene
      var loader = new THREE.GLTFLoader();
      loader.load(path,function (gltf) {
        this.scene.add(gltf.scene);
      }.bind(this));
      this.map = map;
      
      this.renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true
      });
     
      this.renderer.autoClear = false;
    },
    render: function (gl, matrix) {
      var rotationX = new THREE.Matrix4().makeRotationAxis(
      new THREE.Vector3(1, 0, 0),
      modelTransform.rotateX
      );
      var rotationY = new THREE.Matrix4().makeRotationAxis(
      new THREE.Vector3(0, 1, 0),
      modelTransform.rotateY
      );
      var rotationZ = new THREE.Matrix4().makeRotationAxis(
      new THREE.Vector3(0, 0, 1),
      modelTransform.rotateZ
      );
      
      var m = new THREE.Matrix4().fromArray(matrix);
      var l = new THREE.Matrix4().makeTranslation(
        modelTransform.translateX,
        modelTransform.translateY,
        modelTransform.translateZ).scale(
          new THREE.Vector3(
          modelTransform.scale,
          -modelTransform.scale,
          modelTransform.scale)).multiply(rotationX).multiply(rotationY).multiply(rotationZ);
      
      this.camera.projectionMatrix = m.multiply(l);
      this.renderer.state.reset();
      this.renderer.render(this.scene, this.camera);
      this.map.triggerRepaint();
    }
  };
  return customLayer;
  }

  addModelWithShadows = (layerName, long, lat, path) => {
    var coords = [];
    coords[0] = long;
    coords[1] = lat;
    var modelAltitude = 0;
    var modelRotate = [Math.PI / 2, 0, 0];
    var modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(coords, modelAltitude);
    var modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 0.7};
    
      var THREE = window.THREE;
    
    var customLayer = {
      id: layerName,
      type: 'custom',
      renderingMode: '3d',
      onAdd: function (map, gl) {
      this.camera = new THREE.Camera();
      this.scene = new THREE.Scene();

      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(0, 70, 100);
      let d = 1000;
      let r = 2;
      let mapSize = 8192;
      dirLight.castShadow = true;
      dirLight.shadow.radius = r;
      dirLight.shadow.mapSize.width = mapSize;
      dirLight.shadow.mapSize.height = mapSize;
      dirLight.shadow.camera.top = dirLight.shadow.camera.right = d;
      dirLight.shadow.camera.bottom = dirLight.shadow.camera.left = -d;
      dirLight.shadow.camera.near = 1;
      dirLight.shadow.camera.far = 400000000;

      this.scene.add(dirLight);
      this.scene.add(new THREE.DirectionalLightHelper(dirLight, 10));
     
      // use the three.js GLTF loader to add the 3D model to the three.js scene
      var loader = new THREE.GLTFLoader();
      loader.load(path,function (gltf) {
        gltf.scene.traverse(function(model) {
          if (model.isMesh) {
            model.castShadow = true;
          }
        });
        this.scene.add(gltf.scene);

        // we add the shadow plane automatically 
        const s = new THREE.Box3().setFromObject(gltf.scene).getSize(new THREE.Vector3(0, 0, 0));
        const sizes = [s.x, s.y, s.z];
        const planeSize = Math.max(...sizes) * 10;
        const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        //const planeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide});
        const planeMat = new THREE.ShadowMaterial();
        planeMat.opacity = 0.5;
        let plane = new THREE.Mesh(planeGeo, planeMat);
        plane.rotateX(-Math.PI / 2);
        //plane.layers.enable(1); plane.layers.disable(0); // it makes the object invisible for the raycaster
        plane.receiveShadow = true;
        this.scene.add(plane);
      }.bind(this));
      this.map = map;
      
      this.renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true
      });
     
      this.renderer.autoClear = false;
      this.renderer.shadowMap.enabled = true;
    },
    render: function (gl, matrix) {
      var rotationX = new THREE.Matrix4().makeRotationAxis(
      new THREE.Vector3(1, 0, 0),
      modelTransform.rotateX
      );
      var rotationY = new THREE.Matrix4().makeRotationAxis(
      new THREE.Vector3(0, 1, 0),
      modelTransform.rotateY
      );
      var rotationZ = new THREE.Matrix4().makeRotationAxis(
      new THREE.Vector3(0, 0, 1),
      modelTransform.rotateZ
      );
      
      var m = new THREE.Matrix4().fromArray(matrix);
      var l = new THREE.Matrix4().makeTranslation(
        modelTransform.translateX,
        modelTransform.translateY,
        modelTransform.translateZ).scale(
          new THREE.Vector3(
          modelTransform.scale,
          -modelTransform.scale,
          modelTransform.scale)).multiply(rotationX).multiply(rotationY).multiply(rotationZ);
      
      this.camera.projectionMatrix = m.multiply(l);
      this.renderer.state.reset();
      this.renderer.render(this.scene, this.camera);
      this.map.triggerRepaint();
    }
  };
  return customLayer;
  }

  rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')

  easing = (t) => {
    return t * (2 - t);
  }
  
  componentDidMount() {
    map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      bearing: -12
    });
    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });

    map.addControl(new PitchToggle({ minpitchzoom: 11 }), "top-left");
    map.addControl(new mapboxgl.FullscreenControl());

    map.on('style.load', async () => {
      //Adds single model with shadow
      map.addLayer(this.addModelWithShadows("Shadow-Example", -8.629135, 41.157910, './radar/scene.gltf'), 'waterway-label')
    })

    // pixels the map pans when the up or down arrow is clicked
    var deltaDistance = 100;
    
    // degrees the map rotates when the left or right arrow is clicked
    var deltaDegrees = 25;
    
    map.on('load', async () => {
      map.getCanvas().focus();
 
    map.getCanvas().addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.which === 87) {
        map.panBy([0, -deltaDistance], { easing: this.easing }); // up
      } else if (e.which === 83) {
        map.panBy([0, deltaDistance], { easing: this.easing });  // down
      } else if (e.which === 65) {
        map.easeTo({ bearing: map.getBearing() - deltaDegrees, easing: this.easing });   // left
      } else if (e.which === 68) {
        map.easeTo({ bearing: map.getBearing() + deltaDegrees, easing: this.easing });   // right
      }
    },true);
    map.keyboard.disable(); //Disables all keys except the ones selected above

      //Adds 3D Models
      for(var i = 0; i < this.state.nodeList.length; i++){
        map.addLayer(this.createCustomLayer(this.state.nodeList[i].name.toString(), this.state.nodeList[i].longitude, this.state.nodeList[i].latitude, './kyoto_bus_stop/scene.gltf'), 'waterway-label');
      }
      
      map.loadImage('./marker/teste2.png', function (error, image) {
        if (error) throw error;
        map.addImage('custom-marker', image);
      });

      //Adds Lines
      var coords;
      var fullPathCoordinates;
      var random;
      var color;
      if(this.state.linesList.length > 0){                      
        
        await this.state.linesList.map(async (line) => {      
          line.linePaths.map((linePathID) => {   
            
            fullPathCoordinates = [];                                                                                                 //iterar o array de IDS de linePaths
            var linePath = this.state.linePathsList.find(linePath => linePath._id === linePathID);                                    //para cada ID, ir buscar o obj todo linePath
            var path = this.state.pathsList.find(path => path._id === linePath.path);                                                 //para cada obj linePath, pelo id do path ir buscar o obj path
            coords = [];
            
            for(var i = 0; i < path.pathNodes.length; i++){                                                                           //iterar o array de IDS de pathNodes do obj path
              var pathNode = this.state.pathNodesList.find(pathNode => pathNode._id === path.pathNodes[i]);                           //ir buscar o obj pathNode a partir do id
              var node = this.state.nodeList.find(node => node._id === pathNode.node);                                                //para cada id de node no pathNode, ir buscar o obj node todo
              coords[0] = node.longitude;                                                                                             //fazer um array com as coordenadas do nó, para adicionar ao array de arrays
              coords[1] = node.latitude;
              fullPathCoordinates.push(coords);                                                                                       //adicionar ao array geral, as coordenadas do node atual
              coords = [];
            }

            random = Math.random().toString(36).substring(7);
            color = this.rgbToHex(line.color[0], line.color[1], line.color[2]);
            var popup;
            
            map.addSource(random, {'type': 'geojson','data': {'type': 'Feature','properties': {'color': color}, 'geometry': 
              {'type': 'LineString','coordinates': fullPathCoordinates}}});
            map.addLayer({'id': random,'type': 'line','source': random,'paint': {'line-width': 3.5,'line-color': ['get', 'color']}});
            
            map.on('mouseover', random, function (value) {
              popup = new mapboxgl.Popup()
                .setLngLat(value.lngLat)
                .setHTML(`<h3><b>Information:</b></h3>
                <p><h3><b>Line:</b>${line.name}</h3></p>
                <p><h3><b>Path:</b>${path.key}</h3></p>`).addTo(map);
            });
            
            map.on('mouseout', random, function (e) {
              if (popup) popup.remove();
            });

            fullPathCoordinates = [];                                       
          })
        });
      }

      //Adds Node Markers
      var popupNode;
      await this.state.nodeList.map((node) => {  
        map.addSource(node.key, {'type': 'geojson','data': {'type': 'FeatureCollection','features': [
          {'type': 'Feature','geometry': {'type': 'Point','coordinates': [node.longitude, node.latitude]},'properties': {}}]}});
        map.addLayer({'id': node.key,'type': 'symbol','source': node.key,'layout': {
          'icon-image': 'custom-marker','icon-anchor': 'bottom', 'text-offset': [0, 1.25], 'text-anchor': 'top'}});
        
        map.on('mouseover', node.key, function (value) {
          popupNode = new mapboxgl.Popup().setLngLat(value.lngLat)
            .setHTML(`<h3><b>Information:</b></h3>
            <p><h3><b>Node:</b>${node.name} - ${node.shortName}</h3></p>
            <p><h3><b>Lat:</b>${node.latitude}</h3></p>
            <p><h3><b>Lon:</b>${node.longitude}</h3></p>`).addTo(map);
        });
        map.on('mouseout', node.key, function (e) { if (popupNode) popupNode.remove();});
      });

    })
    this.setState({ map: map });
  }

  render() {
    let options;
    let nodeOptions;
    options = [];
    nodeOptions = [];

      options.push(<Option value={'./glass_bus_stop/scene.gltf'}>{"Glass Bus Stop"}</Option>);
      options.push(<Option value={'./old_bus_stop/scene.gltf'}>{"Rusty Bus Stop"}</Option>);
      options.push(<Option value={'./radar/scene.gltf'}>{"Satellite Radar"}</Option>);
      options.push(<Option value={'./japanese_rest/scene.gltf'}>{"Japanese Restaurant"}</Option>);
      options.push(<Option value={'./japanese_building/scene.gltf'}>{"Japanese Building"}</Option>);
      options.push(<Option value={'./eiffel/scene.gltf'}>{"Eiffel Tower"}</Option>);

      this.state.nodeList.map((node) => {
        nodeOptions.push(<Option value={node.name}>{node.name}</Option>);
      });

    return (
      <div style={{ height: "100vh", width: "100%" }}>
          <div>
            <Space direction="horizontal">
            Model: <Select style={{width: 120 }} onChange={this.onChangeModelPath}>{options}</Select>
            Node: <Select style={{width: 150 }} onChange={this.onChangeNodeInfo}>{nodeOptions}</Select>
            <Button onClick={this.addModel} type="primary">Add Model</Button>
            </Space>
            
            <div ref={el => this.mapContainer = el} className='mapContainer' />
          </div>
      </div>
    );
  }
}
export default MapViewerComp;
