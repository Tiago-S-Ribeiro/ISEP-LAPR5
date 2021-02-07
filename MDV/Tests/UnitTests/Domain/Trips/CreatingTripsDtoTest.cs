using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.Trips;

namespace Tests
{
    [TestClass]
    public class CreatingTripDtoTest
    {
        [TestMethod]
        public void testSetParameters()
        {
            string key = "keyTrip1";
            string line = "lineTest1";
            string path = "pathTest1";
            int[] passingTimes = { 1, 2, 3, 4, 5 };

            CreatingTripDto ctdto = new CreatingTripDto(key, line, path, passingTimes);

            Assert.AreEqual(ctdto.Key, key);
            Assert.AreEqual(ctdto.Line, line);
            Assert.AreEqual(ctdto.Path, path);
            Assert.AreEqual(ctdto.PassingTimes, passingTimes);

        }
    }
}