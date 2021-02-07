namespace DDDSample1.Domain.Vehicles{
    public class CreatingVehicleDto{

        public string LicensePlate { get; set; }
        public string VIN { get; set; }
        public string Type { get; set; }
        public long ServiceAdmission { get; set; }

        public CreatingVehicleDto(string licensePlate, string vin, string type, long serviceAdmission){
            this.LicensePlate = licensePlate;
            this.VIN = vin;
            this.Type = type;
            this.ServiceAdmission = serviceAdmission;
        }
    }
}