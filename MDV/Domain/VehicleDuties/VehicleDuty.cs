using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.VehicleDuties{

    public class VehicleDuty : Entity<VehicleDutyId>, IAggregateRoot{

        public string Key { get; private set; }
        public string Vehicle { get; private set; } 
        public DateTime Date { get; private set; } 
        public List<VDTripKey> Trips { get; private set; }
        public List<VDWorkblockKey> Workblocks { get; private set; }
        public bool Active { get; private set; }

        private VehicleDuty(){
            this.Active = true;
        }

        public VehicleDuty(string key, string vehicle, DateTime date, List<string> trips, List<string> workblocks){
            
            this.Trips = new List<VDTripKey>();
            foreach (string tripKey in trips){
                VDTripKey ele = new VDTripKey(tripKey);
                this.Trips.Add(ele);
            }

            this.Workblocks = new List<VDWorkblockKey>();
            foreach (string workblockKey in workblocks){
                VDWorkblockKey ele = new VDWorkblockKey(workblockKey);
                this.Workblocks.Add(ele);
            }

            if(key == null){
                throw new BusinessRuleValidationException("Key can't be null.");
            }
            this.Key = key;
            if(vehicle == null){
                throw new BusinessRuleValidationException("Vehicle can't be null.");
            }
            this.Vehicle = vehicle;
            verifyIfDateIsMoreRecent(date, "Trips date shouldn't be null and should be greater than the current date.");
            this.Date = date;
            this.Id = new VehicleDutyId(Guid.NewGuid());
            this.Active = false;
        }
        
        public void MarkAsInative(){
            this.Active = false;
        }

        private void verifyIfDateIsMoreRecent(DateTime date, string message){
            if (DateTime.Compare(date, DateTime.Now) <= 0){
                throw new BusinessRuleValidationException(message);
            }
        }


        public override string ToString(){
            return "Vehicle Duty: "+Key+", Vehicle: "+Vehicle+", Date: "+Date;
        }
    }
}