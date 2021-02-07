using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.Vehicles;

namespace Tests
{
    [TestClass]
    public class VehicleMapperTest
    {
        [TestMethod]
        public void testToDto()
        {
            string licensePlate = "66-99-HC";
            string VIN = "12345678912345678";
            String type = "Miniautocarro";
            DateTime serviceAdmission = new DateTime(2020, 11, 15);

            long serviceAdmissionMiliseconds = (long)(new TimeSpan(serviceAdmission.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks)).TotalMilliseconds;

            CreatingVehicleDto cvdto = new CreatingVehicleDto(licensePlate, VIN, type, serviceAdmissionMiliseconds);

            VehicleDto vdto = VehicleMapper.toDTO(cvdto);

            VehicleDto dto = new VehicleDto(licensePlate, VIN, type, serviceAdmission);

            Assert.AreEqual(vdto.LicensePlate, dto.LicensePlate);
            Assert.AreEqual(vdto.VIN, dto.VIN);
            Assert.AreEqual(vdto.Type, dto.Type);
            Assert.AreEqual(vdto.ServiceAdmission, dto.ServiceAdmission);
        }

        [TestMethod]
        public void testToDomain()
        {
            string licensePlate = "66-99-HC";
            string VIN = "12345678912345678";
            String type = "Miniautocarro";
            DateTime serviceAdmission = new DateTime(2020, 11, 15);
            VehicleType vType = new VehicleType("Miniautocarro");

            long serviceAdmissionMiliseconds = (long)(new TimeSpan(serviceAdmission.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks)).TotalMilliseconds;

            CreatingVehicleDto cvdto = new CreatingVehicleDto(licensePlate, VIN, type, serviceAdmissionMiliseconds);

            Vehicle vMapper = VehicleMapper.toDomain(VehicleMapper.toDTO(cvdto));

            Vehicle v = new Vehicle(licensePlate, VIN, vType, serviceAdmission);

            Assert.AreEqual(vMapper.LicensePlate, v.LicensePlate);
            Assert.AreEqual(vMapper.VIN, v.VIN);
            Assert.AreEqual<String>(vMapper.Type.Value, v.Type.Value);
            Assert.AreEqual(vMapper.ServiceAdmission, v.ServiceAdmission);
        }
    }
}