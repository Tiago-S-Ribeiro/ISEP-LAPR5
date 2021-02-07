using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.Trips;
using DDDSample1.Domain.Shared;
using DDDSample1.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Moq;


namespace Tests.IntegrationTests.Controller
{
    [TestClass]
    public class TripsControllerTest
    {
    
        [TestMethod]
        public async Task Post_NormalParameters_Sucess(){
            CreatingTripDto creatingTripDto = new CreatingTripDto("asdsds", "asfdsa", "dcxvxc", new int[]{1,2,3,4,5});

            TripDto tripDto = TripMapper.toDTO(creatingTripDto);
            Trip trip = TripMapper.toDomain(tripDto);          
            var mockRepository = new Mock<ITripRepository>();
            mockRepository.Setup(repository => repository.AddAsync(It.IsAny<Trip>())).Returns(Task.FromResult(trip));

            var mockUnit = new Mock<IUnitOfWork>();

            TripService TripService = new TripService(mockUnit.Object,mockRepository.Object);
            TripsController controller = new TripsController(TripService);

            var result = await controller.Create(creatingTripDto);

            mockRepository.Verify(repository => repository.AddAsync(It.IsAny<Trip>()), Times.AtLeastOnce());
            mockUnit.Verify(unit => unit.CommitAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<TripDto>));
        }

        [TestMethod]
        public async Task GetAll_Sucess(){ 
            var mockRepository = new Mock<ITripRepository>();
            mockRepository.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Trip>()));

            var mockUnit = new Mock<IUnitOfWork>();

            TripService TripService = new TripService(mockUnit.Object,mockRepository.Object);
            TripsController controller = new TripsController(TripService);

            var result = await controller.GetAll();

            mockRepository.Verify(repository => repository.GetAllAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<IEnumerable<TripDto>>));
        }

        [TestMethod]
        public async Task GetById_NormalId_Sucess(){
            Guid id = new Guid();

            var mockRepository = new Mock<ITripRepository>();
            mockRepository.Setup(repository => repository.GetByIdAsync(It.IsAny<TripId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            TripService TripService = new TripService(mockUnit.Object,mockRepository.Object);
            TripsController controller = new TripsController(TripService);

            var result = await controller.GetGetById(id);

            mockRepository.Verify(repository => repository.GetByIdAsync(It.IsAny<TripId>()), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<TripDto>));
        }
    }
}