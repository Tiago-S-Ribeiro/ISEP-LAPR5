using System;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Workblocks
{

    public class Workblock : Entity<WorkblockId>, IAggregateRoot
    {

        public string Key { get; private set; }
        public string VehicleDutyKey { get; private set; }
        public List<TripKey> ListOfTrips { get; private set; }
        public int StartTime { get; private set; }
        public int EndTime { get; private set; }
        public bool Active { get; private set; }

        private Workblock()
        {
            this.Active = true;
        }

        public Workblock(string key, string vehicleDutyKey, List<string> listOfTrips, int startTime, int endTime)
        {
            this.ListOfTrips = new List<TripKey>();
            foreach (string tripId in listOfTrips)
            {
                TripKey element = new TripKey(tripId);
                this.ListOfTrips.Add(element);
            }

            this.Id = new WorkblockId(Guid.NewGuid());
            this.Key = key;
            this.VehicleDutyKey = vehicleDutyKey;
            this.StartTime = startTime;
            this.EndTime = endTime;
            this.Active = false;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }

        public override string ToString()
        {
            return "Workblock: " + Key + ", Start time: " + StartTime + ", End time: " + EndTime;
        }
    }
}