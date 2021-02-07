using System;
using System.Collections.Generic;
using DDDSample1.Domain.Drivers;

namespace DDDSample1.Domain.Drivers
{
    public class DriverMapper
    {
        public static DriverDto toDTO(CreatingDriverDto obj)
        {

            List<string> driverTypes = new List<string>(obj.DriverTypes);
            DateTime start = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime dateBirth = start.AddMilliseconds(obj.DateBirth);
            DateTime drivingLicenseExpirationDate = start.AddMilliseconds(obj.DrivingLicenseExpirationDate);
            DateTime entryDateCompany = start.AddMilliseconds(obj.EntryDateCompany);
            DateTime departureDateCompany = start.AddMilliseconds(obj.DepartureDateCompany);
            return new DriverDto(obj.MechanographicNumber, obj.Name, dateBirth, obj.CitizenCardNumber, obj.NIF, obj.DrivingLicenseNumber, drivingLicenseExpirationDate, driverTypes, entryDateCompany, departureDateCompany);
        }

        public static DriverDto toDTO(Driver obj)
        {
            List<string> list = new List<string>();

            if (obj.DriverTypes == null)
            {
                Console.WriteLine("Entrei");
            }
            else
            {
                foreach (DriverTypeElement driverType in obj.DriverTypes)
                {
                    list.Add(driverType.Value);
                }
            }
            return new DriverDto(obj.Id.AsString(), obj.MechanographicNumber, obj.Name, obj.DateBirth, obj.CitizenCardNumber, obj.NIF, obj.DrivingLicenseNumber, obj.DrivingLicenseExpirationDate, list, obj.EntryDateCompany, obj.DepartureDateCompany);
        }

        public static Driver toDomain(DriverDto dto)
        {
            return new Driver(dto.MechanographicNumber, dto.Name, dto.DateBirth, dto.CitizenCardNumber, dto.NIF, dto.DrivingLicenseNumber, dto.DrivingLicenseExpirationDate, dto.DriverTypes, dto.EntryDateCompany, dto.DepartureDateCompany);
        }
    }
}