namespace DDDSample1.Domain.VehicleDuties{
    public class VDTripKey{
        
        public string Value { get; private set; }

        private VDTripKey(){}

        public VDTripKey(string key){
            this.Value = key;
        }
    }
}