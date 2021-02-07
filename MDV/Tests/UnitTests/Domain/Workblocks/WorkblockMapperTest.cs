using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using DDDSample1.Domain.Workblocks;
using System;

namespace Tests
{
    [TestClass]
    public class WorkblockMapperTest
    {
        [TestMethod]
        public void testToDto()
        {
            string key = "key1";
            string vehicleDutyKey = "vdkey";
            int startTime = 1;
            int endTime = 1;
            List<String> lTripKey = new List<string>() { "key1", "key2" };

            WorkblockDto mapperDto = WorkblockMapper.toDTO(new CreatingWorkblockDto(key, vehicleDutyKey, lTripKey.ToArray(), startTime, endTime));
            WorkblockDto wbdto = new WorkblockDto(key, vehicleDutyKey, lTripKey, startTime, endTime);

            Assert.AreEqual(mapperDto.Key, wbdto.Key);
            Assert.AreEqual(mapperDto.VehicleDutyKey, wbdto.VehicleDutyKey);
            Assert.AreEqual(mapperDto.StartTime, wbdto.StartTime);
            Assert.AreEqual(mapperDto.EndTime, wbdto.EndTime);
            foreach (String s in wbdto.ListOfTrips)
            {
                Assert.IsNotNull(mapperDto.ListOfTrips.Contains(s));
            }
        }

        [TestMethod]
        public void testToDomain()
        {
            string key = "key1";
            string vehicleDutyKey = "vdkey";
            int startTime = 1;
            int endTime = 1;
            List<String> lTripKey = new List<string>() { "key1", "key2" };

            Workblock wb = new Workblock(key, vehicleDutyKey, lTripKey, startTime, endTime);
            Workblock wbmapper = WorkblockMapper.toDomain(new WorkblockDto(key, vehicleDutyKey, lTripKey, startTime, endTime));

            Assert.AreEqual(wb.Key, wbmapper.Key);
            Assert.AreEqual(wb.VehicleDutyKey, wbmapper.VehicleDutyKey);
            Assert.AreEqual(wb.StartTime, wbmapper.StartTime);
            Assert.AreEqual(wb.EndTime, wbmapper.EndTime);
        }
    }
}