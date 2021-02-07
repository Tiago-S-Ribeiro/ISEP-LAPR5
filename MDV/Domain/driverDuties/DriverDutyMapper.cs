using System;
using System.Collections.Generic;
using DDDSample1.Domain.DriverDuties;

namespace DDDSample1.Domain.DriverDuties{
    public class DriverDutyMapper{
        public static DriverDutyDto toDTO(CreatingDriverDutyDto requestBody){

            List<string> workblocks = new List<string>(requestBody.Workblocks);

            return new DriverDutyDto(requestBody.Key, requestBody.Driver, workblocks);
        }

        public static DriverDutyDto toDTO(DriverDuty requestBody){
            List<string> workblocks = new List<string>();
            if (requestBody.Workblocks == null) {
                Console.WriteLine("Null workblocks list value");
            } else {
                foreach (DriverWorkblock driverWB in requestBody.Workblocks){
                    workblocks.Add(driverWB.Value);
                }                
            }
            return new DriverDutyDto(requestBody.Id.AsString(), requestBody.Key, requestBody.Driver, workblocks);
        }

        public static DriverDuty toDomain(DriverDutyDto dto){
            return new DriverDuty(dto.Key, dto.Driver, dto.Workblocks);
        }
    }
}