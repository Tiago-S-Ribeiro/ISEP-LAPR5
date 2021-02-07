namespace DDDSample1.Domain.Workblocks{
    public class TripKey{
        
        public string Value { get; private set; }

        private TripKey(){}

        public TripKey(string key){
            this.Value = key;
        }
    }
}