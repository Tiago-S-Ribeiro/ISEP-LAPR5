using System;
using System.Collections.Generic;
using DDDSample1.Domain.DriverDuties;
using DDDSample1.Domain.Shared;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Tests
{
    [TestClass]
    public class DriverDutyTest
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

            DriverDuty dd = new DriverDuty(key, driver, workblocks);

            Assert.AreEqual(dd.Key, key);
            Assert.AreEqual(dd.Driver, driver);
            foreach (String s in workblocks)
            {
                DriverWorkblock dw = new DriverWorkblock(s);
                Assert.IsNotNull(dd.Workblocks.Contains(dw));
            }
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException), "Key can't be null.")]
        public void nullKey()
        {
            string key = null;
            string driver = "DriverDD";
            List<String> workblocks = new List<String>();
            workblocks.Add("wb1");
            workblocks.Add("wb2");
            workblocks.Add("wb3");

            DriverDuty dd = new DriverDuty(key, driver, workblocks);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException), "Driver can't be null.")]
        public void nullDriver()
        {
            string key = "keyDD1";
            string driver = null;
            List<String> workblocks = new List<String>();
            workblocks.Add("wb1");
            workblocks.Add("wb2");
            workblocks.Add("wb3");

            DriverDuty dd = new DriverDuty(key, driver, workblocks);
        }
    }
}