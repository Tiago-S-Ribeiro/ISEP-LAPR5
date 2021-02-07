using System;

namespace DDDSample1.Domain.Drivers{
    public class CreatingDriverDto{

        public string MechanographicNumber { get; set; }
        public string Name { get; set; }
        public long DateBirth { get; set; }
        public int CitizenCardNumber { get; set; }
        public int NIF { get; set; }
        public int DrivingLicenseNumber { get; set; }
        public long DrivingLicenseExpirationDate { get; set; }
        public string[] DriverTypes { get; set; }
        public long EntryDateCompany { get; set; }
        public long DepartureDateCompany { get; set; }

        public CreatingDriverDto(string mechanographicNumber, string name, long dateBirth, int citizenCardNumber, int NIF, int drivingLicenseNumber, long drivingLicenseExpirationDate, string[] driverTypes, long entryDateCompany, long departureDateCompany){
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