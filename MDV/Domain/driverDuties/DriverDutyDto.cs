using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.DriverDuties{
    public class DriverDutyDto{

        public string Id { get; set; }
        public string Key { get; private set; }
        public string Driver { get; private set; } 
        public List<string> Workblocks { get; private set; }
    
        public DriverDutyDto(string key, string driver, List<string> workblocks){
            this.Key = key;
            this.Driver = driver;
            this.Workblocks = workblocks;
        }

        public DriverDutyDto(string id, string key, string driver, List<string> workblocks){ 
            this.Id = id;
            this.Key = key;
            this.Driver = driver;
            this.Workblocks = workblocks;
        }
    }
}