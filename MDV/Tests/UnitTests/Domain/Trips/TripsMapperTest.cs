using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.Trips;
using System.Collections.Generic;

namespace Tests
{
    [TestClass]
    public class TripsMapperTest
    {
        [TestMethod]
        public void testToDto()
        {
            string key = "keyTrip1";
            string line = "lineTest1";
            string path = "pathTest1";
            int[] passingTimes = { 1, 2, 3, 4, 5 };
            List<int> lPassingTimes = new List<int>();
            lPassingTimes.AddRange(passingTimes);

            TripDto tdto = new TripDto(key, line, path, lPassingTimes);
            TripDto mapperDto = TripMapper.toDTO(new CreatingTripDto(key, line, path, passingTimes));

            Assert.AreEqual(tdto.Key, mapperDto.Key);
            Assert.AreEqual(tdto.Line, mapperDto.Line);
            Assert.AreEqual(tdto.Path, mapperDto.Path);
            foreach (int i in mapperDto.PassingTimes)
            {
                Assert.IsNotNull(tdto.PassingTimes.Contains(i));
            }
        }

        [TestMethod]
        public void testToDomain()
        {
            string key = "keyTrip1";
            string line = "lineTest1";
            string path = "pathTest1";
            int[] passingTimes = { 1, 2, 3, 4, 5 };
            List<int> lPassingTimes = new List<int>();
            lPassingTimes.AddRange(passingTimes);

            Trip t = new Trip(key, line, path, lPassingTimes);
            Trip mapperTrip = TripMapper.toDomain(TripMapper.toDTO(new CreatingTripDto(key, line, path, passingTimes)));

            Assert.AreEqual(t.Key, mapperTrip.Key);
            Assert.AreEqual(t.Line, mapperTrip.Line);
            Assert.AreEqual(t.Path, mapperTrip.Path);
            foreach (PassingTime pt in mapperTrip.PassingTimes)
            {
                Assert.IsNotNull(t.PassingTimes.Contains(pt));
            }
        }
    }
}