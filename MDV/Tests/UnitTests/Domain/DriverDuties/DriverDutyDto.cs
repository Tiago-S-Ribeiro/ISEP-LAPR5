using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.DriverDuties;
using System.Collections.Generic;

namespace Tests
{
    [TestClass]
    public class DriverDutyDtoTest
    {
        [TestMethod]
        public void testSetParametersID()
        {
            string id = "ddid";
            string key = "keyDD1";
            string driver = "DriverDD";
            List<String> workblocks = new List<String>();
            workblocks.Add("wb1");
            workblocks.Add("wb2");
            workblocks.Add("wb3");

            DriverDutyDto dddto = new DriverDutyDto(id, key, driver, workblocks);

            Assert.AreEqual(dddto.Id, id);
            Assert.AreEqual(dddto.Key, key);
            Assert.AreEqual(dddto.Driver, driver);
            foreach (String s in workblocks)
            {
                Assert.IsNotNull(dddto.Workblocks.Contains(s));
            }
        }

        [TestMethod]
        public void testSetParameters()
        {
            string key = "keyDD1";
            string driver = "DriverDD";
            List<String> workblocks = new List<String>();
            workblocks.Add("wb1");
            workblocks.Add("wb2");
            workblocks.Add("wb3");

            DriverDutyDto dddto = new DriverDutyDto(key, driver, workblocks);

            Assert.AreEqual(dddto.Key, key);
            Assert.AreEqual(dddto.Driver, driver);
            foreach (String s in workblocks)
            {
                Assert.IsNotNull(dddto.Workblocks.Contains(s));
            }
        }
    }
}