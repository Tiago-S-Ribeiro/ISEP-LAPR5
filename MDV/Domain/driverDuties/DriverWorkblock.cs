namespace DDDSample1.Domain.DriverDuties{
    public class DriverWorkblock{
        
        public string Value { get; private set; }

        private DriverWorkblock(){}

        public DriverWorkblock(string key){
            this.Value = key;
        }
    }
}