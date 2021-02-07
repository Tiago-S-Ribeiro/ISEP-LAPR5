using System;
using System.Collections.Generic;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Domain.Shared;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Tests
{
    [TestClass]
    public class VehicleDutyDtoTest
    {
        [TestMethod]
        public void testSetParametersID()
        {
            String id = "vdtid";
            string key = "vdkey";
            string vehicle = "vehicle1";
            DateTime date = new DateTime(2022, 10, 11);
            List<String> trips = new List<string>() { "trip1", "trip2", "trip3" };
            List<String> workblocks = new List<string>() { "wb1", "wb2", "wb3" };

            VehicleDutyDto vddto = new VehicleDutyDto(id, key, vehicle, date, trips, workblocks);

            Assert.AreEqual(vddto.Id, id);
            Assert.AreEqual(vddto.Key, key);
            Assert.AreEqual(vddto.Vehicle, vehicle);
            Assert.AreEqual(vddto.Date, date);
            Assert.AreEqual(vddto.Trips, trips);
            Assert.AreEqual(vddto.Workblocks, workblocks);
        }

        [TestMethod]
        public void testSetParameters()
        {
            string key = "vdkey";
            string vehicle = "vehicle1";
            DateTime date = new DateTime(2022, 10, 11);
            List<String> trips = new List<string>() { "trip1", "trip2", "trip3" };
            List<String> workblocks = new List<string>() { "wb1", "wb2", "wb3" };

            VehicleDutyDto vddto = new VehicleDutyDto(key, vehicle, date, trips, workblocks);

            Assert.AreEqual(vddto.Key, key);
            Assert.AreEqual(vddto.Vehicle, vehicle);
            Assert.AreEqual(vddto.Date, date);
            Assert.AreEqual(vddto.Trips, trips);
            Assert.AreEqual(vddto.Workblocks, workblocks);
        }
    }
}