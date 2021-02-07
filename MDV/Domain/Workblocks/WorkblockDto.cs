using System.Collections.Generic;

namespace DDDSample1.Domain.Workblocks{
    public class WorkblockDto{
        
        public string Id { get; set; }   
        public string Key { get; set; }
        public string VehicleDutyKey {get; private set;}
        public List<string> ListOfTrips { get; set; }
        public int StartTime { get; set; }
        public int EndTime { get; set; }

        public WorkblockDto(string key, string vehicleDutyKey, List<string> listOfTrips, int startTime, int endTime){

            this.Key = key;
            this.VehicleDutyKey=vehicleDutyKey;
            this.ListOfTrips = listOfTrips;
            this.StartTime = startTime;
            this.EndTime = endTime;
        }

        public WorkblockDto(string id, string alphanumericKey, string vehicleDutyKey, List<string> listOfTrips, int startTime, int endTime){
            
            this.Id = id;
            this.Key = alphanumericKey;
            this.VehicleDutyKey=vehicleDutyKey;
            this.ListOfTrips = listOfTrips;
            this.StartTime = startTime;
            this.EndTime = endTime;
        }
    }
}