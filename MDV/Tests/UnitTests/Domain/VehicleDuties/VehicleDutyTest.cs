using System;
using System.Collections.Generic;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Domain.Shared;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Tests
{
    [TestClass]
    public class VehicleDutyTest
    {
        [TestMethod]
        public void testSetParameters()
        {
            string key = "vdkey";
            string vehicle = "vehicle1";
            DateTime date = new DateTime(2022, 10, 11);
            List<String> trips = new List<string>() { "trip1", "trip2", "trip3" };
            List<String> workblocks = new List<string>() { "wb1", "wb2", "wb3" };

            VehicleDuty vd = new VehicleDuty(key, vehicle, date, trips, workblocks);

            Assert.AreEqual(vd.Key, key);
            Assert.AreEqual(vd.Vehicle, vehicle);
            Assert.AreEqual(vd.Date, date);
            foreach (VDTripKey vdk in vd.Trips)
            {
                Assert.IsNotNull(trips.Contains(vdk.Value));
            }
            foreach (VDWorkblockKey vdwb in vd.Workblocks)
            {
                Assert.IsNotNull(trips.Contains(vdwb.Value));
            }

        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException), "Key can't be null.")]
        public void nullKey()
        {

            string key = null;
            string vehicle = "vehicle1";
            DateTime date = new DateTime(2022, 10, 11);
            List<String> trips = new List<string>() { "trip1", "trip2", "trip3" };
            List<String> workblocks = new List<string>() { "wb1", "wb2", "wb3" };

            VehicleDuty vd = new VehicleDuty(key, vehicle, date, trips, workblocks);

            Assert.AreEqual(vd.Key, key);
            Assert.AreEqual(vd.Vehicle, vehicle);
            Assert.AreEqual(vd.Date, date);
            foreach (VDTripKey vdk in vd.Trips)
            {
                Assert.IsNotNull(trips.Contains(vdk.Value));
            }
            foreach (VDWorkblockKey vdwb in vd.Workblocks)
            {
                Assert.IsNotNull(trips.Contains(vdwb.Value));
            }
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException), "Vehicle can't be null.")]
        public void nullDriver()
        {
            string key = "vdkey";
            string vehicle = null;
            DateTime date = new DateTime(2022, 10, 11);
            List<String> trips = new List<string>() { "trip1", "trip2", "trip3" };
            List<String> workblocks = new List<string>() { "wb1", "wb2", "wb3" };

            VehicleDuty vd = new VehicleDuty(key, vehicle, date, trips, workblocks);

            Assert.AreEqual(vd.Key, key);
            Assert.AreEqual(vd.Vehicle, vehicle);
            Assert.AreEqual(vd.Date, date);
            foreach (VDTripKey vdk in vd.Trips)
            {
                Assert.IsNotNull(trips.Contains(vdk.Value));
            }
            foreach (VDWorkblockKey vdwb in vd.Workblocks)
            {
                Assert.IsNotNull(trips.Contains(vdwb.Value));
            }
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException), "Trips date shouldn't be null and should be greater than the current date.")]
        public void wrongDate()
        {
            string key = "vdkey";
            string vehicle = "vehicle1";
            DateTime date = new DateTime(2000, 10, 11);
            List<String> trips = new List<string>() { "trip1", "trip2", "trip3" };
            List<String> workblocks = new List<string>() { "wb1", "wb2", "wb3" };

            VehicleDuty vd = new VehicleDuty(key, vehicle, date, trips, workblocks);

            Assert.AreEqual(vd.Key, key);
            Assert.AreEqual(vd.Vehicle, vehicle);
            Assert.AreEqual(vd.Date, date);
            foreach (VDTripKey vdk in vd.Trips)
            {
                Assert.IsNotNull(trips.Contains(vdk.Value));
            }
            foreach (VDWorkblockKey vdwb in vd.Workblocks)
            {
                Assert.IsNotNull(trips.Contains(vdwb.Value));
            }
        }

    }
}