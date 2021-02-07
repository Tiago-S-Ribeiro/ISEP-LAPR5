using System.Collections.Generic;

namespace DDDSample1.Domain.Trips{
    public class TripDto{

        public string Id { get; set; }
        public string Key { get; set; }
        public string Line { get; set; }
        public string Path { get; set; }
        public List<int> PassingTimes { get; set; }
    

        public TripDto(string key, string line, string path, List<int> passingTimes){
                
            this.Key = key;
            this.Line = line;
            this.Path = path;
            this.PassingTimes = passingTimes;
        }

        public TripDto(string id, string key, string line, string path, List<int> passingTimes){
                
            this.Id = id;
            this.Key = key;
            this.Line = line;
            this.Path = path;
            this.PassingTimes = passingTimes;
        }
    }
}