using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Drivers
{
    public class DriverDto
    {

        public string Id { get; set; }
        public string MechanographicNumber { get; set; }
        public string Name { get; set; }
        public DateTime DateBirth { get; set; }
        public int CitizenCardNumber { get; set; }
        public int NIF { get; set; }
        public int DrivingLicenseNumber { get; set; }
        public DateTime DrivingLicenseExpirationDate { get; set; }
        public List<string> DriverTypes { get; set; }
        public DateTime EntryDateCompany { get; set; }
        public DateTime DepartureDateCompany { get; set; }

        public DriverDto(string mechanographicNumber, string name, DateTime dateBirth, int citizenCardNumber, int NIF, int drivingLicenseNumber, DateTime drivingLicenseExpirationDate, List<string> driverTypes, DateTime entryDateCompany, DateTime departureDateCompany)
        {

            this.DriverTypes = new List<string>();
            this.MechanographicNumber = mechanographicNumber;
            this.Name = name;
            this.DateBirth = dateBirth;
            this.CitizenCardNumber = citizenCardNumber;
            this.NIF = NIF;
            this.DrivingLicenseNumber = drivingLicenseNumber;
            this.DrivingLicenseExpirationDate = drivingLicenseExpirationDate;
            this.DriverTypes = driverTypes;
            this.EntryDateCompany = entryDateCompany;
            this.DepartureDateCompany = departureDateCompany;
        }

        public DriverDto(string id, string mechanographicNumber, string name, DateTime dateBirth, int citizenCardNumber, int NIF, int drivingLicenseNumber, DateTime drivingLicenseExpirationDate, List<string> driverTypes, DateTime entryDateCompany, DateTime departureDateCompany)
        {

            this.Id = id;
            this.MechanographicNumber = mechanographicNumber;
            this.Name = name;
            this.DateBirth = dateBirth;
            this.CitizenCardNumber = citizenCardNumber;
            this.NIF = NIF;
            this.DrivingLicenseNumber = drivingLicenseNumber;
            this.DrivingLicenseExpirationDate = drivingLicenseExpirationDate;
            this.DriverTypes = driverTypes;
            this.EntryDateCompany = entryDateCompany;
            this.DepartureDateCompany = departureDateCompany;
        }
    }
}