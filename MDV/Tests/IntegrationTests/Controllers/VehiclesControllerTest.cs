using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.Vehicles;
using DDDSample1.Domain.Shared;
using DDDSample1.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Moq;


namespace Tests.IntegrationTests.Controller
{
    [TestClass]
    public class VehiclesControllerTest
    {
    
        [TestMethod]
        public async Task Post_NormalParameters_Sucess(){
            CreatingVehicleDto creatingVehicleDto = new CreatingVehicleDto("AA-12-BB", "A1B2C3D4E5F6G7H8I", "Miniautocarro", 1000);

            VehicleDto VehicleDto = VehicleMapper.toDTO(creatingVehicleDto);
            Vehicle Vehicle = VehicleMapper.toDomain(VehicleDto);          
            var mockRepository = new Mock<IVehicleRepository>();
            mockRepository.Setup(repository => repository.AddAsync(It.IsAny<Vehicle>())).Returns(Task.FromResult(Vehicle));

            var mockUnit = new Mock<IUnitOfWork>();

            VehicleService VehicleService = new VehicleService(mockUnit.Object,mockRepository.Object);
            VehiclesController controller = new VehiclesController(VehicleService);

            var result = await controller.Create(creatingVehicleDto);

            mockRepository.Verify(repository => repository.AddAsync(It.IsAny<Vehicle>()), Times.AtLeastOnce());
            mockUnit.Verify(unit => unit.CommitAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<VehicleDto>));
        }

        [TestMethod]
        public async Task GetAll_Sucess(){ 
            var mockRepository = new Mock<IVehicleRepository>();
            mockRepository.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Vehicle>()));

            var mockUnit = new Mock<IUnitOfWork>();

            VehicleService VehicleService = new VehicleService(mockUnit.Object,mockRepository.Object);
            VehiclesController controller = new VehiclesController(VehicleService);

            var result = await controller.GetAll();

            mockRepository.Verify(repository => repository.GetAllAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<IEnumerable<VehicleDto>>));
        }

        [TestMethod]
        public async Task GetById_NormalId_Sucess(){
            Guid id = new Guid();

            var mockRepository = new Mock<IVehicleRepository>();
            mockRepository.Setup(repository => repository.GetByIdAsync(It.IsAny<VehicleId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            VehicleService VehicleService = new VehicleService(mockUnit.Object,mockRepository.Object);
            VehiclesController controller = new VehiclesController(VehicleService);

            var result = await controller.GetGetById(id);

            mockRepository.Verify(repository => repository.GetByIdAsync(It.IsAny<VehicleId>()), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<VehicleDto>));
        }
    }
}