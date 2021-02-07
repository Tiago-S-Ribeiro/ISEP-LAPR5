using System;
using System.Collections.Generic;
using DDDSample1.Domain.VehicleDuties;

namespace DDDSample1.Domain.VehicleDuties{
    public class VehicleDutyMapper{
        public static VehicleDutyDto toDTO(CreatingVehicleDutyDto requestBody){
            List<string> trips = new List<string>(requestBody.Trips);
            List<string> workblocks = new List<string>(requestBody.Workblocks);
            DateTime start = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime date = start.AddMilliseconds(requestBody.Date);
            return new VehicleDutyDto(requestBody.Key, requestBody.Vehicle, date, trips, workblocks);
        }

        public static VehicleDutyDto toDTO(VehicleDuty requestBody){
            List<string> trips = new List<string>();
            List<string> workblocks = new List<string>();

            if (requestBody.Trips == null) {
                Console.WriteLine("Null list value");
            } else {
                foreach (VDTripKey keyT in requestBody.Trips){
                    trips.Add(keyT.Value);
                }                
            }

            if (requestBody.Workblocks == null) {
                Console.WriteLine("Null list value");
            } else {
                foreach (VDWorkblockKey keyWB in requestBody.Workblocks){
                    workblocks.Add(keyWB.Value);
                }                
            }
            return new VehicleDutyDto(requestBody.Id.AsString(), requestBody.Key, requestBody.Vehicle, requestBody.Date, trips, workblocks);
        }

        public static VehicleDuty toDomain(VehicleDutyDto dto){
            return new VehicleDuty(dto.Key, dto.Vehicle, dto.Date, dto.Trips, dto.Workblocks);
        }
    }
}