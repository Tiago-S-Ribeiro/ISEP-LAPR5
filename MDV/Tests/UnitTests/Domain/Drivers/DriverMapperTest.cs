using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.Drivers;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace Tests
{
    [TestClass]
    public class DriverMapperTest
    {
        [TestMethod]
        public void testToDto()
        {
            String mNumber = "12a45678b";
            String name = "DriverTest";
            DateTime birthDate = new DateTime(2000, 06, 14, 0, 0, 0, DateTimeKind.Utc);
            int cardNumber = 12345678;
            int NIF = 987654321;
            int drivingLicense = 123456789;
            DateTime drivingLicenseExpirationDate = new DateTime(2024, 05, 01, 0, 0, 0, DateTimeKind.Utc);
            List<String> DriverTypes = new List<String> { "Linguas", "Experiente" };
            DateTime EntryDateCompany = new DateTime(2018, 07, 01, 0, 0, 0, DateTimeKind.Utc);
            DateTime DepartureDateCompany = new DateTime(2019, 01, 01, 0, 0, 0, DateTimeKind.Utc);

            long birthDateMiliseconds = (long)(new TimeSpan(birthDate.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks)).TotalMilliseconds;
            long drivingLicenseExpirationDateMiliseconds = (long)(new TimeSpan(drivingLicenseExpirationDate.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks)).TotalMilliseconds;
            long EntryDateCompanyMiliseconds = (long)(new TimeSpan(EntryDateCompany.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks)).TotalMilliseconds;
            long DepartureDateCompanyMiliseconds = (long)(new TimeSpan(DepartureDateCompany.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks)).TotalMilliseconds;

            CreatingDriverDto cdto = new CreatingDriverDto(mNumber, name, birthDateMiliseconds, cardNumber, NIF, drivingLicense, drivingLicenseExpirationDateMiliseconds, DriverTypes.ToArray(), EntryDateCompanyMiliseconds, DepartureDateCompanyMiliseconds);

            DriverDto dto = new DriverDto(mNumber, name, birthDate, cardNumber, NIF, drivingLicense, drivingLicenseExpirationDate, DriverTypes, EntryDateCompany, DepartureDateCompany);

            DriverDto dtoMapper = DriverMapper.toDTO(cdto);

            Assert.AreEqual(dto.MechanographicNumber, dtoMapper.MechanographicNumber);
            Assert.AreEqual(dto.Name, dtoMapper.Name);
            Assert.AreEqual(dto.DateBirth, dtoMapper.DateBirth);
            Assert.AreEqual(dto.CitizenCardNumber, dtoMapper.CitizenCardNumber);
            Assert.AreEqual(dto.NIF, dtoMapper.NIF);
            Assert.AreEqual(dto.DrivingLicenseNumber, dtoMapper.DrivingLicenseNumber);
            Assert.AreEqual(dto.EntryDateCompany, dtoMapper.EntryDateCompany);
            Assert.AreEqual(dto.DepartureDateCompany, dtoMapper.DepartureDateCompany);
            Assert.AreEqual(dto.DrivingLicenseExpirationDate, dtoMapper.DrivingLicenseExpirationDate);
        }

        [TestMethod]
        public void testToDomain()
        {
            String mNumber = "12a45678b";
            String name = "DriverTest";
            DateTime birthDate = new DateTime(2000, 06, 14, 0, 0, 0, DateTimeKind.Utc);
            int cardNumber = 12345678;
            int NIF = 987654321;
            int drivingLicense = 123456789;
            DateTime drivingLicenseExpirationDate = new DateTime(2024, 05, 01, 0, 0, 0, DateTimeKind.Utc);
            List<String> DriverTypes = new List<String> { "Linguas", "Experiente" };
            DateTime EntryDateCompany = new DateTime(2018, 07, 01, 0, 0, 0, DateTimeKind.Utc);
            DateTime DepartureDateCompany = new DateTime(2019, 01, 01, 0, 0, 0, DateTimeKind.Utc);

            long birthDateMiliseconds = (long)(new TimeSpan(birthDate.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks)).TotalMilliseconds;
            long drivingLicenseExpirationDateMiliseconds = (long)(new TimeSpan(drivingLicenseExpirationDate.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks)).TotalMilliseconds;
            long EntryDateCompanyMiliseconds = (long)(new TimeSpan(EntryDateCompany.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks)).TotalMilliseconds;
            long DepartureDateCompanyMiliseconds = (long)(new TimeSpan(DepartureDateCompany.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks)).TotalMilliseconds;

            CreatingDriverDto cdto = new CreatingDriverDto(mNumber, name, birthDateMiliseconds, cardNumber, NIF, drivingLicense, drivingLicenseExpirationDateMiliseconds, DriverTypes.ToArray(), EntryDateCompanyMiliseconds, DepartureDateCompanyMiliseconds);

            Driver domainMapper = DriverMapper.toDomain(DriverMapper.toDTO(cdto));

            Driver d = new Driver(mNumber, name, birthDate, cardNumber, NIF, drivingLicense, drivingLicenseExpirationDate, DriverTypes, EntryDateCompany, DepartureDateCompany);

            Assert.AreEqual(d.MechanographicNumber, domainMapper.MechanographicNumber);
            Assert.AreEqual(d.Name, domainMapper.Name);
            Assert.AreEqual(d.DateBirth, domainMapper.DateBirth);
            Assert.AreEqual(d.CitizenCardNumber, domainMapper.CitizenCardNumber);
            Assert.AreEqual(d.NIF, domainMapper.NIF);
            Assert.AreEqual(d.DrivingLicenseNumber, domainMapper.DrivingLicenseNumber);
            Assert.AreEqual(d.EntryDateCompany, domainMapper.EntryDateCompany);
            Assert.AreEqual(d.DepartureDateCompany, domainMapper.DepartureDateCompany);
            Assert.AreEqual(d.DrivingLicenseExpirationDate, domainMapper.DrivingLicenseExpirationDate);
        }
    }
}