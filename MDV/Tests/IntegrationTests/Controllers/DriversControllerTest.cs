using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.Drivers;
using DDDSample1.Domain.Shared;
using DDDSample1.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Moq;


namespace Tests.IntegrationTests.Controller
{
    [TestClass]
    public class DriversControllerTest
    {
    
        [TestMethod]
        public async Task Post_NormalParameters_Sucess(){
            CreatingDriverDto creatingDriverDto = new CreatingDriverDto("DriverA10", "lalala", 876263907,14352011,227012657,927638614,3495566307000,new string[] {"Driver:1","Driver:2","Driver:3"},1128724707,0);

            DriverDto driverDto = DriverMapper.toDTO(creatingDriverDto);
            Driver driver = DriverMapper.toDomain(driverDto);          
            var mockRepository = new Mock<IDriverRepository>();
            mockRepository.Setup(repository => repository.AddAsync(It.IsAny<Driver>())).Returns(Task.FromResult(driver));

            var mockUnit = new Mock<IUnitOfWork>();

            DriverService driverService = new DriverService(mockUnit.Object,mockRepository.Object);
            DriversController controller = new DriversController(driverService);

            var result = await controller.Create(creatingDriverDto);

            mockRepository.Verify(repository => repository.AddAsync(It.IsAny<Driver>()), Times.AtLeastOnce());
            mockUnit.Verify(unit => unit.CommitAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<DriverDto>));
        }

        [TestMethod]
        public async Task GetAll_Sucess(){
            var mockRepository = new Mock<IDriverRepository>();
            mockRepository.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Driver>()));

            var mockUnit = new Mock<IUnitOfWork>();

            DriverService driverService = new DriverService(mockUnit.Object,mockRepository.Object);
            DriversController controller = new DriversController(driverService);

            var result = await controller.GetAll();

            mockRepository.Verify(repository => repository.GetAllAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<IEnumerable<DriverDto>>));
        }

        [TestMethod]
        public async Task GetById_NormalId_Sucess(){
            Guid id = new Guid();

            var mockRepository = new Mock<IDriverRepository>();
            mockRepository.Setup(repository => repository.GetByIdAsync(It.IsAny<DriverId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            DriverService driverService = new DriverService(mockUnit.Object,mockRepository.Object);
            DriversController controller = new DriversController(driverService);

            var result = await controller.GetGetById(id);

            mockRepository.Verify(repository => repository.GetByIdAsync(It.IsAny<DriverId>()), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<DriverDto>));
        }
    }
}


