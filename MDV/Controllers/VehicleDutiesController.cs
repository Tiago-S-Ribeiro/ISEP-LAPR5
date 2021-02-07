using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.VehicleDuties;

namespace DDDSample1.Controllers{
    
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleDutiesController : ControllerBase{
        
        private readonly IVehicleDutyService _service;

        public VehicleDutiesController(IVehicleDutyService service){
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<VehicleDutyDto>> Create(CreatingVehicleDutyDto obj){
            var dto = VehicleDutyMapper.toDTO(obj);
            var vehicleDuty = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new {Id = vehicleDuty.Id} , vehicleDuty);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleDutyDto>> GetGetById(Guid id){
            var vehicleDuty = await _service.GetByIdAsync(new VehicleDutyId(id));
            
            if (vehicleDuty == null){ return NotFound(); }
            return vehicleDuty;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleDutyDto>>> GetAll(){
            return await _service.GetAllAsync();
        }
    }
}