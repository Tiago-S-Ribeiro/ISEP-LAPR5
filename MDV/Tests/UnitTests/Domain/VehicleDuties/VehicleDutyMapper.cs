using System;
using System.Collections.Generic;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Domain.Shared;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Tests
{
    [TestClass]
    public class VehicleDutyMapperTest
    {
        [TestMethod]
        public void testToDTO()
        {
            string key = "vdkey";
            string vehicle = "vehicle1";
            DateTime date = new DateTime(2022, 10, 11);
            List<String> trips = new List<string>() { "trip1", "trip2", "trip3" };
            List<String> workblocks = new List<string>() { "wb1", "wb2", "wb3" };
            long dateMiliseconds = (long)(new TimeSpan(date.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks)).TotalMilliseconds;

            CreatingVehicleDutyDto cvddto = new CreatingVehicleDutyDto(key, vehicle, dateMiliseconds, trips.ToArray(), workblocks.ToArray());
            VehicleDutyDto vddtoMapper = VehicleDutyMapper.toDTO(cvddto);
            VehicleDutyDto vddto = new VehicleDutyDto(key, vehicle, date, trips, workblocks);

            Assert.AreEqual(vddto.Key, vddtoMapper.Key);
            Assert.AreEqual(vddto.Vehicle, vddtoMapper.Vehicle);
            Assert.AreEqual(vddto.Date, vddtoMapper.Date);
            foreach (String s in vddtoMapper.Trips)
            {
                Assert.IsNotNull(vddto.Trips.Contains(s));
            }
            foreach (String s in vddtoMapper.Workblocks)
            {
                Assert.IsNotNull(vddtoMapper.Workblocks.Contains(s));
            }
        }

        [TestMethod]
        public void testToDomain()
        {
            string key = "vdkey";
            string vehicle = "vehicle1";
            DateTime date = new DateTime(2022, 10, 11);
            List<String> trips = new List<string>() { "trip1", "trip2", "trip3" };
            List<String> workblocks = new List<string>() { "wb1", "wb2", "wb3" };
            long dateMiliseconds = (long)(new TimeSpan(date.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks)).TotalMilliseconds;

            VehicleDuty vdMapper = VehicleDutyMapper.toDomain(VehicleDutyMapper.toDTO(new CreatingVehicleDutyDto(key, vehicle, dateMiliseconds, trips.ToArray(), workblocks.ToArray())));
            VehicleDuty vd = new VehicleDuty(key, vehicle, date, trips, workblocks);

            Assert.AreEqual(vdMapper.Key, vd.Key);
            Assert.AreEqual(vdMapper.Vehicle, vd.Vehicle);
            Assert.AreEqual(vdMapper.Date, vd.Date);
            foreach (VDTripKey vdk in vd.Trips)
            {
                Assert.IsNotNull(vdMapper.Trips.Contains(vdk));
            }
            foreach (VDWorkblockKey vdwb in vd.Workblocks)
            {
                Assert.IsNotNull(vdMapper.Workblocks.Contains(vdwb));
            }
        }
    }
}