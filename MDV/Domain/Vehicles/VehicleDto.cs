using System;

namespace DDDSample1.Domain.Vehicles{
    public class VehicleDto{
        
        public string Id { get; set; }   
        public string LicensePlate { get; set; }
        public string VIN { get; set; }
        public string Type { get; set; }
        public DateTime ServiceAdmission { get; set; }

        public VehicleDto(string licensePlate, string vin, string type, DateTime serviceAdmission){
            
            this.LicensePlate = licensePlate;
            this.VIN = vin;
            this.Type = type;
            this.ServiceAdmission = serviceAdmission;
        }

        public VehicleDto(string id, string licensePlate, string vin, string type, DateTime serviceAdmission){
            
            this.Id = id;
            this.LicensePlate = licensePlate;
            this.VIN = vin;
            this.Type = type;
            this.ServiceAdmission = serviceAdmission;
        }
    }
}