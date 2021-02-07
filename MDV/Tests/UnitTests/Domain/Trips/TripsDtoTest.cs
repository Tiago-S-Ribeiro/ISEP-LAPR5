using System.Collections.Generic;
using DDDSample1.Domain.Trips;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Tests
{
    [TestClass]
    public class TripsDtoTest
    {
        [TestMethod]
        public void testSetParametersID()
        {
            string id = "idtriptest1";
            string key = "keyTrip1";
            string line = "lineTest1";
            string path = "pathTest1";
            int[] passingTimes = { 1, 2, 3, 4, 5 };
            List<int> lPassingTimes = new List<int>();
            lPassingTimes.AddRange(passingTimes);

            TripDto tdto = new TripDto(id, key, line, path, lPassingTimes);

            Assert.AreEqual(tdto.Id, id);
            Assert.AreEqual(tdto.Key, key);
            Assert.AreEqual(tdto.Line, line);
            Assert.AreEqual(tdto.Path, path);
            foreach (int pt in lPassingTimes)
            {
                Assert.IsNotNull(tdto.PassingTimes.Contains(pt));
            }
        }

        [TestMethod]
        public void testSetParameters()
        {
            string key = "keyTrip1";
            string line = "lineTest1";
            string path = "pathTest1";
            int[] passingTimes = { 1, 2, 3, 4, 5 };
            List<int> lPassingTimes = new List<int>();
            lPassingTimes.AddRange(passingTimes);

            TripDto tdto = new TripDto(key, line, path, lPassingTimes);

            Assert.AreEqual(tdto.Key, key);
            Assert.AreEqual(tdto.Line, line);
            Assert.AreEqual(tdto.Path, path);
            foreach (int pt in lPassingTimes)
            {
                Assert.IsNotNull(tdto.PassingTimes.Contains(pt));
            }
        }
    }
}