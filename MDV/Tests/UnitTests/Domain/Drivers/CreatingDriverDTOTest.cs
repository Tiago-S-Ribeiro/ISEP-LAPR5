using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.Drivers;
using System.Collections.Generic;

namespace Tests
{
    [TestClass]
    public class CreatingDriverDTOTest
    {
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

            long birthDateMiliseconds = (long)(new TimeSpan(birthDate.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks)).TotalMilliseconds;
            long drivingLicenseExpirationDateMiliseconds = (long)(new TimeSpan(drivingLicenseExpirationDate.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks)).TotalMilliseconds;
            long EntryDateCompanyMiliseconds = (long)(new TimeSpan(EntryDateCompany.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks)).TotalMilliseconds;
            long DepartureDateCompanyMiliseconds = (long)(new TimeSpan(DepartureDateCompany.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks)).TotalMilliseconds;

            CreatingDriverDto cdto = new CreatingDriverDto(mNumber, name, birthDateMiliseconds, cardNumber, NIF, drivingLicense, drivingLicenseExpirationDateMiliseconds, DriverTypes.ToArray(), EntryDateCompanyMiliseconds, DepartureDateCompanyMiliseconds);

            Assert.AreEqual(cdto.MechanographicNumber, mNumber);
            Assert.AreEqual(cdto.Name, name);
            Assert.AreEqual(cdto.DateBirth, birthDateMiliseconds);
            Assert.AreEqual(cdto.CitizenCardNumber, cardNumber);
            Assert.AreEqual(cdto.NIF, NIF);
            Assert.AreEqual(cdto.DrivingLicenseNumber, drivingLicense);
            Assert.AreEqual(cdto.DrivingLicenseExpirationDate, drivingLicenseExpirationDateMiliseconds);
            Assert.AreEqual(cdto.EntryDateCompany, EntryDateCompanyMiliseconds);
            Assert.AreEqual(cdto.DepartureDateCompany, DepartureDateCompanyMiliseconds);
        }
    }
}