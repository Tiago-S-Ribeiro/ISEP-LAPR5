using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.Vehicles;
using DDDSample1.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Moq;


namespace Tests
{
    [TestClass]
    public class VehiclesControllerTest
    {
    
        [TestMethod]
        public async Task Post_NormalParameters_Sucess(){
            CreatingVehicleDto request = new CreatingVehicleDto("AA-12-BB", "A1B2C3D4E5F6G7H8I", "Miniautocarro", 1000);

            var mock = new Mock<IVehicleService>();
            mock.Setup(service => service.AddAsync(It.IsAny<VehicleDto>())).Returns(Task.FromResult(VehicleMapper.toDTO(request)));
            VehiclesController controller = new VehiclesController(mock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<VehicleDto>()), Times.AtLeastOnce());
            ActionResult<VehicleDto> VehicleDto = VehicleMapper.toDTO(request);

            Assert.IsInstanceOfType(result, typeof(ActionResult<VehicleDto>));
        }

        [TestMethod]
        public async Task GetAll_Sucess(){
            var mock = new Mock<IVehicleService>();
            VehiclesController controller = new VehiclesController(mock.Object);

            var result = await controller.GetAll();

            mock.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());
        }

        [TestMethod]
        public async Task GetById_Sucess(){
            Guid request = new Guid();

            var mock = new Mock<IVehicleService>();
            mock.Setup(service => service.GetByIdAsync(It.IsAny<VehicleId>()));
            VehiclesController controller = new VehiclesController(mock.Object);

            var result = await controller.GetGetById(request);

            mock.Verify(service => service.GetByIdAsync(It.IsAny<VehicleId>()), Times.AtLeastOnce());
        }
    }
}
