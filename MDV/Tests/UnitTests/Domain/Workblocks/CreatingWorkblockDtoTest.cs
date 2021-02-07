using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using DDDSample1.Domain.Workblocks;
using System;

namespace Tests
{
    [TestClass]
    public class CreatingWorkblockDtoTest
    {
        [TestMethod]
        public void testSetParameters()
        {
            string key = "key1";
            string vehicleDutyKey = "vdkey";
            int startTime = 1;
            int endTime = 1;
            List<String> lTripKey = new List<string>() { "key1", "key2" };

            CreatingWorkblockDto cwbdto = new CreatingWorkblockDto(key, vehicleDutyKey, lTripKey.ToArray(), startTime, endTime);

            Assert.AreEqual(cwbdto.Key, key);
            Assert.AreEqual(cwbdto.VehicleDutyKey, vehicleDutyKey);
            Assert.AreEqual(cwbdto.StartTime, startTime);
            Assert.AreEqual(cwbdto.EndTime, endTime);
        }
    }
}