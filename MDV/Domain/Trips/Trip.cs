using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Trips{

    public class Trip : Entity<TripId>, IAggregateRoot{

        public string Key { get; private set; }
        public string Line { get; private set; } 
        public string Path { get; private set; } 
        public List<PassingTime> PassingTimes { get; private set; }
        public bool Active { get; private set; }

        public Trip(){
            this.Active = true;
        }

       public Trip(string key, string line, string path, List<int> passingTimes){

            isNull(key, "Key can't be null.");
            isNull(line, "Line can't be null.");
            isNull(path, "Path can't be null.");

            this.Id = new TripId(Guid.NewGuid());
            this.Key = key;
            this.Line = line;
            this.Path = path;
            this.PassingTimes = convertIntsToPassingTimes(passingTimes);
            this.Active = false;
        }

        public bool isNull(string parameter, string message){
            if(parameter == null){
                throw new BusinessRuleValidationException(message);
            }
            return true;
        }

        public List<PassingTime> convertIntsToPassingTimes(List<int> intPassingTimes){
            List<PassingTime> passingTimes = new List<PassingTime>();
            foreach (int time in intPassingTimes){
                PassingTime pt = new PassingTime(time);
                passingTimes.Add(pt);
            }
            return passingTimes;
        }
        
        public void MarkAsInative(){
            this.Active = false;
        }

        public override string ToString(){
            return "Trip: "+Key+", Line: "+Line+", Path: "+Path;
        }
    }
}