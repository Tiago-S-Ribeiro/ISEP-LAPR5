using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.Workblocks;
using DDDSample1.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Moq;


namespace Tests
{
    [TestClass]
    public class WorkblocksControllerTest
    {
    
        [TestMethod]
        public async Task Post_NormalParameters_Sucess(){
            CreatingWorkblockDto request = new CreatingWorkblockDto("Workblock6","VehicleDutyKey", new string[] {"Trip:1","Trip:2"}, 34000,45000);

            var mock = new Mock<IWorkblockService>();
            mock.Setup(service => service.AddAsync(It.IsAny<WorkblockDto>())).Returns(Task.FromResult(WorkblockMapper.toDTO(request)));
            WorkblocksController controller = new WorkblocksController(mock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<WorkblockDto>()), Times.AtLeastOnce());
            ActionResult<WorkblockDto> WorkblockDto = WorkblockMapper.toDTO(request);

            Assert.IsInstanceOfType(result, typeof(ActionResult<WorkblockDto>));
        }

        [TestMethod]
        public async Task GetAll_Sucess(){
            var mock = new Mock<IWorkblockService>();
            WorkblocksController controller = new WorkblocksController(mock.Object);

            var result = await controller.GetAll();

            mock.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());
        }

        [TestMethod]
        public async Task GetById_Sucess(){
            Guid request = new Guid();

            var mock = new Mock<IWorkblockService>();
            mock.Setup(service => service.GetByIdAsync(It.IsAny<WorkblockId>()));
            WorkblocksController controller = new WorkblocksController(mock.Object);

            var result = await controller.GetGetById(request);

            mock.Verify(service => service.GetByIdAsync(It.IsAny<WorkblockId>()), Times.AtLeastOnce());
        }
    }
}
