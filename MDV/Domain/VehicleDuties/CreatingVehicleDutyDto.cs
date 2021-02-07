namespace DDDSample1.Domain.VehicleDuties{
    public class CreatingVehicleDutyDto{

        public string Key { get; private set; }
        public string Vehicle { get; private set; } 
        public long Date { get; private set; } 
        public string[] Trips { get; private set; }
        public string[] Workblocks { get; private set; }

        public CreatingVehicleDutyDto(string key, string vehicle, long date, string[] trips, string[] workblocks){
            this.Key = key;
            this.Vehicle = vehicle;
            this.Date = date;
            this.Trips = trips;
            this.Workblocks = workblocks;
        }
    }
}