using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using DDDSample1.Controllers;
using DDDSample1.Domain.Trips;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace Tests
{
    [TestClass]
    public class TripControllerUnitTest
    {
        [TestMethod]
        public async Task Post_AllParameters_Success(){
            CreatingTripDto request = new CreatingTripDto("asdsds", "asfdsa", "dcxvxc", new int[]{1,2,3,4,5});

            var mock = new Mock<ITripService>();
            mock.Setup(service => service.AddAsync(It.IsAny<TripDto>())).Returns(Task.FromResult(TripMapper.toDTO(request)));
            TripsController controller = new TripsController(mock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<TripDto>()), Times.AtLeastOnce());
            ActionResult<TripDto> tripDto = TripMapper.toDTO(request);

            Assert.IsInstanceOfType(result, typeof(ActionResult<TripDto>));
        }

        [TestMethod]
        public async Task GetAll_Sucess(){
            var mock = new Mock<ITripService>();
            TripsController controller = new TripsController(mock.Object);

            var result = await controller.GetAll();

            mock.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());
        }

        [TestMethod]
        public async Task GetById_Sucess(){
            Guid request = new Guid();

            var mock = new Mock<ITripService>();
            mock.Setup(service => service.GetByIdAsync(It.IsAny<TripId>()));
            TripsController controller = new TripsController(mock.Object);

            var result = await controller.GetGetById(request);

            mock.Verify(service => service.GetByIdAsync(It.IsAny<TripId>()), Times.AtLeastOnce());
        }
    }
}