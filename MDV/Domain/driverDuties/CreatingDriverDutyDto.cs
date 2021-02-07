namespace DDDSample1.Domain.DriverDuties{
    public class CreatingDriverDutyDto{

        public string Key { get; private set; }
        public string Driver { get; private set; } 
        public string[] Workblocks { get; private set; }

        public CreatingDriverDutyDto(string key, string driver, string[] workblocks){
            this.Key = key;
            this.Driver = driver;
            this.Workblocks = workblocks;
        }
    }
}