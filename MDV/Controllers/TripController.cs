using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Trips;

namespace DDDSample1.Controllers{
    
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase{
        
        private readonly ITripService _service;

        public TripsController(ITripService service){
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<TripDto>> Create(CreatingTripDto obj){
            var dto = TripMapper.toDTO(obj);
            var trip = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new {Id = trip.Id} , trip);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TripDto>> GetGetById(Guid id){
            var trip = await _service.GetByIdAsync(new TripId(id));
            
            if (trip == null){ return NotFound(); }
            return trip;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TripDto>>> GetAll(){
            return await _service.GetAllAsync();
        }
    }
}