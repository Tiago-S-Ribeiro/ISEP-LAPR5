using System;
using System.Collections.Generic;
using DDDSample1.Domain.Trips;

namespace DDDSample1.Domain.Trips{
    public class TripMapper{
        public static TripDto toDTO(CreatingTripDto requestBody){
            List<int> passingTimes = new List<int>(requestBody.PassingTimes);
            return new TripDto(requestBody.Key, requestBody.Line, requestBody.Path, passingTimes);
        }

        public static TripDto toDTO(Trip requestBody){
            List<int> list = new List<int>();
            
            if (requestBody.PassingTimes == null) {
                Console.WriteLine("Null list value");
            } else {
                foreach (PassingTime pt in requestBody.PassingTimes){
                    list.Add(pt.Value);
                }                
            }
            return new TripDto(requestBody.Id.AsString(), requestBody.Key, requestBody.Line, requestBody.Path, list);
        }

        public static Trip toDomain(TripDto dto){
            return new Trip(dto.Key, dto.Line, dto.Path, dto.PassingTimes);
        }
    }
}