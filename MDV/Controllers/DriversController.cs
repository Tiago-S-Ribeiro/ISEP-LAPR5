using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Drivers;

namespace DDDSample1.Controllers{
    
    [Route("api/[controller]")]
    [ApiController]
    public class DriversController : ControllerBase{
        
        private readonly IDriverService _service;

        public DriversController(IDriverService service){
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<DriverDto>> Create(CreatingDriverDto obj){
            var dto = DriverMapper.toDTO(obj);
            var driver = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new {Id = driver.Id} , driver);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DriverDto>> GetGetById(Guid id){
            Console.WriteLine("Id: " + id);
            var driver = await _service.GetByIdAsync(new DriverId(id));

            if (driver == null){
                return NotFound();
            }
            return driver;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DriverDto>>> GetAll(){
            return await _service.GetAllAsync();
        }
    }
}