using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using DDDSample1.Domain.Workblocks;
using System;

namespace Tests
{
    [TestClass]
    public class WorkblockDtoTest
    {
        [TestMethod]
        public void testSetParametersID()
        {
            string id = "id1";
            string key = "key1";
            string vehicleDutyKey = "vdkey";
            int startTime = 1;
            int endTime = 1;
            List<String> lTripKey = new List<string>() { "key1", "key2" };

            WorkblockDto wbdto = new WorkblockDto(id, key, vehicleDutyKey, lTripKey, startTime, endTime);

            Assert.AreEqual(wbdto.Id, id);
            Assert.AreEqual(wbdto.Key, key);
            Assert.AreEqual(wbdto.VehicleDutyKey, vehicleDutyKey);
            Assert.AreEqual(wbdto.StartTime, startTime);
            Assert.AreEqual(wbdto.EndTime, endTime);
            Assert.AreEqual(wbdto.ListOfTrips, lTripKey);
        }

        [TestMethod]
        public void testSetParameters()
        {
            string key = "key1";
            string vehicleDutyKey = "vdkey";
            int startTime = 1;
            int endTime = 1;
            List<String> lTripKey = new List<string>() { "key1", "key2" };

            WorkblockDto wbdto = new WorkblockDto(key, vehicleDutyKey, lTripKey, startTime, endTime);

            Assert.AreEqual(wbdto.Key, key);
            Assert.AreEqual(wbdto.VehicleDutyKey, vehicleDutyKey);
            Assert.AreEqual(wbdto.StartTime, startTime);
            Assert.AreEqual(wbdto.EndTime, endTime);
            Assert.AreEqual(wbdto.ListOfTrips, lTripKey);
        }
    }
}