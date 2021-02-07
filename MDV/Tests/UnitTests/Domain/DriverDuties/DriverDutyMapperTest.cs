using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.DriverDuties;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace Tests
{
    [TestClass]
    public class DriverDutyMapperTest
    {
        [TestMethod]
        public void testToDto()
        {
            string key = "keyDD1";
            string driver = "DriverDD";
            List<String> workblocks = new List<String>();
            workblocks.Add("wb1");
            workblocks.Add("wb2");
            workblocks.Add("wb3");

            DriverDutyDto dddtoMapper = DriverDutyMapper.toDTO(new CreatingDriverDutyDto(key, driver, workblocks.ToArray()));
            DriverDutyDto dddto = new DriverDutyDto(key, driver, workblocks);

            Assert.AreEqual(dddto.Key, dddtoMapper.Key);
            Assert.AreEqual(dddto.Driver, dddtoMapper.Driver);
            foreach (String s in dddtoMapper.Workblocks)
            {
                Assert.IsNotNull(dddto.Workblocks.Contains(s));
            }
        }

        [TestMethod]
        public void testToDomain()
        {
            string key = "keyDD1";
            string driver = "DriverDD";
            List<String> workblocks = new List<String>();
            workblocks.Add("wb1");
            workblocks.Add("wb2");
            workblocks.Add("wb3");

            DriverDuty dduty = DriverDutyMapper.toDomain(DriverDutyMapper.toDTO(new CreatingDriverDutyDto(key, driver, workblocks.ToArray())));

            DriverDuty dd = new DriverDuty(key, driver, workblocks);

            Assert.AreEqual(dd.Key, dduty.Key);
            Assert.AreEqual(dd.Driver, dduty.Driver);
            foreach (DriverWorkblock dw in dduty.Workblocks)
            {
                Assert.IsNotNull(dd.Workblocks.Contains(dw));
            }
        }
    }
}
