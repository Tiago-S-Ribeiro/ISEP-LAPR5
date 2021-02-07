using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.Vehicles;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace Tests
{
    [TestClass]
    public class VehiclesTests
    {
        [TestMethod]
        public void testSetParameters()
        {
            string licensePlate = "66-99-HC";
            string VIN = "12345678912345678";
            VehicleType type = new VehicleType("Miniautocarro");
            DateTime serviceAdmission = new DateTime(2020, 11, 15);

            Vehicle v = new Vehicle(licensePlate, VIN, type, serviceAdmission);

            Assert.AreEqual(v.LicensePlate, licensePlate);
            Assert.AreEqual(v.VIN, VIN);
            Assert.AreEqual(v.Type, type);
            Assert.AreEqual(v.ServiceAdmission, serviceAdmission);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException), "License plate can't be null or not be on the standard national format.")]
        public void rxLicensePlate()
        {
            string licensePlate = "ABCDEFG";
            string VIN = "12345678912345678";
            VehicleType type = new VehicleType("Miniautocarro");
            DateTime serviceAdmission = new DateTime(2020, 11, 15);

            Vehicle v = new Vehicle(licensePlate, VIN, type, serviceAdmission);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException), "VIN can't be null or not be a 17 digit number.")]
        public void rxVIN()
        {
            string licensePlate = "66-99-HC";
            string VIN = "123";
            VehicleType type = new VehicleType("Miniautocarro");
            DateTime serviceAdmission = new DateTime(2020, 11, 15);

            Vehicle v = new Vehicle(licensePlate, VIN, type, serviceAdmission);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException), "Vehicle's service admission date can't be null and must be older than the current date.")]
        public void admissionDateVerification()
        {
            string licensePlate = "66-99-HC";
            string VIN = "12345678912345678";
            VehicleType type = new VehicleType("Miniautocarro");
            DateTime serviceAdmission = new DateTime(2022, 11, 15);

            Vehicle v = new Vehicle(licensePlate, VIN, type, serviceAdmission);
        }
    }
}