using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DriverDuties{

    public class DriverDuty : Entity<DriverDutyId>, IAggregateRoot{

        public string Key { get; private set; }
        public string Driver { get; private set; } 
        public List<DriverWorkblock> Workblocks { get; private set; }
        public bool Active { get; private set; }

        private DriverDuty(){
            this.Active = true;
        }

        public DriverDuty(string key, string driver, List<string> workblocks){
            
            this.Workblocks = new List<DriverWorkblock>();
            foreach (string wb in workblocks){
                DriverWorkblock element = new DriverWorkblock(wb);
                this.Workblocks.Add(element);
            }

            if(key == null){ throw new BusinessRuleValidationException("Key can't be null.");}
            if(driver == null){ throw new BusinessRuleValidationException("Driver can't be null.");}

            this.Key = key;
            this.Driver = driver;
            this.Id = new DriverDutyId(Guid.NewGuid());
            this.Active = false;
        }
        
        public void MarkAsInative(){
            this.Active = false;
        }

        public override string ToString(){
            return "Driver Duty: "+Key+", Driver: "+Driver;
        }
    }
}