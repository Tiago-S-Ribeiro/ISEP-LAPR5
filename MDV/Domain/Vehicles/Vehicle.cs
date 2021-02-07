using System;
using System.Text.RegularExpressions;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Vehicles{
    
    public class Vehicle : Entity<VehicleId>, IAggregateRoot{
        
        public string LicensePlate { get; private set; }
        public string VIN { get; private set; }
        public VehicleType Type { get; private set; }
        public DateTime ServiceAdmission { get; private set; }
        public bool Active { get; private set; }

        private Vehicle(){
            this.Active = true;
        }

        public Vehicle(string licensePlate, string vin, VehicleType type, DateTime serviceAdmission){
            
            Regex licensePlateRegex = new Regex(@"^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$");
            Regex vinRegex = new Regex(@"^[A-Z0-9]{17}$");

            if (licensePlate == null || !licensePlateRegex.IsMatch(licensePlate)){
                throw new BusinessRuleValidationException("License plate can't be null or not be on the standard national format.");
            }
            if (vin == null || !vinRegex.IsMatch(vin)){
                throw new BusinessRuleValidationException("VIN can't be null or not be a 17 digit number.");
            }
            verifyIfDateIsOlder(serviceAdmission, "Vehicle's service admission date can't be null and must be older than the current date.");

            this.Id = new VehicleId(Guid.NewGuid());
            this.LicensePlate = licensePlate;
            this.VIN = vin;
            this.Type = type;
            this.ServiceAdmission = serviceAdmission;
            this.Active = false;
            
        }

        private void verifyIfDateIsOlder(DateTime date, string msg){
            if (DateTime.Compare(date, DateTime.Now) >= 0){
                throw new BusinessRuleValidationException(msg);
            }
        }

        public void MarkAsInative(){
            this.Active = false;
        }

        public override string ToString(){
            return "Vehicle: " + LicensePlate + ", VIN: " + VIN + ", Type: " + Type;
        }
    }
}