using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Xml;
using System.Threading.Tasks;
using DDDSample1.Domain.Drivers;
using DDDSample1.Domain.DriverDuties;
using DDDSample1.Domain.Trips;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Domain.Vehicles;
using DDDSample1.Domain.Workblocks;

namespace DDDSample1.Controllers{
    
    [Route("api/[controller]")]
    [ApiController]
    public class ImporterController : ControllerBase{
        
        private readonly ITripService _serviceTrip;
        private readonly IDriverService _serviceDriver;
        private readonly IVehicleService _serviceVehicle;
        private readonly IDriverDutyService _serviceDriverDuty;
        private readonly IVehicleDutyService _serviceVehicleDuty;
        private readonly IWorkblockService _serviceWorkblock;

        public ImporterController(ITripService serviceTrip, IDriverService serviceDriver, IVehicleService serviceVehicle, IDriverDutyService serviceDriverDuty, IVehicleDutyService serviceVehicleDuty, IWorkblockService serviceWorkblock){
            _serviceTrip = serviceTrip;
            _serviceDriver = serviceDriver;
            _serviceVehicle = serviceVehicle;
            _serviceDriverDuty = serviceDriverDuty;
            _serviceVehicleDuty = serviceVehicleDuty;
            _serviceWorkblock = serviceWorkblock;
        }

        [HttpPost]
        public async Task<string> Create(){
//------------------------------------------------------------------  SETUP  ----------------------------------------------------------------
            XmlDocument doc = new XmlDocument();
            doc.Load("/home/g67Admin/projeto_integrador_grupo67/mdv/Files/demo-lapr5.glx");
            
            XmlNodeList driverElements = doc.GetElementsByTagName("Driver");
            XmlNodeList tripsElements = doc.GetElementsByTagName("Trip");
            
            List <string> driverTypesList = new List<string>();
            string [] driverTypes;

            List<int> passingTimesList = new List<int>();
            int [] passingTimes;

//------------------------------------------------------------------  DRIVERS ----------------------------------------------------------------
            foreach(XmlNode xmlNodeDriver in driverElements){
                var mecNum =    xmlNodeDriver.Attributes["MechanographicNumber"];
                var name =      xmlNodeDriver.Attributes["Name"];
                var dateBirth = xmlNodeDriver.Attributes["DateBirth"];
                var ccNum =     xmlNodeDriver.Attributes["CitizenCardNumber"];
                var nif =       xmlNodeDriver.Attributes["NIF"];
                var license =   xmlNodeDriver.Attributes["DrivingLicenseNumber"];
                var expDate =   xmlNodeDriver.Attributes["DrivingLicenseExpirationDate"];
                var entryDate = xmlNodeDriver.Attributes["EntryDateCompany"];

                foreach(XmlNode xmlNodeInner in xmlNodeDriver.ChildNodes[0].ChildNodes){
                    driverTypesList.Add(xmlNodeInner.Attributes["key"].Value);
                }
                driverTypes = driverTypesList.ToArray();

                if(mecNum!=null && name!=null && dateBirth!=null && ccNum!=null && nif!=null && license!=null && expDate!=null && entryDate!=null){
                    
                    long birthConverted = Convert.ToInt64(dateBirth.Value);
                    long expDateConverted = Convert.ToInt64(expDate.Value);
                    long entryDateConverted = Convert.ToInt64(entryDate.Value);
                    int ccConverted = Convert.ToInt32(ccNum.Value);
                    int nifConverted = Convert.ToInt32(nif.Value);
                    int licenseConverted = Convert.ToInt32(license.Value);

                    CreatingDriverDto obj = new CreatingDriverDto(mecNum.Value, name.Value, birthConverted, ccConverted, nifConverted, licenseConverted, expDateConverted, driverTypes, entryDateConverted, 0);
                    DriversController driverCont = new DriversController(_serviceDriver);
                    
                    await driverCont.Create(obj);
                    driverTypesList = new List<string>();
                    driverTypes = driverTypesList.ToArray();
                }else{
                    Console.WriteLine("Error on Drivers");
                }
            }
//------------------------------------------------------------------   TRIPS  ----------------------------------------------------------------
            foreach(XmlNode xmlNodeTrip in tripsElements){
                var key = xmlNodeTrip.Attributes["key"];
                var line = xmlNodeTrip.Attributes["Line"];
                var path = xmlNodeTrip.Attributes["Path"];

                foreach(XmlNode xmlNodeInnerPT in xmlNodeTrip.ChildNodes[0].ChildNodes){
                    int convertedPassingTime = Convert.ToInt32(xmlNodeInnerPT.Attributes["Time"].Value);
                    passingTimesList.Add(convertedPassingTime);
                }
                passingTimes = passingTimesList.ToArray();
                Array.Reverse(passingTimes);

                if(key!=null && line!=null && path!=null){

                    CreatingTripDto obj = new CreatingTripDto(key.Value, line.Value, path.Value, passingTimes);
                    TripsController tripCont = new TripsController(_serviceTrip);
                    
                    await tripCont.Create(obj);
                    passingTimesList = new List<int>();
                    passingTimes = passingTimesList.ToArray();
                }else{
                    Console.WriteLine("Error on Trips");
                }
            }

            return null;
        }
    }
}