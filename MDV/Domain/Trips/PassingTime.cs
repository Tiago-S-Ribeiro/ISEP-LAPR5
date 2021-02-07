namespace DDDSample1.Domain.Trips{
    public class PassingTime{
        
        public int Value { get; private set; }

        private PassingTime(){}

        public PassingTime(int pTime){
            this.Value = pTime;
        }
    }
}