using System;
using System.Collections.Generic;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Domain.Shared;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Tests
{
    [TestClass]
    public class CreatingVehicleDutyDtoTest
    {
        [TestMethod]
        public void testSetParameters()
        {
            string key = "vdkey";
            string vehicle = "vehicle1";
            DateTime date = new DateTime(2022, 10, 11);
            List<String> trips = new List<string>() { "trip1", "trip2", "trip3" };
            List<String> workblocks = new List<string>() { "wb1", "wb2", "wb3" };

            long dateMiliseconds = (long)(new TimeSpan(date.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks)).TotalMilliseconds;

            CreatingVehicleDutyDto cvddto = new CreatingVehicleDutyDto(key, vehicle, dateMiliseconds, trips.ToArray(), workblocks.ToArray());

            Assert.AreEqual(cvddto.Key, key);
            Assert.AreEqual(cvddto.Vehicle, vehicle);
            Assert.AreEqual(cvddto.Date, dateMiliseconds);
            foreach (String s in cvddto.Trips)
            {
                Assert.IsNotNull(trips.Contains(s));
            }
            foreach (String s in cvddto.Workblocks)
            {
                Assert.IsNotNull(workblocks.Contains(s));
            }
        }
    }
}