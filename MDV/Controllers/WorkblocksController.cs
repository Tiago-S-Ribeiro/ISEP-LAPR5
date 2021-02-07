using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Workblocks;

namespace DDDSample1.Controllers{
    
    [Route("api/[controller]")]
    [ApiController]
    public class WorkblocksController : ControllerBase{
        
        private readonly IWorkblockService _service;

        public WorkblocksController(IWorkblockService service){
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<WorkblockDto>> Create(CreatingWorkblockDto obj){
            var dto = WorkblockMapper.toDTO(obj);
            var workblock = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new {Id = workblock.Id} , workblock);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkblockDto>> GetGetById(Guid id){
            Console.WriteLine("Id: " + id);
            var workblock = await _service.GetByIdAsync(new WorkblockId(id));

            if (workblock == null){
                return NotFound();
            }
            return workblock;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkblockDto>>> GetAll(){
            return await _service.GetAllAsync();
        }
    }
}