using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.VehicleDuties;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Controllers;
using Moq;


namespace Tests
{
    [TestClass]
    public class VehicleDutyDutiesControllerTest
    {
    
        [TestMethod]
        public async Task Post_NormalParameters_Sucess(){
            CreatingVehicleDutyDto request = new CreatingVehicleDutyDto("VehicleDut", "V12", 3495566307000, new string[] {"Trip:1", "Trip:2"}, new string[] {"Workblock:1","Workblock:2"});

            var mock = new Mock<IVehicleDutyService>();
            mock.Setup(service => service.AddAsync(It.IsAny<VehicleDutyDto>())).Returns(Task.FromResult(VehicleDutyMapper.toDTO(request)));
            VehicleDutiesController controller = new VehicleDutiesController(mock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<VehicleDutyDto>()), Times.AtLeastOnce());
            ActionResult<VehicleDutyDto> VehicleDutyDto = VehicleDutyMapper.toDTO(request);

            Assert.IsInstanceOfType(result, typeof(ActionResult<VehicleDutyDto>));
        }

        [TestMethod]
        public async Task GetAll_Sucess(){
            var mock = new Mock<IVehicleDutyService>();
            VehicleDutiesController controller = new VehicleDutiesController(mock.Object);

            var result = await controller.GetAll();

            mock.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());
        }

        [TestMethod]
        public async Task GetById_Sucess(){
            Guid request = new Guid();

            var mock = new Mock<IVehicleDutyService>();
            mock.Setup(service => service.GetByIdAsync(It.IsAny<VehicleDutyId>()));
            VehicleDutiesController controller = new VehicleDutiesController(mock.Object);

            var result = await controller.GetGetById(request);

            mock.Verify(service => service.GetByIdAsync(It.IsAny<VehicleDutyId>()), Times.AtLeastOnce());
        }
    }
}