namespace DDDSample1.Domain.Trips{
    public class CreatingTripDto{

        public string Key { get; set; }
        public string Line { get; set; }
        public string Path { get; set; }
        public int[] PassingTimes { get; set; }

        public CreatingTripDto(string key, string line, string path, int [] passingTimes){
            this.Key = key;
            this.Line = line;
            this.Path = path;
            this.PassingTimes = passingTimes;
        }
    }
}