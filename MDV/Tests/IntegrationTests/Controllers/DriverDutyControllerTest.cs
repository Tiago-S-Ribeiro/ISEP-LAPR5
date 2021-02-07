using System;
using DDDSample1.Domain.DriverDuties;
using DDDSample1.Domain.Shared;
using DDDSample1.Controllers;
using System.Collections.Generic;
using Moq;
using Xunit;

namespace IntegrationTests
{
    public class DriverDutyControllerTest
    {
        [Fact]
        public async void GetByIdTest()
        {
            var repo = new Mock<IDriverDutyRepository>();
            var unitOfWork = new Mock<IUnitOfWork>();

            var service = new DriverDutyService(unitOfWork.Object, repo.Object);
            var controller = new DriverDutiesController(service);

            DriverDutyId id = new DriverDutyId(Guid.NewGuid());
            string key = "keyDD1";
            string driver = "DriverDD";
            List<String> workblocks = new List<String>();
            workblocks.Add("wb1");
            workblocks.Add("wb2");
            workblocks.Add("wb3");

            var dd = new DriverDuty(key, driver, workblocks);

            repo.Setup(_ => _.GetByIdAsync(id)).ReturnsAsync(dd);

            var actual = await controller.GetGetById(id.AsGuid());
            var expected = new DriverDutyDto(key, driver, workblocks);

            Assert.Equal(actual.Value.Key, expected.Key);
            Assert.Equal(actual.Value.Driver, expected.Driver);
            Assert.Equal(actual.Value.Workblocks, expected.Workblocks);
        }

        [Fact]
        public async void GetByIdTest_Fail()
        {
            var repo = new Mock<IDriverDutyRepository>();
            var unitOfWork = new Mock<IUnitOfWork>();

            var service = new DriverDutyService(unitOfWork.Object, repo.Object);
            var controller = new DriverDutiesController(service);

            DriverDuty dd = null;

            repo.Setup(_ => _.GetByIdAsync(It.IsAny<DriverDutyId>())).ReturnsAsync(dd);

            var actual = await controller.GetGetById(Guid.NewGuid());

            Assert.Null(actual.Value);
        }
    }
}