using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.Drivers;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace Tests
{
    [TestClass]
    public class DriversTests
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

            Driver d = new Driver(mNumber, name, birthDate, cardNumber, NIF, drivingLicense, drivingLicenseExpirationDate, DriverTypes, EntryDateCompany, DepartureDateCompany);

            List<DriverTypeElement> driverTypesList = new List<DriverTypeElement> { };
            foreach (string s in DriverTypes)
            {
                DriverTypeElement e = new DriverTypeElement(s);
                driverTypesList.Add(e);
            }

            Assert.AreEqual(d.MechanographicNumber, mNumber);
            Assert.AreEqual(d.Name, name);
            Assert.AreEqual(d.DateBirth, birthDate);
            Assert.AreEqual(d.CitizenCardNumber, cardNumber);
            Assert.AreEqual(d.NIF, NIF);
            Assert.AreEqual(d.DrivingLicenseNumber, drivingLicense);
            Assert.AreEqual(d.DrivingLicenseExpirationDate, drivingLicenseExpirationDate);
            foreach (DriverTypeElement driver in driverTypesList)
            {
                Assert.IsNotNull(d.DriverTypes.Contains(driver));
            }
            Assert.AreEqual(d.EntryDateCompany, EntryDateCompany);
            Assert.AreEqual(d.DepartureDateCompany, DepartureDateCompany);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException), "Mechanographic Number can't be null or not be a 9 digit alpha-numeric string.")]
        public void rxMechanographicNumber()
        {
            String mNumber = "1";
            String name = "DriverTest";
            DateTime birthDate = new DateTime(2000, 06, 14);
            int cardNumber = 12345678;
            int NIF = 987654321;
            int drivingLicense = 123456789;
            DateTime drivingLicenseExpirationDate = new DateTime(2024, 05, 01);
            List<String> DriverTypes = new List<String> { "Linguas", "Experiente" };
            DateTime EntryDateCompany = new DateTime(2018, 07, 01);
            DateTime DepartureDateCompany = new DateTime(2019, 01, 01);

            Driver d = new Driver(mNumber, name, birthDate, cardNumber, NIF, drivingLicense, drivingLicenseExpirationDate, DriverTypes, EntryDateCompany, DepartureDateCompany);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException), "Citizen card number should be greater than 0 and have to match the criteria.")]
        public void rxCitizenCardNumber()
        {
            String mNumber = "12a45678b";
            String name = "DriverTest";
            DateTime birthDate = new DateTime(2000, 06, 14);
            int cardNumber = 1;
            int NIF = 987654321;
            int drivingLicense = 123456789;
            DateTime drivingLicenseExpirationDate = new DateTime(2024, 05, 01);
            List<String> DriverTypes = new List<String> { "Linguas", "Experiente" };
            DateTime EntryDateCompany = new DateTime(2018, 07, 01);
            DateTime DepartureDateCompany = new DateTime(2019, 01, 01);

            Driver d = new Driver(mNumber, name, birthDate, cardNumber, NIF, drivingLicense, drivingLicenseExpirationDate, DriverTypes, EntryDateCompany, DepartureDateCompany);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException), "NIF should be greater than 0 and have to match the criteria.")]
        public void rxNIF()
        {
            String mNumber = "12a45678b";
            String name = "DriverTest";
            DateTime birthDate = new DateTime(2000, 06, 14);
            int cardNumber = 12345678;
            int NIF = 12345;
            int drivingLicense = 123456789;
            DateTime drivingLicenseExpirationDate = new DateTime(2024, 05, 01);
            List<String> DriverTypes = new List<String> { "Linguas", "Experiente" };
            DateTime EntryDateCompany = new DateTime(2018, 07, 01);
            DateTime DepartureDateCompany = new DateTime(2019, 01, 01);

            Driver d = new Driver(mNumber, name, birthDate, cardNumber, NIF, drivingLicense, drivingLicenseExpirationDate, DriverTypes, EntryDateCompany, DepartureDateCompany);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException), "Driving license number should be greater than 0 and have to match the criteria.")]
        public void rxDrivingLicenseNumber()
        {
            String mNumber = "12a45678b";
            String name = "DriverTest";
            DateTime birthDate = new DateTime(2000, 06, 14);
            int cardNumber = 12345678;
            int NIF = 987654321;
            int drivingLicense = 123;
            DateTime drivingLicenseExpirationDate = new DateTime(2024, 05, 01);
            List<String> DriverTypes = new List<String> { "Linguas", "Experiente" };
            DateTime EntryDateCompany = new DateTime(2018, 07, 01);
            DateTime DepartureDateCompany = new DateTime(2019, 01, 01);

            Driver d = new Driver(mNumber, name, birthDate, cardNumber, NIF, drivingLicense, drivingLicenseExpirationDate, DriverTypes, EntryDateCompany, DepartureDateCompany);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException), "Driving license expiration date shouldn't be null and should be greater than the actual date.")]
        public void verifyIfDateIsMoreRecent()
        {
            String mNumber = "12a45678b";
            String name = "DriverTest";
            DateTime birthDate = new DateTime(2000, 06, 14);
            int cardNumber = 12345678;
            int NIF = 987654321;
            int drivingLicense = 123456789;
            DateTime drivingLicenseExpirationDate = new DateTime(2019, 05, 01);
            List<String> DriverTypes = new List<String> { "Linguas", "Experiente" };
            DateTime EntryDateCompany = new DateTime(2018, 07, 01);
            DateTime DepartureDateCompany = new DateTime(2019, 01, 01);

            Driver d = new Driver(mNumber, name, birthDate, cardNumber, NIF, drivingLicense, drivingLicenseExpirationDate, DriverTypes, EntryDateCompany, DepartureDateCompany);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException), "The entry date in the company shouldn't be null and should be less than the actual date.")]
        public void verifyIfEntryDateIsOlder()
        {

            String mNumber = "12a45678b";
            String name = "DriverTest";
            DateTime birthDate = new DateTime(2000, 06, 14);
            int cardNumber = 12345678;
            int NIF = 987654321;
            int drivingLicense = 123456789;
            DateTime drivingLicenseExpirationDate = new DateTime(2024, 05, 01);
            List<String> DriverTypes = new List<String> { "Linguas", "Experiente" };
            DateTime EntryDateCompany = new DateTime(2021, 07, 01);
            DateTime DepartureDateCompany = new DateTime(2019, 01, 01);

            Driver d = new Driver(mNumber, name, birthDate, cardNumber, NIF, drivingLicense, drivingLicenseExpirationDate, DriverTypes, EntryDateCompany, DepartureDateCompany);

        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException), "Date birth shouldn't be null and should be less than the actual date.")]
        public void verifyIfBirthDateIsOlder()
        {

            String mNumber = "12a45678b";
            String name = "DriverTest";
            DateTime birthDate = new DateTime(2021, 06, 14);
            int cardNumber = 12345678;
            int NIF = 987654321;
            int drivingLicense = 123456789;
            DateTime drivingLicenseExpirationDate = new DateTime(2024, 05, 01);
            List<String> DriverTypes = new List<String> { "Linguas", "Experiente" };
            DateTime EntryDateCompany = new DateTime(2018, 07, 01);
            DateTime DepartureDateCompany = new DateTime(2019, 01, 01);

            Driver d = new Driver(mNumber, name, birthDate, cardNumber, NIF, drivingLicense, drivingLicenseExpirationDate, DriverTypes, EntryDateCompany, DepartureDateCompany);

        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException), "The departure date in the company shouldn't be null and should be less than the actual date.")]
        public void verifyIfDepartureDateIsOlder()
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
            DateTime DepartureDateCompany = new DateTime(2022, 01, 01);

            Driver d = new Driver(mNumber, name, birthDate, cardNumber, NIF, drivingLicense, drivingLicenseExpirationDate, DriverTypes, EntryDateCompany, DepartureDateCompany);

        }
    }
}