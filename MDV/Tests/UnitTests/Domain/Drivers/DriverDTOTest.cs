using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.Drivers;
using System.Collections.Generic;

namespace Tests
{
    [TestClass]
    public class DriverDTOTest
    {
        [TestMethod]
        public void testSetParametersID()
        {
            string id = "id1";
            String mNumber = "12a45678b";
            String name = "DriverTest";
            DateTime birthDate = new DateTime(2000, 06, 14);
            int cardNumber = 12345678;
            int NIF = 987654321;
            int drivingLicense = 123456789;
            DateTime drivingLicenseExpirationDate = new DateTime(2024, 05, 01);
            List<String> DriverTypes = new List<String> { "Linguas", "Experiente" };
            DateTime EntryDateCompany = new DateTime(2018, 07, 01);
            DateTime DepartureDateCompany = new DateTime(2019, 01, 01);

            DriverDto dto = new DriverDto(id, mNumber, name, birthDate, cardNumber, NIF, drivingLicense, drivingLicenseExpirationDate, DriverTypes, EntryDateCompany, DepartureDateCompany);

            Assert.AreEqual(dto.Id, id);
            Assert.AreEqual(dto.MechanographicNumber, mNumber);
            Assert.AreEqual(dto.Name, name);
            Assert.AreEqual(dto.DateBirth, birthDate);
            Assert.AreEqual(dto.CitizenCardNumber, cardNumber);
            Assert.AreEqual(dto.NIF, NIF);
            Assert.AreEqual(dto.DrivingLicenseNumber, drivingLicense);
            Assert.AreEqual(dto.DrivingLicenseExpirationDate, drivingLicenseExpirationDate);
            foreach (String s in DriverTypes)
            {
                Assert.IsNotNull(dto.DriverTypes.Contains(s));
            }
            Assert.AreEqual(dto.EntryDateCompany, EntryDateCompany);
            Assert.AreEqual(dto.DepartureDateCompany, DepartureDateCompany);
        }

        [TestMethod]
        public void testSetParameters()
        {
            String mNumber = "12a45678b";
            String name = "DriverTest";
            DateTime birthDate = new DateTime(2000, 06, 14);
            int cardNumber = 12345678;
            int NIF = 987654321;
            int drivingLicense = 123456789;
            DateTime drivingLicenseExpirationDate = new DateTime(2024, 05, 01);
            List<String> DriverTypes = new List<String> { "Linguas", "Experiente" };
            DateTime EntryDateCompany = new DateTime(2018, 07, 01);
            DateTime DepartureDateCompany = new DateTime(2019, 01, 01);

            DriverDto dto = new DriverDto(mNumber, name, birthDate, cardNumber, NIF, drivingLicense, drivingLicenseExpirationDate, DriverTypes, EntryDateCompany, DepartureDateCompany);

            Assert.AreEqual(dto.MechanographicNumber, mNumber);
            Assert.AreEqual(dto.Name, name);
            Assert.AreEqual(dto.DateBirth, birthDate);
            Assert.AreEqual(dto.CitizenCardNumber, cardNumber);
            Assert.AreEqual(dto.NIF, NIF);
            Assert.AreEqual(dto.DrivingLicenseNumber, drivingLicense);
            Assert.AreEqual(dto.DrivingLicenseExpirationDate, drivingLicenseExpirationDate);
            foreach (String s in DriverTypes)
            {
                Assert.IsNotNull(dto.DriverTypes.Contains(s));
            }
            Assert.AreEqual(dto.EntryDateCompany, EntryDateCompany);
            Assert.AreEqual(dto.DepartureDateCompany, DepartureDateCompany);
        }
    }
}