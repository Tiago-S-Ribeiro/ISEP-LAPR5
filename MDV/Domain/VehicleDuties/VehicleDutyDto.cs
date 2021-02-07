using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.VehicleDuties{
    public class VehicleDutyDto{

        public string Id { get; set; }
        public string Key { get; private set; }
        public string Vehicle { get; private set; } 
        public DateTime Date { get; private set; } 
        public List<string> Trips { get; private set; }
        public List<string> Workblocks { get; private set; }
    

        public VehicleDutyDto(string key, string vehicle, DateTime date, List<string> trips, List<string> workblocks){
            this.Key = key;
            this.Vehicle = vehicle;
            this.Date = date;
            this.Trips = trips;
            this.Workblocks = workblocks;
        }

        public VehicleDutyDto(string id, string key, string vehicle, DateTime date, List<string> trips, List<string> workblocks){ 
            this.Id = id;
            this.Key = key;
            this.Vehicle = vehicle;
            this.Date = date;
            this.Trips = trips;
            this.Workblocks = workblocks;
        }
    }
}