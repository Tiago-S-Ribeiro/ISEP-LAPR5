using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.DriverDuties;
using System.Collections.Generic;

namespace Tests
{
    [TestClass]
    public class CreatingDriverDutyDTOTest
    {
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
            CreatingDriverDutyDto cdddto = new CreatingDriverDutyDto(key, driver, workblocks.ToArray());

            Assert.AreEqual(dddto.Key, cdddto.Key);
            Assert.AreEqual(dddto.Driver, cdddto.Driver);
            foreach (String s in cdddto.Workblocks)
            {
                Assert.IsNotNull(dddto.Workblocks.Contains(s));
            }
        }
    }
}