using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.Workblocks;
using DDDSample1.Domain.Shared;
using DDDSample1.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Moq;


namespace Tests.IntegrationTests.Controller
{
    [TestClass]
    public class WorkblocksControllerTest
    {
    
        [TestMethod]
        public async Task Post_NormalParameters_Sucess(){
            CreatingWorkblockDto creatingWorkblockDto = new CreatingWorkblockDto("Workblock6","VehicleDutyKey", new string[] {"Workblock:1","Workblock:2"}, 34000,45000);

            WorkblockDto WorkblockDto = WorkblockMapper.toDTO(creatingWorkblockDto);
            Workblock Workblock = WorkblockMapper.toDomain(WorkblockDto);          
            var mockRepository = new Mock<IWorkblockRepository>();
            mockRepository.Setup(repository => repository.AddAsync(It.IsAny<Workblock>())).Returns(Task.FromResult(Workblock));

            var mockUnit = new Mock<IUnitOfWork>();

            WorkblockService WorkblockService = new WorkblockService(mockUnit.Object,mockRepository.Object);
            WorkblocksController controller = new WorkblocksController(WorkblockService);

            var result = await controller.Create(creatingWorkblockDto);

            mockRepository.Verify(repository => repository.AddAsync(It.IsAny<Workblock>()), Times.AtLeastOnce());
            mockUnit.Verify(unit => unit.CommitAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<WorkblockDto>));
        }

        [TestMethod]
        public async Task GetAll_Sucess(){ 
            var mockRepository = new Mock<IWorkblockRepository>();
            mockRepository.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Workblock>()));

            var mockUnit = new Mock<IUnitOfWork>();

            WorkblockService WorkblockService = new WorkblockService(mockUnit.Object,mockRepository.Object);
            WorkblocksController controller = new WorkblocksController(WorkblockService);

            var result = await controller.GetAll();

            mockRepository.Verify(repository => repository.GetAllAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<IEnumerable<WorkblockDto>>));
        }

        [TestMethod]
        public async Task GetById_NormalId_Sucess(){
            Guid id = new Guid();

            var mockRepository = new Mock<IWorkblockRepository>();
            mockRepository.Setup(repository => repository.GetByIdAsync(It.IsAny<WorkblockId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            WorkblockService WorkblockService = new WorkblockService(mockUnit.Object,mockRepository.Object);
            WorkblocksController controller = new WorkblocksController(WorkblockService);

            var result = await controller.GetGetById(id);

            mockRepository.Verify(repository => repository.GetByIdAsync(It.IsAny<WorkblockId>()), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<WorkblockDto>));
        }
    }
}