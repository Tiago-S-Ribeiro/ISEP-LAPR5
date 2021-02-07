using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.Drivers;
using DDDSample1.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Moq;


namespace Tests.UnitTests.Controller
{
    [TestClass]
    public class DriversControllerTest
    {
    
        [TestMethod]
        public async Task Post_NormalParameters_Sucess(){
            CreatingDriverDto request = new CreatingDriverDto("DriverA10", "lalala", 876263907,14352011,227012657,927638614,3495566307,new string[] {"Driver:1","Driver:2","Driver:3"},1128724707,0);

            var mock = new Mock<IDriverService>();
            mock.Setup(service => service.AddAsync(It.IsAny<DriverDto>())).Returns(Task.FromResult(DriverMapper.toDTO(request)));
            DriversController controller = new DriversController(mock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<DriverDto>()), Times.AtLeastOnce());
            ActionResult<DriverDto> driverDto = DriverMapper.toDTO(request);

            Assert.IsInstanceOfType(result, typeof(ActionResult<DriverDto>));
        }

        [TestMethod]
        public async Task GetAll_Sucess(){
            var mock = new Mock<IDriverService>();
            DriversController controller = new DriversController(mock.Object);

            var result = await controller.GetAll();

            mock.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());
        }

        [TestMethod]
        public async Task GetById_Sucess(){
            Guid request = new Guid();

            var mock = new Mock<IDriverService>();
            mock.Setup(service => service.GetByIdAsync(It.IsAny<DriverId>()));
            DriversController controller = new DriversController(mock.Object);

            var result = await controller.GetGetById(request);

            mock.Verify(service => service.GetByIdAsync(It.IsAny<DriverId>()), Times.AtLeastOnce());
        }
    }
}
