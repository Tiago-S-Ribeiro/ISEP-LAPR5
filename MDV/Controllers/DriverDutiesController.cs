using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.DriverDuties;

namespace DDDSample1.Controllers{
    
    [Route("api/[controller]")]
    [ApiController]
    public class DriverDutiesController : ControllerBase{
        
        private readonly IDriverDutyService _service;

        public DriverDutiesController(IDriverDutyService service){
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<DriverDutyDto>> Create(CreatingDriverDutyDto obj){
            var dto = DriverDutyMapper.toDTO(obj);
            var driverDuty = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new {Id = driverDuty.Id} , driverDuty);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DriverDutyDto>> GetGetById(Guid id){
            var driverDuty = await _service.GetByIdAsync(new DriverDutyId(id));
            
            if (driverDuty == null){ return NotFound(); }
            return driverDuty;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DriverDutyDto>>> GetAll(){
            return await _service.GetAllAsync();
        }
    }
}