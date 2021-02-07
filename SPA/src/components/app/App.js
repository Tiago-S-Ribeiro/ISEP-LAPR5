import React, { Component } from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { 
  UserOutlined,ShareAltOutlined,CarOutlined,UploadOutlined,CompassOutlined,
  ExpandAltOutlined,GlobalOutlined,NodeExpandOutlined,NodeIndexOutlined,
  RightSquareOutlined} from "@ant-design/icons";
import "./App.css";
import NodeCreationComp from "../nodeCreationComp/NodeCreationComp";
import PathNodeCreationComp from "../pathNodeCreationComp/PathNodeCreationComp";
import LineCreationComp from "../lineCreationComp/LineCreationComp";
import DriverTypeCreationComp from "../driverTypeCreationComp/DriverTypeCreationComp";
import VehicleTypeCreationComp from "../vehicleTypeCreationComp/VehicleTypeCreationComp";
import ImporterComp from "../importerComp/ImporterComp";
import LinePathCreationComp from "../linePathCreationComp/LinePathCreationComp";
import PathCreationComp from "../pathCreationComp/PathCreationComp";
import PathToLineComp from "../pathToLineComp/PathToLineComp";
import MapViewerComp from "../mapViewerComp/MapViewerComp";
import ShowSolutionsComp from "../showSolutionsComp/ShowSolutionsComp";
import ShowNodesComp from "../showNodesComp/ShowNodesComp";
import ShowDriverTypesComp from "../showDriverTypesComp/ShowDriverTypesComp";
import ShowVehicleTypeComp from "../showVehicleTypeComp/ShowVehicleTypeComp";
import ShowPathNodesComp from "../showPathNodesComp/ShowPathNodesComp";
import ShowPathsComp from "../showPathsComp/ShowPathsComp";
import ShowLinesComp from "../showLinesComp/ShowLinesComp";
import RegisterClientComp from "../registerClientComp/RegisterClientComp";
import ShowClientsComp from "../showClientsComp/ShowClientsComp";
import DriverCreationComp from "../driverCreationComp/DriverCreationComp";
import VehicleCreationComp from "../vehicleCreationComp/VehicleCreationComp";
import TripCreationAdHocComp from "../tripCreationAdHocComp/TripCreationAdHocComp";
import TripsCreationComp from "../tripsCreationComp/TripsCreationComp";
import VehicleDutyAdHocComp from "../vehicleDutyAdHocComp/VehicleDutyAdHocComp";
import WorkBlocksComp from "../workBlocksComp/WorkBlocksComp";
import ShowTripsOfLineComp from "../showTripsOfLineComp/ShowTripsOfLineComp";
import ShowVehicleDutyByDay from "../showVehicleDutyByDay/ShowVehicleDutyByDay";
import ShowGenSolutionsComp from "../showGenSolutionsComp/ShowGenSolutionsComp";
import DriverDutyAdHocComp from "../driverDutyAdHocComp/DriverDutyAdHocComp";
import ShowPathsOfLine from "../showPathsOfLine/ShowPathsOfLine";
import ShowDriverDuties from "../showDriverDuties/ShowDriverDuties";
import LoginComp from "../loginComp/LoginComp";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends Component {
  state = { 
    isClient: false,
    createNode: false,
    createPathNode: false,
    createLine: false,
    createDriverType:false,
    createVehicleType:false,
    fileImporter:false,
    createLinePath: false,
    createPath: false,
    setPathToLine: false,
    mapViewer: false,
    showSolutions: false,
    showNodes: false,
    showLines: false,
    registerClient: false,
    loginClient: false,
    showClients: false,
    wishToRegister: false,
    wishToLogin: false,
    createDriver: false,
    createVehicle: false,
    createTripAdHoc: false,
    createMultipleTrips: false,
    vehicleDutyAdHoc: false,
    workBlocks: false,
    showTripsOfLine: false,
    showVehicleDutyByDay: false,
    showGenSolutions: false,
    driverDutyAdHoc: false,
    showPathsOfLine: false,
    showDriverDuties: false,
  };

  handleCreation = ({ key }) => {
    if (key == 1) { //Nodes
      this.setState({ 
        createNode: true,
        createPathNode: false,
        createLine: false,
        createDriverType:false,
        createVehicleType:false,
        fileImporter: false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        mapViewer: false,
        showSolutions: false,
        showNodes: false,
        showDriverTypes: false,
        showVehicleTypes: false,
        showPathNodes: false,
        showPaths: false,
        showLines: false,
        registerClient: false,
        showClients: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 2) { //PathNodes
      this.setState({ 
        createPathNode: true,
        createNode: false,
        createLine: false,
        createDriverType:false,
        createVehicleType:false,
        fileImporter: false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        mapViewer: false,
        showSolutions: false,
        showNodes: false,
        showDriverTypes: false,
        showVehicleTypes: false,
        showPathNodes: false,
        showPaths: false,
        showLines: false,
        registerClient: false,
        showClients: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 3) { //Importer
      this.setState({ 
        fileImporter: true,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        mapViewer: false,
        showSolutions: false,
        showNodes: false,
        showDriverTypes: false,
        showVehicleTypes: false,
        showPathNodes: false,
        showPaths: false,
        showLines: false,
        registerClient: false,
        showClients: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 4) { //Path
      this.setState({ 
        createPath: true,
        fileImporter: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createLinePath: false,
        createNode: false,
        setPathToLine: false,
        mapViewer: false,
        showSolutions: false,
        showNodes: false,
        showDriverTypes: false,
        showVehicleTypes: false,
        showPathNodes: false,
        showPaths: false,
        showLines: false,
        registerClient: false,
        showClients: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 5) { //Lines
      this.setState({ 
        createLine: true,
        createPathNode: false,
        createNode: false,
        createDriverType:false,
        createVehicleType:false,
        fileImporter: false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        mapViewer: false,
        showSolutions: false,
        showNodes: false,
        showDriverTypes: false,
        showVehicleTypes: false,
        showPathNodes: false,
        showPaths: false,
        showLines: false,
        registerClient: false,
        showClients: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 6) { //LinePath
      this.setState({ 
        createLinePath: true,
        fileImporter: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        createPath: false,
        setPathToLine: false,
        mapViewer: false,
        showSolutions: false,
        showNodes: false,
        showDriverTypes: false,
        showVehicleTypes: false,
        showPathNodes: false,
        showPaths: false,
        showLines: false,
        registerClient: false,
        showClients: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 7) { //Path to Specific Line
      this.setState({ 
        setPathToLine: true,
        fileImporter: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        createLinePath: false,
        createPath: false,
        mapViewer: false,
        showSolutions: false,
        showNodes: false,
        showDriverTypes: false,
        showVehicleTypes: false,
        showPathNodes: false,
        showPaths: false,
        showLines: false,
        registerClient: false,
        showClients: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 8) { //DriverTypes
      this.setState({ 
        createDriverType:true,
        createLine: false,
        createPathNode: false,
        createNode: false,
        createVehicleType:false,
        fileImporter: false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        mapViewer: false,
        showSolutions: false,
        showNodes: false,
        showDriverTypes: false,
        showVehicleTypes: false,
        showPathNodes: false,
        showPaths: false,
        showLines: false,
        registerClient: false,
        showClients: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 9) { //VehicleTypes
      this.setState({ 
        createVehicleType:true,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        mapViewer: false,
        showSolutions: false,
        showNodes: false,
        showDriverTypes: false,
        showVehicleTypes: false,
        showPathNodes: false,
        showPaths: false,
        showLines: false,
        registerClient: false,
        showClients: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 10) { //Map Viewer
      this.setState({ 
        mapViewer: true,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        showSolutions: false,
        showNodes: false,
        showDriverTypes: false,
        showVehicleTypes: false,
        showPathNodes: false,
        showPaths: false,
        showLines: false,
        registerClient: false,
        showClients: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 11) { //Show Algorithm Solutions
      this.setState({ 
        showSolutions: true,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        showNodes: false,
        showDriverTypes: false,
        showVehicleTypes: false,
        showPathNodes: false,
        showPaths: false,
        showLines: false,
        registerClient: false,
        showClients: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 12) { //Show Nodes
      this.setState({ 
        showNodes: true,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        showDriverTypes: false,
        showVehicleTypes: false,
        showPathNodes: false,
        showPaths: false,
        showLines: false,
        registerClient: false,
        showClients: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 13) { //Show DriverTypes
      this.setState({ 
        showDriverTypes: true,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        showVehicleTypes: false,
        showPathNodes: false,
        showPaths: false,
        showLines: false,
        registerClient: false,
        showClients: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 14) { //Show VehicleTypes
      this.setState({ 
        showVehicleTypes: true,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        showPathNodes: false,
        showPaths: false,
        showLines: false,
        registerClient: false,
        showClients: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 15) { //Show PathNodes
      this.setState({ 
        showPathNodes: true,
        showVehicleTypes: false,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        showPaths: false,
        showLines: false,
        registerClient: false,
        showClients: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 16) { //Show Paths
      this.setState({ 
        showPaths: true,
        showPathNodes: false,
        showVehicleTypes: false,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        showLines: false,
        registerClient: false,
        showClients: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 17) { //Show Lines
      this.setState({ 
        showLines: true,
        showPaths: false,
        showPathNodes: false,
        showVehicleTypes: false,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        registerClient: false,
        showClients: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 18) { //Client Registration
      this.setState({ 
        registerClient: true,
        showLines: false,
        showPaths: false,
        showPathNodes: false,
        showVehicleTypes: false,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        showClients: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 19) { //Show Clients
      this.setState({ 
        showClients: true,
        registerClient: false,
        showLines: false,
        showPaths: false,
        showPathNodes: false,
        showVehicleTypes: false,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        loginClient: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 20) { //Login
      this.setState({ 
        loginClient: true,
        showClients: false,
        registerClient: false,
        showLines: false,
        showPaths: false,
        showPathNodes: false,
        showVehicleTypes: false,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        createDriver:false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 21) { //Drivers(MDV)
      this.setState({ 
        createDriver:true,
        loginClient: false,
        showClients: false,
        registerClient: false,
        showLines: false,
        showPaths: false,
        showPathNodes: false,
        showVehicleTypes: false,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        createVehicle: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 22) { //Vehicles(MDV)
      this.setState({ 
        createVehicle: true,
        createDriver:false,
        loginClient: false,
        showClients: false,
        registerClient: false,
        showLines: false,
        showPaths: false,
        showPathNodes: false,
        showVehicleTypes: false,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        createTripAdHoc: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 23) { //Trip Ad Hoc(MDV)
      this.setState({ 
        createTripAdHoc: true,
        createVehicle: false,
        createDriver:false,
        loginClient: false,
        showClients: false,
        registerClient: false,
        showLines: false,
        showPaths: false,
        showPathNodes: false,
        showVehicleTypes: false,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        createMultipleTrips: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 24) { //Trips w/ Frequency(MDV)
      this.setState({ 
        createMultipleTrips: true,
        createTripAdHoc: false,
        createVehicle: false,
        createDriver:false,
        loginClient: false,
        showClients: false,
        registerClient: false,
        showLines: false,
        showPaths: false,
        showPathNodes: false,
        showVehicleTypes: false,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        vehicleDutyAdHoc: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 25) { //Vehicle Duty AdHoc(MDV)
      this.setState({ 
        vehicleDutyAdHoc: true,
        createMultipleTrips: false,
        createTripAdHoc: false,
        createVehicle: false,
        createDriver:false,
        loginClient: false,
        showClients: false,
        registerClient: false,
        showLines: false,
        showPaths: false,
        showPathNodes: false,
        showVehicleTypes: false,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        workBlocks: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 26) { //WorkBlocks US17(MDV)
      this.setState({
        workBlocks: true,
        vehicleDutyAdHoc: false,
        createMultipleTrips: false,
        createTripAdHoc: false,
        createVehicle: false,
        createDriver:false,
        loginClient: false,
        showClients: false,
        registerClient: false,
        showLines: false,
        showPaths: false,
        showPathNodes: false,
        showVehicleTypes: false,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        showTripsOfLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 27) { //Show Trips of a Specific Line(MDV)
      this.setState({
        showTripsOfLine: true,
        workBlocks: false,
        vehicleDutyAdHoc: false,
        createMultipleTrips: false,
        createTripAdHoc: false,
        createVehicle: false,
        createDriver:false,
        loginClient: false,
        showClients: false,
        registerClient: false,
        showLines: false,
        showPaths: false,
        showPathNodes: false,
        showVehicleTypes: false,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        showVehicleDutyByDay: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 28) { //Show Vehicle Duties for a specific day(MDV)
      this.setState({
        showVehicleDutyByDay: true,
        showTripsOfLine: false,
        workBlocks: false,
        vehicleDutyAdHoc: false,
        createMultipleTrips: false,
        createTripAdHoc: false,
        createVehicle: false,
        createDriver:false,
        loginClient: false,
        showClients: false,
        registerClient: false,
        showLines: false,
        showPaths: false,
        showPathNodes: false,
        showVehicleTypes: false,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        showGenSolutions: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 29) { //Show genetic Solutions
      this.setState({
        showGenSolutions: true,
        showVehicleDutyByDay: false,
        showTripsOfLine: false,
        workBlocks: false,
        vehicleDutyAdHoc: false,
        createMultipleTrips: false,
        createTripAdHoc: false,
        createVehicle: false,
        createDriver:false,
        loginClient: false,
        showClients: false,
        registerClient: false,
        showLines: false,
        showPaths: false,
        showPathNodes: false,
        showVehicleTypes: false,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        driverDutyAdHoc: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 30) { //Driver Duty Adhoc
      this.setState({
        driverDutyAdHoc: true,
        showGenSolutions: false,
        showVehicleDutyByDay: false,
        showTripsOfLine: false,
        workBlocks: false,
        vehicleDutyAdHoc: false,
        createMultipleTrips: false,
        createTripAdHoc: false,
        createVehicle: false,
        createDriver:false,
        loginClient: false,
        showClients: false,
        registerClient: false,
        showLines: false,
        showPaths: false,
        showPathNodes: false,
        showVehicleTypes: false,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        showPathsOfLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 31) { //Show Paths of a Line
      this.setState({
        showPathsOfLine: true,
        driverDutyAdHoc: false,
        showGenSolutions: false,
        showVehicleDutyByDay: false,
        showTripsOfLine: false,
        workBlocks: false,
        vehicleDutyAdHoc: false,
        createMultipleTrips: false,
        createTripAdHoc: false,
        createVehicle: false,
        createDriver:false,
        loginClient: false,
        showClients: false,
        registerClient: false,
        showLines: false,
        showPaths: false,
        showPathNodes: false,
        showVehicleTypes: false,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
        showDriverDuties: false,
      });
    }
    if (key == 32) { //Show Drivers Duty of a day
      this.setState({
        showDriverDuties: true,
        showPathsOfLine: false,
        driverDutyAdHoc: false,
        showGenSolutions: false,
        showVehicleDutyByDay: false,
        showTripsOfLine: false,
        workBlocks: false,
        vehicleDutyAdHoc: false,
        createMultipleTrips: false,
        createTripAdHoc: false,
        createVehicle: false,
        createDriver:false,
        loginClient: false,
        showClients: false,
        registerClient: false,
        showLines: false,
        showPaths: false,
        showPathNodes: false,
        showVehicleTypes: false,
        showDriverTypes: false,
        showNodes: false,
        showSolutions: false,
        mapViewer: false,
        createVehicleType:false,
        createDriverType:false,
        createLine: false,
        createPathNode: false,
        createNode: false,
        fileImporter:false,
        createLinePath: false,
        createPath: false,
        setPathToLine: false,
      });
    }
  };

  handleRegistry = (value) => {
    this.setState({
      wishToRegister: value
    });
  }

  handleLogin = (value) => {
    this.setState({
      wishToLogin: value
    });
  }

  isClient = (value) => {
    this.setState({isClient: value});
  }
  
  render() {
    var menus;
    if((this.state.wishToRegister || this.state.wishToLogin) && !this.state.isClient){
      var routeToMap;
      if(this.state.mapViewer){
        routeToMap = 
        <Router>
          <div><Link to="/">Hide</Link>&nbsp;&nbsp;&nbsp;<Link to="/mapViewer">Show</Link></div>
          <Route path="/mapViewer"><MapViewerComp display={this.state.mapViewer}/></Route>
        </Router>
      }else{
        routeToMap = "";
      }
      menus = 
      <Layout>
        <Sider width={250} className="site-layout-background">
          <Menu onClick={this.handleCreation} mode="inline" style={{ height: "100%", borderRight: 0 }}>
            <SubMenu key="sub1" icon={<CompassOutlined />} style={{ fontSize: '15px'}} title="Nodes">
              <Menu.Item key="1">Create New Node</Menu.Item>
              <Menu.Item key="2">Create New PathNode</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<ExpandAltOutlined />} style={{ fontSize: '15px'}} title="Lines">
              <Menu.Item key="5">Create New Line</Menu.Item>
              <Menu.Item key="6">Create New LinePath</Menu.Item>
            </SubMenu>
              <SubMenu key="sub3" icon={<ShareAltOutlined/>} style={{ fontSize: '15px'}} title="Path">
              <Menu.Item key="4">Create New Path</Menu.Item>
            <Menu.Item key="7">Set Path to Line</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<UserOutlined/>} style={{ fontSize: '15px'}} title="Drivers">
              <Menu.Item key="8">Create New DriverType</Menu.Item>
              <Menu.Item key="21">Create New Driver</Menu.Item>
              <Menu.Item key="30">Create Driver Duty AdHoc</Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" icon={<CarOutlined/>} style={{ fontSize: '15px'}} title="Vehicles">
              <Menu.Item key="9">Create New VehicleType</Menu.Item>
              <Menu.Item key="22">Create New Vehicle</Menu.Item>
              <Menu.Item key="25">Create Vehicle Duty AdHoc</Menu.Item>
            </SubMenu>
            <SubMenu key="sub9" icon={<NodeIndexOutlined />} style={{ fontSize: '15px'}} title="Trips">
              <Menu.Item key="23">Create Trip AdHoc</Menu.Item>
              <Menu.Item key="24">Create Trips</Menu.Item>
            </SubMenu>
            <SubMenu key="sub10" icon={<RightSquareOutlined />} style={{ fontSize: '15px'}} title="Workblocks">
              <Menu.Item key="26">Create Workblocks</Menu.Item>
            </SubMenu>
            <SubMenu key="sub6" icon={<UploadOutlined />} style={{ fontSize: '15px'}} title="Importer">
              <Menu.Item key="3">Import GLX File</Menu.Item>
            </SubMenu>
            <SubMenu key="sub7" icon={<GlobalOutlined />} style={{ fontSize: '15px'}} title="Map Viewer">
              <Menu.Item key="10">View Map</Menu.Item>
            </SubMenu>
            <SubMenu key="sub8" icon={<NodeExpandOutlined />} style={{ fontSize: '15px'}} title="Consult Tables">
              <Menu.Item key="27">Trips of a Line</Menu.Item>
              <Menu.Item key="28">Vehicle Duties</Menu.Item>
              <Menu.Item key="31">Paths of a Line</Menu.Item>
              <Menu.Item key="32">Driver Duties</Menu.Item>
              <Menu.Item key="29">Genetic Solutions</Menu.Item>
              <Menu.Item key="11">Algorithm Solutions</Menu.Item>
              <Menu.Item key="12">Nodes</Menu.Item>
              <Menu.Item key="13">Driver Types</Menu.Item>
              <Menu.Item key="14">Vehicle Types</Menu.Item>
              <Menu.Item key="15">PathNodes</Menu.Item>
              <Menu.Item key="16">Paths</Menu.Item>
              <Menu.Item key="17">Lines</Menu.Item>
              <Menu.Item key="19">Clients</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content className="site-layout-background" style={{padding: 24, margin: 0, minHeight: 280,}}>
            <NodeCreationComp display={this.state.createNode} />
            <PathNodeCreationComp display={this.state.createPathNode}/>
            <LineCreationComp display={this.state.createLine}/>
            <DriverTypeCreationComp display={this.state.createDriverType}/>
            <VehicleTypeCreationComp display={this.state.createVehicleType}/>
            <ImporterComp display={this.state.fileImporter}/>
            <LinePathCreationComp display={this.state.createLinePath}/>
            <PathCreationComp display={this.state.createPath}/>
            <PathToLineComp display={this.state.setPathToLine}/>
            {routeToMap}
            <ShowSolutionsComp display={this.state.showSolutions}/>
            <ShowNodesComp display={this.state.showNodes}/>
            <ShowDriverTypesComp display={this.state.showDriverTypes}/>
            <ShowVehicleTypeComp display={this.state.showVehicleTypes}/>
            <ShowPathNodesComp display={this.state.showPathNodes}/>
            <ShowPathsComp display={this.state.showPaths}/>
            <ShowLinesComp display={this.state.showLines}/>
            <ShowClientsComp display={this.state.showClients}/>
            <DriverCreationComp display={this.state.createDriver}/>
            <VehicleCreationComp display={this.state.createVehicle}/>
            <TripCreationAdHocComp display={this.state.createTripAdHoc}/>
            <TripsCreationComp display={this.state.createMultipleTrips}/>
            <VehicleDutyAdHocComp display={this.state.vehicleDutyAdHoc}/>
            <WorkBlocksComp display={this.state.workBlocks}/>
            <ShowTripsOfLineComp display={this.state.showTripsOfLine}/>
            <ShowVehicleDutyByDay display={this.state.showVehicleDutyByDay}/>
            <ShowGenSolutionsComp display={this.state.showGenSolutions}/>
            <DriverDutyAdHocComp display={this.state.driverDutyAdHoc}/>
            <ShowPathsOfLine display = {this.state.showPathsOfLine}/>
            <ShowDriverDuties display = {this.state.showDriverDuties}/>
          </Content>
        </Layout>
      </Layout>
    }else if((!this.state.wishToRegister || !this.state.wishToLogin) && !this.state.isClient){
      menus = 
      <Layout>
        <Layout>
          <Content className="site-layout-background" style={{padding: 24, margin: 0, minHeight: 280,}}>
            <RegisterClientComp display={this.state.registerClient} handleRegistry={this.handleRegistry} isClient={this.isClient}/>
            <LoginComp display={this.state.loginClient} handleLogin={this.handleLogin} isClient={this.isClient}/>
          </Content>
        </Layout>
      </Layout>
    }else if(this.state.isClient){
      var routeToMap;
      if(this.state.mapViewer){
        routeToMap = 
        <Router>
          <div><Link to="/">Hide</Link>&nbsp;&nbsp;&nbsp;<Link to="/mapViewer">Show</Link></div>
          <Route path="/mapViewer"><MapViewerComp display={this.state.mapViewer}/></Route>
        </Router>
      }else{
        routeToMap = "";
      }
      menus = 
      <Layout>
        <Sider width={250} className="site-layout-background">
          <Menu onClick={this.handleCreation} mode="inline" style={{ height: "100%", borderRight: 0 }}>
            <SubMenu key="sub7" icon={<GlobalOutlined />} style={{ fontSize: '15px'}} title="Map Viewer">
              <Menu.Item key="10">View Map</Menu.Item>
            </SubMenu>
            <SubMenu key="sub8" icon={<NodeExpandOutlined />} style={{ fontSize: '15px'}} title="Consult Tables">
              <Menu.Item key="27">Trips of a Line</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content className="site-layout-background" style={{padding: 24, margin: 0, minHeight: 280,}}>
            {routeToMap}
            <ShowTripsOfLineComp display={this.state.showTripsOfLine}/>
          </Content>
        </Layout>
      </Layout>
    }
    var navRegister;
    var navLogin;
    if(!this.state.wishToRegister && !this.state.wishToLogin){
      navRegister = <Menu.Item key="18">Account</Menu.Item>;
      navLogin = <Menu.Item key="20">Login</Menu.Item>;
    }else{
      navRegister = <Menu.Item></Menu.Item>;
      navLogin = <Menu.Item></Menu.Item>;
    }
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" onClick={this.handleCreation} mode="horizontal" defaultSelectedKeys={["0"]}>
            {navRegister}
            {navLogin}
          </Menu>
        </Header>
        {menus}
      </Layout>
    );
  }
}
export default App;