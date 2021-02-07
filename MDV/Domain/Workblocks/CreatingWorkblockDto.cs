namespace DDDSample1.Domain.Workblocks{
    public class CreatingWorkblockDto{

        public string Key { get; set; }
        public string VehicleDutyKey {get; private set;}
        public string[] ListOfTrips { get; set; }
        public int StartTime { get; set; }
        public int EndTime { get; set; }

        public CreatingWorkblockDto(string key,string vehicleDutyKey,string[] listOfTrips, int startTime, int endTime){
            this.Key = key;
            this.VehicleDutyKey=vehicleDutyKey;
            this.ListOfTrips = listOfTrips;
            this.StartTime = startTime;
            this.EndTime = endTime;
        }
    }
}