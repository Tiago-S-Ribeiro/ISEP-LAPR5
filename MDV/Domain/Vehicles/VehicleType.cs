namespace DDDSample1.Domain.Vehicles{
    public class VehicleType{
        
        public string Value { get; private set; }

        private VehicleType(){}

        public VehicleType(string type){
            this.Value = type;
        }
    }
}