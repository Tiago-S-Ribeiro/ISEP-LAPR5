using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Vehicles;

namespace DDDSample1.Controllers{
    
    [Route("api/[controller]")]
    [ApiController]
    public class VehiclesController : ControllerBase{
        
        private readonly IVehicleService _service;

        public VehiclesController(IVehicleService service){
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<VehicleDto>> Create(CreatingVehicleDto obj){
            var dto = VehicleMapper.toDTO(obj);
            var vehicle = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new {Id = vehicle.Id} , vehicle);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleDto>> GetGetById(Guid id){
            var vehicle = await _service.GetByIdAsync(new VehicleId(id));
            
            if (vehicle == null){ return NotFound(); }
            return vehicle;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleDto>>> GetAll(){
            return await _service.GetAllAsync();
        }
    }
}