using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.Vehicles;

namespace Tests
{
    [TestClass]
    public class VehicleDTOTest
    {
        [TestMethod]
        public void testSetParametersID()
        {
            string id = "idtestvehicle";
            string licensePlate = "66-99-HC";
            string VIN = "12345678912345678";
            String type = "Miniautocarro";
            DateTime serviceAdmission = new DateTime(2020, 11, 15);

            VehicleDto dto = new VehicleDto(id, licensePlate, VIN, type, serviceAdmission);

            Assert.AreEqual(dto.Id, id);
            Assert.AreEqual(dto.LicensePlate, licensePlate);
            Assert.AreEqual(dto.VIN, VIN);
            Assert.AreEqual(dto.Type, type);
            Assert.AreEqual(dto.ServiceAdmission, serviceAdmission);
        }

        [TestMethod]
        public void testSetParameters()
        {
            string licensePlate = "66-99-HC";
            string VIN = "12345678912345678";
            String type = "Miniautocarro";
            DateTime serviceAdmission = new DateTime(2020, 11, 15);

            VehicleDto dto = new VehicleDto(licensePlate, VIN, type, serviceAdmission);

            Assert.AreEqual(dto.LicensePlate, licensePlate);
            Assert.AreEqual(dto.VIN, VIN);
            Assert.AreEqual(dto.Type, type);
            Assert.AreEqual(dto.ServiceAdmission, serviceAdmission);
        }
    }
}