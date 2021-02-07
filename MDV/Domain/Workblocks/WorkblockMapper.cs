using System;
using System.Collections.Generic;
using DDDSample1.Domain.Workblocks;

namespace DDDSample1.Domain.Workblocks{
    public class WorkblockMapper{
        public static WorkblockDto toDTO(CreatingWorkblockDto obj){
            
            List<string> listOfTrips = new List<string>(obj.ListOfTrips);
            return new WorkblockDto(obj.Key, obj.VehicleDutyKey,listOfTrips, obj.StartTime, obj.EndTime);
        }

        public static WorkblockDto toDTO(Workblock obj){
            List<string> list = new List<string>();
            
            if (obj.ListOfTrips == null) {
                Console.WriteLine("List is null");
            } else {
                foreach (TripKey tripId in obj.ListOfTrips){
                    list.Add(tripId.Value);
                }                
            }
            return new WorkblockDto(obj.Id.AsString(), obj.Key, obj.VehicleDutyKey,list, obj.StartTime, obj.EndTime);
        }

        public static Workblock toDomain(WorkblockDto dto){
            return new Workblock(dto.Key, dto.VehicleDutyKey ,dto.ListOfTrips, dto.StartTime, dto.EndTime);
        }
    }
}