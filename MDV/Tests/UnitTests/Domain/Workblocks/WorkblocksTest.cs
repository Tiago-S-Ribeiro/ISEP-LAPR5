using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using DDDSample1.Domain.Workblocks;
using DDDSample1.Domain.Trips;
using System;

namespace Tests
{
    [TestClass]
    public class WorblocksTest
    {
        [TestMethod]
        public void testSetParameters()
        {
            string key = "key1";
            string vehicleDutyKey = "vdkey";
            int startTime = 1;
            int endTime = 1;
            List<string> lTripKey = new List<string>() { "key1", "key2" };

            Workblock wb = new Workblock(key, vehicleDutyKey, lTripKey, startTime, endTime);

            Assert.AreEqual(wb.Key, key);
            Assert.AreEqual(wb.VehicleDutyKey, vehicleDutyKey);
            Assert.AreEqual(wb.StartTime, startTime);
            Assert.AreEqual(wb.EndTime, endTime);
            foreach (String s in lTripKey)
            {
                TripKey k = new TripKey(s);
                Assert.IsNotNull(wb.ListOfTrips.Contains(k));
            }
        }
    }
}