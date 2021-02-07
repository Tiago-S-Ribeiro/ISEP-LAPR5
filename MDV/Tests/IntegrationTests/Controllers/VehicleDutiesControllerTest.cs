using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Domain.Shared;
using DDDSample1.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Moq;


namespace Tests.IntegrationTests.Controller
{
    [TestClass]
    public class VehicleDutiesControllerTest
    {
    
        [TestMethod]
        public async Task Post_NormalParameters_Sucess(){
            CreatingVehicleDutyDto creatingVehicleDutyDto = new CreatingVehicleDutyDto("VehicleDut", "V12", 3495566307000, new string[] {"VehicleDuty:1", "VehicleDuty:2"}, new string[] {"Workblock:1","Workblock:2"});

            VehicleDutyDto VehicleDutyDto = VehicleDutyMapper.toDTO(creatingVehicleDutyDto);
            VehicleDuty VehicleDuty = VehicleDutyMapper.toDomain(VehicleDutyDto);          
            var mockRepository = new Mock<IVehicleDutyRepository>();
            mockRepository.Setup(repository => repository.AddAsync(It.IsAny<VehicleDuty>())).Returns(Task.FromResult(VehicleDuty));

            var mockUnit = new Mock<IUnitOfWork>();

            VehicleDutyService VehicleDutyService = new VehicleDutyService(mockUnit.Object,mockRepository.Object);
            VehicleDutiesController controller = new VehicleDutiesController(VehicleDutyService);

            var result = await controller.Create(creatingVehicleDutyDto);

            mockRepository.Verify(repository => repository.AddAsync(It.IsAny<VehicleDuty>()), Times.AtLeastOnce());
            mockUnit.Verify(unit => unit.CommitAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<VehicleDutyDto>));
        }

        [TestMethod]
        public async Task GetAll_Sucess(){ 
            var mockRepository = new Mock<IVehicleDutyRepository>();
            mockRepository.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<VehicleDuty>()));

            var mockUnit = new Mock<IUnitOfWork>();

            VehicleDutyService VehicleDutyService = new VehicleDutyService(mockUnit.Object,mockRepository.Object);
            VehicleDutiesController controller = new VehicleDutiesController(VehicleDutyService);

            var result = await controller.GetAll();

            mockRepository.Verify(repository => repository.GetAllAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<IEnumerable<VehicleDutyDto>>));
        }

        [TestMethod]
        public async Task GetById_NormalId_Sucess(){
            Guid id = new Guid();

            var mockRepository = new Mock<IVehicleDutyRepository>();
            mockRepository.Setup(repository => repository.GetByIdAsync(It.IsAny<VehicleDutyId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            VehicleDutyService VehicleDutyService = new VehicleDutyService(mockUnit.Object,mockRepository.Object);
            VehicleDutiesController controller = new VehicleDutiesController(VehicleDutyService);

            var result = await controller.GetGetById(id);

            mockRepository.Verify(repository => repository.GetByIdAsync(It.IsAny<VehicleDutyId>()), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<VehicleDutyDto>));
        }
    }
}