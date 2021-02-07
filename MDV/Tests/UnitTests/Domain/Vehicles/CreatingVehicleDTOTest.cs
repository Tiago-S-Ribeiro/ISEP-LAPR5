using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.Vehicles;

namespace Tests
{
    [TestClass]
    public class CreatingVehicleDTOTest
    {
        [TestMethod]
        public void testSetParameters()
        {
            string licensePlate = "66-99-HC";
            string VIN = "12345678912345678";
            String type = "Miniautocarro";
            DateTime serviceAdmission = new DateTime(2020, 11, 15);

            long serviceAdmissionMiliseconds = (long)(new TimeSpan(serviceAdmission.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks)).TotalMilliseconds;

            CreatingVehicleDto cvdto = new CreatingVehicleDto(licensePlate, VIN, type, serviceAdmissionMiliseconds);

            Assert.AreEqual(cvdto.LicensePlate, licensePlate);
            Assert.AreEqual(cvdto.VIN, VIN);
            Assert.AreEqual(cvdto.Type, type);
            Assert.AreEqual(cvdto.ServiceAdmission, serviceAdmissionMiliseconds);
        }
    }
}