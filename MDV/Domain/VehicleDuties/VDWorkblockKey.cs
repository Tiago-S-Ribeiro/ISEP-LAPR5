namespace DDDSample1.Domain.VehicleDuties{
    public class VDWorkblockKey{
        
        public string Value { get; private set; }

        private VDWorkblockKey(){}

        public VDWorkblockKey(string key){
            this.Value = key;
        }
    }
}